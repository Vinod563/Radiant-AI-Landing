/**
 * Shared editorial copy for the assessment report: the single source of truth
 * used by BOTH the on-screen "view online" HTML report (HTMLReportViewer.jsx)
 * and the emailed PDF (generateReportPdf.js), so their wording can never drift.
 */

// AI, "Radiant's Read", keyed by autonomy stage index (1–6)
export const aiRadiantRead = {
  1: "At Zero Autonomy, AI is helping people work but isn't making any decisions, and that's the right place to start. The organizations that climb fastest from here don't rush to automate; they get the foundations right first. Clean, structured data and standardized processes are what make every later stage of autonomy possible. The biggest risk now is delegating decisions before the inputs underneath them are trustworthy.",
  2: "Guided Autonomy is where most enterprises live: AI recommends in real time, but a human still approves every action. The value is already real, faster, better-informed decisions, but the ceiling is trust. The pattern we see is leaders waiting for proof before letting AI act on its own. That proof comes from picking a few low-risk, high-volume decisions and measuring what happens when AI handles them start to finish.",
  3: "At Insight Autonomy, AI stops waiting to be asked: it surfaces trends, risks, and anomalies on its own, and your people consume that intelligence instead of building reports. That's a milestone most organizations never reach. The challenge now is no longer generating insight; it's connecting it to action. The unlock is wiring AI-generated intelligence directly into the workflows where decisions actually get made.",
  4: "Operational Autonomy is the governance-as-advantage phase. AI insight now drives cross-functional workflows automatically, and humans supervise the exceptions rather than the routine. The organizations that do this well don't just move faster, they design the checkpoints that keep speed and oversight in balance. The next unlock is shifting from reacting to events to anticipating them before they happen.",
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
  const bandText = group === 'early'
    ? "You're in the Early Movers group (Stage 1-2), where most organizations begin. The priority is a written AI strategy and clean data foundations before scaling execution."
    : group === 'progress'
      ? "You're in the Progressing group (Stage 3-4), ahead of the market average. The move toward AI Leadership now depends on governance maturity and scaling what works into production."
      : "You're in or near the AI Leaders group (Stage 5-6). The focus shifts to compounding the advantage: governance systems, portfolio ROI, and organizational learning loops."
  const tilt = y - x > 0.15
    ? ' Your strategy is ahead of your execution: turn planning into deployed, production use cases.'
    : x - y > 0.15
      ? ' Your execution is ahead of your strategy: add governance and a scalable framework so you build the right things.'
      : ' Strategy and execution are well balanced.'
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
    body: 'Radiant Digital has helped enterprises across 14+ industries move through every stage of AI maturity. A 30-minute conversation is enough to map exactly where to start.',
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
const DIMENSION_STEP = {
  Strategy: {
    phase: 'Assess', dimension: 'Strategy & Leadership',
    title: 'Align leadership on a written AI strategy with a named owner',
    detail: 'Investment decisions are being made without a shared framework. A half-day executive session to define three specific AI outcomes, each with an owner and a timeline, removes more friction than months of planning documents.',
    service: 'AI strategy & readiness workshop',
  },
  Data: {
    phase: 'Assess', dimension: 'Data & Technology',
    title: 'Run a data readiness audit before the next deployment',
    detail: 'Map what you have, what is clean enough to use, and what needs work. The output is a data inventory that makes every future project faster and every AI output more trustworthy.',
    service: 'Data & infrastructure readiness audit',
  },
  People: {
    phase: 'Train', dimension: 'People & Governance',
    title: 'Stand up governance and role-based AI literacy',
    detail: 'Technical teams are ahead; everyone else is watching from a distance. A 30-day sprint to approve a governance framework and launch role-based training closes the gap that keeps pilots from spreading.',
    service: 'Role-based AI training & governance framework',
  },
  Adoption: {
    phase: 'Adopt', dimension: 'Adoption & Value',
    title: 'Move pilots into measured production',
    detail: 'The jump from pilot to production is where most organizations stall, almost never on the technology. Fix the missing piece first (change management, a process owner, or ROI measurement) and everything else accelerates.',
    service: 'Use-case pilot design & adoption support',
  },
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
  add(DIMENSION_STEP[weakest], 'Start here')
  add(PROGRESSION[currentPhase], 'Then')
  add(ROLE_STEP[role], 'For your role')

  return {
    model: RADIANT_MODEL,
    currentPhase,
    band,
    intro: `Your path through Radiant Digital's delivery model, Assess → Train → Adopt → Scale → Sustain, starting from where your organization is today (${currentPhase}).`,
    steps: steps.slice(0, 3),
    services: SERVICES_BY_BAND[band],
    email: 'hello@radiant.digital',
  }
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
