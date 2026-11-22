/* Custom cursor: a small dot that follows the mouse exactly, plus a ring
   that trails slightly behind and grows over links and buttons.
   Skipped on touch devices and for people who prefer reduced motion. */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('has-custom-cursor');

  const dot = document.createElement('div');  dot.className = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.append(ring, dot);

  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;

  addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  });

  (function loop() {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    ring.style.transform = 'translate(' + rx + 'px, ' + ry + 'px)';
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', (e) => {
    ring.classList.toggle('active', !!e.target.closest('a, button, input, textarea'));
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = 1; ring.style.opacity = 1; });
})();
