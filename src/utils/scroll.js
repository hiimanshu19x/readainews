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

  // Combined sticky header height:
  // Desktop (>= 768px): Only top Navbar is sticky (64px) -> offset 74px provides perfect breathing room.
  // Mobile (< 768px): Top Navbar (56px) + Mobile Sub-bar (~44px) -> offset 106px aligns exactly.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const headerOffset = isMobile ? 106 : 74;

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
