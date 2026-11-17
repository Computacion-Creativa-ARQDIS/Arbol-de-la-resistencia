/* ============================================================
   PROYECTO CONSTANZA — contenido de los objetos simbólicos
   ------------------------------------------------------------
   Aquí vive TODO el contenido editable. Para agregar un objeto
   nuevo, copia un bloque, cambia el `id` y ajusta `pos`.
   (Tip: abre la página con ?edit al final de la URL para mover
   los cuadros blancos con el mouse y copiar sus coordenadas.)

   foto = imagen (PNG/WebP con fondo transparente) que se ve al pasar el cursor.
         El `icono` (SVG) se sigue usando en la ventana grande y en la frase.

   pos = posición del cuadro blanco sobre la foto, en % de la foto:
         x (izquierda), y (arriba), w (ancho), h (alto)

   Los textos que dicen [Por completar] son marcadores: reemplázalos
   con la información real de la comunidad.
   ============================================================ */

window.OBJETOS = [
  {
    id: 'asentamiento',
    titulo: 'Asentamiento',
    iniciativa: 'La casa comunitaria',
    color: '#F6B91B',
    pos: { x: 3, y: 56, w: 14, h: 9.3 },
    icono: `<svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="6" y="78" width="88" height="4" fill="#141414"/>
      <rect x="10" y="52" width="26" height="26" fill="#fff"/>
      <path d="M7 54L23 38l16 16z" fill="#141414"/>
      <rect x="19" y="62" width="8" height="16" fill="#E8603C"/>
      <rect x="38" y="40" width="26" height="38" fill="#E8603C"/>
      <path d="M35 42L51 24l16 18z" fill="#141414"/>
      <rect x="46" y="50" width="10" height="10" fill="#fff"/>
      <rect x="45" y="66" width="12" height="12" fill="#141414"/>
      <rect x="66" y="56" width="24" height="22" fill="#fff"/>
      <path d="M63 58l15-14 15 14z" fill="#141414"/>
      <rect x="72" y="64" width="8" height="14" fill="#2F5FB3"/>
    </svg>`,
    simboliza:
      'Una pequeña agrupación de viviendas que, en conjunto, conforman un refugio seguro donde sus habitantes han reconstruido sus vidas y formado sus hogares. Más allá de un espacio físico, se ha convertido en una gran familia que se acompaña, se cuida y sana colectivamente.',
    descripcion: [
      'La casa cristaliza el trabajo de solidaridad de las personas del asentamiento y es, ante todo, un lugar de reunión.',
      '[Por completar] ¿Cómo se construyó la casa? ¿Quiénes la levantaron y cuándo? ¿Qué pasa en ella durante la semana?'
    ],
    cifras: [
      { valor: '[00]', etiqueta: 'familias que habitan el asentamiento' },
      { valor: '[00]', etiqueta: 'años de construcción colectiva' },
      { valor: '[00]', etiqueta: 'regiones de origen' }
    ],
    archivo: [
      // { src: 'assets/archivo/asentamiento-01.jpg', pie: 'La casa, 2026. Foto: [autor/a]' }
    ],
    voz: { texto: '', autor: '' },
    apoyo: ['[Por completar] Mejoras a la casa comunitaria', '[Por completar] Dotación del espacio de reunión']
  },

  {
    id: 'olla',
    foto: 'assets/objetos/olla.webp',   // imagen que aparece al hacer hover
    titulo: 'Olla',
    iniciativa: 'Comedor comunitario',
    color: '#E8603C',
    pos: { x: 42, y: 71, w: 12, h: 8 },
    icono: `<svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M38 30c-6-6 6-9 0-16M52 30c-6-6 6-9 0-16M66 30c-6-6 6-9 0-16" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="22" y="36" width="58" height="8" rx="4" fill="#141414"/>
      <path d="M25 44h52v18a26 26 0 0 1-26 26h0a26 26 0 0 1-26-26z" fill="#141414"/>
      <rect x="9" y="48" width="16" height="8" rx="4" fill="#141414"/>
      <rect x="77" y="48" width="16" height="8" rx="4" fill="#141414"/>
      <path d="M34 53v11" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="51" cy="92" rx="30" ry="3" fill="#000" opacity=".18"/>
    </svg>`,
    simboliza:
      'Una olla de gran tamaño donde se preparan los alimentos del comedor comunal. Más que un utensilio, representa el sustento, el cuidado y el apoyo mutuo entre quienes cocinan y comparten la mesa. Se convierte en un punto de encuentro que fortalece los lazos y el sentido de comunidad.',
    descripcion: [
      'El comedor comunitario es una de las iniciativas que sostiene el día a día del asentamiento.',
      '[Por completar] ¿Cuántas personas comen? ¿Con qué frecuencia se cocina? ¿Quién cocina y cómo se consiguen los alimentos?'
    ],
    cifras: [
      { valor: '[00]', etiqueta: 'porciones servidas por semana' },
      { valor: '[00]', etiqueta: 'personas que cocinan' },
      { valor: '[00]', etiqueta: 'días de servicio' }
    ],
    archivo: [],
    voz: { texto: '', autor: '' },
    apoyo: ['[Por completar] Insumos y alimentos', '[Por completar] Equipo de cocina y gas']
  },

  {
    id: 'llantas',
    foto: 'assets/objetos/llantas.webp',   // imagen que aparece al hacer hover
    titulo: 'Llantas',
    iniciativa: 'Espacios de encuentro en la zona verde',
    color: '#2F5FB3',
    pos: { x: 17, y: 71, w: 12, h: 8 },
    icono: `<svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="#141414"/>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#4a4a47" stroke-width="5" stroke-dasharray="3 6"/>
      <circle cx="50" cy="50" r="27" fill="none" stroke="#3b3b38" stroke-width="3"/>
      <circle cx="50" cy="50" r="17" style="fill:var(--tile)"/>
    </svg>`,
    simboliza:
      'Elementos desechados que adquieren una segunda vida al transformarse en mobiliario para la zona verde, creando espacios de encuentro donde los habitantes pueden sentarse, jugar y compartir en comunidad.',
    descripcion: [
      'Con llantas recuperadas se construye el mobiliario de la zona verde que rodea el asentamiento.',
      '[Por completar] ¿Quién las recoge y las transforma? ¿Cuántos asientos y juegos se han hecho?'
    ],
    cifras: [
      { valor: '[00]', etiqueta: 'llantas recuperadas' },
      { valor: '[00]', etiqueta: 'asientos y juegos construidos' },
      { valor: '[00]', etiqueta: 'personas que participan' }
    ],
    archivo: [],
    voz: { texto: '', autor: '' },
    apoyo: ['[Por completar] Materiales y pintura', '[Por completar] Jornadas de construcción colectiva']
  },

  {
    id: 'cubetas',
    foto: 'assets/objetos/cubetas.webp',   // imagen que aparece al hacer hover
    titulo: 'Cubetas de agua',
    iniciativa: 'Cuidado colectivo del Árbol de la Resistencia',
    color: '#5C8A2E',
    pos: { x: 57, y: 60, w: 11, h: 7.3 },
    icono: `<svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 4c5 7 8 11 0 14-8-3-5-7 0-14zM30 8c3 4 5 7 0 9-5-2-3-5 0-9zM70 8c3 4 5 7 0 9-5-2-3-5 0-9z" fill="#fff"/>
      <path d="M26 36q24-26 48 0" fill="none" stroke="#141414" stroke-width="4" stroke-linecap="round"/>
      <path d="M22 38h56l-7 46a7 7 0 0 1-7 6H36a7 7 0 0 1-7-6z" fill="#F4F1EA"/>
      <path d="M24.4 52h51.2l-1.6 11H26z" fill="#2F5FB3"/>
      <rect x="19" y="34" width="62" height="7" rx="3.5" fill="#141414"/>
    </svg>`,
    simboliza:
      'Objetos de uso diario con los que se riega y cuida el árbol, el punto central de encuentro. Simbolizan seguir dándole vida a este lugar que hoy los acoge.',
    descripcion: [
      'El Árbol de la Resistencia es el espacio de encuentro entre las zonas verdes y el asentamiento. Cuidarlo es un compromiso compartido.',
      '[Por completar] ¿Quién lo riega y cada cuánto? ¿Qué historias tiene el árbol?'
    ],
    cifras: [
      { valor: '[00]', etiqueta: 'años del árbol en el territorio' },
      { valor: '[00]', etiqueta: 'personas que lo cuidan' },
      { valor: '[00]', etiqueta: 'jornadas de cuidado al mes' }
    ],
    archivo: [],
    voz: { texto: '', autor: '' },
    apoyo: ['[Por completar] Sistema de riego y cuidado', '[Por completar] Señalización y memoria del árbol']
  },

  {
    id: 'parque',
    titulo: 'Parque',
    iniciativa: 'Actividades de fin de semana: juego, arte y mediación cultural',
    color: '#E0568A',
    pos: { x: 74, y: 72, w: 13, h: 8.7 },
    icono: `<svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="10" y="14" width="80" height="6" rx="3" fill="#141414"/>
      <path d="M16 17L8 90M84 17l8 73" stroke="#141414" stroke-width="5" stroke-linecap="round"/>
      <path d="M34 20v50M66 20v50" stroke="#fff" stroke-width="2.5"/>
      <rect x="26" y="68" width="16" height="6" rx="3" fill="#fff"/>
      <rect x="58" y="68" width="16" height="6" rx="3" fill="#fff"/>
      <rect x="4" y="88" width="92" height="4" fill="#141414"/>
    </svg>`,
    simboliza:
      'Espacios recreativos que reúnen a los más jóvenes de la comunidad, fomentando el juego, el deporte y el aprovechamiento de las zonas verdes. Además, promueven el encuentro y el acercamiento al Árbol de la Resistencia como punto de unión comunitaria.',
    descripcion: [
      'Los fines de semana la zona verde se llena de actividades: animación, mediación cultural y arte como forma de encuentro.',
      'La zona verde cuenta con quebrada, cancha de fútbol y el árbol.',
      '[Por completar] ¿Qué actividades se hacen? ¿Quién las lidera? ¿Cuántos niños y niñas participan?'
    ],
    cifras: [
      { valor: '[00]', etiqueta: 'niños y niñas participantes' },
      { valor: '[00]', etiqueta: 'actividades al mes' },
      { valor: '[00]', etiqueta: 'líderes comunitarios' }
    ],
    archivo: [],
    voz: { texto: '', autor: '' },
    apoyo: ['[Por completar] Materiales de arte y deporte', '[Por completar] Talleres de mediación cultural']
  },

  {
    id: 'arbol-resistencia',
    foto: 'assets/objetos/arbol-resistencia.webp',
    titulo: 'Árbol de la Resistencia',
    iniciativa: 'El espacio central de encuentro',
    color: '#1F9E8F',
    pos: { x: 40, y: 42, w: 13, h: 8.7 },
    icono: `<img src="assets/objetos/arbol-resistencia.webp" alt="Cartel firmado: Árbol de la Resistencia">`,
    simboliza:
      'El espacio central de encuentro, ubicado en el punto de convergencia entre las zonas verdes y el asentamiento, es el corazón de la comunidad. Representa la lucha de los líderes sociales y la motivación por construir un territorio digno y seguro. Más que un elemento natural, simboliza la vida, la unión y la memoria colectiva, promoviendo el encuentro, el sentido de pertenencia y el compromiso de los habitantes con su cuidado.',
    descripcion: [
      '[Por completar] ¿Qué significa el cartel firmado? ¿Quiénes lo firmaron y cuándo?'
    ],
    cifras: [],
    archivo: [],
    voz: { texto: '', autor: '' },
    apoyo: ['[Por completar]']
  },

  {
    id: 'grupo-ayuda',
    foto: 'assets/objetos/grupo-ayuda.webp',
    titulo: 'Grupo de ayuda',
    iniciativa: '[Por completar]',
    color: '#6C4BB8',
    pos: { x: 76, y: 58, w: 12, h: 8 },
    icono: `<img src="assets/objetos/grupo-ayuda.webp" alt="Gorra verde">`,
    simboliza: '[Por completar] ¿Qué representa la gorra verde para el grupo de ayuda?',
    descripcion: ['[Por completar]'],
    cifras: [],
    archivo: [],
    voz: { texto: '', autor: '' },
    apoyo: ['[Por completar]']
  },

  /* ----- Objeto adicional del documento, listo para activar -----
     Cámbialo a activo: true y mueve su cuadro con ?edit si quieres
     sumar un sexto objeto. */
  {
    id: 'limpieza',
    activo: false,
    titulo: 'Utensilios de limpieza',
    iniciativa: 'Limpieza y mantenimiento colectivo',
    color: '#6C4BB8',
    pos: { x: 28, y: 80, w: 12, h: 8 },
    icono: `<svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M40 38c-4-12 4-18 12-14 8 4 6 14 6 14z" fill="#fff"/>
      <path d="M20 38h50l-9 26H33z" fill="#141414"/>
      <path d="M20 38L8 22M33 64l-7 22" stroke="#141414" stroke-width="4" stroke-linecap="round"/>
      <circle cx="62" cy="78" r="11" fill="#141414"/>
      <circle cx="62" cy="78" r="4" fill="#fff"/>
    </svg>`,
    simboliza:
      'Bolsas plásticas y carretillas que facilitan las labores de limpieza y mantenimiento colectivo. Reflejan el compromiso de los habitantes por cuidar el espacio que comparten, especialmente las zonas verdes.',
    descripcion: ['[Por completar]'],
    cifras: [],
    archivo: [],
    voz: { texto: '', autor: '' },
    apoyo: []
  }
];
