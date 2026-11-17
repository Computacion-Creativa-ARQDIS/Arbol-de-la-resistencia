/* Efectos añadidos:
   1. Glitch de cuadritos de colores dentro de la foto del árbol.
   2. Chispas de cuadros de colores que siguen saliendo mientras el cursor
      está sobre un objeto. */
(() => {
  'use strict';

  const colores = ['#ff3b7f', '#ffd23f', '#3ad1ff', '#7dff6b', '#ffffff', '#ff8a3d'];

  /* ---- 1. Glitch dentro de la foto del árbol ---- */
  const stage = document.getElementById('stage');
  if (stage) {
    const capa = document.createElement('div');
    capa.className = 'glitch-capa';
    for (let i = 0; i < 18; i++) {
      const g = document.createElement('span');
      g.className = 'glitch';
      g.style.left = (Math.random() * 90) + '%';
      g.style.top = (Math.random() * 90) + '%';
      g.style.background = colores[i % colores.length];
      g.style.animationDelay = (Math.random() * 2) + 's';
      capa.appendChild(g);
    }
    stage.prepend(capa);
  }

  /* ---- 2. Chispas sobre los objetos ---- */
  const lienzo = document.createElement('canvas');
  lienzo.id = 'rastro';
  lienzo.setAttribute('aria-hidden', 'true');
  lienzo.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:50';
  document.body.appendChild(lienzo);
  const ctx = lienzo.getContext('2d');
  let piezas = [];

  function ajustar() {
    const dpr = window.devicePixelRatio || 1;
    lienzo.width = innerWidth * dpr;
    lienzo.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  ajustar();
  window.addEventListener('resize', ajustar);

  const azar = (a, b) => a + Math.random() * (b - a);

  function chispas(x, y) {
    for (let i = 0; i < 8; i++) {
      const ang = Math.random() * Math.PI * 2;
      const vel = azar(1.5, 4);
      piezas.push({
        x, y,
        w: azar(5, 9), h: azar(5, 9),
        vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel,
        c: colores[Math.floor(Math.random() * colores.length)],
        vida: 1,
        decae: azar(0.025, 0.045)
      });
    }
    if (piezas.length > 400) piezas.splice(0, piezas.length - 400);
  }

  (function dibujar() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    piezas = piezas.filter(p => (p.vida -= p.decae) > 0);
    for (const p of piezas) {
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.93; p.vy *= 0.93;
      ctx.globalAlpha = Math.min(1, p.vida * 1.2);
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(dibujar);
  })();

  // Mientras el cursor esté sobre un objeto, siguen saliendo chispas desde su centro
  let temporizador = null;
  let objetoActual = null;

  function emitirDesde(obj) {
    const r = obj.getBoundingClientRect();
    chispas(r.left + r.width / 2, r.top + r.height / 2);
  }

  document.addEventListener('pointerover', e => {
    const obj = e.target.closest && e.target.closest('.cuadro');
    if (!obj || obj === objetoActual) return;
    objetoActual = obj;
    clearInterval(temporizador);
    emitirDesde(obj);
    temporizador = setInterval(() => emitirDesde(obj), 110);
  });

  document.addEventListener('pointerout', e => {
    const obj = e.target.closest && e.target.closest('.cuadro');
    if (!obj || obj !== objetoActual) return;
    if (e.relatedTarget && obj.contains(e.relatedTarget)) return;
    clearInterval(temporizador);
    temporizador = null;
    objetoActual = null;
  });

  /* ---- Archivo infinito (solo en archivo.html) ---- */
  const grid = document.getElementById('archivo-grid');
  const sentinela = document.getElementById('sentinela');
  if (grid && sentinela) {
    const ARCHIVO = [];        // ejemplo: { src: 'assets/archivo/foto-01.jpg', pie: 'La casa, 2026' }
    let cargados = 0;
    const LOTE = 24;
    function cargarLote() {
      const fin = cargados + LOTE;
      for (let i = cargados; i < fin; i++) {
        const f = document.createElement('figure');
        f.className = 'ficha';
        const it = ARCHIVO[i];
        if (it) f.innerHTML = `<img loading="lazy" src="${it.src}" alt="${it.pie || ''}">`;
        else f.textContent = 'Foto de archivo ' + (i + 1);
        grid.appendChild(f);
      }
      cargados = fin;
    }
    cargarLote();
    new IntersectionObserver(entradas => { if (entradas[0].isIntersecting) cargarLote(); }).observe(sentinela);
  }
})();
