/**
 * Knowledge base powering the conversational AI experience.
 *
 * SYNC MECHANISM: Content is imported from siteContent.js — the single source
 * of truth shared with homepage components. Update siteContent.js and both
 * the homepage AND chat will reflect the change automatically.
 */
import {
  brand,
  heroMetrics,
  proofPoints,
  trustStats,
  precisionContextEngine,
  telecomCaseStudy,
  socialProof,
  aiFabric,
  solutions as solutionsData,
  markets,
  contact as contactData,
} from './siteContent.js'

const knowledgeBase = [
  {
    id: 'what-is-radiant',
    keywords: ['what is radiant', 'about radiant', 'who is radiant', 'radiant ai', 'what do you do', 'company', 'precision context engine', 'pce', 'context engine', 'how does radiant work', 'tell me about radiant', 'overview', 'introduction', 'about the company', 'what does radiant do', 'digital transformation', 'enterprise transformation', 'ai transformation'],
    question: `What is ${brand.name}?`,
    cards: [
      {
        type: 'hero',
        title: brand.tagline,
        subtitle: brand.description,
        accent: '#91C46B',
      },
      {
        type: 'metrics',
        title: 'By the Numbers',
        items: heroMetrics,
        accent: '#596AE0',
      },
      {
        type: 'text',
        title: 'The Precision Context Engine',
        body: `${precisionContextEngine.bodyRight} ${precisionContextEngine.conclusion}`,
        accent: '#F0974E',
      },
      {
        type: 'pce-diagram',
      },
    ],
    followUp: [
      'What solutions does Radiant Digital offer?',
      'Show me proof and case studies',
      'How does the Precision Context Engine work?',
      'Which industries do you serve?',
    ],
  },
  {
    id: 'solutions',
    keywords: ['solutions', 'products', 'what do you offer', 'what solutions', 'offerings', 'tools', 'seven solutions', 'solutions does radiant', 'all solutions', 'already built', 'what have you built', 'have you already built', 'capabilities', 'features', 'what can you do', 'your products', 'show me solutions', 'list of solutions'],
    question: `What solutions does ${brand.name} offer?`,
    cards: [
      {
        type: 'solutions',
        title: 'Purpose-built for your problem. Grounded in your context.',
        subtitle: `Each solution targets a specific enterprise challenge. Every one is powered by the ${brand.platformName}: foundational capabilities that ensure your AI knows your environment before it starts.`,
        items: solutionsData.map(s => ({
          num: s.num,
          title: s.title,
          label: s.label,
          accent: s.accent,
          screenshot: s.screenshot,
          desc: s.desc,
          tags: s.tags,
          details: s.details,
        })),
      },
    ],
    followUp: [
      'Tell me about ICX AI',
      'Tell me about Touchless IT Operations',
      'Tell me about Design-to-Code Modernization',
      'Show me case studies',
    ],
  },
  {
    id: 'sol-enterprise-icx',
    keywords: ['enterprise icx', 'cx intelligence', 'icx platform', 'customer signals', 'churn reduction', 'nps', 'csat', 'customer satisfaction', 'net promoter', 'customer experience platform'],
    question: 'Tell me about ICX AI',
    cards: [
      {
        type: 'hero',
        title: 'ICX AI: CX Intelligence Platform',
        subtitle: 'Unifies every customer signal into a single intelligence layer, giving your teams the predictive power to eliminate friction before it becomes churn.',
        accent: '#91C46B',
      },
      {
        type: 'metrics',
        title: 'ICX AI Impact',
        items: [
          { value: '20%', label: 'Churn Reduction' },
          { value: '94.2', label: 'CSAT Score' },
          { value: '+18', label: 'NPS Improvement' },
          { value: '2.1s', label: 'Avg Response Time' },
        ],
        accent: '#91C46B',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'ICX AI is powered by Semantic Data Graph, Context-Aware AI, Predictive Analytics and Time Series, and Radiant Knowledge Hub. It provides unified data across all CX touchpoints, proactive friction detection, insight-to-ROI pipeline, and real-time experience monitoring.',
        accent: '#91C46B',
      },
      {
        type: 'screenshot',
        src: '/screenshots/enterprise-icx.png',
        alt: 'ICX AI Dashboard',
        label: 'ICX AI Dashboard',
        accent: '#91C46B',
      },
    ],
    followUp: [
      'Tell me about Customer Journey Intelligence',
      'Tell me about Anomaly Detection',
      'Show me case studies',
      'How does the platform work?',
    ],
  },
  {
    id: 'sol-journey-intelligence',
    keywords: ['customer journey intelligence', 'journey intelligence', 'interaction tagging', 'journey visualization', 'figma analysis'],
    question: 'Tell me about Customer Journey Intelligence',
    cards: [
      {
        type: 'hero',
        title: 'Customer Journey Intelligence',
        subtitle: 'Accelerates the analysis of customer interactions across digital channels, enabling teams to visualize journeys and act on experience insights in hours, not weeks.',
        accent: '#F0974E',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Turns screen-level behavioral data into actionable journey maps using AI-powered pattern recognition and business rule mapping. Powered by Context-Aware AI, Radiant Knowledge Hub, and Semantic Data Graph.',
        accent: '#F0974E',
      },
      {
        type: 'screenshot',
        src: '/screenshots/cx-workbench.png',
        alt: 'Customer Journey Intelligence Dashboard',
        label: 'Customer Journey Intelligence',
        accent: '#F0974E',
      },
    ],
    followUp: [
      'Tell me about ICX AI',
      'Tell me about Design-to-Code Modernization',
      'Show me case studies',
      'What solutions does Radiant Digital offer?',
    ],
  },
  {
    id: 'sol-design-to-code',
    keywords: ['design-to-code', 'legacy modernization', 'design to code', 'modernization', 'legacy applications', 'ai-rad', 'd2c', 'legacy apps', 'legacy systems'],
    question: 'Tell me about Design-to-Code Modernization',
    cards: [
      {
        type: 'hero',
        title: 'Design-to-Code Modernization',
        subtitle: 'Transforms legacy enterprise applications into modern, design-system-compliant environments. Not wireframes in months. Working, auditable output in days per module.',
        accent: '#00c87d',
      },
      {
        type: 'metrics',
        title: 'Modernization Impact',
        items: [
          { value: 'Days', label: 'Per Module Output' },
          { value: 'Months', label: 'Reduced to Days' },
          { value: '100%', label: 'Auditable Pipeline' },
        ],
        accent: '#00c87d',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Powered by AI-RAD, Radiant Knowledge Hub, and Context-Aware AI. Analyzes legacy applications, decomposes them into modules, and generates design-system-compliant code with full audit trails.',
        accent: '#00c87d',
      },
      {
        type: 'screenshot',
        src: '/screenshots/design-to-code.png',
        alt: 'Design-to-Code Before and After',
        label: 'Legacy to Modern: Before and After',
        accent: '#00c87d',
      },
    ],
    followUp: [
      'Tell me about Anomaly Detection',
      'Tell me about Automarc AI',
      'Show me case studies',
      'How does the platform work?',
    ],
  },
  {
    id: 'sol-anomaly-detection',
    keywords: ['anomaly detection', 'anomaly', 'pattern detection', 'revenue protection', 'accuracy', 'anomalies', 'outlier detection', 'fraud detection', 'risk detection', 'irregular patterns', 'revenue assurance', 'revenue leakage', 'billing intelligence', 'billing anomaly', 'billing issues'],
    question: 'Tell me about Anomaly Detection',
    cards: [
      {
        type: 'hero',
        title: 'Anomaly Detection and Proactive Risk Prevention',
        subtitle: 'Detects anomalies across any data stream, groups them into actionable patterns, and guides teams to resolve issues before they escalate — protecting revenue, operations, and trust at enterprise scale.',
        accent: '#596AE0',
      },
      {
        type: 'metrics',
        title: 'Anomaly Detection Impact',
        items: [
          { value: '98%', label: 'Detection Accuracy' },
          { value: '5%', label: 'Revenue Leakage Recovered' },
          { value: '55%', label: 'LLM Cost Reduction' },
          { value: '6 wks', label: 'To Production' },
        ],
        accent: '#596AE0',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Powered by Predictive Analytics and Time Series, Radiant Knowledge Hub, Agentic AI and Multi-Agent Orchestration, and Semantic Data Graph. Real-time anomaly detection across billing, logistics, authentication, and operational data — with intelligent pattern grouping, guided resolution workflows, and proactive issue prevention.',
        accent: '#596AE0',
      },
      {
        type: 'screenshot',
        src: '/screenshots/anomaly-detection.png',
        alt: 'Anomaly Detection Dashboard',
        label: 'Anomaly Detection',
        accent: '#596AE0',
      },
    ],
    followUp: [
      'Tell me about Product Launch Risk Intelligence',
      'Tell me about ICX AI',
      'Show me proof and case studies',
      'How does the platform work?',
    ],
  },
  {
    id: 'sol-launch-risk',
    keywords: ['product launch risk', 'launch risk intelligence', 'launch intelligence', 'go no-go', 'device launch'],
    question: 'Tell me about Product Launch Risk Intelligence',
    cards: [
      {
        type: 'hero',
        title: 'Product Launch Risk Intelligence',
        subtitle: 'Integrates sales, returns, quality, and customer data to predict launch risk, identify root causes, and provide AI-driven go/no-go recommendations before and after launch.',
        accent: '#F05030',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Turns fragmented operational signals into a single pre-launch decision engine. Powered by Semantic Data Graph, Predictive Analytics and Time Series, Radiant Knowledge Hub, and Context-Aware AI.',
        accent: '#F05030',
      },
      {
        type: 'screenshot',
        src: '/screenshots/launch-risk-v2.png',
        alt: 'Product Launch Risk Intelligence',
        label: 'Launch Risk Analysis',
        accent: '#F05030',
      },
    ],
    followUp: [
      'Tell me about Automarc AI',
      'Tell me about Anomaly Detection',
      'Show me case studies',
      'What solutions does Radiant Digital offer?',
    ],
  },
  {
    id: 'sol-automarc',
    keywords: ['automarc', 'automarc ai', 'document intelligence', 'document automation', 'technical writing'],
    question: 'Tell me about Automarc AI',
    cards: [
      {
        type: 'hero',
        title: 'Automarc AI: Document Intelligence',
        subtitle: 'Extracts, classifies, and processes content to reduce manual effort and improve accuracy, turning document-heavy operations into automated, governed workflows.',
        accent: '#a855f7',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Powered by Radiant Knowledge Hub, AI-RAD, and Agentic AI and Multi-Agent Orchestration. Automates content extraction, classification, document processing workflows, and technical writing at scale.',
        accent: '#a855f7',
      },
      {
        type: 'screenshot',
        src: '/screenshots/automarc.png',
        alt: 'Automarc AI Dashboard',
        label: 'Automarc AI: Document Intelligence',
        accent: '#a855f7',
      },
    ],
    followUp: [
      'Tell me about ICX AI',
      'Tell me about Design-to-Code Modernization',
      'Show me case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'sol-touchless-ops',
    keywords: ['touchless it operations', 'touchless operations', 'touchless ops', 'self-healing', 'autonomous operations', 'aiops', 'ai ops', 'observability', 'incident management', 'alert noise', 'alert fatigue', 'autonomous remediation', 'self healing infrastructure', 'predictive optimization', 'runbook', 'auto-resolve', 'downtime', 'downtime reduction', 'incident reduction'],
    question: 'Tell me about Touchless IT Operations',
    cards: [
      {
        type: 'hero',
        title: 'Touchless IT Operations: Autonomous Infrastructure',
        subtitle: 'Shifts enterprise IT from reactive incident management to autonomous, self-healing infrastructure. Unified observability, AI-driven root cause analysis, and predictive optimization work together so your teams resolve fewer incidents manually and prevent more before they ever occur.',
        accent: '#2DD4BF',
      },
      {
        type: 'metrics',
        title: 'Touchless Operations Impact',
        items: [
          { value: '80%', label: 'Alert Noise Reduction' },
          { value: '70%', label: 'Faster Incident Resolution' },
          { value: '50%', label: 'Incidents Auto-Resolved' },
        ],
        accent: '#2DD4BF',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Powered by Radiant AIOps, Autonomous Stack, Predictive Analytics and Time Series, and Context-Aware AI. Provides end-to-end observability across infrastructure, network, and application layers. AI-driven root cause analysis identifies issues in seconds. Autonomous remediation executes runbooks automatically. Predictive optimization prevents incidents before they occur.',
        accent: '#2DD4BF',
      },
      {
        type: 'screenshot',
        src: '/screenshots/touchless-ops.png',
        alt: 'Touchless Operations Dashboard',
        label: 'Touchless Operations Command Center',
        accent: '#2DD4BF',
      },
    ],
    followUp: [
      'Tell me about Anomaly Detection',
      'Tell me about ICX AI',
      'Show me case studies',
      'How does the platform work?',
    ],
  },
  {
    id: 'case-studies',
    keywords: ['case study', 'show me proof', 'proof not promises', 'results', 'roi', 'success', 'leading telecom', 'savings', 'proof', 'evidence', 'track record', 'show me results', 'real results', 'customer success', 'what have you achieved', 'outcomes'],
    question: 'Show me proof — not promises.',
    cards: [
      {
        type: 'case-study',
        title: `${telecomCaseStudy.client} Transformation`,
        subtitle: `${telecomCaseStudy.challenge} ${telecomCaseStudy.whatWeDid}`,
        client: telecomCaseStudy.client,
        clientDetail: telecomCaseStudy.clientDetail,
        metrics: telecomCaseStudy.metrics,
        quote: telecomCaseStudy.quote,
        quoteAuthor: telecomCaseStudy.quoteAuthor,
        accent: '#91C46B',
      },
      {
        type: 'case-study-grid',
        title: 'More AI Case Studies with Proof',
        subtitle: 'Every engagement below is AI-powered with measurable outcomes.',
        items: [
          { name: 'Scaling Telecom Service Capacity 5x', metric: '10x Processing Speed', detail: 'AI and RPA-driven platform for a Fortune 15 telecom — 18% MTTR reduction, 22% fewer missed SLAs, 5x service capacity.', industry: 'Telecom', accent: '#596AE0', image: '/images/server-room.jpg' },
          { name: 'AI-Powered Virtual Assistant for Guest Support', metric: '50% Efficiency', detail: 'RAG-based AI assistant for a global theme park — 35% guest engagement boost, 30% faster dev cycles.', industry: 'Hospitality', accent: '#F0974E', image: '/images/customer-support.jpg' },
          { name: 'AI-Accelerated Digital Platform Modernization', metric: '35% Faster', detail: 'AI-driven reverse engineering for a global web tech company — 30% cost reduction, test coverage from 30% to 70%.', industry: 'Web Services', accent: '#91C46B', image: '/images/team-collaboration.jpg' },
          { name: 'Industrial IoT with AI-Accelerated Delivery', metric: '60% Faster Launch', detail: 'AI-powered accelerators cut dev cycles from 4 weeks to 6 days — 45% cost reduction, 40% fewer post-prod issues.', industry: 'IoT', accent: '#2DD4BF', image: '/images/iot-technology.jpg' },
          { name: 'AI-Driven Outage Response & Integration', metric: '40% Faster Resolution', detail: 'Unified outage management on MERN stack for Fortune 15 telecom — 35% better notifications, 45% more scalable.', industry: 'Telecom', accent: '#596AE0', image: '/images/telecom-network.jpg' },
          { name: 'AI-Powered Network Intelligence', metric: '70% Less Dev Time', detail: '50+ screens in under 3 weeks using Design-to-Code Accelerator — IDG CIO 100 Award winner.', industry: 'Telecom', accent: '#596AE0', image: '/images/network-cables.jpg' },
          { name: 'Touchless Operations for Financial Services', metric: '80% Alert Reduction', detail: 'AI Ops with E2E Observability and self-healing systems — 70% faster incident resolution, 50% auto-resolved.', industry: 'Financial Services', accent: '#F0974E', image: '/images/corporate-building.jpg' },
        ],
        accent: '#596AE0',
      },
    ],
    followUp: [
      'Tell me about the Scaling Telecom case study',
      'Tell me about the Touchless Operations case study',
      'What solutions does Radiant Digital offer?',
      'How can I get started?',
    ],
  },
  {
    id: 'industries',
    keywords: ['industries', 'markets', 'sectors', 'government', 'healthcare', 'telecom', 'defense', 'education', 'financial', 'oil', 'gas', 'who do you serve', 'domain', 'my industry', 'work in my industry', 'do you work in', 'verticals', 'which sectors', 'what industries', 'serve my industry'],
    question: 'Which industries do you serve?',
    cards: [
      {
        type: 'industries',
        title: 'Built for Your Domain',
        subtitle: 'Every industry has its own rules, risks, and opportunities. We bring enterprise transformation shaped by deep sector expertise: so you scale faster, with governance built in from the start.',
        items: markets.map(m => ({
          title: m.title,
          icon: m.icon,
          accent: m.accent,
          gradientFrom: m.accent.replace(/^#/, '#') + '20',
          gradientTo: m.accent,
          image: m.image,
          clients: m.clients,
          desc: m.desc,
          metrics: m.metrics,
        })),
      },
    ],
    followUp: [
      'What have you done for telecom?',
      'What have you done for federal agencies?',
      'What have you done for healthcare?',
      'Show me case studies',
    ],
  },
  {
    id: 'platform',
    keywords: ['platform', 'technology', 'architecture', 'how does it work', 'under the hood', 'framework', 'agent', 'microagent', 'agentic', 'four platforms', 'radiant ai platform', 'what is the radiant ai platform', 'what is the platform', 'tech stack', 'how is it built', 'technical capabilities', 'foundational capabilities', 'data fabric', 'finops', 'ai finops', 'knowledge hub', 'semantic graph', 'kag'],
    question: 'How does the platform work?',
    cards: [
      {
        type: 'platforms',
        title: 'Foundational capabilities. The infrastructure beneath every solution.',
        subtitle: 'Radiant Digital does not deploy generic AI. Every solution is assembled from purpose-built platform capabilities: 12 components that cover context acquisition, synthesis, grounding, reasoning, orchestration, observability, and governance. This is the technical foundation of the Precision Context Engine.',
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
    followUp: [
      'What solutions does Radiant Digital offer?',
      'How secure is Radiant Digital?',
      'What technology partners power Radiant Digital?',
      'Show me case studies',
    ],
  },
  {
    id: 'infrastructure',
    keywords: ['infrastructure', 'tech stack', 'cloud', 'aws', 'azure', 'google', 'nvidia', 'openai', 'anthropic', 'partners', 'technology partners'],
    question: 'What technology partners power Radiant Digital?',
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
    followUp: [
      'How does the Radiant Digital AI Platform work?',
      'What solutions does Radiant Digital offer?',
      'How secure is Radiant Digital?',
      'How can I get started?',
    ],
  },
  {
    id: 'services',
    keywords: ['services', 'enablers', 'pillars', 'transformation', 'strategy', 'analytics', 'cloud', 'workforce', 'consulting', 'what services'],
    question: `What services does ${brand.name} provide?`,
    cards: [
      {
        type: 'list',
        title: `${aiFabric.kicker}: ${aiFabric.headline.replace(/\n/g, ' ')}`,
        subtitle: aiFabric.body,
        items: aiFabric.practices.map((p, i) => ({
          name: p.title,
          metric: p.desc,
          accent: ['#91C46B', '#F0974E', '#596AE0', '#2DD4BF', '#a855f7'][i],
        })),
        accent: '#596AE0',
      },
    ],
    followUp: [
      'How does the Radiant Digital AI Platform work?',
      'Which industries do you serve?',
      'Show me case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'security',
    keywords: ['security', 'compliance', 'cmmc', 'governance', 'audit', 'secure', 'trust', 'certifications', 'how secure', 'secure is radiant', 'human in the loop', 'human-in-the-loop', 'zero trust', 'audit trail', 'audit trails'],
    question: `How secure is ${brand.name}?`,
    cards: [
      {
        type: 'text',
        title: 'Governance Built In, Not Bolted On',
        body: `Enterprise-grade security with ${socialProof.compliance}. Every deployment includes full audit trails, human-in-the-loop oversight, and zero-trust architecture by default.`,
        accent: '#2DD4BF',
      },
      {
        type: 'metrics',
        title: 'Security and Trust',
        items: [
          { value: socialProof.compliance.replace(' compliant', '').toUpperCase(), label: 'Defense Ready' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: 'Zero-Trust', label: 'Architecture' },
          { value: 'Human-in-Loop', label: 'Governance' },
        ],
        accent: '#2DD4BF',
      },
      {
        type: 'metrics',
        title: 'By the Numbers',
        items: trustStats.map(s => ({ value: s.value, label: s.label })),
        accent: '#91C46B',
      },
    ],
    followUp: [
      'What solutions does Radiant Digital offer?',
      'How does the Radiant Digital AI Platform work?',
      'Show me case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'why-radiant',
    keywords: ['why radiant', 'differentiator', 'competitive', 'advantage', 'why choose', 'why choose radiant', 'what makes you different', 'what makes radiant different', 'better', 'unique', 'stand out', 'compared to', 'vs', 'versus', 'how are you different', 'why should i choose', 'cost reduction', 'reduce costs', 'save money', 'lower costs'],
    question: `Why choose ${brand.name}?`,
    cards: [
      {
        type: 'hero',
        title: brand.tagline,
        subtitle: brand.description,
        accent: '#91C46B',
      },
      {
        type: 'text',
        title: 'The Precision Context Engine',
        body: `${brand.differentiator} ${precisionContextEngine.bodyRight} ${precisionContextEngine.conclusion}`,
        accent: '#F0974E',
      },
      {
        type: 'pce-diagram',
      },
      {
        type: 'metrics',
        title: 'The Proof',
        items: heroMetrics,
        accent: '#596AE0',
      },
    ],
    followUp: [
      'What solutions does Radiant Digital offer?',
      'Show me case studies',
      'Which industries do you serve?',
      'How can I get started?',
    ],
  },
  {
    id: 'ai-readiness',
    keywords: ['ai-ready', 'ai ready', 'how ai-ready', 'ai readiness', 'readiness assessment', 'maturity', 'maturity assessment', 'how ready', 'assessment', 'my organization', 'where does my enterprise stand', 'ai readiness score', 'benchmark', 'how ai ready is my', 'ai ready is my company', 'is my organization ready', 'evaluate my organization', 'ai maturity level'],
    question: 'How AI-ready is my organization?',
    cards: [
      {
        type: 'hero',
        title: 'AI Readiness Assessment',
        subtitle: 'Five minutes. No signup. A prioritized roadmap that tells you where you are, where the gaps are, and which AI deployments would produce the fastest results.',
        accent: '#91C46B',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Our AI Readiness Assessment evaluates your organization across five maturity levels — from Reactive (manual processes, siloed data) to Leading (agentic AI, outcome-linked engagement). You will receive a score, a gap analysis, and a prioritized AI deployment roadmap tailored to your industry and current capabilities.',
        accent: '#596AE0',
      },
      {
        type: 'metrics',
        title: 'What You Get',
        items: [
          { value: '5 min', label: 'Assessment Duration' },
          { value: '5 Levels', label: 'Maturity Framework' },
          { value: 'Custom', label: 'AI Roadmap' },
          { value: 'Free', label: 'No Signup Needed' },
        ],
        accent: '#91C46B',
      },
      {
        type: 'text',
        title: 'The Five Maturity Levels',
        body: '1. Reactive — Manual processes, siloed data, no AI strategy.\n2. Emerging — Basic analytics, some automation, early experimentation.\n3. Defined — Unified data, journey mapping, AI pilots underway.\n4. Optimized — AI-driven operations, proactive CX, measurable ROI.\n5. Leading — Agentic AI at scale, outcome-linked engagement, governance built in.',
        accent: '#F0974E',
      },
    ],
    followUp: [
      'What solutions does Radiant Digital offer?',
      'Which industries do you serve?',
      'Show me proof — not promises.',
      'How can I get started?',
    ],
  },
  {
    id: 'contact',
    keywords: ['contact', 'demo', 'talk', 'call', 'meeting', 'get started', 'pricing', 'consultation', 'reach out', 'real person', 'talk to a real person', 'rather talk', 'speak to someone', 'schedule', 'book a meeting', 'email', 'phone number', 'address', 'office', 'how much does it cost', 'pricing information', 'cost of services', 'how much do you charge', 'connect with our team', 'connect with us', 'connect with radiant'],
    question: 'How can I get started?',
    cards: [
      {
        type: 'contact-details',
        title: 'Let\'s Start a Conversation',
        body: 'Reach out directly — our team is ready to discuss how AI can transform your enterprise operations.',
        email: contactData.email,
        phone: contactData.phone,
        address: contactData.address,
        offices: contactData.offices,
        social: contactData.social,
        accent: '#91C46B',
      },
    ],
    followUp: [
      'What is Radiant Digital?',
      'What solutions does Radiant Digital offer?',
      'Show me case studies',
      'Why choose Radiant Digital?',
    ],
  },
  {
    id: 'all-case-studies',
    keywords: ['case studies', 'all case studies', 'portfolio', 'all projects', 'show me all', 'full portfolio', 'all engagements', 'complete list', 'who has worked with you', 'what did they achieve', 'worked with you', 'clients', 'references', 'more case studies', 'show me more case studies', 'other case studies', 'other examples', 'more examples', 'more proof'],
    question: 'Show me your case studies and proof.',
    cards: [
      {
        type: 'text',
        title: 'AI-Powered Transformation — Proof Across Industries',
        body: 'Radiant Digital has delivered AI-driven transformation engagements across telecom, hospitality, web services, IoT, and enterprise operations. Here are our AI case studies with measurable outcomes.',
        accent: '#91C46B',
      },
      {
        type: 'case-study-grid',
        title: 'AI Case Studies',
        subtitle: 'Every engagement powered by AI, automation, or intelligent systems.',
        items: [
          { name: 'Scaling Telecom Service Capacity 5x', metric: '10x Processing Speed', detail: 'AI and RPA-driven platform for a Fortune 15 telecom — 18% MTTR reduction, 22% fewer missed SLAs, 5x service capacity.', industry: 'Telecom', accent: '#596AE0', image: '/images/server-room.jpg' },
          { name: 'AI-Powered Virtual Assistant', metric: '50% Efficiency', detail: 'RAG-based AI assistant for a global theme park — 35% guest engagement boost, 30% faster dev cycles.', industry: 'Hospitality', accent: '#F0974E', image: '/images/customer-support.jpg' },
          { name: 'AI-Accelerated Platform Modernization', metric: '35% Faster', detail: 'AI-driven reverse engineering for a global web tech company — 30% cost reduction, test coverage from 30% to 70%.', industry: 'Web Services', accent: '#91C46B', image: '/images/team-collaboration.jpg' },
          { name: 'Industrial IoT with AI Delivery', metric: '60% Faster Launch', detail: 'AI-powered accelerators cut dev cycles from 4 weeks to 6 days — 45% cost reduction, 40% fewer post-prod issues.', industry: 'IoT', accent: '#2DD4BF', image: '/images/iot-technology.jpg' },
          { name: 'AI-Driven Outage Response', metric: '40% Faster Resolution', detail: 'Unified outage management on MERN stack for Fortune 15 telecom — 35% better notifications, 45% more scalable.', industry: 'Telecom', accent: '#596AE0', image: '/images/telecom-network.jpg' },
          { name: 'AI-Powered Network Intelligence', metric: '70% Less Dev Time', detail: '50+ screens in under 3 weeks using Design-to-Code Accelerator — IDG CIO 100 Award winner.', industry: 'Telecom', accent: '#596AE0', image: '/images/network-cables.jpg' },
          { name: 'Revenue Assurance & Billing Intelligence', metric: '5% Leakage Recovered', detail: '98% billing accuracy with AI FinOps for a leading telecom company.', industry: 'Telecom', accent: '#91C46B', image: '/images/analytics-dashboard.jpg' },
          { name: 'Touchless Operations for Financial Services', metric: '80% Alert Reduction', detail: 'AI Ops with E2E Observability and self-healing systems — 70% faster incident resolution, 50% auto-resolved.', industry: 'Financial Services', accent: '#F0974E', image: '/images/corporate-building.jpg' },
        ],
        accent: '#91C46B',
      },
    ],
    followUp: [
      'What have you done for telecom?',
      'Tell me about the Leading Telecom Company case study',
      'What solutions does Radiant Digital offer?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-by-telecom',
    keywords: ['telecom enterprises', 'telecom industry', 'done for telecom', 'telecommunications', 'telecom work', 'telecom projects', 'carrier', 'data quality', 'data visibility'],
    question: 'What have you done for telecom enterprises?',
    cards: [
      {
        type: 'text',
        title: 'Telecom Case Studies',
        body: 'Radiant Digital has mapped 20+ AI use cases across the full telecom operating model. Here are our telecom engagements:',
        accent: '#596AE0',
      },
      {
        type: 'case-study-grid',
        title: 'Telecom Engagements',
        subtitle: 'From revenue assurance to network operations to sales velocity.',
        items: [
          { name: 'Scaling Telecom Service Capacity 5x', metric: '5x Capacity', detail: 'AI and RPA-driven platform — 18% MTTR reduction, 22% fewer missed SLAs, 10x processing speed.', industry: 'Telecom', accent: '#596AE0', image: '/images/server-room.jpg' },
          { name: 'AI-Driven Outage Response & Integration', metric: '40% Faster Resolution', detail: 'Unified outage management on MERN stack — 35% better notifications, 45% more scalable.', industry: 'Telecom', accent: '#596AE0', image: '/images/telecom-network.jpg' },
          { name: 'AI-Powered Network Intelligence', metric: '70% Less Dev Time', detail: '50+ screens in under 3 weeks using Design-to-Code Accelerator — IDG CIO 100 Award winner.', industry: 'Telecom', accent: '#596AE0', image: '/images/network-cables.jpg' },
          { name: 'Optimizing Application Development', metric: '50% Faster Releases', detail: 'Agile methodologies, CI/CD pipelines, and automated testing for a leading telecom provider.', industry: 'Telecom', accent: '#596AE0', image: '/images/team-collaboration.jpg' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'cs-by-federal',
    keywords: ['federal', 'done for federal', 'government work', 'federal government', 'federal projects', 'dod', 'hhs', 'dhs', 'treasury', 'federal agencies'],
    question: 'What have you done for federal agencies?',
    cards: [
      {
        type: 'text',
        title: 'Federal Government Case Studies',
        body: 'Radiant Digital has delivered mission-critical enterprise transformation for federal agencies including DoD, HHS, DHS, Treasury, Commerce, and Interior.',
        accent: '#596AE0',
      },
      {
        type: 'case-study-grid',
        title: 'Federal Engagements',
        subtitle: 'Program-grade delivery with human-in-the-loop governance.',
        items: [
          { name: 'Systems Assurance for USCIS', metric: '99.9% Uptime', detail: 'Mission-critical immigration systems — 100% compliance met, 35% infrastructure cost savings.', industry: 'Federal', accent: '#596AE0', image: '/images/federal-government.jpg' },
          { name: 'Scalable Design System for HHS', metric: '60% Faster Handoff', detail: 'Unified component library — 200+ components built, 100% brand consistency.', industry: 'Federal', accent: '#596AE0', image: '/images/team-collaboration.jpg' },
          { name: 'Head Start Reporting for OHS', metric: '70% Faster', detail: 'Improved data accuracy and streamlined federal reporting workflows for early childhood programs.', industry: 'Federal', accent: '#596AE0', image: '/images/analytics-dashboard.jpg' },
          { name: 'Federal Operations with Digital Innovation', metric: '40% Faster Delivery', detail: 'Modernized legacy systems, automated manual workflows — 35% cost savings, 70% process automated.', industry: 'Federal', accent: '#596AE0', image: '/images/corporate-building.jpg' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'cs-by-state',
    keywords: ['state government', 'state local', 'florida', 'done for state', 'state projects', 'dcf', 'deo', 'dot', 'flhsmv'],
    question: 'What have you done for state government?',
    cards: [
      {
        type: 'text',
        title: 'State & Local Government Case Studies',
        body: 'Radiant Digital delivers citizen-centric transformation for state agencies. Here are our state government engagements:',
        accent: '#91C46B',
      },
      {
        type: 'case-study-grid',
        title: 'State Government Engagements',
        subtitle: 'Better outcomes on constrained budgets.',
        items: [
          { name: 'Florida DCF Accountability Audit', metric: '30% Improved', detail: 'Comprehensive system audit — process gap identification, modernization roadmap, 25% cost savings.', industry: 'State Gov', accent: '#91C46B', image: '/images/corporate-building.jpg' },
          { name: 'Florida DEO Reemployment Modernization', metric: '70% Faster', detail: 'Streamlined benefits processing, reduced wait times — 30% cost savings, +25% citizen CSAT.', industry: 'State Gov', accent: '#91C46B', image: '/images/team-collaboration.jpg' },
          { name: 'FLHSMV Test Data Management', metric: '50% Faster', detail: 'Optimized testing efficiency and data quality across critical transportation systems.', industry: 'State Gov', accent: '#91C46B', image: '/images/analytics-dashboard.jpg' },
          { name: 'Florida DOT Disaster Recovery', metric: '99.9% RTO', detail: 'Comprehensive DR plan for state-wide HCI server infrastructure — 4hr RTO achieved.', industry: 'State Gov', accent: '#91C46B', image: '/images/server-room.jpg' },
        ],
        accent: '#91C46B',
      },
    ],
  },
  {
    id: 'cs-by-healthcare',
    keywords: ['healthcare', 'health', 'done for healthcare', 'health projects', 'medical', 'clinical', 'digital health', 'life sciences', 'nih', 'public health'],
    question: 'What have you done for healthcare?',
    cards: [
      {
        type: 'text',
        title: 'Healthcare & Life Sciences Case Studies',
        body: 'Radiant Digital builds privacy-first digital health platforms with HIPAA governance built in. Here are our healthcare engagements:',
        accent: '#e05990',
      },
      {
        type: 'case-study-grid',
        title: 'Healthcare Engagements',
        subtitle: 'From clinical workflows to public health innovation.',
        items: [
          { name: 'STARTing Strong: HIV Treatment Adherence', metric: '88% Adherence', detail: 'Digital health intervention platform — medication reminders, peer support, culturally responsive design.', industry: 'Healthcare', accent: '#e05990', image: '/images/healthcare.jpg' },
          { name: 'Brighter Bites: Healthy Food Access', metric: '3x Reach', detail: 'Digital platform for healthy food distribution — volunteer coordination, 50% less admin work.', industry: 'Healthcare', accent: '#e05990', image: '/images/customer-support.jpg' },
          { name: 'Quit4Health: Smarter Way to Quit', metric: '2.5x Quit Rate', detail: 'Behavioral science and personalized AI coaching — 85% daily engagement, 40K+ users enrolled.', industry: 'Healthcare', accent: '#e05990', image: '/images/iot-technology.jpg' },
          { name: 'QuitBuddy: Social Support for Quitting', metric: '70% Retention', detail: 'Peer motivation platform with AI-driven nudges — 2x better outcomes, 15K+ buddy pairs.', industry: 'Healthcare', accent: '#e05990', image: '/images/team-collaboration.jpg' },
          { name: 'mySmartSkin: Skin Cancer Monitoring', metric: '3x Detection', detail: 'Mobile health platform for survivors — AI-powered risk assessments, 90% adherence rate.', industry: 'Healthcare', accent: '#e05990', image: '/images/analytics-dashboard.jpg' },
          { name: 'MY Health: Young Adult Health', metric: '75% Engaged', detail: 'Digital wellness platform — personalized health tracking, insurance navigation, preventive care.', industry: 'Healthcare', accent: '#e05990', image: '/images/corporate-building.jpg' },
          { name: 'Pocket Ark: PPE Training', metric: '95% Completion', detail: 'Mobile training platform — interactive modules, AI recommendations, 60% faster training.', industry: 'Healthcare', accent: '#e05990', image: '/images/server-room.jpg' },
        ],
        accent: '#e05990',
      },
    ],
  },
  {
    id: 'cs-by-oil-gas',
    keywords: ['oil gas', 'oil and gas', 'energy', 'done for oil', 'halliburton work', 'oil field', 'offshore', 'predictive maintenance', 'connected worker', 'field operations', 'noble corporation'],
    question: 'What have you done for oil and gas?',
    cards: [
      {
        type: 'text',
        title: 'Oil & Gas Case Studies',
        body: 'Radiant Digital delivers connected worker safety, predictive maintenance, and digital asset intelligence for energy companies.',
        accent: '#F0974E',
      },
      {
        type: 'case-study-grid',
        title: 'Oil & Gas Engagements',
        subtitle: 'Remote operations and field intelligence.',
        items: [
          { name: 'Transforming Oil Field Solutions with Halliburton', metric: '60% Uplift', detail: 'Digital asset integration and AR solutions — real-time equipment data, improved operational safety.', industry: 'Oil & Gas', accent: '#F0974E', image: '/images/oil-gas.jpg' },
          { name: 'Halliburton AR Oil Field Tool', metric: '45% Faster', detail: 'AR application for field technicians — real-time diagnostics, guided maintenance, 60% error reduction.', industry: 'Oil & Gas', accent: '#F0974E', image: '/images/iot-technology.jpg' },
          { name: 'Industrial IoT with AI-Accelerated Delivery', metric: '60% Faster Launch', detail: 'AI-powered accelerators cut dev cycles from 4 weeks to 6 days — 45% cost reduction.', industry: 'IoT', accent: '#2DD4BF', image: '/images/server-room.jpg' },
        ],
        accent: '#F0974E',
      },
    ],
  },
  {
    id: 'cs-by-financial',
    keywords: ['financial', 'financial services', 'banking', 'done for financial', 'credit union', 'insurance', 'bfsi'],
    question: 'What have you done for financial services?',
    cards: [
      {
        type: 'text',
        title: 'Financial Services Case Studies',
        body: 'Radiant Digital delivers AI for fraud detection, compliance automation, and customer journey transformation for financial institutions.',
        accent: '#F0974E',
      },
      {
        type: 'case-study-grid',
        title: 'Financial Services Engagements',
        subtitle: 'With audit trails from day one.',
        items: [
          { name: 'Touchless Operations for Financial Services', metric: '80% Alert Reduction', detail: 'AI Ops with E2E Observability and self-healing systems — 70% faster incident resolution, 50% auto-resolved.', industry: 'Financial Services', accent: '#F0974E', image: '/images/corporate-building.jpg' },
          { name: 'Navy Federal Credit Union Modernization', metric: '40% Faster', detail: 'Legacy application modernization — improved member experience, enhanced security posture.', industry: 'Financial Services', accent: '#F0974E', image: '/images/analytics-dashboard.jpg' },
        ],
        accent: '#F0974E',
      },
    ],
  },
  {
    id: 'cs-touchless-ops',
    keywords: ['touchless operations', 'financial services', 'autonomous operations', 'alert noise', 'self-healing', 'ai ops', 'touchless', 'finserv ops', 'incident management'],
    question: 'Tell me about the Touchless Operations case study',
    cards: [
      {
        type: 'case-study',
        title: 'Touchless Operations for Financial Services',
        subtitle: 'A leading financial services enterprise faced unsustainable operational costs driven by manual incident management, fragmented monitoring, and growing alert fatigue across its IT stack. With enterprise downtime costing over $300K per hour, the client needed to shift its operating model. Radiant Digital deployed its Touchless Operations solution combining E2E Observability with an Autonomous Stack spanning infrastructure, network, agents, applications, and data layers. Self-healing systems and predictive optimization automated remediation workflows, shifting operations from reactive firefighting to autonomous management.',
        client: 'Leading Financial Services Enterprise',
        clientDetail: 'Financial Services',
        metrics: [
          { value: '80%', label: 'Alert Noise Reduction via AI Ops' },
          { value: '70%', label: 'Faster Incident Resolution' },
          { value: '50%', label: 'Incidents Auto-Resolved' },
          { value: '$300K+/hr', label: 'Downtime Cost Addressed' },
        ],
        quote: 'Manual operations are unsustainable. Touchless Operations is not optional. It is inevitable.',
        quoteAuthor: 'Leading Financial Services Enterprise',
        accent: '#F0974E',
      },
    ],
    followUp: [
      'Tell me about the Scaling Telecom Service Capacity 5x case study',
      'Show me all case studies',
      'What solutions does Radiant Digital offer?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-telecom-5x',
    keywords: ['scaling telecom', 'service capacity', '5x', 'intelligent automation', 'telecom capacity', 'scaling telecom service capacity 5x with intelligent automation', 'rpa', 'robotic process automation', 'mttr', 'tell me about the scaling telecom case study', 'scaling telecom case study', 'scaling telecom service capacity'],
    question: 'Tell me about the Scaling Telecom Service Capacity 5x case study',
    cards: [
      {
        type: 'case-study',
        title: 'Scaling Telecom Service Capacity 5x with Intelligent Automation',
        subtitle: 'A Fortune 15 telecom company needed a robust platform combining infrastructure, security, governance, and advanced AI/ML capabilities to manage network provisioning, engineering, service delivery, and assurance operations. Radiant Digital developed an AI and RPA-driven platform through iterative product development, AI/ML integration, and RPA training.',
        client: 'Fortune 15 Telecom Company',
        clientDetail: 'Telecommunications',
        metrics: [
          { value: '5x', label: 'Service Capacity' },
          { value: '18%', label: 'MTTR Reduction' },
          { value: '10x', label: 'Processing Speed' },
        ],
        accent: '#596AE0',
      },
    ],
    followUp: [
      'Tell me about the Improving Outage Response case study',
      'Tell me about the Enabling Network Intelligence case study',
      'What have you done for telecom?',
      'What solutions does Radiant Digital offer?',
    ],
  },
  {
    id: 'cs-hospitality-ai',
    keywords: ['guest support', 'hospitality', 'virtual assistant', 'ai-powered assistant', 'improving guest support in hospitality', 'rag', 'retrieval augmented generation', 'theme park'],
    question: 'Tell me about the Improving Guest Support case study',
    cards: [
      {
        type: 'case-study',
        title: 'Improving Guest Support in Hospitality with an AI-Powered Virtual Assistant',
        subtitle: 'A global theme park and resort organization partnered with Radiant Digital to enhance its digital ecosystem and guest experience. Radiant implemented UX/UI design services extending the client\'s Global Design System and built an AI Virtual Assistant prototype using RAG-based architecture with OpenAI LLM to streamline guest support.',
        client: 'Global Theme Park & Resort',
        clientDetail: 'Hospitality',
        metrics: [
          { value: '50%', label: 'Support Efficiency' },
          { value: '35%', label: 'Guest Engagement' },
          { value: '30%', label: 'Faster Dev Cycles' },
        ],
        accent: '#F0974E',
      },
    ],
    followUp: [
      'Tell me about ICX AI',
      'Show me all case studies',
      'Which industries do you serve?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-web-modernization',
    keywords: ['modernizing digital platforms', 'web services', 'ai-accelerated delivery', 'modernizing digital platforms with ai-accelerated', 'ai-accelerated digital platform modernization', 'digital platform modernization', 'ai-accelerated platform modernization', 'reverse engineering', '.net modernization', 'angular modernization'],
    question: 'Tell me about the AI-Accelerated Digital Platform Modernization case study',
    cards: [
      {
        type: 'case-study',
        title: 'Modernizing Digital Platforms in Web Services with AI-Accelerated Delivery',
        subtitle: 'A global web technology company faced high maintenance expenses from outdated .NET architecture and prolonged release cycles. Radiant Digital deployed AI-driven reverse engineering, automated documentation, API modernization, and code generation scaffolding Angular 18 frontends and Java/Spring Boot backends with 2,500+ lines of generated code.',
        client: 'Global Web Technology Company',
        clientDetail: 'Web Services',
        metrics: [
          { value: '35%', label: 'Faster Time-to-Market' },
          { value: '30%', label: 'Cost Reduction' },
          { value: '40%', label: 'Less QA Effort' },
        ],
        accent: '#91C46B',
      },
    ],
    followUp: [
      'Tell me about Design-to-Code Modernization',
      'Show me all case studies',
      'What solutions does Radiant Digital offer?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-iot-tracklynk',
    keywords: ['industrial iot', 'tracklynk', 'ai-accelerated product', 'iot product delivery', 'advancing industrial iot'],
    question: 'Tell me about the Advancing Industrial IoT case study',
    cards: [
      {
        type: 'case-study',
        title: 'Advancing Industrial IoT with AI-Accelerated Product Delivery',
        subtitle: 'A leading Industrial IoT provider\'s location intelligence platform faced legacy code bottlenecks and insufficient SMEs. Radiant Digital\'s Solutions Lab modernized the platform through AI-powered accelerators with containerized deployment, automating user story grooming, development, testing, and deployment via CI/CD pipelines and AI Ops.',
        client: 'Leading Industrial IoT Provider',
        clientDetail: 'Industrial IoT',
        metrics: [
          { value: '60%', label: 'Faster Feature Launch' },
          { value: '45%', label: 'Dev Cost Reduction' },
          { value: '40%', label: 'Less Post-Prod Issues' },
        ],
        accent: '#2DD4BF',
      },
    ],
    followUp: [
      'Tell me about the Halliburton case study',
      'Show me all case studies',
      'What have you done for oil and gas?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-outage-response',
    keywords: ['outage response', 'system integration', 'telecom outage', 'incident response', 'improving outage response', 'copilot', 'mern stack', 'north star architecture'],
    question: 'Tell me about the Improving Outage Response case study',
    cards: [
      {
        type: 'case-study',
        title: 'Improving Outage Response in Telecom with AI and System Integration',
        subtitle: 'A Fortune 15 telecom company struggled with data sync gaps between ticketing and outage management systems, causing delayed notifications to Federal (NORS) and PSAP agencies. Radiant Digital consolidated ticketing and outage notification into a unified system, deployed AI tools with Copilot, and rebuilt the platform on MERN stack aligned with the client\'s North Star Architecture.',
        client: 'Fortune 15 Telecom Company',
        clientDetail: 'Telecommunications',
        metrics: [
          { value: '40%', label: 'Faster Resolution' },
          { value: '35%', label: 'Better Notification' },
          { value: '45%', label: 'More Scalable' },
        ],
        accent: '#596AE0',
      },
    ],
    followUp: [
      'Tell me about the Scaling Telecom Service Capacity 5x case study',
      'Tell me about the Enabling Network Intelligence case study',
      'What have you done for telecom?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-florida-dcf',
    keywords: ['florida dcf', 'accountability system', 'children and families', 'state government audit', 'accountability system audit for florida'],
    question: 'Tell me about the Florida DCF Accountability System Audit case study',
    cards: [
      {
        type: 'case-study',
        title: 'Accountability System Audit for Florida DCF',
        subtitle: 'Radiant Digital conducted a comprehensive system audit for the Florida Department of Children and Families, identifying process gaps, recommending modernization pathways, and delivering a roadmap for improved accountability and compliance.',
        client: 'Florida DCF',
        clientDetail: 'State Government',
        metrics: [
          { value: '30%', label: 'Process Improvement' },
          { value: '100%', label: 'Compliance Achieved' },
          { value: '25%', label: 'Cost Savings' },
        ],
        accent: '#91C46B',
      },
    ],
    followUp: [
      'Tell me about the Florida DEO Reemployment case study',
      'What have you done for state government?',
      'Show me all case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-navy-federal',
    keywords: ['navy federal', 'nfcu', 'application modernization', 'credit union', 'navy federal credit union', 'application modernization for navy federal', 'navy federal case study', 'navy federal project', 'tell me about navy federal'],
    question: 'Tell me about the Navy Federal Credit Union case study',
    cards: [
      {
        type: 'case-study',
        title: 'Application Modernization for Navy Federal Credit Union',
        subtitle: 'Radiant Digital modernized legacy applications for Navy Federal Credit Union, transforming outdated systems into modern, scalable platforms. The engagement improved member experience, reduced processing times, and enhanced security posture.',
        client: 'Navy Federal Credit Union',
        clientDetail: 'Financial Services',
        metrics: [
          { value: '40%', label: 'Faster Processing' },
          { value: '+25', label: 'CSAT Improvement' },
          { value: '70%', label: 'Legacy Reduced' },
        ],
        accent: '#F0974E',
      },
    ],
    followUp: [
      'Tell me about the Touchless Operations case study',
      'What have you done for financial services?',
      'Show me all case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-halliburton',
    keywords: ['halliburton', 'oil field', 'digital asset', 'augmented reality', 'oil gas', 'transforming oil field solutions', 'tell me about the halliburton', 'halliburton case study'],
    question: 'Tell me about the Halliburton case study',
    cards: [
      {
        type: 'case-study',
        title: 'Transforming Oil Field Solutions with Halliburton',
        subtitle: 'Radiant Digital delivered digital asset integration and augmented reality solutions for Halliburton, enabling field workers to visualize equipment data in real-time, reducing maintenance errors and improving operational safety across remote sites.',
        client: 'Halliburton',
        clientDetail: 'Oil & Gas',
        metrics: [
          { value: '60%', label: 'Maintenance Uplift' },
          { value: '45%', label: 'Error Reduction' },
          { value: '99.9%', label: 'Safety Uptime' },
        ],
        accent: '#F0974E',
      },
    ],
    followUp: [
      'Tell me about the Halliburton AR case study',
      'What have you done for oil and gas?',
      'Show me all case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-uscis',
    keywords: ['uscis', 'systems assurance', 'technical services', 'federal immigration', 'systems assurance and technical services for uscis'],
    question: 'Tell me about the USCIS case study',
    cards: [
      {
        type: 'case-study',
        title: 'Systems Assurance and Technical Services for USCIS',
        subtitle: 'Radiant Digital provided systems assurance and technical services to USCIS, ensuring mission-critical immigration systems maintained uptime, security compliance, and performance standards across high-volume processing periods.',
        client: 'USCIS',
        clientDetail: 'Federal Government',
        metrics: [
          { value: '99.9%', label: 'System Uptime' },
          { value: '100%', label: 'Compliance Met' },
          { value: '35%', label: 'Infra Cost Savings' },
        ],
        accent: '#596AE0',
      },
    ],
    followUp: [
      'Tell me about the Head Start Reporting Systems case study',
      'Tell me about the Federal Operations case study',
      'What have you done for federal agencies?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-florida-deo',
    keywords: ['florida deo', 'reemployment', 'modernization', 'economic opportunity', 'florida deo reemployment assistance'],
    question: 'Tell me about the Florida DEO Reemployment case study',
    cards: [
      {
        type: 'case-study',
        title: 'Florida DEO Reemployment Assistance Modernization',
        subtitle: 'Radiant Digital modernized the Florida Department of Economic Opportunity\'s reemployment assistance systems, streamlining benefits processing, reducing wait times, and improving the citizen experience for unemployment services.',
        client: 'Florida DEO',
        clientDetail: 'State Government',
        metrics: [
          { value: '70%', label: 'Faster Processing' },
          { value: '30%', label: 'Cost Savings' },
          { value: '+25%', label: 'Citizen CSAT' },
        ],
        accent: '#91C46B',
      },
    ],
    followUp: [
      'Tell me about the Florida DCF Accountability System Audit case study',
      'Tell me about the FLHSMV Test Data Management case study',
      'What have you done for state government?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-quit4health',
    keywords: ['quit4health', 'quit smoking', 'smarter way to quit', 'smoking cessation', 'breaking free'],
    question: 'Tell me about the Quit4Health case study',
    cards: [
      {
        type: 'case-study',
        title: 'Quit4Health: The Smarter Way to Quit Smoking',
        subtitle: 'Radiant Digital built a digital health platform that uses behavioral science and personalized AI coaching to help users quit smoking. The app delivers tailored interventions, tracks progress, and connects users with support resources, resulting in significantly higher quit rates than traditional programs.',
        client: 'Public Health Initiative',
        clientDetail: 'Healthcare / Digital Health',
        metrics: [
          { value: '2.5x', label: 'Higher Quit Rate' },
          { value: '85%', label: 'Daily Engagement' },
          { value: '40K+', label: 'Users Enrolled' },
        ],
        accent: '#e05990',
      },
    ],
    followUp: [
      'Tell me about the Brighter Bites case study',
      'Tell me about the QuitBuddy case study',
      'What have you done for healthcare?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-brighter-bites',
    keywords: ['brighter bites', 'healthy food', 'food access', 'families'],
    question: 'Tell me about the Brighter Bites case study',
    cards: [
      {
        type: 'case-study',
        title: 'Brighter Bites: Bringing Healthy Food to Families, One Click at a Time',
        subtitle: 'Radiant Digital developed a digital platform for Brighter Bites to streamline healthy food distribution to underserved families. The platform manages volunteer coordination, produce inventory, and family engagement, expanding program reach while reducing operational overhead.',
        client: 'Brighter Bites',
        clientDetail: 'Healthcare / Nonprofit',
        metrics: [
          { value: '3x', label: 'Reach Expanded' },
          { value: '50%', label: 'Less Admin Work' },
          { value: '10K+', label: 'Families Served' },
        ],
        accent: '#e05990',
      },
    ],
    followUp: [
      'Tell me about the Quit4Health case study',
      'Tell me about the STARTing Strong case study',
      'What have you done for healthcare?',
      'How can I get started?',
    ],
  },
  {
    id: 'cs-quitbuddy',
    keywords: ['quitbuddy', 'social support', 'quitting', 'quit buddy'],
    question: 'Tell me about the QuitBuddy case study',
    cards: [
      {
        type: 'case-study',
        title: 'QuitBuddy: Because Quitting Is Easier with Friends',
        subtitle: 'Radiant Digital created QuitBuddy, a social support platform for smoking cessation that pairs users with accountability partners. The app leverages peer motivation, progress sharing, and AI-driven nudges to improve long-term quit success rates.',
        client: 'Public Health Initiative',
        clientDetail: 'Healthcare / Digital Health',
        metrics: [
          { value: '70%', label: 'Retention Rate' },
          { value: '2x', label: 'Better Outcomes' },
          { value: '15K+', label: 'Buddy Pairs' },
        ],
        accent: '#e05990',
      },
    ],
  },
  {
    id: 'cs-mysmartskin',
    keywords: ['mysmartskin', 'skin cancer', 'cancer survivor', 'monitoring', 'smart skin'],
    question: 'Tell me about the mySmartSkin case study',
    cards: [
      {
        type: 'case-study',
        title: 'mySmartSkin: Helping Skin Cancer Survivors Stay One Step Ahead',
        subtitle: 'Radiant Digital built mySmartSkin, a mobile health platform for skin cancer survivors to monitor skin changes, track dermatology appointments, and receive AI-powered risk assessments. The app empowers survivors with proactive health management tools.',
        client: 'Research Institution',
        clientDetail: 'Healthcare / Oncology',
        metrics: [
          { value: '90%', label: 'Adherence Rate' },
          { value: '3x', label: 'Earlier Detection' },
          { value: '5K+', label: 'Active Users' },
        ],
        accent: '#e05990',
      },
    ],
  },
  {
    id: 'cs-myhealth',
    keywords: ['my health', 'young adults', 'health management', 'young adult health'],
    question: 'Tell me about the MY Health case study',
    cards: [
      {
        type: 'case-study',
        title: 'MY Health: Helping Young Adults Take Charge of Their Health',
        subtitle: 'Radiant Digital developed MY Health, a digital wellness platform designed for young adults transitioning to independent healthcare management. The app provides personalized health tracking, insurance navigation, and preventive care reminders.',
        client: 'Healthcare Provider',
        clientDetail: 'Healthcare / Wellness',
        metrics: [
          { value: '75%', label: 'Engagement Rate' },
          { value: '40%', label: 'Better Adherence' },
          { value: '20K+', label: 'Users Onboarded' },
        ],
        accent: '#e05990',
      },
    ],
  },
  {
    id: 'cs-pocket-ark',
    keywords: ['pocket ark', 'ppe training', 'ppe', 'training platform', 'actionable'],
    question: 'Tell me about the Pocket Ark case study',
    cards: [
      {
        type: 'case-study',
        title: 'Pocket Ark: Making PPE Training Simple, Smart, and Actionable',
        subtitle: 'Radiant Digital created Pocket Ark, a mobile training platform that simplifies Personal Protective Equipment (PPE) education for healthcare and industrial workers. The app uses interactive modules, quizzes, and AI-driven recommendations to ensure compliance and safety.',
        client: 'Healthcare / Industrial',
        clientDetail: 'Healthcare / Safety Training',
        metrics: [
          { value: '95%', label: 'Completion Rate' },
          { value: '60%', label: 'Faster Training' },
          { value: '100%', label: 'Compliance Met' },
        ],
        accent: '#e05990',
      },
    ],
  },
  {
    id: 'cs-start-hiv',
    keywords: ['starting strong', 'hiv', 'treatment adherence', 'hiv-positive', 'start'],
    question: 'Tell me about the STARTing Strong case study',
    cards: [
      {
        type: 'case-study',
        title: 'STARTing Strong: Helping HIV-Positive Men Thrive with Better Treatment Adherence',
        subtitle: 'Radiant Digital built a digital health intervention platform to improve antiretroviral treatment adherence among HIV-positive men. The platform provides medication reminders, peer support connections, and health outcome tracking through a culturally responsive design.',
        client: 'Research University',
        clientDetail: 'Healthcare / Public Health',
        metrics: [
          { value: '88%', label: 'Adherence Rate' },
          { value: '70%', label: 'Daily Engagement' },
          { value: '2x', label: 'Better Outcomes' },
        ],
        accent: '#e05990',
      },
    ],
  },
  {
    id: 'cs-network-intelligence',
    keywords: ['network intelligence', 'enabling network', 'ai-powered development', 'telecom network', 'cio 100', 'cio award', 'award winner', 'cio 100 award'],
    question: 'Tell me about the Enabling Network Intelligence case study',
    cards: [
      {
        type: 'case-study',
        title: 'Enabling Network Intelligence in Telecom through AI-Powered Development',
        subtitle: 'A Fortune 15 telecom company needed to convert complex network data into actionable visualizations and enhance planning efficiency. Radiant Digital delivered 50+ responsive screens in under three weeks using its Design-to-Code Accelerator, with 132 unique UX screens, 10 user flows, and 100+ custom components — earning an IDG CIO 100 Award in 2024.',
        client: 'Fortune 15 Telecom Company',
        clientDetail: 'Telecommunications',
        metrics: [
          { value: '70%', label: 'Less Dev Time' },
          { value: '50+', label: 'Screens in 3 Weeks' },
          { value: '60%', label: 'Less Redundant Tasks' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'cs-flhsmv',
    keywords: ['flhsmv', 'test data management', 'florida highway', 'motor vehicles'],
    question: 'Tell me about the FLHSMV Test Data Management case study',
    cards: [
      {
        type: 'case-study',
        title: 'Enhancing Test Data Management at FLHSMV',
        subtitle: 'Radiant Digital optimized test data management for the Florida Highway Safety and Motor Vehicles department, improving testing efficiency, data quality, and release confidence across critical transportation systems.',
        client: 'Florida HSMV',
        clientDetail: 'State Government / Transportation',
        metrics: [
          { value: '50%', label: 'Faster Testing' },
          { value: '70%', label: 'Data Quality Lift' },
          { value: '30%', label: 'Cost Savings' },
        ],
        accent: '#91C46B',
      },
    ],
  },
  {
    id: 'cs-florida-dot',
    keywords: ['florida dot', 'disaster recovery', 'hci servers', 'transportation disaster'],
    question: 'Tell me about the Florida DOT Disaster Recovery case study',
    cards: [
      {
        type: 'case-study',
        title: 'Florida DOT Disaster Recovery Plan for HCI Servers',
        subtitle: 'Radiant Digital developed a comprehensive disaster recovery plan for the Florida Department of Transportation\'s state-wide HCI server infrastructure, ensuring business continuity and resilience for critical transportation systems.',
        client: 'Florida DOT',
        clientDetail: 'State Government / Transportation',
        metrics: [
          { value: '99.9%', label: 'Recovery Target' },
          { value: '4hr', label: 'RTO Achieved' },
          { value: '100%', label: 'Systems Covered' },
        ],
        accent: '#91C46B',
      },
    ],
  },
  {
    id: 'cs-scalable-analytics',
    keywords: ['modernizing infrastructure', 'scalable analytics', 'data-driven success'],
    question: 'Tell me about the Modernizing Infrastructure case study',
    cards: [
      {
        type: 'case-study',
        title: 'Modernizing Infrastructure for Scalable Analytics and Data-Driven Success',
        subtitle: 'Radiant Digital modernized a commercial enterprise\'s data infrastructure to support scalable analytics, migrating to cloud-native architecture and implementing real-time data pipelines that enabled faster, data-driven decision-making.',
        client: 'Commercial Enterprise',
        clientDetail: 'Commercial / ICT',
        metrics: [
          { value: '10x', label: 'Query Speed' },
          { value: '45%', label: 'Infra Cost Down' },
          { value: '99.9%', label: 'Uptime' },
        ],
        accent: '#2DD4BF',
      },
    ],
  },
  {
    id: 'cs-design-system',
    keywords: ['design system', 'scalable design', 'theme park', 'digital excellence', 'transforming digital excellence'],
    question: 'Tell me about the Scalable Design System case study',
    cards: [
      {
        type: 'case-study',
        title: 'Transforming Digital Excellence: A Scalable Design System',
        subtitle: 'Radiant Digital built a scalable design system for a global enterprise, creating a unified component library that accelerated development, ensured brand consistency, and reduced design-to-code handoff time by 60%.',
        client: 'Global Enterprise',
        clientDetail: 'Federal / HHS',
        metrics: [
          { value: '60%', label: 'Faster Handoff' },
          { value: '200+', label: 'Components Built' },
          { value: '100%', label: 'Brand Consistency' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'cs-head-start',
    keywords: ['head start', 'reporting systems', 'ohs', 'office of head start', 'enhancing head start'],
    question: 'Tell me about the Head Start Reporting Systems case study',
    cards: [
      {
        type: 'case-study',
        title: 'Enhancing Head Start Reporting Systems for OHS',
        subtitle: 'Radiant Digital enhanced the reporting systems for the Office of Head Start, improving data accuracy, streamlining federal reporting workflows, and enabling better oversight of early childhood education programs nationwide.',
        client: 'Office of Head Start',
        clientDetail: 'Federal / HHS',
        metrics: [
          { value: '70%', label: 'Faster Reporting' },
          { value: '100%', label: 'Compliance Met' },
          { value: '40%', label: 'Less Manual Work' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'cs-federal-ops',
    keywords: ['federal operations', 'digital innovation', 'transforming federal', 'dhs'],
    question: 'Tell me about the Federal Operations case study',
    cards: [
      {
        type: 'case-study',
        title: 'Transforming Federal Operations with Digital Innovation',
        subtitle: 'Radiant Digital partnered with a federal agency to transform operations through digital innovation, modernizing legacy systems, automating manual workflows, and improving service delivery to citizens.',
        client: 'Federal Agency',
        clientDetail: 'Federal / DHS',
        metrics: [
          { value: '40%', label: 'Faster Delivery' },
          { value: '35%', label: 'Cost Savings' },
          { value: '70%', label: 'Process Automated' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'cs-telecom-app-dev',
    keywords: ['optimizing application', 'telecom service provider', 'application development'],
    question: 'Tell me about the Optimizing Application Development case study',
    cards: [
      {
        type: 'case-study',
        title: 'Optimizing Application Development for a Leading Telecom Provider',
        subtitle: 'Radiant Digital optimized application development processes for a leading telecom service provider, introducing agile methodologies, CI/CD pipelines, and automated testing that reduced delivery cycles and improved code quality.',
        client: 'Telecom Provider',
        clientDetail: 'Telecommunications',
        metrics: [
          { value: '50%', label: 'Faster Releases' },
          { value: '80%', label: 'Test Automation' },
          { value: '40%', label: 'Defects Reduced' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'cs-world-table-tennis',
    keywords: ['world table tennis', 'sport', 'wtt', 'elevating the sport', 'entertainment'],
    question: 'Tell me about the World Table Tennis case study',
    cards: [
      {
        type: 'case-study',
        title: 'World Table Tennis: Elevating the Sport',
        subtitle: 'Radiant Digital partnered with World Table Tennis to build digital experiences that elevated fan engagement, improved event management, and brought the sport to new global audiences through modern digital platforms.',
        client: 'World Table Tennis',
        clientDetail: 'Entertainment / Sports',
        metrics: [
          { value: '3x', label: 'Fan Engagement' },
          { value: '50%', label: 'Faster Event Setup' },
          { value: '2M+', label: 'Digital Reach' },
        ],
        accent: '#a855f7',
      },
    ],
  },
  {
    id: 'cs-halliburton-ar',
    keywords: ['augmented reality app', 'halliburton ar', 'oil field tool', 'ar app'],
    question: 'Tell me about the Halliburton AR case study',
    cards: [
      {
        type: 'case-study',
        title: 'Augmented Reality App for Halliburton Oil Field Tool',
        subtitle: 'Radiant Digital built an augmented reality application for Halliburton that enables field technicians to visualize equipment internals, access real-time diagnostics, and follow guided maintenance procedures through AR overlays on physical equipment.',
        client: 'Halliburton',
        clientDetail: 'Oil & Gas / AR',
        metrics: [
          { value: '45%', label: 'Faster Maintenance' },
          { value: '60%', label: 'Error Reduction' },
          { value: '90%', label: 'User Adoption' },
        ],
        accent: '#F0974E',
      },
    ],
  },
  {
    id: 'persona-finder',
    keywords: ['right for my role', 'solutions for my role', 'which solutions', 'my role', 'for my role', 'cto', 'cdo', 'vp of cx', 'operations leader', 'what role', 'buyer', 'persona'],
    question: 'Which solutions are right for my role?',
    cards: [
      {
        type: 'text',
        title: 'Let Me Match Solutions to Your Role',
        body: 'Different leaders face different transformation challenges. Tell me which best describes you, and I will surface the Radiant Digital solutions most relevant to your priorities.',
        accent: '#91C46B',
      },
      {
        type: 'grid',
        title: 'What kind of leader are you?',
        clickable: true,
        columns: 2,
        items: [
          {
            icon: 'Cpu',
            title: 'CTO / VP of Engineering',
            accent: '#596AE0',
            desc: 'Platform modernization, cloud transformation, and scalable AI infrastructure.',
            query: "I'm a CTO / VP of Engineering",
          },
          {
            icon: 'BarChart3',
            title: 'CDO / VP of Data and Analytics',
            accent: '#91C46B',
            desc: 'Data-driven intelligence, billing anomaly detection, and AI-powered analytics.',
            query: "I'm a CDO / VP of Data and Analytics",
          },
          {
            icon: 'Users',
            title: 'VP of CX / Customer Experience',
            accent: '#F0974E',
            desc: 'Unified customer signals, journey intelligence, and experience optimization.',
            query: "I'm a VP of CX / Customer Experience",
          },
          {
            icon: 'Target',
            title: 'Operations Leader / COO',
            accent: '#a855f7',
            desc: 'Workflow automation, document intelligence, and operational efficiency at scale.',
            query: "I'm an Operations Leader / COO",
          },
        ],
      },
    ],
    followUp: [],
  },
  {
    id: 'persona-cto',
    keywords: ["i'm a cto", 'vp of engineering', 'cto / vp of engineering', "i'm a cto / vp"],
    question: "I'm a CTO / VP of Engineering",
    cards: [
      {
        type: 'text',
        title: 'Solutions for Engineering Leaders',
        body: 'As a CTO or VP of Engineering, your priorities are platform modernization, scalable AI infrastructure, and accelerating delivery without sacrificing quality. Here are the Radiant Digital solutions built for your challenges.',
        accent: '#596AE0',
      },
      {
        type: 'solutions',
        title: 'Recommended for Your Role',
        items: [
          {
            num: '01',
            title: 'Design-to-Code Modernization',
            label: 'Product Development and Integration',
            accent: '#00c87d',
            gradient: 'linear-gradient(135deg, #001208 0%, #003020 50%, #005838 100%)',
            screenshot: '/screenshots/design-to-code.png',
            desc: 'Transforms legacy enterprise applications into modern, design-system-compliant environments. Working, auditable output in days per module.',
            tags: ['Legacy Modernization', 'Design Systems', 'AI-RAD'],
            details: ['Legacy application analysis and decomposition', 'Design-system-compliant code generation', 'Working output in days per module', 'Auditable modernization pipeline'],
          },
          {
            num: '02',
            title: 'Automarc AI',
            label: 'Organizational Transformation',
            accent: '#a855f7',
            gradient: 'linear-gradient(135deg, #080014 0%, #160038 50%, #2a0068 100%)',
            screenshot: '/screenshots/automarc.png',
            desc: 'Extracts, classifies, and processes content to reduce manual effort and improve accuracy, turning document-heavy operations into automated, governed workflows.',
            tags: ['Documents', 'Automation', 'Technical Writing'],
            details: ['AI-powered content extraction and classification', 'Automated document processing workflows', 'Technical writing acceleration and consistency', 'Reduced manual effort with improved accuracy'],
          },
        ],
      },
    ],
    followUp: [
      'What is the Radiant Digital AI Platform?',
      'Show me proof, not promises.',
      'What have you already built?',
      "I'd rather talk to a real person.",
    ],
  },
  {
    id: 'persona-cdo',
    keywords: ["i'm a cdo", 'vp of data', 'data and analytics', "i'm a cdo / vp"],
    question: "I'm a CDO / VP of Data and Analytics",
    cards: [
      {
        type: 'text',
        title: 'Solutions for Data and Analytics Leaders',
        body: 'As a CDO or VP of Data and Analytics, you need AI that turns raw data into actionable intelligence, detects anomalies before they reach customers, and predicts risk with precision. Here is what Radiant Digital has built for you.',
        accent: '#91C46B',
      },
      {
        type: 'solutions',
        title: 'Recommended for Your Role',
        items: [
          {
            num: '01',
            title: 'Anomaly Detection',
            label: 'Analytics, Data Science and AI',
            accent: '#596AE0',
            gradient: 'linear-gradient(135deg, #050818 0%, #0c1040 50%, #1a2270 100%)',
            screenshot: '/screenshots/anomaly-detection.png',
            desc: 'Detects anomalies across any data stream, groups them into actionable patterns, and guides teams to resolve issues before they escalate — protecting revenue and operations at scale.',
            tags: ['Billing', 'Logistics', 'Authentication', 'Device Telemetry', 'Shipping', 'Fraud Detection', 'Revenue Protection'],
            details: ['Real-time anomaly detection across any data stream', 'Intelligent pattern grouping and classification', 'Guided resolution workflows for operations teams', 'Proactive issue prevention before business impact'],
          },
          {
            num: '02',
            title: 'Product Launch Risk Intelligence',
            label: 'Analytics, Data Science and AI',
            accent: '#F05030',
            gradient: 'linear-gradient(135deg, #180400 0%, #3d0e00 50%, #6b1a00 100%)',
            screenshot: '/screenshots/launch-risk-v2.png',
            desc: 'Integrates sales, returns, quality, and customer data to predict launch risk, identify root causes, and provide AI-driven go/no-go recommendations.',
            tags: ['Launch Risk', 'Predictive', 'Go/No-Go'],
            details: ['Integrated sales, returns, quality and customer data', 'Device launch risk prediction and scoring', 'AI-driven root cause identification', 'Go/no-go recommendations pre and post launch'],
          },
        ],
      },
    ],
    followUp: [
      'What is the Radiant Digital AI Platform?',
      'Show me proof, not promises.',
      'Do you work in my industry?',
      "I'd rather talk to a real person.",
    ],
  },
  {
    id: 'persona-cx',
    keywords: ["i'm a vp of cx", 'customer experience', 'vp of cx / customer', "i'm a vp of cx /"],
    question: "I'm a VP of CX / Customer Experience",
    cards: [
      {
        type: 'text',
        title: 'Solutions for Customer Experience Leaders',
        body: 'As a VP of CX, you need unified customer signals, journey intelligence, and the ability to act on experience insights in hours, not weeks. Here is what Radiant Digital has built for you.',
        accent: '#F0974E',
      },
      {
        type: 'solutions',
        title: 'Recommended for Your Role',
        items: [
          {
            num: '01',
            title: 'ICX AI',
            label: 'Digital Strategy and Experience',
            accent: '#91C46B',
            gradient: 'linear-gradient(135deg, #021a0c 0%, #043d18 50%, #0a6b2a 100%)',
            screenshot: '/screenshots/enterprise-icx.png',
            desc: 'Unifies every customer signal into a single intelligence layer, giving your teams the predictive power to eliminate friction before it becomes churn.',
            tags: ['Enterprise', 'CX', 'Insight-to-ROI'],
            details: ['Unified data platform across all CX touchpoints', 'Proactive friction detection and elimination', 'Insight-to-ROI pipeline with measurable outcomes', 'Real-time experience monitoring and alerting'],
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
            details: ['AI-accelerated interaction tagging on digital channels', 'Figma screen analysis with business rule engine', 'Customer journey visualization and mapping', 'Experience detail extraction and pattern recognition'],
          },
        ],
      },
    ],
    followUp: [
      'Who has worked with you and what did they achieve?',
      'What is the Radiant Digital AI Platform?',
      'What makes Radiant Digital different?',
      "I'd rather talk to a real person.",
    ],
  },
  {
    id: 'persona-ops',
    keywords: ["i'm an operations", 'operations leader', 'coo', "i'm an operations leader"],
    question: "I'm an Operations Leader / COO",
    cards: [
      {
        type: 'text',
        title: 'Solutions for Operations Leaders',
        body: 'As an Operations Leader or COO, you need workflow automation, document intelligence, and operational efficiency that scales. Here is what Radiant Digital has built for you.',
        accent: '#a855f7',
      },
      {
        type: 'solutions',
        title: 'Recommended for Your Role',
        items: [
          {
            num: '01',
            title: 'Automarc AI',
            label: 'Organizational Transformation',
            accent: '#a855f7',
            gradient: 'linear-gradient(135deg, #080014 0%, #160038 50%, #2a0068 100%)',
            screenshot: '/screenshots/automarc.png',
            desc: 'Extracts, classifies, and processes content to reduce manual effort and improve accuracy, turning document-heavy operations into automated, governed workflows.',
            tags: ['Documents', 'Automation', 'Technical Writing'],
            details: ['AI-powered content extraction and classification', 'Automated document processing workflows', 'Technical writing acceleration and consistency', 'Reduced manual effort with improved accuracy'],
          },
          {
            num: '02',
            title: 'ICX AI',
            label: 'Digital Strategy and Experience',
            accent: '#91C46B',
            gradient: 'linear-gradient(135deg, #021a0c 0%, #043d18 50%, #0a6b2a 100%)',
            screenshot: '/screenshots/enterprise-icx.png',
            desc: 'Unifies every customer signal into a single intelligence layer, giving your teams the predictive power to eliminate friction before it becomes churn.',
            tags: ['Enterprise', 'CX', 'Insight-to-ROI'],
            details: ['Unified data platform across all CX touchpoints', 'Proactive friction detection and elimination', 'Insight-to-ROI pipeline with measurable outcomes', 'Real-time experience monitoring and alerting'],
          },
        ],
      },
    ],
    followUp: [
      'Show me proof, not promises.',
      'What is the Radiant Digital AI Platform?',
      'Do you work in my industry?',
      "I'd rather talk to a real person.",
    ],
  },
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'howdy'],
    question: 'Hello!',
    cards: [
      {
        type: 'hero',
        title: `Welcome to ${brand.name} AI`,
        subtitle: 'I can help you explore our AI solutions, case studies, platform capabilities, and the industries we serve. Pick a topic below or ask me anything about enterprise AI transformation.',
        accent: '#91C46B',
      },
      {
        type: 'main-menu',
        title: 'What can we help you explore?',
        subtitle: 'Pick a topic below to get started.',
      },
    ],
    followUp: [],
  },
  {
    id: 'thank-you',
    keywords: ['thank you', 'thanks', 'appreciate it', 'that helps', 'thats all', "that's all", 'goodbye', 'bye', 'see you', 'cheers'],
    question: 'Thank you!',
    cards: [
      {
        type: 'text',
        title: 'Glad I could help!',
        body: `If you'd like to continue the conversation with our team, we're ready to help. You can reach us at ${contactData.email} or call ${contactData.phone}. Otherwise, feel free to come back anytime — I'm here whenever you need me.`,
        accent: '#91C46B',
      },
    ],
    followUp: [
      'How can I get started?',
      'What solutions does Radiant Digital offer?',
      'Show me the main menu',
    ],
  },
  {
    id: 'main-menu',
    keywords: ['main menu', 'show me the main menu', 'start over', 'menu', 'all options', 'what can you help with', 'home', 'go back', 'help', 'help me', 'what can you do', 'what can i ask'],
    question: 'Show me the main menu',
    cards: [
      {
        type: 'main-menu',
        title: 'What can we help you explore?',
        subtitle: 'Pick a topic below to get started.',
      },
    ],
    followUp: [],
  },
]

const mainMenuItems = [
  { title: 'What makes Radiant Digital different?', icon: 'Sparkles', query: 'What makes Radiant Digital different?' },
  { title: 'What have you already built?', icon: 'Layers', query: 'What have you already built?' },
  { title: 'Show me proof, not promises.', icon: 'BarChart3', query: 'Show me proof, not promises.' },
  { title: 'Who has worked with you and what did they achieve?', icon: 'Award', query: 'Who has worked with you and what did they achieve?' },
  { title: 'Do you work in my industry?', icon: 'Globe', query: 'Do you work in my industry?' },
  { title: 'What is the Radiant Digital AI Platform?', icon: 'Cpu', query: 'What is the Radiant Digital AI Platform?' },
  { title: 'How AI-ready is my organization?', icon: 'Target', query: 'How AI-ready is my organization?' },
  { title: 'Which solutions are right for my role?', icon: 'Users', query: 'Which solutions are right for my role?' },
  { title: "I'd rather talk to a real person.", icon: 'Phone', query: "I'd rather talk to a real person." },
]

const suggestions = [
  'What makes Radiant Digital different?',
  'What have you already built?',
  'Show me proof, not promises.',
  'Who has worked with you and what did they achieve?',
  'Do you work in my industry?',
  'What is the Radiant Digital AI Platform?',
  'How AI-ready is my organization?',
  'Which solutions are right for my role?',
  "I'd rather talk to a real person.",
]

/**
 * Synonym map — maps common natural-language terms to knowledge base keywords.
 * This lets free-text queries like "how do you handle billing issues" match entries
 * that use domain-specific keywords like "billing anomaly detection".
 */
const synonyms = {
  'ai': ['artificial intelligence', 'machine learning', 'ml'],
  'cx': ['customer experience', 'user experience', 'ux'],
  'modernize': ['modernization', 'legacy', 'transform', 'upgrade', 'migrate'],
  'cost': ['pricing', 'savings', 'budget', 'expensive', 'affordable', 'value'],
  'proof': ['evidence', 'results', 'success', 'case study', 'case studies', 'examples', 'portfolio', 'track record'],
  'billing': ['invoice', 'charges', 'payment', 'revenue'],
  'cloud': ['aws', 'azure', 'google cloud', 'infrastructure', 'migration'],
  'security': ['secure', 'compliance', 'cmmc', 'governance', 'audit', 'safe', 'trust', 'privacy'],
  'contact': ['talk', 'call', 'email', 'meet', 'demo', 'consultation', 'reach out', 'get in touch', 'schedule'],
  'healthcare': ['health', 'medical', 'clinical', 'hospital', 'patient', 'hipaa'],
  'government': ['federal', 'state', 'public sector', 'agency', 'gov'],
  'telecom': ['telecommunications', 'carrier', 'network', 'telco', '5g'],
  'finance': ['financial', 'banking', 'fintech', 'insurance', 'credit union'],
  'document': ['documentation', 'docs', 'content', 'writing', 'automarc'],
  'launch': ['release', 'go-live', 'deploy', 'rollout'],
  'industry': ['sector', 'vertical', 'domain', 'market'],
  'start': ['begin', 'onboard', 'engage', 'get started', 'next steps'],
}

/**
 * Expand a query by appending synonym matches so keyword scoring picks them up.
 */
function expandQuery(q) {
  let expanded = q
  for (const [root, syns] of Object.entries(synonyms)) {
    for (const syn of syns) {
      if (q.includes(syn) && !q.includes(root)) {
        expanded += ' ' + root
      }
    }
    if (q.includes(root)) {
      for (const syn of syns) {
        if (!q.includes(syn)) {
          expanded += ' ' + syn
        }
      }
    }
  }
  return expanded
}

export function findAnswer(query) {
  const raw = query.toLowerCase().trim()
  const q = expandQuery(raw)

  // Exact question match takes priority
  for (const entry of knowledgeBase) {
    if (entry.question && raw === entry.question.toLowerCase().trim()) {
      return ensureFollowUp(entry)
    }
  }

  // Exact keyword match — if the entire query IS a keyword, return immediately
  for (const entry of knowledgeBase) {
    if (entry.keywords.includes(raw)) {
      return ensureFollowUp(entry)
    }
  }

  let best = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0

    // Full keyword phrase match (highest weight)
    for (const keyword of entry.keywords) {
      if (q.includes(keyword)) {
        score += keyword.length * 1.5
      }
      // Individual word match for multi-word keywords (require word length > 4 to reduce noise)
      const words = keyword.split(' ')
      for (const word of words) {
        if (word.length > 4 && q.includes(word)) {
          score += word.length * 0.4
        }
      }
    }

    // Bonus: if query closely matches the entry's question text
    if (entry.question) {
      const entryQ = entry.question.toLowerCase()
      if (q.includes(entryQ) || entryQ.includes(raw)) {
        score += entryQ.length * 2
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
          title: "I appreciate the question, but that's outside my knowledge area",
          body: "I'm Radiant AI, built on a focused knowledge graph covering our solutions, case studies, platform capabilities, and the industries we serve. I'm not a general-purpose AI, so I can only help with topics related to Radiant Digital and enterprise AI transformation.\n\nBut there's still a lot I can do for you — try one of the topics below, or type a question about our solutions, case studies, or capabilities.",
          accent: '#596AE0',
        },
        {
          type: 'grid',
          title: 'Here is what I can help you with',
          columns: 2,
          clickable: true,
          items: [
            { icon: 'Sparkles', title: 'Our Approach', accent: '#91C46B', desc: 'What makes Radiant Digital different — the Precision Context Engine', query: 'What makes Radiant Digital different?' },
            { icon: 'Layers', title: '7 AI Solutions', accent: '#596AE0', desc: 'ICX AI, Billing Intelligence, Touchless IT Ops, and more', query: 'What solutions does Radiant Digital offer?' },
            { icon: 'BarChart3', title: 'Case Studies', accent: '#F0974E', desc: 'Proof from telecom, healthcare, government, finance, and more', query: 'Show me proof — not promises.' },
            { icon: 'Globe', title: 'Industries We Serve', accent: '#2DD4BF', desc: 'Telecom, federal, state, healthcare, oil and gas, financial services', query: 'Which industries do you serve?' },
            { icon: 'Cpu', title: 'AI Platform', accent: '#596AE0', desc: 'Foundational capabilities that power every solution', query: 'What is the Radiant Digital AI Platform?' },
            { icon: 'Users', title: 'Connect with Us', accent: '#F0974E', desc: 'Reach out to our team for a conversation', query: "I'd rather talk to a real person." },
          ],
        },
      ],
      followUp: [
        'What makes Radiant Digital different?',
        'What solutions does Radiant Digital offer?',
        'Show me proof — not promises.',
        'How can I get started?',
      ],
    }
  }

  return ensureFollowUp(best)
}

/**
 * Guarantee every response has contextual follow-up suggestions.
 */
function ensureFollowUp(entry) {
  if (entry.followUp && entry.followUp.length > 0) return entry

  // Context-aware fallback follow-ups based on entry type
  if (entry.id.startsWith('cs-by-')) {
    // Industry group → suggest individual case studies within that industry
    const industryFollowUps = {
      'cs-by-telecom': [
        'Tell me about the Scaling Telecom Service Capacity 5x case study',
        'Tell me about the Enabling Network Intelligence case study',
        'Tell me about the Improving Outage Response case study',
        'What solutions does Radiant Digital offer?',
      ],
      'cs-by-federal': [
        'Tell me about the USCIS case study',
        'Tell me about the Head Start Reporting Systems case study',
        'Tell me about the Federal Operations case study',
        'How secure is Radiant Digital?',
      ],
      'cs-by-state': [
        'Tell me about the Florida DCF Accountability System Audit case study',
        'Tell me about the Florida DEO Reemployment case study',
        'Tell me about the FLHSMV Test Data Management case study',
        'What have you done for federal agencies?',
      ],
      'cs-by-healthcare': [
        'Tell me about the Quit4Health case study',
        'Tell me about the Brighter Bites case study',
        'Tell me about the STARTing Strong case study',
        'Which industries do you serve?',
      ],
      'cs-by-oil-gas': [
        'Tell me about the Halliburton case study',
        'Tell me about the Advancing Industrial IoT case study',
        'Tell me about the Halliburton AR case study',
        'Which industries do you serve?',
      ],
      'cs-by-financial': [
        'Tell me about the Touchless Operations case study',
        'Tell me about the Navy Federal Credit Union case study',
        'Show me all case studies',
        'How can I get started?',
      ],
    }
    return { ...entry, followUp: industryFollowUps[entry.id] || [
      'Show me all case studies',
      'Which industries do you serve?',
      'What solutions does Radiant Digital offer?',
      'How can I get started?',
    ]}
  }

  if (entry.id.startsWith('cs-')) {
    // Individual case study → suggest related case studies + broader exploration
    return { ...entry, followUp: [
      'Show me more case studies',
      'Which industries do you serve?',
      'What solutions does Radiant Digital offer?',
      'How can I get started?',
    ]}
  }

  // Generic fallback
  return { ...entry, followUp: [
    'What solutions does Radiant Digital offer?',
    'Show me proof — not promises.',
    'Which industries do you serve?',
    'How can I get started?',
  ]}
}

export { knowledgeBase, suggestions, mainMenuItems }
