/**
 * Knowledge base powering the conversational AI experience.
 * Each entry maps to content from existing landing page sections.
 */

const knowledgeBase = [
  {
    id: 'what-is-radiant',
    keywords: ['what is radiant', 'about radiant', 'who is radiant', 'tell me about', 'radiant ai', 'what do you do', 'company'],
    question: 'What is Radiant Digital?',
    cards: [
      {
        type: 'hero',
        title: 'AI-First Digital Transformation',
        subtitle: 'Enterprise-grade AI that deploys in 6 weeks — not 6 months.',
        accent: '#91C46B',
      },
      {
        type: 'metrics',
        title: 'By the Numbers',
        items: [
          { value: '50+', label: 'Enterprise Clients' },
          { value: '18+', label: 'Years Delivering AI' },
          { value: '$2B+', label: 'Programs Powered' },
          { value: '40%', label: 'Avg Cost Reduction' },
        ],
        accent: '#596AE0',
      },
      {
        type: 'text',
        title: 'Our Approach',
        body: 'We take enterprises from proof-of-concept to production scale with outcome-linked engagements, governance built in, and measurable productivity gains that show up on the balance sheet.',
        accent: '#F0974E',
      },
    ],
  },
  {
    id: 'solutions',
    keywords: ['solutions', 'products', 'what do you offer', 'offerings', 'tools', 'platform', 'icx', 'billing', 'automarc', 'magic globe', 'bi fabric', 'cx workbench'],
    question: 'What solutions does Radiant offer?',
    cards: [
      {
        type: 'grid',
        title: 'Six AI Solutions',
        subtitle: 'Purpose-built for enterprise scale',
        items: [
          { name: 'Enterprise ICX', desc: 'Eliminate CX friction with intelligent orchestration', icon: 'Layers', accent: '#91C46B' },
          { name: 'CX Workbench', desc: 'Design, test, and optimize customer journeys', icon: 'PenTool', accent: '#596AE0' },
          { name: 'AI Billing Workbench', desc: 'Detect billing anomalies before they cost millions', icon: 'Receipt', accent: '#F0974E' },
          { name: 'Magic Globe', desc: 'Launch into new markets with zero guesswork', icon: 'Globe', accent: '#a855f7' },
          { name: 'BI Fabric', desc: 'Turn scattered data into decisive intelligence', icon: 'BarChart3', accent: '#2DD4BF' },
          { name: 'Automarc', desc: 'Automate the work nobody should do manually', icon: 'Zap', accent: '#e05990' },
        ],
        accent: '#91C46B',
      },
    ],
  },
  {
    id: 'case-studies',
    keywords: ['case study', 'case studies', 'proof', 'results', 'roi', 'success', 'example', 'telecom', 'fortune 500'],
    question: 'Show me proof — any case studies?',
    cards: [
      {
        type: 'case-study',
        title: 'Fortune 500 Telecom Transformation',
        subtitle: 'From pilot to enterprise-wide deployment in 6 weeks',
        metrics: [
          { value: '$2.1M', label: 'Annual Savings' },
          { value: '43%', label: 'Efficiency Gain' },
          { value: '6 wks', label: 'Time to Production' },
          { value: '10K+', label: 'Hours Automated' },
        ],
        quote: 'We expected efficiency gains. What we got was a fundamental shift in how our teams operate.',
        accent: '#91C46B',
      },
    ],
  },
  {
    id: 'industries',
    keywords: ['industries', 'markets', 'sectors', 'government', 'healthcare', 'telecom', 'defense', 'education', 'financial', 'oil', 'gas', 'who do you serve'],
    question: 'Which industries do you serve?',
    cards: [
      {
        type: 'list',
        title: '8 Industries We Serve',
        subtitle: 'Deep domain expertise across regulated and commercial sectors',
        items: [
          { name: 'Telecom, Media & Tech', metric: '5X capacity scaling', accent: '#596AE0' },
          { name: 'Healthcare & Life Science', metric: '35% cost reduction', accent: '#e05990' },
          { name: 'Financial Services', metric: '40% conversion lift', accent: '#F0974E' },
          { name: 'Federal Government', metric: '45% infra cost reduction', accent: '#596AE0' },
          { name: 'State & Local Government', metric: '70% faster processing', accent: '#91C46B' },
          { name: 'Education', metric: '50% faster data access', accent: '#a855f7' },
          { name: 'Oil & Gas', metric: '70% downtime reduced', accent: '#F0974E' },
          { name: 'Defense & Intelligence', metric: '99.9% system uptime', accent: '#2DD4BF' },
        ],
        accent: '#91C46B',
      },
    ],
  },
  {
    id: 'platform',
    keywords: ['platform', 'technology', 'architecture', 'how does it work', 'under the hood', 'framework', 'agent', 'microagent', 'agentic'],
    question: 'How does the platform work?',
    cards: [
      {
        type: 'grid',
        title: 'Four Platforms. One Secure Foundation.',
        subtitle: 'Battle-tested technology layers',
        items: [
          { name: 'Microagent Framework', desc: 'Persona-based agents that deploy in days with minimal training', icon: 'Bot', accent: '#596AE0' },
          { name: 'Cognitive Experience', desc: 'Personalized AI experiences that feel human', icon: 'Brain', accent: '#a855f7' },
          { name: 'Semantic Context Engine', desc: 'Understand intent, not just keywords', icon: 'Search', accent: '#91C46B' },
          { name: 'Agentic Data Framework', desc: 'Zero-trust governance with full audit trails', icon: 'Database', accent: '#F0974E' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'infrastructure',
    keywords: ['infrastructure', 'tech stack', 'cloud', 'aws', 'azure', 'google', 'nvidia', 'openai', 'anthropic', 'partners', 'technology partners'],
    question: 'What technology partners power Radiant?',
    cards: [
      {
        type: 'partners',
        title: 'World-Class Infrastructure',
        items: [
          { name: 'AWS', role: 'Cloud Infrastructure' },
          { name: 'Google Cloud', role: 'AI & ML Platform' },
          { name: 'Microsoft Azure', role: 'Enterprise Cloud' },
          { name: 'NVIDIA', role: 'GPU Acceleration' },
          { name: 'OpenAI', role: 'Foundation Models' },
          { name: 'Anthropic', role: 'AI Safety & Research' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'services',
    keywords: ['services', 'enablers', 'pillars', 'transformation', 'strategy', 'analytics', 'cloud', 'workforce', 'consulting'],
    question: 'What services does Radiant provide?',
    cards: [
      {
        type: 'list',
        title: 'Six Pillars of Transformation',
        subtitle: 'End-to-end capabilities that power every initiative',
        items: [
          { name: 'Digital Strategy & Experience', metric: '50% engagement lift', accent: '#91C46B' },
          { name: 'Analytics, Data Science & AI', metric: '70% efficiency gain', accent: '#596AE0' },
          { name: 'Cloud Transformation', metric: '99.9% uptime', accent: '#F0974E' },
          { name: 'Product Development', metric: '40% faster deploys', accent: '#a855f7' },
          { name: 'Organizational Transformation', metric: '3x adoption rate', accent: '#2DD4BF' },
          { name: 'Skilled Workforce Solutions', metric: '5+ delivery centers', accent: '#e05990' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'security',
    keywords: ['security', 'compliance', 'fedramp', 'soc', 'cmmc', 'governance', 'audit', 'secure', 'trust', 'certifications'],
    question: 'How secure is Radiant?',
    cards: [
      {
        type: 'text',
        title: 'Governance Built In, Not Bolted On',
        body: 'Enterprise-grade security with FedRAMP, CMMC, and SOC 2 compliance. Every deployment includes full audit trails, human-in-the-loop oversight, and zero-trust architecture by default.',
        accent: '#2DD4BF',
      },
      {
        type: 'metrics',
        title: 'Security Credentials',
        items: [
          { value: 'FedRAMP', label: 'Cloud Compliance' },
          { value: 'CMMC', label: 'Defense Ready' },
          { value: 'SOC 2', label: 'Data Security' },
          { value: '99.9%', label: 'Uptime SLA' },
        ],
        accent: '#2DD4BF',
      },
    ],
  },
  {
    id: 'why-radiant',
    keywords: ['why radiant', 'differentiator', 'competitive', 'advantage', 'why choose', 'what makes you different', 'better'],
    question: 'Why choose Radiant Digital?',
    cards: [
      {
        type: 'grid',
        title: 'Built to Deliver Outcomes',
        subtitle: 'What sets us apart',
        items: [
          { name: 'Expertise & Specialization', desc: '100 agents across 3 domains — development, data ops, intelligent system management', icon: 'Cpu', accent: '#596AE0' },
          { name: 'Our People', desc: 'Engineers, architects, and AI specialists with deep ecosystem expertise', icon: 'Users', accent: '#a855f7' },
          { name: 'Enterprise Impact', desc: 'Up to 40% productivity improvement across IT ops, apps, and data workflows', icon: 'TrendingUp', accent: '#91C46B' },
          { name: 'Global Scale', desc: '500+ employees, 50+ customers, 7 global offices worldwide', icon: 'Globe', accent: '#F0974E' },
        ],
        accent: '#91C46B',
      },
    ],
  },
  {
    id: 'contact',
    keywords: ['contact', 'demo', 'talk', 'call', 'meeting', 'get started', 'pricing', 'consultation', 'reach out', 'assessment'],
    question: 'How can I get started?',
    cards: [
      {
        type: 'cta',
        title: 'Let\u2019s Start Your Transformation',
        body: 'Take our free CX Maturity Assessment to find out where you stand — or book a strategy call with our team.',
        actions: [
          { label: 'Take the Assessment', href: '#assessment' },
          { label: 'Book a Strategy Call', href: '#contact' },
        ],
        accent: '#91C46B',
      },
    ],
  },
]

const suggestions = [
  'What is Radiant Digital?',
  'What solutions do you offer?',
  'Show me case studies',
  'Which industries do you serve?',
  'How does the platform work?',
  'What makes Radiant different?',
  'How secure is it?',
  'How can I get started?',
]

export function findAnswer(query) {
  const q = query.toLowerCase().trim()

  // Direct keyword match
  let best = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (q.includes(keyword)) {
        score += keyword.length
      }
      // Partial word matching
      const words = keyword.split(' ')
      for (const word of words) {
        if (word.length > 3 && q.includes(word)) {
          score += word.length * 0.5
        }
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  // Fallback: if no match, return a helpful default
  if (!best || bestScore < 3) {
    return {
      id: 'fallback',
      question: query,
      cards: [
        {
          type: 'text',
          title: 'Here\u2019s What I Can Help With',
          body: 'I can tell you about Radiant\u2019s solutions, industries we serve, case studies, our platform architecture, security compliance, and how to get started. Try asking one of the suggestions below!',
          accent: '#596AE0',
        },
      ],
    }
  }

  return best
}

export { knowledgeBase, suggestions }
