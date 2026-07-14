import { jsPDF } from 'jspdf'
import {
  getAQ, scoreAssessment, buildFindings, sections, scoreBarStyle,
} from '../data/aiAssessment.js'
import { scoreCx, cxLevels, recommendedSolution } from '../data/cxAssessment.js'
import { aiRadiantRead, suggestedNextSteps, cxWhyThisMatters, cxCta, positioningRead } from '../data/reportEditorial.js'
import { LEADER_CONTENT } from '../components/assessment/WhatAILeadersDo.jsx'

const ROLE_LABEL = { exec: 'Executive', tech: 'Technology Leader', biz: 'Business Leader', consultant: 'AI Practitioner' }

// jsPDF's built-in Helvetica only covers WinAnsi, swap glyphs it can't render.
const clean = (s = '') => String(s)
  .replace(/→/g, '->')          // →
  .replace(/←/g, '<-')          // ←
  .replace(/[‘’‛]/g, "'")
  .replace(/[“”]/g, '"')
  .replace(/[–—]/g, '-')        // en/em dash -> hyphen
  .replace(/…/g, '...')         // …
  .replace(/ /g, ' ')           // nbsp

/**
 * Builds the full assessment report as a jsPDF doc (no save).
 * @returns {{ doc: import('jspdf').jsPDF, filename: string }}
 */
export function buildReportDoc({ kind, profile, answers }) {
  const isAi = kind === 'ai'
  const ACCENT = isAi ? [145, 196, 107] : [89, 106, 224]
  const GREEN = [145, 196, 107]
  const AMBER = [240, 151, 78]
  const INK = [23, 32, 47]      // near-black headings
  const BODY = [82, 95, 112]    // body text
  const MUTED = [130, 142, 158]
  const HAIR = [228, 232, 238]

  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 56
  const maxW = pageW - margin * 2
  let y = margin

  const ensure = (space) => { if (y + space > pageH - margin - 20) { doc.addPage(); y = margin } }
  const gap = (n = 10) => { y += n }

  const kicker = (text) => {
    ensure(24); gap(4)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); doc.setTextColor(...ACCENT)
    doc.setCharSpace(1.2)
    doc.text(clean(text).toUpperCase(), margin, y)
    doc.setCharSpace(0); y += 20
  }
  const heading = (text, size = 19) => {
    ensure(size + 12)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); doc.setTextColor(...INK)
    doc.text(clean(text), margin, y); y += size + 6
  }
  const subhead = (text, color = INK) => {
    ensure(18); gap(2)
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...color)
    doc.text(clean(text), margin, y); y += 16
  }
  const para = (text, { size = 10.5, color = BODY, bold = false, indent = 0, lead = 6 } = {}) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size); doc.setTextColor(...color)
    const lines = doc.splitTextToSize(clean(text), maxW - indent)
    lines.forEach(l => { ensure(size + lead); doc.text(l, margin + indent, y); y += size + lead })
    gap(6)
  }
  const rule = () => {
    gap(8); ensure(20)
    doc.setDrawColor(...HAIR); doc.setLineWidth(1); doc.line(margin, y, pageW - margin, y)
    gap(20)
  }

  // ── Header band ───────────────────────────────────────────────────────────
  const bandH = 92
  doc.setFillColor(1, 15, 30); doc.rect(0, 0, pageW, bandH, 'F')
  doc.setFont('helvetica', 'bold'); doc.setFontSize(17); doc.setTextColor(255, 255, 255)
  doc.text('RADIANT', margin, 52)
  doc.setTextColor(...GREEN); doc.text('AI', margin + doc.getTextWidth('RADIANT  '), 52)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(168, 180, 194)
  doc.text(isAi ? 'AI Maturity Assessment' : 'CX Maturity Assessment', pageW - margin, 48, { align: 'right' })
  const reportDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.setFontSize(8.5); doc.setTextColor(150, 162, 176)
  doc.text(reportDate, pageW - margin, 66, { align: 'right' })
  y = bandH + 44

  if (profile && (profile.fullName || profile.companyName)) {
    para(`Prepared for ${[profile.fullName, profile.companyName].filter(Boolean).join('  ·  ')}`,
      { size: 10.5, color: INK, bold: true, lead: 4 })
  }
  const metaBits = [
    profile?.sector,
    profile?.orgSize ? `${profile.orgSize} employees` : null,
    profile?.department,
    isAi && profile?.role ? `${ROLE_LABEL[profile.role] || profile.role} Track` : null,
  ].filter(Boolean)
  if (metaBits.length) para(metaBits.join('  ·  '), { size: 9.5, color: MUTED, lead: 3 })
  gap(4)

  if (isAi) {
    const scored = scoreAssessment(answers, getAQ(profile.role))
    const findings = buildFindings(scored.sectionAverages)
    const suggested = suggestedNextSteps({
      role: profile.role,
      stageIndex: scored.stage.index,
      sectionAverages: scored.sectionAverages,
    })

    kicker('Your AI Maturity')
    heading(`Stage ${scored.stage.index}: ${scored.stage.name}`)
    gap(2)
    para(scored.stage.tagline, { size: 11.5, color: INK, bold: true })
    para(scored.stage.description, { lead: 7 })
    rule()

    kicker('Scores by Dimension')
    sections.forEach(s => {
      const v = scored.sectionAverages[s.key] || 0
      const lbl = scoreBarStyle(v).label
      ensure(20)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(...INK)
      doc.text(clean(s.label), margin, y)
      doc.setFont('helvetica', 'normal'); doc.setTextColor(...MUTED)
      doc.text(`${v ? v.toFixed(1) : '--'} / 5   ·   ${lbl}`, pageW - margin, y, { align: 'right' })
      y += 22
    })
    rule()

    const pos = positioningRead({ sectionAverages: scored.sectionAverages, stageIndex: scored.stage.index })
    kicker('Competitive Positioning')
    para('Where your organization sits relative to AI leaders and the broader market.', { size: 10, color: MUTED, lead: 5 })
    gap(2)
    ;[['Execution Readiness', pos.execPct], ['Strategic Maturity', pos.stratPct]].forEach(([label, val]) => {
      ensure(20)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(...INK)
      doc.text(clean(label), margin, y)
      doc.setFont('helvetica', 'normal'); doc.setTextColor(...MUTED)
      doc.text(`${val} / 100`, pageW - margin, y, { align: 'right' })
      y += 20
    })
    gap(4)
    subhead(`${pos.groupLabel}  ·  ${pos.stageRange}`, ACCENT)
    para(pos.meansText, { lead: 7 })
    rule()

    kicker('What We See')
    if (findings.fallback) {
      subhead(findings.fallback.title)
      para(findings.fallback.body)
    } else {
      if (findings.strengths.length) {
        para('STRENGTHS', { size: 9, color: GREEN, bold: true, lead: 3 }); gap(2)
        findings.strengths.forEach(f => {
          subhead(`${f.section}: ${f.title}`)
          para(f.body, { indent: 2 }); gap(2)
        })
      }
      if (findings.gaps.length) {
        gap(6); para('GAPS TO CLOSE', { size: 9, color: AMBER, bold: true, lead: 3 }); gap(2)
        findings.gaps.forEach(f => {
          subhead(`${f.section}: ${f.title}`)
          para(f.body, { indent: 2 }); gap(2)
        })
      }
    }
    rule()

    kicker('Suggested Next Steps')
    subhead('Your path: Assess -> Train -> Adopt -> Scale -> Sustain', ACCENT)
    para(suggested.intro, { lead: 7 }); gap(2)
    suggested.steps.forEach((s, i) => {
      subhead(`${i + 1}. ${s.title}`)
      para(`${s.priority}  ·  Phase: ${s.phase}`, { size: 9, color: ACCENT, bold: true, lead: 3 })
      para(s.detail, { indent: 2, lead: 6 })
      para(`Radiant Digital service: ${s.service}`, { size: 9.5, color: MUTED, lead: 4 }); gap(3)
    })
    rule()

    kicker('Recommended Services')
    para('Matched to your current maturity band:', { size: 10, color: MUTED, lead: 4 }); gap(1)
    suggested.services.forEach(sv => para(`•  ${sv}`, { color: INK, indent: 8, lead: 5 }))
    rule()

    kicker("Radiant Digital's Read")
    subhead(`Our perspective on Stage ${scored.stage.index} organizations`, ACCENT)
    para(aiRadiantRead[scored.stage.index] || aiRadiantRead[6], { lead: 7 })
    rule()

    const leaders = LEADER_CONTENT[scored.stage.index] || LEADER_CONTENT[6]
    kicker('What AI Leaders Do')
    subhead(leaders.heading, ACCENT)
    para(leaders.context, { lead: 7 })
    if (leaders.statBadge) {
      para(`${leaders.statBadge.value}   ${leaders.statBadge.label}`, { size: 10, color: GREEN, bold: true, lead: 5 })
      gap(2)
    }
    leaders.actions.forEach((a, i) => {
      subhead(`${i + 1}. ${a.title}`)
      para(a.body, { indent: 2 }); gap(2)
    })
    rule()

    kicker('Your Next Move')
    subhead(`Ready to move from ${suggested.currentPhase} to your next stage?`)
    para('Radiant Digital has helped enterprises across 14+ industries move through every stage of AI maturity. A 30-minute conversation is enough to map exactly where to start.', { lead: 7 })
    para(`Schedule with Radiant Digital  ·  ${suggested.email}`, { size: 10, color: ACCENT, bold: true, lead: 4 })
  } else {
    const scored = scoreCx(answers)
    const lvl = cxLevels[scored.overallKey]

    kicker('Your CX Maturity Level')
    heading(lvl.name)
    gap(2)
    para(lvl.tagline, { size: 11.5, color: INK, bold: true })
    para(lvl.description, { lead: 7 })
    rule()

    kicker('Dimension Scores')
    scored.dimensions.forEach(d => {
      subhead(`${d.label}: ${d.level}`)
      para(d.blurb, { indent: 2 }); gap(4)
    })
    rule()

    kicker('Recommended Solution')
    heading(recommendedSolution.name, 15)
    gap(2)
    para(recommendedSolution.lede, { lead: 7 }); gap(2)
    recommendedSolution.helps.forEach(h => para(`•  ${h}`, { color: INK, indent: 8, lead: 5 }))
    rule()

    kicker(`Why this matters at the ${lvl.name} level`)
    para(cxWhyThisMatters(scored.overallKey), { lead: 7 })
    rule()

    kicker('Your Next Move')
    subhead(cxCta.title)
    para(cxCta.body, { lead: 7 })
    para(`${cxCta.action}  ·  ${cxCta.email}`, { size: 10, color: ACCENT, bold: true, lead: 4 })
  }

  // ── Footer on every page ──────────────────────────────────────────────────
  const pages = doc.internal.getNumberOfPages()
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p)
    doc.setDrawColor(...HAIR); doc.setLineWidth(1)
    doc.line(margin, pageH - 40, pageW - margin, pageH - 40)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...MUTED)
    doc.text('Radiant Digital  ·  hello@radiant.digital  ·  radiant.digital', margin, pageH - 24)
    doc.text(`${p} / ${pages}`, pageW - margin, pageH - 24, { align: 'right' })
  }

  const safeCompany = (profile?.companyName || 'Radiant').replace(/[^a-z0-9]+/gi, '-')
  const filename = `${isAi ? 'AI-Adoption' : 'CX-Maturity'}-Report-${safeCompany}.pdf`
  return { doc, filename }
}

/** Builds the report and triggers a browser download. */
export function generateReportPdf(args) {
  const { doc, filename } = buildReportDoc(args)
  doc.save(filename)
}

/** Builds the report and returns its base64 (no data-URI prefix) + filename, for emailing. */
export function getReportPdfBase64(args) {
  const { doc, filename } = buildReportDoc(args)
  const datauri = doc.output('datauristring')
  const base64 = datauri.substring(datauri.indexOf(',') + 1)
  return { base64, filename }
}
