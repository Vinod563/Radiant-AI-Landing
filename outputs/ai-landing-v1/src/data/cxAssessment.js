/**
 * CX Maturity Assessment: data + scoring engine.
 *
 * Pure logic, no React. Mirrors aiAssessment.js so the CX flow runs through the
 * same components. Questions, stages, scoring bands, findings and next steps are
 * verbatim from radiant-cx-maturity-assessment.md (September 2026 draft).
 * Role-adaptive: getCxQuestions(role) selects the 12 questions a respondent sees.
 */

import { sectors, orgSizes, personalDomainBlocklist, scoreBarStyle } from './aiAssessment.js'

export { sectors, orgSizes, personalDomainBlocklist, scoreBarStyle }

// ── Profile config (spec §1, §3) ────────────────────────────────────────────

export const roles = [
  { key: 'exec', name: 'Executive', desc: 'C-Suite, VP, Director', track: 'Executive Track' },
  { key: 'practitioner', name: 'Practitioner', desc: 'CX, Research, Design, Service Ops', track: 'Practitioner Track' },
]

export const departments = [
  'Customer Experience / CX', 'Research & Insights', 'Marketing', 'Product / Digital',
  'Operations / Service', 'Sales', 'Enterprise / Cross-functional',
]

// ── Sections ────────────────────────────────────────────────────────────────

export const sections = [
  { key: 'Strategy', label: 'Strategy & Leadership', accent: '#91C46B' },
  { key: 'Insight', label: 'Insight & Understanding', accent: '#596AE0' },
  { key: 'Design', label: 'Design & Delivery', accent: '#F0974E' },
  { key: 'Culture', label: 'Culture & Accountability', accent: '#2DD4BF' },
]

export const sectionMeta = Object.fromEntries(sections.map(s => [s.key, s]))

// ── Question bank (spec §4–5, verbatim) ─────────────────────────────────────
// roles: 'all' = shared by both tracks (one per dimension, used for
// perception-gap analysis); otherwise the track that receives the question.
// Order within a section is the order respondents see.

const opt = (...labels) => labels.map((label, i) => ({ score: i + 1, label }))

export const questionBank = [
  // Strategy & Leadership
  {
    id: 'Q1', section: 'Strategy', title: 'CX Strategy', roles: ['all'],
    context: 'This is where most organizations discover their first gap. A written strategy is different from a stated commitment to customers.',
    question: 'Has your organization produced a written CX strategy, approved by leadership and actively in use to guide investment and prioritization decisions?',
    options: opt(
      'No. There is no formal CX strategy.',
      "There's a shared belief that experience matters, but nothing is written down or approved.",
      "A draft is in progress. It hasn't been approved or acted on yet.",
      "Yes. Leadership has approved it and it's guiding our priorities.",
      'Yes, board-endorsed, tied to financial planning, and reviewed at least annually.',
    ),
  },
  {
    id: 'Q2E', section: 'Strategy', title: 'Executive Accountability', roles: ['exec'],
    context: "The constraint we see most often: customer experience is everyone's priority and no one's job.",
    question: 'Is there a named senior executive who is accountable for customer experience, not just interested in it but measured on it?',
    options: opt(
      'No. Accountability is unclear or distributed.',
      'Marketing or service leadership handles it informally alongside other responsibilities.',
      'A senior leader has a partial CX mandate.',
      'A dedicated CX executive has a clear charter and budget ownership.',
      'CEO-led, with a CX executive and a cross-functional governance body that has authority to act.',
    ),
  },
  {
    id: 'Q3E', section: 'Strategy', title: 'CX Investment', roles: ['exec'],
    context: 'Budget tells you what an organization actually believes about its customers, not what it says.',
    question: 'Does your organization have dedicated funding for experience improvement, separate from marketing campaigns and routine operations?',
    options: opt(
      'No dedicated CX funding.',
      'CX work is funded opportunistically from marketing or operations budgets.',
      "An informal fund exists, but there's no formal tracking.",
      'A formal CX budget line exists with a clear owner and reporting.',
      'Multi-year experience investment portfolio with defined ROI targets and board-level visibility.',
    ),
  },
  {
    id: 'Q2P', section: 'Strategy', title: 'Improvement Prioritization', roles: ['practitioner'],
    context: 'Without a selection process, improvement resources go to whoever escalates loudest, not the friction that costs the most.',
    question: 'Does your organization have a defined process for identifying, prioritizing, and selecting which experience improvements to pursue?',
    options: opt(
      'No process. Improvements are chosen reactively based on complaints or executive requests.',
      'Informal criteria exist but nothing is documented or applied consistently.',
      'A framework exists but is used inconsistently across teams.',
      'A formal process weighing customer and business impact guides most decisions.',
      'A governed improvement portfolio with impact scoring, value tracking, and regular leadership review.',
    ),
  },
  {
    id: 'Q3P', section: 'Strategy', title: 'Business Alignment', roles: ['practitioner'],
    context: 'Tie experience work to a number and an owner and it becomes a strategy.',
    question: 'Are your CX initiatives tied to specific business outcomes, such as retention, conversion, or cost to serve, not just satisfaction scores?',
    options: opt(
      'No. CX is treated as a goodwill effort with no business case.',
      "There's a loose connection to business goals, but nothing formal.",
      'Some initiatives have business targets attached.',
      'Most CX investments have measurable business KPIs defined at the start.',
      'CX outcomes are embedded in executive scorecards and reported to the board.',
    ),
  },
  // Insight & Understanding
  {
    id: 'Q4', section: 'Insight', title: 'Voice of the Customer', roles: ['all'],
    context: 'Most organizations have more feedback than they can use and less understanding than they need.',
    question: 'Does your organization systematically listen to customers across channels: surveys, interviews, support contacts, reviews, and behavioral data?',
    options: opt(
      'No systematic listening. We hear about problems through complaints and anecdotes.',
      'An annual or occasional survey runs. Little else is captured deliberately.',
      'Multiple feedback channels exist, but each is owned and reviewed separately.',
      'A managed VoC program combines survey, support, and behavioral signals with regular review.',
      'An always-on listening system integrates solicited and unsolicited signals, with insights routed to owners automatically.',
    ),
  },
  {
    id: 'Q5E', section: 'Insight', title: 'Insight to Decision', roles: ['exec'],
    context: "The test of a listening program isn't the data it collects. It's the decisions it changes.",
    question: 'Does customer insight reach leadership decisions, pricing, product, policy, and investment, while those decisions are still open?',
    options: opt(
      'No. Decisions are made on operational and financial data alone.',
      'Insight is presented occasionally, usually after decisions are made.',
      'Leadership reviews CX data regularly, but it rarely changes a decision.',
      'Customer insight is a standing input to major decisions, with clear examples of changed outcomes.',
      'No major customer-facing decision proceeds without customer evidence, and leaders ask for it unprompted.',
    ),
  },
  {
    id: 'Q6E', section: 'Insight', title: 'Customer Data Integration', roles: ['exec'],
    context: 'A connected view of the customer is the difference between measuring experience and managing it.',
    question: 'Can your organization connect feedback data to operational and financial data, seeing what customers said alongside what they did and what it cost?',
    options: opt(
      'No. Feedback, operational, and financial data live in separate systems with separate owners.',
      'Connecting them requires manual, one-off analysis.',
      "Some journeys have linked data. Most don't.",
      'An integrated customer view exists for major journeys, and analysis routinely combines the sources.',
      'A unified customer data foundation links experience, behavior, and value, and feeds both analytics and frontline tools.',
    ),
  },
  {
    id: 'Q5P', section: 'Insight', title: 'Research Depth', roles: ['practitioner'],
    context: 'Surveys tell you what happened. Research tells you why. Most organizations are overweight on the first and starved of the second.',
    question: 'Does your organization conduct qualitative research, interviews, usability testing, contextual observation, beyond surveys and scores?',
    options: opt(
      'No qualitative research happens.',
      'Occasional ad hoc interviews or tests, usually vendor-run and rarely revisited.',
      'Qualitative research happens for major projects, but practice is inconsistent and depends on the team.',
      'A skilled research practice runs mixed-methods work with defined standards and a regular cadence.',
      'Research is a managed discipline: trained researchers, method standards, ethics protocols, and demand from across the business.',
    ),
  },
  {
    id: 'Q6P', section: 'Insight', title: 'Insight Infrastructure', roles: ['practitioner'],
    context: 'Research that lives in a slide deck dies in a slide deck. Infrastructure is what makes insight cumulative.',
    question: 'Do teams have infrastructure for research and insight, a findings repository, participant access, self-service tools, so knowledge compounds instead of evaporating?',
    options: opt(
      'No infrastructure. Findings live in decks and inboxes and are lost within months.',
      "Some teams keep their own files. There's no shared system.",
      'A repository or dashboard exists, but adoption is low and content goes stale.',
      'A maintained insight repository and research ops practices support most teams.',
      'Enterprise-grade insight infrastructure: searchable repository, governed participant panels, self-service dashboards, and reuse as the norm.',
    ),
  },
  // Design & Delivery
  {
    id: 'Q7', section: 'Design', title: 'Journey Management', roles: ['all'],
    context: 'A journey map on a wall is documentation. A journey with an owner, metrics, and a backlog is management.',
    question: 'Are your key customer journeys mapped, current, and actively managed, with owners and improvement backlogs, not just documented once?',
    options: opt(
      'No journeys are mapped.',
      'Some journeys were mapped for past projects. The maps are out of date.',
      'Key journeys are mapped and referenced, but no one owns them.',
      'Priority journeys have owners, current maps, and active improvement backlogs.',
      'Journey management is the operating model: owners, metrics, funded backlogs, and regular performance reviews for every priority journey.',
    ),
  },
  {
    id: 'Q8E', section: 'Design', title: 'End-to-End Ownership', roles: ['exec'],
    context: 'Customers experience the whole journey. Organizations manage the silos. That mismatch is where most experience failures live.',
    question: "Is there accountability for end-to-end customer journeys that crosses departmental lines, with authority to change what happens in other teams' territory?",
    options: opt(
      'No. Each department manages its own touchpoints independently.',
      'Cross-functional coordination happens informally when problems get big enough.',
      'Journey teams or councils exist but have influence, not authority.',
      'Named journey owners have a mandate, and escalation paths, that cross functions.',
      'The operating model is organized around journeys, with funding, targets, and authority aligned to them.',
    ),
  },
  {
    id: 'Q9E', section: 'Design', title: 'Experience in Change Decisions', roles: ['exec'],
    context: 'The cheapest time to fix an experience problem is before it ships. Most organizations pay retail.',
    question: 'When your organization makes major changes, new products, policies, pricing, or systems, is customer experience input built into the decision before launch?',
    options: opt(
      'No. Changes launch and we handle the customer fallout afterward.',
      'CX teams hear about changes late, usually to help with communication.',
      'Experience input is sought for some changes, depending on the leader.',
      'An experience review is a standard step for major customer-facing changes.',
      'Experience impact assessment is a governed gate, with authority to delay or modify launches.',
    ),
  },
  {
    id: 'Q8P', section: 'Design', title: 'Design Practice', roles: ['practitioner'],
    context: 'Testing with customers before launch is cheaper than learning from them after. Every time.',
    question: 'Do teams use design methods, prototyping, usability testing, iterative refinement, before customer-facing changes launch?',
    options: opt(
      'No. Changes are built and launched. Customers find the problems.',
      'Design methods are used occasionally, when a project leader insists.',
      'Prototyping and testing happen for major digital projects but not consistently.',
      'Design practice is standard for customer-facing work, with testing before launch the norm.',
      'Human-centered design is how the organization builds: embedded designers, standard methods, and no major launch without customer evidence.',
    ),
  },
  {
    id: 'Q9P', section: 'Design', title: 'Closed Loop', roles: ['practitioner'],
    context: "Feedback that doesn't trigger action trains customers to stop giving it.",
    question: 'When feedback identifies a problem, does a defined process turn it into action, both resolving the individual case and addressing the root cause?',
    options: opt(
      'No. Feedback is collected but nothing systematic happens with it.',
      "Individual complaints get handled. Patterns aren't analyzed or acted on.",
      'An inner loop exists for following up with individual customers, but structural fixes are rare.',
      'Both loops run: individual follow-up plus a process that routes systemic issues to owners.',
      'Closed-loop is fully operational: tracked resolution rates, funded root-cause programs, and customers told what changed because of their feedback.',
    ),
  },
  // Culture & Accountability
  {
    id: 'Q10', section: 'Culture', title: 'CX Measurement', roles: ['all'],
    context: 'A score you report is a thermometer. A measurement system that assigns ownership is a steering wheel.',
    question: 'Does your organization have a CX measurement framework that connects experience metrics to owners and actions, not just a score that gets reported?',
    options: opt(
      'No consistent CX metrics exist.',
      'A survey score is collected and reported. Little happens because of it.',
      'Metrics exist for major touchpoints, but accountability for moving them is unclear.',
      'A metrics framework links journey and touchpoint measures to named owners with targets.',
      'Experience metrics are tiered from board to frontline, linked to financial outcomes, with owners, targets, and consequences.',
    ),
  },
  {
    id: 'Q11E', section: 'Culture', title: 'Executive Scorecards', roles: ['exec'],
    context: 'What leadership is measured on is what the organization becomes.',
    question: 'Do customer experience metrics appear in executive scorecards and performance goals, with real consequences attached?',
    options: opt(
      'No. Executive performance is measured on financial and operational results only.',
      'CX metrics are visible to leadership but carry no weight.',
      'Some leaders include CX measures in their goals voluntarily.',
      'CX metrics are standard in executive scorecards across customer-facing functions.',
      'Experience outcomes affect compensation and advancement at the executive level, enterprise-wide.',
    ),
  },
  {
    id: 'Q12E', section: 'Culture', title: 'Business Value', roles: ['exec'],
    context: 'Stage is a proxy. Value is what actually matters.',
    question: 'Has CX work contributed measurable, attributable improvements to retention, revenue, cost to serve, or operational efficiency?',
    options: opt(
      'No measurable business impact from CX work to date.',
      'Marginal or anecdotal improvements. Nothing quantified.',
      'Moderate improvements have been documented in select areas.',
      'Significant attributable business value has been delivered across multiple journeys or functions.',
      'Experience is a primary driver of growth and competitive advantage, with the financial linkage modeled and tracked.',
    ),
  },
  {
    id: 'Q11P', section: 'Culture', title: 'Employee Enablement', roles: ['practitioner'],
    context: "Frontline employees can't deliver an experience the organization hasn't equipped them to deliver.",
    question: 'Are employees trained, equipped, and authorized to act on customer needs, including resolving routine issues without escalating?',
    options: opt(
      'No. Staff follow scripts and escalate anything unusual.',
      'Training covers process compliance, not customer outcomes.',
      'Some teams have latitude to resolve issues; policy and tooling limit most.',
      'Frontline staff have training, customer context, and defined authority to resolve most issues.',
      'Employees at every level are equipped and trusted to act, with employee experience managed as a driver of customer experience.',
    ),
  },
  {
    id: 'Q12P', section: 'Culture', title: 'Insight in the Routine', roles: ['practitioner'],
    context: "Culture isn't what the values poster says. It's what teams do on an ordinary Tuesday.",
    question: "Is customer insight part of teams' regular working rhythms, planning, reviews, retrospectives, not something encountered only in special presentations?",
    options: opt(
      'Most teams never see customer insight in their normal work.',
      'Insight appears in occasional all-hands or annual planning.',
      "Some teams review customer data in their routines; most don't.",
      'Customer insight is a standing element in planning and review cycles for most customer-facing teams.',
      "Customer evidence opens leadership meetings, shapes sprint planning, and every team can name the customer problems it's working on.",
    ),
  },
]

// ── Question selection (spec §3) ────────────────────────────────────────────
// Each track gets its role-tagged questions plus the shared ones, capped at 3
// per dimension, presented dimension by dimension.

const sectionOrder = ['Strategy', 'Insight', 'Design', 'Culture']

export function getCxQuestions(role) {
  const selected = []
  for (const sectionKey of sectionOrder) {
    const eligible = questionBank.filter(
      q => q.section === sectionKey && (q.roles.includes('all') || q.roles.includes(role)),
    )
    selected.push(...eligible.slice(0, 3))
  }
  return selected
}

// ── Stages (spec §2) ────────────────────────────────────────────────────────
// Overall 1–5 average → five-stage ladder: below 1.6 Reactive; 1.6–2.59
// Listening; 2.6–3.59 Managing; 3.6–4.59 Anticipating; 4.6+ Embedded.

const STAGES = [
  { max: 1.6, key: 'reactive' },
  { max: 2.6, key: 'listening' },
  { max: 3.6, key: 'managing' },
  { max: 4.6, key: 'anticipating' },
  { max: Infinity, key: 'embedded' },
]

export const stages = {
  reactive: {
    name: 'Reactive', index: 1, short: 'Complaints drive change',
    tagline: 'No systematic listening. Experience improves when something breaks.',
    description: "You're at the starting point. The organization hears about experience through complaints, escalations, and anecdotes. No systematic listening, no named owner, no shared definition of what good looks like. The work here is simple but not easy: agree that experience is a managed discipline, not a byproduct, and put three specific outcomes with owners behind it.",
  },
  listening: {
    name: 'Listening', index: 2, short: 'Feedback flows, action lags',
    tagline: 'Feedback is flowing. Acting on it is the ceiling.',
    description: "Feedback is coming in. Surveys run, complaints get reviewed, data accumulates. What you don't have is the machinery that turns any of it into changed decisions. The organization knows more than it acts on, and the gap between collecting insight and using it is what keeps organizations stuck here longer than expected.",
  },
  managing: {
    name: 'Managing', index: 3, short: 'CX works in pockets',
    tagline: 'CX works in pockets. Spreading it is the stall point.',
    description: "CX is working in parts of your organization. Journeys are mapped, research informs some decisions, and specific teams own specific improvements. The evidence is real. The problem is it hasn't spread, and getting from here to broad practice is less about methods and more about the organization: who prioritizes, who funds, and who is accountable when the score drops.",
  },
  anticipating: {
    name: 'Anticipating', index: 4, short: 'Signals predict friction',
    tagline: 'Signals predict friction. Impact drives prioritization.',
    description: 'The organization has moved from responding to signals to predicting them. Insight and operational data combine to surface friction before customers report it, and experience metrics sit alongside financial metrics in leadership reviews. The risk now is that momentum outpaces governance: keeping prioritization honest and accountability real as the program scales.',
  },
  embedded: {
    name: 'Embedded', index: 5, short: 'Customer-first by default',
    tagline: 'Customer-first by default. Compounding the advantage.',
    description: "You've done the hard work. Customer understanding is built into planning, design, and governance by default, and the loop from signal to action to measured outcome runs continuously. The goal now is to stop treating CX as a program and start treating it as how the organization operates. That shift is where the lasting advantage lives.",
  },
}

export const TOTAL_STAGES = 5

/** Ladder rows for the staircase visuals: [{ index, key, name, tagline }] */
export const STAGE_LADDER = Object.entries(stages)
  .map(([key, s]) => ({ index: s.index, key, name: s.name, tagline: s.short }))
  .sort((a, b) => a.index - b.index)

function mean(nums) {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

/**
 * answers: { [questionId]: score 1..5 }
 * questions: the question list the respondent actually saw (from getCxQuestions)
 * Same return shape as aiAssessment.scoreAssessment.
 */
export function scoreCx(answers, questions) {
  const sectionAverages = {}
  for (const sectionKey of sectionOrder) {
    const scores = questions
      .filter(q => q.section === sectionKey)
      .map(q => answers[q.id])
      .filter(s => typeof s === 'number')
    sectionAverages[sectionKey] = mean(scores)
  }
  const all = questions.map(q => answers[q.id]).filter(s => typeof s === 'number')
  const overall = mean(all)
  const stageDef = STAGES.find(s => overall < s.max) || STAGES[STAGES.length - 1]
  return { sectionAverages, overall, stage: stages[stageDef.key], stageKey: stageDef.key }
}

// ── Findings engine (spec §6) ───────────────────────────────────────────────

const STRENGTH_MSG = {
  Strategy: { title: 'Executive commitment is real', body: "Leadership has made experience a stated, funded priority with clear direction. That's the starting condition for everything else, and a lot of organizations still don't have it." },
  Insight: { title: 'Customer understanding is ahead of the curve', body: "Listening systems and research practice give you evidence most organizations at your stage don't have. That removes the most common excuse for customer-blind decisions." },
  Design: { title: 'Experience improvement is operational', body: "Journeys are managed, design methods are in use, and feedback triggers action. That's execution capability, not just intent." },
  Culture: { title: 'Accountability structures are in place', body: "Metrics connect to owners and employees are equipped to act. That's the foundation that makes improvement stick instead of depending on hero effort." },
}

const GAP_VLOW = {
  Strategy: { title: 'No real CX strategy or ownership', body: 'Experience decisions are being made without a framework. Resources go to whoever escalates loudest, not where customer and business value actually is.' },
  Insight: { title: 'The organization is flying blind on customers', body: 'No systematic listening and no research practice. What leadership knows about customers is anecdote and assumption, and every decision inherits that.' },
  Design: { title: 'Experience is unmanaged', body: 'No journeys mapped, no design practice, no closed loop. Customers find the problems after launch, and the organization pays retail to fix them.' },
  Culture: { title: 'Nobody is accountable for experience', body: 'No metrics framework, no ownership, no enablement. Experience is what happens by accident, and the frontline has neither the tools nor the authority to change it.' },
}

const GAP_MID = {
  Strategy: { title: "CX strategy exists but isn't driving decisions", body: "There's a document. Priorities still shift and ownership is unclear. Without accountability and funding attached, a strategy is just a starting point." },
  Insight: { title: 'Feedback is collected but not converted', body: 'Data comes in through surveys and support channels, then pools in silos. The gap between what the organization knows and what it acts on is where value leaks.' },
  Design: { title: 'Improvement is project-based, not systematic', body: "Journeys were mapped once and fixes happen when escalations force them. Without owners and a repeatable process, gains don't stick and don't spread." },
  Culture: { title: 'Measurement without consequence', body: 'Scores are reported and nothing changes because of them. Until metrics connect to owners, targets, and decisions, the culture treats CX as reporting, not responsibility.' },
}

const FALLBACK_FINDING = {
  title: 'Solid across the board',
  body: 'Your scores are consistent across all four dimensions. The focus now is on moving from good to excellent in the areas that will have the most compounding effect.',
}

export function buildCxFindings(sectionAverages) {
  const entries = sectionOrder.map(key => ({ key, score: sectionAverages[key] || 0 }))

  const strengths = entries
    .filter(e => e.score >= 3.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(e => ({ section: key2label(e.key), ...STRENGTH_MSG[e.key] }))

  const gaps = entries
    .filter(e => e.score > 0 && e.score < 3.0)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(e => ({ section: key2label(e.key), ...(e.score < 2.0 ? GAP_VLOW[e.key] : GAP_MID[e.key]) }))

  return { strengths, gaps, fallback: !strengths.length && !gaps.length ? FALLBACK_FINDING : null }
}

// ── Next step, keyed to the weakest dimension (spec §6) ─────────────────────

const NEXT_STEP = {
  Strategy: { chat: 'Align our leadership on three CX outcomes', text: "Get the right people aligned before the next investment decision. A half-day session to define three specific experience outcomes, with owners and timelines attached, removes more friction than months of planning documents. That's the starting point." },
  Insight: { chat: 'Run a 60-day CX listening audit', text: 'Run a 60-day listening audit before the next initiative. Map every channel where customer signal arrives, who sees it, and what it changed in the last year. The output is an insight inventory that shows exactly where understanding leaks, and what to build first.' },
  Design: { chat: 'Help us manage one priority customer journey end to end', text: 'Pick one high-volume journey and manage it properly: a named owner, a current map, a prioritized backlog, and a closed feedback loop. One well-run journey builds the playbook, and the internal case, for everything after it.' },
  Culture: { chat: 'Connect our CX metrics to owners and targets', text: "Connect one experience metric to one owner with one target before the next reporting cycle. Then diagnose why scores haven't driven action. It's usually one of three things: no ownership, no consequence, or no frontline authority. Fix the one that applies and the rest accelerates." },
}

export function weakestSection(sectionAverages = {}) {
  let weakest = sectionOrder[0]
  let min = Infinity
  for (const key of sectionOrder) {
    const s = sectionAverages[key] || 0
    if (s < min) { min = s; weakest = key }
  }
  return { key: weakest, score: min === Infinity ? 0 : min }
}

export function recommendCxNextStep(sectionAverages) {
  const { key } = weakestSection(sectionAverages)
  return { section: key2label(key), key, ...NEXT_STEP[key] }
}

// ── Competitive positioning (spec §3, composite indices) ────────────────────
// Strategic Maturity = mean(Strategy, Insight); Execution Readiness =
// mean(Design, Culture); both /100. The dot's diagonal (x+y)/2 equals
// overall/5, so it always lands in the band matching the computed stage.
// Bands: Stage 1-2 Early Movers, Stage 3 Progressing, Stage 4-5 CX Leaders.

export function cxPositioningRead({ sectionAverages = {}, stageIndex } = {}) {
  const x = ((sectionAverages.Design || 0) + (sectionAverages.Culture || 0)) / 2 / 5
  const y = ((sectionAverages.Strategy || 0) + (sectionAverages.Insight || 0)) / 2 / 5
  const sIdx = stageIndex ?? (((x + y) / 2 < 0.52) ? 2 : ((x + y) / 2 < 0.72) ? 3 : 4)
  const group = sIdx <= 2 ? 'early' : sIdx === 3 ? 'progress' : 'leaders'
  const weakestLabel = key2label(weakestSection(sectionAverages).key)
  const bandText = group === 'early'
    ? "You're in the Early Movers group (Stage 1-2), where most organizations begin. The priority is a written CX strategy, a named owner, and systematic listening before scaling improvement work."
    : group === 'progress'
      ? `You're in the Progressing group (Stage 3). The move toward CX Leadership now depends on strengthening ${weakestLabel} and scaling what works beyond the pockets where it lives.`
      : "You're in or near the CX Leaders group (Stage 4-5). The focus shifts to compounding the advantage: predictive signals, experience metrics in executive goals, and governance that keeps prioritization honest as the program scales."
  const tilt = y - x > 0.15
    ? ' Strategy is running well ahead of execution, which means the constraint is organizational, not conceptual.'
    : x - y > 0.15
      ? ' Execution is running ahead of strategy: anchor the improvement work in a written CX strategy and named outcomes so effort goes where the value is.'
      : ' Strategy and execution are closely balanced.'
  return {
    x, y,
    execPct: Math.round(x * 100),
    stratPct: Math.round(y * 100),
    group,
    groupLabel: group === 'early' ? 'Early Movers' : group === 'progress' ? 'Progressing' : 'CX Leaders',
    stageRange: group === 'early' ? 'Stage 1-2' : group === 'progress' ? 'Stage 3' : 'Stage 4-5',
    meansText: bandText + tilt,
  }
}

/** Cluster layout for GartnerPositioningView, centered on each band's score range. */
export const CX_POSITION_CLUSTERS = [
  { id: 'early', label: 'Early Movers', sublabel: 'Stage 1-2', cx: 0.30, cy: 0.30, rd: 0.16, color: '#64748B' },
  { id: 'progress', label: 'Progressing', sublabel: 'Stage 3', cx: 0.62, cy: 0.62, rd: 0.13, color: '#2DD4BF' },
  { id: 'leaders', label: 'CX Leaders', sublabel: 'Stage 4-5', cx: 0.86, cy: 0.86, rd: 0.12, color: null },
]

function key2label(key) {
  return sectionMeta[key]?.label || key
}

// ── Sample report (spec §7) ─────────────────────────────────────────────────
// Meridian Outfitters, fictional. Used by /assessment/cx?view=sample. With three
// whole-number answers per dimension the averages land at 3.3 / 3.7 / 2.7 / 1.7
// (spec: 3.4 / 3.7 / 2.9 / 1.8), which keeps the same stage (Managing), the same
// bands per dimension, and the same weakest dimension (Culture & Accountability).

export const sampleProfile = {
  role: 'exec', fullName: 'Morgan Ellis', workEmail: 'mellis@meridian-outfitters.com',
  companyName: 'Meridian Outfitters', sector: 'Retail & Consumer', orgSize: '2,000-10,000',
  department: 'Customer Experience / CX',
}

export const sampleAnswers = {
  Q1: 4, Q2E: 3, Q3E: 3, // Strategy 3.3
  Q4: 4, Q5E: 4, Q6E: 3, // Insight 3.7
  Q7: 3, Q8E: 3, Q9E: 2, // Design 2.7
  Q10: 2, Q11E: 2, Q12E: 1, // Culture 1.7
}
