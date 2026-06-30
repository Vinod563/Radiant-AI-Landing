/**
 * CX Maturity Assessment: data + scoring engine.
 *
 * Pure logic, no React. Content verbatim from radiant-cx-maturity-assessment.md.
 * 3 dimensions × 3 questions, each scored 1–3. Per-dimension + overall level.
 */

const opt = (...labels) => labels.map((label, i) => ({ score: i + 1, label }))

export const cxSections = [
  {
    key: 'vision',
    label: 'Vision & Strategy',
    accent: '#91C46B',
    intro: 'A strong CX vision gives your organization a clear direction and connects customer priorities with business goals. This section evaluates how clearly your CX vision is defined, communicated, and aligned with strategy.',
    questions: [
      {
        id: 'V1',
        question: 'How clearly is your customer experience (CX) purpose articulated across your organization?',
        options: opt('Not clearly defined or inconsistent', 'Communicated but not widely understood', 'Clearly defined and embedded in all teams'),
      },
      {
        id: 'V2',
        question: 'How well does your CX strategy guide leadership and business decisions?',
        options: opt('Rarely influences business decisions', 'Sometimes informs discussions', 'Actively drives decision-making'),
      },
      {
        id: 'V3',
        question: 'How effectively do you connect CX goals with measurable business outcomes?',
        options: opt('No formal connection', 'Some CX goals are measured', 'Fully aligned with business KPIs'),
      },
    ],
  },
  {
    key: 'governance',
    label: 'Governance & Metrics',
    accent: '#596AE0',
    intro: 'Good governance ensures CX efforts are structured, measured, and continually improved. This section examines how your organization oversees, evaluates, and acts on CX performance.',
    questions: [
      {
        id: 'G1',
        question: 'How accountable is leadership for achieving CX outcomes?',
        options: opt('No ownership or accountability', 'Shared accountability among select leaders', 'Clear CX ownership across the leadership team'),
      },
      {
        id: 'G2',
        question: 'How consistently does your organization measure and review CX performance?',
        options: opt('CX performance is rarely reviewed', 'Measured inconsistently across departments', 'Regularly reviewed through structured reports'),
      },
      {
        id: 'G3',
        question: 'How effectively do you use customer feedback and data to refine strategies?',
        options: opt('Data collected but seldom used', 'Feedback drives limited improvements', 'Data continuously informs strategic refinements'),
      },
    ],
  },
  {
    key: 'culture',
    label: 'Organizational Structure & Culture',
    accent: '#F0974E',
    intro: "Your people and processes form the backbone of customer experience delivery. This section explores how well your organization's structure, culture, and collaboration support CX excellence.",
    questions: [
      {
        id: 'C1',
        question: 'How empowered are employees to take actions that enhance customer experiences?',
        options: opt('Limited authority or support', 'Empowered in select teams', 'Organization-wide empowerment and ownership'),
      },
      {
        id: 'C2',
        question: 'How deeply is customer empathy embedded within your company culture?',
        options: opt('Not part of the company mindset', 'Discussed occasionally', "Core to the company's identity and values"),
      },
      {
        id: 'C3',
        question: 'How effectively do teams collaborate across departments to improve customer journeys?',
        options: opt('Departments work independently', 'Occasional cross-team collaboration', 'Strong, consistent cross-functional teamwork'),
      },
    ],
  },
]

// ── Levels ──────────────────────────────────────────────────────────────────

export const levelIndex = { Foundational: 1, Developing: 2, Advanced: 3 }

export const cxLevels = {
  Foundational: {
    name: 'Foundational', color: '#F0974E',
    index: 1,
    tagline: 'Early foundations. CX is emerging but not yet unified.',
    description: "Your CX culture and structure are still developing. Some teams show customer-centric thinking, but CX isn't organization-wide yet, and roles remain unclear. The opportunity now is to define a clear CX direction and connect it to business goals.",
    blurb: {
      vision: 'Your organization is starting to define its CX direction, but the vision is not yet unified or consistently communicated.',
      governance: 'CX oversight and measurement are still emerging, with inconsistent review and ownership.',
      culture: 'Your CX culture and structure are still developing. Some teams show customer-centric thinking, but CX is not yet organization-wide, and roles remain unclear.',
    },
  },
  Developing: {
    name: 'Developing', color: '#596AE0',
    index: 2,
    tagline: 'Taking shape. Goals are aligning, but not yet unified.',
    description: 'Your organization is starting to align CX goals with business objectives, but the CX vision is not yet fully unified or consistently communicated. Governance and customer-centric behaviors are spreading, though empowerment and collaboration are not yet organization-wide.',
    blurb: {
      vision: 'Your organization is starting to align CX goals with business objectives, but the CX vision is not yet fully unified or consistently communicated.',
      governance: 'Governance practices are taking shape; metrics inform some decisions but are applied unevenly.',
      culture: 'Customer-centric behaviors are spreading across teams, though empowerment and collaboration are not yet organization-wide.',
    },
  },
  Advanced: {
    name: 'Advanced', color: '#91C46B',
    index: 3,
    tagline: 'Mature CX. A clear vision drives decisions and outcomes.',
    description: 'You have strong governance and measurement practices. A clear, unified CX vision actively drives leadership decisions and is connected to measurable business outcomes. Customer empathy is core to your identity, with organization-wide empowerment and strong cross-functional teamwork.',
    blurb: {
      vision: 'A clear, unified CX vision actively drives leadership decisions and is connected to measurable business outcomes.',
      governance: 'You have strong governance and measurement practices. CX roles are clear, data is collected, and metrics often guide decisions, your strongest area.',
      culture: 'Customer empathy is core to your identity, with organization-wide empowerment and strong cross-functional teamwork.',
    },
  },
}

function levelFor(avg) {
  // avg in 1..3
  if (avg < 1.67) return 'Foundational'
  if (avg < 2.34) return 'Developing'
  return 'Advanced'
}

function mean(nums) {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

/** answers: { [questionId]: 1..3 } */
export function scoreCx(answers) {
  const dimensions = cxSections.map(section => {
    const scores = section.questions.map(q => answers[q.id]).filter(s => typeof s === 'number')
    const avg = mean(scores)
    const levelKey = levelFor(avg)
    return {
      key: section.key,
      label: section.label,
      accent: section.accent,
      avg,
      levelKey,
      level: cxLevels[levelKey].name,
      color: cxLevels[levelKey].color,
      blurb: cxLevels[levelKey].blurb[section.key],
    }
  })
  const overallAvg = mean(dimensions.map(d => d.avg))
  const overallKey = levelFor(overallAvg)
  return { dimensions, overallAvg, overallLevel: cxLevels[overallKey].name, overallKey }
}

// ── Recommended solution (spec) ─────────────────────────────────────────────

export const recommendedSolution = {
  name: 'Experience AI',
  lede: 'To help you progress to the next maturity level, Radiant recommends Experience AI, our qualitative + quantitative insight engine.',
  helps: [
    'Reveal the root causes driving customer behavior',
    'Turn interviews, surveys, and public data into structured CX insights',
    'Build early journey maps and opportunity areas',
    'Establish repeatable insight → action workflows',
  ],
  // CTAs deep-link into the chat experience (per project decision).
  learnMoreQuery: 'Tell me about the CX Accelerator',
  primaryQuery: 'I want help building a more mature CX strategy',
}

export function recommendSolution() {
  return recommendedSolution
}

// ── Success stories (reused from existing case studies) ─────────────────────

export const cxSuccessStories = [
  { title: 'Application Modernization for Navy Federal Credit Union (NFCU)', tag: 'Product & Services', query: 'Tell me about the Navy Federal Credit Union case study' },
  { title: 'Modernizing Infrastructure for a Federal Agency', tag: 'Infrastructure', query: 'Show me your infrastructure modernization work' },
  { title: 'Verizon Canvas Reality Implementation', tag: 'Product & Services', query: 'Tell me about the Verizon Canvas case study' },
]

// ── Sample report ───────────────────────────────────────────────────────────

export const cxSampleAnswers = {
  V1: 2, V2: 2, V3: 1, // Vision → Developing/Foundational mix
  G1: 3, G2: 3, G3: 3, // Governance → Advanced
  C1: 1, C2: 2, C3: 1, // Culture → Foundational
}
