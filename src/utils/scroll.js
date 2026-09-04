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

  // Combined sticky header height: Navbar (56px mobile / 64px desktop) + Sub-bar (~49px mobile / ~56px desktop)
  // Aligns the start of the section directly beneath the sticky navigation on both mobile and web.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const headerOffset = isMobile ? 106 : 122;

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
