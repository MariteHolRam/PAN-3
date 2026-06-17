/* ═══════════════════════════════════════════════════════════════
   PAN BASICO — app.js
   Motor de la presentación + lógica de todos los interactivos
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Datos base ─────────────────────────────────────────────── */
const TOTAL_SLIDES = 12;

const slideData = [
  { num: 1,  title: "Portada · Hook" },
  { num: 2,  title: "Tradicional vs. PAN" },
  { num: 3,  title: "Ciclo ADIME" },
  { num: 4,  title: "A · Evaluación (5 dominios)" },
  { num: 5,  title: "D · Diagnóstico PES" },
  { num: 6,  title: "Taller PES" },
  { num: 7,  title: "I · Intervención" },
  { num: 8,  title: "M/E · Monitoreo" },
  { num: 9,  title: "Algoritmo Universal" },
  { num: 10, title: "Caso Integrador" },
  { num: 11, title: "Caja de Herramientas" },
  { num: 12, title: "Cierre · Compromiso" }
];

const speakerNotes = {
  1: `<strong>🎤 Guión:</strong> "Bienvenidos colegas. Hoy van a dejar de ver al PAN como un formato burocrático y van a empezar a usarlo como lo que realmente es: el mapa mental del clínico de élite. Vamos de cero a cien — sin importar la patología de su paciente."
<br><br><strong>💡 Tip:</strong> Pause en la rueda ADIME; déjela animar. Pregunta abierta: "¿Cuántos de ustedes ya escriben diagnósticos nutricionales propios?"`,

  2: `<strong>🎤 Guión:</strong> "Comparen los dos lados de esta tabla. La columna de la izquierda describe cómo trabaja el 80% de las consultas hoy. La columna derecha es a dónde vamos al terminar esta sesión. El PAN no nos pide más tiempo — nos pide más método."
<br><br><strong>💡 Tip:</strong> Haga clic en la tabla para animar las filas. Invite a la audiencia a identificar en cuál columna se reconocen.`,

  3: `<strong>🎤 Guión:</strong> "El ADIME es un motor de 4 tiempos. Como en un motor de combustión, si falta una fase, el motor falla. Hagan clic en cada letra para ver qué implica esa fase."
<br><br><strong>💡 Tip:</strong> Haga clic en A → D → I → M/E en orden. Enfatice que es un ciclo, no una línea recta.`,

  4: `<strong>🎤 Guión:</strong> "En la Evaluación no juntamos datos al azar — los clasificamos en 5 dominios del eNCPT. Giren cada tarjeta para ver qué datos pertenecen a cada dominio y cómo se interconectan."
<br><br><strong>💡 Tip:</strong> Invite a los participantes a pensar qué datos de su último paciente encajan en cada dominio.`,

  5: `<strong>🎤 Guión:</strong> "El diagnóstico nutricio tiene una anatomía precisa: P-E-S. Hagan clic en cada bloque para entender qué va en cada parte y por qué. Recuerden: el problema no es la enfermedad, es lo que nosotros podemos cambiar."
<br><br><strong>💡 Tip:</strong> Haga clic en P → E → S. Enfatice la diferencia entre diagnóstico médico y nutricio.`,

  6: `<strong>🎤 Guión:</strong> "Ahora van a afinar su lente clínico. Giren las dos tarjetas. ¿Pueden identificar los errores antes de ver la respuesta? Este ejercicio los va a ayudar a evitar los errores más comunes en la consulta real."
<br><br><strong>💡 Tip:</strong> Pida a la audiencia que diga por qué el primero está mal ANTES de girar la tarjeta.`,

  7: `<strong>🎤 Guión:</strong> "La intervención debe ser la llave exacta para el candado de la etiología. Si su PES dice 'relacionado con falta de conocimiento', su intervención debe ser Educación Nutricia — no solo un plan de alimentación."
<br><br><strong>💡 Tip:</strong> Haga clic en 'Simular desbloqueo' para la animación. Luego repase los 4 dominios de intervención.`,

  8: `<strong>🎤 Guión:</strong> "El monitoreo es la prueba de fuego. Si no midieron los signos y síntomas al inicio, ¿cómo saben si mejoraron? Ajusten los controles del panel para ver cómo cambian los indicadores según la adherencia del paciente."
<br><br><strong>💡 Tip:</strong> Mueva el slider de adherencia al 100% — enseñe el resultado ideal. Luego bájelo al 20% — enseñe por qué el monitoreo detecta la falta de apego.`,

  9: `<strong>🎤 Guión:</strong> "Este es el algoritmo que van a memorizar. Son 4 pasos — nada más. Avancen paso a paso y piensen en su próximo paciente mientras lo hacemos."
<br><br><strong>💡 Tip:</strong> Use los botones Anterior/Siguiente lentamente. En cada paso, pida a alguien de la audiencia que lo aplique a un caso hipotético.`,

  10: `<strong>🎤 Guión:</strong> "Miguel tiene 42 años, Síndrome Metabólico e Hígado Graso No Alcohólico. Vamos a seguirlo por el ciclo ADIME completo. Hagan clic en cada fase para ver cómo aplicamos el PAN en un caso real."
<br><br><strong>💡 Tip:</strong> Explore las 4 fases del caso. Pregunte: "¿Qué cambia si Miguel no tiene acceso a cocinar en casa?"`,

  11: `<strong>🎤 Guión:</strong> "Estas son sus herramientas para llevarse hoy a la consulta. El eNCPT es la biblia del diagnóstico nutricio. El checklist es su lista de verificación antes de cerrar el expediente."
<br><br><strong>💡 Tip:</strong> Pida a los participantes que completen el checklist de redacción PES marcando cada casilla.`,

  12: `<strong>🎤 Guión:</strong> "Hoy aprendieron a pensar como clínicos de élite. El PAN no es más trabajo — es el trabajo bien hecho. Su compromiso de hoy: en su próxima consulta, escriben UN diagnóstico nutricio en formato PES. Solo uno. Ese primer paso lo cambia todo."
<br><br><strong>💡 Tip:</strong> Termine con silencio después de leer la cita. Deje que resuene.`
};

/* ── Estado global ──────────────────────────────────────────── */
let currentSlide = 1;
let isDark = false;
let isSidebarOpen = true;
let isNotesOpen = false;

/* ── DOM refs ───────────────────────────────────────────────── */
const sidebar       = document.getElementById('sidebar');
const sidebarClose  = document.getElementById('sidebarClose');
const sidebarSlides = document.getElementById('sidebarSlides');
const menuBtn       = document.getElementById('menuBtn');
const themeToggle   = document.getElementById('themeToggle');
const themeIcon     = document.getElementById('themeIcon');
const topbarTitle   = document.getElementById('topbarTitle');
const slideCounter  = document.getElementById('slideCounter');
const progressFill  = document.getElementById('progressFill');
const prevBtn       = document.getElementById('prevBtn');
const nextBtn       = document.getElementById('nextBtn');
const navDots       = document.getElementById('navDots');
const notesToggle   = document.getElementById('notesToggle');
const notesPanel    = document.getElementById('notesPanel');
const notesClose    = document.getElementById('notesClose');
const notesBody     = document.getElementById('notesBody');
const fullscreenBtn = document.getElementById('fullscreenBtn');

/* ══════════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════════ */
function init() {
  buildSidebarItems();
  buildNavDots();
  initSlide9();
  initSlide10();
  attachGlobalEvents();
  goToSlide(1, false);
}

/* ── Sidebar items ──────────────────────────────────────────── */
function buildSidebarItems() {
  slideData.forEach(sd => {
    const btn = document.createElement('button');
    btn.className = 'sidebar-slide-item';
    btn.id = `sidebar-item-${sd.num}`;
    btn.innerHTML = `<span class="sidebar-num">${sd.num}</span> ${sd.title}`;
    btn.addEventListener('click', () => goToSlide(sd.num));
    sidebarSlides.appendChild(btn);
  });
}

/* ── Nav dots ───────────────────────────────────────────────── */
function buildNavDots() {
  slideData.forEach(sd => {
    const dot = document.createElement('button');
    dot.className = 'nav-dot';
    dot.id = `dot-${sd.num}`;
    dot.setAttribute('aria-label', `Ir a diapositiva ${sd.num}`);
    dot.addEventListener('click', () => goToSlide(sd.num));
    navDots.appendChild(dot);
  });
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════════════════════════ */
function goToSlide(num, animate = true) {
  if (num < 1 || num > TOTAL_SLIDES) return;

  const prevNum = currentSlide;
  currentSlide = num;

  // Deactivate old slide
  const oldSlide = document.getElementById(`slide-${prevNum}`);
  if (oldSlide && animate) {
    oldSlide.classList.add('exit-left');
    setTimeout(() => {
      oldSlide.classList.remove('active', 'exit-left');
    }, 420);
  } else if (oldSlide) {
    oldSlide.classList.remove('active', 'exit-left');
  }

  // Activate new slide
  const newSlide = document.getElementById(`slide-${num}`);
  if (newSlide) {
    newSlide.classList.add('active');
    onSlideEnter(num);
  }

  // Update UI chrome
  updateChrome(num);
}

function updateChrome(num) {
  slideCounter.textContent = `${num} / ${TOTAL_SLIDES}`;
  progressFill.style.width = `${(num / TOTAL_SLIDES) * 100}%`;
  topbarTitle.textContent = slideData[num - 1].title;
  notesBody.innerHTML = speakerNotes[num] || '<em>Sin notas para esta diapositiva.</em>';

  // Sidebar
  document.querySelectorAll('.sidebar-slide-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.getElementById(`sidebar-item-${num}`);
  if (activeItem) {
    activeItem.classList.add('active');
    activeItem.scrollIntoView({ block: 'nearest' });
  }

  // Dots
  document.querySelectorAll('.nav-dot').forEach((d, i) => {
    d.classList.toggle('active', i + 1 === num);
  });

  // Prev/Next
  prevBtn.disabled = num === 1;
  nextBtn.disabled = num === TOTAL_SLIDES;
}

/* ── Slide-specific activation hooks ───────────────────────── */
function onSlideEnter(num) {
  if (num === 2) initSlide2();
  if (num === 3) initSlide3();
  if (num === 4) resetDomainCards();
  if (num === 5) initSlide5();
  if (num === 6) initSlide6();
  if (num === 8) initDashboard();
  if (num === 9) { algoCurrentStep = 0; renderAlgoStep(); }
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 2 — Compare Table Animation
   ══════════════════════════════════════════════════════════════ */
function initSlide2() {
  const rows = document.querySelectorAll('.compare-row');
  rows.forEach((row, i) => {
    row.classList.remove('visible');
    setTimeout(() => row.classList.add('visible'), 80 + i * 120);
  });
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 3 — ADIME Interactive Wheel
   ══════════════════════════════════════════════════════════════ */
const adimePhaseData = {
  A: {
    title: 'A · Evaluación',
    color: '#1e3a5f',
    desc: 'Recolectar, clasificar e interconectar todos los datos clínicos del paciente en los 5 dominios del eNCPT.',
    bullets: [
      'Historia del cliente (CH): contexto médico y social',
      'Antropometría (AD): composición corporal',
      'Bioquímicos (BD): labs de laboratorio',
      'Físicos/Clínicos (PD): signos y síntomas observados',
      'Historial Dietético (FH): ingesta y conducta alimentaria'
    ]
  },
  D: {
    title: 'D · Diagnóstico Nutricio',
    color: '#0d9488',
    desc: 'Identificar el problema nutricio más urgente y formularlo en el enunciado PES usando terminología eNCPT.',
    bullets: [
      'Un solo PES por consulta (el más urgente)',
      'P = etiqueta oficial del eNCPT',
      'E = causa raíz sobre la que puedo actuar',
      'S = datos objetivos que lo evidencian'
    ]
  },
  I: {
    title: 'I · Intervención',
    color: '#0369a1',
    desc: 'Diseñar y ejecutar acciones que ataquen directamente la Etiología del PES.',
    bullets: [
      'ND: Entrega de alimentos y nutrientes',
      'E: Educación nutricia (conocimiento y habilidades)',
      'C: Consejería nutricia (conducta y motivación)',
      'RC: Coordinación con el equipo de salud'
    ]
  },
  ME: {
    title: 'M/E · Monitoreo y Evaluación',
    color: '#134e4a',
    desc: 'Medir de forma objetiva los indicadores definidos en los Signos/Síntomas del PES para cuantificar el avance.',
    bullets: [
      'Mis indicadores de monitoreo = los S de mi PES',
      'Frecuencia: según clínica (semanal, mensual)',
      'Comparar con metas pactadas en la intervención',
      'Si no mejora: revisar etiología y ajustar plan'
    ]
  }
};

function initSlide3() {
  // Reset the detail panel to placeholder on every entry
  const panel = document.getElementById('adimeDetail');
  if (panel) {
    panel.innerHTML = `
      <div class="adime-detail-placeholder">
        <span class="detail-icon">☞</span>
        <p>Haz clic en cada letra del ciclo para explorar la fase</p>
      </div>`;
  }

  const nodes = document.querySelectorAll('.adime-int-node');
  nodes.forEach(node => {
    node.classList.remove('selected');
    // Use onclick to auto-replace on slide re-entry (prevents listener stacking)
    node.onclick = () => {
      const phase = node.dataset.phase;
      showAdimeDetail(phase);
      nodes.forEach(n => n.classList.remove('selected'));
      node.classList.add('selected');
    };
  });
}

function showAdimeDetail(phase) {
  const data = adimePhaseData[phase];
  if (!data) return;
  const panel = document.getElementById('adimeDetail');
  panel.innerHTML = `
    <div class="adime-phase-detail" style="width:100%">
      <h4 style="color:${data.color}">${data.title}</h4>
      <p>${data.desc}</p>
      <ul class="adime-phase-bullets">
        ${data.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>`;
  // Force reflow then re-apply animation (reliable cross-browser)
  panel.style.animation = 'none';
  void panel.offsetWidth;  // forced reflow
  panel.style.animation = 'fadeIn 0.3s ease';
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 4 — Domain Flip Cards
   ══════════════════════════════════════════════════════════════ */
function resetDomainCards() {
  const cards = document.querySelectorAll('.domain-card');
  cards.forEach(card => {
    card.classList.remove('flipped');
    // Use onclick to auto-replace on slide re-entry (prevents listener stacking)
    card.onclick = () => {
      card.classList.toggle('flipped');
      document.getElementById('domainsFlipped').textContent =
        document.querySelectorAll('.domain-card.flipped').length;
    };
  });
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 5 — PES Builder
   ══════════════════════════════════════════════════════════════ */
const pesContent = {
  P: {
    example: 'Ingesta excesiva de carbohidratos simples',
    pexId: 'pexP'
  },
  E: {
    example: 'r/c consumo habitual de bebidas azucaradas y ausencia de planeación alimentaria',
    pexId: 'pexE'
  },
  S: {
    example: 'e/p glucosa ayuno 142 mg/dL e ingesta promedio de 4 refrescos/día',
    pexId: 'pexS'
  }
};
let pesSelected = { P: false, E: false, S: false };

function initSlide5() {
  pesSelected = { P: false, E: false, S: false };
  updatePesOutput();

  ['P', 'E', 'S'].forEach(letter => {
    const block = document.getElementById(`pes${letter}`);
    if (!block) return;
    // Use onclick to auto-replace on slide re-entry (prevents listener stacking)
    block.onclick = () => {
      pesSelected[letter] = !pesSelected[letter];
      block.classList.toggle('selected', pesSelected[letter]);

      // Show the right explainer
      document.querySelectorAll('.pec-item').forEach(el => el.classList.remove('active'));
      if (pesSelected[letter]) {
        document.getElementById(pesContent[letter].pexId).classList.add('active');
      } else {
        document.getElementById('pexP').classList.add('active');
      }

      updatePesOutput();
    };
  });
}

function updatePesOutput() {
  const output = document.getElementById('pesOutput');
  let parts = [];
  if (pesSelected.P) parts.push(`<strong>[Problema]</strong> ${pesContent.P.example}`);
  if (pesSelected.E) parts.push(`<strong>[Etiología]</strong> ${pesContent.E.example}`);
  if (pesSelected.S) parts.push(`<strong>[S/S]</strong> ${pesContent.S.example}`);

  if (parts.length === 0) {
    output.innerHTML = '<span style="color:var(--text-lt)">Tu enunciado PES aparecerá aquí...</span>';
  } else {
    output.innerHTML = parts.join(' ');
  }

  if (pesSelected.P && pesSelected.E && pesSelected.S) {
    output.style.borderColor = 'var(--teal-700)';
    output.style.background = 'rgba(13,148,136,0.06)';
  } else {
    output.style.borderColor = 'var(--teal-500)';
    output.style.background = '';
  }
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 6 — PES Flip Cards
   ══════════════════════════════════════════════════════════════ */
function initSlide6() {
  ['pesCard1', 'pesCard2'].forEach(id => {
    const card = document.getElementById(id);
    if (!card) return;
    card.classList.remove('flipped');
    // Use onclick to auto-replace on slide re-entry
    card.onclick = () => card.classList.toggle('flipped');
  });
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 7 — Lock & Key Animation
   ══════════════════════════════════════════════════════════════ */
(function initSlide7() {
  const unlockBtn = document.getElementById('unlockBtn');
  const lockBox   = document.getElementById('lockBox');
  const keySvg    = document.getElementById('keySvg');

  if (!unlockBtn) return;

  unlockBtn.addEventListener('click', () => {
    keySvg.classList.add('unlocking');
    setTimeout(() => {
      lockBox.classList.add('unlocked');
      lockBox.querySelector('.lock-label').textContent = '✓ Resuelto';
      lockBox.querySelector('.lock-label').style.color = 'var(--teal-700)';
      lockBox.querySelector('.lock-sub').textContent = 'Causa raíz neutralizada';
      unlockBtn.textContent = '🔐 Resetear';
      unlockBtn.style.background = 'linear-gradient(135deg,var(--blue-900),var(--blue-600))';

      unlockBtn.onclick = () => {
        lockBox.classList.remove('unlocked');
        keySvg.classList.remove('unlocking');
        lockBox.querySelector('.lock-label').textContent = 'Etiología';
        lockBox.querySelector('.lock-label').style.color = '#ef4444';
        lockBox.querySelector('.lock-sub').textContent = 'Causa raíz del PES';
        unlockBtn.textContent = '🔓 Simular desbloqueo';
        unlockBtn.style.background = '';
        unlockBtn.onclick = null;
      };
    }, 500);
  });
})();

/* ══════════════════════════════════════════════════════════════
   SLIDE 8 — Dashboard / Chart
   ══════════════════════════════════════════════════════════════ */
function initDashboard() {
  const sliderAdh = document.getElementById('dpSliderAdherencia');
  const sliderSem = document.getElementById('dpSliderSemanas');
  if (!sliderAdh || !sliderSem) return;

  sliderAdh.addEventListener('input', renderDashboard);
  sliderSem.addEventListener('input', renderDashboard);
  renderDashboard();
}

function renderDashboard() {
  const adh = parseInt(document.getElementById('dpSliderAdherencia')?.value || 60);
  const sem = parseInt(document.getElementById('dpSliderSemanas')?.value || 4);

  document.getElementById('dpAdherencia').textContent = adh + '%';
  document.getElementById('dpSemanas').textContent = sem;

  // Generate chart points
  // HbA1c starts at 120px (y coord, high = bad) → improves toward 50px (goal)
  // Peso starts at 100px → improves toward 70px
  const xPositions = [50, 103, 156, 209, 262, 315, 368];
  const adhFactor  = adh / 100;
  const hba1cPts   = [];
  const pesoPts    = [];

  for (let i = 0; i <= sem; i++) {
    const progress   = i / Math.max(sem, 1);
    const improvement = progress * adhFactor;
    const hba1c = 120 - (improvement * 75);   // y: 120 → 45
    const peso  = 105 - (improvement * 42);   // y: 105 → 63
    hba1cPts.push(`${xPositions[i]},${hba1c.toFixed(1)}`);
    pesoPts.push(`${xPositions[i]},${peso.toFixed(1)}`);
  }

  document.getElementById('dpLineHba1c').setAttribute('points', hba1cPts.join(' '));
  document.getElementById('dpLinePeso').setAttribute('points', pesoPts.join(' '));
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 9 — Step-by-Step Algorithm
   ══════════════════════════════════════════════════════════════ */
const algoSteps = [
  {
    num: 'Paso 1',
    title: 'Filtra y jerarquiza los datos de la Evaluación',
    body: 'Revisa tus 5 dominios (CH, AD, BD, PD, FH) y clasifica cada dato. No todos los problemas son prioritarios — identifica el más urgente para este paciente, en este momento.',
    items: [
      '¿Cuál dato me preocupa más clínicamente?',
      '¿Cuál problema impacta más la calidad de vida?',
      '¿Cuál es modificable con intervención nutricia?'
    ]
  },
  {
    num: 'Paso 2',
    title: 'Redacta tu enunciado PES',
    body: 'Con el problema identificado, formula tu diagnóstico nutricio. Recuerda: la E define el objetivo de tu plan y la S define tus indicadores de éxito.',
    items: [
      'P = Etiqueta oficial del eNCPT',
      'E = Causa raíz sobre la que puedo actuar YO',
      'S = Datos objetivos y cuantificables del paciente'
    ]
  },
  {
    num: 'Paso 3',
    title: 'Diseña la Intervención que ataca la Etiología',
    body: 'Cada acción de tu plan debe apuntar directamente a la E de tu PES. Si la etiología es "falta de conocimiento" → la acción es Educación. Si es "conducta alimentaria disfuncional" → es Consejería.',
    items: [
      'ND si hay que prescribir o ajustar la alimentación',
      'E si el paciente no sabe (conocimiento o habilidad)',
      'C si el paciente sabe pero no lo hace (conducta)',
      'RC si necesita otro profesional del equipo'
    ]
  },
  {
    num: 'Paso 4',
    title: 'Calendariza el Monitoreo con indicadores precisos',
    body: 'Define cuándo y qué vas a medir. Usa exactamente los Signos/Síntomas (S) de tu PES como indicadores. Agenda la próxima cita antes de que el paciente salga de consulta.',
    items: [
      '¿Cuáles S del PES voy a medir?',
      '¿En qué fecha y cómo los voy a medir?',
      '¿Cuál es la meta cuantitativa para esa fecha?',
      'Si no mejora → revisar la etiología, no solo el plan'
    ]
  }
];

let algoCurrentStep = 0;

function initSlide9() {
  algoCurrentStep = 0;

  // Build flowchart boxes
  const flowchart = document.getElementById('algoFlowchart');
  if (!flowchart) return;
  flowchart.innerHTML = '';
  algoSteps.forEach((step, i) => {
    if (i > 0) {
      const arrow = document.createElement('div');
      arrow.className = 'algo-flow-arrow';
      arrow.textContent = '↓';
      flowchart.appendChild(arrow);
    }
    const box = document.createElement('div');
    box.className = 'algo-flow-step';
    box.id = `algo-flow-${i}`;
    box.innerHTML = `
      <div class="algo-flow-num">${i + 1}</div>
      <div>
        <div class="algo-flow-label">${step.num}: ${step.title}</div>
        <div class="algo-flow-sub">${step.items[0]}</div>
      </div>`;
    flowchart.appendChild(box);
  });

  renderAlgoStep();

  document.getElementById('algoNext').addEventListener('click', () => {
    if (algoCurrentStep < algoSteps.length - 1) {
      algoCurrentStep++;
      renderAlgoStep();
    }
  });
  document.getElementById('algoPrev').addEventListener('click', () => {
    if (algoCurrentStep > 0) {
      algoCurrentStep--;
      renderAlgoStep();
    }
  });
}

function renderAlgoStep() {
  const step = algoSteps[algoCurrentStep];
  const panel = document.getElementById('algoPanel');
  const counter = document.getElementById('algoCounter');
  const prevBtn = document.getElementById('algoPrev');
  const nextBtn = document.getElementById('algoNext');

  counter.textContent = `Paso ${algoCurrentStep + 1} / ${algoSteps.length}`;
  prevBtn.disabled = algoCurrentStep === 0;
  nextBtn.disabled = algoCurrentStep === algoSteps.length - 1;

  panel.innerHTML = `
    <div class="algo-step-card">
      <div class="algo-step-num">${step.num}</div>
      <div class="algo-step-title">${step.title}</div>
      <div class="algo-step-body">${step.body}</div>
      <ul class="algo-step-items">
        ${step.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>`;

  // Update flowchart highlights
  algoSteps.forEach((_, i) => {
    const box = document.getElementById(`algo-flow-${i}`);
    if (!box) return;
    box.classList.remove('reached', 'current');
    if (i < algoCurrentStep) box.classList.add('reached');
    if (i === algoCurrentStep) {
      box.classList.add('reached', 'current');
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 10 — Integrative Case Study
   ══════════════════════════════════════════════════════════════ */
const caseContent = {
  'case-a': {
    header: '🔍 A · Evaluación — Datos de Miguel',
    html: `
      <div class="case-phase-content">
        <div class="case-data-row"><span class="case-data-key">CH: Motivo de consulta</span><span class="case-data-val">Referido por médico por glucosa elevada y "hígado graso"</span></div>
        <div class="case-data-row"><span class="case-data-key">AD: IMC / Cintura</span><span class="case-data-val alert-val">29.8 kg/m² / CA 104 cm (↑ riesgo)</span></div>
        <div class="case-data-row"><span class="case-data-key">BD: Glucosa ayuno</span><span class="case-data-val alert-val">142 mg/dL ↑ (meta &lt;100)</span></div>
        <div class="case-data-row"><span class="case-data-key">BD: TGO / TGP</span><span class="case-data-val alert-val">52 / 67 U/L ↑</span></div>
        <div class="case-data-row"><span class="case-data-key">BD: Triglicéridos</span><span class="case-data-val alert-val">245 mg/dL ↑↑</span></div>
        <div class="case-data-row"><span class="case-data-key">FH: Bebidas azucaradas</span><span class="case-data-val alert-val">3–4 refrescos/día (~560 mL c/u)</span></div>
        <div class="case-data-row"><span class="case-data-key">FH: Ingesta estimada</span><span class="case-data-val alert-val">~3,200 kcal/día (exceso ~700 kcal)</span></div>
        <div class="case-data-row"><span class="case-data-key">PD: Signos físicos</span><span class="case-data-val">Sin edema; fatiga crónica reportada</span></div>
      </div>`
  },
  'case-d': {
    header: '📋 D · Diagnóstico Nutricio (PES)',
    html: `
      <div class="case-phase-content">
        <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:8px">Problema prioritario identificado a partir de los S/S más urgentes:</p>
        <div class="pes-statement-box">
          <strong>[P]</strong> Ingesta excesiva de azúcares simples y energía total<br>
          <strong>[r/c E]</strong> consumo habitual de 3–4 refrescos al día como bebida principal y falta de alternativas saludables incorporadas<br>
          <strong>[e/p S]</strong> glucosa en ayuno de 142 mg/dL, triglicéridos 245 mg/dL e ingesta estimada de 3,200 kcal/día con ~40% proveniente de bebidas azucaradas.
        </div>
        <p style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">
          ✓ Etiqueta eNCPT: "Ingesta excesiva de azúcares" (NI-5.8.6)<br>
          ✓ Etiología accionable: conducta de consumo específica<br>
          ✓ Signos cuantificados: glucosa, TG e ingesta calórica
        </p>
      </div>`
  },
  'case-i': {
    header: '⚡ I · Intervención — Atacando la Etiología',
    html: `
      <div class="case-phase-content">
        <ul class="intervention-list">
          <li><span class="int-tag">C</span> Consejería nutricia: explorar barreras del consumo de refrescos, establecer plan de sustitución gradual con agua simple y aguas saborizadas sin azúcar.</li>
          <li><span class="int-tag">E</span> Educación: lectura de etiquetas nutrimentales (azúcares totales / añadidos). Enseñar a identificar el contenido en 600 mL de refresco.</li>
          <li><span class="int-tag">ND</span> Plan de alimentación: déficit de 500–600 kcal/día con patrón Mediterráneo modificado; foco en reducción de fructosa libre y aumento de fibra.</li>
          <li><span class="int-tag">RC</span> Coordinar con médico tratante: seguimiento de función hepática y glucosa a las 8 semanas.</li>
        </ul>
      </div>`
  },
  'case-me': {
    header: '📊 M/E · Monitoreo — Indicadores Basados en los S del PES',
    html: `
      <div class="case-phase-content">
        <div class="monitor-rows">
          <div class="monitor-row">
            <span class="monitor-indicator">Glucosa en ayuno</span>
            <div class="monitor-bar-track">
              <div class="monitor-bar-fill" style="width:72%;background:var(--blue-600)"></div>
            </div>
            <span class="monitor-target">Meta: &lt;100 mg/dL</span>
          </div>
          <div class="monitor-row">
            <span class="monitor-indicator">Triglicéridos</span>
            <div class="monitor-bar-track">
              <div class="monitor-bar-fill" style="width:55%;background:var(--orange)"></div>
            </div>
            <span class="monitor-target">Meta: &lt;150 mg/dL</span>
          </div>
          <div class="monitor-row">
            <span class="monitor-indicator">Refrescos/día</span>
            <div class="monitor-bar-track">
              <div class="monitor-bar-fill" style="width:25%;background:var(--teal-700)"></div>
            </div>
            <span class="monitor-target">Meta: 0 / día</span>
          </div>
          <div class="monitor-row">
            <span class="monitor-indicator">Kcal totales/día</span>
            <div class="monitor-bar-track">
              <div class="monitor-bar-fill" style="width:60%;background:var(--teal-500)"></div>
            </div>
            <span class="monitor-target">Meta: ~2,500 kcal</span>
          </div>
        </div>
        <p style="font-size:0.73rem;color:var(--text-muted);margin-top:10px">📅 Evaluación a las 4 y 8 semanas. Si no hay mejoría → revisar etiología (¿hay barreras no identificadas?).</p>
      </div>`
  }
};

function initSlide10() {
  const panel = document.getElementById('caseContentPanel');
  if (!panel) return;
  renderCasePhase('case-a');

  ['caseBtnA', 'caseBtnD', 'caseBtnI', 'caseBtnME'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.case-phase-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCasePhase(btn.dataset.phase);
    });
  });
}

function renderCasePhase(phase) {
  const data = caseContent[phase];
  if (!data) return;
  const panel = document.getElementById('caseContentPanel');
  panel.innerHTML = `
    <h4 class="case-phase-header">${data.header}</h4>
    ${data.html}`;
  // Force reflow then re-apply animation (reliable cross-browser)
  panel.style.animation = 'none';
  void panel.offsetWidth;
  panel.style.animation = 'fadeIn 0.3s ease';
}

/* ══════════════════════════════════════════════════════════════
   GLOBAL EVENTS
   ══════════════════════════════════════════════════════════════ */
function attachGlobalEvents() {
  // Navigation buttons
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goToSlide(currentSlide + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goToSlide(currentSlide - 1);
    }
    if (e.key === 'Home') goToSlide(1);
    if (e.key === 'End') goToSlide(TOTAL_SLIDES);
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    if (e.key === 'n' || e.key === 'N') toggleNotes();
  });

  // Sidebar toggle
  menuBtn.addEventListener('click', () => {
    isSidebarOpen = !isSidebarOpen;
    sidebar.classList.toggle('collapsed', !isSidebarOpen);
  });
  sidebarClose.addEventListener('click', () => {
    isSidebarOpen = false;
    sidebar.classList.add('collapsed');
  });

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    themeToggle.lastChild.textContent = isDark ? ' Modo Claro' : ' Modo Oscuro';
  });

  // Fullscreen
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Notes panel
  notesToggle.addEventListener('click', toggleNotes);
  notesClose.addEventListener('click', () => {
    isNotesOpen = false;
    notesPanel.classList.remove('open');
  });

  // Touch / swipe support
  let touchStartX = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
  }, { passive: true });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    fullscreenBtn.textContent = '⛶';
  } else {
    document.exitFullscreen();
    fullscreenBtn.textContent = '⛶';
  }
}

function toggleNotes() {
  isNotesOpen = !isNotesOpen;
  notesPanel.classList.toggle('open', isNotesOpen);
}

/* ══════════════════════════════════════════════════════════════
   BOOTSTRAP
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', init);
