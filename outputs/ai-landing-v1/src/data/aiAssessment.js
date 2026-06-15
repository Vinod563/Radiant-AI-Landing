/**
 * AI Adoption Assessment — data + scoring engine.
 *
 * Pure logic, no React. Content is verbatim from the product spec
 * (radiant-ai-assessment-spec.md). Role-adaptive: getAQ(role) selects the
 * questions a respondent sees; scoreAssessment / buildFindings / recommendNextStep
 * turn answers into the results view.
 */

// ── Profile config ──────────────────────────────────────────────────────────

export const roles = [
  { key: 'exec', name: 'Executive', desc: 'C-Suite, VP, Director', track: 'Executive Track' },
  { key: 'tech', name: 'Technical Lead', desc: 'CTO, Data, Engineering', track: 'Technical Track' },
  { key: 'biz', name: 'Business Lead', desc: 'Ops, Finance, HR, Sales', track: 'Business Track' },
  { key: 'consultant', name: 'Consultant', desc: 'Advisor, External', track: 'Consultant Track' },
]

export const sectors = [
  'Financial Services', 'Healthcare', 'Technology', 'Federal Government',
  'State & Local Government', 'Manufacturing', 'Retail & Consumer', 'Energy & Utilities',
]

export const orgSizes = [
  'Under 500', '500–2,000', '2,000–10,000', '10,000–50,000', '50,000+',
]

export const departments = [
  'Enterprise / Cross-functional', 'IT / Technology', 'Data & Analytics',
  'Operations', 'Finance', 'HR / People', 'Risk & Compliance',
]

export const personalDomainBlocklist = [
  'gmail', 'yahoo', 'hotmail', 'outlook', 'live', 'msn', 'aol', 'icloud',
  'protonmail', 'proton', 'zoho', 'gmx', 'fastmail', 'tutanota', 'hey',
]

// ── Sections ────────────────────────────────────────────────────────────────

export const sections = [
  { key: 'Strategy', label: 'Strategy & Leadership', accent: '#91C46B' },
  { key: 'Data', label: 'Data & Technology', accent: '#596AE0' },
  { key: 'People', label: 'People & Governance', accent: '#F0974E' },
  { key: 'Adoption', label: 'Adoption & Value', accent: '#2DD4BF' },
]

export const sectionMeta = Object.fromEntries(sections.map(s => [s.key, s]))

// ── Question bank (27, verbatim) ────────────────────────────────────────────
// roles: list of role keys that receive the question; 'all' = everyone.

const opt = (...labels) => labels.map((label, i) => ({ score: i + 1, label }))

export const questionBank = [
  // Section 1 — Strategy & Leadership
  {
    id: 'Q1', section: 'Strategy', title: 'AI Strategy', roles: ['all'],
    context: 'This is where most organizations discover their first gap. A written strategy is different from a stated priority.',
    question: 'Has your organization produced a written AI strategy, approved by leadership and actively in use to guide investment decisions?',
    options: opt(
      'No. There is no formal AI strategy.',
      "There's a shared vision, but nothing is written down or approved.",
      "A draft is in progress. It hasn't been approved or acted on yet.",
      "Yes. Leadership has approved it and it's guiding our priorities.",
      'Yes, board-endorsed, publicly communicated, and reviewed at least annually.',
    ),
  },
  {
    id: 'Q2', section: 'Strategy', title: 'Executive Accountability', roles: ['exec', 'consultant'],
    context: 'The constraint we see most often: AI is everyone\'s priority and no one\'s job.',
    question: 'Is there a named C-level executive who is accountable for AI transformation, not just interested in it but measured on it?',
    options: opt(
      'No. Accountability is unclear or distributed.',
      'IT leadership handles it informally alongside other responsibilities.',
      'Our CDO or CTO has a partial AI mandate.',
      'A dedicated CAIO or AI VP has a clear charter and budget ownership.',
      'CEO-led, with a CAIO and a cross-functional AI Steering Committee that has authority to act.',
    ),
  },
  {
    id: 'Q3', section: 'Strategy', title: 'AI Investment', roles: ['exec', 'consultant'],
    context: 'Budget tells you what an organization actually believes, not what it says.',
    question: "Does your organization have a dedicated AI budget, separate from general IT spend, with accountability for how it's used?",
    options: opt(
      'No dedicated AI budget.',
      'AI is funded opportunistically from IT project budgets.',
      "An informal AI fund exists, but there's no formal tracking.",
      'A formal AI budget line exists with a clear owner and reporting.',
      'Multi-year AI investment portfolio with defined ROI targets and board-level visibility.',
    ),
  },
  {
    id: 'Q4', section: 'Strategy', title: 'Business Alignment', roles: ['exec', 'biz', 'consultant'],
    context: "AI that isn't tied to a specific business outcome is a technology project. Tie it to a number, and an owner, and it becomes a strategy.",
    question: 'Are your AI initiatives tied to specific business outcomes, not just technology milestones?',
    options: opt(
      'No. AI is still primarily a technology initiative.',
      "There's a loose connection to business goals, but nothing formal.",
      'Some use cases have business targets attached.',
      'Most AI investments have measurable KPIs defined at the start.',
      'AI KPIs are embedded in executive scorecards and reported to the board.',
    ),
  },
  {
    id: 'Q5', section: 'Strategy', title: 'AI Roadmap', roles: ['exec', 'consultant'],
    context: "A roadmap that's never been funded isn't a roadmap. It's a wishlist.",
    question: 'Does your organization have a phased AI transformation roadmap, with milestones, owners, and realistic resource plans?',
    options: opt(
      'No roadmap. Decisions are made case by case.',
      "There's an informal list of ideas without owners or timelines.",
      'A high-level roadmap exists but lacks budget or accountable owners.',
      'A detailed 18–24 month roadmap with owners and funding is in place.',
      'A rolling 3–5 year roadmap, reviewed quarterly, tied to business planning cycles.',
    ),
  },
  {
    id: 'Q6', section: 'Strategy', title: 'GenAI Strategy', roles: ['exec', 'tech', 'consultant'],
    context: "Most organizations are reacting to GenAI rather than designing their approach to it. The ones ahead aren't doing more, they're doing it on purpose.",
    question: 'Does your organization have a deliberate Generative AI strategy, distinct from your general AI strategy?',
    options: opt(
      "GenAI hasn't been addressed in strategy.",
      "We're exploring reactively, following what vendors and competitors are doing.",
      'An informal GenAI working group or task force is in place.',
      'A GenAI strategy exists with a use-case roadmap and governance framework.',
      'Enterprise GenAI strategy with a deployment plan, governed access, and ROI framework.',
    ),
  },
  {
    id: 'Q7', section: 'Strategy', title: 'AI Use Case Prioritization', roles: ['tech', 'biz', 'consultant'],
    context: 'Most organizations have more AI ideas than capacity to execute them. Without a defined selection process, resources go to whoever asks loudest, not the highest-value problem.',
    question: 'Does your organization have a defined process for identifying, prioritizing, and selecting which AI use cases to pursue, based on business value and feasibility?',
    options: opt(
      'No process. Use cases are chosen informally based on whoever requests them.',
      'Informal criteria exist but nothing is documented or applied consistently.',
      'A framework exists but is used inconsistently across teams and initiatives.',
      'A formal prioritization process guides most AI portfolio decisions.',
      'A governed AI portfolio process with value tracking, risk scoring, and regular leadership review.',
    ),
  },
  // Section 2 — Data & Technology
  {
    id: 'Q8', section: 'Data', title: 'Data Readiness', roles: ['all'],
    context: "The bottleneck is rarely compute. It's almost always data.",
    question: 'How ready is your data to support AI, in terms of quality, accessibility, and trust?',
    options: opt(
      'Not ready. Data is siloed, inconsistent, and unreliable.',
      'Below average. Significant cleansing and preparation are needed for every project.',
      'Acceptable, but requires substantial effort each time we start something new.',
      'Good. Validated datasets with documented quality standards are in place.',
      'AI-ready by default. Continuously validated, governed, and accessible to the teams who need it.',
    ),
  },
  {
    id: 'Q9', section: 'Data', title: 'Data Governance', roles: ['tech', 'exec', 'consultant'],
    context: "You can build a model on messy data. What you can't do is trust the output. Governance is how you know what you're actually working with.",
    question: 'Does your organization have formal data governance: clear ownership, quality standards, and a catalog teams can actually use?',
    options: opt(
      'No governance. Data ownership and standards are undefined.',
      'IT informally owns data. There are no enforced standards.',
      'A governance program has started but is only partially implemented.',
      'A formal program is in place with stewards, a catalog, and monitored quality metrics.',
      'Enterprise governance with lineage tracking, automated quality, and federated ownership across domains.',
    ),
  },
  {
    id: 'Q10', section: 'Data', title: 'Cloud & AI Infrastructure', roles: ['tech', 'consultant'],
    context: 'Cloud maturity determines what you can build, how fast, and at what cost.',
    question: 'Does your cloud infrastructure support AI workloads, including scalable compute, GPU access, and managed AI services?',
    options: opt(
      'On-premise only. No cloud AI capability exists.',
      "We've moved to cloud but haven't optimized for AI workloads.",
      'Cloud-first for new projects, but AI-specific optimization is limited.',
      'Hybrid cloud with AI workload optimization and managed AI services in place.',
      'Multi-cloud, AI-optimized, with reserved GPU/TPU capacity and AI cost governance.',
    ),
  },
  {
    id: 'Q11', section: 'Data', title: 'AI Platform', roles: ['tech', 'consultant'],
    context: 'Platform fragmentation kills velocity. Every team reinventing the stack is waste.',
    question: 'Does your organization have a standardized, governed AI development platform used consistently across teams?',
    options: opt(
      'No standard. Every team uses different tools.',
      "Individual teams have preferences, but there's no organizational standard.",
      'An informal toolset has been agreed on, but adoption is inconsistent.',
      'A managed AI platform with approved tooling and governance is in use.',
      'Enterprise AI platform with experiment tracking, a model registry, MLOps pipelines, and access controls.',
    ),
  },
  {
    id: 'Q12', section: 'Data', title: 'GenAI Access & Governance', roles: ['all'],
    context: 'Shadow GenAI is already happening in most organizations. The question is whether it\'s governed.',
    question: 'Does your organization have governed access to Generative AI tools for enterprise use, not just personal or informal access?',
    options: opt(
      'No GenAI tools available and no policy in place.',
      'Employees are using public GenAI tools with no oversight or policy.',
      'Some teams have access, but guidance is informal and inconsistent.',
      'Managed enterprise GenAI access with an acceptable use policy and oversight.',
      'Governed enterprise GenAI platform with approved tools, prompt governance, audit logging, and ongoing training.',
    ),
  },
  {
    id: 'Q13', section: 'Data', title: 'MLOps Maturity', roles: ['tech', 'consultant'],
    context: 'Manual deployment is the bottleneck between a working model and a working product.',
    question: 'Are your AI model deployment, monitoring, and retraining processes automated and governed, or still largely manual?',
    options: opt(
      'Fully manual. Deployment and monitoring are done by hand.',
      'Some scripts exist, but the process is still largely manual.',
      'CI pipelines are in place; deployment and monitoring are still manual.',
      'Full CI/CD for AI with automated testing, deployment, and performance alerting.',
      'Autonomous MLOps: automated drift detection, retraining triggers, and performance governance.',
    ),
  },
  {
    id: 'Q14', section: 'Data', title: 'Business Access to Data and Insights', roles: ['biz', 'consultant'],
    context: 'Self-service data access is the gap between AI that helps a few analysts and AI that changes how the whole organization decides. Most organizations underestimate how far they are from the latter.',
    question: 'Do business teams have access to the data and AI-generated insights they need to make decisions, without depending on IT or data teams for every request?',
    options: opt(
      'No. Business teams rely entirely on IT or data teams for any data or AI output.',
      'Some teams have basic reporting but AI-generated insights require IT involvement.',
      'Self-service reporting exists but AI-powered insights are still centralized and slow to access.',
      'Most business teams can access data and AI insights independently for common decisions.',
      'Fully self-service data and AI insights with governed access, embedded in everyday workflows.',
    ),
  },
  // Section 3 — People & Governance
  {
    id: 'Q15', section: 'People', title: 'AI Literacy', roles: ['all'],
    context: 'This is where Stage 2 organizations consistently get stuck. The builders are building. No one else knows what to do with it.',
    question: 'Do employees across your organization have access to AI literacy training appropriate to their role, not just technical training for technical staff?',
    options: opt(
      'No AI training exists. Awareness is entirely self-directed.',
      "Training exists for technical staff. That's where it stops.",
      'Optional AI learning is available for people who seek it out.',
      'Mandatory foundational AI literacy training is required for all staff.',
      'Role-differentiated AI curriculum is embedded in onboarding and career development across the organization.',
    ),
  },
  {
    id: 'Q16', section: 'People', title: 'AI Governance Policy', roles: ['exec', 'consultant'],
    context: 'Every organization that scaled AI successfully put governance in place before the next deployment, not after.',
    question: 'Does your organization have a formal AI governance policy, covering model lifecycle, responsible use, and deployment standards?',
    options: opt(
      'No AI governance policy of any kind.',
      'General IT policy loosely covers AI as a footnote.',
      'A draft AI governance policy is in development.',
      'An approved AI governance policy has been communicated to leaders.',
      'A comprehensive governance framework is in place with enforcement mechanisms and board-level oversight.',
    ),
  },
  {
    id: 'Q17', section: 'People', title: 'Responsible AI', roles: ['exec', 'biz', 'consultant'],
    context: 'Every notable AI failure in the past three years has a governance gap at the root. Not bad models, bad frameworks. This question maps your exposure.',
    question: 'Has your organization formally adopted a Responsible AI framework, covering fairness, transparency, explainability, and accountability?',
    options: opt(
      'No framework. No formal position.',
      'General ethics principles that loosely mention AI.',
      "Draft Responsible AI principles exist but haven't been operationalized.",
      'A published framework with operational guidance and training is in place.',
      'Embedded in all AI project approvals, with external review and public reporting.',
    ),
  },
  {
    id: 'Q18', section: 'People', title: 'AI Talent', roles: ['exec', 'biz', 'consultant'],
    context: "The scarce profile isn't the engineer who can build. It's the engineer who can build and navigate a messy institution.",
    question: 'Does your organization have the AI talent needed to execute your strategy, across data science, engineering, and AI product management?',
    options: opt(
      'No dedicated AI talent. General IT staff are covering it.',
      'One or two individuals, severely understaffed relative to ambition.',
      'A small team is in place, with significant gaps for anything beyond pilots.',
      'A well-staffed core team exists with a clear hiring and development roadmap.',
      'Full AI talent strategy: hiring, development, university partnerships, and competitive market positioning.',
    ),
  },
  {
    id: 'Q19', section: 'People', title: 'Regulatory Compliance', roles: ['exec', 'biz', 'consultant'],
    context: 'The regulatory environment shifted materially in 2025–26. Most organizations are behind on mapping their exposure.',
    question: 'Is your organization actively tracking and managing AI regulatory compliance, including the EU AI Act, NIST AI RMF, and sector-specific rules?',
    options: opt(
      'No tracking. No awareness of applicable AI regulations.',
      'Legal has general awareness. There is no action plan.',
      'The regulatory landscape has been mapped, but obligations are unclear.',
      'Compliance obligations have been identified and assigned to owners.',
      'Real-time regulatory monitoring with gap analysis, legal review, and board-level reporting.',
    ),
  },
  {
    id: 'Q20', section: 'People', title: 'Change Management', roles: ['biz', 'exec', 'consultant'],
    context: 'The people problem is almost always bigger than the technology problem. And it shows up last.',
    question: 'Is there a structured change management program helping employees adopt AI tools and adapt to AI-driven changes in how work gets done?',
    options: opt(
      'No change management. Adoption is self-driven.',
      'Ad hoc communications happen when major AI tools launch.',
      'Change management is used reactively for large AI projects.',
      'A structured OCM program with champions, communications, and adoption tracking is in place.',
      'Enterprise AI change management capability with dedicated resources and measurable outcomes.',
    ),
  },
  {
    id: 'Q21', section: 'People', title: 'Technical AI Governance', roles: ['tech', 'consultant'],
    context: 'Governance at the technical level is what keeps AI systems from becoming liabilities. Without it, teams ship fast and create problems that are expensive to fix later.',
    question: 'Do your technical teams follow documented standards for AI model development, including bias evaluation, explainability requirements, and approval gates before production deployment?',
    options: opt(
      'No standards exist. Each team builds however they choose.',
      'Some informal guidelines exist but they are not documented or enforced.',
      'We have documentation but it is not consistently followed across teams.',
      'Documented standards are in place and most teams follow them.',
      'Standards are enforced, audited, and include automated checks in the deployment pipeline.',
    ),
  },
  {
    id: 'Q22', section: 'People', title: 'AI Technical Skills', roles: ['tech', 'consultant'],
    context: 'A small number of people who know what they are doing does not scale. Skill gaps at the practitioner level are the most common reason AI stays in pilots.',
    question: 'Does your technical team have sufficient depth in AI and ML engineering, MLOps, and data science to build and maintain production AI systems without heavy external dependency?',
    options: opt(
      'No. We lack the internal skills to build or maintain AI systems.',
      'We have a few capable individuals but not a reliable team.',
      'We have a core team but meaningful gaps exist in specific areas.',
      'We have a capable team covering most of what we need.',
      'Deep skills across ML engineering, MLOps, and data science with a clear plan for remaining gaps.',
    ),
  },
  // Section 4 — Adoption & Value
  {
    id: 'Q23', section: 'Adoption', title: 'Production Use Cases', roles: ['all'],
    context: 'Pilots are evidence of interest. Production use cases are evidence of capability.',
    question: 'How many AI use cases does your organization have actively running in production today?',
    options: opt(
      'None. No AI in production.',
      '1–2 pilots being explored or in very limited testing.',
      '3–10 use cases in active production.',
      '11–50 production use cases across multiple functions.',
      '50+ use cases with portfolio governance, scaling playbooks, and active ROI tracking.',
    ),
  },
  {
    id: 'Q24', section: 'Adoption', title: 'ROI Measurement', roles: ['exec', 'biz', 'consultant'],
    context: "If you can't measure it, you can't fund the next one.",
    question: 'Does your organization systematically measure and report the business impact of AI investments, not just the technical metrics?',
    options: opt(
      'No measurement. Impact is assumed but never tracked.',
      'Rough informal estimates. No methodology.',
      'Post-project ROI estimation happens for some initiatives.',
      'Pre and post measurement with defined KPIs is standard for all major investments.',
      'Real-time ROI dashboards per initiative, linked to financial reporting and executive reviews.',
    ),
  },
  {
    id: 'Q25', section: 'Adoption', title: 'Employee Adoption', roles: ['biz', 'exec', 'consultant'],
    context: "Deployed isn't adopted. The gap between them is where most ROI gets lost.",
    question: 'How broadly are AI tools and AI-assisted processes being actively used by employees in their day-to-day work?',
    options: opt(
      'Not used. Tools exist but real adoption is near zero.',
      'Used by isolated technical teams only.',
      'Adopted in select departments or functions.',
      'Broadly adopted across most business functions.',
      'Organization-wide. AI is the standard way of working, embedded in all key processes.',
    ),
  },
  {
    id: 'Q26', section: 'Adoption', title: 'Scaling AI', roles: ['exec', 'tech', 'consultant'],
    context: 'Most organizations scale their first AI use case by brute force. The second one starts from scratch. A repeatable process is the only thing that separates momentum from permanent pilot mode.',
    question: 'Does your organization have a proven, repeatable process for scaling successful AI pilots to enterprise production?',
    options: opt(
      'Pilots never scale. They stay as pilots indefinitely.',
      'Some pilots scale, but it happens ad hoc without a defined process.',
      "A scaling process exists on paper but isn't consistently applied.",
      'A systematic scale-up playbook is used for all qualifying pilots.',
      'Factory model. AI scales consistently, fast, and with measurable outcomes every time.',
    ),
  },
  {
    id: 'Q27', section: 'Adoption', title: 'Business Value', roles: ['all'],
    context: 'Stage is a proxy. Value is what actually matters.',
    question: 'Has AI contributed measurable, attributable improvements to revenue, cost efficiency, or customer experience in your organization?',
    options: opt(
      'No measurable business impact from AI to date.',
      'Marginal or anecdotal improvements. Nothing quantified.',
      'Moderate improvements have been documented in select areas.',
      'Significant attributable business value has been delivered across multiple functions.',
      'AI is a primary driver of competitive advantage, revenue growth, and business model innovation.',
    ),
  },
]

// ── Question selection (spec §6) ────────────────────────────────────────────

const sectionOrder = ['Strategy', 'Data', 'People', 'Adoption']

export function getAQ(role) {
  const cap = role === 'consultant' ? 4 : 3
  const selected = []
  for (const sectionKey of sectionOrder) {
    const eligible = questionBank.filter(
      q => q.section === sectionKey && (q.roles.includes('all') || q.roles.includes(role)),
    )
    selected.push(...eligible.slice(0, cap))
  }
  return selected
}

// ── Scoring (spec §7) ───────────────────────────────────────────────────────

const STAGES = [
  { max: 1.6, key: 'assess', name: 'Assess', index: 1 },
  { max: 2.6, key: 'train', name: 'Train', index: 2 },
  { max: 3.6, key: 'adopt', name: 'Adopt', index: 3 },
  { max: 4.6, key: 'govern', name: 'Govern', index: 4 },
  { max: Infinity, key: 'scale', name: 'Scale', index: 5 },
]

export const stages = {
  assess: {
    name: 'Assess', index: 1, tagline: 'No formal strategy. Leadership aware but not aligned.',
    description: "You're at the starting point. Leadership knows AI matters but nobody has agreed on what it should actually do. No written strategy, no budget line, no clear owner. The work here is simple but not easy: get the right people aligned on three specific things AI should accomplish in the next 12 months.",
  },
  train: {
    name: 'Train', index: 2, tagline: 'Pilots running. AI literacy gaps are the ceiling.',
    description: "You have pilots. You have people who are genuinely excited. What you don't have is a workforce that knows what to do with AI when it shows up in their work. The technical team is building. Everyone else is watching. The gap between them is what keeps organizations stuck here longer than expected.",
  },
  adopt: {
    name: 'Adopt', index: 3, tagline: 'AI is live. Scaling to the enterprise is the stall point.',
    description: "AI is working in parts of your organization. The evidence is real. The problem is it hasn't spread. A few teams use it well; most don't touch it. Getting from here to broad deployment is less about technology and more about the organization: how decisions get made, how tools roll out, and who is accountable when something goes wrong.",
  },
  govern: {
    name: 'Govern', index: 4, tagline: 'Broadly deployed. Governance now sets the pace.',
    description: "AI is broadly deployed and the value is measurable. The risk now is that deployment outpaces your ability to manage it. Governance at this stage is not about slowing down, it's about making sure the next rollout doesn't create a problem nobody saw coming.",
  },
  scale: {
    name: 'Scale', index: 5, tagline: 'AI-first. Compounding the advantage.',
    description: "You've done the hard work. The foundation is real. The goal now is to stop treating AI as a project and start treating it as how the organization operates. That shift — from AI initiative to how we work — is where the lasting advantage lives.",
  },
}

function mean(nums) {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

/**
 * answers: { [questionId]: score 1..5 }
 * questions: the question list the respondent actually saw (from getAQ)
 */
export function scoreAssessment(answers, questions) {
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

// ── Score-bar colours (spec §9) ─────────────────────────────────────────────

export function scoreBarStyle(score) {
  if (score === 0) return { color: '#64748B', label: 'No data' }
  if (score < 2.0) return { color: '#F05030', label: 'Needs attention' }
  if (score < 3.0) return { color: '#F0974E', label: 'Below target' }
  if (score < 4.0) return { color: '#2DD4BF', label: 'On track' }
  return { color: '#91C46B', label: 'Strong' }
}

// ── Findings engine (spec §9) ───────────────────────────────────────────────

const STRENGTH_MSG = {
  Strategy: { title: 'Executive alignment is real', body: "Leadership has committed to AI and the direction is clear. That's the starting condition for everything else, and a lot of organizations still don't have it." },
  Data: { title: 'Data infrastructure is ahead of the curve', body: 'Quality standards and the underlying platform are in better shape than most organizations at your stage. That removes one of the most common blockers.' },
  People: { title: 'Governance and literacy are in place', body: "There's a framework for responsible deployment and employees have the training to use AI tools. That's the foundation for scale without compounding risk." },
  Adoption: { title: 'AI is live and generating measurable value', body: "Production deployments are running and impact is being tracked. That's evidence of real execution capability, not just ambition." },
}

const GAP_VLOW = {
  Strategy: { title: 'No real AI strategy or ownership', body: 'Investment decisions are being made without a framework. Resources go to whoever makes the loudest case, not where the value actually is.' },
  Data: { title: "Data isn't ready to support AI", body: "Siloed, inconsistent, unreliable. You can build models on it. You won't be able to trust what comes out, and neither will the people using it." },
  People: { title: 'No governance and no literacy program', body: 'Every deployment is ungoverned. Most employees have no framework for using AI tools responsibly. The exposure compounds with each new tool that goes live.' },
  Adoption: { title: "AI isn't in production yet", body: 'The investment so far is in exploration, not outcomes. Until something is live and measured, the business case for the next investment is guesswork.' },
}

const GAP_MID = {
  Strategy: { title: "AI strategy exists but isn't driving decisions", body: "There's a document. Priorities still shift and ownership is unclear. Without enforcement and accountability, a strategy is just a starting point." },
  Data: { title: 'Data quality is inconsistent', body: "Every new AI project starts with cleanup work before it can begin. That's a constant tax on velocity and a hard ceiling on how fast you can move." },
  People: { title: 'Governance is informal and literacy is uneven', body: 'Technical teams are ahead. Everyone else is watching from a distance. That gap is what keeps pilots from spreading into the wider organization.' },
  Adoption: { title: "Pilots aren't scaling", body: "The jump from pilot to production is where most organizations stall. The problem is almost never the technology, it's the absence of a repeatable process for getting there." },
}

const FALLBACK_FINDING = {
  title: 'Solid across the board',
  body: 'Your scores are consistent across all four dimensions. The focus now is on moving from good to excellent in the areas that will have the most compounding effect.',
}

export function buildFindings(sectionAverages) {
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

// ── Next step (spec §9) ─────────────────────────────────────────────────────

const NEXT_STEP = {
  Strategy: { chat: 'Get the right people aligned on our AI strategy', text: 'Get the right people aligned before the next investment decision. A half-day session to define three specific AI outcomes, with owners and timelines attached, removes more friction than months of planning documents.' },
  Data: { chat: 'Run a data readiness audit', text: 'Run a 60-day data readiness audit before the next deployment. Map what you have, what\'s clean enough to use, and what needs work. The output is a data inventory that makes every future project faster and every AI output more trustworthy.' },
  People: { chat: 'Draft our AI governance policy', text: 'Draft the governance policy before the next use case goes live. A 30-day sprint to write, socialize, and approve a framework prevents the problems that compound at scale. Every week without it is a week of exposure that grows with each new deployment.' },
  Adoption: { chat: 'Diagnose why our AI isn\'t scaling', text: "Diagnose why the current work isn't spreading. It's usually one of three things: no change management, no clear process owner, or no ROI measurement to justify the next investment. Identify which one it is, fix that first, and everything else accelerates." },
}

export function recommendNextStep(sectionAverages) {
  let weakest = sectionOrder[0]
  let min = Infinity
  for (const key of sectionOrder) {
    const s = sectionAverages[key] || 0
    if (s < min) { min = s; weakest = key }
  }
  return { section: key2label(weakest), ...NEXT_STEP[weakest] }
}

function key2label(key) {
  return sectionMeta[key]?.label || key
}

// ── Sample report (spec §2 "Sample Report" tab) ─────────────────────────────
// A fictional completed Executive report used by /assessment/ai?view=sample.

export const sampleProfile = {
  role: 'exec', fullName: 'Jordan Avery', workEmail: 'javery@meridian-financial.com',
  companyName: 'Meridian Financial', sector: 'Financial Services', orgSize: '10,000–50,000',
  department: 'Enterprise / Cross-functional',
}

export const sampleAnswers = {
  Q1: 4, Q2: 4, Q3: 3, // Strategy avg ~3.67
  Q8: 3, Q9: 3, Q12: 2, // Data avg ~2.67
  Q15: 2, Q16: 2, Q17: 2, // People avg 2.0
  Q23: 4, Q24: 4, Q25: 3, // Adoption avg ~3.67
}
