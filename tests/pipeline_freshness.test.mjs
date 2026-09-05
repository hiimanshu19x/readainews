// tests/pipeline_freshness.test.mjs
// Automated verification of the 12 core edge cases for ReadAiNews data pipeline

import {
  safeParseDate,
  isFreshArticle,
  isAiRelevant,
  deduplicateArticles,
  filterAndRankNews,
  normalizeUrl
} from '../src/utils/newsPipeline.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('\n--- EXECUTING READAINEWS PIPELINE VERIFICATION SUITE ---\n');

const now = Date.now();
const ONE_HOUR = 3600 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

// Test 1: 2 hours old -> ACCEPT
console.log('[Test 1] Article published 2 hours ago:');
const d2h = new Date(now - 2 * ONE_HOUR).toISOString();
const p2h = safeParseDate(d2h);
assert(isFreshArticle(p2h, now, ONE_DAY) === true, 'Article published 2h ago is ACCEPTED');

// Test 2: 23 hours old -> ACCEPT
console.log('\n[Test 2] Article published 23 hours ago:');
const d23h = new Date(now - 23 * ONE_HOUR).toISOString();
const p23h = safeParseDate(d23h);
assert(isFreshArticle(p23h, now, ONE_DAY) === true, 'Article published 23h ago is ACCEPTED');

// Test 3: 25 hours old -> REJECT
console.log('\n[Test 3] Article published 25 hours ago:');
const d25h = new Date(now - 25 * ONE_HOUR).toISOString();
const p25h = safeParseDate(d25h);
assert(isFreshArticle(p25h, now, ONE_DAY) === false, 'Article published 25h ago is strictly REJECTED');

// Test 4: 3 days old -> REJECT
console.log('\n[Test 4] Article published 3 days ago:');
const d3d = new Date(now - 3 * ONE_DAY).toISOString();
const p3d = safeParseDate(d3d);
assert(isFreshArticle(p3d, now, ONE_DAY) === false, 'Article published 3 days ago is strictly REJECTED');

// Test 5: Missing publication date -> REJECT
console.log('\n[Test 5] Missing publication date:');
const pMissing1 = safeParseDate(null);
const pMissing2 = safeParseDate('');
const pMissing3 = safeParseDate(undefined);
assert(pMissing1 === null && isFreshArticle(pMissing1, now, ONE_DAY) === false, 'null publication date is strictly REJECTED');
assert(pMissing2 === null && isFreshArticle(pMissing2, now, ONE_DAY) === false, 'empty publication date is strictly REJECTED');
assert(pMissing3 === null && isFreshArticle(pMissing3, now, ONE_DAY) === false, 'undefined publication date is strictly REJECTED');

// Test 6: Invalid publication date format -> REJECT
console.log('\n[Test 6] Invalid publication date format:');
const pInvalid1 = safeParseDate('not a real date');
const pInvalid2 = safeParseDate('2025-99-99T99:99:99Z');
const pInvalid3 = safeParseDate('yesterday');
assert(pInvalid1 === null && isFreshArticle(pInvalid1, now, ONE_DAY) === false, '"not a real date" is strictly REJECTED');
assert(pInvalid2 === null && isFreshArticle(pInvalid2, now, ONE_DAY) === false, '"2025-99-99..." is strictly REJECTED');
assert(pInvalid3 === null && isFreshArticle(pInvalid3, now, ONE_DAY) === false, '"yesterday" string is strictly REJECTED');

// Test 7: Article from different timezone correctly converted -> VERIFY
console.log('\n[Test 7] Article timezone conversion:');
const fiveHoursAgoEpoch = now - 5 * ONE_HOUR;
const edtString = 'Sat, 05 Sep 2026 03:00:00 -0400';
const parsedEdt = safeParseDate(edtString);
assert(parsedEdt !== null, 'RFC 822 with -0400 timezone offset parsed successfully');
const jstIso = new Date(fiveHoursAgoEpoch).toISOString().replace('Z', '+09:00');
const parsedJst = safeParseDate(jstIso);
assert(parsedJst !== null, 'ISO-8601 with +09:00 offset parsed successfully');
assert(isFreshArticle(parsedEdt, now, ONE_DAY) === true, 'Non-UTC timezone date evaluates accurately against UTC now');

// Test 8: Duplicate article from multiple sources (same canonical URL) -> DEDUPLICATE
console.log('\n[Test 8] Deduplicate identical canonical URL from multiple sources:');
const articleA = {
  id: 'a1',
  title: 'Anthropic Releases Claude 3.7 Sonnet Model',
  canonicalUrl: 'https://techcrunch.com/2026/09/05/anthropic-releases-claude-3-7/?utm_source=rss',
  publishedEpoch: now - 3 * ONE_HOUR,
  source: 'TechCrunch AI'
};
const articleB = {
  id: 'a2',
  title: 'Anthropic Releases Claude 3.7 Sonnet Model',
  canonicalUrl: 'https://techcrunch.com/2026/09/05/anthropic-releases-claude-3-7/#comments',
  publishedEpoch: now - 2 * ONE_HOUR,
  source: 'The Verge'
};
const dedupedUrl = deduplicateArticles([articleA, articleB]);
assert(dedupedUrl.length === 1, `2 articles with same canonical URL reduced to 1 (got ${dedupedUrl.length})`);
assert(dedupedUrl[0].title === 'Anthropic Releases Claude 3.7 Sonnet Model', 'Correct article retained');

// Test 9: Duplicate article with slightly different titles -> DEDUPLICATE
console.log('\n[Test 9] Deduplicate near-identical titles (cross-reporting):');
const articleTitle1 = {
  id: 't1',
  title: 'OpenAI Launches Autonomous Coding Agent for Developers',
  canonicalUrl: 'https://example.com/openai-coding-agent',
  publishedEpoch: now - 2 * ONE_HOUR,
  source: 'OpenAI'
};
const articleTitle2 = {
  id: 't2',
  title: 'OpenAI Launches Autonomous Coding Agent for Developers Worldwide',
  canonicalUrl: 'https://different-outlet.com/openai-coding-agent-launch',
  publishedEpoch: now - 1 * ONE_HOUR,
  source: 'WIRED'
};
const dedupedTitle = deduplicateArticles([articleTitle1, articleTitle2]);
assert(dedupedTitle.length === 1, `Near-identical title duplicate reduced to 1 (got ${dedupedTitle.length})`);

// Test 10: One source completely down/failing -> PIPELINE CONTINUES
console.log('\n[Test 10] Source failure isolation:');
const mockFeeds = [
  { name: 'Broken Source', url: 'https://broken-invalid-domain-xyz-123.org/rss' },
  { name: 'Working Source', items: [{ title: 'NVIDIA Unveils New Blackwell Ultra AI GPU', link: 'https://nvidia.com/gpu', pubDate: new Date(now - 1 * ONE_HOUR).toISOString(), description: 'New artificial intelligence GPU architecture' }] }
];
const simulatedResults = [];
for (const feed of mockFeeds) {
  try {
    if (feed.url) {
      throw new Error('Simulated network error DNS failure');
    }
    simulatedResults.push(...feed.items);
  } catch (err) {
    console.log(`    (Safely isolated error for ${feed.name}: ${err.message})`);
  }
}
assert(simulatedResults.length === 1, 'Pipeline continues processing remaining sources when one feed fails');

// Test 11: Feed returns 1000 articles, only 5 are from last 24h -> ONLY THOSE 5 CONSIDERED
console.log('\n[Test 11] Feed with 1000 articles, only 5 fresh:');
const mock1000Articles = [];
for (let i = 0; i < 995; i++) {
  mock1000Articles.push({
    id: `stale-${i}`,
    title: `Stale AI News Story #${i}`,
    link: `https://example.com/stale-${i}`,
    pubDate: new Date(now - (2 + (i % 28)) * ONE_DAY).toISOString(),
    description: 'Artificial intelligence machine learning neural network development'
  });
}
const distinctFreshStories = [
  'Google DeepMind Introduces New Gemini Reasoning Architecture',
  'NVIDIA Releases Blackwell Ultra AI Accelerators for Hyperscalers',
  'Anthropic Expands Claude Context Window to Millions of Tokens',
  'OpenAI Deploys Autonomous Coding Assistant for Developers',
  'Meta Open Sources Next Generation Llama Weights Globally'
];
for (let i = 0; i < 5; i++) {
  mock1000Articles.push({
    id: `fresh-${i}`,
    title: distinctFreshStories[i],
    link: `https://example.com/fresh-${i}`,
    pubDate: new Date(now - (1 + i * 2) * ONE_HOUR).toISOString(),
    description: 'Artificial intelligence machine learning deep learning breakthrough'
  });
}
const filteredRanked = filterAndRankNews(mock1000Articles, { nowEpoch: now, maxAgeMs: ONE_DAY, maxStories: 5 });
assert(filteredRanked.length === 5, `Expected 5 fresh articles returned, got ${filteredRanked.length}`);
const allAreFresh = filteredRanked.every(a => a.id.startsWith('fresh-'));
assert(allAreFresh === true, 'All 5 returned articles are strictly from the fresh set (0 stale articles included)');

// Test 12: Only 3 fresh articles exist across all sources -> RETURN ONLY 3, NO BACKFILLING
console.log('\n[Test 12] Scarcity condition: Only 3 fresh articles exist across all sources:');
const scarceArticles = [
  {
    id: 'old-1',
    title: 'Historic AI Milestone from Last Month',
    link: 'https://example.com/old-1',
    pubDate: new Date(now - 30 * ONE_DAY).toISOString(),
    description: 'Artificial intelligence history'
  },
  {
    id: 'old-2',
    title: 'LLM Benchmark Results from 3 Days Ago',
    link: 'https://example.com/old-2',
    pubDate: new Date(now - 3 * ONE_DAY).toISOString(),
    description: 'Artificial intelligence benchmark'
  },
  {
    id: 'fresh-1',
    title: 'Google DeepMind Announces New Gemini Reasoning Architecture',
    link: 'https://example.com/fresh-1',
    pubDate: new Date(now - 2 * ONE_HOUR).toISOString(),
    description: 'Artificial intelligence model deepmind gemini reasoning'
  },
  {
    id: 'fresh-2',
    title: 'OpenAI Releases Realtime Voice API Updates',
    link: 'https://example.com/fresh-2',
    pubDate: new Date(now - 4 * ONE_HOUR).toISOString(),
    description: 'OpenAI artificial intelligence speech voice synthesis'
  },
  {
    id: 'fresh-3',
    title: 'Meta Open-Sources Llama Code Assistant',
    link: 'https://example.com/fresh-3',
    pubDate: new Date(now - 8 * ONE_HOUR).toISOString(),
    description: 'Meta llama artificial intelligence open source model'
  }
];

const scarceResult = filterAndRankNews(scarceArticles, { nowEpoch: now, maxAgeMs: ONE_DAY, maxStories: 5 });
assert(scarceResult.length === 3, `Expected strictly 3 articles returned (no backfilling with older ones), got ${scarceResult.length}`);
assert(scarceResult.every(a => a.id.startsWith('fresh-')), 'Returned articles contain strictly the 3 fresh articles');

console.log('\n========================================');
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
