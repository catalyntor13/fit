export default function scrollToId(id: string, offset = 80, duration = 800) {
  const el = document.getElementById(id);
  if (!el) return;

  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;

  const startTime = performance.now();

  function easeInOutQuad(t: number) {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  function animateScroll(currentTime: number) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const eased = easeInOutQuad(progress);

    const newY = startY + (targetY - startY) * eased;
    window.scrollTo(0, newY);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}
