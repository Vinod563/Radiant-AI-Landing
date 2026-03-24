/**
 * Knowledge base powering the conversational AI experience.
 * Real content pulled from landing page components.
 */

const knowledgeBase = [
  {
    id: 'what-is-radiant',
    keywords: ['what is radiant', 'about radiant', 'who is radiant', 'radiant ai', 'what do you do', 'company', 'precision context engine', 'pce', 'context engine', 'how does radiant work'],
    question: 'What is Radiant Digital?',
    cards: [
      {
        type: 'hero',
        title: 'Enterprise Transformation. Supercharged with AI.',
        subtitle: 'Before deployment begins, Radiant Digital structures everything your AI agents and your teams need to move fast and get it right. Every AI firm brings models. Only Radiant Digital brings the Precision Context Engine.',
        accent: '#91C46B',
      },
      {
        type: 'metrics',
        title: 'By the Numbers',
        items: [
          { value: '40%', label: 'Avg Cost Reduction' },
          { value: '6 Weeks', label: 'Pilot to Production' },
          { value: '14+', label: 'Industries Served' },
          { value: '29', label: 'Telecom AI Use Cases Mapped' },
        ],
        accent: '#596AE0',
      },
      {
        type: 'text',
        title: 'The Precision Context Engine',
        body: 'Before any solution is deployed, Radiant Digital constructs a precision context environment built from your systems, your domain vocabulary, your operational constraints, and your target outcomes. The result: AI that already knows your business before it runs a single process.',
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
    keywords: ['solutions', 'products', 'what do you offer', 'what solutions', 'offerings', 'tools', 'six solutions', 'solutions does radiant', 'all solutions'],
    question: 'What solutions does Radiant Digital offer?',
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
            screenshot: '/screenshots/design-to-code.png',
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
    followUp: [
      'Tell me about Enterprise ICX',
      'Tell me about Billing Anomaly Detection',
      'Tell me about Design-to-Code Modernization',
      'Show me case studies',
    ],
  },
  {
    id: 'sol-enterprise-icx',
    keywords: ['enterprise icx', 'cx intelligence', 'icx platform', 'customer signals', 'churn reduction'],
    question: 'Tell me about Enterprise ICX',
    cards: [
      {
        type: 'hero',
        title: 'Enterprise ICX: CX Intelligence Platform',
        subtitle: 'Unifies every customer signal into a single intelligence layer, giving your teams the predictive power to eliminate friction before it becomes churn.',
        accent: '#91C46B',
      },
      {
        type: 'metrics',
        title: 'Enterprise ICX Impact',
        items: [
          { value: '15-25%', label: 'Churn Reduction' },
          { value: '94.2', label: 'CSAT Score' },
          { value: '+18', label: 'NPS Improvement' },
          { value: '2.1s', label: 'Avg Response Time' },
        ],
        accent: '#91C46B',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Enterprise ICX is powered by Semantic Data Graph, Context-Aware AI, Predictive Analytics and Time Series, and Radiant Knowledge Hub. It provides unified data across all CX touchpoints, proactive friction detection, insight-to-ROI pipeline, and real-time experience monitoring.',
        accent: '#91C46B',
      },
      {
        type: 'screenshot',
        src: '/screenshots/enterprise-icx.png',
        alt: 'Enterprise ICX Dashboard',
        label: 'Enterprise ICX Dashboard',
        accent: '#91C46B',
      },
    ],
    followUp: [
      'Tell me about Customer Journey Intelligence',
      'Tell me about Billing Anomaly Detection',
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
      'Tell me about Enterprise ICX',
      'Tell me about Design-to-Code Modernization',
      'Show me case studies',
      'What solutions does Radiant Digital offer?',
    ],
  },
  {
    id: 'sol-design-to-code',
    keywords: ['design-to-code', 'legacy modernization', 'design to code', 'modernization', 'legacy applications', 'ai-rad'],
    question: 'Tell me about Design-to-Code Modernization',
    cards: [
      {
        type: 'hero',
        title: 'Design-to-Code Modernization',
        subtitle: 'Transforms legacy enterprise applications into modern, design-system-compliant environments. Not wireframes in six months. Working, auditable output in hours per module.',
        accent: '#00c87d',
      },
      {
        type: 'metrics',
        title: 'Modernization Impact',
        items: [
          { value: 'Hours', label: 'Per Module Output' },
          { value: '60%', label: 'Faster Than Manual' },
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
      'Tell me about Billing Anomaly Detection',
      'Tell me about Automarc AI',
      'Show me case studies',
      'How does the platform work?',
    ],
  },
  {
    id: 'sol-billing-anomaly',
    keywords: ['billing anomaly', 'billing anomaly detection', 'billing intelligence', 'revenue protection', 'billing accuracy'],
    question: 'Tell me about Billing Anomaly Detection',
    cards: [
      {
        type: 'hero',
        title: 'Billing Anomaly Detection and Revenue Protection',
        subtitle: 'Detects billing anomalies, groups them into patterns, and guides teams to resolve issues before they reach customers, protecting revenue and trust across millions of daily transactions.',
        accent: '#596AE0',
      },
      {
        type: 'metrics',
        title: 'Billing Intelligence Impact',
        items: [
          { value: '98%', label: 'Billing Accuracy' },
          { value: '3-7%', label: 'Revenue Leakage Recovered' },
          { value: '40-70%', label: 'LLM Cost Reduction' },
          { value: '6 wks', label: 'To Production' },
        ],
        accent: '#596AE0',
      },
      {
        type: 'text',
        title: 'How It Works',
        body: 'Powered by Predictive Analytics and Time Series, Radiant Knowledge Hub, Agentic AI and Multi-Agent Orchestration, and Semantic Data Graph. Real-time anomaly detection, intelligent pattern grouping, guided resolution workflows, and proactive issue resolution.',
        accent: '#596AE0',
      },
      {
        type: 'screenshot',
        src: '/screenshots/anomaly-detection.png',
        alt: 'Billing Anomaly Detection Dashboard',
        label: 'Billing Anomaly Detection',
        accent: '#596AE0',
      },
    ],
    followUp: [
      'Tell me about Product Launch Risk Intelligence',
      'Tell me about Enterprise ICX',
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
        src: '/screenshots/magic-globe.png',
        alt: 'Product Launch Risk Intelligence',
        label: 'Launch Risk Analysis',
        accent: '#F05030',
      },
    ],
    followUp: [
      'Tell me about Automarc AI',
      'Tell me about Billing Anomaly Detection',
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
      'Tell me about Enterprise ICX',
      'Tell me about Design-to-Code Modernization',
      'Show me case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'case-studies',
    keywords: ['case study', 'show me proof', 'proof not promises', 'results', 'roi', 'success', 'fortune 15', 'savings'],
    question: 'Show me proof — any case studies?',
    cards: [
      {
        type: 'case-study',
        title: 'Fortune 15 Telecom Transformation',
        subtitle: 'A tier-1 telecom carrier needed AI that produced measurable operational results: not a proof-of-concept that stalled after 90 days. Radiant Digital built a precision context environment grounded in the carrier\'s billing systems, operational data, and domain vocabulary. Then deployed AI workflows across revenue assurance, billing intelligence, and customer operations: live in six weeks.',
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
    followUp: [
      'What have you done for telecom enterprises?',
      'What have you done for healthcare?',
      'Show me all case studies',
      'What solutions does Radiant Digital offer?',
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
            desc: 'Radiant Digital has mapped 29 AI use cases across the full telecom operating model: from revenue assurance to network operations to sales velocity.',
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
    followUp: [
      'What have you done for telecom?',
      'What have you done for federal agencies?',
      'What have you done for healthcare?',
      'Show me case studies',
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
      'How does the Radiant AI Platform work?',
      'What solutions does Radiant Digital offer?',
      'How secure is Radiant Digital?',
      'How can I get started?',
    ],
  },
  {
    id: 'services',
    keywords: ['services', 'enablers', 'pillars', 'transformation', 'strategy', 'analytics', 'cloud', 'workforce', 'consulting', 'what services'],
    question: 'What services does Radiant Digital provide?',
    cards: [
      {
        type: 'list',
        title: 'AI Fabric: AI infused into everything we do.',
        subtitle: 'AI Fabric is not a product. It is the way Radiant Digital operates. Every practice runs with AI embedded: not bolted on.',
        items: [
          { name: 'Digital Strategy and Experience', metric: 'Design and optimize experiences faster', accent: '#91C46B' },
          { name: 'Product Development and Integration', metric: 'Accelerate delivery, reduce cost', accent: '#F0974E' },
          { name: 'Cloud Transformation', metric: 'AI-optimized infrastructure', accent: '#596AE0' },
          { name: 'Analytics, Data Science and AI', metric: 'Data to real-time intelligence', accent: '#2DD4BF' },
          { name: 'Organizational Transformation', metric: 'Empower people and processes', accent: '#a855f7' },
        ],
        accent: '#596AE0',
      },
    ],
    followUp: [
      'How does the Radiant AI Platform work?',
      'Which industries do you serve?',
      'Show me case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'security',
    keywords: ['security', 'compliance', 'cmmc', 'governance', 'audit', 'secure', 'trust', 'certifications', 'how secure', 'secure is radiant'],
    question: 'How secure is Radiant Digital?',
    cards: [
      {
        type: 'text',
        title: 'Governance Built In, Not Bolted On',
        body: 'Enterprise-grade security with CMMC compliance. Every deployment includes full audit trails, human-in-the-loop oversight, and zero-trust architecture by default.',
        accent: '#2DD4BF',
      },
      {
        type: 'metrics',
        title: 'Security and Trust',
        items: [
          { value: 'CMMC', label: 'Defense Ready' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: 'Zero-Trust', label: 'Architecture' },
          { value: 'Human-in-Loop', label: 'Governance' },
        ],
        accent: '#2DD4BF',
      },
    ],
    followUp: [
      'What solutions does Radiant Digital offer?',
      'How does the Radiant AI Platform work?',
      'Show me case studies',
      'How can I get started?',
    ],
  },
  {
    id: 'why-radiant',
    keywords: ['why radiant', 'differentiator', 'competitive', 'advantage', 'why choose', 'why choose radiant', 'what makes you different', 'what makes radiant different', 'better'],
    question: 'Why choose Radiant Digital?',
    cards: [
      {
        type: 'hero',
        title: 'Every AI firm brings models. Only Radiant Digital brings the Precision Context Engine.',
        subtitle: 'Before deployment begins, Radiant Digital structures everything your AI agents and your teams need to move fast and get it right.',
        accent: '#91C46B',
      },
      {
        type: 'pce-diagram',
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
    followUp: [
      'What solutions does Radiant Digital offer?',
      'Show me case studies',
      'Which industries do you serve?',
      'How can I get started?',
    ],
  },
  {
    id: 'contact',
    keywords: ['contact', 'demo', 'talk', 'call', 'meeting', 'get started', 'pricing', 'consultation', 'reach out', 'assessment'],
    question: 'How can I get started?',
    cards: [
      {
        type: 'cta',
        title: 'Where does your enterprise stand on AI readiness?',
        body: 'Five minutes. No signup. A prioritized roadmap that tells you where you are, where the gaps are, and which AI deployments would produce the fastest results.',
        actions: [
          { label: 'Take the Assessment', href: '/chat' },
          { label: 'Start the Conversation', href: '/chat' },
        ],
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
    keywords: ['case studies', 'all case studies', 'portfolio', 'all projects', 'show me all', 'full portfolio', 'all engagements', 'complete list'],
    question: 'Show me your case studies and proof.',
    cards: [
      {
        type: 'text',
        title: 'Proof Across Industries',
        body: 'Radiant Digital has delivered transformation engagements across telecom, federal, state government, healthcare, financial services, oil and gas, and more. Here is a selection of published case studies from our portfolio.',
        accent: '#91C46B',
      },
      {
        type: 'list',
        title: '30+ Published Case Studies',
        subtitle: 'A selection from our portfolio of enterprise engagements.',
        items: [
          { name: 'Scaling Telecom Service Capacity 5x with Intelligent Automation', metric: 'Telecom', accent: '#596AE0' },
          { name: 'Improving Guest Support with an AI-Powered Virtual Assistant', metric: 'Hospitality', accent: '#F0974E' },
          { name: 'Modernizing Digital Platforms with AI-Accelerated Delivery', metric: 'Web Services', accent: '#91C46B' },
          { name: 'Advancing Industrial IoT with AI-Accelerated Product Delivery', metric: 'IoT / Tracklynk', accent: '#2DD4BF' },
          { name: 'Improving Outage Response with AI and System Integration', metric: 'Telecom', accent: '#596AE0' },
          { name: 'Enabling Network Intelligence through AI-Powered Development', metric: 'Telecom', accent: '#596AE0' },
          { name: 'Accountability System Audit for Florida DCF', metric: 'State Gov', accent: '#91C46B' },
          { name: 'Florida DEO Reemployment Assistance Modernization', metric: 'State Gov', accent: '#91C46B' },
          { name: 'Enhancing Test Data Management at FLHSMV', metric: 'State Gov', accent: '#91C46B' },
          { name: 'Florida DOT Disaster Recovery Plan for HCI Servers', metric: 'State Gov', accent: '#91C46B' },
          { name: 'Application Modernization for Navy Federal Credit Union', metric: 'Financial', accent: '#F0974E' },
          { name: 'Systems Assurance and Technical Services for USCIS', metric: 'Federal', accent: '#596AE0' },
          { name: 'Modernizing Infrastructure for Scalable Analytics', metric: 'Commercial', accent: '#2DD4BF' },
          { name: 'World Table Tennis: Elevating the Sport', metric: 'Entertainment', accent: '#a855f7' },
          { name: 'Transforming Digital Excellence: Scalable Design System', metric: 'Federal/HHS', accent: '#596AE0' },
          { name: 'Transforming Oil Field Solutions with Halliburton', metric: 'Oil & Gas', accent: '#F0974E' },
          { name: 'Enhancing Head Start Reporting Systems for OHS', metric: 'Federal/HHS', accent: '#596AE0' },
          { name: 'Augmented Reality App for Halliburton Oil Field Tool', metric: 'Oil & Gas', accent: '#F0974E' },
          { name: 'Transforming Federal Operations with Digital Innovation', metric: 'Federal/DHS', accent: '#596AE0' },
          { name: 'Optimizing Application Development for Telecom Provider', metric: 'Telecom', accent: '#596AE0' },
          { name: 'STARTing Strong: HIV Treatment Adherence Platform', metric: 'Healthcare', accent: '#e05990' },
          { name: 'Brighter Bites: Healthy Food Access Platform', metric: 'Healthcare', accent: '#e05990' },
          { name: 'Quit4Health: Smarter Way to Quit Smoking', metric: 'Healthcare', accent: '#e05990' },
          { name: 'QuitBuddy: Social Support for Quitting', metric: 'Healthcare', accent: '#e05990' },
          { name: 'mySmartSkin: Skin Cancer Survivor Monitoring', metric: 'Healthcare', accent: '#e05990' },
          { name: 'MY Health: Young Adult Health Management', metric: 'Healthcare', accent: '#e05990' },
          { name: 'Pocket Ark: PPE Training Platform', metric: 'Healthcare', accent: '#e05990' },
        ],
        accent: '#91C46B',
      },
    ],
    followUp: [
      'What have you done for telecom?',
      'What have you done for federal agencies?',
      'What have you done for healthcare?',
      'What have you done for oil and gas?',
    ],
  },
  {
    id: 'cs-by-telecom',
    keywords: ['telecom enterprises', 'telecom industry', 'done for telecom', 'telecommunications', 'telecom work', 'telecom projects', 'carrier'],
    question: 'What have you done for telecom enterprises?',
    cards: [
      {
        type: 'text',
        title: 'Telecom Case Studies',
        body: 'Radiant Digital has mapped 29 AI use cases across the full telecom operating model. Here are our telecom engagements:',
        accent: '#596AE0',
      },
      {
        type: 'list',
        title: 'Telecom Engagements',
        subtitle: 'From revenue assurance to network operations to sales velocity.',
        items: [
          { name: 'Scaling Telecom Service Capacity 5x with Intelligent Automation', metric: '5x Capacity', accent: '#596AE0' },
          { name: 'Improving Outage Response with AI and System Integration', metric: '55% Faster', accent: '#596AE0' },
          { name: 'Enabling Network Intelligence through AI-Powered Development', metric: '5x Visibility', accent: '#596AE0' },
          { name: 'Optimizing Application Development for Telecom Provider', metric: '50% Faster', accent: '#596AE0' },
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
        type: 'list',
        title: 'Federal Engagements',
        subtitle: 'Program-grade delivery with human-in-the-loop governance.',
        items: [
          { name: 'Systems Assurance and Technical Services for USCIS', metric: '99.9% Uptime', accent: '#596AE0' },
          { name: 'Transforming Digital Excellence: Scalable Design System', metric: 'HHS', accent: '#596AE0' },
          { name: 'Enhancing Head Start Reporting Systems for OHS', metric: '70% Faster', accent: '#596AE0' },
          { name: 'Transforming Federal Operations with Digital Innovation', metric: 'DHS', accent: '#596AE0' },
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
        type: 'list',
        title: 'State Government Engagements',
        subtitle: 'Better outcomes on constrained budgets.',
        items: [
          { name: 'Accountability System Audit for Florida DCF', metric: '30% Improved', accent: '#91C46B' },
          { name: 'Florida DEO Reemployment Assistance Modernization', metric: '70% Faster', accent: '#91C46B' },
          { name: 'Enhancing Test Data Management at FLHSMV', metric: '50% Faster', accent: '#91C46B' },
          { name: 'Florida DOT Disaster Recovery Plan for HCI Servers', metric: '99.9% RTO', accent: '#91C46B' },
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
        type: 'list',
        title: 'Healthcare Engagements',
        subtitle: 'From clinical workflows to public health innovation.',
        items: [
          { name: 'STARTing Strong: HIV Treatment Adherence Platform', metric: '88% Adherence', accent: '#e05990' },
          { name: 'Brighter Bites: Healthy Food Access Platform', metric: '3x Reach', accent: '#e05990' },
          { name: 'Quit4Health: Smarter Way to Quit Smoking', metric: '2.5x Quit Rate', accent: '#e05990' },
          { name: 'QuitBuddy: Social Support for Quitting', metric: '70% Retention', accent: '#e05990' },
          { name: 'mySmartSkin: Skin Cancer Survivor Monitoring', metric: '3x Detection', accent: '#e05990' },
          { name: 'MY Health: Young Adult Health Management', metric: '75% Engaged', accent: '#e05990' },
          { name: 'Pocket Ark: PPE Training Platform', metric: '95% Completion', accent: '#e05990' },
        ],
        accent: '#e05990',
      },
    ],
  },
  {
    id: 'cs-by-oil-gas',
    keywords: ['oil gas', 'oil and gas', 'energy', 'done for oil', 'halliburton work', 'oil field', 'offshore'],
    question: 'What have you done for oil and gas?',
    cards: [
      {
        type: 'text',
        title: 'Oil & Gas Case Studies',
        body: 'Radiant Digital delivers connected worker safety, predictive maintenance, and digital asset intelligence for energy companies.',
        accent: '#F0974E',
      },
      {
        type: 'list',
        title: 'Oil & Gas Engagements',
        subtitle: 'Remote operations and field intelligence.',
        items: [
          { name: 'Transforming Oil Field Solutions with Halliburton', metric: '60% Uplift', accent: '#F0974E' },
          { name: 'Augmented Reality App for Halliburton Oil Field Tool', metric: '45% Faster', accent: '#F0974E' },
          { name: 'Advancing Industrial IoT with AI-Accelerated Product Delivery', metric: 'Tracklynk', accent: '#2DD4BF' },
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
        type: 'list',
        title: 'Financial Services Engagements',
        subtitle: 'With audit trails from day one.',
        items: [
          { name: 'Application Modernization for Navy Federal Credit Union', metric: '40% Faster', accent: '#F0974E' },
        ],
        accent: '#F0974E',
      },
    ],
  },
  {
    id: 'cs-telecom-5x',
    keywords: ['scaling telecom', 'service capacity', '5x', 'intelligent automation', 'telecom capacity', 'scaling telecom service capacity 5x with intelligent automation'],
    question: 'Tell me about the Scaling Telecom Service Capacity 5x case study',
    cards: [
      {
        type: 'case-study',
        title: 'Scaling Telecom Service Capacity 5x with Intelligent Automation',
        subtitle: 'A major telecom provider needed to scale service capacity without proportionally increasing headcount. Radiant Digital deployed AI-driven automation across network operations, enabling 5x capacity scaling while reducing manual intervention by 70%.',
        client: 'Major Telecom Provider',
        clientDetail: 'Telecommunications',
        metrics: [
          { value: '5x', label: 'Capacity Scaling' },
          { value: '70%', label: 'Less Manual Work' },
          { value: '40%', label: 'Faster Deployment' },
        ],
        accent: '#596AE0',
      },
    ],
  },
  {
    id: 'cs-hospitality-ai',
    keywords: ['guest support', 'hospitality', 'virtual assistant', 'ai-powered assistant', 'improving guest support in hospitality'],
    question: 'Tell me about the Improving Guest Support case study',
    cards: [
      {
        type: 'case-study',
        title: 'Improving Guest Support in Hospitality with an AI-Powered Virtual Assistant',
        subtitle: 'A hospitality enterprise deployed Radiant Digital\'s AI-powered virtual assistant to handle guest inquiries, booking modifications, and service requests. The assistant resolved 65% of queries without human intervention, improving response times and guest satisfaction.',
        client: 'Hospitality Enterprise',
        clientDetail: 'Hospitality',
        metrics: [
          { value: '65%', label: 'Auto-Resolution' },
          { value: '3x', label: 'Faster Response' },
          { value: '+22', label: 'NPS Improvement' },
        ],
        accent: '#F0974E',
      },
    ],
  },
  {
    id: 'cs-web-modernization',
    keywords: ['modernizing digital platforms', 'web services', 'ai-accelerated delivery', 'modernizing digital platforms with ai-accelerated'],
    question: 'Tell me about the Modernizing Digital Platforms case study',
    cards: [
      {
        type: 'case-study',
        title: 'Modernizing Digital Platforms with AI-Accelerated Delivery',
        subtitle: 'A web services company modernized its legacy digital platform using Radiant Digital\'s AI-accelerated delivery approach, reducing development cycles by 60% while improving platform performance and user experience.',
        client: 'Web Services Company',
        clientDetail: 'Web Services',
        metrics: [
          { value: '60%', label: 'Faster Delivery' },
          { value: '99.9%', label: 'Uptime Achieved' },
          { value: '45%', label: 'Cost Reduction' },
        ],
        accent: '#91C46B',
      },
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
        subtitle: 'Radiant Digital\'s Tracklynk platform enabled an industrial IoT provider to accelerate product delivery through connected worker safety, predictive maintenance, and real-time asset monitoring across remote operations.',
        client: 'Industrial IoT Provider',
        clientDetail: 'IoT / Tracklynk',
        metrics: [
          { value: '60%', label: 'Maintenance Uplift' },
          { value: '70%', label: 'Downtime Reduced' },
          { value: '99.9%', label: 'Safety Uptime' },
        ],
        accent: '#2DD4BF',
      },
    ],
  },
  {
    id: 'cs-outage-response',
    keywords: ['outage response', 'system integration', 'telecom outage', 'incident response', 'improving outage response'],
    question: 'Tell me about the Improving Outage Response case study',
    cards: [
      {
        type: 'case-study',
        title: 'Improving Outage Response in Telecom with AI and System Integration',
        subtitle: 'A telecom carrier deployed Radiant Digital\'s AI-driven incident response system to detect, diagnose, and resolve network outages faster. The system integrated across monitoring platforms to reduce mean time to resolution by 55%.',
        client: 'Telecom Carrier',
        clientDetail: 'Telecommunications',
        metrics: [
          { value: '55%', label: 'Faster Resolution' },
          { value: '80%', label: 'Auto-Detection' },
          { value: '40%', label: 'Cost Savings' },
        ],
        accent: '#596AE0',
      },
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
  },
  {
    id: 'cs-navy-federal',
    keywords: ['navy federal', 'nfcu', 'application modernization', 'credit union', 'navy federal credit union', 'application modernization for navy federal', 'navy federal case study'],
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
    keywords: ['network intelligence', 'enabling network', 'ai-powered development', 'telecom network'],
    question: 'Tell me about the Enabling Network Intelligence case study',
    cards: [
      {
        type: 'case-study',
        title: 'Enabling Network Intelligence in Telecom through AI-Powered Development',
        subtitle: 'Radiant Digital enabled a telecom carrier to build intelligent network capabilities through AI-powered development. The solution provided real-time network analytics, predictive capacity planning, and automated configuration management.',
        client: 'Telecom Carrier',
        clientDetail: 'Telecommunications',
        metrics: [
          { value: '40%', label: 'Faster Deployment' },
          { value: '5x', label: 'Network Visibility' },
          { value: '30%', label: 'Capacity Savings' },
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
]

const suggestions = [
  'What solutions does Radiant Digital offer?',
  'Why choose Radiant Digital?',
  'Show me proof and case studies',
  'Which industries do you serve?',
  'What have you done for telecom?',
  'How does the platform work?',
  'How secure is Radiant Digital?',
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

  const defaultFollowUp = [
    'What solutions does Radiant Digital offer?',
    'Show me case studies',
    'Which industries do you serve?',
    'How can I get started?',
  ]

  if (!best || bestScore < 3) {
    return {
      id: 'fallback',
      question: query,
      cards: [
        {
          type: 'text',
          title: 'Here\u2019s What I Can Help With',
          body: 'I can tell you about Radiant Digital\'s solutions, industries we serve, case studies, our platform architecture, security compliance, and how to get started. Try asking one of the suggestions below!',
          accent: '#596AE0',
        },
      ],
      followUp: defaultFollowUp,
    }
  }

  // Ensure every response has followUp suggestions
  if (!best.followUp) {
    // For case study entries, suggest related actions
    if (best.id.startsWith('cs-')) {
      best = { ...best, followUp: [
        'Show me all case studies',
        'What solutions does Radiant Digital offer?',
        'Which industries do you serve?',
        'How can I get started?',
      ]}
    } else {
      best = { ...best, followUp: defaultFollowUp }
    }
  }

  return best
}

export { knowledgeBase, suggestions }
