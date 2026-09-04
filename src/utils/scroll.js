import { sound } from './audio';

/**
 * Premium offset-aware smooth scrolling that guarantees the target section
 * is completely visible with ample breathing room below the sticky navbar.
 * Accounts for both mobile (56px) and desktop (64px) sticky navbar heights.
 */
export function smoothScrollTo(elementId, playAudio = true) {
  if (playAudio) {
    sound.playClick();
  }

  const el = document.getElementById(elementId);
  if (!el) return;

  // Sticky header height: 56px on mobile, 64px on desktop.
  // Breathing room cushion: 24px on mobile, 36px on desktop.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const headerOffset = isMobile ? 80 : 100;

  const elementPosition = el.getBoundingClientRect().top;
  const targetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: 'smooth'
  });

  // Notify components for premium ambient illumination feedback
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('section-navigated', { detail: { id: elementId } }));
  }
}
