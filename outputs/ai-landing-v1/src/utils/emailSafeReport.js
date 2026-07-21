/**
 * emailSafeReport.js
 *
 * Builds a table-based, fully inline-styled HTML version of the assessment
 * report, meant to be dropped directly into an email body (e.g. the
 * Web3Forms "message" field as HTML, or any provider that renders raw HTML
 * in the body but can't carry a binary attachment).
 *
 * Why this exists separately from HTMLReportViewer.jsx:
 *   The in-app report uses flexbox/grid, CSS custom properties, and a
 *   Google Fonts @import, all of which Outlook, Gmail's clipped CSS
 *   sanitizer, and most other email renderers either ignore or break on.
 *   Email-safe HTML needs: <table> layout instead of flex/grid, inline
 *   style="" on every element (no <style> blocks relied upon for layout),
 *   and web-safe fonts only (Arial/Helvetica: no @import, no Poppins/Inter).
 *
 * This is intentionally simpler than the in-app report. It's a fallback:
 * PDF attachment is still the preferred delivery path (see
 * utils/generateReportPdf.js). This only gets used when the email backend
 * can't carry the PDF as an attachment and the full content needs to be
 * embedded directly in the message body instead.
 *
 * Exports:
 *   buildEmailSafeReportHtml({ kind, profile, result }) -> string
 */

import { positioningRead, suggestedNextSteps } from '../data/reportEditorial.js'
import { LEADER_CONTENT } from '../components/assessment/WhatAILeadersDo.jsx'

const FONT = "Arial, Helvetica, sans-serif"
const INK = '#0f172a'
const BODY = '#475569'
const MUTED = '#94a3b8'
const HAIR = '#e2e8f0'
const DARK = '#010F1E'

// table-based "bar": two adjacent <td> cells, one colored, one gray.
function bar(pct, color) {
  const filled = Math.max(0, Math.min(100, Math.round(pct)))
  const rest = 100 - filled
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
    <tr>
      ${filled > 0 ? `<td bgcolor="${color}" width="${filled}%" style="height:8px;line-height:8px;font-size:1px;border-radius:4px 0 0 4px;">&nbsp;</td>` : ''}
      ${rest > 0 ? `<td bgcolor="${HAIR}" width="${rest}%" style="height:8px;line-height:8px;font-size:1px;border-radius:0 4px 4px 0;">&nbsp;</td>` : ''}
    </tr>
  </table>`
}

// 5-cell (or n-cell) stage pip strip using a single-row table.
function pipStrip(filledCount, total, color) {
  const cells = Array.from({ length: total }, (_, i) => {
    const isFilled = i < filledCount
    return `<td width="${Math.floor(100 / total)}%" style="padding:0 3px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td bgcolor="${isFilled ? color : '#3a4658'}" style="height:6px;line-height:6px;font-size:1px;border-radius:3px;">&nbsp;</td>
      </tr></table>
    </td>`
  }).join('')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:12px 0 18px;"><tr>${cells}</tr></table>`
}

function wrapDocument({ title, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border-collapse:collapse;">
        ${bodyHtml}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

function headerRow({ eyebrow, headline, metaLine }) {
  return `
  <tr>
    <td bgcolor="${DARK}" style="padding:32px 32px 26px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:${FONT};font-weight:bold;font-size:16px;color:#91C46B;">RADIANT <span style="color:#ffffff;">AI</span></td>
        <td align="right" style="font-family:${FONT};font-size:11px;color:#8a98ab;">${metaLine || ''}</td>
      </tr></table>
      <div style="font-family:${FONT};font-size:11px;font-weight:bold;letter-spacing:1px;color:#91C46B;text-transform:uppercase;margin-top:18px;">${eyebrow}</div>
      <div style="font-family:${FONT};font-weight:bold;font-size:24px;line-height:1.25;color:#ffffff;margin-top:6px;">${headline}</div>
    </td>
  </tr>`
}

function sectionRow({ kicker, title, innerHtml, alt = false }) {
  return `
  <tr>
    <td bgcolor="${alt ? '#f8fafc' : '#ffffff'}" style="padding:28px 32px;border-bottom:1px solid ${HAIR};">
      ${kicker ? `<div style="font-family:${FONT};font-size:10px;font-weight:bold;letter-spacing:1px;color:#91C46B;text-transform:uppercase;margin-bottom:6px;">${kicker}</div>` : ''}
      ${title ? `<div style="font-family:${FONT};font-weight:bold;font-size:18px;color:${INK};margin-bottom:10px;">${title}</div>` : ''}
      ${innerHtml}
    </td>
  </tr>`
}

function ctaRow({ title, body, ctaLabel, ctaHref }) {
  return `
  <tr>
    <td bgcolor="${DARK}" align="center" style="padding:32px 32px;">
      <div style="font-family:${FONT};font-weight:bold;font-size:20px;color:#ffffff;margin-bottom:10px;">${title}</div>
      <div style="font-family:${FONT};font-size:13px;color:#aab4c2;line-height:1.7;margin-bottom:22px;">${body}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
        <td bgcolor="#91C46B" style="border-radius:24px;">
          <a href="${ctaHref}" style="display:inline-block;padding:12px 28px;font-family:${FONT};font-weight:bold;font-size:13px;color:#010F1E;text-decoration:none;">${ctaLabel}</a>
        </td>
      </tr></table>
      <div style="font-family:${FONT};font-size:11px;color:#5f6b7d;margin-top:14px;">hello@radiant.digital</div>
    </td>
  </tr>`
}

function footerRow() {
  return `
  <tr>
    <td style="padding:18px 32px;font-family:${FONT};font-size:11px;color:${MUTED};">
      Radiant Digital &middot; hello@radiant.digital &middot; radiant.digital
    </td>
  </tr>`
}

// ── AI report ────────────────────────────────────────────────────────────────

function buildAiEmailHtml(profile, result) {
  if (!result?.stage) return wrapDocument({ title: 'AI Maturity Assessment', bodyHtml: '<tr><td style="padding:32px;">Report data unavailable.</td></tr>' })

  const { stage, sectionAverages = {}, findings = {} } = result
  const suggested = result.suggested || suggestedNextSteps({
    role: profile?.role, stageIndex: stage.index, sectionAverages,
  })
  const sections = [
    { key: 'Strategy', label: 'Strategy & Leadership' },
    { key: 'Data', label: 'Data & Technology' },
    { key: 'People', label: 'People & Governance' },
    { key: 'Adoption', label: 'Adoption & Value' },
  ]
  const barColor = (v) => (v < 2 ? '#EF4444' : v < 3 ? '#F59E0B' : v < 4 ? '#06B6D4' : '#22C55E')
  const barLabel = (v) => (v < 2 ? 'Needs attention' : v < 3 ? 'Below target' : v < 4 ? 'On track' : 'Strong')

  const scoreRows = sections.map(s => {
    const v = sectionAverages[s.key] || 0
    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
      <tr>
        <td style="font-family:${FONT};font-weight:bold;font-size:13px;color:${INK};">${s.label}</td>
        <td align="right" style="font-family:${FONT};font-size:12px;font-weight:bold;color:${barColor(v)};">${v ? v.toFixed(1) : '--'} / 5 &middot; ${barLabel(v)}</td>
      </tr>
      <tr><td colspan="2" style="padding-top:6px;">${bar((v / 5) * 100, barColor(v))}</td></tr>
    </table>`
  }).join('')

  const strengths = (findings.strengths || []).map(f => `
    <div style="margin-bottom:12px;">
      <div style="font-family:${FONT};font-size:10px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;color:${MUTED};">${f.section}</div>
      <div style="font-family:${FONT};font-weight:bold;font-size:13px;color:${INK};margin:2px 0;">&#10003; ${f.title}</div>
      <div style="font-family:${FONT};font-size:12px;color:${BODY};line-height:1.6;">${f.body}</div>
    </div>`).join('')

  const gaps = (findings.gaps || []).map(f => `
    <div style="margin-bottom:12px;">
      <div style="font-family:${FONT};font-size:10px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;color:${MUTED};">${f.section}</div>
      <div style="font-family:${FONT};font-weight:bold;font-size:13px;color:${INK};margin:2px 0;">&#9888; ${f.title}</div>
      <div style="font-family:${FONT};font-size:12px;color:${BODY};line-height:1.6;">${f.body}</div>
    </div>`).join('')

  const radiantRead = {
    1: "You're at a critical inflection point. The organizations that move fastest from Stage 1 get one executive to own a specific outcome and make it visible.",
    2: 'The technology team is excited, the rest of the organization is skeptical, and leadership is waiting for proof: one production use case with a before-and-after measurement becomes the business case for everything that follows.',
    3: 'You have proof that AI works in your organization. The challenge now is organizational, not technical: making AI the default instead of the exception through governance that builds trust rather than slowing things down.',
    4: "You're in the governance-as-competitive-advantage phase. The next unlock is treating your AI portfolio like a private equity firm treats investments: rigorous tracking, active reallocation, a clear theory of compounding returns.",
    5: "At Stage 5, the conversation shifts from 'how do we implement AI' to 'how does AI change our business model': proprietary models, feedback loops, and capabilities that are hard for competitors to replicate.",
  }

  const body = [
    headerRow({
      eyebrow: 'AI Maturity Assessment, Full Version',
      headline: `Stage ${stage.index}: ${stage.name}`,
      metaLine: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    }),
    sectionRow({
      kicker: 'Your AI Maturity',
      title: stage.tagline || '',
      innerHtml: `${pipStrip(stage.index, 5, '#91C46B')}<div style="font-family:${FONT};font-size:13px;color:${BODY};line-height:1.7;">${stage.description || ''}</div>`,
    }),
    sectionRow({ kicker: 'Scores by Dimension', title: 'How You Scored', innerHtml: scoreRows, alt: true }),
    (() => {
      const pos = positioningRead({ sectionAverages, stageIndex: stage.index })
      return sectionRow({
        kicker: 'Competitive Positioning', title: 'Where You Stand vs. the Market',
        innerHtml: `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-bottom:12px;">
            <tr>
              <td style="font-family:${FONT};font-weight:bold;font-size:13px;color:${INK};padding:6px 0;">Execution Readiness</td>
              <td align="right" style="font-family:${FONT};font-size:13px;font-weight:bold;color:#5a8a32;padding:6px 0;">${pos.execPct} / 100</td>
            </tr>
            <tr>
              <td style="font-family:${FONT};font-weight:bold;font-size:13px;color:${INK};padding:6px 0;border-top:1px solid ${HAIR};">Strategic Maturity</td>
              <td align="right" style="font-family:${FONT};font-size:13px;font-weight:bold;color:#5a8a32;padding:6px 0;border-top:1px solid ${HAIR};">${pos.stratPct} / 100</td>
            </tr>
          </table>
          <div style="font-family:${FONT};font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;color:#5a8a32;margin-bottom:6px;">${pos.groupLabel} &middot; ${pos.stageRange}</div>
          <div style="font-family:${FONT};font-size:13px;color:${BODY};line-height:1.7;">${pos.meansText}</div>`,
      })
    })(),
    (strengths || gaps) ? sectionRow({
      kicker: 'What We See', title: 'Your Strengths &amp; Gaps',
      innerHtml: `${strengths}${gaps}`,
    }) : '',
    (() => {
      const stepsHtml = suggested.steps.map((s, i) => `
        <div style="background:${DARK};border-radius:10px;padding:16px 18px;border-left:3px solid #91C46B;margin-bottom:10px;">
          <div style="font-family:${FONT};font-size:10px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;color:#91C46B;margin-bottom:5px;">${s.priority} &middot; ${s.phase}</div>
          <div style="font-family:${FONT};font-weight:bold;font-size:13px;color:#ffffff;margin-bottom:4px;">${i + 1}. ${s.title}</div>
          <div style="font-family:${FONT};font-size:12px;color:#cfd8e3;line-height:1.7;margin-bottom:6px;">${s.detail}</div>
          <div style="font-family:${FONT};font-size:11px;color:#8fb573;font-weight:bold;">Radiant Digital service: ${s.service}</div>
        </div>`).join('')
      const svc = suggested.services.map(sv =>
        `<span style="display:inline-block;font-family:${FONT};font-size:11px;color:#33422a;background:#f0f7ea;border:1px solid #cfe6b8;border-radius:100px;padding:4px 11px;margin:0 6px 6px 0;">${sv}</span>`).join('')
      return sectionRow({
        kicker: 'Suggested Next Steps', title: 'Your Path: Assess &rarr; Train &rarr; Adopt &rarr; Scale &rarr; Sustain', alt: true,
        innerHtml: `<div style="font-family:${FONT};font-size:13px;color:${BODY};line-height:1.7;margin-bottom:14px;">${suggested.intro}</div>
          ${stepsHtml}
          <div style="font-family:${FONT};font-size:11px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;color:${MUTED};margin:16px 0 8px;">Recommended services</div>
          <div>${svc}</div>`,
      })
    })(),
    sectionRow({
      kicker: "Radiant Digital's Read", title: 'What This Means for You',
      innerHtml: `<div style="background:#f0f7ea;border:1px solid #cfe6b8;border-radius:10px;padding:16px 18px;">
        <div style="font-family:${FONT};font-size:13px;color:#33422a;line-height:1.7;">${radiantRead[stage.index] || radiantRead[6]}</div>
      </div>`,
    }),
    (() => {
      const leaders = LEADER_CONTENT[stage.index] || LEADER_CONTENT[6]
      const acts = leaders.actions.map((a, i) => `
        <div style="margin-bottom:12px;">
          <div style="font-family:${FONT};font-weight:bold;font-size:13px;color:${INK};margin-bottom:2px;">${i + 1}. ${a.title}</div>
          <div style="font-family:${FONT};font-size:12px;color:${BODY};line-height:1.6;">${a.body}</div>
        </div>`).join('')
      return sectionRow({
        kicker: 'What AI Leaders Do', title: leaders.heading, alt: true,
        innerHtml: `
          <div style="font-family:${FONT};font-size:13px;color:${BODY};line-height:1.7;margin-bottom:12px;">${leaders.context}</div>
          ${leaders.statBadge ? `<div style="font-family:${FONT};font-size:12px;color:#5a8a32;font-weight:bold;margin-bottom:14px;"><span style="font-size:15px;">${leaders.statBadge.value}</span>, ${leaders.statBadge.label}</div>` : ''}
          ${acts}`,
      })
    })(),
    (() => {
      const pos = positioningRead({ sectionAverages, stageIndex: stage.index })
      const who = profile?.companyName || (profile?.fullName ? `${profile.fullName}'s organization` : 'Your organization')
      const bandName = stage.index <= 2 ? 'the Early Movers group' : stage.index <= 4 ? 'the Progressing group' : 'the AI Leaders band'
      const rankC = sections.map(s => ({ label: s.label, v: sectionAverages[s.key] || 0 })).sort((a, b) => b.v - a.v)
      const topC = rankC[0], lowC = rankC[rankC.length - 1]
      const stepList = (suggested.steps || []).map((s, i) => `${i + 1}) ${s.title.charAt(0).toLowerCase() + s.title.slice(1)}`).join(', ')
      const pgraph = (t) => `<div style="font-family:${FONT};font-size:13px;color:${BODY};line-height:1.7;margin-bottom:12px;">${t}</div>`
      return sectionRow({
        kicker: 'Conclusion', title: "Where You Stand, and What's Next",
        innerHtml:
          pgraph(`${who} sits at Stage ${stage.index} of 6, ${stage.name}, placing it in ${bandName}. Execution Readiness scores ${pos.execPct} of 100 and Strategic Maturity ${pos.stratPct} of 100.`)
          + (topC.v && lowC.v ? pgraph(`The strongest dimension is ${topC.label} (${topC.v.toFixed(1)} of 5), while ${lowC.label} (${lowC.v.toFixed(1)}) is the one most likely to gate further progress, and where organizations at this stage most often stall on the way to the next.`) : '')
          + (stepList ? pgraph(`The recommended sequence follows directly: ${stepList}. Executed in order along Radiant Digital's Assess &rarr; Train &rarr; Adopt &rarr; Scale &rarr; Sustain model, these moves convert today's position into durable, compounding advantage.`) : '')
          + pgraph('The advantage compounds only for organizations whose governance is mature enough to trust AI with action. A focused next step, and a short conversation with the team below, is enough to map exactly where to start.'),
      })
    })(),
    (() => {
      const people = [
        { initials: 'PK', name: 'Prafull Khare', title: 'Executive Director | Global Head of AI Strategy, Solution Engineering, &amp; New Technology Enablement', org: 'Radiant Digital', email: 'prafull.khare@radiant.digital' },
        { initials: 'SC', name: 'Srinivas Chamarthi', title: 'SVP &amp; Business Head', org: 'Radiant Digital', email: 'srinivas.chamarthi@radiant.digital' },
      ]
      const cards = people.map(p => `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-bottom:14px;">
          <tr>
            <td width="52" valign="top" style="padding-right:12px;">
              <div style="width:44px;height:44px;border-radius:100px;background:#dfe8f2;font-family:${FONT};font-weight:bold;font-size:14px;color:#5b7391;line-height:44px;text-align:center;">${p.initials}</div>
            </td>
            <td valign="top">
              <div style="font-family:${FONT};font-weight:bold;font-size:14px;color:${INK};">${p.name}</div>
              <div style="font-family:${FONT};font-size:12px;color:${BODY};line-height:1.5;margin:2px 0 4px;">${p.title} &middot; ${p.org}</div>
              <a href="mailto:${p.email}" style="font-family:${FONT};font-size:12px;font-weight:bold;color:#5a8a32;text-decoration:none;">${p.email}</a>
            </td>
          </tr>
        </table>`).join('')
      return sectionRow({
        kicker: 'Get in Touch', title: 'Speak With the Team Behind This Assessment', alt: true,
        innerHtml: `<div style="font-family:${FONT};font-size:13px;color:${BODY};line-height:1.7;margin-bottom:16px;">Reach out to Radiant Digital's AI leadership to map exactly where to start and what the next stage looks like for your organization.</div>${cards}<div style="font-family:${FONT};font-size:11px;color:${MUTED};margin-top:4px;">Placeholder headshots shown. Replace the PK and SC initials with the supplied photos before external distribution.</div>`,
      })
    })(),
    ctaRow({
      title: `Ready to move from ${suggested.currentPhase} to your next stage?`,
      body: 'Radiant Digital has helped enterprises across 14+ industries move through every stage of AI maturity. A 30-minute conversation is enough to map exactly where to start.',
      ctaLabel: 'Schedule 30 Minutes with Radiant Digital',
      ctaHref: 'https://radiant.digital/contact',
    }),
    footerRow(),
  ].join('')

  return wrapDocument({ title: `AI Maturity Assessment, ${profile?.fullName || 'Assessment'}`, bodyHtml: body })
}

// ── CX report ────────────────────────────────────────────────────────────────

function buildCxEmailHtml(profile, result) {
  if (!result?.overallLevel) return wrapDocument({ title: 'CX Maturity Report', bodyHtml: '<tr><td style="padding:32px;">Report data unavailable.</td></tr>' })

  const { dimensions = [], overallLevel, overallKey } = result
  const levelColor = { Foundational: '#F0974E', Developing: '#596AE0', Advanced: '#91C46B' }
  const color = levelColor[overallLevel] || '#91C46B'
  const levelIndex = { Foundational: 1, Developing: 2, Advanced: 3 }[overallLevel] || 1

  const dimRows = dimensions.map(d => `
    <div style="padding:14px 0;border-bottom:1px solid ${HAIR};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:${FONT};font-weight:bold;font-size:13px;color:${INK};">${d.label}</td>
        <td align="right" style="font-family:${FONT};font-size:11px;font-weight:bold;color:${levelColor[d.level] || color};">${d.level}</td>
      </tr></table>
      <div style="font-family:${FONT};font-size:12px;color:${BODY};line-height:1.6;margin-top:6px;">${d.blurb || ''}</div>
    </div>`).join('')

  const radiantRead = overallKey === 'Foundational'
    ? 'The biggest unlock at this stage is making customer insight a repeatable process rather than a one-time project.'
    : overallKey === 'Developing'
      ? 'You have the foundation. The gap to Advanced is closing the loop between customer data and strategic decisions.'
      : 'At Advanced maturity, the focus shifts from building CX capability to compounding it: continuous, real-time customer intelligence.'

  const body = [
    headerRow({
      eyebrow: 'CX Maturity Report, Full Version',
      headline: overallLevel,
      metaLine: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    }),
    sectionRow({
      kicker: 'Your CX Maturity Level', title: 'Overall Maturity',
      innerHtml: pipStrip(levelIndex, 3, color),
    }),
    sectionRow({ kicker: 'Dimension Breakdown', title: 'How You Scored Across Three Dimensions', innerHtml: dimRows, alt: true }),
    sectionRow({
      kicker: 'Recommended Solution', title: 'Experience AI by Radiant Digital',
      innerHtml: `<div style="font-family:${FONT};font-size:13px;color:${BODY};line-height:1.7;margin-bottom:14px;">To help you progress to the next maturity level, Radiant Digital recommends Experience AI, our qualitative + quantitative insight engine.</div>
      <div style="background:#f0f7ea;border:1px solid #cfe6b8;border-radius:10px;padding:16px 18px;">
        <div style="font-family:${FONT};font-size:10px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;color:#5c8a39;margin-bottom:6px;">Why this matters at the ${overallLevel} level</div>
        <div style="font-family:${FONT};font-size:13px;color:#33422a;line-height:1.7;">${radiantRead}</div>
      </div>`,
    }),
    ctaRow({
      title: "Let's build your CX roadmap.",
      body: "Radiant Digital's CX practice has helped enterprises across financial services, healthcare, and technology improve CSAT by 20%+ within 90 days.",
      ctaLabel: 'Schedule a CX Strategy Session',
      ctaHref: 'https://radiant.digital/contact',
    }),
    footerRow(),
  ].join('')

  return wrapDocument({ title: `CX Maturity Report, ${profile?.fullName || 'Assessment'}`, bodyHtml: body })
}

// ── Public entry point ──────────────────────────────────────────────────────

/**
 * Returns a complete, email-client-safe HTML document for the full report.
 * Use this as the body (or attached .html) when the delivery channel can't
 * carry the PDF as a binary attachment.
 */
export function buildEmailSafeReportHtml({ kind, profile, result }) {
  return kind === 'ai' ? buildAiEmailHtml(profile, result) : buildCxEmailHtml(profile, result)
}
