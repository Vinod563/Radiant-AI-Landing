import { jsPDF } from 'jspdf'
import {
  getAQ, scoreAssessment, buildFindings, sections, scoreBarStyle,
} from '../data/aiAssessment.js'
import { aiRadiantRead, suggestedNextSteps, positioningRead } from '../data/reportEditorial.js'
import { LEADER_CONTENT } from '../components/assessment/WhatAILeadersDo.jsx'
import { PRAFULL_PHOTO, SRINIVAS_PHOTO } from './leaderPhotos.js'

const ROLE_LABEL = { exec: 'Executive', tech: 'Technology Leader', biz: 'Business Leader', consultant: 'AI Practitioner' }

// jsPDF's built-in Helvetica only covers WinAnsi; swap glyphs it can't render.
const clean = (s = '') => String(s)
  .replace(/→/g, '->').replace(/←/g, '<-')
  .replace(/[‘’‛]/g, "'").replace(/[“”]/g, '"')
  .replace(/[–—]/g, '-').replace(/…/g, '...').replace(/ /g, ' ')

// Fixed six-stage ladder metadata (matches the web assessment tool).
const LADDER = [
  { n: 1, name: 'Zero', sub: 'AI assists, humans act' },
  { n: 2, name: 'Guided', sub: 'AI recommends, humans approve' },
  { n: 3, name: 'Insight', sub: 'AI infers unprompted' },
  { n: 4, name: 'Operational', sub: 'AI acts, humans supervise' },
  { n: 5, name: 'Proactive', sub: 'AI predicts, humans steer' },
  { n: 6, name: 'Full', sub: 'AI self-governs, humans guide' },
]

const firstSentence = (s = '') => {
  const m = String(s).match(/^.*?[.!?](\s|$)/)
  return (m ? m[0] : String(s)).trim()
}
const lc = (s = '') => s.charAt(0).toLowerCase() + s.slice(1)

/**
 * Full, personalized "Executive Edition" AI Adoption Assessment as a jsPDF doc.
 * Everything is drawn natively (vector) so charts, the maturity ladder, the
 * positioning quadrant, tables, and page breaks stay crisp. All content is
 * derived from the respondent's scored answers.
 * @returns {{ doc: import('jspdf').jsPDF, filename: string }}
 */
export function buildAiExecutiveReportDoc({ profile = {}, answers = {} }) {
  const scored = scoreAssessment(answers, getAQ(profile.role))
  const { stage, sectionAverages = {} } = scored
  const findings = buildFindings(sectionAverages)
  const suggested = suggestedNextSteps({ role: profile.role, stageIndex: stage.index, sectionAverages })
  const pos = positioningRead({ sectionAverages, stageIndex: stage.index })

  // ── Palette ──────────────────────────────────────────────────────────────
  const NAVY = [15, 58, 90]
  const BLUE = [33, 96, 196]
  const ADDED = [47, 106, 208]
  const OLIVE = [111, 143, 63]
  const GREEN = [145, 196, 107]
  const AMBER = [240, 151, 78]
  const INK = [23, 32, 47]
  const BODY = [74, 85, 104]
  const MUTED = [131, 142, 158]
  const HAIR = [228, 232, 238]
  const TINTB = [238, 244, 251]
  const TINTG = [242, 247, 236]
  const DARK = [11, 39, 64]

  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 54
  const maxW = pageW - margin * 2
  const HEADER_BOTTOM = 92
  const FOOTER_LIMIT = pageH - 64
  let y = margin
  let currentHeader = null

  // ── Derived, personalized content ──────────────────────────────────────────
  const who = profile.companyName || (profile.fullName ? `${profile.fullName}'s organization` : 'Your organization')
  const dims = sections.map(s => ({ key: s.key, label: s.label, v: sectionAverages[s.key] || 0 }))
  const ranked = [...dims].sort((a, b) => b.v - a.v)
  const topDim = ranked[0]
  const lowDim = ranked[ranked.length - 1]
  const minV = lowDim.v, maxV = topDim.v
  const overallBand = scoreBarStyle(minV).label
  const balanced = (maxV - minV) <= 0.8
  const isFin = /financ/i.test(profile.sector || '')
  const adoptionV = sectionAverages.Adoption || 0
  const adoptionLive = adoptionV >= 4
    ? 'AI is live, executive backed, and generating tracked value'
    : adoptionV >= 3
      ? 'AI is in production in places and beginning to show measured value'
      : 'AI is early, with the first use cases still proving their value'
  const nextStageIdx = Math.min(stage.index + 1, 6)
  const bandPhrase = pos.groupLabel === 'AI Leaders' ? 'in or near the AI Leaders band' : `in the ${pos.groupLabel} group`

  // ── Low-level helpers ───────────────────────────────────────────────────────
  const setFill = (c) => doc.setFillColor(c[0], c[1], c[2])
  const setDraw = (c) => doc.setDrawColor(c[0], c[1], c[2])
  const setText = (c) => doc.setTextColor(c[0], c[1], c[2])

  const drawLogo = (x, baseline, size = 13) => {
    const t = size * 0.95
    setFill(GREEN)
    doc.triangle(x, baseline - t + 2, x + t * 0.85, baseline - t + 2, x, baseline + 1, 'F')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); setText(NAVY)
    doc.text('RADIANT', x + t + 4, baseline)
    return doc.getTextWidth('RADIANT') + t + 4
  }

  const drawHeader = (label) => {
    const w = drawLogo(margin, 54, 13)
    if (label) {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(MUTED); doc.setCharSpace(1.4)
      doc.text(clean(label).toUpperCase(), margin + w + 14, 52)
      doc.setCharSpace(0)
    }
    setDraw(HAIR); doc.setLineWidth(1); doc.line(margin, 70, pageW - margin, 70)
  }

  const newPage = () => { doc.addPage(); drawHeader(currentHeader); y = HEADER_BOTTOM }
  const ensure = (space) => { if (y + space > FOOTER_LIMIT) newPage() }
  const gap = (n = 10) => { y += n }

  const section = (label) => { currentHeader = label; newPage() }

  const kicker = (text, color = OLIVE) => {
    ensure(22)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); setText(color); doc.setCharSpace(1.4)
    doc.text(clean(text).toUpperCase(), margin, y); doc.setCharSpace(0); y += 18
  }
  const h1 = (text, size = 30) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); setText(NAVY)
    const lines = doc.splitTextToSize(clean(text), maxW)
    lines.forEach(l => { ensure(size + 4); doc.text(l, margin, y); y += size + 2 })
  }
  const h2 = (text, size = 20, color = NAVY) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); setText(color)
    const lines = doc.splitTextToSize(clean(text), maxW)
    lines.forEach(l => { ensure(size + 6); doc.text(l, margin, y); y += size + 3 })
    y += 3
  }
  const h3 = (text, color = NAVY, size = 12) => {
    ensure(size + 8); gap(2)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); setText(color)
    const lines = doc.splitTextToSize(clean(text), maxW)
    lines.forEach(l => { ensure(size + 4); doc.text(l, margin, y); y += size + 3 })
  }
  const para = (text, { size = 10.5, color = BODY, bold = false, indent = 0, lead = 6, gapAfter = 8 } = {}) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size); setText(color)
    const lines = doc.splitTextToSize(clean(text), maxW - indent)
    lines.forEach(l => { ensure(size + lead); doc.text(l, margin + indent, y); y += size + lead })
    gap(gapAfter)
  }
  const rule = () => { gap(6); ensure(16); setDraw(HAIR); doc.setLineWidth(1); doc.line(margin, y, pageW - margin, y); gap(16) }

  // Rounded filled/stroked block; returns nothing, advances y past it.
  const measureLines = (text, w, size, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size)
    return doc.splitTextToSize(clean(text), w)
  }

  const callout = ({ label, title, body, accent = GREEN, tint = TINTG, labelColor = OLIVE, bodyColor = BODY }) => {
    const padX = 16, padY = 14, innerW = maxW - padX * 2
    const labelLines = label ? 1 : 0
    const titleLines = title ? measureLines(title, innerW, 12, true) : []
    const bodyLines = body ? measureLines(body, innerW, 10.5) : []
    const boxH = padY * 2 + labelLines * 14 + titleLines.length * 15 + (title && body ? 6 : 0) + bodyLines.length * 15
    ensure(boxH + 8)
    setFill(tint); doc.roundedRect(margin, y, maxW, boxH, 6, 6, 'F')
    setFill(accent); doc.rect(margin, y, 4, boxH, 'F')
    let ty = y + padY + 9
    if (label) {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(labelColor); doc.setCharSpace(1.2)
      doc.text(clean(label).toUpperCase(), margin + padX, ty); doc.setCharSpace(0); ty += 14
    }
    if (title) {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(12); setText(NAVY)
      titleLines.forEach(l => { doc.text(l, margin + padX, ty); ty += 15 }); ty += 6
    }
    if (body) {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); setText(bodyColor)
      bodyLines.forEach(l => { doc.text(l, margin + padX, ty); ty += 15 })
    }
    y += boxH; gap(12)
  }

  const numberItem = (n, title, body, { accent = BLUE, hollow = false, tint = TINTB } = {}) => {
    const padX = 16, padY = 13, textX = margin + padX + 34, innerW = maxW - padX - 34 - padX
    const titleLines = measureLines(title, innerW, 11.5, true)
    const bodyLines = body ? measureLines(body, innerW, 10.5) : []
    const boxH = padY * 2 + titleLines.length * 14 + (body ? 4 + bodyLines.length * 14 : 0)
    ensure(boxH + 6)
    setFill(tint); doc.roundedRect(margin, y, maxW, boxH, 8, 8, 'F')
    const cx = margin + padX + 12, cy = y + padY + 8
    if (hollow) { setDraw(accent); doc.setLineWidth(1.5); doc.circle(cx, cy, 11, 'S'); setText(accent) }
    else { setFill(accent); doc.circle(cx, cy, 12, 'F'); setText([255, 255, 255]) }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.text(String(n), cx, cy + 3.8, { align: 'center' })
    let ty = y + padY + 8
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11.5); setText(NAVY)
    titleLines.forEach(l => { doc.text(l, textX, ty); ty += 14 }); ty += 4
    if (body) {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); setText(BODY)
      bodyLines.forEach(l => { doc.text(l, textX, ty); ty += 14 })
    }
    y += boxH; gap(10)
  }

  // Generic table. cols: [{header,width,color?}]; rows: array of string[]
  const table = (cols, rows) => {
    ensure(30)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(BLUE); doc.setCharSpace(0.5)
    let x = margin
    cols.forEach(c => { doc.text(clean(c.header).toUpperCase(), x + 8, y); x += c.width })
    doc.setCharSpace(0); y += 6
    setDraw(BLUE); doc.setLineWidth(1.5); doc.line(margin, y, margin + maxW, y); y += 4
    rows.forEach(r => {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5)
      const cellLines = r.map((txt, i) => doc.splitTextToSize(clean(String(txt)), cols[i].width - 16))
      const rowH = Math.max(...cellLines.map(l => l.length)) * 12 + 12
      ensure(rowH)
      let xx = margin
      cellLines.forEach((lines, i) => {
        setText(cols[i].color || BODY)
        let yy = y + 13
        lines.forEach(l => { doc.text(l, xx + 8, yy); yy += 12 })
        xx += cols[i].width
      })
      y += rowH
      setDraw(HAIR); doc.setLineWidth(0.75); doc.line(margin, y, margin + maxW, y); y += 2
    })
    gap(8)
  }

  const statCards = (cards) => {
    const gapX = 14, cw = (maxW - gapX * (cards.length - 1)) / cards.length, ch = 62
    ensure(ch + 6)
    cards.forEach((c, i) => {
      const x = margin + i * (cw + gapX)
      setDraw(HAIR); doc.setLineWidth(1); doc.roundedRect(x, y, cw, ch, 8, 8, 'S')
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(OLIVE); doc.setCharSpace(1)
      doc.text(clean(c.k).toUpperCase(), x + 16, y + 22); doc.setCharSpace(0)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(19); setText(NAVY)
      doc.text(clean(c.v), x + 16, y + 46)
    })
    y += ch; gap(12)
  }

  const threeCards = (cards) => {
    const gapX = 14, cw = (maxW - gapX * (cards.length - 1)) / cards.length
    const titleLinesArr = cards.map(c => measureLines(c.v, cw - 32, 13, true))
    const subLinesArr = cards.map(c => c.d ? measureLines(c.d, cw - 32, 8.5) : [])
    const ch = Math.max(...cards.map((c, i) => 60 + titleLinesArr[i].length * 15 + subLinesArr[i].length * 11))
    ensure(ch + 6)
    cards.forEach((c, i) => {
      const x = margin + i * (cw + gapX)
      setFill([247, 249, 252]); doc.roundedRect(x, y, cw, ch, 8, 8, 'F')
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(MUTED); doc.setCharSpace(1)
      doc.text(clean(c.k).toUpperCase(), x + 16, y + 22); doc.setCharSpace(0)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(13); setText(NAVY)
      let ty = y + 42
      titleLinesArr[i].forEach(l => { doc.text(l, x + 16, ty); ty += 15 })
      if (c.d) {
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); setText(MUTED); ty += 4
        subLinesArr[i].forEach(l => { doc.text(l, x + 16, ty); ty += 11 })
      }
    })
    y += ch; gap(12)
  }

  const scoreBar = (label, v) => {
    ensure(30)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); setText(INK)
    doc.text(clean(label), margin, y)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); setText(MUTED)
    doc.text(`${v ? v.toFixed(1) : '--'} / 5   ·   ${scoreBarStyle(v).label}`, margin + maxW, y, { align: 'right' })
    y += 8
    setFill([238, 241, 244]); doc.roundedRect(margin, y, maxW, 10, 3, 3, 'F')
    setFill(GREEN); doc.roundedRect(margin, y, Math.max(6, maxW * (v / 5)), 10, 3, 3, 'F')
    y += 22
  }

  const ctaPanel = ({ kickerText, big, url, btn }) => {
    const boxH = 118
    ensure(boxH + 6)
    setFill(DARK); doc.roundedRect(margin, y, maxW, boxH, 10, 10, 'F')
    const px = margin + 26
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); setText(GREEN); doc.setCharSpace(1.2)
    doc.text(clean(kickerText).toUpperCase(), px, y + 30); doc.setCharSpace(0)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(17); setText([255, 255, 255])
    doc.text(clean(big), px, y + 56)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); setText([159, 178, 196])
    doc.text(clean(url), px, y + 74)
    setFill(GREEN); doc.roundedRect(px, y + 84, 118, 24, 4, 4, 'F')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); setText([34, 53, 15]); doc.setCharSpace(1)
    doc.text(clean(btn), px + 59, y + 100, { align: 'center' }); doc.setCharSpace(0)
    y += boxH; gap(12)
  }

  // ═══════════════════ PAGE 1 — COVER ═══════════════════
  drawLogo(margin, 54, 15)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); setText(MUTED); doc.setCharSpace(1.6)
  doc.text('CONFIDENTIAL, EXECUTIVE BRIEFING', pageW - margin, 52, { align: 'right' }); doc.setCharSpace(0)
  y = 132
  kicker('An Executive Briefing on Enterprise AI Maturity')
  gap(20)
  h1('AI Adoption Assessment', 32)
  gap(8)
  para("A structured diagnostic of your organization's AI maturity, execution readiness, and the fastest path to compounding advantage.",
    { size: 12, color: BODY, lead: 7, gapAfter: 4 })
  rule()
  if (profile.fullName || profile.companyName) {
    h3(`Prepared for ${[profile.fullName, profile.companyName].filter(Boolean).join('  ·  ')}`, INK, 13); gap(4)
  }
  const metaBits = [profile.sector, profile.orgSize ? `${profile.orgSize} employees` : null, profile.department,
    profile.role ? `${ROLE_LABEL[profile.role] || profile.role} Track` : null].filter(Boolean)
  if (metaBits.length) para(metaBits.join('  ·  '), { size: 9.5, color: MUTED, lead: 3, gapAfter: 2 })
  para(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), { size: 9.5, color: MUTED, lead: 3 })
  gap(12)
  kicker(`Your stage: ${stage.index} of 6, and you are doing well`)

  // Maturity ladder
  gap(14)
  const ladderBaseline = y + 156
  const gapL = 12, colW = (maxW - gapL * 5) / 6, maxBarH = 132
  const heights = [0.34, 0.48, 0.60, 0.74, 0.88, 1.0]
  LADDER.forEach((r, i) => {
    const bx = margin + i * (colW + gapL)
    const bh = heights[i] * maxBarH
    const byTop = ladderBaseline - bh
    const here = r.n === stage.index
    if (here) { setFill(GREEN); doc.roundedRect(bx, byTop, colW, bh, 6, 6, 'F') }
    else { setDraw(HAIR); doc.setLineWidth(1.2); doc.roundedRect(bx, byTop, colW, bh, 6, 6, 'S') }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(15); setText(here ? [34, 53, 15] : NAVY)
    doc.text(String(r.n), bx + colW / 2, byTop + bh / 2 - 2, { align: 'center' })
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); setText(here ? [34, 53, 15] : NAVY)
    doc.text(r.name, bx + colW / 2, byTop + bh / 2 + 12, { align: 'center' })
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.8); setText(MUTED)
    doc.splitTextToSize(r.sub, colW).forEach((l, k) => doc.text(l, bx + colW / 2, ladderBaseline + 12 + k * 8, { align: 'center' }))
    if (here) {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); setText(OLIVE); doc.setCharSpace(0.8)
      doc.text('YOU ARE HERE', bx + colW / 2, byTop - 20, { align: 'center' }); doc.setCharSpace(0)
      doc.setFontSize(12); doc.text('v', bx + colW / 2, byTop - 8, { align: 'center' })
    }
  })
  y = ladderBaseline + 34
  callout({ label: 'Original Finding', title: stage.tagline, body: stage.description })

  // ═══════════════════ PAGE 2 — CONTENTS (reserved, filled later) ═══════════════════
  doc.addPage(); const tocPage = doc.internal.getNumberOfPages()

  const pageMap = {}
  const record = (key) => { pageMap[key] = doc.internal.getNumberOfPages() }

  // ═══════════════════ 01 — EXECUTIVE SUMMARY ═══════════════════
  section('Executive Summary'); record('exec')
  kicker('01 · Added Section', ADDED)
  h2('Executive Summary & Recommendations')
  callout({
    label: 'Bottom Line',
    body: `${who} scores as Stage ${stage.index}, ${stage.name}, placing it ${bandPhrase} (Execution Readiness ${pos.execPct}/100, Strategic Maturity ${pos.stratPct}/100). ${adoptionLive}. The single highest leverage next step is ${lc(suggested.steps[0]?.title || 'a focused readiness audit')}, because ${lowDim.label} is the dimension most likely to gate further progress toward Stage ${nextStageIdx}.`,
  })
  gap(4)
  h3('Key takeaways', NAVY, 12); gap(6)
  numberItem(1, balanced ? 'Strong, balanced foundation' : 'A profile with clear leaders and laggards',
    balanced
      ? `All four dimensions land in the "${overallBand}" range (${minV.toFixed(1)} to ${maxV.toFixed(1)} of 5), with no single weak spot dragging down the profile.`
      : `${topDim.label} leads at ${maxV.toFixed(1)} while ${lowDim.label} trails at ${minV.toFixed(1)} of 5 — the spread is where focused effort pays off fastest.`)
  numberItem(2, `${topDim.label} is ahead of ${lowDim.label}`,
    `${topDim.label} (${maxV.toFixed(1)}) outpaces ${lowDim.label} (${minV.toFixed(1)}), a common pattern where capability in one area runs ahead of the foundations that must support it at scale.`)
  numberItem(3, `Progress to Stage ${nextStageIdx} runs through ${lowDim.label}`,
    `The path forward depends on strengthening ${lowDim.label}${isFin ? ', especially given the regulated Financial Services setting' : ''} — governance, guardrails, and readiness — not on deploying more models.`)
  gap(4)
  h3('Recommended sequence', NAVY, 12)
  table(
    [{ header: 'Step', width: 44, color: INK }, { header: 'Action', width: 210, color: INK }, { header: 'Why now', width: maxW - 254, color: INK }],
    suggested.steps.map((s, i) => [String(i + 1), s.title, firstSentence(s.detail)]),
  )

  // ═══════════════════ 02 — ABOUT + 03 SCORES ═══════════════════
  section('About This Assessment'); record('about')
  kicker('02 · Added Section', ADDED)
  h2('About This Assessment')
  para(`This briefing expands Radiant Digital's AI Adoption Assessment for ${profile.fullName || 'your organization'} into a full executive review format. The underlying findings, scores, and recommendation come directly from your responses. The presentation adds this table of contents, supporting exhibits matched to the web experience, a methodology section, and the executive summary you just read.`, { lead: 7 })
  threeCards([
    { k: 'Scope', v: profile.department || 'Enterprise / Cross-functional', d: [profile.sector, profile.orgSize ? `${profile.orgSize} employees` : null].filter(Boolean).join(', ') },
    { k: 'Track', v: `${ROLE_LABEL[profile.role] || 'Executive'} Track`, d: 'Leadership level readout & roadmap' },
    { k: 'Prepared', v: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), d: 'Radiant Digital, AI Adoption Assessment' },
  ])
  rule()
  record('scores')
  kicker('Scores by Dimension')
  h2(balanced ? 'A well rounded profile' : 'A profile with room to balance', 20)
  gap(8)
  dims.forEach(d => scoreBar(d.label, d.v))
  gap(2)
  para('EXHIBIT 2, DIMENSION SCORECARD', { size: 8.5, color: BLUE, bold: true, lead: 3, gapAfter: 2 })
  para('Bar style matches the web assessment tool.', { size: 8.5, color: MUTED, lead: 3 })

  // ═══════════════════ 04 — COMPETITIVE POSITIONING ═══════════════════
  section('Competitive Positioning'); record('positioning')
  kicker('Competitive Positioning')
  h2('Where you sit relative to AI Leaders')
  para(`Reading the shape: ${topDim.label} leads at ${maxV.toFixed(1)}, while ${lowDim.label} (${minV.toFixed(1)}) is the lever most likely to gate further gains — which lines up with the data readiness recommendation later in this report.`, { size: 10, color: ADDED, lead: 6 })
  // Quadrant
  gap(6)
  const qx = margin + 24, qw = maxW - 40, qy = y, qh = 300
  ensure(qh + 30)
  setDraw(HAIR); doc.setLineWidth(1.2)
  doc.line(qx, qy, qx, qy + qh); doc.line(qx, qy + qh, qx + qw, qy + qh)
  // dashed diagonal
  doc.setLineDashPattern([3, 3], 0); setDraw([201, 211, 223])
  doc.line(qx, qy + qh, qx + qw, qy); doc.setLineDashPattern([], 0)
  const ell = (cxf, cyf, rxf, ryf, fill, label, lc2) => {
    setFill(fill); doc.ellipse(qx + cxf * qw, qy + cyf * qh, rxf * qw, ryf * qh, 'F')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); setText(lc2)
    doc.text(label, qx + cxf * qw, qy + cyf * qh + 3, { align: 'center' })
  }
  ell(0.22, 0.80, 0.18, 0.11, [233, 236, 241], 'Early Movers', [58, 70, 88])
  ell(0.50, 0.52, 0.17, 0.11, [219, 234, 240], 'Progressing', [58, 70, 88])
  ell(0.78, 0.26, 0.16, 0.10, [228, 240, 214], 'AI Leaders', [74, 95, 44])
  const dotX = qx + Math.min(0.94, Math.max(0.06, pos.execPct / 100)) * qw
  const dotY = qy + qh - Math.min(0.94, Math.max(0.06, pos.stratPct / 100)) * qh
  setFill(GREEN); setDraw([95, 138, 46]); doc.setLineWidth(2.5); doc.circle(dotX, dotY, 7, 'FD')
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9); setText(NAVY)
  doc.text('Your Org', dotX, dotY - 14, { align: 'center' })
  doc.setFont('helvetica', 'normal'); doc.setFontSize(8); setText(MUTED)
  doc.text('Strategic Maturity ->', qx - 8, qy - 6)
  doc.text('Execution Readiness ->', qx + qw, qy + qh + 16, { align: 'right' })
  y = qy + qh + 30
  para('EXHIBIT 3, EXECUTION READINESS VERSUS STRATEGIC MATURITY', { size: 8.5, color: BLUE, bold: true, lead: 3 })

  // ═══════════════════ 05 — WHAT WE SEE ═══════════════════
  section('What We See'); record('see')
  statCards([{ k: 'Execution Readiness', v: `${pos.execPct} / 100` }, { k: 'Strategic Maturity', v: `${pos.stratPct} / 100` }])
  callout({ label: `${pos.groupLabel} · ${pos.stageRange}`, body: pos.meansText, accent: GREEN, tint: TINTG })
  kicker('What We See')
  h2('Strengths', 20)
  gap(4)
  const strengths = findings.strengths || []
  if (strengths.length) {
    strengths.forEach(f => { h3(`${f.section}: ${f.title}`, NAVY, 12); para(f.body, { indent: 0, lead: 6 }) })
  } else {
    h3(`${topDim.label}: your leading dimension`, NAVY, 12)
    para(`At ${maxV.toFixed(1)} of 5, ${topDim.label} is where your organization is strongest today — the foundation the rest of the roadmap builds on.`)
  }
  rule()
  h3('Considerations to watch', ADDED, 12)
  para(`A rigorous diagnostic pairs every strength with a corresponding risk. Two considerations are typical for organizations at Stage ${stage.index} and worth tracking deliberately:`, { color: ADDED, lead: 6 })
  const gaps = findings.gaps || []
  if (gaps.length) {
    gaps.slice(0, 2).forEach((g, i) => numberItem(i + 1, `${g.section}: ${g.title}`, g.body, { hollow: true }))
  } else {
    numberItem(1, 'Prediction accuracy without adequate monitoring',
      'As AI moves from recommending to prescribing, the cost of an unmonitored bad prediction rises. Model drift and edge-case monitoring become a governance requirement, not a data-science nicety.', { hollow: true })
  }
  if (isFin) {
    numberItem(gaps.length ? Math.min(gaps.length, 2) + 1 : 2, 'Explainability and stakeholder trust',
      'In Financial Services specifically, AI-driven decisions that affect customers or capital typically need to be explainable to regulators, auditors, and customers themselves, not just accurate.', { hollow: true })
  }

  // ═══════════════════ 06 — RECOMMENDED NEXT STEP + 07 RADIANT'S READ ═══════════════════
  section('Recommended Next Step'); record('next')
  kicker('Your Recommended Next Step')
  h2(`Priority: ${lowDim.label}`)
  para(`${suggested.steps[0]?.detail || `Strengthen ${lc(lowDim.label)} before the next major deployment.`} The output is a foundation that makes every future project faster and every AI output more trustworthy.`, { lead: 7 })
  h3('Illustrative 60 day breakdown', ADDED, 12)
  const focusNoun = lowDim.label
  table(
    [{ header: 'Phase', width: 90, color: ADDED }, { header: 'Weeks', width: 70, color: ADDED }, { header: 'Focus', width: maxW - 160, color: ADDED }],
    [
      ['Discovery', '1 to 2', `Inventory current ${focusNoun}, owners, and usage across systems`],
      ['Assessment', '3 to 6', `Score maturity, access, and readiness. Flag the highest-impact gaps.`],
      ['Roadmap', '7 to 8', `Deliver a prioritized remediation plan and a go / no-go for the next deployment`],
    ],
  )
  para('Added: illustrative phasing of the audit named in the recommendation, for planning purposes.', { size: 8.5, color: MUTED, lead: 3 })
  rule()
  record('radiant')
  kicker("Radiant's Read")
  h2(`Our perspective on Stage ${stage.index} organizations`, 18)
  para(aiRadiantRead[stage.index] || aiRadiantRead[6], { lead: 7 })

  // ═══════════════════ 08 — WHAT AI LEADERS DO ═══════════════════
  section('What AI Leaders Do'); record('leaders')
  const leaders = LEADER_CONTENT[stage.index] || LEADER_CONTENT[6]
  kicker('What AI Leaders Do')
  h2(leaders.heading)
  para(leaders.context, { lead: 7 })
  if (leaders.statBadge) {
    callout({ label: 'Benchmark', title: `${leaders.statBadge.value}   ${leaders.statBadge.label}`, accent: OLIVE, tint: TINTG })
  }
  leaders.actions.forEach((a, i) => numberItem(i + 1, a.title, a.body, { accent: GREEN }))
  if (isFin) {
    callout({ label: 'Added, why this matters in Financial Services', accent: ADDED, tint: TINTB, labelColor: ADDED, bodyColor: ADDED,
      body: 'Autonomous, end-to-end resolution is more consequential in a regulated industry: every workflow AI is allowed to run unattended is also one your compliance and audit functions need to be able to explain after the fact.' })
  }

  // ═══════════════════ 09 — YOUR NEXT MOVE + 10 METHODOLOGY ═══════════════════
  section('Your Next Move'); record('move')
  kicker('Your Next Move')
  h2(stage.index >= 6 ? 'Sustaining Full Autonomy' : `Ready to move to Stage ${nextStageIdx}?`)
  para('Radiant Digital has helped enterprises across 14+ industries move through every stage of AI maturity. A 30 minute conversation is enough to map exactly where to start.', { lead: 7 })
  ctaPanel({ kickerText: 'Schedule 30 minutes with Radiant Digital', big: 'hello@radiant.digital', url: 'radiant.digital', btn: "LET'S EMBARK" })
  rule()
  record('methodology')
  kicker('10 · Added Section', ADDED)
  h2('Assessment Methodology')
  para('This assessment scores four dimensions on a 5 point scale, then rolls them up into two composite indices, Execution Readiness and Strategic Maturity, which place the organization on the six stage maturity ladder shown earlier.', { color: ADDED, lead: 7 })
  h3('Scoring dimensions', NAVY, 12)
  table(
    [{ header: 'Dimension', width: 170, color: BODY }, { header: 'What it measures', width: maxW - 170, color: BODY }],
    [
      ['Strategy & Leadership', 'Executive alignment, stated direction, and resourcing behind the AI agenda'],
      ['Data & Technology', 'Data readiness, tooling, and infrastructure available to support deployment'],
      ['People & Governance', 'Skills, change management, and the guardrails that govern AI decisions'],
      ['Adoption & Value', 'Breadth of live deployments and evidence of tracked, measurable impact'],
    ],
  )
  h3('1 to 5 scale', NAVY, 12)
  table(
    [{ header: 'Score', width: 90, color: BODY }, { header: 'Interpretation', width: maxW - 90, color: BODY }],
    [
      ['1 to 2', 'Nascent, informal or absent'],
      ['3', 'Developing, present but inconsistent'],
      ['4', 'Strong, consistent and reasonably mature'],
      ['5', 'Leading, best practice, enterprise wide'],
    ],
  )

  // ═══════════════════ 11 — CONCLUSION ═══════════════════
  section('Conclusion'); record('conclusion')
  kicker('11 · Added Section', ADDED)
  h2('Conclusion')
  callout({ label: 'In One Line', accent: ADDED, tint: TINTB, labelColor: ADDED, bodyColor: ADDED,
    body: `You are a Stage ${stage.index} organization ${bandPhrase}. The next stage is earned through ${lowDim.label}, not more models, and the work starts with strengthening your weakest foundation.` })
  gap(4)
  para(`${who} sits at Stage ${stage.index} of 6, ${stage.name}, placing it ${bandPhrase}. Execution Readiness scores ${pos.execPct} of 100 and Strategic Maturity ${pos.stratPct} of 100, and the dimension scores range from ${minV.toFixed(1)} to ${maxV.toFixed(1)} of 5. ${adoptionLive}.`, { color: ADDED, lead: 7 })
  para(`The one structural tension worth naming is that ${topDim.label} (${maxV.toFixed(1)}) is running ahead of ${lowDim.label} (${minV.toFixed(1)}). That is a common signature at this stage: capability outpacing the foundations that must support it at scale. It is not a weakness today, but it is precisely where organizations at Stage ${stage.index} most often stall on the way to the next.`, { color: ADDED, lead: 7 })
  const stepList = suggested.steps.map((s, i) => `${i + 1}) ${lc(s.title)}`).join(', ')
  para(`The recommended sequence follows directly: ${stepList}. Executed in order along Radiant Digital's Assess -> Train -> Adopt -> Scale -> Sustain model, these moves convert today's position into durable, compounding advantage.`, { color: ADDED, lead: 7 })
  para('The advantage compounds only for organizations whose governance is mature enough to trust prediction with action. This organization is close. The remaining distance is deliberate, sequenced work, and it is well within reach.', { color: ADDED, lead: 7 })

  // ═══════════════════ 12 — GET IN TOUCH ═══════════════════
  section('Get in Touch'); record('touch')
  kicker('12 · Added Section', ADDED)
  h2('Get in Touch')
  para('Speak directly with the Radiant Digital leaders behind this assessment. They can map exactly where to start and what the next stage looks like for your organization.', { color: ADDED, lead: 7 })
  gap(6)
  const people = [
    { photo: PRAFULL_PHOTO, name: 'Prafull Khare', title: 'Executive Director | Global Head of AI Strategy, Solution Engineering, & New Technology Enablement', org: 'Radiant Digital', email: 'prafull.khare@radiant.digital' },
    { photo: SRINIVAS_PHOTO, name: 'Srinivas Chamarthi', title: 'SVP & Business Head', org: 'Radiant Digital', email: 'srinivas.chamarthi@radiant.digital' },
  ]
  const gapP = 20, pcw = (maxW - gapP) / 2
  const titleLinesArr = people.map(p => measureLines(`${p.title}  ·  ${p.org}`, pcw - 40, 9))
  const pch = 150 + Math.max(...titleLinesArr.map(l => l.length)) * 12
  ensure(pch + 6)
  people.forEach((p, i) => {
    const x = margin + i * (pcw + gapP)
    setDraw(HAIR); doc.setLineWidth(1); doc.roundedRect(x, y, pcw, pch, 10, 10, 'S')
    const cxp = x + pcw / 2
    const av = 64
    doc.addImage(p.photo, 'PNG', cxp - av / 2, y + 16, av, av)
    setDraw(HAIR); doc.setLineWidth(1); doc.circle(cxp, y + 16 + av / 2, av / 2, 'S')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(13); setText(NAVY)
    doc.text(clean(p.name), cxp, y + 96, { align: 'center' })
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); setText(BODY)
    let ty = y + 112
    titleLinesArr[i].forEach(l => { doc.text(l, cxp, ty, { align: 'center' }); ty += 12 })
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); setText(OLIVE)
    doc.text(clean(p.email), cxp, ty + 6, { align: 'center' })
  })
  y += pch; gap(12)
  para('Reach either of us directly, or email hello@radiant.digital to schedule a 30 minute conversation.', { size: 8.5, color: MUTED, lead: 4 })

  // ═══════════════════ FILL TABLE OF CONTENTS (page 2) ═══════════════════
  doc.setPage(tocPage)
  drawHeader('Contents')
  y = HEADER_BOTTOM
  h2('Contents', 22, NAVY)
  para('Added for this executive edition. New material is shown in blue throughout. Every entry below links to its page.', { color: ADDED, lead: 6 })
  gap(6)
  const toc = [
    ['01', 'Executive Summary & Recommendations', pageMap.exec],
    ['02', 'About This Assessment', pageMap.about],
    ['03', 'Scores by Dimension', pageMap.scores],
    ['04', 'Competitive Positioning', pageMap.positioning],
    ['05', 'What We See', pageMap.see],
    ['06', 'Your Recommended Next Step', pageMap.next],
    ['07', "Radiant's Read", pageMap.radiant],
    ['08', 'What AI Leaders Do', pageMap.leaders],
    ['09', 'Your Next Move', pageMap.move],
    ['10', 'Assessment Methodology', pageMap.methodology],
    ['11', 'Conclusion', pageMap.conclusion, true],
    ['12', 'Get in Touch', pageMap.touch, true],
  ]
  toc.forEach(([idx, title, pg, isNew]) => {
    const col = isNew ? ADDED : BLUE
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); setText(col)
    doc.text(idx, margin, y)
    doc.setFont('helvetica', isNew ? 'bold' : 'normal'); doc.setFontSize(11); setText(col)
    doc.text(clean(title), margin + 34, y)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); setText(MUTED)
    doc.text(String(pg || ''), pageW - margin, y, { align: 'right' })
    y += 11
    setDraw(HAIR); doc.setLineWidth(0.75); doc.line(margin, y, pageW - margin, y)
    y += 12
  })
  gap(10)
  callout({ label: 'Editorial Note, Added', accent: ADDED, tint: TINTB, labelColor: ADDED, bodyColor: ADDED,
    body: 'Findings, scores, and the recommendation are generated from your assessment responses. The narrative, exhibits, methodology, and this table of contents were added for the expanded executive edition and are shown in blue.' })

  // ═══════════════════ FOOTERS (all pages except cover) ═══════════════════
  const pages = doc.internal.getNumberOfPages()
  for (let p = 2; p <= pages; p++) {
    doc.setPage(p)
    setDraw(HAIR); doc.setLineWidth(1); doc.line(margin, pageH - 40, pageW - margin, pageH - 40)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); setText(MUTED)
    doc.text('Radiant Digital  ·  hello@radiant.digital  ·  radiant.digital', margin, pageH - 24)
    doc.text(`Page ${p}`, pageW - margin, pageH - 24, { align: 'right' })
  }

  const safeCompany = (profile.companyName || profile.fullName || 'Radiant').replace(/[^a-z0-9]+/gi, '-')
  const filename = `AI-Adoption-Assessment-Executive-${safeCompany}.pdf`
  return { doc, filename }
}
