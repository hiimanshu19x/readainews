/**
 * sourceRegistry.js - Centralized Trusted AI News Sources
 * 
 * Configures premier publications and primary AI research laboratories.
 * Uses official RSS, Atom, and public endpoints with zero terms-of-service violations.
 */

export const TRUSTED_AI_SOURCES = [
  // --- Premier Technology & Industry Newsrooms ---
  {
    id: 'techcrunch-ai',
    name: 'TechCrunch AI',
    domain: 'https://techcrunch.com',
    feedUrl: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'industry',
    weight: 1.0,
    isAtom: false
  },
  {
    id: 'the-verge-ai',
    name: 'The Verge AI',
    domain: 'https://www.theverge.com',
    feedUrl: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    category: 'industry',
    weight: 0.95,
    isAtom: true
  },
  {
    id: 'mit-tech-review-ai',
    name: 'MIT Technology Review',
    domain: 'https://www.technologyreview.com',
    feedUrl: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
    category: 'research',
    weight: 1.0,
    isAtom: false
  },
  {
    id: 'wired-ai',
    name: 'WIRED AI',
    domain: 'https://www.wired.com',
    feedUrl: 'https://www.wired.com/feed/tag/ai/latest/rss',
    category: 'industry',
    weight: 0.95,
    isAtom: false
  },
  {
    id: 'ars-technica',
    name: 'Ars Technica',
    domain: 'https://arstechnica.com',
    feedUrl: 'https://feeds.arstechnica.com/arstechnica/technology-lab',
    category: 'technology',
    weight: 0.95,
    isAtom: false
  },
  {
    id: 'bbc-technology',
    name: 'BBC News',
    domain: 'https://www.bbc.com',
    feedUrl: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    category: 'general_tech',
    weight: 0.9,
    isAtom: false
  },
  {
    id: 'ieee-spectrum-ai',
    name: 'IEEE Spectrum',
    domain: 'https://spectrum.ieee.org',
    feedUrl: 'https://spectrum.ieee.org/rss/topic/artificial-intelligence',
    category: 'engineering',
    weight: 0.95,
    isAtom: false
  },
  {
    id: 'the-decoder',
    name: 'The Decoder',
    domain: 'https://the-decoder.com',
    feedUrl: 'https://the-decoder.com/feed/',
    category: 'frontier_models',
    weight: 0.9,
    isAtom: false
  },
  {
    id: 'marktechpost-ai',
    name: 'MarkTechPost AI',
    domain: 'https://www.marktechpost.com',
    feedUrl: 'https://www.marktechpost.com/feed/',
    category: 'research',
    weight: 0.85,
    isAtom: false
  },

  // --- Primary AI Labs & Major Technology Companies ---
  {
    id: 'google-deepmind',
    name: 'Google DeepMind',
    domain: 'https://deepmind.google',
    feedUrl: 'https://deepmind.google/blog/rss.xml',
    category: 'frontier_models',
    weight: 1.0,
    isAtom: false
  },
  {
    id: 'google-ai-blog',
    name: 'Google AI',
    domain: 'https://blog.google',
    feedUrl: 'https://blog.google/technology/ai/rss/',
    category: 'frontier_models',
    weight: 0.95,
    isAtom: false
  },
  {
    id: 'openai-blog',
    name: 'OpenAI Research',
    domain: 'https://openai.com',
    feedUrl: 'https://openai.com/news/rss.xml',
    category: 'frontier_models',
    weight: 1.0,
    isAtom: true
  },
  {
    id: 'nvidia-blog',
    name: 'NVIDIA Blog',
    domain: 'https://blogs.nvidia.com',
    feedUrl: 'https://blogs.nvidia.com/feed/',
    category: 'hardware_silicon',
    weight: 0.95,
    isAtom: false
  },
  {
    id: 'huggingface-blog',
    name: 'Hugging Face',
    domain: 'https://huggingface.co',
    feedUrl: 'https://huggingface.co/blog/feed.xml',
    category: 'open_source',
    weight: 0.95,
    isAtom: true
  },
  {
    id: 'microsoft-blog',
    name: 'Microsoft AI',
    domain: 'https://blogs.microsoft.com',
    feedUrl: 'https://blogs.microsoft.com/feed/',
    category: 'enterprise',
    weight: 0.9,
    isAtom: false
  }
];
