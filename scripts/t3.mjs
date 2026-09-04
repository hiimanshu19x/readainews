import fs from 'fs';

const existing = JSON.parse(fs.readFileSync('scripts/dataset.json', 'utf8'));

const tier2 = [
  {
    id: 'techcrunch-agentic-ide-developer-paradigm',
    title: 'Agentic Software Engineering Surpasses Copilots as AI IDEs Automate Full Repository Lifecycles',
    category: 'AI INDUSTRY',
    tier: 'industry',
    source: 'TechCrunch',
    originalUrl: 'https://techcrunch.com/category/artificial-intelligence/',
    readTime: '5 min read',
    date: 'Today, 11:20 AM',
    summary: 'The software engineering paradigm has decisively shifted from predictive autocomplete tools to autonomous agentic development environments capable of refactoring entire microservices, navigating legacy codebases, and orchestrating cloud deployments without step-by-step human prompts.',
    fullContent: 'The software engineering landscape has undergone a monumental structural pivot over the past six months. Where generative AI developer tooling was previously characterized by interactive autocomplete copilot plugins, a new generation of agentic integrated development environments (IDEs) has fundamentally displaced conventional workflows.\n\nAccording to new industry data tracking venture capital allocations and enterprise repository commits, developer teams are increasingly granting autonomous agents direct bash shell execution privileges, terminal access, and multi-file editing capabilities. Rather than generating single functions on command, these agentic systems ingest entire architectural blueprints, resolve dependency conflicts, execute test suites locally, and issue comprehensive pull requests with auto-generated regression coverage.\n\nKey enterprise software leaders interviewed by TechCrunch emphasize that while productivity gains are reaching unprecedented thresholds—some teams reporting a 40% compression in feature release cycles—the transition has introduced acute challenges around verification, code provenance, and technical debt accumulation. As autonomous agents generate thousands of lines of syntactically flawless boilerplate, senior engineering architects find their primary role shifting from code authors to supervisory verification inspectors, necessitating brand new auditing frameworks designed specifically for synthetic codebases.',
    keyPoints: [
      'Developer tooling transitions from inline autocomplete to autonomous agents executing terminal commands, multi-file refactoring, and automated test fixes.',
      'Venture funding and enterprise adoption surge as engineering teams report up to 40% reduction in development cycle times across cloud microservices.',
      'Engineering leadership highlights the growing necessity of automated verification pipelines to prevent subtle synthetic bugs and security provenance risks.'
    ],
    whyItMatters: 'As software development moves from manual syntax composition to high-level architectural steering, the unit economics of creating digital products drop precipitously, accelerating software delivery while raising the bar for automated testing and code safety audits.',
    sentiment: 'Transformative',
    sourceCredibility: 'High (Silicon Valley Technology & Venture Standard)'
  },
  {
    id: 'the-information-ai-datacenter-capex-reckoning',
    title: 'Hyperscalers Face Wall Street Scrutiny Over $200B Annual AI Infrastructure Capex and Monetization Horizons',
    category: 'AI INDUSTRY',
    tier: 'industry',
    source: 'The Information',
    originalUrl: 'https://www.theinformation.com/topics/artificial-intelligence',
    readTime: '6 min read',
    date: 'Today, 10:45 AM',
    summary: 'Venture capitalists and institutional shareholders are demanding clearer timelines on enterprise return-on-investment as Big Tech capital expenditures on AI compute clusters and custom silicon approach $200 billion annually.',
    fullContent: 'A quiet tension is mounting in Silicon Valley and Wall Street boardrooms as Big Tech capital spending on artificial intelligence hardware and data center infrastructure hits record historical highs. While leading hyperscalers continue to announce massive investments in custom silicon, liquid cooling networks, and multi-gigawatt power purchase contracts, top financial institutions are increasingly scrutinizing the exact monetization timelines of enterprise AI services.\n\nProprietary reporting reveals that while consumer subscription revenue for frontier chatbot models remains healthy, the multi-billion-dollar enterprise contract market is moving at a more measured pace than early investor presentations anticipated. Fortune 500 CIOs, while enthusiastic about pilot deployments, remain cautious regarding broad-scale rollouts due to strict data governance constraints, unpredictable token consumption costs at scale, and integration friction with on-premise mainframe systems.\n\nIn response, technology giants are actively re-architecting their commercial tiering models. Rather than charging purely per-seat software licenses or raw token processing fees, leading cloud providers are introducing outcome-based pricing frameworks and hybrid private-cluster options that guarantee fixed cost envelopes, aiming to reassure risk-averse enterprise procurement officers.',
    keyPoints: [
      'Annual capital expenditures by leading cloud giants on AI data centers and accelerators cross the $200 billion threshold, triggering investor scrutiny.',
      'Enterprise adoption shows high interest but measured enterprise-wide rollout due to predictability of token costs and stringent compliance requirements.',
      'Cloud platforms respond with outcome-based pricing guarantees and dedicated private inference clouds to accelerate Fortune 500 contract signatures.'
    ],
    whyItMatters: 'The balance between unprecedented infrastructure spending and realistic software monetization timelines will dictate the pacing of venture capital, semiconductor valuations, and cloud pricing strategies for the next decade.',
    sentiment: 'Cautious',
    sourceCredibility: 'High (Premier Investigative Tech & Business Journalism)'
  },
  {
    id: 'venturebeat-small-language-models-enterprise-edge',
    title: 'SLMs and Local Quantization Challenge Frontier Models in Enterprise On-Device Deployments',
    category: 'AI INDUSTRY',
    tier: 'industry',
    source: 'VentureBeat',
    originalUrl: 'https://venturebeat.com/category/ai/',
    readTime: '5 min read',
    date: 'Today, 09:30 AM',
    summary: 'Highly optimized Small Language Models (SLMs) running locally on quantized enterprise hardware are matching the functional domain accuracy of multi-hundred-billion parameter models at a fraction of the operating cost and zero data leakage risk.',
    fullContent: 'The conventional belief that bigger models are inherently superior for all corporate AI applications is being dismantled by a rapid wave of breakthroughs in Small Language Models (SLMs) and aggressive quantization techniques. Enterprises across healthcare, banking, and specialized manufacturing are turning away from public API endpoints in favor of 3-billion to 8-billion parameter models deployed directly on local workstation hardware and private edge appliances.\n\nBenchmarking data published this week indicates that when distilled and fine-tuned on targeted domain corpora—such as internal legal precedent, clinical note synthesis, or proprietary hardware diagnostics—SLMs achieve accuracy parity with frontier models while cutting inference latency by up to 85% and eliminating recurrent cloud API charges entirely.\n\nMoreover, the geopolitical and regulatory scrutiny surrounding cross-border data transfers and proprietary IP exposure has made local on-device inference a mandatory requirement for highly regulated sectors. As silicon manufacturers release dedicated Neural Processing Units (NPUs) directly integrated into enterprise laptops and servers, the enterprise AI ecosystem is rapidly shifting from centralized cloud monopolies to distributed, private compute nodes.',
    keyPoints: [
      'Distilled 3B to 8B parameter models achieve parity with frontier LLMs on narrow domain benchmarks while running completely offline.',
      'Local inference eliminates data transmission privacy risks and slashes ongoing compute costs by more than 80% for enterprise workflows.',
      'Hardware acceleration via modern consumer and enterprise NPUs makes on-premise model execution fast, accessible, and compliant with data residency rules.'
    ],
    whyItMatters: 'Small, quantized models democratize AI deployment by allowing businesses to retain complete sovereignty over proprietary data without perpetual dependence on hyperscaler API subscriptions.',
    sentiment: 'Bullish',
    sourceCredibility: 'High (Leading Enterprise AI & Deep Tech Publication)'
  },
  {
    id: 'the-verge-ai-search-web-publishing-crisis',
    title: 'AI Search Engines Upend Web Publishing as Zero-Click Answers Siphon Traffic from Independent Creators',
    category: 'AI INDUSTRY',
    tier: 'industry',
    source: 'The Verge',
    originalUrl: 'https://www.theverge.com/ai-artificial-intelligence',
    readTime: '4 min read',
    date: 'Today, 08:50 AM',
    summary: 'The aggressive integration of AI answer engines into mainstream browsers and search platforms has triggered double-digit drops in referral traffic for web publishers, escalating battles over copyright licensing and robot exclusion protocols.',
    fullContent: 'The traditional covenant between the open web and search engines—in which publishers provide indexed content in exchange for visitor traffic—is fraying at an alarming rate. As tech platforms deploy generative AI search summaries that synthesize direct answers inline, digital media organizations and independent journalism outlets are witnessing sudden 20% to 50% drops in direct organic search referrals.\n\nPublishers argue that generative search engines extract proprietary reporting, analysis, and product reviews to provide comprehensive zero-click summaries, depriving original content creators of the advertising revenue and subscriber conversions necessary to fund their newsrooms. Several prominent media conglomerates have responded by revising their robots.txt directives, instituting strict licensing firewalls, or joining collective bargaining coalitions to demand compulsory revenue-sharing agreements.\n\nConversely, search providers maintain that AI-powered synthesis offers a fundamentally superior user experience for searchers navigating an internet flooded with search-engine-optimized spam. With both European regulators and U.S. courts taking up antitrust and fair-use inquiries into AI content ingestion, the dispute represents an existential inflection point for the financial sustainability of open-web digital journalism.',
    keyPoints: [
      'AI-synthesized search results lead to steep declines in publisher referral clicks, disrupting traditional digital media business models.',
      'Media outlets mount legal challenges and enforce strict licensing demands as automated scrapers ingest investigative journalism without direct attribution traffic.',
      'Regulators in the EU and US scrutinize fair use exemptions and monopolistic search engine practices amid rising calls for content royalties.'
    ],
    whyItMatters: 'If search engines eliminate the economic incentive for independent content creation, the authoritative information pipeline that AI models rely on for training and accuracy could be permanently compromised.',
    sentiment: 'Critical',
    sourceCredibility: 'High (Top Consumer Technology & Culture Journalism)'
  }
];

const combined = [...existing, ...tier2];
fs.writeFileSync('scripts/dataset.json', JSON.stringify(combined, null, 2));
console.log('Tier 2 added successfully. Total items now:', combined.length);
