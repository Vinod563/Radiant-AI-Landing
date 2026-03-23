/**
 * Knowledge base powering the conversational AI experience.
 * Real content pulled from landing page components.
 */

const knowledgeBase = [
  {
    id: 'what-is-radiant',
    keywords: ['what is radiant', 'about radiant', 'who is radiant', 'tell me about', 'radiant ai', 'what do you do', 'company', 'radiant digital', 'precision context engine', 'pce', 'context engine', 'how does radiant work'],
    question: 'What is Radiant Digital?',
    cards: [
      {
        type: 'hero',
        title: 'Radiant has evolved into the age of AI.',
        subtitle: 'We have figured out a way to infuse AI into everything we do. That means we can now help enterprises deploy AI into their operations: grounded in the right context, producing measurable results, faster than any other approach. Enterprise transformation. Supercharged with AI.',
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
        title: 'The Precision Context Engine',
        body: 'Before any solution is deployed, Radiant constructs a precision context environment built from your systems, your domain vocabulary, your operational constraints, and your target outcomes. The result: AI that already knows your business before it runs a single process.',
        accent: '#F0974E',
      },
    ],
  },
  {
    id: 'solutions',
    keywords: ['solutions', 'products', 'what do you offer', 'offerings', 'tools', 'icx', 'billing', 'automarc', 'customer journey intelligence', 'billing anomaly detection', 'product launch risk intelligence', 'design-to-code', 'modernization', 'six solutions'],
    question: 'What solutions does Radiant offer?',
    cards: [
      {
        type: 'solutions',
        title: 'Purpose-built for your problem. Grounded in your context.',
        subtitle: 'Each solution targets a specific enterprise challenge. Every one is powered by the Radiant AI Platform: 12 foundational capabilities that ensure your AI knows your environment before it starts.',
        items: [
          {
            num: '01',
            title: 'Enterprise ICX',
            label: 'Digital Strategy and Experience',
            accent: '#91C46B',
            gradient: 'linear-gradient(135deg, #021a0c 0%, #043d18 50%, #0a6b2a 100%)',
            screenshot: '/screenshots/enterprise-icx.png',
            desc: 'Unifies every customer signal into a single intelligence layer, giving your teams the predictive power to eliminate friction before it becomes churn.',
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
            title: 'Customer Journey Intelligence',
            label: 'Digital Strategy and Experience',
            accent: '#F0974E',
            gradient: 'linear-gradient(135deg, #1a0a00 0%, #3d1e00 50%, #7a3800 100%)',
            screenshot: '/screenshots/cx-workbench.png',
            desc: 'Accelerates the analysis of customer interactions across digital channels, enabling teams to visualize journeys and act on experience insights in hours, not weeks.',
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
            title: 'Design-to-Code Modernization',
            label: 'Product Development and Integration',
            accent: '#00c87d',
            gradient: 'linear-gradient(135deg, #001208 0%, #003020 50%, #005838 100%)',
            screenshot: '/screenshots/ai-fabric.png',
            desc: 'Transforms legacy enterprise applications into modern, design-system-compliant environments. Working, auditable output in hours per module.',
            tags: ['Legacy Modernization', 'Design Systems', 'AI-RAD'],
            details: [
              'Legacy application analysis & decomposition',
              'Design-system-compliant code generation',
              'Working output in hours per module',
              'Auditable modernization pipeline',
            ],
          },
          {
            num: '04',
            title: 'Billing Anomaly Detection',
            label: 'Analytics, Data Science and AI',
            accent: '#596AE0',
            gradient: 'linear-gradient(135deg, #050818 0%, #0c1040 50%, #1a2270 100%)',
            screenshot: '/screenshots/anomaly-detection.png',
            desc: 'Detects billing anomalies, groups them into patterns, and guides teams to resolve issues before they reach customers, protecting revenue and trust at scale.',
            tags: ['Billing', 'Anomaly Detection', 'Revenue Protection'],
            details: [
              'Real-time billing anomaly detection engine',
              'Intelligent pattern grouping & classification',
              'Guided resolution workflows for support teams',
              'Proactive issue resolution before customer impact',
            ],
          },
          {
            num: '05',
            title: 'Product Launch Risk Intelligence',
            label: 'Analytics, Data Science and AI',
            accent: '#F05030',
            gradient: 'linear-gradient(135deg, #180400 0%, #3d0e00 50%, #6b1a00 100%)',
            screenshot: '/screenshots/magic-globe.png',
            desc: 'Integrates sales, returns, quality, and customer data to predict launch risk, identify root causes, and provide AI-driven go/no-go recommendations before and after launch.',
            tags: ['Launch Risk', 'Predictive', 'Go/No-Go'],
            details: [
              'Integrated sales, returns, quality & customer data',
              'Device launch risk prediction & scoring',
              'AI-driven root cause identification',
              'Go/no-go recommendations pre & post launch',
            ],
          },
          {
            num: '06',
            title: 'Automarc AI',
            label: 'Organizational Transformation',
            accent: '#a855f7',
            gradient: 'linear-gradient(135deg, #080014 0%, #160038 50%, #2a0068 100%)',
            screenshot: '/screenshots/automarc.png',
            desc: 'Extracts, classifies, and processes content to reduce manual effort and improve accuracy, turning document-heavy operations into automated, governed workflows.',
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
        title: 'Fortune 15 Telecom Transformation',
        subtitle: 'A tier-1 telecom carrier needed AI that produced measurable operational results: not a proof-of-concept that stalled after 90 days. Radiant built a precision context environment grounded in the carrier\'s billing systems, operational data, and domain vocabulary. Then deployed AI workflows across revenue assurance, billing intelligence, and customer operations: live in six weeks.',
        client: 'Leading Fortune 15 Telecom Enterprise',
        clientDetail: 'Fortune 15 · Telecommunications',
        metrics: [
          { value: '3-7%', label: 'Revenue Leakage Recovered' },
          { value: '98%', label: 'Billing Accuracy' },
          { value: '40-70%', label: 'LLM Cost Reduction' },
          { value: '6 wks', label: 'To Production' },
        ],
        quote: 'We expected efficiency gains. What we got was a fundamental shift: our operations team now focuses on strategy, not firefighting.',
        quoteAuthor: 'Operations Director, Fortune 15 Telecom',
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
        subtitle: 'Every industry has its own rules, risks, and opportunities. We bring enterprise transformation shaped by deep sector expertise: so you scale faster, with governance built in from the start.',
        items: [
          {
            title: 'Technology, Media and Telecom',
            icon: 'Radio',
            accent: '#596AE0',
            gradientFrom: '#1e2a6e',
            gradientTo: '#596AE0',
            image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=900&fit=crop&q=80',
            clients: 'Major tier-1 carriers',
            desc: 'Radiant has mapped 29 AI use cases across the full telecom operating model: from revenue assurance to network operations to sales velocity.',
            metrics: [
              { value: '29', label: 'AI Use Cases' },
              { value: '40%', label: 'Faster Deployment' },
              { value: '99.9%', label: 'Uptime SLA' },
            ],
          },
          {
            title: 'Healthcare and Life Sciences',
            icon: 'HeartPulse',
            accent: '#e05990',
            gradientFrom: '#7a2050',
            gradientTo: '#e05990',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=900&fit=crop&q=80',
            clients: 'NIH, MD Anderson, CHOP',
            desc: 'Privacy-first AI that scales clinical workflows and research operations: with HIPAA governance built in, not bolted on.',
            metrics: [
              { value: '35%', label: 'Cost Reduction' },
              { value: '70%', label: 'Less Manual Work' },
              { value: '30%', label: 'Ops Efficiency Gain' },
            ],
          },
          {
            title: 'Financial Services',
            icon: 'Banknote',
            accent: '#F0974E',
            gradientFrom: '#7a4a10',
            gradientTo: '#F0974E',
            image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=900&fit=crop&q=80',
            clients: 'Navy Federal Credit Union, major BFSI enterprises',
            desc: 'AI for fraud detection, compliance automation, and customer journey transformation: with audit trails from day one.',
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
            clients: 'DoD, HHS, DHS, Treasury, Commerce, Interior',
            desc: 'Mission-critical enterprise transformation with program-grade delivery, human-in-the-loop governance, and federal compliance alignment.',
            metrics: [
              { value: '45%', label: 'Infra Cost Reduction' },
              { value: '40%', label: 'Faster Delivery' },
              { value: '70%', label: 'Ops Efficiency Gain' },
            ],
          },
          {
            title: 'State and Local Government',
            icon: 'Building2',
            accent: '#91C46B',
            gradientFrom: '#2a5018',
            gradientTo: '#91C46B',
            image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=900&fit=crop&q=80',
            clients: 'FL DCF, FL DEO, FL DOT',
            desc: 'Citizen-centric transformation that delivers better outcomes on constrained budgets. Faster permitting, benefits processing, and case management: at scale.',
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
            clients: 'UT Austin, Baylor University, research institutions',
            desc: 'AI-first campus transformation: research analytics, student outcomes, and FERPA-compliant data governance at scale.',
            metrics: [
              { value: '35%', label: 'Cost Reduction' },
              { value: '50%', label: 'Faster Data Access' },
              { value: '70%', label: 'Engagement Lift' },
            ],
          },
          {
            title: 'Oil and Gas',
            icon: 'Fuel',
            accent: '#F0974E',
            gradientFrom: '#5a3000',
            gradientTo: '#F0974E',
            image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&h=900&fit=crop&q=80',
            clients: 'Halliburton, Noble Corporation, offshore operators',
            desc: 'Connected worker safety, predictive maintenance, and digital asset intelligence across remote and field operations.',
            metrics: [
              { value: '60%', label: 'Maintenance Uplift' },
              { value: '70%', label: 'Downtime Reduced' },
              { value: '99.9%', label: 'Safety Uptime' },
            ],
          },
          {
            title: 'Defense and Intelligence',
            icon: 'Shield',
            accent: '#2DD4BF',
            gradientFrom: '#0a3028',
            gradientTo: '#2DD4BF',
            image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&h=900&fit=crop&q=80',
            clients: 'Department of Defense',
            desc: 'Mission-critical AI with zero-trust governance: humans orchestrate, never autonomous decisions in classified environments.',
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
        title: '12 foundational capabilities. The infrastructure beneath every solution.',
        subtitle: 'Radiant does not deploy generic AI. Every solution is assembled from purpose-built platform capabilities: 12 components that cover context acquisition, synthesis, grounding, reasoning, orchestration, observability, and governance. This is the technical foundation of the Precision Context Engine.',
        items: [
          {
            num: '01',
            gradient: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 40%, #0a4a6e 100%)',
            title: 'Context and Knowledge',
            desc: 'The foundation layer: knowledge hubs, semantic data graphs, and context-aware AI that ensure every deployment knows your environment before it starts.',
            features: ['Radiant Knowledge Hub', 'Semantic Data Graph', 'KAG', 'Context-Aware AI'],
          },
          {
            num: '02',
            gradient: 'linear-gradient(135deg, #1a0800 0%, #3d1500 40%, #8b3000 100%)',
            title: 'Intelligence and Automation',
            desc: 'Natural language data access, orchestrated agents, and predictive analytics that turn context into action and outcomes.',
            features: ['Talk to Data', 'Agentic Orchestration', 'Predictive Analytics'],
          },
          {
            num: '03',
            gradient: 'linear-gradient(135deg, #001a00 0%, #003300 40%, #006600 100%)',
            title: 'Operations and Governance',
            desc: 'AIOps, autonomous infrastructure, data fabric, and AI FinOps: the operational layer that ensures every deployment is governed, observable, and cost-efficient.',
            features: ['Radiant AIOps', 'Autonomous Stack', 'Radiant Data Fabric', 'AI-RAD', 'AI FinOps'],
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
        title: 'AI Fabric: AI infused into everything we do.',
        subtitle: 'AI Fabric is not a product. It is the way Radiant operates. Every practice runs with AI embedded: not bolted on.',
        items: [
          { name: 'Digital Strategy and Experience', metric: 'AI-driven insight and automation', accent: '#91C46B' },
          { name: 'Product Development and Integration', metric: 'AI-enabled delivery', accent: '#F0974E' },
          { name: 'Cloud Transformation', metric: 'AI-optimized infrastructure', accent: '#596AE0' },
          { name: 'Analytics, Data Science and AI', metric: 'Real-time intelligence', accent: '#2DD4BF' },
          { name: 'Organizational Transformation', metric: 'AI enablement', accent: '#a855f7' },
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
        type: 'text',
        title: 'Radiant deploys AI. We do not build models. We build the context that makes models perform.',
        body: 'Most firms arrive at your door with the same tools. The difference is what happens before deployment. Radiant constructs a precision context environment: built from your systems, your domain, your constraints: so that AI produces accurate, auditable, client-specific outputs on the first pass. Not after months of calibration. That is the Precision Context Engine. And it is why the organizations that have deployed with Radiant do not run pilots. They run production.',
        accent: '#91C46B',
      },
      {
        type: 'metrics',
        title: 'The Proof',
        items: [
          { value: '40%', label: 'Avg Cost Reduction' },
          { value: '6 Weeks', label: 'Kickoff to Production' },
          { value: '29', label: 'Telecom AI Use Cases Mapped' },
        ],
        accent: '#596AE0',
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
  'What have you done for telecom enterprises?',
  'How does the Precision Context Engine work?',
  'Show me your legacy modernization proof.',
  'What would a 6-week deployment look like for us?',
  'Which industries do you serve?',
  'What solutions do you offer?',
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
