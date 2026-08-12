import { jsPDF } from 'jspdf'
import {
  getAQ, scoreAssessment, buildFindings, sections, scoreBarStyle,
} from '../data/aiAssessment.js'
import { aiRadiantRead, suggestedNextSteps, positioningRead } from '../data/reportEditorial.js'
import { LEADER_CONTENT } from '../components/assessment/WhatAILeadersDo.jsx'
import { PRAFULL_PHOTO, SRINIVAS_PHOTO } from './leaderPhotos.js'
import { RADIANT_LOGO_DARK } from './radiantLogo.js'
import { ICONS } from './reportIcons.js'

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

  // ── Palette (radiant-onepager brand system) ────────────────────────────────
  const NAVY = [7, 70, 97]        // Deep Navy  #074661
  const TEAL = [5, 150, 174]      // Teal Blue  #0596ae
  const GREEN = [145, 195, 108]   // Leaf       #91C36C
  const CREAM = [230, 225, 204]   // Cream      #E6E1CC
  const AMBER = [228, 98, 64]     // Coral      #e46240
  const INK = [35, 31, 32]        // Near Black #231f20
  const BODY = [74, 85, 104]
  const MUTED = [131, 142, 158]
  const HAIR = [228, 232, 238]
  const TINTB = [237, 245, 247]   // light teal panel
  const TINTG = [242, 247, 236]   // light leaf panel
  const DARK = [7, 70, 97]        // hero / CTA / footer navy
  // Legacy aliases retained so existing call sites keep working, remapped to brand.
  const BLUE = TEAL
  const ADDED = TEAL
  const OLIVE = TEAL

  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 54
  const maxW = pageW - margin * 2
  const HEADER_BOTTOM = 108   // extra breathing room below the header rule (y=70)
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

  // Brand spacing scale (pt) — one source of truth for padding & gaps.
  const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 22, section: 26 }
  const PAD_X = SP.lg, PAD_Y = SP.md   // consistent card padding everywhere

  // Brand line-art icons (rasterized from the radiant-onepager icon library).
  // Aliased so each icon's bytes embed once and are referenced across pages.
  const drawIcon = (name, x, y, size) => {
    const data = ICONS[name] || ICONS.gear
    doc.addImage(data, 'PNG', x, y, size, size, `icon-${name}`, 'FAST')
  }
  const ICON_MAP = [
    [/data|integration|semantic|pipeline|inventory/i, 'data_integration'],
    [/governance|guardrail|complian|security|trust|oversight|approval|checkpoint/i, 'shield'],
    [/analytic|insight|report|dashboard|\bkpi\b|metric|scorecard/i, 'bar_chart'],
    [/automat|workflow|orchestrat|operational|\bops\b|routine/i, 'gear'],
    [/agent|\bbot\b/i, 'robot'],
    [/search|discover|audit|readiness/i, 'magnifying_glass'],
    [/cost|token|budget|\bvalue\b|\broi\b/i, 'dollar'],
    [/alert|monitor|observab|drift|anomaly|flag/i, 'bell'],
    [/resilien|recovery|\bhealth/i, 'heartbeat'],
    [/code|legacy|develop|engineer/i, 'code_brackets'],
    [/regulat|policy|explainab|document/i, 'document_check'],
    [/\brisk\b|warning/i, 'warning_triangle'],
    [/reconcil|\bsync\b|loop|continuous|feedback/i, 'cycle_arrows'],
    [/conversation|\bchat\b|\bnlp\b/i, 'speech_bubbles'],
    [/knowledge|literacy|training|\blearn|hub|wiki/i, 'book'],
    [/customer|\bcx\b|experience|people|\bteam|stakeholder/i, 'person_heart'],
    [/network|graph|connect|cross-functional|enterprise/i, 'connected_nodes'],
    [/speed|performance|fast|acceler|rapid/i, 'lightning'],
    [/partner|collaborat|align|leadership/i, 'handshake'],
    [/ethic|balance|fair|strateg/i, 'scale'],
    [/growth|scale|prescri|prioriti|adopt|productio/i, 'upward_chart'],
    [/predict|intelligen|machine learning|\bai\b|model|smart/i, 'ai_brain'],
    [/cloud|migrat|infrastructure/i, 'cloud'],
    [/build|tooling|deploy/i, 'wrench_gear'],
  ]
  const pickIcon = (text = '') => {
    for (const [re, name] of ICON_MAP) if (re.test(text)) return name
    return 'gear'
  }
  const DIM_ICON = { Strategy: 'scale', Data: 'data_integration', People: 'shield', Adoption: 'upward_chart' }

  // Real Radiant AI wordmark (navy PNG). Aspect ratio 192:24 = 8:1.
  // `baseline` is the text baseline the drawn version used; the image sits so its
  // optical middle aligns near that baseline. Returns the drawn width.
  const drawLogo = (x, baseline, size = 13) => {
    const h = size * 1.15
    const w = h * 8
    // Stable alias → jsPDF embeds the logo bytes once and references it on every page.
    doc.addImage(RADIANT_LOGO_DARK, 'PNG', x, baseline - h + 2, w, h, 'radiant-logo', 'FAST')
    return w
  }

  // Running header: logo only (no section label — the section title already
  // appears once as the H2, so repeating it here would triple it up).
  const drawHeader = () => {
    drawLogo(margin, 54, 13)
    setDraw(HAIR); doc.setLineWidth(1); doc.line(margin, 70, pageW - margin, 70)
  }

  const newPage = () => { doc.addPage(); drawHeader(currentHeader); y = HEADER_BOTTOM }
  const ensure = (space) => { if (y + space > FOOTER_LIMIT) newPage() }
  const gap = (n = 10) => { y += n }

  // ── Vertical rhythm: relationship-aware flow (space-BEFORE model) ────────────
  // Each drawable calls flow(kind) first; flow adds the correct gap ABOVE it based
  // on what preceded it, then records the kind. No element adds trailing space, so
  // gaps never double, and — critically — a heading gets ENOUGH space above it to
  // clear the cap height its text occupies, so it reads as attached to the content
  // BELOW it (fixes headings appearing glued to the block above).
  //   unit       section title -> content, and content -> content (uniform rhythm)
  //   tight      eyebrow -> its title
  //   couple     sub-heading -> its own content (small; the line advance adds more)
  //   headAbove  content -> a sub-heading / eyebrow (clear separation above)
  const RHY = { unit: 16, tight: 6, couple: 3, headAbove: 28 }
  const GAP = { block: 16 }   // legacy alias used by a few card helpers
  let prevKind = 'start'
  let flowOn = false          // off during the custom cover; on for the sections
  const flow = (kind) => {
    if (!flowOn) return
    const p = prevKind
    let g = 0
    if (p !== 'start' && p !== 'sectionrule') {
      if (kind === 'content') g = (p === 'subhead' || p === 'eyebrow') ? RHY.couple : RHY.unit
      else if (kind === 'subhead') g = (p === 'ruleafter') ? 0 : (p === 'title') ? RHY.unit : RHY.headAbove
      else if (kind === 'eyebrow') g = (p === 'ruleafter') ? 0 : RHY.headAbove
      else if (kind === 'title') g = (p === 'eyebrow') ? RHY.tight : RHY.headAbove
    }
    y += g
    prevKind = kind
  }

  // Major section divider: clear, consistent, larger than any in-section gap.
  const section = (minRoom = 175) => {
    if (y <= HEADER_BOTTOM + 2) { prevKind = 'sectionrule'; return }
    gap(18)
    setDraw(HAIR); doc.setLineWidth(1); doc.line(margin, y, pageW - margin, y)
    gap(20)
    prevKind = 'sectionrule'
    if (y > FOOTER_LIMIT - minRoom) newPage()
  }

  // Eyebrow above a section/sub-section title. Tightly coupled to the title.
  const kicker = (text, color = OLIVE) => {
    flow('eyebrow'); ensure(24)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); setText(color); doc.setCharSpace(1.4)
    doc.text(clean(text).toUpperCase(), margin, y); doc.setCharSpace(0); y += 13
    prevKind = 'eyebrow'
  }
  const h1 = (text, size = 30) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); setText(NAVY)
    const lines = doc.splitTextToSize(clean(text), maxW)
    lines.forEach(l => { ensure(size + 4); doc.text(l, margin, y); y += size + 2 })
  }
  // Section title with the number set inline in front (hanging indent), teal number.
  const numberedH2 = (num, text, size = 20) => {
    flow('title')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size)
    const numW = doc.getTextWidth(num) + 14
    ensure(size + 6)
    setText(TEAL); doc.text(num, margin, y)
    setText(NAVY)
    const lines = doc.splitTextToSize(clean(text), maxW - numW)
    lines.forEach(l => { ensure(size + 6); doc.text(l, margin + numW, y); y += size + 3 })
    prevKind = 'title'
  }
  const h2 = (text, size = 20, color = NAVY) => {
    flow('title')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); setText(color)
    const lines = doc.splitTextToSize(clean(text), maxW)
    lines.forEach(l => { ensure(size + 6); doc.text(l, margin, y); y += size + 3 })
    prevKind = 'title'
  }
  // Sub-heading: space above (headAbove) detaches it from prior content; the small
  // couple below attaches it to its own body.
  const h3 = (text, color = NAVY, size = 12) => {
    flow('subhead'); ensure(size + 12)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); setText(color)
    const lines = doc.splitTextToSize(clean(text), maxW)
    lines.forEach(l => { ensure(size + 4); doc.text(l, margin, y); y += size + 3 })
    prevKind = 'subhead'
  }
  const para = (text, { size = 10.5, color = BODY, bold = false, indent = 0, lead = 6, gapAfter = 0 } = {}) => {
    flow('content')
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size); setText(color)
    const lines = doc.splitTextToSize(clean(text), maxW - indent)
    lines.forEach(l => { ensure(size + lead); doc.text(l, margin + indent, y); y += size + lead })
    if (gapAfter) gap(gapAfter)
    prevKind = 'content'
  }
  // Minor divider between sub-groups inside a section (lighter than a section break).
  const rule = () => { flow('content'); gap(RHY.unit); ensure(16); setDraw(HAIR); doc.setLineWidth(1); doc.line(margin, y, pageW - margin, y); gap(10); prevKind = 'ruleafter' }

  // Rounded filled/stroked block; returns nothing, advances y past it.
  const measureLines = (text, w, size, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size)
    return doc.splitTextToSize(clean(text), w)
  }

  const callout = ({ label, title, body, accent = GREEN, tint = TINTG, labelColor = OLIVE, bodyColor = BODY }) => {
    flow('content')
    const padX = 16, padY = 12, innerW = maxW - padX * 2
    const labelLines = label ? 1 : 0
    const titleLines = title ? measureLines(title, innerW, 12, true) : []
    const bodyLines = body ? measureLines(body, innerW, 10.5) : []
    const boxH = padY * 2 + labelLines * 16 + titleLines.length * 16 + (title && body ? 8 : 0) + bodyLines.length * 16
    ensure(boxH + 8)
    setFill(tint); doc.roundedRect(margin, y, maxW, boxH, 6, 6, 'F')
    setFill(accent); doc.rect(margin, y, 4, boxH, 'F')
    let ty = y + padY + 10
    if (label) {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(labelColor); doc.setCharSpace(1.2)
      doc.text(clean(label).toUpperCase(), margin + padX, ty); doc.setCharSpace(0); ty += 16
    }
    if (title) {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(12); setText(NAVY)
      titleLines.forEach(l => { doc.text(l, margin + padX, ty); ty += 16 }); ty += 8
    }
    if (body) {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); setText(bodyColor)
      bodyLines.forEach(l => { doc.text(l, margin + padX, ty); ty += 16 })
    }
    y += boxH; prevKind = 'content'
  }

  // A card row with either a numbered badge or a real brand icon in the left gutter.
  const numberItem = (n, title, body, { accent = TEAL, hollow = false, tint = TINTB, icon = null } = {}) => {
    flow('content')
    const gutter = 42
    const textX = margin + PAD_X + gutter, innerW = maxW - PAD_X - gutter - PAD_X
    const titleLines = measureLines(title, innerW, 11.5, true)
    const bodyLines = body ? measureLines(body, innerW, 10.5) : []
    const boxH = PAD_Y * 2 + titleLines.length * 16 + (body ? 5 + bodyLines.length * 15.5 : 0)
    ensure(boxH + SP.sm)
    setFill(tint); doc.roundedRect(margin, y, maxW, boxH, 8, 8, 'F')
    if (icon) {
      const tile = 32, tx = margin + PAD_X, tyy = y + PAD_Y - 1
      setFill([255, 255, 255]); doc.roundedRect(tx, tyy, tile, tile, 7, 7, 'F')
      setDraw(HAIR); doc.setLineWidth(0.75); doc.roundedRect(tx, tyy, tile, tile, 7, 7, 'S')
      drawIcon(icon, tx + 5, tyy + 5, tile - 10)
    } else {
      const cx = margin + PAD_X + 12, cy = y + PAD_Y + 8
      if (hollow) { setDraw(accent); doc.setLineWidth(1.5); doc.circle(cx, cy, 11, 'S'); setText(accent) }
      else { setFill(accent); doc.circle(cx, cy, 12, 'F'); setText([255, 255, 255]) }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.text(String(n), cx, cy + 3.8, { align: 'center' })
    }
    let ty = y + PAD_Y + 8
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11.5); setText(NAVY)
    titleLines.forEach(l => { doc.text(l, textX, ty); ty += 16 }); ty += 5
    if (body) {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); setText(BODY)
      bodyLines.forEach(l => { doc.text(l, textX, ty); ty += 15.5 })
    }
    y += boxH; prevKind = 'content'
  }

  // Generic table. cols: [{header,width,color?}]; rows: array of string[]
  // Measures the whole table first and keeps it together: if it fits on a page
  // but not in the remaining space, it moves down as a unit (never orphans a row
  // or leaves the header stranded).
  const table = (cols, rows, { heading = null } = {}) => {
    flow(heading ? 'subhead' : 'content')
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5)
    const rowsLines = rows.map(r => r.map((txt, i) => doc.splitTextToSize(clean(String(txt)), cols[i].width - 16)))
    const rowHeights = rowsLines.map(cl => Math.max(...cl.map(l => l.length)) * 14 + 14)
    const drawColHeader = () => {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(BLUE); doc.setCharSpace(0.5)
      let x = margin
      cols.forEach(c => { doc.text(clean(c.header).toUpperCase(), x + 8, y); x += c.width })
      doc.setCharSpace(0); y += 6
      setDraw(BLUE); doc.setLineWidth(1.5); doc.line(margin, y, margin + maxW, y); y += 4
    }
    // Keep the heading with the column header and the first row so a heading never
    // strands at the bottom of a page.
    ensure((heading ? 24 : 0) + 26 + (rowHeights[0] || 0))
    if (heading) {
      gap(2)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(12); setText(NAVY)
      doc.text(clean(heading), margin, y + 10); y += 24
    }
    drawColHeader()
    // Rows flow and fill the page; on a break, the column header repeats.
    rows.forEach((r, ri) => {
      const rowH = rowHeights[ri]
      if (y + rowH > FOOTER_LIMIT) { newPage(); drawColHeader() }
      let xx = margin
      rowsLines[ri].forEach((lines, i) => {
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); setText(cols[i].color || BODY)
        let yy = y + 15
        lines.forEach(l => { doc.text(l, xx + 8, yy); yy += 14 })
        xx += cols[i].width
      })
      y += rowH
      setDraw(HAIR); doc.setLineWidth(0.75); doc.line(margin, y, margin + maxW, y); y += 2
    })
    prevKind = 'content'
  }

  const statCards = (cards) => {
    flow('content')
    const gapX = SP.md + 2, cw = (maxW - gapX * (cards.length - 1)) / cards.length, ch = 66
    ensure(ch + SP.sm)
    cards.forEach((c, i) => {
      const x = margin + i * (cw + gapX)
      setDraw(HAIR); doc.setLineWidth(1); doc.roundedRect(x, y, cw, ch, 8, 8, 'S')
      if (c.icon) drawIcon(c.icon, x + cw - PAD_X - 28, y + (ch - 28) / 2, 28)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(TEAL); doc.setCharSpace(1)
      doc.text(clean(c.k).toUpperCase(), x + PAD_X, y + 24); doc.setCharSpace(0)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(19); setText(NAVY)
      doc.text(clean(c.v), x + PAD_X, y + 48)
    })
    y += ch; prevKind = 'content'
  }

  const threeCards = (cards) => {
    flow('content')
    const gapX = SP.md + 2, cw = (maxW - gapX * (cards.length - 1)) / cards.length, padc = SP.lg
    const titleLinesArr = cards.map(c => measureLines(c.v, cw - padc * 2, 13, true))
    const subLinesArr = cards.map(c => c.d ? measureLines(c.d, cw - padc * 2, 8.5) : [])
    const iconRow = cards.some(c => c.icon) ? 34 : 0
    const ch = Math.max(...cards.map((c, i) => padc * 2 + iconRow + 24 + titleLinesArr[i].length * 17 + (subLinesArr[i].length ? 8 + subLinesArr[i].length * 12.5 : 0)))
    ensure(ch + SP.sm)
    cards.forEach((c, i) => {
      const x = margin + i * (cw + gapX)
      setFill([247, 249, 252]); doc.roundedRect(x, y, cw, ch, 8, 8, 'F')
      let ty = y + padc
      if (c.icon) { drawIcon(c.icon, x + padc, ty, 26); ty += iconRow }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText(TEAL); doc.setCharSpace(1)
      doc.text(clean(c.k).toUpperCase(), x + padc, ty + 8); doc.setCharSpace(0); ty += 22
      doc.setFont('helvetica', 'bold'); doc.setFontSize(13); setText(NAVY)
      titleLinesArr[i].forEach(l => { doc.text(l, x + padc, ty); ty += 17 })
      if (c.d) {
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); setText(MUTED); ty += 8
        subLinesArr[i].forEach(l => { doc.text(l, x + padc, ty); ty += 12.5 })
      }
    })
    y += ch; prevKind = 'content'
  }

  const scoreBar = (label, v, iconName) => {
    ensure(34)
    let lx = margin
    if (iconName) { drawIcon(iconName, margin, y - 11, 15); lx = margin + 21 }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); setText(INK)
    doc.text(clean(label), lx, y)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); setText(MUTED)
    doc.text(`${v ? v.toFixed(1) : '--'} / 5   ·   ${scoreBarStyle(v).label}`, margin + maxW, y, { align: 'right' })
    y += 9
    setFill([238, 241, 244]); doc.roundedRect(margin, y, maxW, 10, 3, 3, 'F')
    setFill(GREEN); doc.roundedRect(margin, y, Math.max(6, maxW * (v / 5)), 10, 3, 3, 'F')
    y += 24
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
  // Right-aligned + letter-spaced text: jsPDF's right-align ignores charSpace and
  // overflows past the margin, so compute the true width and place it left-aligned.
  {
    const conf = 'CONFIDENTIAL, EXECUTIVE BRIEFING'
    const cs = 1.6
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); setText(MUTED); doc.setCharSpace(cs)
    const confW = doc.getTextWidth(conf) + cs * conf.length
    doc.text(conf, pageW - margin - confW, 52); doc.setCharSpace(0)
  }
  y = 132
  kicker('An Executive Briefing on Enterprise AI Maturity')
  gap(20)
  h1('AI Adoption Assessment Report', 32)
  gap(8)
  para("A structured assessment of your organization's AI maturity, execution readiness, and priority actions for the next stage progression.",
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
  kicker(`Your current stage: ${stage.index} of 6`)

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
  callout({ label: 'Your Assessment Finding', title: stage.tagline, body: stage.description })

  // ═══════════════════ PAGE 2 — CONTENTS (reserved, filled later) ═══════════════════
  doc.addPage(); const tocPage = doc.internal.getNumberOfPages()
  newPage()  // start content on a fresh page (page 3); sections flow from here
  flowOn = true; prevKind = 'sectionrule'

  const pageMap = {}
  const record = (key) => { pageMap[key] = doc.internal.getNumberOfPages() }

  // ═══════════════════ 01 — EXECUTIVE SUMMARY ═══════════════════
  section(); record('exec')
  numberedH2('01', 'Executive Summary & Recommendations')
  callout({
    label: 'Bottom Line',
    body: `Your organization is assessed at Stage ${stage.index}, placing you ${bandPhrase}, with an Execution Readiness score of ${pos.execPct}/100 and a Strategic Maturity score of ${pos.stratPct}/100. ${adoptionLive}. Your most important next step is to ${lc(suggested.steps[0]?.title || 'a focused readiness audit')}, because ${lowDim.label} is the dimension most likely to limit further progress toward Stage ${nextStageIdx}.`,
  })
  h3('Key takeaways', NAVY, 12)
  numberItem(1, balanced ? 'Strong, balanced foundation' : 'Your results show clear strengths and priority areas',
    balanced
      ? `All four dimensions land in the "${overallBand}" range (${minV.toFixed(1)} to ${maxV.toFixed(1)} of 5), with no single weak spot dragging down the profile.`
      : `${topDim.label} leads at ${maxV.toFixed(1)}, while ${lowDim.label} is at ${minV.toFixed(1)} out of 5. This difference shows where focused effort can deliver the greatest impact.`)
  numberItem(2, `${topDim.label} is ahead of ${lowDim.label}`,
    `Your ${topDim.label} score of ${maxV.toFixed(1)} is ahead of your ${lowDim.label} score of ${minV.toFixed(1)}, indicating that your capabilities are developing faster than the foundations needed to support them at scale.`)
  numberItem(3, `Progress to Stage ${nextStageIdx} runs through ${lowDim.label}`,
    `Your path forward depends on strengthening ${lowDim.label}${isFin ? ', especially given the regulated Financial Services setting' : ''} — including governance, guardrails, and readiness — not on deploying more models.`)
  table(
    [{ header: 'Step', width: 44, color: INK }, { header: 'Action', width: 210, color: INK }, { header: 'Why now', width: maxW - 254, color: INK }],
    suggested.steps.map((s, i) => [String(i + 1), s.title, firstSentence(s.detail)]),
    { heading: 'Recommended sequence' },
  )

  // ═══════════════════ 02 — ABOUT + 03 SCORES ═══════════════════
  section(); record('about')
  numberedH2('02', 'About This Assessment')
  para('This executive briefing presents the findings, scores, and recommendations from your AI Adoption Assessment responses.', { lead: 7 })
  threeCards([
    { k: 'Scope', icon: 'connected_nodes', v: profile.department || 'Enterprise / Cross-functional', d: [profile.sector, profile.orgSize ? `${profile.orgSize} employees` : null].filter(Boolean).join(', ') },
    { k: 'Track', icon: 'upward_chart', v: `${ROLE_LABEL[profile.role] || 'Executive'} Track`, d: 'Leadership-level readout and roadmap' },
    { k: 'Prepared', icon: 'document_check', v: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), d: 'Radiant Digital, AI Adoption Assessment' },
  ])
  rule()
  record('scores')
  kicker('Scores by Dimension')
  h2(balanced ? 'A well rounded profile' : 'Your AI maturity profile has room for greater balance', 20)
  flow('content')
  dims.forEach(d => scoreBar(d.label, d.v, DIM_ICON[d.key]))
  para('EXHIBIT 2, DIMENSION SCORECARD', { size: 8.5, color: BLUE, bold: true, lead: 3, gapAfter: 2 })

  // ═══════════════════ 04 — COMPETITIVE POSITIONING ═══════════════════
  section(430); record('positioning')
  kicker('Competitive Positioning')
  h2('Where you sit relative to AI Leaders')
  para(`Your ${topDim.label} score leads at ${maxV.toFixed(1)}, while ${lowDim.label} at ${minV.toFixed(1)} is the area most likely to limit further progress. This aligns with the ${lowDim.label} recommendation later in this report.`, { size: 10, color: BODY, lead: 6 })
  // Quadrant
  // Chart spans the full content width so it aligns to both page margins.
  const qx = margin + 18, qw = maxW - 18, qy = y, qh = 300
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
  section(220); record('see')
  statCards([{ k: 'Execution Readiness', icon: 'gear', v: `${pos.execPct} / 100` }, { k: 'Strategic Maturity', icon: 'bar_chart', v: `${pos.stratPct} / 100` }])
  callout({ label: `${pos.groupLabel} · ${pos.stageRange}`, body: pos.meansText, accent: GREEN, tint: TINTG })
  kicker('What We See')
  h2('Strengths', 20)
  const strengths = findings.strengths || []
  if (strengths.length) {
    strengths.forEach(f => { h3(`${f.section}: ${f.title}`, NAVY, 12); para(f.body, { indent: 0, lead: 6 }) })
  } else {
    h3(`${topDim.label}: your leading dimension`, NAVY, 12)
    para(`At ${maxV.toFixed(1)} of 5, ${topDim.label} is where your organization is strongest today — the foundation the rest of the roadmap builds on.`)
  }
  rule()
  h3('Considerations to watch', NAVY, 12)
  const gaps = findings.gaps || []
  const considerations = []
  if (gaps.length) gaps.slice(0, 2).forEach(g => considerations.push({ title: `${g.section}: ${g.title}`, body: g.body }))
  else considerations.push({
    title: 'Prediction accuracy without adequate monitoring',
    body: 'As AI moves from recommending to prescribing, the cost of an unmonitored bad prediction rises. Model drift and edge-case monitoring become governance requirements, not optional data science practices.',
  })
  if (isFin) considerations.push({
    title: 'Explainability and stakeholder trust',
    body: 'In Financial Services specifically, AI-driven decisions that affect customers or capital typically need to be explainable to regulators, auditors, and customers themselves, not just accurate.',
  })
  const NWORD = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four' }
  const consIntro = considerations.length === 1
    ? `One consideration is particularly relevant for organizations at Stage ${stage.index} and is worth tracking deliberately:`
    : `${NWORD[considerations.length] || considerations.length} considerations are typical for organizations at Stage ${stage.index} and worth tracking deliberately:`
  para(`A rigorous diagnostic pairs every strength with a corresponding risk. ${consIntro}`, { color: BODY, lead: 6 })
  considerations.forEach((c, i) => numberItem(i + 1, c.title, c.body, { icon: pickIcon(c.title) }))

  // ═══════════════════ 06 — RECOMMENDED NEXT STEP + 07 RADIANT'S READ ═══════════════════
  section(); record('next')
  kicker('Your Recommended Next Step')
  h2(`Priority: ${lowDim.label}`)
  para(`${suggested.steps[0]?.detail || `Strengthen ${lowDim.label} before the next major deployment.`} The result will be a foundation that makes your future projects faster and your AI outputs more trustworthy.`, { lead: 7 })
  const focusNoun = lowDim.label
  table(
    [{ header: 'Phase', width: 90, color: BODY }, { header: 'Weeks', width: 70, color: BODY }, { header: 'Focus', width: maxW - 160, color: BODY }],
    [
      ['Discovery', '1 to 2', `Inventory current ${focusNoun} practices, owners, and usage across systems`],
      ['Assessment', '3 to 6', `Score maturity, access, and readiness. Flag the highest-impact gaps.`],
      ['Roadmap', '7 to 8', `Deliver a prioritized remediation plan and a go/no-go decision for the next deployment`],
    ],
    { heading: 'Illustrative 60-day breakdown' },
  )
  rule()
  record('radiant')
  kicker("Radiant's Read")
  h2(`Our perspective on Stage ${stage.index} organizations`, 18)
  para(aiRadiantRead[stage.index] || aiRadiantRead[6], { lead: 7 })

  // ═══════════════════ 08 — WHAT AI LEADERS DO ═══════════════════
  section(240); record('leaders')
  const leaders = LEADER_CONTENT[stage.index] || LEADER_CONTENT[6]
  kicker('What AI Leaders Do')
  h2(leaders.heading)
  para(leaders.context, { lead: 7 })
  // Benchmark stat intentionally omitted: display only with a verified, cited source.
  leaders.actions.forEach((a, i) => numberItem(i + 1, a.title, a.body, { icon: pickIcon(a.title) }))
  if (isFin) {
    callout({ label: 'Why this matters in Financial Services', accent: OLIVE, tint: TINTG,
      body: 'Autonomous, end-to-end resolution is more consequential in a regulated industry: every workflow AI is allowed to run unattended is also one your compliance and audit functions need to be able to explain after the fact.' })
  }

  // ═══════════════════ 09 — YOUR NEXT MOVE + 10 METHODOLOGY ═══════════════════
  section(); record('move')
  kicker('Your Next Move')
  h2(stage.index >= 6 ? 'Sustaining Full Autonomy' : `Ready to move to Stage ${nextStageIdx}?`)
  para('A 30-minute conversation with Radiant Digital can help you identify the right starting point for your next stage of AI maturity.', { lead: 7 })
  ctaPanel({ kickerText: 'Schedule 30 minutes with Radiant Digital', big: 'hello@radiant.digital', url: 'radiant.digital', btn: "LET'S EMBARK" })
  rule()
  record('methodology')
  numberedH2('10', 'Assessment Methodology')
  para('This assessment scores four dimensions on a 5-point scale and then combines them into two composite indices: Execution Readiness and Strategic Maturity, which place your organization on the six-stage maturity ladder shown earlier.', { color: BODY, lead: 7 })
  table(
    [{ header: 'Dimension', width: 170, color: BODY }, { header: 'What it measures', width: maxW - 170, color: BODY }],
    [
      ['Strategy & Leadership', 'Executive alignment, stated direction, and resourcing behind the AI agenda'],
      ['Data & Technology', 'Data readiness, tooling, and infrastructure available to support deployment'],
      ['People & Governance', 'Skills, change management, and the guardrails that govern AI decisions'],
      ['Adoption & Value', 'Breadth of live deployments and evidence of tracked, measurable impact'],
    ],
    { heading: 'Scoring dimensions' },
  )
  table(
    [{ header: 'Score', width: 90, color: BODY }, { header: 'Interpretation', width: maxW - 90, color: BODY }],
    [
      ['1 to 2', 'Nascent, informal, or absent'],
      ['3', 'Developing, present but inconsistent'],
      ['4', 'Strong, consistent, and reasonably mature'],
      ['5', 'Leading, aligned with best practices, and enterprise-wide'],
    ],
    { heading: '1 to 5 scale' },
  )

  // ═══════════════════ 11 — CONCLUSION ═══════════════════
  section(); record('conclusion')
  numberedH2('11', 'Conclusion')
  callout({ label: 'In One Line', accent: GREEN, tint: TINTG,
    body: `You are a Stage ${stage.index} organization ${bandPhrase}. Reaching the next stage depends on strengthening ${lowDim.label}, not simply deploying more models.` })
  para(`Your organization is at Stage ${stage.index} of 6, placing you ${bandPhrase}. Your Execution Readiness score is ${pos.execPct}/100, and your Strategic Maturity score is ${pos.stratPct}/100. Your dimension scores range from ${minV.toFixed(1)} to ${maxV.toFixed(1)} out of 5. ${adoptionLive}.`, { color: BODY, lead: 7 })
  para(`Your ${topDim.label} score (${maxV.toFixed(1)}) is ahead of your ${lowDim.label} score (${minV.toFixed(1)}). This is a common pattern at this stage, where capability develops faster than the foundations needed to support it at scale. It is not a weakness today, but it is an area that can slow progress to the next stage if left unaddressed.`, { color: BODY, lead: 7 })
  const stepList = suggested.steps.map((s, i) => `${i + 1}) ${lc(s.title)}`).join(', ')
  para(`The recommended sequence follows directly: ${stepList}. When executed in order through Radiant Digital's Assess -> Train -> Adopt -> Scale -> Sustain model, these actions can convert your current position into durable, compounding advantage.`, { color: BODY, lead: 7 })
  para('The advantage compounds only for organizations whose governance is mature enough to trust prediction with action. Your organization is close. The remaining work is deliberate and sequential, and it is well within reach.', { color: BODY, lead: 7 })

  // ═══════════════════ 12 — GET IN TOUCH ═══════════════════
  section(280); record('touch')
  numberedH2('12', 'Get in Touch')
  para('Speak directly with the Radiant Digital experts behind your assessment. They can help you identify where to start and what the next stage could look like for your organization.', { color: BODY, lead: 7 })
  const people = [
    { photo: PRAFULL_PHOTO, name: 'Prafull Khare', title: 'Executive Director | Global Head of AI Strategy, Solution Engineering, & New Technology Enablement', org: 'Radiant Digital', email: 'prafull.khare@radiant.digital', linkedin: 'linkedin.com/in/prafull-khare' },
    { photo: SRINIVAS_PHOTO, name: 'Srinivas Chamarthi', title: 'SVP & Business Head', org: 'Radiant Digital', email: 'srinivas.chamarthi@radiant.digital', linkedin: 'linkedin.com/in/srinivaschamarthi' },
  ]
  const gapP = 20, pcw = (maxW - gapP) / 2
  const titleLinesArr = people.map(p => measureLines(`${p.title}  ·  ${p.org}`, pcw - 40, 9))
  const pch = 172 + Math.max(...titleLinesArr.map(l => l.length)) * 12
  flow('content')
  ensure(pch + 6)
  // Centered clickable text (mailto / external URL) inside a card.
  const centeredLink = (text, cx, baseline, url, color, size, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size); setText(color)
    const w = doc.getTextWidth(clean(text))
    doc.text(clean(text), cx, baseline, { align: 'center' })
    doc.link(cx - w / 2, baseline - size + 1, w, size + 3, { url })
  }
  people.forEach((p, i) => {
    const x = margin + i * (pcw + gapP)
    setDraw(HAIR); doc.setLineWidth(1); doc.roundedRect(x, y, pcw, pch, 10, 10, 'S')
    const cxp = x + pcw / 2
    const av = 64
    doc.addImage(p.photo, 'PNG', cxp - av / 2, y + 16, av, av, `photo-${p.initials || i}`, 'FAST')
    setDraw(HAIR); doc.setLineWidth(1); doc.circle(cxp, y + 16 + av / 2, av / 2, 'S')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(13); setText(NAVY)
    doc.text(clean(p.name), cxp, y + 96, { align: 'center' })
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); setText(BODY)
    let ty = y + 112
    titleLinesArr[i].forEach(l => { doc.text(l, cxp, ty, { align: 'center' }); ty += 12 })
    centeredLink(p.email, cxp, ty + 8, `mailto:${p.email}`, OLIVE, 9.5, true)
    // LinkedIn badge (blue "in") — the icon itself links to the profile.
    const liS = 18, lx = cxp - liS / 2, lyy = ty + 18
    setFill([10, 102, 194]); doc.roundedRect(lx, lyy, liS, liS, 3, 3, 'F')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); setText([255, 255, 255])
    doc.text('in', cxp, lyy + 12.5, { align: 'center' })
    doc.link(lx, lyy, liS, liS, { url: `https://www.${p.linkedin}` })
  })
  y += pch; prevKind = 'content'
  para('Reach either of us directly, or email hello@radiant.digital to schedule a 30-minute conversation.', { size: 8.5, color: MUTED, lead: 4 })

  // ═══════════════════ FILL TABLE OF CONTENTS (page 2) ═══════════════════
  doc.setPage(tocPage)
  drawHeader('Contents')
  y = HEADER_BOTTOM
  prevKind = 'start'
  h2('Contents', 22, NAVY)
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
    ['11', 'Conclusion', pageMap.conclusion],
    ['12', 'Get in Touch', pageMap.touch],
  ]
  toc.forEach(([idx, title, pg]) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); setText(BLUE)
    doc.text(idx, margin, y)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(11); setText(BLUE)
    doc.text(clean(title), margin + 34, y)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); setText(MUTED)
    doc.text(String(pg || ''), pageW - margin, y, { align: 'right' })
    // Clickable: jumps to the section's page (whole row is the hit area).
    if (pg) doc.link(margin, y - 12, maxW, 24, { pageNumber: pg, top: HEADER_BOTTOM - 20 })
    y += 11
    setDraw(HAIR); doc.setLineWidth(0.75); doc.line(margin, y, pageW - margin, y)
    y += 12
  })

  // ═══════════════════ BRAND CHROME: top accent bar (every page) + navy footer ═══
  const pages = doc.internal.getNumberOfPages()
  const yr = new Date().getFullYear()
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p)
    // [A] Leaf-green top accent bar, full width, 4pt — Radiant one-pager signature
    setFill(GREEN); doc.rect(0, 0, pageW, 4, 'F')
    // [F] Deep-navy footer bar (skip the cover)
    if (p >= 2) {
      const fh = 26
      setFill(NAVY); doc.rect(0, pageH - fh, pageW, fh, 'F')
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7); setText([206, 221, 230])
      doc.text(`© ${yr} Radiant Digital  ·  hello@radiant.digital`, margin, pageH - 10)
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7); setText([150, 176, 190])
      doc.text(`Page ${p}`, pageW / 2, pageH - 10, { align: 'center' })
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8); setText([255, 255, 255])
      doc.text('www.radiant.digital', pageW - margin, pageH - 10, { align: 'right' })
    }
  }

  const safeCompany = (profile.companyName || profile.fullName || 'Radiant').replace(/[^a-z0-9]+/gi, '-')
  const filename = `AI-Adoption-Assessment-Executive-${safeCompany}.pdf`
  return { doc, filename }
}
