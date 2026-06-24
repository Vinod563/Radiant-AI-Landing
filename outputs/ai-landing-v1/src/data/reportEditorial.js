/**
 * Shared editorial copy for the assessment report — the single source of truth
 * used by BOTH the on-screen "view online" HTML report (HTMLReportViewer.jsx)
 * and the emailed PDF (generateReportPdf.js), so their wording can never drift.
 */

// AI — "Radiant's Read", keyed by autonomy stage index (1–6)
export const aiRadiantRead = {
  1: "At Zero Autonomy, AI is helping people work but isn't making any decisions — and that's the right place to start. The organizations that climb fastest from here don't rush to automate; they get the foundations right first. Clean, structured data and standardized processes are what make every later stage of autonomy possible. The biggest risk now is delegating decisions before the inputs underneath them are trustworthy.",
  2: "Guided Autonomy is where most enterprises live: AI recommends in real time, but a human still approves every action. The value is already real — faster, better-informed decisions — but the ceiling is trust. The pattern we see is leaders waiting for proof before letting AI act on its own. That proof comes from picking a few low-risk, high-volume decisions and measuring what happens when AI handles them end to end.",
  3: "At Insight Autonomy, AI stops waiting to be asked — it surfaces trends, risks, and anomalies on its own, and your people consume that intelligence instead of building reports. That's a milestone most organizations never reach. The challenge now is no longer generating insight; it's connecting it to action. The unlock is wiring AI-generated intelligence directly into the workflows where decisions actually get made.",
  4: "Operational Autonomy is the governance-as-advantage phase. AI insight now drives cross-functional workflows automatically, and humans supervise the exceptions rather than the routine. The organizations that do this well don't just move faster — they design the checkpoints that keep speed and oversight in balance. The next unlock is shifting from reacting to events to anticipating them before they happen.",
  5: "At Proactive Autonomy, AI predicts and prescribes before your team sees the need, and people move up to strategy and governance. This is where the advantage compounds — but only for organizations whose governance is mature enough to trust prediction with action. The work here is building the guardrails and feedback loops that let AI initiate, not just recommend, with confidence.",
  6: "Full Autonomy is a self-governing system: AI executes multi-step work, learns from outcomes, and improves without manual retraining, while humans define guardrails and approve high-risk exceptions. The conversation shifts from 'how do we deploy AI' to 'how do we govern a system that runs itself.' Durable advantage at this stage comes from proprietary models, learning loops competitors can't replicate, and governance rigorous enough to keep an autonomous system accountable.",
}

// AI — CTA copy (next stage CTA)
export function aiCta(stageIndex) {
  return {
    title: `Ready to move to Stage ${Math.min(stageIndex + 1, 6)}?`,
    body: 'Radiant has helped enterprises across 14+ industries move through every stage of AI maturity. A 30-minute conversation is enough to map exactly where to start.',
    action: 'Schedule 30 minutes with Radiant',
    email: 'hello@radiant.digital',
  }
}

// CX — "Why this matters at the {level} level", keyed by overall level key
export function cxWhyThisMatters(overallKey) {
  if (overallKey === 'Foundational')
    return 'At this stage, the biggest unlock is making customer insight a repeatable process rather than a one-time project. Experience AI gives you the framework to turn raw customer signals into structured findings your organization can act on — without a dedicated research team.'
  if (overallKey === 'Developing')
    return 'You have the foundation. The gap to Advanced is closing the loop between customer data and strategic decisions. Experience AI helps you build that loop: consistent measurement, insight workflows, and a governance model that makes CX data actionable for leaders, not just analysts.'
  return 'At Advanced maturity, the focus shifts from building CX capability to compounding it. Experience AI enables continuous, real-time customer intelligence — moving you from measuring CX to systematically predicting and shaping it.'
}

// CX — CTA copy
export const cxCta = {
  title: "Let's build your CX roadmap.",
  body: "Radiant's CX practice has helped enterprises across financial services, healthcare, and technology improve CSAT by 20%+ within 90 days. We'd like to show you what that looks like for your organization.",
  action: 'Schedule a CX strategy session',
  email: 'hello@radiant.digital',
}
