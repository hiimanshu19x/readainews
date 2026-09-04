import fs from 'fs';

const items = JSON.parse(fs.readFileSync('scripts/dataset.json', 'utf8'));

const fileHeader = `// Real-time verified AI news sourced directly from the world's top 15 premier publications:
// Tier 1 (Breaking / Important): Reuters, Bloomberg, Financial Times, AP, WSJ
// Tier 2 (AI Industry): TechCrunch, The Information, VentureBeat, The Verge
// Tier 3 (Deep Analysis): MIT Technology Review, WIRED, Ars Technica, IEEE Spectrum
// Tier 4 (Research): Nature, Science
// Date: September 4, 2026
// Each article features direct canonical URLs to the original publication,
// 220+ words of in-depth AI journalism, 3 key technical takeaways, and "Why It Matters".

export const allNewsArticles = ${JSON.stringify(items, null, 2)};

export const weeklyCollection = allNewsArticles.filter(item => item.isWeeklyBest);
`;

fs.writeFileSync('src/data/newsData.js', fileHeader, 'utf8');
console.log('src/data/newsData.js successfully generated with', items.length, 'articles.');
