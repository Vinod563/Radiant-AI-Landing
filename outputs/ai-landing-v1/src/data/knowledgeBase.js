/**
 * Knowledge base powering the conversational AI experience.
 * Real content pulled from landing page components.
 */

const knowledgeBase = [
  {
    id: 'what-is-radiant',
    keywords: ['what is radiant', 'about radiant', 'who is radiant', 'tell me about', 'radiant ai', 'what do you do', 'company', 'radiant digital'],
    question: 'What is Radiant Digital?',
    cards: [
      {
        type: 'hero',
        title: 'AI-First Digital Transformation Partner',
        subtitle: 'Radiant delivers enterprise-grade AI solutions built for scalability, compliance, and measurable impact — from day one. We don\'t bill hours — we deliver outcomes.',
        accent: '#91C46B',
      },
      {
        type: 'metrics',
        title: 'By the Numbers',
        items: [
          { value: '50+', label: 'Federal & Enterprise Clients' },
          { value: '18+', label: 'Years Delivering AI' },
          { value: '$2B+', label: 'Programs Powered' },
          { value: '40%', label: 'Avg Productivity Gain' },
        ],
        accent: '#596AE0',
      },
      {
        type: 'text',
        title: 'Beyond Pilots — Scaling Agentic AI',
        body: 'We take enterprises from proof-of-concept to production scale with outcome-linked engagements, governance built in, and measurable productivity gains that show up on the balance sheet. Deploy AI in 6 weeks — not 6 months.',
        accent: '#F0974E',
      },
    ],
  },
  {
    id: 'solutions',
    keywords: ['solutions', 'products', 'what do you offer', 'offerings', 'tools', 'icx', 'billing', 'automarc', 'magic globe', 'bi fabric', 'cx workbench', 'six solutions'],
    question: 'What solutions does Radiant offer?',
    cards: [
      {
        type: 'solutions',
        title: 'Six AI Solutions. One Unified Platform.',
        subtitle: 'Each solution is purpose-built for a specific enterprise challenge — yet they all share one secure, modular AI foundation.',
        items: [
          {
            num: '01',
            title: 'Enterprise ICX',
            label: 'CX Intelligence',
            accent: '#91C46B',
            gradient: 'linear-gradient(135deg, #021a0c 0%, #043d18 50%, #0a6b2a 100%)',
            screenshot: '/screenshots/enterprise-icx.png',
            desc: 'AI-powered CX insight-to-ROI platform that unifies data to proactively eliminate experience friction — turning customer signals into measurable business outcomes.',
            tags: ['Enterprise', 'CX', 'Insight-to-ROI'],
            details: [
              'Unified data platform across all CX touchpoints',
              'Proactive friction detection & elimination',
              'Insight-to-ROI pipeline with measurable outcomes',
              'Real-time experience monitoring & alerting',
            ],
          },
          {
            num: '02',
            title: 'CX Workbench',
            label: 'Journey Intelligence',
            accent: '#F0974E',
            gradient: 'linear-gradient(135deg, #1a0a00 0%, #3d1e00 50%, #7a3800 100%)',
            screenshot: '/screenshots/cx-workbench.png',
            desc: 'AI-powered workflow tool that accelerates manual tagging of customer interactions on digital channels using Figma screen analysis and business rules.',
            tags: ['Workflow', 'Figma Analysis', 'Journey Mapping'],
            details: [
              'AI-accelerated interaction tagging on digital channels',
              'Figma screen analysis with business rule engine',
              'Customer journey visualization & mapping',
              'Experience detail extraction & pattern recognition',
            ],
          },
          {
            num: '03',
            title: 'AI Billing Workbench',
            label: 'Billing Intelligence',
            accent: '#596AE0',
            gradient: 'linear-gradient(135deg, #050818 0%, #0c1040 50%, #1a2270 100%)',
            screenshot: '/screenshots/anomaly-detection.png',
            desc: 'AI-powered platform that detects billing anomalies, groups them into patterns, and guides teams to resolve issues before they impact customers.',
            tags: ['Billing', 'Anomaly Detection', 'Resolution'],
            details: [
              'Real-time billing anomaly detection engine',
              'Intelligent pattern grouping & classification',
              'Guided resolution workflows for support teams',
              'Proactive issue resolution before customer impact',
            ],
          },
          {
            num: '04',
            title: 'Magic Globe',
            label: 'Launch Intelligence',
            accent: '#F05030',
            gradient: 'linear-gradient(135deg, #180400 0%, #3d0e00 50%, #6b1a00 100%)',
            screenshot: '/screenshots/magic-globe.png',
            desc: 'AI-powered platform that integrates sales, returns, quality, and customer data to predict device launch risk and provide go/no-go recommendations.',
            tags: ['Launch Risk', 'Predictive', 'Go/No-Go'],
            details: [
              'Integrated sales, returns, quality & customer data',
              'Device launch risk prediction & scoring',
              'AI-driven root cause identification',
              'Go/no-go recommendations pre & post launch',
            ],
          },
          {
            num: '05',
            title: 'BI Fabric',
            label: 'Analytics Platform',
            accent: '#00c87d',
            gradient: 'linear-gradient(135deg, #001208 0%, #003020 50%, #005838 100%)',
            screenshot: '/screenshots/ai-fabric.png',
            desc: 'Centralized analytics and reporting solution that connects data sources into a governed environment — enabling faster, data-driven decision-making across the enterprise.',
            tags: ['Analytics', 'BI', 'Data Governance'],
            details: [
              'Centralized data source connectivity & unification',
              'Governed analytics environment with access controls',
              'Self-service reporting & dashboard builder',
              'Faster data-driven decision-making at every level',
            ],
          },
          {
            num: '06',
            title: 'Automarc',
            label: 'Document Intelligence',
            accent: '#a855f7',
            gradient: 'linear-gradient(135deg, #080014 0%, #160038 50%, #2a0068 100%)',
            screenshot: '/screenshots/automarc.png',
            desc: 'AI-powered document workflow automation that extracts, classifies, and processes content to reduce manual effort — purpose-built for technical writing at scale.',
            tags: ['Documents', 'Automation', 'Technical Writing'],
            details: [
              'AI-powered content extraction & classification',
              'Automated document processing workflows',
              'Technical writing acceleration & consistency',
              'Reduced manual effort with improved accuracy',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'case-studies',
    keywords: ['case study', 'case studies', 'proof', 'results', 'roi', 'success', 'example', 'telecom', 'fortune 500', 'savings'],
    question: 'Show me proof — any case studies?',
    cards: [
      {
        type: 'case-study',
        title: 'Fortune 500 Telecom Transformation',
        subtitle: 'Leading Telecom Enterprise needed AI that delivered measurable ROI, not another pilot. Radiant deployed agentic workflows that automated 10,000+ manual hours — a 43% efficiency gain and $2.1M in annual savings, live in production within 6 weeks.',
        client: 'Leading Telecom Enterprise',
        clientDetail: 'Fortune 500 · Telecommunications',
        metrics: [
          { value: '$2.1M', label: 'Annual Savings' },
          { value: '43%', label: 'Efficiency Gain' },
          { value: '6 wks', label: 'Time to Production' },
          { value: '10K+', label: 'Hours Automated' },
        ],
        quote: 'We expected efficiency gains. What we got was a fundamental shift — our operations team now focuses on strategy, not firefighting.',
        quoteAuthor: 'Operations Director, Fortune 500 Telecom',
        accent: '#91C46B',
      },
    ],
  },
  {
    id: 'industries',
    keywords: ['industries', 'markets', 'sectors', 'government', 'healthcare', 'telecom', 'defense', 'education', 'financial', 'oil', 'gas', 'who do you serve', 'domain'],
    question: 'Which industries do you serve?',
    cards: [
      {
        type: 'industries',
        title: 'Built for Your Domain',
        subtitle: 'Every industry has its own rules, risks, and opportunities. We bring AI solutions shaped by deep sector expertise — so you scale faster with governance built in.',
        items: [
          {
            title: 'Telecom, Media & Technology',
            icon: 'Radio',
            accent: '#596AE0',
            gradientFrom: '#1e2a6e',
            gradientTo: '#596AE0',
            image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=900&fit=crop&q=80',
            clients: 'Verizon, Major TMT Enterprises',
            desc: 'Scale network capacity without proportional cost increases through AI-powered intelligent automation.',
            metrics: [
              { value: '5X', label: 'Capacity Scaling' },
              { value: '40%', label: 'Faster Deployment' },
              { value: '99.9%', label: 'Uptime SLA' },
            ],
          },
          {
            title: 'Healthcare & Life Science',
            icon: 'HeartPulse',
            accent: '#e05990',
            gradientFrom: '#7a2050',
            gradientTo: '#e05990',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=900&fit=crop&q=80',
            clients: 'NIH, MD Anderson, CHOP',
            desc: 'Privacy-first AI that scales clinical workflows — from diagnostics to patient experience — with HIPAA governance built in.',
            metrics: [
              { value: '35%', label: 'Cost Reduction' },
              { value: '70%', label: 'Less Manual Work' },
              { value: '30%', label: 'Ops Efficiency Gain' },
            ],
          },
          {
            title: 'Financial Services & Insurance',
            icon: 'Banknote',
            accent: '#F0974E',
            gradientFrom: '#7a4a10',
            gradientTo: '#F0974E',
            image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=900&fit=crop&q=80',
            clients: 'Navy Federal Credit Union',
            desc: 'Outcome-linked AI for fraud detection, compliance automation, and customer journey transformation.',
            metrics: [
              { value: '40%', label: 'Conversion Lift' },
              { value: '25%', label: 'CSAT Improvement' },
              { value: '70%', label: 'Sync Time Reduced' },
            ],
          },
          {
            title: 'Federal Government',
            icon: 'Landmark',
            accent: '#596AE0',
            gradientFrom: '#1a2060',
            gradientTo: '#596AE0',
            image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=900&fit=crop&q=80',
            clients: 'DoD, HHS, DHS, Treasury',
            desc: 'Beyond pilots — scaling agentic AI for mission-critical operations with FedRAMP compliance and human-in-the-loop governance.',
            metrics: [
              { value: '45%', label: 'Infra Cost Reduction' },
              { value: '40%', label: 'Faster Delivery' },
              { value: '70%', label: 'Ops Efficiency Gain' },
            ],
          },
          {
            title: 'State & Local Government',
            icon: 'Building2',
            accent: '#91C46B',
            gradientFrom: '#2a5018',
            gradientTo: '#91C46B',
            image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=900&fit=crop&q=80',
            clients: 'FL DCF, FL DEO, FL DOT',
            desc: 'Citizen-centric digital transformation that delivers better outcomes on smaller budgets.',
            metrics: [
              { value: '30%', label: 'Cost Savings' },
              { value: '70%', label: 'Faster Processing' },
              { value: '25%', label: 'Citizen CSAT Lift' },
            ],
          },
          {
            title: 'Education',
            icon: 'GraduationCap',
            accent: '#a855f7',
            gradientFrom: '#4a1880',
            gradientTo: '#a855f7',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=900&fit=crop&q=80',
            clients: 'UT Austin, Baylor University',
            desc: 'AI-first campus transformation — student success prediction, research analytics, and FERPA-compliant data governance.',
            metrics: [
              { value: '35%', label: 'Cost Reduction' },
              { value: '50%', label: 'Faster Data Access' },
              { value: '70%', label: 'Engagement Lift' },
            ],
          },
          {
            title: 'Oil & Gas',
            icon: 'Fuel',
            accent: '#F0974E',
            gradientFrom: '#5a3000',
            gradientTo: '#F0974E',
            image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&h=900&fit=crop&q=80',
            clients: 'Halliburton',
            desc: 'Connected worker safety meets predictive maintenance — Tracklynk IoT plus AI-driven asset intelligence.',
            metrics: [
              { value: '60%', label: 'Maintenance Uplift' },
              { value: '70%', label: 'Downtime Reduced' },
              { value: '99.9%', label: 'Safety Uptime' },
            ],
          },
          {
            title: 'Defense & Intelligence',
            icon: 'Shield',
            accent: '#2DD4BF',
            gradientFrom: '#0a3028',
            gradientTo: '#2DD4BF',
            image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&h=900&fit=crop&q=80',
            clients: 'Department of Defense',
            desc: 'Mission-critical AI with zero-trust governance — humans orchestrate agents, never autonomous decisions.',
            metrics: [
              { value: '40%', label: 'Faster Deployment' },
              { value: '99.9%', label: 'System Uptime' },
              { value: '35%', label: 'Infra Cost Savings' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'platform',
    keywords: ['platform', 'technology', 'architecture', 'how does it work', 'under the hood', 'framework', 'agent', 'microagent', 'agentic', 'four platforms'],
    question: 'How does the platform work?',
    cards: [
      {
        type: 'platforms',
        title: 'Four Platforms. One Secure Foundation.',
        subtitle: 'Enterprise AI demands more than models — it demands trust. Four battle-tested layers built for speed without sacrificing governance.',
        items: [
          {
            num: '01',
            gradient: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 20%, #0a4a6e 40%, #00bcd4 60%, #e040fb 80%, #ff1493 100%)',
            title: 'Persona-Based Microagent Framework',
            desc: 'Deploy task-specific agents in days, not months. Minimal training data, low maintenance, and seamless orchestration through AgentOps — unlocking the autonomous Build-Deploy-Run value pool.',
            features: ['Deploy in Days', 'Minimal Training Data', 'AgentOps Orchestration', '70% Less Maintenance'],
          },
          {
            num: '02',
            gradient: 'linear-gradient(135deg, #1a0800 0%, #3d1500 20%, #8b3000 40%, #e65c00 60%, #f9a825 80%, #ff7043 100%)',
            title: 'Cognitive Experience',
            desc: 'Consumer-grade AI interactions with enterprise-grade security. Role-aware, conversational, multi-modal — with governance and compliance built in, not bolted on.',
            features: ['Role-Aware UX', 'Conversational AI', 'Multi-Modal', 'Zero-Trust Governance'],
          },
          {
            num: '03',
            gradient: 'linear-gradient(135deg, #000d1a 0%, #001a4d 25%, #003380 50%, #0066cc 70%, #00bfff 90%, #7df9ff 100%)',
            title: 'Semantic Context Engine',
            desc: 'Data without context is noise. Our semantic layer connects operational data to business outcomes through knowledge graphs — turning natural language queries into actionable insights.',
            features: ['Knowledge Graphs', 'Context-Aware AI', 'Natural Language Queries', 'Revenue-Aligned Insights'],
          },
          {
            num: '04',
            gradient: 'linear-gradient(135deg, #001a00 0%, #003300 20%, #006600 40%, #009900 60%, #39d353 80%, #b8ffb8 100%)',
            title: 'Agentic Data Framework',
            desc: 'Fragmented data is the #1 blocker for enterprise AI. Our AI Fabric unifies it — ontology mapping, automated cleansing, and governed migration that turns data chaos into AI-ready assets.',
            features: ['Ontology Mapping', 'Auto Data Cleansing', 'Unified Data Layer', 'Governed Migration'],
          },
        ],
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
    keywords: ['services', 'enablers', 'pillars', 'transformation', 'strategy', 'analytics', 'cloud', 'workforce', 'consulting', 'what services'],
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

  let best = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (q.includes(keyword)) {
        score += keyword.length
      }
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
