/**
 * staticData.js — Backend copy of siteContent.js
 * Used by staticHandler.js to serve hardcoded chat responses.
 * Keep in sync with outputs/ai-landing-v1/src/data/siteContent.js
 */

export const brand = {
  name: 'Radiant Digital',
  platformName: 'Radiant Digital AI Platform',
  tagline: 'Enterprise Transformation. Supercharged with AI.',
  description:
    'We believe AI only delivers when it truly understands your business. That conviction is why precision context guides every AI deployment across every practice, every solution, every engagement, and every team. It is that same conviction, and our own transformation, that allows us to help enterprises deploy AI grounded in the right context and built to produce outcomes that endure.',
  differentiator:
    'Every AI firm brings models. Only Radiant Digital grounds them with the Precision Context Engine.',
  differentiatorBody:
    'Before deployment begins, Radiant Digital structures everything your AI agents and your teams need to move fast and get it right.',
}

export const heroMetrics = [
  { value: '40%', label: 'Avg Cost Reduction' },
  { value: '3x', label: 'Faster Time to Market' },
  { value: '14+', label: 'Industries Served' },
  { value: '30+', label: 'AI Use Cases Deployed' },
]

export const proofPoints = [
  { value: '40%', label: 'Average cost reduction across enterprise deployments', accent: '#91C46B' },
  { value: '3x', label: 'Faster time to market', accent: '#F0974E' },
  { value: '30+', label: 'AI use cases deployed across enterprise operations', accent: '#596AE0' },
]

export const trustStats = [
  { value: '20+', label: 'Years of Transformation', icon: 'Award' },
  { value: '50+', label: 'Enterprise Clients', icon: 'Briefcase' },
  { value: '$2B+', label: 'Programs Powered', icon: 'TrendingUp' },
  { value: '40%', label: 'Avg Cost Reduction', icon: 'DollarSign' },
]

export const precisionContextEngine = {
  kicker: 'What Makes Radiant Digital Different',
  headline: 'Radiant Digital deploys AI.\nWe do not build models.\nWe build the context that makes models perform.',
  bodyLeft:
    'Most firms arrive at your door with the same tools. The difference is what happens before deployment.',
  bodyRight:
    'Radiant Digital constructs a precision context environment: built from your systems, your domain, your constraints: so that AI produces accurate, auditable, client-specific outputs on the first pass. Not after months of calibration.',
  conclusion:
    'That is the Precision Context Engine. And it is why the organizations that have deployed with Radiant Digital do not run pilots. They run production.',
}

export const telecomCaseStudy = {
  kicker: 'Proof, Not Promises',
  headline: 'From reactive troubleshooting.\nTo proactive network intelligence.',
  client: 'Leading Fortune 15 Telecom Enterprise',
  clientDetail: 'Telecommunications',
  challenge:
    'A Fortune 15 telecom carrier needed to transform how its network operations teams navigate complex network data. Planning delays, poor data quality visibility, and fragmented collaboration between design and development teams were slowing decisions and creating service risk.',
  whatWeDid:
    'Radiant Digital deployed its Design-to-Code Accelerator to deliver over 50 fully functional, responsive screens in under three weeks. The solution provided end-to-end network visualization from edge to core, actionable performance dashboards, and proactive data quality monitoring across regions, markets, and sites. AI-powered development reduced manual effort and cut redundant tasks, shifting the client from reactive troubleshooting to proactive network intelligence.',
  quote:
    'The solution elevated operational efficiency and shifted our approach from reactive troubleshooting to proactive network intelligence, driving strategic clarity and award-winning innovation.',
  quoteAuthor: 'Fortune 15 Telecom Enterprise',
  metrics: [
    { value: '70%', label: 'Development Time Reduced' },
    { value: '50+', label: 'Screens Delivered in 3 Weeks' },
    { value: '40%', label: 'Planning Delays Reduced' },
    { value: 'CIO 100', label: 'Award Winner 2024' },
  ],
}

export const socialProof = {
  kicker: 'Customers',
  headline: '50+ Enterprises.\n$2B+ in Programs.\nReal Results.',
  body: 'The proof is in who keeps coming back. Fortune 500s and federal agencies choose Radiant Digital because we tie every engagement to measurable business impact, not billable hours.',
  compliance: 'CMMC compliant',
}

export const aiFabric = {
  kicker: 'AI Fabric',
  headline: 'We hardwire AI into\neverything we do.',
  body: "AI Fabric is not a product. It is the way Radiant Digital operates. Every practice runs with AI embedded: not bolted on.",
  conclusion: "AI Fabric is not a product. It is the way Radiant operates. Every practice runs with AI embedded: not bolted on. That is what makes Radiant Digital's enterprise transformation fundamentally faster than conventional delivery.",
  practices: [
    { num: '01', title: 'Digital Strategy and Experience', desc: 'Design and optimize experiences faster with AI-driven insight and automation.', icon: 'Compass' },
    { num: '02', title: 'Product Development and Integration', desc: 'Accelerate delivery and reduce cost through AI-enabled development.', icon: 'Blocks' },
    { num: '03', title: 'Cloud Transformation', desc: 'Enhance scalability and performance with AI-optimized infrastructure.', icon: 'Cloud' },
    { num: '04', title: 'Analytics, Data Science and AI', desc: 'Turn data into real-time intelligence for faster decisions.', icon: 'BarChart3' },
    { num: '05', title: 'Organizational Transformation', desc: 'Empower people and processes with AI enablement.', icon: 'RefreshCw' },
    { num: '06', title: 'Skilled Workforce Solutions', desc: 'Provide qualified technical talent using AI-assisted sourcing.', icon: 'Users' },
  ],
}

export const solutions = [
  {
    num: '01', title: 'ICX AI',
    label: 'Digital Strategy and Experience',
    accent: '#91C46B',
    screenshot: '/screenshots/enterprise-icx.png',
    tagline: 'AI-powered CX insight-to-ROI platform.',
    desc: 'Unifies every customer signal into a single intelligence layer, giving your teams the predictive power to eliminate friction before it becomes churn.',
    proofStat: '15-25% churn reduction',
    tags: ['Enterprise', 'CX', 'Insight-to-ROI'],
    platformComponents: ['Semantic Data Graph', 'Context-Aware AI', 'Predictive Analytics and Time Series', 'Radiant Knowledge Hub'],
    details: [
      'Unified data platform across all CX touchpoints',
      'Proactive friction detection & elimination',
      'Insight-to-ROI pipeline with measurable outcomes',
      'Real-time experience monitoring & alerting',
    ],
  },
  {
    num: '02', title: 'Customer Journey Intelligence',
    label: 'Digital Strategy and Experience',
    accent: '#F0974E',
    screenshot: '/screenshots/cx-workbench.png',
    tagline: 'AI-accelerated interaction tagging and journey visualization.',
    desc: 'Accelerates the analysis of customer interactions across digital channels, enabling teams to visualize journeys and act on experience insights in hours, not weeks.',
    tags: ['Workflow', 'Figma Analysis', 'Journey Mapping'],
    platformComponents: ['Context-Aware AI', 'Radiant Knowledge Hub', 'Semantic Data Graph'],
    details: [
      'AI-accelerated interaction tagging on digital channels',
      'Figma screen analysis with business rule engine',
      'Customer journey visualization & mapping',
      'Experience detail extraction & pattern recognition',
    ],
  },
  {
    num: '03', title: 'Design-to-code',
    label: 'Product Development and Integration',
    accent: '#00c87d',
    screenshot: '/screenshots/design-to-code.png',
    tagline: 'Product design and development without the handoff bottleneck.',
    desc: 'Requirements are expressed through plain language against a target framework, Storybook is the component authority, and the output is handed directly to developers for integration.',
    tags: ['Frontend Delivery', 'Storybook', 'AI-RAD'],
    platformComponents: ['AI-RAD', 'Radiant Knowledge Hub', 'Context-Aware AI'],
    details: [
      'Plain-language requirements against target framework',
      'Storybook as component authority',
      'Direct-to-developer output with no handoff friction',
      'No separate design tool or translation layer',
    ],
  },
  {
    num: '04', title: 'AI-First Legacy Modernization',
    label: 'Product Development and Integration',
    accent: '#00a86b',
    screenshot: '/screenshots/legacy-modernization.png',
    tagline: 'AI-first legacy modernization across server and frontend.',
    desc: 'Transforms legacy enterprise applications into modern, design-system-compliant environments across both server-side and frontend layers.',
    proofStat: 'Days with AI vs. months manual',
    tags: ['Legacy Modernization', 'Design Systems', 'Full Stack'],
    platformComponents: ['AI-RAD', 'Radiant Knowledge Hub', 'Context-Aware AI'],
    details: [
      'Legacy application analysis and decomposition',
      'Server-side and frontend modernization',
      'Design-system-compliant code generation',
      'Auditable output in days',
    ],
  },
  {
    num: '05', title: 'Anomaly Detection',
    label: 'Analytics, Data Science and AI',
    accent: '#596AE0',
    screenshot: '/screenshots/anomaly-detection-v2.png',
    tagline: 'AI-powered anomaly detection that protects revenue and operations at scale.',
    desc: 'Detects anomalies across any data stream — billing, logistics, authentication, devices — groups them into actionable patterns, and guides teams to resolve issues before they escalate.',
    proofStat: '98% detection accuracy',
    tags: ['Billing', 'Logistics', 'Authentication', 'Device Telemetry', 'Fraud Detection', 'Revenue Protection'],
    platformComponents: ['Predictive Analytics and Time Series', 'Radiant Knowledge Hub', 'Agentic AI and Multi-Agent Orchestration', 'Semantic Data Graph'],
    details: [
      'Real-time anomaly detection across any data stream',
      'Intelligent pattern grouping & classification',
      'Guided resolution workflows for operations teams',
      'Proactive issue prevention before business impact',
    ],
  },
  {
    num: '06', title: 'Product Launch Risk Intelligence',
    label: 'Analytics, Data Science and AI',
    accent: '#F05030',
    screenshot: '/screenshots/launch-risk-v2.png',
    tagline: 'Go/no-go intelligence for high-stakes product and device launches.',
    desc: 'Integrates sales, returns, quality, and customer data to predict launch risk, identify root causes, and provide AI-driven go/no-go recommendations before and after launch.',
    tags: ['Launch Risk', 'Predictive', 'Go/No-Go'],
    platformComponents: ['Semantic Data Graph', 'Predictive Analytics and Time Series', 'Radiant Knowledge Hub', 'Context-Aware AI'],
    details: [
      'Integrated sales, returns, quality & customer data',
      'Device launch risk prediction & scoring',
      'AI-driven root cause identification',
      'Go/no-go recommendations pre & post launch',
    ],
  },
  {
    num: '07', title: 'Automarc AI',
    label: 'Organizational Transformation',
    accent: '#a855f7',
    screenshot: '/screenshots/automarc.png',
    tagline: 'AI-powered document workflow automation.',
    desc: 'Extracts, classifies, and processes content to reduce manual effort and improve accuracy, turning document-heavy operations into automated, governed workflows.',
    tags: ['Documents', 'Automation', 'Technical Writing'],
    platformComponents: ['Radiant Knowledge Hub', 'AI-RAD', 'Agentic AI and Multi-Agent Orchestration'],
    details: [
      'AI-powered content extraction & classification',
      'Automated document processing workflows',
      'Technical writing acceleration & consistency',
      'Reduced manual effort with improved accuracy',
    ],
  },
  {
    num: '08', title: 'Touchless IT Operations',
    label: 'Analytics, Data Science and AI',
    accent: '#2DD4BF',
    screenshot: '/screenshots/touchless-ops-v2.png',
    tagline: 'Autonomous IT operations with AI-driven self-healing.',
    desc: 'Shifts enterprise IT from reactive incident management to autonomous, self-healing infrastructure. Unified observability, AI-driven root cause analysis, and predictive optimization.',
    proofStat: '80% Alert Noise Reduction',
    tags: ['E2E Observability', 'Autonomous Remediation', 'Predictive Optimization'],
    platformComponents: ['Radiant AIOps', 'Autonomous Stack', 'Predictive Analytics and Time Series', 'Context-Aware AI'],
    details: [
      'End-to-end observability across infrastructure, network, and application layers',
      'AI-driven root cause analysis and autonomous remediation',
      'Predictive optimization that prevents incidents before they occur',
      'Self-healing runbook execution with no human action required',
    ],
  },
]

export const markets = [
  {
    title: 'Technology, Media and Telecom',
    icon: 'Radio', accent: '#596AE0',
    image: '/images/telecom-network.jpg',
    clients: 'Major tier-1 carriers',
    desc: 'Radiant Digital has mapped 20+ AI use cases across the full telecom operating model: from revenue assurance to network operations to sales velocity.',
    metrics: [{ value: '3+', label: 'Clients' }, { value: '8+', label: 'Projects' }, { value: '20+', label: 'AI Use Cases' }],
  },
  {
    title: 'Healthcare and Life Sciences',
    icon: 'HeartPulse', accent: '#e05990',
    image: '/images/healthcare.jpg',
    clients: 'NIH, MD Anderson, CHOP',
    desc: 'Privacy-first AI that scales clinical workflows and research operations: with HIPAA governance built in, not bolted on.',
    metrics: [{ value: '6+', label: 'Clients' }, { value: '10+', label: 'Projects' }, { value: '12+', label: 'AI Use Cases' }],
  },
  {
    title: 'Financial Services',
    icon: 'Banknote', accent: '#F0974E',
    image: '/images/financial-services.jpg',
    clients: 'Navy Federal Credit Union, major BFSI enterprises',
    desc: 'AI for fraud detection, compliance automation, and customer journey transformation: with audit trails from day one.',
    metrics: [{ value: '2+', label: 'Clients' }, { value: '4+', label: 'Projects' }, { value: '6+', label: 'AI Use Cases' }],
  },
  {
    title: 'Federal Government',
    icon: 'Landmark', accent: '#596AE0',
    image: '/images/federal-government.jpg',
    clients: 'DoD, HHS, DHS, Treasury, Commerce, Interior',
    desc: 'Mission-critical enterprise transformation with program-grade delivery, human-in-the-loop governance, and federal compliance alignment.',
    metrics: [{ value: '10+', label: 'Clients' }, { value: '15+', label: 'Projects' }, { value: '18+', label: 'AI Use Cases' }],
  },
  {
    title: 'State and Local Government',
    icon: 'Building2', accent: '#91C46B',
    image: '/images/state-local-government.jpg',
    clients: 'FL DCF, FL DEO, FL DOT',
    desc: 'Citizen-centric transformation that delivers better outcomes on constrained budgets.',
    metrics: [{ value: '6+', label: 'Clients' }, { value: '8+', label: 'Projects' }, { value: '10+', label: 'AI Use Cases' }],
  },
  {
    title: 'Education',
    icon: 'GraduationCap', accent: '#a855f7',
    image: '/images/education.jpg',
    clients: 'UT Austin, Baylor University, research institutions',
    desc: 'AI-first campus transformation: research analytics, student outcomes, and FERPA-compliant data governance at scale.',
    metrics: [{ value: '5+', label: 'Clients' }, { value: '7+', label: 'Projects' }, { value: '8+', label: 'AI Use Cases' }],
  },
  {
    title: 'Oil and Gas',
    icon: 'Fuel', accent: '#F0974E',
    image: '/images/oil-gas.jpg',
    clients: 'Halliburton, Noble Corporation, offshore operators',
    desc: 'Connected worker safety, predictive maintenance, and digital asset intelligence across remote and field operations.',
    metrics: [{ value: '3+', label: 'Clients' }, { value: '5+', label: 'Projects' }, { value: '6+', label: 'AI Use Cases' }],
  },
]

export const contact = {
  email: 'hello@radiant.digital',
  phone: '301.306.5102',
  address: '8229 Boone Blvd, Suite 325, Vienna, VA 22182',
  offices: ['USA', 'Canada', 'India', 'Singapore'],
  social: {
    linkedin: 'https://in.linkedin.com/company/radiant-digital-systems',
    youtube: 'https://www.youtube.com/channel/UClkps2MFEeqsngFlFj3egzw',
  },
}
