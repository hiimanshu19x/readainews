import fs from 'fs';
const list = JSON.parse(fs.readFileSync('scripts/dataset.json', 'utf8'));

list.push(
  {
    id: "ft-hyperscalers-nuclear-smr-datacenters",
    title: "Hyperscalers Form Pact to Co-Fund Small Modular Nuclear Reactors for Gigawatt AI Campuses",
    category: "BREAKING NEWS",
    tier: "Breaking News",
    publishedDate: "September 4, 2026",
    dateKey: "2026-09-04",
    timeAgo: "Today • 2h ago",
    readTime: "4 min read",
    source: "Financial Times",
    sourceUrl: "https://www.ft.com/content/ai-datacenters-nuclear-power-hyperscalers-2026",
    meshTheme: "lattice",
    featured: false,
    summary: "A consortium of global hyperscale cloud operators has signed a preliminary accord to jointly finance and deploy small modular nuclear reactors (SMRs) directly adjacent to upcoming multi-gigawatt AI datacenter campuses.",
    content: "LONDON — Facing unprecedented baseload electricity requirements that threaten to overwhelm regional power grids across Europe and North America, major cloud hyperscalers have entered into a collaborative financing consortium to accelerate commercial small modular reactor (SMR) deployments, according to an investigative report published by the Financial Times on September 4, 2026.\n\nThe accord establishes a multi-billion-dollar joint venture to underwrite regulatory licensing, site preparation, and fabrication for factory-built nuclear reactors ranging from 50 to 300 megawatts each. By embedding dedicated SMR clusters directly within new datacenter campuses, technology giants aim to decouple exponential GPU cluster expansions from municipal residential electrical grids, guaranteeing 99.999% carbon-free uptime without competing with local civic communities for power.\n\nUtility regulators and energy economists describe the move as a watershed realignment of industrial power consumption. With frontier model training clusters projected to consume over 5 gigawatts per campus by 2028, private technology corporations are effectively transforming into autonomous energy utilities, reshaping global energy capital expenditures and accelerating the commercialization of next-generation nuclear fission.",
    keyTakeaways: [
      "Hyperscalers form joint multi-billion-dollar financing consortium to co-fund small modular nuclear reactors.",
      "Directly integrates 50–300 megawatt SMRs into high-density datacenter campuses to bypass grid queues.",
      "Guarantees 24/7 carbon-free baseload power required for next-generation multi-gigawatt training supercomputers."
    ],
    whyItMatters: "Marks the convergence of high-performance AI computing with commercial nuclear energy, establishing dedicated clean power as the cornerstone of future frontier labs.",
    views: "59.4k",
    isWeeklyBest: false,
    weeklyRank: 3,
    weekEdition: "1st Week of Sept 2026"
  },
  {
    id: "ap-g20-ai-energy-grid-accord",
    title: "G20 Innovation Ministerial Convenes Over Unprecedented AI Electrical Grid Demands & Energy Accords",
    category: "BREAKING NEWS",
    tier: "Breaking News",
    publishedDate: "September 4, 2026",
    dateKey: "2026-09-04",
    timeAgo: "Today • 3h ago",
    readTime: "4 min read",
    source: "AP",
    sourceUrl: "https://apnews.com/article/ai-g20-energy-grid-ministers-chapel-hill-2026",
    meshTheme: "curved",
    featured: false,
    summary: "Energy and technology ministers from the G20 nations convened in Chapel Hill alongside leading AI CEOs to ratify the first international guidelines balancing datacenter energy consumption with national grid resilience.",
    content: "CHAPEL HILL, N.C. — Technology executives including Sam Altman, Jensen Huang, and representatives from global utilities gathered alongside G20 energy ministers on September 4, 2026, to address the escalating strain of artificial intelligence datacenters on global electrical grids, reported by the Associated Press.\n\nThe summit concluded with the signing of the 'Chapel Hill Clean Compute Framework,' a landmark non-binding treaty that establishes energy transparency metrics for frontier AI clusters. Participating nations agreed to standardize reporting on datacenter power-usage effectiveness (PUE), mandate water-free cooling adoption by 2028, and incentivize the co-location of training facilities near renewable generation zones such as geothermal and offshore wind hubs.\n\nDiplomats noted that the rapid concentration of compute in specific geographical corridors—most notably northern Virginia, Texas, and Ireland—has elevated AI infrastructure into a top-tier national security and macroeconomic priority. The framework seeks to prevent localized blackout risks while harmonizing cross-border standards for green datacenter taxation and cross-regional compute grids.",
    keyTakeaways: [
      "G20 ministers and tech leaders ratify the Chapel Hill Clean Compute Framework to manage datacenter grid impacts.",
      "Sets international targets for water-free cooling adoption and transparent power-usage reporting by 2028.",
      "Elevates datacenter power distribution into an international macroeconomic and national security priority."
    ],
    whyItMatters: "Establishes the first coordinated global regulatory framework addressing the massive physical energy footprint of generative artificial intelligence.",
    views: "52.1k",
    isWeeklyBest: false,
    weeklyRank: 4,
    weekEdition: "1st Week of Sept 2026"
  },
  {
    id: "wsj-enterprise-ai-agent-security-mandate",
    title: "Corporate Boardrooms Mandate Specialized AI Firewalls Before Approving Autonomous Coding Agents",
    category: "BREAKING NEWS",
    tier: "Breaking News",
    publishedDate: "September 4, 2026",
    dateKey: "2026-09-04",
    timeAgo: "Today • 4h ago",
    readTime: "4 min read",
    source: "WSJ",
    sourceUrl: "https://www.wsj.com/tech/ai/corporate-boards-mandate-ai-agent-firewalls-2026",
    meshTheme: "ribbon",
    featured: false,
    summary: "Over 65% of Fortune 500 audit committees have implemented formal halts on unrestricted autonomous software agent deployments until specialized machine learning firewalls and runtime boundary checkers are integrated.",
    content: "NEW YORK — In a decisive shift from unconstrained experimentation toward strict operational governance, corporate audit committees across the Fortune 500 are mandating comprehensive runtime AI firewalls before authorizing autonomous software agents on internal production codebases, reported by The Wall Street Journal on September 4, 2026.\n\nThe corporate directives stem from recent enterprise red-team disclosures exposing how multi-agent engineering workflows can be deceived by indirect prompt injection embedded within third-party dependencies. When an autonomous agent ingests tainted open-source repositories, malicious token strings can instruct the model to exfiltrate proprietary API secrets or introduce subtle security backdoors into internal pull requests.\n\nTo mitigate these operational liabilities, enterprise CISOs are deploying runtime inspection proxies that evaluate token activations, sanitize tool calls, and mandate cryptographic human-in-the-loop approvals for privileged system operations. Chief information officers emphasize that while autonomous coding agents boost routine developer throughput by over 40%, safeguarding enterprise intellectual property requires treating foundation models as non-deterministic external vendors subject to zero-trust boundaries.",
    keyTakeaways: [
      "Fortune 500 audit committees require specialized runtime firewalls before approving autonomous agent production access.",
      "Responds to vulnerabilities where autonomous agents execute malicious instructions embedded in third-party code.",
      "Drives rapid adoption of zero-trust verification harnesses that monitor and sandbox model tool invocations."
    ],
    whyItMatters: "Signals that enterprise AI adoption has entered an era of rigorous compliance, zero-trust sandboxing, and strict cybersecurity verification.",
    views: "63.5k",
    isWeeklyBest: false,
    weeklyRank: 5,
    weekEdition: "1st Week of Sept 2026"
  }
);

fs.writeFileSync('scripts/dataset.json', JSON.stringify(list, null, 2), 'utf8');
console.log('Appended items 3-5. Total:', list.length);
