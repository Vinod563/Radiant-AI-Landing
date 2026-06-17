/**
 * Shared editorial copy for the assessment report — the single source of truth
 * used by BOTH the on-screen "view online" HTML report (HTMLReportViewer.jsx)
 * and the emailed PDF (generateReportPdf.js), so their wording can never drift.
 */

// AI — "Radiant's Read", keyed by stage index (1–5)
export const aiRadiantRead = {
  1: "You're at a critical inflection point. The organizations that move fastest from Stage 1 don't do it with better technology — they do it by getting one executive to own a specific outcome and making that outcome visible. The biggest risk right now isn't falling further behind; it's creating AI initiatives that look like progress but aren't measured against anything that matters.",
  2: "The pattern we see at Stage 2 is almost always the same: the technology team is excited, the rest of the organization is skeptical, and leadership is waiting for proof. The proof doesn't come from better demos — it comes from a production use case with a before-and-after measurement. One case study becomes the business case for everything that follows.",
  3: "You have proof that AI works in your organization. That's a significant milestone most companies never reach. The challenge now is organizational, not technical: how do you make AI the default instead of the exception? The answer is almost always governance — not to slow things down, but to create the trust that lets things move faster.",
  4: "You're in the governance-as-competitive-advantage phase. The organizations that do this well don't just reduce risk — they reduce time to deployment, because every use case follows a known path. The next unlock is treating your AI portfolio the way a private equity firm treats investments: with rigorous tracking, active reallocation, and a clear theory of compounding returns.",
  5: "At Stage 5, the conversation shifts from 'how do we implement AI' to 'how does AI change our business model.' The organizations building durable advantage at this stage are the ones investing in proprietary models, feedback loops that get smarter over time, and AI capabilities that are genuinely hard for competitors to replicate.",
}

// AI — CTA copy (next stage CTA)
export function aiCta(stageIndex) {
  return {
    title: `Ready to move to Stage ${Math.min(stageIndex + 1, 5)}?`,
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
