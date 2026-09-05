/**
 * imageEngine.js - High-Precision Image Uniqueness Engine
 * 
 * Guarantees that EVERY article on the website (seed, live-scraped, or procedural)
 * receives a 100% unique, visually distinct preview image.
 * No two cards on the website will ever share the same preview image.
 */

export const VERIFIED_CONTEXT_PHOTO_POOLS = {
  frontier_models: [
    'photo-1620712943543-bcc4688e7485', // glowing neural network AI brain
    'photo-1618005182384-a83a8bd57fbe', // liquid digital abstract wave
    'photo-1634017839464-5c339ebe3cb4', // 3D generative intelligence sphere
    'photo-1635070041078-e363dbe005cb', // quantum geometric light matrix
    'photo-1451187580459-43490279c0fa', // global connected network intelligence
    'photo-1507413245164-6160d8298b31', // scientific light beams
    'photo-1501167786227-4cba60f6d58f', // minimal abstract futuristic
    'photo-1531297484001-80022131f5a1', // high tech laptop workstation
    'photo-1579546929518-9e396f3cc809', // color gradient mesh
    'photo-1550745165-9bc0b252726f', // retro tech hardware
    'photo-1504384764586-bb4cdc1707b0', // abstract light rays
    'photo-1517433670267-08bbd4be890f', // deep tech research
    'photo-1446776811953-b23d57bd21aa', // earth orbital view
    'photo-1446776877081-d282a0f896e2', // space telemetry science
    'photo-1446776709462-d6b525c57bd3', // satellite space vista
    'photo-1457364887197-9150188c107b'  // cosmic nebula intelligence
  ],
  chips_hardware: [
    'photo-1518770660439-4636190af475', // circuit board processor microchip
    'photo-1555680202-c86f0e12f086', // semiconductor wafer close up
    'photo-1591488320449-011701bb6704', // silicon microchip close up
    'photo-1550751827-4bd374c3f58b', // circuit board green traces
    'photo-1517077304055-6e89abbf09b0', // microchip gold pins
    'photo-1597733336794-12d05021d510', // motherboard close up
    'photo-1588508065123-287b28e013da', // electronic components
    'photo-1607604276583-eef5d076aa5f', // hardware testing
    'photo-1544716278-ca5e3f4abd8c', // cleanroom engineering
    'photo-1555664424-778a1e5e1b48', // integrated circuit board
    'photo-1537498425277-c283d32ef9db'  // server motherboard processor
  ],
  robotics_humanoids: [
    'photo-1485827404703-89b55fcc595e', // white robot face profile
    'photo-1535378917042-10a22c95931a', // humanoid head with illuminated eyes
    'photo-1581091226825-a6a2a5aee158', // industrial robotic precision arm
    'photo-1563770660941-20978e870e26', // cybernetic bionic hand
    'photo-1581092160607-ee22621dd758', // robotic joint automation
    'photo-1531746790731-6c087fecd65a', // artificial intelligence robot
    'photo-1561557944-6e7860d1a7eb', // mechanical robotics
    'photo-1525338078858-d762b5e32f2c', // futuristic automation
    'photo-1546776310-eef45dd6d63c', // friendly robot assistant
    'photo-1581092580497-e0d23cbdf1dc'  // manufacturing precision assembly
  ],
  cybersecurity_safety: [
    'photo-1563986768609-322da13575f3', // cyber security digital shield
    'photo-1614064641938-3bbee52942c7', // binary code lock encryption
    'photo-1510511459019-5dda7724fd87', // digital security matrix
    'photo-1555949963-aa79dcee981c', // cyber protection screen
    'photo-1563013544-824ae1b704d3', // padlock on laptop
    'photo-1526374965328-7f61d4dc18c5', // matrix code terminal
    'photo-1528731708534-816fe59f90cb', // high speed network patch cables
    'photo-1535223289827-42f1e9919769', // futuristic user interface
    'photo-1558655146-d09347e92766', // cyber security vault lock
    'photo-1559526324-4b87b5e36e44'  // enterprise network monitoring
  ],
  datacenter_energy: [
    'photo-1558494949-ef010cbdcc31', // datacenter server racks
    'photo-1544197150-b99a580bb7a8', // blue server aisle datacenter
    'photo-1504384308090-c894fdcc538d', // server infrastructure hardware
    'photo-1473341304170-971dccb5ac1e', // green energy renewable power grid
    'photo-1497435334941-8c899ee9e8e9', // high power clean energy datacenter
    'photo-1466611653911-95081537e5b7', // clean wind turbines
    'photo-1513836279014-a89f7a76ae86', // power transmission grid
    'photo-1567427017947-545c5f8d16ad', // high voltage electrical power
    'photo-1516937941344-00b4e0337589', // energy turbine generator
    'photo-1579389083078-4e7018379f7e', // modern data blade rack
    'photo-1520607162513-77705c0f0d4a'  // digital data optical corridor
  ],
  education_learning: [
    'photo-1509062522246-3755977927d7', // classroom teacher and digital learning
    'photo-1503676260728-1c00da094a0b', // young students learning with technology
    'photo-1523240795612-9a054b0db644', // university students collaborating
    'photo-1427504494785-3a9ca7044f45', // modern lecture hall technology
    'photo-1580582932707-520aed937b7b', // digital school learning environment
    'photo-1497633762265-9d179a990aa6', // library books knowledge repository
    'photo-1524178232363-1fb2b075b655', // presentation whiteboard learning
    'photo-1577896851231-70ef18881754', // student focused digital screen
    'photo-1522202176988-66273c2fd55f', // study group brainstorming
    'photo-1531482615713-2afd69097998'  // university research lab meeting
  ],
  voice_audio: [
    'photo-1511671782779-c97d3d27a1d4', // acoustic microphone vocal studio
    'photo-1516280440614-37939bbacd81', // stage performance singer with microphone
    'photo-1598488035139-bdbb2231ce04', // audio console sound mixer frequencies
    'photo-1514525253161-7a46d19cd819', // concert opera stage lights
    'photo-1508700115892-45ecd05ae2ad', // sound spectrum audio visualizer
    'photo-1470225620780-dba8ba36b745', // audio soundboard studio mixer
    'photo-1478737270239-2f02b77fc618', // podcast microphone close up
    'photo-1519671482749-fd09be7ccebf', // live concert lights performance
    'photo-1465847899084-d164df4dedc6', // studio sound monitor headphones
    'photo-1511379938547-c1f69419868d'  // acoustic musical frequencies
  ],
  law_policy_ethics: [
    'photo-1589829545856-d10d557cf95f', // scales of justice
    'photo-1479142506502-19b3a3b7ff33', // courthouse pillars architecture
    'photo-1521791136064-7986c2920216', // international diplomatic handshake
    'photo-1450133064473-71024230f91b', // supreme court classical building
    'photo-1486406146926-c627a92ad1ab', // corporate skyscraper finance
    'photo-1436450412740-6b988f486c6b', // government capitol dome
    'photo-1575517111478-7f6afd0973db', // executive boardroom council
    'photo-1517048676732-d65bc937f952', // international summit hall
    'photo-1521737604893-d14cc237f11d', // corporate governance meeting
    'photo-1556761175-5973dc0f32e7'  // institutional technology policy
  ],
  biology_medicine: [
    'photo-1532187863486-abf9dbad1b69', // chemistry laboratory flask
    'photo-1532094349884-543bc11b234d', // DNA microscope laboratory
    'photo-1507668077129-56e32842fceb', // scientific research laboratory
    'photo-1530497610245-94d3c16cda28', // medical imaging scanner
    'photo-1579154204601-01588f351e67', // genetic research cells
    'photo-1576091160399-112ba8d25d1d', // healthcare digital tablet
    'photo-1584515979956-d9f6e5d09982', // clinical healthcare hospital
    'photo-1530026405186-ed1f139313f8', // medical laboratory vials
    'photo-1516549655169-df83a0774514', // medical stethoscope diagnostic
    'photo-1582719478250-c89cae4dc85b'  // clinical biology microscope
  ],
  coding_dev: [
    'photo-1555066931-4365d14bab8c', // programming code terminal
    'photo-1517694712202-14dd9538aa97', // coding on macbook
    'photo-1461749280684-dccba630e2f6', // html monitor syntax code
    'photo-1498050108023-c5249f4df085', // web developer workspace
    'photo-1542831371-29b0f74f9713', // syntax highlighting screen
    'photo-1526379095098-d400fd0bf935', // green terminal matrix code
    'photo-1515879218367-8466d910aaa4', // python programming IDE
    'photo-1571171637578-41bc2dd41cd2', // software engineer workstation
    'photo-1587620962725-abab7fe55159', // developer coding script
    'photo-1607799279861-4dd421887fb3'  // devops cloud terminal
  ],
  tech_general: [
    'photo-1488590528505-98d2b5aba04b',
    'photo-1515378791036-0648a3ef77b2',
    'photo-1517245386807-bb43f82c33c4',
    'photo-1519389950473-47ba0277781c',
    'photo-1522071820081-009f0129c71c',
    'photo-1511707171634-5f897ff02aa9',
    'photo-1525547719571-a2d4ac8945e2',
    'photo-1531403009284-440f080d1e12',
    'photo-1504639725590-34d0984388bd',
    'photo-1516321318423-f06f85e504b3',
    'photo-1573164713988-8665fc963095',
    'photo-1581090464777-f3220bbe1b8b',
    'photo-1581092795360-fd1ca04f0952',
    'photo-1581093588401-fbb62a02f120',
    'photo-1581093806997-124204d9fa9d',
    'photo-1581094794329-c8112a89af12',
    'photo-1581092162384-8987c1d64718',
    'photo-1551288049-bebda4e38f71',
    'photo-1551836022-d5d88e9218df',
    'photo-1552664730-d307ca884978',
    'photo-1557804506-669a67965ba0',
    'photo-1560179707-f14e90ef3623',
    'photo-1568992687947-868a62a9f521',
    'photo-1573164713714-d95e436ab8d6',
    'photo-1573496359142-b8d87734a5a2',
    'photo-1573496799652-408c2ac9fe98',
    'photo-1573497019940-1c28c88b4f3e',
    'photo-1600880292203-757bb62b4baf'
  ]
};

const PHOTO_STORAGE_KEY = 'readainews_used_photo_ids_v12';
const memoryUsedPhotoIds = new Set();

export function getBaseImageId(url) {
  if (!url || typeof url !== 'string') return '';
  const match = url.match(/photo-[0-9a-f-]+/i);
  if (match) return match[0].toLowerCase();
  if (url.startsWith('data:image/svg')) {
    return 'svg-' + hashString(url);
  }
  return url.split('?')[0].toLowerCase();
}

export function hashString(str) {
  let hash = 0;
  if (!str) return 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getAllUsedPhotoIds() {
  let stored = [];
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(PHOTO_STORAGE_KEY);
      if (raw) stored = JSON.parse(raw);
    } catch (e) {}
  }
  return new Set([...stored, ...memoryUsedPhotoIds]);
}

export function markPhotoIdUsed(urlOrId) {
  const baseId = getBaseImageId(urlOrId);
  if (!baseId) return;
  
  memoryUsedPhotoIds.add(baseId);
  
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const all = Array.from(getAllUsedPhotoIds());
      localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(all));
    } catch (e) {}
  }
}

export function generateUniqueProceduralSvg(title = '', context = 'frontier_models', id = '') {
  const seed = hashString((id || '') + '::' + (title || 'AI News') + '::' + context);
  
  const PALETTES = [
    { bg1: '#070b16', bg2: '#010307', primary: '#38bdf8', secondary: '#818cf8', accent: '#c084fc' },
    { bg1: '#05130e', bg2: '#010705', primary: '#34d399', secondary: '#2dd4bf', accent: '#a7f3d0' },
    { bg1: '#140b1d', bg2: '#06020a', primary: '#c084fc', secondary: '#f472b6', accent: '#e879f9' },
    { bg1: '#171007', bg2: '#060401', primary: '#fbbf24', secondary: '#f97316', accent: '#fde047' },
    { bg1: '#09151e', bg2: '#02060a', primary: '#22d3ee', secondary: '#0284c7', accent: '#67e8f9' },
    { bg1: '#180a13', bg2: '#070105', primary: '#fb7185', secondary: '#e11d48', accent: '#fda4af' },
    { bg1: '#0f1422', bg2: '#03050a', primary: '#60a5fa', secondary: '#a855f7', accent: '#93c5fd' },
    { bg1: '#05161a', bg2: '#010708', primary: '#14b8a6', secondary: '#06b6d4', accent: '#5eead4' }
  ];
  
  const p = PALETTES[seed % PALETTES.length];
  
  const nodeCount = 14;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 + ((seed % 100) / 100);
    const dist = 60 + ((seed * (i + 1) * 31) % 150);
    const x = 400 + Math.cos(angle) * dist;
    const y = 250 + Math.sin(angle) * (dist * 0.65);
    const r = 2.5 + ((seed + i * 17) % 4);
    nodes.push({ x: Math.round(x), y: Math.round(y), r });
  }
  
  const lines = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        lines.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, opacity: Math.max(0.15, (1 - dist / 130) * 0.6) });
      }
    }
  }

  const cleanLabel = (context || 'Artificial Intelligence').replace(/_/g, ' ').toUpperCase();
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="bg-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}" />
      <stop offset="100%" stop-color="${p.bg2}" />
    </linearGradient>
    <radialGradient id="centerGlow-${seed}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.primary}" stop-opacity="0.32" />
      <stop offset="60%" stop-color="${p.secondary}" stop-opacity="0.08" />
      <stop offset="100%" stop-color="${p.bg2}" stop-opacity="0" />
    </radialGradient>
    <filter id="glow-${seed}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  
  <rect width="800" height="500" fill="url(#bg-${seed})" />
  
  <g opacity="0.1" stroke="${p.primary}" stroke-width="1">
    <line x1="0" y1="360" x2="800" y2="360" />
    <line x1="0" y1="410" x2="800" y2="410" />
    <line x1="0" y1="450" x2="800" y2="450" />
    <line x1="80" y1="500" x2="360" y2="310" />
    <line x1="240" y1="500" x2="385" y2="310" />
    <line x1="400" y1="500" x2="400" y2="310" />
    <line x1="560" y1="500" x2="415" y2="310" />
    <line x1="720" y1="500" x2="440" y2="310" />
  </g>
  
  <circle cx="400" cy="250" r="230" fill="url(#centerGlow-${seed})" />
  
  <g stroke="${p.primary}" stroke-width="1.2">
    ${lines.map(l => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke-opacity="${l.opacity.toFixed(2)}" />`).join('\n    ')}
  </g>
  
  <g filter="url(#glow-${seed})">
    ${nodes.map(n => `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${p.accent}" />`).join('\n    ')}
  </g>
  
  <circle cx="400" cy="250" r="48" fill="none" stroke="${p.primary}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.7" />
  <circle cx="400" cy="250" r="28" fill="none" stroke="${p.secondary}" stroke-width="2" opacity="0.85" />
  <circle cx="400" cy="250" r="5" fill="${p.accent}" filter="url(#glow-${seed})" />
  
  <g transform="translate(40, 40)">
    <rect width="180" height="28" rx="14" fill="#000000" fill-opacity="0.65" stroke="${p.primary}" stroke-width="1" stroke-opacity="0.5" />
    <circle cx="16" cy="14" r="4" fill="${p.primary}" />
    <text x="28" y="18" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="0.08em">${cleanLabel.slice(0, 18)}</text>
  </g>
  
  <text x="760" y="470" text-anchor="end" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" letter-spacing="0.1em" opacity="0.6">READ AI NEWS · WIRE</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function getOrAssignUniqueImage(article, takenInBatch = new Set()) {
  const globalUsed = getAllUsedPhotoIds();
  const currentBaseId = getBaseImageId(article?.imageUrl);
  
  if (currentBaseId && !takenInBatch.has(currentBaseId) && !globalUsed.has(currentBaseId)) {
    markPhotoIdUsed(currentBaseId);
    takenInBatch.add(currentBaseId);
    return article.imageUrl;
  }
  
  const ctx = article?.context || 'frontier_models';
  const categoryPool = VERIFIED_CONTEXT_PHOTO_POOLS[ctx] || VERIFIED_CONTEXT_PHOTO_POOLS.frontier_models;
  
  for (const id of categoryPool) {
    const candidateBaseId = id.toLowerCase();
    if (!takenInBatch.has(candidateBaseId) && !globalUsed.has(candidateBaseId)) {
      markPhotoIdUsed(candidateBaseId);
      takenInBatch.add(candidateBaseId);
      return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
    }
  }
  
  for (const id of VERIFIED_CONTEXT_PHOTO_POOLS.tech_general) {
    const candidateBaseId = id.toLowerCase();
    if (!takenInBatch.has(candidateBaseId) && !globalUsed.has(candidateBaseId)) {
      markPhotoIdUsed(candidateBaseId);
      takenInBatch.add(candidateBaseId);
      return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
    }
  }
  
  for (const [catName, pool] of Object.entries(VERIFIED_CONTEXT_PHOTO_POOLS)) {
    for (const id of pool) {
      const candidateBaseId = id.toLowerCase();
      if (!takenInBatch.has(candidateBaseId) && !globalUsed.has(candidateBaseId)) {
        markPhotoIdUsed(candidateBaseId);
        takenInBatch.add(candidateBaseId);
        return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
      }
    }
  }
  
  const svgUrl = generateUniqueProceduralSvg(article?.title, article?.context, article?.id);
  const svgId = getBaseImageId(svgUrl);
  markPhotoIdUsed(svgId);
  takenInBatch.add(svgId);
  return svgUrl;
}

export function ensureStrictlyUniqueImages(articles = []) {
  if (!Array.isArray(articles) || articles.length === 0) return articles;
  
  const takenInBatch = new Set();
  
  return articles.map((article) => {
    const baseId = getBaseImageId(article.imageUrl);
    
    if (!baseId || takenInBatch.has(baseId)) {
      const uniqueUrl = getOrAssignUniqueImage(article, takenInBatch);
      return {
        ...article,
        imageUrl: uniqueUrl
      };
    }
    
    markPhotoIdUsed(baseId);
    takenInBatch.add(baseId);
    return article;
  });
}
