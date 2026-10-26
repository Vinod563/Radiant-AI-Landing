/**
 * CX Maturity Assessment: editorial copy for the results page, the emailed PDF,
 * and the email-safe HTML, so their wording can never drift. CX counterpart of
 * reportEditorial.js + WhatAILeadersDo's LEADER_CONTENT.
 *
 * Source: the executive briefing sample (Meridian Outfitters). The Stage 3 and
 * Culture & Accountability copy is verbatim from that sample; the copy for the
 * other stages and dimensions is drafted in the same voice from the stage
 * descriptions and question anchors in radiant-cx-maturity-assessment.md, and
 * is marked DRAFT below for content review.
 */

import { sectionMeta } from './cxAssessment.js'

const label = (key) => sectionMeta[key]?.label || key
const lc = (s = '') => s.charAt(0).toLowerCase() + s.slice(1)

// ── Radiant's Read, keyed by stage index (1–5) ──────────────────────────────

export const cxRadiantRead = {
  // DRAFT
  1: "Reactive is a starting point, not a verdict. Most organizations here already care about customers; what's missing is a system for hearing them and someone accountable for acting. The organizations that move fastest don't launch a transformation. They name an owner, pick three outcomes, and start listening deliberately on the journeys most customers touch. Structure first, scale second.",
  // DRAFT
  2: "Listening is where many organizations stay longest, because collecting feedback feels like progress. On its own, it isn't. Customers who give feedback and see nothing change stop giving it. The unlock here is the machinery between insight and action: journey owners, a route from feedback to backlog, and leaders who ask for customer evidence before decisions close.",
  // Verbatim, executive briefing sample
  3: "Managing is the pockets-of-proof phase. The organization has evidence that customer-centered work pays, but the evidence lives in a few teams while the rest operate as they always have. What separates the organizations that advance from those that stall is rarely method. It's the operating model: who prioritizes, who funds, who answers when the score drops. The next unlock is converting managed pockets into managed practice, and that runs entirely through accountability.",
  // DRAFT
  4: 'Anticipating is where CX becomes an investment discipline. Signals predict friction, and improvement is prioritized by modeled impact rather than escalation volume. The risk is that momentum outpaces governance: more signals, more initiatives, and less clarity about who owns the result. The organizations that reach Embedded keep accountability as rigorous as their analytics.',
  // DRAFT
  5: 'Embedded organizations no longer run CX as a program; it is how they operate. The risk at this stage is complacency: models that drift, a loop that slows, and governance that becomes ceremony. Durable advantage comes from keeping the financial linkage current and continuing to close the loop with customers, visibly.',
}

// ── What CX Leaders Do, keyed by the respondent's CURRENT stage (1–5) ───────
// Each entry describes what organizations at the NEXT stage do. `benchmark` is
// an optional non-numeric callout; only Stage 3 has sourced copy.

export const CX_LEADER_CONTENT = {
  // DRAFT
  1: {
    heading: 'What Listening organizations do to get out of reactive mode',
    context: 'Reactive organizations learn about experience when something breaks. Listening organizations decide to hear customers on purpose: they put a basic listening system in place, and a named owner behind it, before trying to fix everything at once.',
    actions: [
      { title: 'Name an owner and three experience outcomes', body: "A named leader, measured on a short list of specific experience outcomes, turns 'customers matter' into a managed priority with someone answerable for it." },
      { title: 'Stand up systematic listening on the highest-volume journeys', body: 'A regular survey plus a structured review of complaints and support contacts on the journeys most customers touch. Deliberate signal replaces anecdote.' },
      { title: 'Agree a shared definition of good', body: 'One or two experience measures everyone reports the same way, so teams argue about what to fix rather than whose numbers are right.' },
      { title: 'Review what you hear on a fixed cadence', body: 'A standing review where leaders see the feedback itself, not a filtered summary. Listening only counts when someone senior is in the room.' },
    ],
    chatQuery: 'Help us move from Reactive to Listening: systematic customer listening with a named owner',
  },
  // DRAFT
  2: {
    heading: 'What Managing organizations do to turn feedback into change',
    context: 'Listening organizations collect more than they use. Managing organizations build the machinery that converts insight into decisions: owners for journeys, a route from feedback to backlog, and research that explains why, not just what.',
    actions: [
      { title: 'Give priority journeys owners and backlogs', body: 'Map the journeys that matter most, assign an owner to each, and keep a prioritized improvement backlog. A journey with an owner gets managed; a map on a wall does not.' },
      { title: 'Route feedback to the people who can act on it', body: 'Systemic issues go to named owners with a deadline, not to a shared inbox. Individual follow-up and root-cause fixes are both tracked.' },
      { title: 'Add research that explains the why', body: 'Interviews and usability testing alongside the survey program, so improvement work starts from causes rather than scores.' },
      { title: "Bring customer evidence into decisions while they're still open", body: 'Insight reaches pricing, product, and policy discussions before the decision is made, not as a post-launch readout.' },
    ],
    chatQuery: 'Help us move from Listening to Managing: turning customer feedback into changed decisions',
  },
  // Verbatim, executive briefing sample
  3: {
    heading: 'What Anticipating organizations do to get ahead of the need',
    context: 'Managing responds well. Anticipating predicts: insight and operational data combine to surface friction before customers report it, and improvement is prioritized by modeled impact rather than escalation volume.',
    benchmark: {
      label: 'Illustrative benchmark',
      body: 'Organizations that intervene on predicted friction, before the complaint forms, consistently retain more of the revenue at risk than organizations that react to complaints. The mechanism is simple: by the time a customer reports a problem, a share of their peers with the same problem have already left silently.',
    },
    actions: [
      { title: 'Let signals trigger action before complaints form', body: "Predicted churn opens proactive outreach; a forecast demand spike adjusts staffing; a detected friction pattern pauses the rollout that's causing it, before the contact-center queue proves the point." },
      { title: 'Prioritize by modeled impact, not escalation volume', body: 'Linked experience and operational data lets them size what each friction point costs, so the improvement portfolio is an investment argument, not a volume-of-complaints argument.' },
      { title: 'Put experience metrics in executive goals, with consequences', body: 'Experience outcomes sit in scorecards next to financial outcomes and carry the same weight. That single structural choice is what makes every other CX investment convert.' },
      { title: 'Close the loop with causes, and tell customers what changed', body: 'Root causes get funded fixes, resolution rates are tracked, and customers hear what changed because of their feedback, which is what keeps the signal flowing.' },
    ],
    chatQuery: 'Help us move from Managing to Anticipating: predicting customer friction before it happens',
  },
  // DRAFT
  4: {
    heading: 'What Embedded organizations do to make customer-first the default',
    context: 'Anticipating organizations predict friction well. Embedded organizations stop running CX as a program: customer evidence is built into planning, design, and governance by default, and the loop from signal to action to outcome runs continuously.',
    actions: [
      { title: 'Organize the operating model around journeys', body: 'Funding, targets, and authority align to end-to-end journeys rather than departments, so no experience failure falls between two org charts.' },
      { title: 'Make experience impact a governed gate', body: 'Major product, policy, and pricing changes pass an experience impact assessment with the authority to delay or modify a launch.' },
      { title: 'Tie experience outcomes to compensation and advancement', body: 'Experience metrics carry the same weight as financial ones in how leaders are paid and promoted, enterprise-wide.' },
      { title: 'Equip every employee to act', body: 'Teams have the context, tools, and authority to resolve customer issues, with employee experience managed as a driver of customer experience.' },
    ],
    chatQuery: 'Help us move from Anticipating to Embedded: customer-first as our operating model',
  },
  // DRAFT
  5: {
    heading: "You're Embedded: sustaining customer-first as the operating model",
    context: 'At Embedded, the work shifts from building capability to keeping it honest. The organizations that hold the lead treat experience as how the business operates, and protect the loop that keeps it that way.',
    actions: [
      { title: 'Keep the financial linkage modeled and current', body: 'Re-validate the link between experience, retention, and value as markets change, so experience investment stays an investment argument.' },
      { title: 'Protect prioritization from volume and politics', body: 'Keep improvement decisions anchored in modeled impact, with regular portfolio reviews that retire work that no longer pays.' },
      { title: 'Keep closing the loop with customers', body: "Tell customers what changed because of their feedback. It's what keeps the signal flowing as the program matures." },
      { title: 'Refresh insight infrastructure and skills', body: 'Maintain the research practice, repositories, and data foundation so knowledge keeps compounding rather than going stale.' },
    ],
    chatQuery: 'Help us sustain and extend an embedded, customer-first operating model',
  },
}

// ── Recommended sequence: three moves keyed to the weakest dimension ────────

const SEQUENCE = {
  // DRAFT
  Strategy: [
    { title: 'Align leadership on three experience outcomes with named owners', why: 'Without agreed outcomes and owners, experience decisions follow whoever escalates loudest.' },
    { title: 'Take a written CX strategy through leadership approval', why: 'A written, approved strategy is what turns a stated commitment to customers into a guide for investment and prioritization.' },
    { title: 'Establish a dedicated CX budget line with a clear owner', why: 'Funding separate from marketing and operations lets improvement work be planned rather than borrowed.' },
  ],
  // DRAFT
  Insight: [
    { title: 'Run a 60-day listening audit across every feedback channel', why: 'Signal arrives in many places and is reviewed in silos. An inventory shows exactly where understanding leaks.' },
    { title: 'Combine survey, support, and behavioral signals into one managed VoC program', why: 'One reviewed view of the customer replaces separate channels that each tell part of the story.' },
    { title: 'Route customer insight into decisions while they are still open', why: "The test of a listening program isn't the data it collects. It's the decisions it changes." },
  ],
  // DRAFT
  Design: [
    { title: 'Give one high-volume journey an owner, a current map, and a backlog', why: 'One well-run journey builds the playbook, and the internal case, for everything after it.' },
    { title: 'Close the feedback loop for both the individual case and the root cause', why: "Feedback that doesn't trigger action trains customers to stop giving it." },
    { title: 'Make an experience review a standard step before major launches', why: 'The cheapest time to fix an experience problem is before it ships.' },
  ],
  // Verbatim, executive briefing sample (lightly generalized: "monthly" dropped)
  Culture: [
    { title: 'Stand up an experience scorecard with named owners and targets', why: "Metrics are reported and appear in no one's goals. When satisfaction drops, no one owns the recovery." },
    { title: 'Expand frontline resolution authority, with guardrails', why: 'Without defined authority, the frontline escalates what it could resolve. Defined authority converts listening into resolution.' },
    { title: 'Fund a root-cause program for the longest-recurring issues', why: 'Closing the loop with causes, not just customers, is what converts feedback into retention instead of apology.' },
  ],
}

// ── 60-day sprint per weakest dimension ─────────────────────────────────────

export const CX_SIXTY_DAY_PLAN = {
  // DRAFT
  Strategy: {
    name: 'CX Strategy Sprint',
    rows: [
      ['Discovery', '1 to 2', 'Document current CX objectives, funded initiatives, decision rights, and who owns each one today.'],
      ['Assessment', '3 to 6', 'Assess each initiative against business outcomes, funding, and leadership alignment, and record where direction or ownership is unclear.'],
      ['Roadmap', '7 to 8', 'Approve three experience outcomes with named owners, a written CX strategy, and the budget line that funds it.'],
    ],
  },
  // DRAFT
  Insight: {
    name: 'CX Listening Audit',
    rows: [
      ['Discovery', '1 to 2', 'Map every channel where customer signal arrives, who sees it, and how often it is reviewed.'],
      ['Assessment', '3 to 6', 'Assess what each channel changed in the last year, where signal pools in silos, and where research is missing.'],
      ['Roadmap', '7 to 8', 'Deliver an insight inventory and a plan for a combined VoC program with owners and a review cadence.'],
    ],
  },
  // DRAFT
  Design: {
    name: 'Journey Management Sprint',
    rows: [
      ['Discovery', '1 to 2', 'Select one high-volume journey, name its owner, and gather current maps, metrics, and open issues.'],
      ['Assessment', '3 to 6', 'Map the journey as it runs today, prioritize friction by customer and business impact, and set up the feedback loop.'],
      ['Roadmap', '7 to 8', 'Deliver a prioritized backlog, a closed-loop process, and the playbook for the next journey.'],
    ],
  },
  // Verbatim, executive briefing sample
  Culture: {
    name: 'CX Accountability Sprint',
    rows: [
      ['Discovery', '1 to 2', 'Inventory current metrics, owners, decision rights, and frontline authority across priority journeys'],
      ['Assessment', '3 to 6', 'Score accountability, authority, and loop closure. Flag the highest-impact gaps and the three longest-recurring root causes.'],
      ['Roadmap', '7 to 8', 'Deliver the experience scorecard, frontline authority guardrails, and a go / no-go for the root-cause program'],
    ],
  },
}

/**
 * Build the recommended three-move sequence for the weakest dimension.
 * @returns {{ weakest: string, weakestLabel: string, steps: {title, why}[], sprint: {name, rows} }}
 */
export function cxSuggestedNextSteps({ sectionAverages = {} } = {}) {
  let weakest = 'Strategy'
  let min = Infinity
  for (const key of ['Strategy', 'Insight', 'Design', 'Culture']) {
    const s = sectionAverages[key] || 0
    if (s < min) { min = s; weakest = key }
  }
  return {
    weakest,
    weakestLabel: label(weakest),
    steps: SEQUENCE[weakest],
    sprint: CX_SIXTY_DAY_PLAN[weakest],
    email: 'hello@radiant.digital',
  }
}

// ── Score-shape sentences ───────────────────────────────────────────────────

/** One sentence on strategy vs execution balance, for the bottom line. */
export function cxTiltSentence(pos) {
  if (pos.y - pos.x > 0.15) return 'Insight and strategy are ahead of the structures needed to act on them.'
  if (pos.x - pos.y > 0.15) return 'Delivery and accountability are ahead of the strategy and insight that should direct them.'
  return 'Strategy and execution are developing at a similar pace.'
}

/** "Progress to Stage N runs through X": what that path depends on. */
export const CX_PATH_BODY = {
  // DRAFT
  Strategy: 'The path forward depends on agreed outcomes, named owners, and dedicated funding, not on more initiatives.',
  // DRAFT
  Insight: 'The path forward depends on systematic listening and insight that reaches decisions, not on more improvement projects.',
  // DRAFT
  Design: 'The path forward depends on owned journeys and a closed feedback loop, not on more research.',
  // Verbatim, executive briefing sample
  Culture: "The path forward depends on owners, targets, and frontline authority, not on more listening. The insight engine is built; the accountability engine isn't.",
}

// What progress should be validated against, per weakest dimension. DRAFT
const VALIDATION_BY_DIM = {
  Strategy: 'an approved written CX strategy, named owners for each outcome, a funded budget line, and measurable business outcomes',
  Insight: 'systematic listening across channels, research that explains the why, and customer evidence present in major decisions',
  Design: 'owned and current journeys, a closed feedback loop, and experience review before major launches',
  Culture: 'experience metrics with named owners and targets, frontline authority to resolve issues, and measurable business outcomes',
}

/** Stage-specific closing paragraph. Stage 5 has no next stage, so it sustains. */
export function cxConclusionClosing({ stageIndex = 1, lowKey = 'Strategy', lowScore = 0 } = {}) {
  if (stageIndex >= 5) {
    return `Stage 5 is the final stage on this ladder, so the work now is to sustain it: keep the financial linkage current, keep closing the loop with customers, and continue to raise your lowest-scoring dimension, ${label(lowKey)} at ${lowScore.toFixed(1)} out of 5.`
  }
  return `These actions provide a practical path toward Stage ${stageIndex + 1}. Progress should be validated through ${VALIDATION_BY_DIM[lowKey] || VALIDATION_BY_DIM.Strategy}.`
}

/** The single-line conclusion. */
export function cxInOneLine({ stageIndex, groupLabel, lowKey, firstStep }) {
  const band = groupLabel === 'CX Leaders' ? 'in or near the CX Leaders group' : `in the ${groupLabel} group`
  const verb = stageIndex >= 5 ? 'Sustaining this stage' : 'The next stage'
  return `You are a Stage ${stageIndex} organization ${band}. ${verb} is earned through ${label(lowKey)}, and the first move is to ${lc(firstStep || 'run a focused readiness review')}.`
}

// ── Methodology table rows (sample §07) ─────────────────────────────────────

export const CX_DIMENSION_DEFINITIONS = [
  ['Strategy & Leadership', 'Executive ownership, stated direction, funding, and business alignment behind the CX agenda'],
  ['Insight & Understanding', 'Listening systems, research practice, and the data integration that turns signal into evidence'],
  ['Design & Delivery', 'Journey management, design practice, and the closed loop that turns evidence into change'],
  ['Culture & Accountability', 'Measurement with owners, employee enablement, and the routines that make customer focus ordinary'],
]
