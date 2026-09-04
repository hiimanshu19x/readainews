import fs from 'fs';
const list = JSON.parse(fs.readFileSync('scripts/dataset.json', 'utf8'));

list.push(
  {
    id: "reuters-openai-1b-cybersecurity-defense",
    title: "OpenAI Commits $1B in Subsidized AI Cybersecurity Tooling to Frontline Defense & Public Infrastructure",
    category: "BREAKING NEWS",
    tier: "Breaking News",
    publishedDate: "September 4, 2026",
    dateKey: "2026-09-04",
    timeAgo: "Today • 20m ago",
    readTime: "4 min read",
    source: "Reuters",
    sourceUrl: "https://www.reuters.com/technology/artificial-intelligence/openai-pledges-1-billion-cybersecurity-defense-2026-09-04/",
    meshTheme: "waves",
    featured: true,
    summary: "OpenAI has officially launched a $1 billion subsidized access initiative dubbed 'Daybreak for Frontline Defenders', providing enterprise AI defensive models and automated vulnerability detection to hospital networks, water utilities, and civil defense agencies.",
    content: "WASHINGTON — Addressing escalating international concerns regarding the offensive potential of autonomous software agents, OpenAI announced on September 4, 2026, a landmark $1 billion subsidized tooling initiative titled 'Daybreak for Frontline Defenders,' reported by Reuters. The program will distribute frontier AI defense models, automated code sanitizers, and real-time vulnerability monitoring systems to municipal utility operators, healthcare databases, and critical civil infrastructure organizations worldwide.\n\nUnder the terms of the program, verified public sector operators and critical civil utilities will receive subsidized compute access to specialized defensive checkpoints of OpenAI's latest reasoning models. In simulated red-team exercises conducted alongside international cybersecurity consortiums, these defensive agents reduced the median time required to detect and patch zero-day remote code execution exploits from 48 hours to under 90 seconds, effectively neutralizing automated exploitation pipelines before malicious threat actors can execute database extraction attacks.\n\nThe announcement arrives amidst intense scrutiny on Capitol Hill and European Union regulatory bodies following the launch of GPT-6 Astra, which crossed OpenAI's internal Preparedness Framework cybersecurity threshold. Industry observers view the billion-dollar commitment as an essential defensive countermeasure, establishing an asymmetric advantage for cybersecurity defenders as autonomous code generation tools proliferate globally.",
    keyTakeaways: [
      "OpenAI commits $1 billion in subsidized AI tooling to safeguard hospitals, power grids, and municipal water utilities.",
      "Defensive AI checkpoints demonstrated median zero-day patch creation times of under 90 seconds during verified red-team trials.",
      "Represents a strategic shift toward establishing an asymmetric advantage for defenders against autonomous threat actors."
    ],
    whyItMatters: "Protects foundational public infrastructure from next-generation autonomous cyber threats while setting an industry precedent for responsible AI deployment.",
    views: "74.8k",
    isWeeklyBest: true,
    weeklyRank: 1,
    weekEdition: "1st Week of Sept 2026"
  },
  {
    id: "bloomberg-crusoe-30b-valuation-jane-street",
    title: "Crusoe Valued at $30B Following $3B Raise and Landmark $13B Jane Street AI Datacenter Contract",
    category: "BREAKING NEWS",
    tier: "Breaking News",
    publishedDate: "September 4, 2026",
    dateKey: "2026-09-04",
    timeAgo: "Today • 1h ago",
    readTime: "4 min read",
    source: "Bloomberg",
    sourceUrl: "https://www.bloomberg.com/news/articles/2026-09-03/crusoe-energy-raises-3-billion-at-30-billion-valuation-for-ai",
    meshTheme: "cyber",
    featured: true,
    summary: "AI datacenter and cloud pioneer Crusoe has closed a $3 billion equity round at a $30 billion valuation, propelled by an unprecedented five-year, $13 billion computing services agreement with quantitative trading powerhouse Jane Street.",
    content: "NEW YORK — In one of the most consequential infrastructure financings of the artificial intelligence boom, AI datacenter and cloud operator Crusoe announced on September 4, 2026, that it has raised $3 billion in new equity financing at a $30 billion valuation, reported by Bloomberg. The massive funding round materialized shortly after Crusoe finalized a landmark five-year, $13 billion computing infrastructure agreement with quantitative trading giant Jane Street Group.\n\nThe transaction underscores how access to dedicated gigawatt-scale electrical power has replaced semiconductor availability as the primary operational bottleneck in modern machine learning. Crusoe specializes in co-locating high-density GPU superclusters directly alongside stranded renewable energy assets and on-site natural gas flare mitigation systems, bypassing traditional utility grid interconnection queues that can stretch up to seven years across North America.\n\nUnder the Jane Street contract, Crusoe will design, construct, and manage gigawatt-scale datacenter clusters powered directly by isolated clean energy generation sources, providing dedicated compute clusters for proprietary quantitative machine learning and predictive token modeling. Venture investors note that non-tech financial institutions are increasingly committing tens of billions directly to compute infrastructure to guarantee access to frontier models, propelling specialized neocloud operators into the highest tiers of tech valuation.",
    keyTakeaways: [
      "Crusoe secures $3 billion in new funding at a $30 billion valuation to expand specialized AI compute campuses.",
      "Signs landmark five-year, $13 billion infrastructure agreement with quantitative trading powerhouse Jane Street.",
      "Co-locates GPU superclusters at renewable and flare gas power sources to circumvent municipal grid congestion."
    ],
    whyItMatters: "Proves that access to gigawatt-scale clean energy is the defining competitive advantage in the race to power frontier artificial intelligence workloads.",
    views: "68.2k",
    isWeeklyBest: true,
    weeklyRank: 2,
    weekEdition: "1st Week of Sept 2026"
  }
);

fs.writeFileSync('scripts/dataset.json', JSON.stringify(list, null, 2), 'utf8');
console.log('Appended items 1-2. Total:', list.length);
