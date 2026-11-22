/* Subtle wave along the bottom of the page that follows the cursor.
   Three faint lines drift gently; a soft ripple travels to wherever the
   cursor is, and grows slightly the faster you move. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const inner = document.body.classList.contains('inner');
  const rgb = inner ? '11,20,38' : '255,255,255';   // navy ink on beige, white on navy

  const canvas = document.createElement('canvas');
  canvas.id = 'wave';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const lines = [
    { y: 0.50, amp: 5, k: 0.010, speed: 0.60, alpha: 0.24 },
    { y: 0.65, amp: 7, k: 0.007, speed: 0.45, alpha: 0.16 },
    { y: 0.80, amp: 9, k: 0.005, speed: 0.30, alpha: 0.10 },
  ];

  let w = 0, h = 0, t = 0;
  let cx = innerWidth / 2, target = cx, lastX = cx, energy = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth;
    h = canvas.clientHeight || 160;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduce) draw();
  }

  addEventListener('resize', resize);
  addEventListener('pointermove', (e) => {
    energy = Math.min(1, energy + Math.abs(e.clientX - lastX) * 0.004);
    lastX = e.clientX;
    target = e.clientX;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    cx += (target - cx) * 0.06;     // the ripple eases toward the cursor
    energy *= 0.965;                // and calms down when you stop

    for (const L of lines) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const envelope = Math.exp(-Math.pow(x - cx, 2) / (2 * 180 * 180));
        const y = h * L.y
          + L.amp * Math.sin(x * L.k + t * L.speed)
          + envelope * (6 + 16 * energy) * Math.sin((x - cx) * 0.035 - t * 2);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(' + rgb + ',' + L.alpha + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    t += 0.016;
    if (!reduce) requestAnimationFrame(draw);
  }

  resize();
  if (!reduce) draw();
})();
