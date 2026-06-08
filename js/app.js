/* ═══════════════════════════════════════════════
   MUNDIAL 2026 · PRONÓSTICOS · app.js
   ═══════════════════════════════════════════════ */

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyABk4PMAX4pS0-bHKIm9h7BL5GSA3_MQS20o_76pB3qcXTM3a0W_5YZ3uQb1TJSFZ0Mg/exec";

// ── STATE ──────────────────────────────────────
const state = {
  predicciones: {},   // { matchId: "local"|"empate"|"visitante" }
  campeon: "",
  grupoActivo: null,  // tab activo en el formulario
};

// ── INIT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCountdown();
  renderGrupos();
  renderRanking();
  checkAlreadySubmitted();
  initScrollAnimations();
});

// ── NAV ────────────────────────────────────────
function initNav() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
}

// ── COUNTDOWN ──────────────────────────────────
function initCountdown() {
  const target = new Date(MUNDIAL_DATA.config.fechaLimiteFase);
  const faseLabel = getCurrentFase()?.label || "";
  document.getElementById('cd-fase-label').textContent = `Cierre de pronósticos: ${faseLabel}`;

  function update() {
    const diff = target - new Date();
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).textContent = '00');
      return;
    }
    document.getElementById('cd-days').textContent  = String(Math.floor(diff / 86400000)).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
}

function getCurrentFase() {
  return MUNDIAL_DATA.fases[MUNDIAL_DATA.config.faseActiva] || null;
}

// ── GRUPOS INFO ────────────────────────────────
function renderGrupos() {
  const container = document.getElementById('grupos-grid');
  container.innerHTML = MUNDIAL_DATA.grupos
    .map(
      (g) => `
    <div class="grupo-card">
      <div class="grupo-letra">Grupo ${g.id}</div>
      ${g.equipos
        .map(
          (
            e,
          ) => `<div class="grupo-equipo"><img src="https://flagcdn.com/24x18/${CODIGOS[e]}.png" style="width:24px;height:18px;vertical-align:middle;margin-right:6px;border-radius:2px"> ${e}</div>`,
        )
        .join("")}
    </div>
  `,
    )
    .join("");
}

// ── RANKING ────────────────────────────────────
function renderRanking() {
  const container = document.getElementById('ranking-body');
  const data = MUNDIAL_DATA.ranking;

  if (!data || data.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="empty-ranking">🏆 El ranking se actualizará con los primeros resultados</td></tr>`;
    return;
  }

  const sorted = [...data].sort((a, b) => b.aciertos - a.aciertos);
  const maxAciertos = sorted[0]?.aciertos || 1;

  container.innerHTML = sorted.map((p, i) => {
    const pos = i + 1;
    const posClass = pos <= 3 ? `top${pos}` : '';
    const medal = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : pos;
    const pct = Math.round((p.aciertos / (p.total || 1)) * 100);
    const barWidth = Math.round((p.aciertos / maxAciertos) * 100);
    return `
      <tr class="ranking-row">
        <td><span class="rank-pos ${posClass}">${medal}</span></td>
        <td><span class="rank-name">${escapeHtml(p.nombre)} ${escapeHtml(p.apellido)}</span></td>
        <td><span class="rank-campeon">${escapeHtml(p.campeon || '—')}</span></td>
        <td><span class="rank-aciertos">${p.aciertos}</span><span style="color:var(--gray);font-size:0.8rem"> / ${p.total}</span></td>
        <td style="color:var(--gold);font-family:'Barlow Condensed',sans-serif;font-size:0.9rem">${pct}%</td>
        <td><div class="rank-bar-wrap"><div class="rank-bar" style="width:${barWidth}%"></div></div></td>
      </tr>`;
  }).join('');
}

// ── CHECK SUBMITTED ────────────────────────────
function checkAlreadySubmitted() {
  const stored = localStorage.getItem('mundial2026_done');
  const container = document.getElementById('pronostico-content');
  const now = new Date();
  const deadline = new Date(MUNDIAL_DATA.config.fechaLimiteFase);
  const faseKey = MUNDIAL_DATA.config.faseActiva;

  if (now > deadline) {
    container.innerHTML = `
      <div class="form-closed">
        <div class="lock-icon">🔒</div>
        <h3>Pronósticos Cerrados</h3>
        <p>El plazo para esta fase ya finalizó.<br>Espera la actualización para la siguiente ronda.</p>
      </div>`;
    return;
  }

  // Check if already submitted THIS phase
  let doneData = null;
  try { doneData = stored ? JSON.parse(stored) : null; } catch(e) {}

  if (doneData && doneData.fase === faseKey) {
    container.innerHTML = `
      <div class="already-done">
        <div class="check-icon">✅</div>
        <h3>¡Ya enviaste tu pronóstico!</h3>
        <p>Fase: <strong style="color:var(--gold)">${getCurrentFase()?.label}</strong><br>
           Registrado el ${new Date(doneData.timestamp).toLocaleString('es-EC')}</p>
        <button class="btn-download" onclick="descargarComprobante()">📥 Descargar comprobante</button>
      </div>`;
    return;
  }

  renderForm();
}

// ── RENDER FORM ────────────────────────────────
function renderForm() {
  const fase = getCurrentFase();
  if (!fase) return;

  const faseKey = MUNDIAL_DATA.config.faseActiva;
  const esGrupos = faseKey.startsWith('grupos');
  const partidos = fase.partidos;
  const totalPartidos = partidos.length;

  // Build group tabs if grupos phase
  let tabsHTML = '';
  let partidosHTML = '';

  if (esGrupos) {
    // Get unique groups from this phase's matches
    const gruposEnFase = [...new Set(partidos.map(p => p.grupo).filter(Boolean))].sort();
    state.grupoActivo = gruposEnFase[0];

    tabsHTML = `
      <div class="grupos-tabs" id="grupos-tabs">
        ${gruposEnFase.map(g => `
          <button class="grupo-tab ${g === state.grupoActivo ? 'active' : ''}"
            onclick="switchGrupoTab('${g}')">Grupo ${g}</button>
        `).join('')}
      </div>`;

    partidosHTML = gruposEnFase.map(g => {
      const matchesDeGrupo = partidos.filter(p => p.grupo === g);
      return `
        <div class="partidos-grupo ${g === state.grupoActivo ? 'active' : ''}" id="tab-${g}">
          <div class="grupo-header-label">⚽ Grupo ${g}</div>
          ${matchesDeGrupo.map(p => renderPartido(p)).join('')}
        </div>`;
    }).join('');

  } else {
    partidosHTML = `<div class="partidos-grupo active">${partidos.map(p => renderPartido(p)).join('')}</div>`;
  }

  const container = document.getElementById('pronostico-content');
  container.innerHTML = `
    <div class="fase-badge"><span>📅 ${fase.label}</span></div>

    <!-- Datos personales -->
    <div class="user-form">
      <div class="form-group">
        <label class="form-label">Nombre *</label>
        <input class="form-input" id="f-nombre" type="text" placeholder="Tu nombre" maxlength="50" />
      </div>
      <div class="form-group">
        <label class="form-label">Apellido *</label>
        <input class="form-input" id="f-apellido" type="text" placeholder="Tu apellido" maxlength="50" />
      </div>
      <div class="form-group full">
        <label class="form-label">Correo electrónico *</label>
        <input class="form-input" id="f-correo" type="email" placeholder="correo@ejemplo.com" maxlength="100" />
      </div>
    </div>

    <!-- Pronóstico Campeón (solo en primera fase) -->
    ${faseKey === 'grupos_j1' ? `
    <div class="campeon-section">
      <div class="campeon-title">🏆 ¿Quién será el Campeón del Mundo?</div>
      <p class="campeon-desc">Elige la selección que crees que levantará la Copa del mundial 2026. Solo puedes hacerlo una vez.</p>
      <select class="campeon-select" id="f-campeon">
        <option value="">— Selecciona un campeón —</option>
        ${MUNDIAL_DATA.equipos.map(e => `<option value="${e}">${e}</option>`).join('')}
      </select>
    </div>` : ''}

    <!-- Progress -->
    <div class="fase-progress">
      <div class="fase-progress-label" id="prog-label">0 / ${totalPartidos} partidos seleccionados</div>
      <div class="fase-progress-bar"><div class="fase-progress-fill" id="prog-fill" style="width:0%"></div></div>
    </div>

    <!-- Tabs de grupos + partidos -->
    ${tabsHTML}
    <div id="partidos-container">${partidosHTML}</div>

    <!-- Submit -->
    <div class="submit-zone">
      <p class="submit-info">
        Al enviar confirmas que los datos son correctos.<br>
        <strong style="color:var(--gold)">Un pronóstico por participante por fase.</strong>
      </p>
      <button class="btn-submit" id="btn-enviar" onclick="handleSubmit()">
        ⚽ Enviar Pronóstico
      </button>
    </div>
  `;
}

// ── SWITCH GRUPO TAB ───────────────────────────
function switchGrupoTab(grupo) {
  state.grupoActivo = grupo;
  document.querySelectorAll('.grupo-tab').forEach(t => t.classList.toggle('active', t.textContent.trim() === `Grupo ${grupo}`));
  document.querySelectorAll('.partidos-grupo').forEach(p => p.classList.toggle('active', p.id === `tab-${grupo}`));
}

// ── RENDER PARTIDO ─────────────────────────────
function renderPartido(p) {
  return `
    <div class="match-card" id="mc-${p.id}">
      <div class="match-team">${escapeHtml(p.local)}</div>
      <div class="match-info">
        <span class="match-vs">VS</span>
        <span class="match-date">${p.fecha} · ${p.hora}</span>
      </div>
      <div class="match-team right">${escapeHtml(p.visitante)}</div>
      <div class="pred-buttons">
        <button class="pred-btn" onclick="selectPred('${p.id}','local',this)">🏠 ${escapeHtml(p.local)}</button>
        <button class="pred-btn" onclick="selectPred('${p.id}','empate',this)">🤝 Empate</button>
        <button class="pred-btn" onclick="selectPred('${p.id}','visitante',this)">✈️ ${escapeHtml(p.visitante)}</button>
      </div>
      <span class="match-required">⚠ Selecciona un resultado</span>
    </div>`;
}

// ── SELECT PRED ────────────────────────────────
function selectPred(matchId, val, btn) {
  state.predicciones[matchId] = val;

  const card = document.getElementById(`mc-${matchId}`);
  card.querySelectorAll('.pred-btn').forEach(b => b.classList.remove('selected-local','selected-empate','selected-visitante'));
  btn.classList.add(`selected-${val}`);
  card.classList.remove('has-error');

  updateProgress();
}

// ── PROGRESS ───────────────────────────────────
function updateProgress() {
  const fase = getCurrentFase();
  if (!fase) return;
  const total = fase.partidos.length;
  const selected = Object.keys(state.predicciones).length;
  const pct = total > 0 ? Math.round((selected / total) * 100) : 0;

  const lbl = document.getElementById('prog-label');
  const fill = document.getElementById('prog-fill');
  if (lbl) lbl.textContent = `${selected} / ${total} partidos seleccionados`;
  if (fill) fill.style.width = `${pct}%`;
}

// ── VALIDATE ───────────────────────────────────
function validateForm() {
  let valid = true;
  const faseKey = MUNDIAL_DATA.config.faseActiva;

  const nombre  = document.getElementById('f-nombre')?.value.trim();
  const apellido = document.getElementById('f-apellido')?.value.trim();
  const correo  = document.getElementById('f-correo')?.value.trim();

  [['f-nombre', nombre], ['f-apellido', apellido], ['f-correo', correo]].forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (!val) { el.classList.add('error'); valid = false; }
    else el.classList.remove('error');
  });

  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    document.getElementById('f-correo').classList.add('error'); valid = false;
  }

  // Validate campeón only on first phase
  if (faseKey === 'grupos_j1') {
    const campeonEl = document.getElementById('f-campeon');
    if (!campeonEl?.value) {
      campeonEl.classList.add('error'); valid = false;
      showToast('⚠ Debes elegir un campeón del mundo', 'error');
    } else {
      campeonEl.classList.remove('error');
    }
  }

  // Validate all matches
  let missingMatches = false;
  getCurrentFase()?.partidos.forEach(p => {
    if (!state.predicciones[p.id]) {
      document.getElementById(`mc-${p.id}`)?.classList.add('has-error');
      missingMatches = true;
      valid = false;
      // Switch to tab with error
      if (p.grupo) switchGrupoTab(p.grupo);
    }
  });

  if (missingMatches) showToast('⚠ Selecciona un resultado para cada partido', 'error');
  else if (!valid && !document.querySelector('.campeon-select.error')) showToast('⚠ Completa todos los campos', 'error');

  return valid;
}

// ── HANDLE SUBMIT ──────────────────────────────
async function handleSubmit() {
  if (!validateForm()) return;

  const btn = document.getElementById('btn-enviar');
  btn.disabled = true;
  btn.textContent = '⏳ Enviando...';

  const nombre   = document.getElementById('f-nombre').value.trim();
  const apellido = document.getElementById('f-apellido').value.trim();
  const correo   = document.getElementById('f-correo').value.trim();
  const campeon  = document.getElementById('f-campeon')?.value || '';
  const faseKey  = MUNDIAL_DATA.config.faseActiva;
  const fase     = getCurrentFase();

  const datos = {
    timestamp: new Date().toISOString(),
    fase: faseKey,
    nombre,
    apellido,
    correo,
    campeon,
    ...state.predicciones
  };

  // Save locally for comprobante
  const localData = { fase: faseKey, nombre, apellido, correo, campeon, predicciones: { ...state.predicciones }, timestamp: new Date().toISOString(), faseLabel: fase?.label };

  try {
    await fetch(URL_SCRIPT, { method: "POST", body: JSON.stringify(datos) });

    localStorage.setItem('mundial2026_done', JSON.stringify(localData));
    localStorage.setItem('mundial2026_comprobante', JSON.stringify(localData));

    showSuccessModal(nombre, localData);

  } catch (e) {
    console.error(e);
    showToast('❌ Error al enviar. Intenta de nuevo.', 'error');
    btn.disabled = false;
    btn.textContent = '⚽ Enviar Pronóstico';
  }
}

// ── SUCCESS MODAL ──────────────────────────────
function showSuccessModal(nombre, data) {
  document.getElementById('modal-nombre').textContent = nombre;
  document.getElementById('success-modal').classList.add('show');
  // Store data for download
  window._comprobanteData = data;
}

function closeModal() {
  document.getElementById('success-modal').classList.remove('show');
  checkAlreadySubmitted();
}

// ── DESCARGAR COMPROBANTE ──────────────────────
function descargarComprobante() {
  let data = window._comprobanteData;
  if (!data) {
    try { data = JSON.parse(localStorage.getItem('mundial2026_comprobante')); } catch(e) {}
  }
  if (!data) { showToast('No hay comprobante guardado', 'error'); return; }

  const fase = MUNDIAL_DATA.fases[data.fase];
  const ts = new Date(data.timestamp).toLocaleString('es-EC', { dateStyle: 'full', timeStyle: 'short' });

  // Build canvas image
  const canvas = document.createElement('canvas');
  const W = 800, HEADER = 200, ROW = 36, PADDING = 40;
  const partidos = fase?.partidos || [];
  canvas.width = W;
  canvas.height = HEADER + partidos.length * ROW + 160;

  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0A0A0F';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gold top bar
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#9A7D1A');
  grad.addColorStop(0.5, '#D4AF37');
  grad.addColorStop(1, '#9A7D1A');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 6);

  // Title
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('MUNDIAL 2026 · COMPROBANTE', W / 2, 55);

  ctx.fillStyle = '#888899';
  ctx.font = '16px Arial';
  ctx.fillText(data.faseLabel || data.fase, W / 2, 82);

  // Participant
  ctx.fillStyle = '#F5F0E8';
  ctx.font = 'bold 20px Arial';
  ctx.fillText(`${data.nombre} ${data.apellido}`, W / 2, 115);
  ctx.fillStyle = '#888899';
  ctx.font = '14px Arial';
  ctx.fillText(data.correo, W / 2, 138);
  ctx.fillText(ts, W / 2, 160);

  if (data.campeon) {
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 15px Arial';
    ctx.fillText(`🏆 Campeón pronosticado: ${data.campeon}`, W / 2, 185);
  }

  // Divider
  ctx.strokeStyle = 'rgba(212,175,55,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PADDING, HEADER - 10);
  ctx.lineTo(W - PADDING, HEADER - 10);
  ctx.stroke();

  // Match rows
  ctx.textAlign = 'left';
  partidos.forEach((p, i) => {
    const y = HEADER + i * ROW + 22;
    const pred = data.predicciones[p.id];
    const resultado = pred === 'local' ? p.local : pred === 'visitante' ? p.visitante : pred === 'empate' ? 'Empate' : '—';
    const emoji = pred === 'local' ? '✅' : pred === 'visitante' ? '✅' : pred === 'empate' ? '🤝' : '❌';

    // Row bg
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent';
    ctx.fillRect(PADDING - 10, y - 18, W - PADDING * 2 + 20, ROW);

    ctx.fillStyle = '#888899';
    ctx.font = '11px Arial';
    ctx.fillText(`Grupo ${p.grupo || ''}`, PADDING, y - 4);

    ctx.fillStyle = '#F5F0E8';
    ctx.font = '14px Arial';
    ctx.fillText(`${p.local} vs ${p.visitante}`, PADDING, y + 12);

    ctx.textAlign = 'right';
    ctx.fillStyle = pred === 'empate' ? '#D4AF37' : pred ? '#00C853' : '#C8102E';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`${emoji} ${resultado}`, W - PADDING, y + 12);
    ctx.textAlign = 'left';
  });

  // Bottom bar
  ctx.fillStyle = 'rgba(212,175,55,0.15)';
  ctx.fillRect(0, canvas.height - 50, W, 50);
  ctx.fillStyle = '#888899';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Pronósticos Mundial 2026 · MX · USA · CAN', W / 2, canvas.height - 22);

  // Download
  const link = document.createElement('a');
  link.download = `pronostico_mundial2026_${data.nombre}_${data.apellido}.png`.replace(/\s+/g,'_');
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ── TOAST ──────────────────────────────────────
function showToast(msg, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; toast.className = 'toast'; document.body.appendChild(toast); }
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── SCROLL ANIMATIONS ──────────────────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ── UTILS ──────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
