import React from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Cpu
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function InfoModal({ modalType, onClose }) {
  if (!modalType) return null;

  const renderContent = () => {
    switch (modalType) {
      case 'editorial':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
              <Globe size={14} />
              <span>EDITORIAL INTEGRITY & SOURCING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Editorial Standards & Sourcing Methodology
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              ReadAiNews exists to cut through speculative hype, promotional press releases, and unverified AI benchmarks. We enforce strict editorial guidelines before any story is synthesized by AI and published to today's feed.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Tier-1 Investigative Sourcing
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We monitor and scrape breaking coverage exclusively from globally verified news outlets: <strong>Reuters, Bloomberg, TechCrunch, The Verge, MIT Technology Review</strong>, and peer-reviewed arXiv research papers. Stories based solely on unverified social media rumors are discarded.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Anti-Hallucination & Verification
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Every AI-synthesized article is cross-checked against primary benchmark databases (SWE-bench, MATH-500, HumanEval, and live GitHub repositories) to ensure technical claims, parameter counts, and benchmarks are 100% factual.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Transparent Attribution & Fair Use
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We never obscure primary reporting. Every article prominently credits the investigative newsroom that broke the story and includes direct outbound links so readers can explore the original investigative piece.
                </p>
              </div>
            </div>
          </div>
        );

      case 'zero-repeat':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <ShieldCheck size={14} />
              <span>DEDUPLICATION GUARANTEE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The Zero-Repeat Algorithm
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Nothing is more frustrating than reading the same recycled news twice. ReadAiNews incorporates a stateful deduplication ledger that mathematically prevents duplicate stories from appearing on the same calendar day.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <Cpu size={16} className="text-cyan-400" />
                  How the Daily Ledger Works
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Each article is indexed by a deterministic canonical ID. When you visit the site or click Shuffle, the engine cross-references your client-side daily registry (<code className="text-cyan-300 bg-black/50 px-1 py-0.5 rounded">readainews_seen_YYYY-MM-DD</code>) to exclude any story already presented to you today.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Automatic Midnight Rotation
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  At 00:00:00 UTC, the daily ledger automatically cycles, clearing stale IDs from past dates to keep your browser memory pristine while retrieving a brand new batch of breaking stories for the new date.
                </p>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <Lock size={14} />
              <span>PRIVACY FIRST</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Effective Date: September 4, 2026. ReadAiNews is built on a simple premise: you should be able to read high-signal artificial intelligence news without being tracked across the web.
            </p>

            <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="font-bold text-white text-sm mb-1">1. Zero Third-Party Tracking Cookies</h4>
                <p className="text-zinc-400">
                  We do not use advertising trackers, cross-site cookies, or surveillance pixels. Your reading history, bookmarks, and deduplication states are stored strictly on your local device in browser <code className="text-zinc-300">localStorage</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="font-bold text-white text-sm mb-1">2. Newsletter Data Protection</h4>
                <p className="text-zinc-400">
                  If you choose to subscribe to our daily email digest, your email address is used solely for delivering today's 5 top stories. We never sell, lease, or distribute your contact details to third-party marketing brokers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="font-bold text-white text-sm mb-1">3. Data Deletion</h4>
                <p className="text-zinc-400">
                  You can purge your reading ledger and saved bookmarks at any time by clearing your browser cache or clicking "Reset today" in the Daily Top 5 section.
                </p>
              </div>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <FileText size={14} />
              <span>LEGAL & COMPLIANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Terms of Service
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Welcome to ReadAiNews. By accessing or using our website and services, you agree to comply with the following terms.
            </p>

            <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="font-bold text-white text-sm mb-1">1. Informational & Research Purpose</h4>
                <p className="text-zinc-400">
                  ReadAiNews synthesizes publicly available artificial intelligence news dispatches, research announcements, and benchmark evaluations. The content provided is for informational, academic, and research purposes and does not constitute financial, legal, or investment advice.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="font-bold text-white text-sm mb-1">2. Fair Use & Intellectual Property</h4>
                <p className="text-zinc-400">
                  Article summaries, executive briefings, and takeaway points are prepared through transformative AI evaluation. All trademarks, company names, and original reportage belong to their respective publications (Reuters, Bloomberg, TechCrunch, The Verge, MIT Technology Review).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                <h4 className="font-bold text-white text-sm mb-1">3. Creator Attribution</h4>
                <p className="text-zinc-400">
                  ReadAiNews is an independent AI intelligence and curation project developed and maintained by HX.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-deal">
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => { sound.playClick(); onClose(); }} 
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-t-[28px] sm:rounded-3xl bg-[#0c0c10] border-t sm:border border-white/20 shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* iOS Drag Handle on Mobile */}
        <div className="sm:hidden w-12 h-1.5 rounded-full bg-white/25 mx-auto mt-2.5 mb-1 cursor-pointer" onClick={() => onClose()} />

        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-zinc-400 uppercase">ReadAiNews • Daily Intelligence</span>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 hover:bg-zinc-800 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
