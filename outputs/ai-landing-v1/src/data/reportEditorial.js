/**
 * Shared editorial copy for the assessment report: the single source of truth
 * used by BOTH the on-screen "view online" HTML report (HTMLReportViewer.jsx)
 * and the emailed PDF (generateReportPdf.js), so their wording can never drift.
 */

import { scoreBarStyle } from './aiAssessment.js'

const NWORD = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four' }

// AI, "Radiant's Read", keyed by autonomy stage index (1–6)
export const aiRadiantRead = {
  1: "At Zero Autonomy, AI is helping people work but isn't making any decisions, and that's the right place to start. The organizations that climb fastest from here don't rush to automate; they get the foundations right first. Clean, structured data and standardized processes are what make every later stage of autonomy possible. The biggest risk now is delegating decisions before the inputs underneath them are trustworthy.",
  2: "Guided Autonomy is a common enterprise position: AI recommends in real time, but a human still approves every action. The value is already real, faster, better-informed decisions, but the ceiling is trust. The pattern we see is leaders waiting for proof before letting AI act on its own. That proof comes from picking a few low-risk, high-volume decisions and measuring what happens when AI handles them start to finish.",
  3: "At Insight Autonomy, AI stops waiting to be asked: it surfaces trends, risks, and anomalies on its own, and your people consume that intelligence instead of building reports. That is a meaningful milestone. The challenge now is no longer generating insight; it is connecting it to action. The unlock is wiring AI-generated intelligence directly into the workflows where decisions actually get made.",
  4: "Operational Autonomy is the governance-as-advantage phase. AI-enabled insight is beginning to support cross-functional decisions and workflows, with people retaining oversight at key checkpoints. The immediate priority is to strengthen governance, oversight, and role-based readiness. Once these foundations are in place, the organization can introduce prediction more proactively in selected, well-governed workflows.",
  5: "At Proactive Autonomy, AI predicts and prescribes before your team sees the need, and people move up to strategy and governance. This is where the advantage compounds, but only for organizations whose governance is mature enough to trust prediction with action. The work here is building the guardrails and feedback loops that let AI initiate, not just recommend, with confidence.",
  6: "Full Autonomy is a self-governing system: AI executes multi-step work, learns from outcomes, and improves without manual retraining, while humans define guardrails and approve high-risk exceptions. The conversation shifts from 'how do we deploy AI' to 'how do we govern a system that runs itself.' Durable advantage at this stage comes from proprietary models, learning loops competitors can't replicate, and governance rigorous enough to keep an autonomous system accountable.",
}

// AI, Competitive Positioning read — shared by the on-screen chart, the PDF, and
// the email-safe report so the numbers and "what this means" text never diverge.
export function positioningRead({ sectionAverages = {}, stageIndex } = {}) {
  const x = ((sectionAverages.Data || 0) + (sectionAverages.Adoption || 0)) / 2 / 5
  const y = ((sectionAverages.Strategy || 0) + (sectionAverages.People || 0)) / 2 / 5
  const sIdx = stageIndex ?? (((x + y) / 2 < 0.466) ? 2 : ((x + y) / 2 < 0.734) ? 4 : 6)
  const group = sIdx <= 2 ? 'early' : sIdx <= 4 ? 'progress' : 'leaders'
  // Lowest-scoring dimension, named in the Progressing readout.
  const DIM_LABELS = { Strategy: 'Strategy & Leadership', Data: 'Data & Technology', People: 'People & Governance', Adoption: 'Adoption & Value' }
  let weakestKey = 'Strategy', weakestMin = Infinity
  for (const k of ['Strategy', 'Data', 'People', 'Adoption']) {
    const s = sectionAverages[k] || 0
    if (s < weakestMin) { weakestMin = s; weakestKey = k }
  }
  const weakestLabel = DIM_LABELS[weakestKey]
  const bandText = group === 'early'
    ? "You're in the Early Movers group (Stage 1-2), where most organizations begin. The priority is a written AI strategy and clean data foundations before scaling execution."
    : group === 'progress'
      ? `You're in the Progressing group (Stage 3-4). Your move toward AI Leadership now depends on strengthening ${weakestLabel} and scaling proven AI initiatives into production.`
      : "You're in or near the AI Leaders group (Stage 5-6). The focus shifts to compounding the advantage: governance systems, portfolio ROI, and organizational learning loops."
  const tilt = y - x > 0.15
    ? ' Your strategy is ahead of your execution: turn planning into deployed, production use cases.'
    : x - y > 0.15
      ? ' Your execution is ahead of your strategy: add governance and a scalable framework so you build the right things.'
      : ' Your strategy and execution scores are closely balanced.'
  return {
    x, y,
    execPct: Math.round(x * 100),
    stratPct: Math.round(y * 100),
    group,
    groupLabel: group === 'early' ? 'Early Movers' : group === 'progress' ? 'Progressing' : 'AI Leaders',
    stageRange: group === 'early' ? 'Stage 1-2' : group === 'progress' ? 'Stage 3-4' : 'Stage 5-6',
    meansText: bandText + tilt,
  }
}

// AI, CTA copy (next stage CTA)
export function aiCta(stageIndex) {
  return {
    title: `Ready to move to Stage ${Math.min(stageIndex + 1, 6)}?`,
    body: 'A 30-minute conversation with Radiant Digital can help you identify the right starting point for your next stage of AI maturity.',
    action: 'Schedule 30 minutes with Radiant Digital',
    email: 'hello@radiant.digital',
  }
}

// ── AI, Suggested Next Steps (Radiant delivery model) ────────────────────────
// The six-stage Autonomy score tells us WHERE an org sits. Radiant's delivery
// model — Assess → Train → Adopt → Scale → Sustain — tells them WHAT to do next.
// suggestedNextSteps() builds a personalized, ordered set of concrete moves from
// the respondent's role, autonomy stage, and weakest dimension, each tagged to a
// model phase and a matched Radiant service. Replaces the old generic CTA.
export const RADIANT_MODEL = ['Assess', 'Train', 'Adopt', 'Scale', 'Sustain']

// Which model phase an org at each autonomy stage (1–6) is actively working through.
const STAGE_PHASE = { 1: 'Assess', 2: 'Train', 3: 'Adopt', 4: 'Adopt', 5: 'Scale', 6: 'Sustain' }

// Weakest dimension → the phase + first concrete move that closes it.
// `detail` opens with the score-anchored finding: `{score}` is replaced with the
// dimension's own average by suggestedNextSteps(), so the sentence the report
// prints in the "Why now" column stays inside what the responses support.
const DIMENSION_STEP = {
  Strategy: {
    phase: 'Assess', dimension: 'Strategy & Leadership',
    title: 'Align leadership around a written AI strategy with a named owner',
    detail: 'Strategy & Leadership is your lowest-scoring dimension at {score} out of 5. The result indicates a need to put a written AI strategy in place, define three specific outcomes, name an accountable owner for each, and agree the timelines investment decisions will be measured against.',
    service: 'AI strategy & readiness workshop',
  },
  Data: {
    phase: 'Assess', dimension: 'Data & Technology',
    title: 'Run a data readiness audit before the next deployment',
    detail: 'Data & Technology is your lowest-scoring dimension at {score} out of 5. The result indicates a need to record what data exists, what is clean enough to use, and what needs work, so the next deployment starts from a documented baseline.',
    service: 'Data & infrastructure readiness audit',
  },
  People: {
    phase: 'Train', dimension: 'People & Governance',
    title: 'Stand up governance and role-based AI literacy',
    detail: 'People & Governance is your lowest-scoring dimension at {score} out of 5. The result indicates a need to formalize governance, broaden role-based AI literacy, clarify accountability, and establish consistent oversight.',
    service: 'Role-based AI training & governance framework',
  },
  Adoption: {
    phase: 'Adopt', dimension: 'Adoption & Value',
    title: 'Move pilots into measured production',
    detail: 'Adoption & Value is your lowest-scoring dimension at {score} out of 5. The result indicates a need to move selected pilots into production with a named process owner, change support, and an agreed measure of business value.',
    service: 'Use-case pilot design & adoption support',
  },
}

/**
 * One separately written 60-day plan per dimension. The rows are the report's
 * "Illustrative 60-day breakdown" table; each plan is written for its own
 * dimension rather than built by injecting a dimension name into shared wording.
 */
export const SIXTY_DAY_PLAN = {
  Strategy: [
    ['Document', '1 to 2', 'Document current AI objectives, funded initiatives, decision rights, and who owns each one today.'],
    ['Assess', '3 to 6', 'Assess each initiative against business outcomes, resourcing, and leadership alignment, and record where direction or ownership is unclear.'],
    ['Approve', '7 to 8', 'Approve a written AI strategy with named outcomes, an accountable owner, timelines, and scheduled review points.'],
  ],
  Data: [
    ['Inventory', '1 to 2', 'Inventory the data sets, platforms, and pipelines the next AI use cases will depend on, and who owns each one.'],
    ['Assess', '3 to 6', 'Assess quality, access, lineage, and security for each priority data set, and record the gaps that would block deployment.'],
    ['Approve', '7 to 8', 'Approve a remediation plan with owners, sequencing, and a go/no-go decision for the next deployment.'],
  ],
  People: [
    ['Document', '1 to 2', 'Document current AI policies, decision rights, owners, training provision, and controls.'],
    ['Assess', '3 to 6', 'Assess governance coverage, role-based literacy, accountability, approval paths, and oversight practices.'],
    ['Approve', '7 to 8', 'Approve a governance roadmap with owners, timelines, training priorities, and the measures used to track it.'],
  ],
  Adoption: [
    ['Review', '1 to 2', 'Review pilots and production use cases already running, their owners, and how value is measured today.'],
    ['Assess', '3 to 6', 'Assess what is holding selected pilots short of production: process ownership, change support, integration, or measurement.'],
    ['Approve', '7 to 8', 'Approve a scaling plan for the highest-value use cases, with owners, timelines, and agreed business measures.'],
  ],
}

/**
 * Sector-specific copy. Each regulated sector we tailor for supplies the same
 * three blocks, so coverage stays even across sectors rather than Financial
 * Services being the only tailored report. Sectors not listed get no insert.
 */
const SECTOR_COPY = [
  {
    match: /financ/i,
    clause: ', especially given the regulated Financial Services setting',
    consideration: {
      title: 'Explainability and stakeholder trust',
      body: 'In Financial Services specifically, AI-driven decisions that affect customers or capital typically need to be explainable to regulators, auditors, and customers themselves, not just accurate.',
    },
    callout: {
      label: 'Why this matters in Financial Services',
      body: 'Autonomous, end-to-end resolution is more consequential in a regulated industry: every workflow AI is allowed to run unattended is also one your compliance and audit functions need to be able to explain after the fact.',
    },
  },
  {
    match: /health/i,
    clause: ', especially given the regulated healthcare setting',
    consideration: {
      title: 'Clinical accountability and patient data',
      body: 'In healthcare specifically, AI that informs clinical or patient-facing decisions typically needs documented human accountability, auditable records, and clear controls over how patient data is accessed, used, and retained.',
    },
    callout: {
      label: 'Why this matters in healthcare',
      body: 'Any workflow AI is allowed to run with limited supervision is also one your clinical governance, privacy, and audit functions need to be able to review and explain afterwards.',
    },
  },
  {
    match: /government|public sector/i,
    clause: ', especially given the public sector setting',
    consideration: {
      title: 'Transparency and public accountability',
      body: 'In the public sector specifically, AI-supported decisions that affect citizens or public funds typically need documented decision records, clear human accountability, and security and procurement controls that can be evidenced on request.',
    },
    callout: {
      label: 'Why this matters in the public sector',
      body: 'Workflows AI is allowed to run with limited supervision also need to be explainable to oversight bodies, auditors, and the people affected by the decision, not only accurate.',
    },
  },
]

/** Returns the tailored blocks for a sector, or null when the sector has none. */
export function sectorCopy(sector = '') {
  return SECTOR_COPY.find(s => s.match.test(sector)) || null
}

// The step that advances an org from its current phase to the next one.
const PROGRESSION = {
  Assess: {
    phase: 'Train',
    title: 'Launch role-based AI training and curated learning paths',
    detail: 'With the foundations mapped, the next unlock is capability. Give each function a learning path matched to how it will actually use AI, so adoption is not gated on a handful of specialists.',
    service: 'AI literacy program & curated learning paths',
  },
  Train: {
    phase: 'Adopt',
    title: 'Design your first governed pilot',
    detail: 'Pick a few low-risk, high-volume decisions and let AI handle them start to finish under supervision. Measured pilots are what turn training into trust and build the case for the next investment.',
    service: 'Pilot design & adoption support',
  },
  Adopt: {
    phase: 'Scale',
    title: 'Scale proven use cases into production',
    detail: 'Wire AI-generated insight directly into the workflows where decisions get made, and design the checkpoints that keep speed and oversight in balance as volume grows.',
    service: 'Enterprise AI deployment guidance',
  },
  Scale: {
    phase: 'Sustain',
    title: 'Institutionalize governance and learning loops',
    detail: 'Build the guardrails and feedback loops that let AI initiate, not just recommend. This is where advantage compounds, for organizations whose governance is mature enough to trust prediction with action.',
    service: 'AI governance & optimization retainer',
  },
  Sustain: {
    phase: 'Sustain',
    title: 'Compound advantage with proprietary learning loops',
    detail: 'Durable advantage now comes from proprietary models, learning loops competitors cannot replicate, and governance rigorous enough to keep an autonomous system accountable.',
    service: 'Continuous optimization & model governance',
  },
}

// A step tailored to the respondent's role.
const ROLE_STEP = {
  exec: {
    phase: 'Assess',
    title: 'Name a single accountable AI owner with budget authority',
    detail: 'AI is often everyone\'s priority and no one\'s job. Naming one C-level owner, measured on outcomes, not just interested, is the change that unblocks every stage above.',
    service: 'Executive AI operating-model design',
  },
  tech: {
    phase: 'Scale',
    title: 'Harden data pipelines and MLOps for production',
    detail: 'The constraint on scaling is rarely the model: it is reproducible pipelines, monitoring, and deployment discipline. Getting MLOps right is what lets proven use cases run reliably at enterprise volume.',
    service: 'Enterprise AI deployment & MLOps',
  },
  biz: {
    phase: 'Adopt',
    title: 'Pick one high-volume workflow to automate start to finish',
    detail: 'Choose a single operational workflow you own, and measure what happens when AI handles it start to finish. One visible, measured win does more for adoption than a portfolio of stalled pilots.',
    service: 'Adoption & change-management support',
  },
  consultant: {
    phase: 'Train',
    title: 'Build curated learning paths for the teams you advise',
    detail: 'As an AI Practitioner, your impact is enablement. Curated, role-based learning paths give client teams a repeatable way to move from awareness to applied capability.',
    service: 'Curated learning paths & enablement',
  },
}

// Recommended services surfaced by maturity band.
const SERVICES_BY_BAND = {
  early: [
    'AI readiness & data audit',
    'Role-based AI training',
    'Curated learning paths',
    'Adoption support for first pilots',
  ],
  progress: [
    'Adoption & change-management support',
    'AI governance framework',
    'Enterprise AI deployment guidance',
    'MLOps & production scaling',
  ],
  leaders: [
    'Enterprise AI deployment at scale',
    'AI governance & optimization retainer',
    'Proprietary model & learning-loop design',
    'Continuous maturity benchmarking',
  ],
}

/**
 * Build personalized Suggested Next Steps mapped to Radiant's delivery model.
 * @param {{ role?: string, stageIndex?: number, sectionAverages?: Record<string, number> }} params
 * @returns ordered steps (each tagged to a model phase + service) and band-gated services.
 */
export function suggestedNextSteps({ role, stageIndex = 1, sectionAverages = {} } = {}) {
  let weakest = 'Strategy'
  let min = Infinity
  for (const key of ['Strategy', 'Data', 'People', 'Adoption']) {
    const s = sectionAverages[key] || 0
    if (s < min) { min = s; weakest = key }
  }

  const currentPhase = STAGE_PHASE[stageIndex] || 'Assess'
  const band = stageIndex <= 2 ? 'early' : stageIndex <= 4 ? 'progress' : 'leaders'

  // Build up to three distinct steps: fix-the-weakest, advance-a-phase, role-fit.
  const seen = new Set()
  const steps = []
  const add = (step, priority) => {
    if (!step || seen.has(step.title)) return
    seen.add(step.title)
    steps.push({ ...step, priority })
  }
  const weakestStep = DIMENSION_STEP[weakest]
  add(weakestStep && { ...weakestStep, detail: weakestStep.detail.replace('{score}', (min === Infinity ? 0 : min).toFixed(1)) }, 'Start here')
  add(PROGRESSION[currentPhase], 'Then')
  add(ROLE_STEP[role], 'For your role')

  return {
    model: RADIANT_MODEL,
    currentPhase,
    weakest,
    intro: `Your path through Radiant Digital's delivery model, Assess, Train, Adopt, Scale, and Sustain, starting from where your organization is today (${currentPhase}).`,
    band,
    steps: steps.slice(0, 3),
    services: SERVICES_BY_BAND[band],
    email: 'hello@radiant.digital',
  }
}

// ── Score interpretation copy ────────────────────────────────────────────────
// These build the sentences that describe the score set. They are written to be
// true for every combination of dimensions and bands, so no report can claim a
// pattern (all dimensions in one band, capability ahead of foundations) that the
// respondent's own scores do not show.

const BAND_RANK = { 'Strong': 4, 'On track': 3, 'Below target': 2, 'Needs attention': 1, 'No data': 0 }

/**
 * "Scores range from 2.7 to 3.3 out of 5. Three dimensions are On track, while
 * People & Governance is Below target and requires focused attention."
 * @param {{label: string, v: number}[]} dims
 */
export function scoreSpreadSummary(dims = []) {
  const scored = dims.filter(d => d.v > 0)
  if (!scored.length) return ''
  const vals = scored.map(d => d.v)
  const min = Math.min(...vals)
  const max = Math.max(...vals)

  const groups = new Map()
  for (const d of scored) {
    const label = scoreBarStyle(d.v).label
    if (!groups.has(label)) groups.set(label, [])
    groups.get(label).push(d)
  }
  const ordered = [...groups.entries()].sort((a, b) => (BAND_RANK[b[0]] ?? 0) - (BAND_RANK[a[0]] ?? 0))
  const phrase = ([label, ds]) => (ds.length === 1
    ? `${ds[0].label} is ${label}`
    : `${NWORD[ds.length] || ds.length} dimensions are ${label}`)

  const [lowestLabel, lowestGroup] = ordered[ordered.length - 1]
  const sentence = ordered.length === 1
    ? (scored.length === 4 ? `All four dimensions are ${lowestLabel}` : phrase(ordered[0]))
    : `${phrase(ordered[0])}, while ${ordered.slice(1).map(phrase).join(', ')}`
  const tail = (BAND_RANK[lowestLabel] ?? 0) <= 2
    ? ` and ${lowestGroup.length > 1 ? 'require' : 'requires'} focused attention`
    : ''
  return `Scores range from ${min.toFixed(1)} to ${max.toFixed(1)} out of 5. ${sentence}${tail}.`
}

/** Headline for a closely balanced score set, gated on the absolute level too. */
export function balancedHeadline(minV = 0, maxV = 0) {
  if (minV >= 3.5) return 'Strong, balanced profile'
  if (maxV < 3.0) return 'Closely balanced, and below target across the board'
  return 'Closely balanced profile'
}

/** Neutral top-versus-low read, valid for any pair of dimensions. */
export function topVsLowRead({ topLabel, topScore = 0, lowLabel, lowScore = 0 } = {}) {
  if (Math.abs(topScore - lowScore) < 0.05) {
    return `Your dimension scores are effectively level at ${topScore.toFixed(1)} out of 5, so no single dimension stands out as the constraint. The priority is to raise all four together.`
  }
  return `${topLabel} is your leading dimension at ${topScore.toFixed(1)}, compared with ${lowScore.toFixed(1)} for ${lowLabel}. This difference identifies ${lowLabel} as the clearest area for focused improvement.`
}

/** Conclusion comparison paragraph: states the gap, names the band, no inference. */
export function conclusionComparison({ topLabel, topScore = 0, lowLabel, lowScore = 0 } = {}) {
  if (Math.abs(topScore - lowScore) < 0.05) {
    return `Your dimension scores are effectively level at ${topScore.toFixed(1)} out of 5. No single dimension stands out as the constraint, so progress depends on raising all four together rather than on one focused correction.`
  }
  return `${topLabel} is your leading dimension at ${topScore.toFixed(1)}, while ${lowLabel} is ${scoreBarStyle(lowScore).label} at ${lowScore.toFixed(1)}. This makes ${lowLabel} the clearest constraint on further progress and the priority for focused improvement.`
}

// What "progress" should be validated against, written per dimension.
const VALIDATION_BY_DIM = {
  Strategy: 'an approved written strategy, named owners for each outcome, funded priorities, and measurable business outcomes',
  Data: 'documented data quality standards, governed access to the data AI depends on, and measurable business outcomes',
  People: 'stronger governance, broader role-based literacy, accountable ownership, and measurable business outcomes',
  Adoption: 'use cases running in production, defined process ownership, and measurable business outcomes',
}

/** Stage-specific closing paragraph. Stage 6 has no next stage, so it sustains. */
export function conclusionClosing({ stageIndex = 1, lowKey = 'Strategy', lowLabel = '', lowScore = 0 } = {}) {
  if (stageIndex >= 6) {
    return `Stage 6 is the final stage on this ladder, so the work now is to sustain it: keep governance and evaluation current, keep measuring the business value AI delivers, and continue to raise your lowest-scoring dimension, ${lowLabel} at ${lowScore.toFixed(1)} out of 5.`
  }
  return `These actions provide a practical path toward Stage ${stageIndex + 1}. Progress should be validated through ${VALIDATION_BY_DIM[lowKey] || VALIDATION_BY_DIM.Strategy}.`
}

// CX, "Why this matters at the {level} level", keyed by overall level key
export function cxWhyThisMatters(overallKey) {
  if (overallKey === 'Foundational')
    return 'At this stage, the biggest unlock is making customer insight a repeatable process rather than a one-time project. Experience AI gives you the framework to turn raw customer signals into structured findings your organization can act on, without a dedicated research team.'
  if (overallKey === 'Developing')
    return 'You have the foundation. The gap to Advanced is closing the loop between customer data and strategic decisions. Experience AI helps you build that loop: consistent measurement, insight workflows, and a governance model that makes CX data actionable for leaders, not just analysts.'
  return 'At Advanced maturity, the focus shifts from building CX capability to compounding it. Experience AI enables continuous, real-time customer intelligence, moving you from measuring CX to systematically predicting and shaping it.'
}

// CX, CTA copy
export const cxCta = {
  title: "Let's build your CX roadmap.",
  body: "Radiant Digital's CX practice has helped enterprises across financial services, healthcare, and technology improve CSAT by 20%+ within 90 days. We'd like to show you what that looks like for your organization.",
  action: 'Schedule a CX strategy session',
  email: 'hello@radiant.digital',
}
