import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scripts/dataset.json', 'utf8'));

const meshThemes = [
  'emerald', 'cyan', 'indigo', 'purple', 'amber', 
  'rose', 'blue', 'teal', 'violet', 'orange'
];

const normalized = raw.map((item, index) => {
  const content = item.content || item.fullContent || '';
  const keyTakeaways = item.keyTakeaways || item.keyPoints || [];
  const sourceUrl = item.sourceUrl || item.originalUrl || 'https://news.google.com';
  
  // Assign tier key
  let tier = item.tier || 'breaking';
  if (['Reuters', 'Bloomberg', 'Financial Times', 'AP', 'WSJ'].includes(item.source)) {
    tier = 'breaking';
  } else if (['TechCrunch', 'The Information', 'VentureBeat', 'The Verge'].includes(item.source)) {
    tier = 'industry';
  } else if (['MIT Technology Review', 'WIRED', 'Ars Technica', 'IEEE Spectrum'].includes(item.source)) {
    tier = 'analysis';
  } else if (['Nature', 'Science'].includes(item.source)) {
    tier = 'research';
  }

  // Assign category
  let category = item.category;
  if (tier === 'breaking') category = 'BREAKING NEWS';
  if (tier === 'industry') category = 'AI INDUSTRY';
  if (tier === 'analysis') category = 'DEEP ANALYSIS';
  if (tier === 'research') category = 'RESEARCH';

  const timeAgos = [
    '15m ago', '32m ago', '48m ago', '1h ago', '2h ago',
    '2h ago', '3h ago', '3h ago', '4h ago', '5h ago',
    '5h ago', '6h ago', '7h ago', '8h ago', '9h ago'
  ];

  return {
    id: item.id,
    title: item.title,
    category: category,
    tier: tier,
    publishedDate: 'September 4, 2026',
    dateKey: '2026-09-04',
    timeAgo: item.timeAgo || timeAgos[index % timeAgos.length],
    readTime: item.readTime || '5 min read',
    source: item.source,
    sourceUrl: sourceUrl,
    originalUrl: sourceUrl,
    meshTheme: item.meshTheme || meshThemes[index % meshThemes.length],
    featured: index === 0 || index === 5 || index === 9 || index === 13,
    summary: item.summary,
    content: content,
    keyTakeaways: keyTakeaways,
    whyItMatters: item.whyItMatters || '',
    views: item.views || (1200 + (15 - index) * 180),
    isWeeklyBest: [0, 2, 5, 9, 13].includes(index),
    weeklyRank: [0, 2, 5, 9, 13].indexOf(index) !== -1 ? [0, 2, 5, 9, 13].indexOf(index) + 1 : undefined,
    weekEdition: 'Week 36 · Sept 1 - Sept 7, 2026'
  };
});

fs.writeFileSync('scripts/dataset.json', JSON.stringify(normalized, null, 2));
console.log('Successfully standardized 15 articles in scripts/dataset.json');
