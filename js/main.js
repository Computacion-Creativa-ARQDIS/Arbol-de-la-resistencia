/* ============================================================
   PROYECTO CONSTANZA — comportamiento
   1. Genera los cuadros blancos sobre la foto (hover → objeto)
   2. Conecta los "chips" de la frase con esos cuadros
   3. Ventana sobrepuesta con la iniciativa de cada objeto
   4. Modo edición (?edit) para ubicar los cuadros con el mouse
   ============================================================ */
(() => {
  'use strict';

  const objetos = window.OBJETOS.filter(o => o.activo !== false);
  const porId = Object.fromEntries(objetos.map(o => [o.id, o]));
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const esPendiente = s => /^\s*\[/.test(s);

  const escenario = $('#stage');
  const modal = $('#modal');
  const panel = $('.modal-panel', modal);
  const cuerpo = $('#modal-cuerpo');
  const visitados = new Set();
  let abiertoId = null;
  let origenFoco = null;

  /* ---------- 1. Cuadros blancos sobre la foto ---------- */
  function ubicar(el, o) {
    el.style.left = o.pos.x + '%';
    el.style.top = o.pos.y + '%';
    el.style.width = o.pos.w + '%';
    el.style.height = o.pos.h + '%';
  }

  objetos.forEach((o, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cuadro';
    b.dataset.id = o.id;
    b.style.setProperty('--tile', o.color);
    b.style.setProperty('--retraso', (i * 0.35) + 's');
    b.setAttribute('aria-label', `${o.titulo}: ${o.iniciativa}. Abrir detalle`);
    b.innerHTML =
      `<span class="objeto">${o.foto ? `<img src="${esc(o.foto)}" alt="" loading="lazy">` : o.icono}<span class="objeto-nombre">${esc(o.titulo)}</span></span>` +
      `<span class="mas" aria-hidden="true">+</span>`;
    ubicar(b, o);
    b.addEventListener('click', () => { if (!modoEdicion) abrir(o.id, b); });
    escenario.appendChild(b);
  });

  /* ---------- 2. Chips de la frase ---------- */
  $$('.chip').forEach(chip => {
    const o = porId[chip.dataset.obj];
    if (!o) { chip.remove(); return; }
    chip.style.setProperty('--tile', o.color);
    chip.innerHTML = o.icono;
    chip.setAttribute('aria-label', `${o.titulo}: ${o.iniciativa}. Abrir detalle`);
    const cuadro = () => $(`.cuadro[data-id="${o.id}"]`);
    const espiar = on => cuadro() && cuadro().classList.toggle('espiando', on);
    chip.addEventListener('mouseenter', () => espiar(true));
    chip.addEventListener('mouseleave', () => espiar(false));
    chip.addEventListener('focus', () => espiar(true));
    chip.addEventListener('blur', () => espiar(false));
    chip.addEventListener('click', () => abrir(o.id, chip));
  });

  function actualizarContador() {
    $('#contador').textContent = `Objetos descubiertos: ${visitados.size} / ${objetos.length}`;
  }
  actualizarContador();

  /* ---------- 3. Ventana sobrepuesta ---------- */
  function galeria(o) {
    const items = [...(o.archivo || [])];
    let n = 1;
    while (items.length < 3) { items.push({ vacio: true, ruta: `assets/archivo/${o.id}-${pad(n++)}.jpg` }); }
    return items.map(it => it.vacio
      ? `<figure class="foto-vacia"><span>Foto de archivo</span><small>${esc(it.ruta)}</small></figure>`
      : `<figure><img loading="lazy" src="${esc(it.src)}" alt="${esc(it.pie || o.titulo)}"><figcaption>${esc(it.pie || '')}</figcaption></figure>`
    ).join('');
  }

  function contenido(o) {
    const i = objetos.indexOf(o);
    const parrafos = (o.descripcion || []).map(p => `<p class="${esPendiente(p) ? 'pendiente' : ''}">${esc(p)}</p>`).join('');
    const cifras = (o.cifras || []).map(c =>
      `<div class="cifra ${esPendiente(c.valor) ? 'pendiente' : ''}"><strong>${esc(c.valor)}</strong><span>${esc(c.etiqueta)}</span></div>`).join('');
    const voz = o.voz && o.voz.texto
      ? `<blockquote class="voz"><p>“${esc(o.voz.texto)}”</p><cite>${esc(o.voz.autor || '')}</cite></blockquote>`
      : `<blockquote class="voz pendiente"><p>[Por completar] Un testimonio breve de quien vive o lidera esta iniciativa.</p><cite>Nombre, rol</cite></blockquote>`;
    const apoyo = (o.apoyo || []).map(a => `<li class="${esPendiente(a) ? 'pendiente' : ''}">${esc(a)}</li>`).join('');

    return `
      <header class="m-cab" style="--tile:${o.color}">
        <div class="m-objeto">${o.icono}<span class="m-num">${pad(i + 1)}</span></div>
        <div class="m-titulos">
          <p class="etiqueta">Objeto simbólico</p>
          <h2 id="modal-titulo">${esc(o.titulo)}</h2>
          <p class="m-iniciativa"><span>Iniciativa</span>${esc(o.iniciativa)}</p>
        </div>
      </header>

      <div class="m-grid">
        <section class="m-col">
          <h3>Qué representa</h3>
          <p class="m-simbolo">${esc(o.simboliza)}</p>
          <h3>La iniciativa</h3>
          ${parrafos}
        </section>
        <section class="m-col">
          ${cifras ? `<h3>En cifras</h3><div class="cifras">${cifras}</div>` : ''}
          <h3>Voces</h3>
          ${voz}
        </section>
      </div>

      <section class="m-seccion">
        <h3>Archivo</h3>
        <div class="galeria">${galeria(o)}</div>
        <p class="m-nota">Aquí también pueden vivir: audios, video, un recorrido en VR o el código QR de esta iniciativa.</p>
      </section>

      ${apoyo ? `<section class="m-seccion m-apoyo"><h3>Cómo apoyar esta iniciativa</h3><ul>${apoyo}</ul>
        <a class="boton" href="mailto:contacto@ejemplo.org?subject=${encodeURIComponent('Árbol de la Resistencia — ' + o.titulo)}">Quiero apoyar</a></section>` : ''}
    `;
  }

  function abrir(id, origen) {
    const o = porId[id];
    if (!o) return;
    const primera = modal.hidden;
    abiertoId = id;
    if (primera) origenFoco = origen || document.activeElement;
    cuerpo.innerHTML = contenido(o);
    $('#modal-pos').textContent = `${pad(objetos.indexOf(o) + 1)} / ${pad(objetos.length)}`;
    modal.hidden = false;
    document.body.classList.add('bloqueado');
    panel.scrollTop = 0;
    if (primera) panel.focus();
    visitados.add(id);
    const cuadro = $(`.cuadro[data-id="${id}"]`);
    if (cuadro) cuadro.classList.add('visto');
    actualizarContador();
    try { history.replaceState(null, '', '#' + id); } catch (_) { /* file:// puede bloquearlo */ }
  }

  function cerrar() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('bloqueado');
    abiertoId = null;
    try { history.replaceState(null, '', location.pathname + location.search + '#arbol'); } catch (_) {}
    if (origenFoco && origenFoco.focus) origenFoco.focus();
  }

  function mover(delta) {
    const i = objetos.findIndex(o => o.id === abiertoId);
    abrir(objetos[(i + delta + objetos.length) % objetos.length].id);
  }

  $$('[data-cerrar]', modal).forEach(el => el.addEventListener('click', cerrar));
  $('#prev').addEventListener('click', () => mover(-1));
  $('#next').addEventListener('click', () => mover(1));

  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') cerrar();
    else if (e.key === 'ArrowRight') mover(1);
    else if (e.key === 'ArrowLeft') mover(-1);
    else if (e.key === 'Tab') {            // mantener el foco dentro de la ventana
      const foco = $$('button, a[href], [tabindex="0"]', panel).filter(el => el.offsetParent !== null);
      if (!foco.length) return;
      const primero = foco[0], ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });

  // Enlaces directos: tusitio.com/#olla abre esa iniciativa
  function desdeHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (porId[id]) abrir(id);
  }
  window.addEventListener('hashchange', () => { if (porId[decodeURIComponent(location.hash.slice(1))] && modal.hidden) desdeHash(); });

  /* ---------- 4. Modo edición: agrega ?edit a la URL ---------- */
  const modoEdicion = new URLSearchParams(location.search).has('edit');

  if (modoEdicion) {
    document.body.classList.add('modo-edicion');
    const barra = document.createElement('div');
    barra.className = 'barra-edicion';
    barra.innerHTML =
      '<strong>Modo edición</strong> Arrastra los cuadros; la esquina inferior derecha cambia el tamaño. ' +
      '<button type="button" id="copiar">Copiar posiciones</button><pre id="salida"></pre>';
    document.body.appendChild(barra);

    const salida = $('#salida');
    const redondear = n => Math.round(n * 10) / 10;
    const limitar = (n, a, b) => Math.min(Math.max(n, a), b);
    const volcar = () => {
      const txt = objetos.map(o => `${o.id}: pos: { x: ${o.pos.x}, y: ${o.pos.y}, w: ${o.pos.w}, h: ${o.pos.h} }`).join('\n');
      salida.textContent = txt;
      return txt;
    };
    volcar();
    $('#copiar').addEventListener('click', () => { navigator.clipboard && navigator.clipboard.writeText(volcar()); });

    $$('.cuadro').forEach(el => {
      const o = porId[el.dataset.id];
      const asa = document.createElement('i');
      asa.className = 'asa';
      el.appendChild(asa);
      let accion = null, x0, y0, ini;

      el.addEventListener('pointerdown', e => {
        accion = e.target === asa ? 'tamano' : 'mover';
        x0 = e.clientX; y0 = e.clientY; ini = { ...o.pos };
        el.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
      el.addEventListener('pointermove', e => {
        if (!accion) return;
        const r = escenario.getBoundingClientRect();
        const dx = (e.clientX - x0) / r.width * 100;
        const dy = (e.clientY - y0) / r.height * 100;
        if (accion === 'mover') {
          o.pos.x = redondear(limitar(ini.x + dx, 0, 100 - o.pos.w));
          o.pos.y = redondear(limitar(ini.y + dy, 0, 100 - o.pos.h));
        } else {
          o.pos.w = redondear(limitar(ini.w + dx, 4, 100 - o.pos.x));
          o.pos.h = redondear(limitar(ini.h + dy, 3, 100 - o.pos.y));
        }
        ubicar(el, o);
        volcar();
      });
      el.addEventListener('pointerup', () => { accion = null; });
    });
  } else {
    desdeHash();
  }
})();
