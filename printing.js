(() => {
  const scene = document.querySelector('.printing-scene');
  const track = document.querySelector('.printing-track');
  const fallback = document.querySelector('.pieces-fallback');
  const control = document.querySelector('#print-control');
  const label = control.querySelector('.control-label');
  const icon = control.querySelector('.control-icon');
  const status = document.querySelector('#print-status');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const ns = 'http://www.w3.org/2000/svg';
  const total = 5600;
  let pieces = [], elapsed = 0, previousTime = null, frame = 0;
  let paused = false, visible = true, ready = false, finished = false;
  function setControl() {
    if (reduce.matches) { control.hidden = true; return; }
    control.hidden = false;
    control.disabled = !ready;
    label.textContent = finished ? 'Rever impressão' : paused ? 'Continuar impressão' : 'Pausar impressão';
    icon.textContent = finished ? '↻' : paused ? '▶' : 'Ⅱ';
    control.setAttribute('aria-label', label.textContent + ' dos objetos');
  }
  function draw(time) {
    pieces.forEach((piece, index) => {
      const start = 400 + index * 180;
      const duration = 3400 + (index % 3) * 250;
      let progress = Math.min(1, Math.max(0, (time - start) / duration));
      if (reduce.matches) progress = 1;
      const layered = progress === 1 ? 1 : Math.floor(progress * 100) / 100;
      const bottom = piece.bounds[3] + 3;
      const top = piece.bounds[1] - 3;
      piece.mask.setAttribute('transform', 'matrix(1 0 0 ' + layered + ' 0 ' + (bottom * (1 - layered)) + ')');
      const active = progress > 0 && progress < 1 && !reduce.matches;
      piece.head.style.opacity = active ? '1' : '0';
      if (active) {
        const sweep = (time / 320 + index * .25) % 2;
        const direction = sweep <= 1 ? sweep : 2 - sweep;
        const x = piece.bounds[0] + 12 + direction * Math.max(1, piece.bounds[2] - piece.bounds[0] - 24);
        const y = bottom - (bottom - top) * layered;
        piece.head.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + piece.scale + ')');
      }
    });
  }
  function stopFrame() { cancelAnimationFrame(frame); frame = 0; previousTime = null; }
  function animate(now) {
    frame = 0;
    if (!ready || paused || finished || !visible || document.hidden || reduce.matches) { previousTime = null; return; }
    if (previousTime !== null) elapsed += Math.min(64, now - previousTime);
    previousTime = now;
    draw(elapsed);
    if (elapsed >= total) {
      finished = true;
      previousTime = null;
      status.textContent = 'Sua ideia pode ser a próxima.';
      setControl();
      return;
    }
    frame = requestAnimationFrame(animate);
  }
  function resume() {
    if (!frame && ready && !paused && !finished && visible && !document.hidden && !reduce.matches) frame = requestAnimationFrame(animate);
  }
  control.addEventListener('click', () => {
    if (finished) {
      elapsed = 0; finished = false; paused = false;
      status.textContent = 'Uma camada de cada vez.';
      draw(0);
    } else {
      paused = !paused;
    }
    if (paused) stopFrame(); else resume();
    setControl();
  });
  reduce.addEventListener('change', () => {
    stopFrame();
    if (reduce.matches) { draw(total); finished = true; status.textContent = 'Criatividade em cada camada.'; }
    setControl();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopFrame(); else resume(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) stopFrame(); else resume();
    }, {threshold:0}).observe(scene);
  }
  async function setup() {
    const response = await fetch('assets/pecas-lineup.json');
    if (!response.ok) throw Error('Metadados indisponíveis');
    const config = await response.json();
    await fallback.decode();
    const {width, height, bounds, viewBox, cuts} = config;
    fallback.width = width; fallback.height = height;
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', viewBox.join(' '));
    svg.setAttribute('preserveAspectRatio', 'xMidYMax meet');
    svg.setAttribute('aria-hidden', 'true');
    let defs = "<defs><image id='lineup-art' href='assets/pecas-lineup.webp' width='" + width + "' height='" + height + "'/>";
    bounds.forEach((box,index) => {
      const cellStart = cuts[index];
      const cellEnd = cuts[index + 1];
      defs += "<clipPath id='piece-window-" + index + "'><rect x='" + cellStart + "' y='0' width='" + (cellEnd-cellStart) + "' height='" + height + "'/></clipPath>";
      defs += "<clipPath id='piece-build-" + index + "'><rect id='build-mask-" + index + "' x='0' y='" + (box[1]-3) + "' width='" + width + "' height='" + (box[3]-box[1]+6) + "'/></clipPath>";
    });
    defs += '</defs>';
    let body = "<use href='#lineup-art' class='piece-ghost'/>";
    bounds.forEach((box,index) => {
      body += "<g clip-path='url(#piece-window-" + index + ")'><g clip-path='url(#piece-build-" + index + ")'><use href='#lineup-art'/></g></g>";
    });
    bounds.forEach((box,index) => {
      body += "<g class='print-head' id='head-" + index + "' opacity='0'><path d='M-9-28V-48M9-28V-48' stroke='#4f4c46' stroke-width='1.1'/><rect x='-18' y='-30' width='36' height='17' rx='3' fill='#242321'/><path d='M-9-13H9L4-4H-4Z' fill='#6e6a62'/><path d='M-4-4H4L1 0H-1Z' fill='#171717'/><path d='M-11-24H11M-11-20H11' stroke='#8d897f' stroke-width='1.1'/><path d='M-20 1H20' stroke='#8d897f' stroke-width='.6' opacity='.65'/></g>";
    });
    svg.innerHTML = defs + body;
    track.append(svg);
    pieces = bounds.map((box,index) => ({
      bounds:box, mask:svg.querySelector('#build-mask-'+index),
      head:svg.querySelector('#head-'+index), scale:width/1800
    }));
    ready = true;
    draw(reduce.matches ? total : 0);
    fallback.hidden = true;
    if (scene.scrollWidth > scene.clientWidth) scene.scrollLeft = (scene.scrollWidth - scene.clientWidth)/2;
    if (reduce.matches) { finished = true; status.textContent = 'Criatividade em cada camada.'; }
    setControl();
    resume();
  }
  setup().catch(() => {
    // The full illustration remains available when animation cannot initialize.
    control.hidden = true;
    status.textContent = 'Criatividade em cada camada.';
  });
})();

