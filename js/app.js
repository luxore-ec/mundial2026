/* ═══════════════════════════════════════════════
   MUNDIAL 2026 · PRONÓSTICOS · app.js
   ═══════════════════════════════════════════════ */

const URL_SCRIPT =
  "https://script.google.com/macros/s/AKfycbw2A0MVxVfmsdp35HyqhN4FeMup0jWPLaJXFaizi5FGaiR_vbJjQ4EDRm48rMTd3mmLWw/exec";

// ── STATE ──────────────────────────────────────
const state = {
  predicciones: {}, // { matchId: "local"|"empate"|"visitante" } // Para dieciseisavos guardará: { d01: { ganador: "local", penales: "No" } }
  campeon: "",
  grupoActivo: null, // tab activo en el formulario
};

const PUNTOS_POR_FASE_WEB = {
  grupos_j1: 3,
  grupos_j2: 3,
  grupos_j3: 3,
  dieciseisavos: 4,
  octavos: 6,
  cuartos: 8,
  semifinales: 12,
  final: 30,
};

// ── INIT ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCountdown();
  renderGrupos();
  renderRanking();
  checkAlreadySubmitted();
  initScrollAnimations();
  renderPartidosHoy();
  showRankingPopup();
  const btnConsultar = document.getElementById("btn-consultar");
  if (btnConsultar) {
    btnConsultar.addEventListener("click", iniciarDashboard);
  }
});

// ── NAV ────────────────────────────────────────
function initNav() {
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () =>
    nav.classList.toggle("scrolled", window.scrollY > 60),
  );
  if (sessionStorage.getItem("notif_cerrada_cuartos")) {
    const b = document.getElementById("notif-banner");
    if (b) b.style.display = "none";
  }
}

// ── COUNTDOWN ──────────────────────────────────
function initCountdown() {
  const target = new Date(MUNDIAL_DATA.config.fechaLimiteFase);
  const faseLabel = getCurrentFase()?.label || "";
  document.getElementById("cd-fase-label").textContent =
    `Cierre de pronósticos: ${faseLabel}`;

  function update() {
    const diff = target - new Date();
    if (diff <= 0) {
      ["cd-days", "cd-hours", "cd-mins", "cd-secs"].forEach(
        (id) => (document.getElementById(id).textContent = "00"),
      );
      return;
    }
    document.getElementById("cd-days").textContent = String(
      Math.floor(diff / 86400000),
    ).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(
      Math.floor((diff % 86400000) / 3600000),
    ).padStart(2, "0");
    document.getElementById("cd-mins").textContent = String(
      Math.floor((diff % 3600000) / 60000),
    ).padStart(2, "0");
    document.getElementById("cd-secs").textContent = String(
      Math.floor((diff % 60000) / 1000),
    ).padStart(2, "0");
  }
  update();
  setInterval(update, 1000);
}

function getCurrentFase() {
  return MUNDIAL_DATA.fases[MUNDIAL_DATA.config.faseActiva] || null;
}

// ── GRUPOS INFO ────────────────────────────────
function renderGrupos() {
  const container = document.getElementById("grupos-grid");

  container.innerHTML = MUNDIAL_DATA.grupos
    .map(
      (g) => `
      <details class="grupo-card">
        <summary class="grupo-letra">
          Grupo ${g.id}
        </summary>

        <div class="grupo-contenido">
          ${g.equipos
            .map(
              (e) => `
                <div class="grupo-equipo">
                  <img
                    src="https://flagcdn.com/24x18/${CODIGOS[e]}.png"
                    style="width:24px;height:18px;vertical-align:middle;margin-right:6px;border-radius:2px"
                  >
                  ${e}
                </div>
              `,
            )
            .join("")}
        </div>
      </details>
    `,
    )
    .join("");
}

// ── RANKING ────────────────────────────────────
async function renderRanking() {
  const container = document.getElementById("ranking-body");
  const toggleContainer = document.getElementById("ranking-toggle-container");
  const urlAppsScript =
    "https://script.google.com/macros/s/AKfycbw2A0MVxVfmsdp35HyqhN4FeMup0jWPLaJXFaizi5FGaiR_vbJjQ4EDRm48rMTd3mmLWw/exec";

  // ⚠ Actualiza estos valores cuando se conozcan los resultados reales
  const RESULTADOS_ESPECIALES = {
    campeon: "",
    subcampeon: "",
    tercero: "",
    balonoro: "",
    ecuador: "Dieciseisavos",
  };

  try {
    const response = await fetch(urlAppsScript);
    if (!response.ok) throw new Error("Error de red");

    const apiData = await response.json();
    const data = apiData.ranking;

    if (!data || data.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="6" class="empty-ranking" style="text-align:center;">
            🏆 El ranking se actualizará con los primeros resultados
          </td>
        </tr>`;
      toggleContainer.innerHTML = "";
      return;
    }

    const sorted = [...data].sort((a, b) => b.total_pts - a.total_pts);

    container.innerHTML = sorted
      .map((p, i) => {
        const pos = i + 1;
        const posClass = pos <= 3 ? `top${pos}` : "";
        const medal =
          pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : pos;
        const pct = Math.round((p.aciertos / 104) * 100);

        const hiddenClass = pos > 10 ? "ranking-hidden" : "";
        const hiddenStyle = pos > 10 ? "display:none;" : "";

        const primerNombre = (p.nombre || "").trim().split(/\s+/)[0];
        const primerApellido = (p.apellido || "").trim().split(/\s+/)[0];
        const nombreCorto = `${primerNombre} ${primerApellido}`.trim();

        const esp = p.especiales || {};

        // ── Badges de especiales acertados ──
        const badges = [];
        if (
          RESULTADOS_ESPECIALES.campeon &&
          esp.campeon === RESULTADOS_ESPECIALES.campeon
        )
          badges.push("🏆");
        if (
          RESULTADOS_ESPECIALES.subcampeon &&
          esp.subcampeon === RESULTADOS_ESPECIALES.subcampeon
        )
          badges.push("🥈");
        if (
          RESULTADOS_ESPECIALES.tercero &&
          esp.tercero === RESULTADOS_ESPECIALES.tercero
        )
          badges.push("🥉");
        if (
          RESULTADOS_ESPECIALES.balonoro &&
          esp.balonoro === RESULTADOS_ESPECIALES.balonoro
        )
          badges.push("⭐");
        if (
          RESULTADOS_ESPECIALES.ecuador &&
          esp.ecuador === RESULTADOS_ESPECIALES.ecuador
        )
          badges.push("🇪🇨");

        const badgesHTML =
          badges.length > 0
            ? `<span style="
              background: linear-gradient(135deg, #FFD700, #00C853);
              color: #000;
              font-size: 0.65rem;
              font-family: 'Barlow Condensed', sans-serif;
              font-weight: 700;
              letter-spacing: 0.08em;
              padding: 0.15rem 0.5rem;
              border-radius: 3px;
              margin-left: 5px;
              vertical-align: middle;
              white-space: nowrap;
            ">${badges.join(" ")}</span>`
            : "";

        // ── Lista desplegable de especiales ──
        let selectHTML = "";
        if (
          esp.campeon ||
          esp.subcampeon ||
          esp.tercero ||
          esp.balonoro ||
          esp.ecuador
        ) {
          selectHTML = `
            <select class="ranking-select-especiales" style="max-width:100px; margin:0 auto; display:block;">
              <option value="">Ver</option>
              <option disabled>🥇 Campeón: ${escapeHtml(esp.campeon || "—")}</option>
              <option disabled>🥈 Subcampeón: ${escapeHtml(esp.subcampeon || "—")}</option>
              <option disabled>🥉 3er Lugar: ${escapeHtml(esp.tercero || "—")}</option>
              <option disabled>⭐ Balón Oro: ${escapeHtml(esp.balonoro || "—")}</option>
              <option disabled>🇪🇨 La Tri: ${escapeHtml(esp.ecuador || "—")}</option>
            </select>`;
        } else {
          selectHTML = `<span class="rank-campeon">—</span>`;
        }

        const tdBaseStyle =
          "text-align:center; vertical-align:middle; padding:8px 4px; box-sizing:border-box;";

        return `
          <tr class="ranking-row ${hiddenClass}" style="${hiddenStyle} height:45px;">
            <td style="${tdBaseStyle} width:10%;">
              <span class="rank-pos ${posClass}">${medal}</span>
            </td>
            <td style="${tdBaseStyle} width:35%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              <span class="rank-name" style="display:inline-block; max-width:100%;">${escapeHtml(nombreCorto)}</span>${badgesHTML}
            </td>
            <td style="${tdBaseStyle} width:20%;">
              ${selectHTML}
            </td>
            <td style="${tdBaseStyle} width:15%;">
              <span class="rank-aciertos">${p.aciertos}</span>
            </td>
            <td style="${tdBaseStyle} width:10%; color:var(--gold); font-family:'Barlow Condensed',sans-serif; font-size:0.9rem;">
              ${pct}%
            </td>
            <td style="${tdBaseStyle} width:10%; font-family:'Barlow Condensed',sans-serif; font-size:1.1rem; font-weight:600; color:var(--white);">
              ${p.total_pts}<span style="font-size:0.8rem; color:var(--gold); font-weight:400; margin-left:2px;">PTS</span>
            </td>
          </tr>`;
      })
      .join("");

    const restantes = sorted.length - 10;

    if (restantes > 0) {
      toggleContainer.innerHTML = `
        <button id="ranking-toggle" class="btn-secondary">
          Ver restantes (${restantes})
        </button>`;

      document
        .getElementById("ranking-toggle")
        .addEventListener("click", function () {
          const hiddenRows = document.querySelectorAll(".ranking-hidden");
          const expanded = this.dataset.expanded === "true";
          hiddenRows.forEach((row) => {
            row.style.display = expanded ? "none" : "";
          });
          this.dataset.expanded = !expanded;
          this.textContent = expanded
            ? `Ver restantes (${restantes})`
            : "Ocultar ranking";
        });
    } else {
      toggleContainer.innerHTML = "";
    }
  } catch (error) {
    console.error("Error al renderizar el ranking:", error);
    container.innerHTML = `
      <tr>
        <td colspan="6" class="empty-ranking" style="text-align:center; color:red;">
          ❌ Error al conectar con el servidor de posiciones.
        </td>
      </tr>`;
  }
}

// ── CHECK SUBMITTED ────────────────────────────
function checkAlreadySubmitted() {
  const container = document.getElementById("pronostico-content");
  const now = new Date();
  const deadline = new Date(MUNDIAL_DATA.config.fechaLimiteFase);
  const faseKey = MUNDIAL_DATA.config.faseActiva;

  if (now > deadline) {
    container.innerHTML = `
      <div class="form-closed">
        <div class="lock-icon">🔒</div>
        <h3>Pronósticos Cerrados</h3>
        <p>El plazo para esta fase ya finalizó.<br>Espera la actualización para la siguiente ronda.</p>
        <button class="btn-download" onclick="descargarComprobante()">
          📥 Descargar mi Comprobante
        </button>
      </div>`;
    return;
  }

  // Check if already submitted THIS phase
  const stored = localStorage.getItem(`mundial2026_done_${faseKey}`);
  let doneData = null;
  try {
    doneData = stored ? JSON.parse(stored) : null;
  } catch (e) {}

  if (doneData) {
    container.innerHTML = `
      <div class="already-done">
        <div class="check-icon">✅</div>
        <h3>¡Ya enviaste tu pronóstico!</h3>
        <p>Fase: <strong style="color:var(--gold)">${getCurrentFase()?.label}</strong><br>
           Registrado el ${new Date(doneData.timestamp).toLocaleString("es-EC")}</p>
        <button class="btn-download" onclick="descargarComprobante('${faseKey}')">📥 Descargar comprobante</button>
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
  const esGrupos = faseKey.startsWith("grupos");
  const partidos = fase.partidos;
  const totalPartidos = partidos.length;

  // Build group tabs if grupos phase
  let tabsHTML = "";
  let partidosHTML = "";

  if (esGrupos) {
    // Get unique groups from this phase's matches
    const gruposEnFase = [
      ...new Set(partidos.map((p) => p.grupo).filter(Boolean)),
    ].sort();
    state.grupoActivo = gruposEnFase[0];

    tabsHTML = `
      <div class="grupos-tabs" id="grupos-tabs">
        ${gruposEnFase
          .map(
            (g) => `
          <button class="grupo-tab ${g === state.grupoActivo ? "active" : ""}"
            onclick="switchGrupoTab('${g}')">Grupo ${g}</button>
        `,
          )
          .join("")}
      </div>`;

    partidosHTML = gruposEnFase
      .map((g) => {
        const matchesDeGrupo = partidos.filter((p) => p.grupo === g);
        return `
        <div class="partidos-grupo ${g === state.grupoActivo ? "active" : ""}" id="tab-${g}">
          <div class="grupo-header-label">⚽ Grupo ${g}</div>
          ${matchesDeGrupo.map((p) => renderPartido(p)).join("")}
        </div>`;
      })
      .join("");
  } else {
    partidosHTML = `<div class="partidos-grupo active">${partidos.map((p) => renderPartido(p)).join("")}</div>`;
  }

  const container = document.getElementById("pronostico-content");
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
      <div class="form-group">
        <label class="form-label">Cédula *</label>
        <input
          class="form-input"
          id="f-cedula"
          type="text"
          inputmode="numeric"
          maxlength="10"
          placeholder="1234567890"
        />
      </div>
      <div class="form-group full">
        <label class="form-label">Correo electrónico *</label>
        <input class="form-input" id="f-correo" type="email" placeholder="correo@ejemplo.com" maxlength="100" />
      </div>
      <div class="form-group full">
        <label class="form-label">Teléfono / WhatsApp *</label>
        <input class="form-input" id="f-telefono" type="tel" placeholder="+593 99 999 9999" maxlength="20" />
      </div>
    </div>

    <!-- Pronóstico Campeón (solo en primera fase) -->
    ${
      faseKey === "grupos_j1"
        ? `

    <div class="campeon-section">

      <div class="campeon-title">
        🏆 Pronósticos Especiales
      </div>

      <p class="campeon-desc">
        Estos pronósticos otorgan puntos adicionales durante el torneo.
      </p>

      <div class="user-form">

        <div class="form-group">
          <label class="form-label">Campeón * <span style="color:#ffffff; font-weight:bold;">(+30 pts)</span></label>
          <select class="campeon-select" id="f-campeon">
            <option value="">Selecciona</option>
            ${MUNDIAL_DATA.equipos
              .map((e) => `<option value="${e}">${e}</option>`)
              .join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Subcampeón * <span style="color:#ffffff; font-weight:bold;">(+20 pts)</span></label>
          <select class="campeon-select" id="f-subcampeon">
            <option value="">Selecciona</option>
            ${MUNDIAL_DATA.equipos
              .map((e) => `<option value="${e}">${e}</option>`)
              .join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Tercer Lugar * <span style="color:#ffffff; font-weight:bold;">(+15 pts)</span></label>
          <select class="campeon-select" id="f-tercero">
            <option value="">Selecciona</option>
            ${MUNDIAL_DATA.equipos
              .map((e) => `<option value="${e}">${e}</option>`)
              .join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">País ganador del Balón de Oro * <span style="color:#ffffff; font-weight:bold;">(+20 pts)</span></label>
          <select class="campeon-select" id="f-balonoro">
            <option value="">Selecciona</option>
            ${MUNDIAL_DATA.equipos
              .map((e) => `<option value="${e}">${e}</option>`)
              .join("")}
          </select>
        </div>

        <div class="form-group full">
          <label class="form-label">
            BONUS LA TRI: ¿Hasta qué fase llegará Ecuador? <span style="color:#ffffff; font-weight:bold;">(+20 pts)</span>
          </label>

          <select class="campeon-select" id="f-ecuador">
            <option value="">Selecciona</option>
            <option value="Fase de grupos">Fase de grupos</option>
            <option value="Dieciseisavos">Clasificado a Dieciseisavos</option>
            <option value="Octavos">Clasificado a Octavos</option>
            <option value="Cuartos">Clasificado a Cuartos</option>
            <option value="Semifinales">Clasificado a Semifinales</option>
            <option value="Final">Clasificado a la Final</option>
          </select>

        </div>

      </div>

    </div>

    `
        : ""
    }

    <!-- Progress -->
    <div class="fase-progress" style="padding: 12px; text-align: center; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 15px;">
      <div class="fase-progress-label" id="prog-label" style="font-family:'Barlow Condensed',sans-serif; font-size:1.1rem; letter-spacing:0.5px;">
        Puntos en juego: <strong style="color:var(--gold)">0</strong> pts (0 de ${totalPartidos} partidos)
      </div>
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
      
      <!--
      <button class="btn-submit" id="btn-enviar" onclick="handleSubmit()">
        ⚽ Enviar Pronóstico
      </button>
      -->

    </div>
  `;
}

// ── SWITCH GRUPO TAB ───────────────────────────
function switchGrupoTab(grupo) {
  state.grupoActivo = grupo;
  document
    .querySelectorAll(".grupo-tab")
    .forEach((t) =>
      t.classList.toggle("active", t.textContent.trim() === `Grupo ${grupo}`),
    );
  document
    .querySelectorAll(".partidos-grupo")
    .forEach((p) => p.classList.toggle("active", p.id === `tab-${grupo}`));
}

function getFlagImg(pais) {
  const code = CODIGOS[pais];
  if (!code) return ""; // Retorna vacío si el país no está mapeado

  // Usando el CDN estándar de flagcdn para consistencia
  return `<img src="https://flagcdn.com/w40/${code}.png" alt="${pais}" class="match-flag" style="width: 24px; height: auto; border-radius: 2px; vertical-align: middle;">`;
}

// ── RENDER PARTIDO ─────────────────────────────
function renderPartido(p) {
  const fase = getCurrentFase();
  const esFasePenales = fase && fase.fasePenales;

  if (esFasePenales) {
    return `
      <div class="match-card" id="mc-${p.id}" style="display: flex; flex-direction: column; align-items: stretch;">
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; width: 100%;">
          <div class="match-team">
            ${getFlagImg(p.local)} <span class="team-name">${escapeHtml(p.local)}</span>
          </div>
          <div class="match-info">
            <span class="match-vs">VS</span>
            <span class="match-date">${p.fecha} · ${p.hora}</span>
          </div>
          <div class="match-team right">
            <span class="team-name">${escapeHtml(p.visitante)}</span> ${getFlagImg(p.visitante)}
          </div>
        </div>
        
        <div class="marcador-container" style="display: flex; gap: 10px; justify-content: center; align-items: center; margin: 15px 0;">
          <input type="number" id="marcador-l-${p.id}" min="0" placeholder="0" class="input-marcador" style="width: 50px; text-align: center; background: #161622; border: 1px solid var(--gold); color: white; padding: 5px; border-radius: 4px;" oninput="captureMarcador('${p.id}')">
          <span style="color: var(--white); font-weight: bold;">-</span>
          <input type="number" id="marcador-v-${p.id}" min="0" placeholder="0" class="input-marcador" style="width: 50px; text-align: center; background: #161622; border: 1px solid var(--gold); color: white; padding: 5px; border-radius: 4px;" oninput="captureMarcador('${p.id}')">
        </div>

        <div class="pred-buttons" style="width: 100%; margin-top: 0.5rem;">
          <button class="pred-btn ganador-btn" onclick="selectGanador('${p.id}','local',this)">🏆 ${escapeHtml(p.local)}</button>
          <button class="pred-btn ganador-btn" onclick="selectGanador('${p.id}','visitante',this)">🏆 ${escapeHtml(p.visitante)}</button>
        </div>

        <div id="penales-section-${p.id}" class="penales-container" style="display: none; width: 100% !important; min-width: 100% !important; clear: both !important; margin-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.25rem; box-sizing: border-box;">
          <p style="font-family:'Barlow Condensed',sans-serif; font-size: 1rem; color: var(--gold); margin: 0 0 0.85rem 0; text-transform: uppercase; letter-spacing: 0.05em; text-align: center; width: 100% !important; display: block !important;">
            ¿Llegaran a los penales? <span style="color: #fff; font-weight: bold;">(+5 PTS)</span>
          </p>
          <div style="display: flex !important; justify-content: center !important; gap: 12px; width: 100% !important; max-width: 280px !important; margin: 0 auto !important;">
            <button class="pred-btn penales-btn" style="flex: 1; min-width: 100px;" onclick="selectPenales('${p.id}','Si',this)">⚽ Sí</button>
            <button class="pred-btn penales-btn" style="flex: 1; min-width: 100px;" onclick="selectPenales('${p.id}','No',this)">❌ No</button>
          </div>
        </div>

        <span class="match-required" style="margin-top: 0.5rem;">⚠ Selecciona el ganador, marcador y la definición</span>
      </div>`;
  }

  // Lógica original intacta para fases regulares
  return `
    <div class="match-card" id="mc-${p.id}">
      <div class="match-team">
        ${getFlagImg(p.local)} <span class="team-name">${escapeHtml(p.local)}</span>
      </div>
      <div class="match-info">
        <span class="match-vs">VS</span>
        <span class="match-date">${p.fecha} · ${p.hora}</span>
      </div>
      <div class="match-team right">
        <span class="team-name">${escapeHtml(p.visitante)}</span> ${getFlagImg(p.visitante)}
      </div>
      <div class="pred-buttons">
        <button class="pred-btn" onclick="selectPred('${p.id}','local',this)">${escapeHtml(p.local)}</button>
        <!--
        <button class="pred-btn" onclick="selectPred('${p.id}','empate',this)">🤝 Empate</button>
        -->
        <button class="pred-btn" onclick="selectPred('${p.id}','visitante',this)">${escapeHtml(p.visitante)}</button>
      </div>
      <span class="match-required">⚠ Selecciona un resultado</span>
    </div>`;
}

function captureMarcador(matchId) {
  if (
    !state.predicciones[matchId] ||
    typeof state.predicciones[matchId] === "string"
  ) {
    state.predicciones[matchId] = { ganador: "", penales: "", marcador: "0-0" };
  }
  const gl = document.getElementById(`marcador-l-${matchId}`).value || "0";
  const gv = document.getElementById(`marcador-v-${matchId}`).value || "0";
  state.predicciones[matchId].marcador = `${gl}-${gv}`;
  updateProgress();
}

// ── SELECT PRED ────────────────────────────────
function selectPred(matchId, val, btn) {
  state.predicciones[matchId] = val;

  const card = document.getElementById(`mc-${matchId}`);
  card
    .querySelectorAll(".pred-btn")
    .forEach((b) =>
      b.classList.remove(
        "selected-local",
        "selected-empate",
        "selected-visitante",
      ),
    );
  btn.classList.add(`selected-${val}`);
  card.classList.remove("has-error");

  updateProgress();
}

// ── SELECT GANADOR ─────────────────────────────
function selectGanador(matchId, val, btn) {
  const fase = getCurrentFase();
  const card = document.getElementById(`mc-${matchId}`);

  if (fase?.fasePenales) {
    if (
      !state.predicciones[matchId] ||
      typeof state.predicciones[matchId] === "string"
    ) {
      const gl = document.getElementById(`marcador-l-${matchId}`)?.value || "0";
      const gv = document.getElementById(`marcador-v-${matchId}`)?.value || "0";
      state.predicciones[matchId] = {
        ganador: "",
        penales: "",
        marcador: `${gl}-${gv}`,
      };
    }
    state.predicciones[matchId].ganador = val;

    card
      .querySelectorAll(".ganador-btn")
      .forEach((b) =>
        b.classList.remove("selected-local", "selected-visitante"),
      );
    btn.classList.add(`selected-${val}`);

    const penalesSection = document.getElementById(
      `penales-section-${matchId}`,
    );
    if (penalesSection)
      penalesSection.style.setProperty("display", "block", "important");
  } else {
    state.predicciones[matchId] = val;
    card
      .querySelectorAll(".pred-btn")
      .forEach((b) =>
        b.classList.remove(
          "selected-local",
          "selected-empate",
          "selected-visitante",
        ),
      );
    btn.classList.add(`selected-${val}`);
  }

  card.classList.remove("has-error");
  updateProgress();
}

// ── SELECT PENALES ─────────────────────────────
function selectPenales(matchId, val, btn) {
  if (!state.predicciones[matchId]) return;

  state.predicciones[matchId].penales = val;

  const card = document.getElementById(`mc-${matchId}`);
  // Remueve las clases previas de los botones de penales
  card
    .querySelectorAll(".penales-btn")
    .forEach((b) => b.classList.remove("selected-local", "selected-visitante"));

  // Mapea 'Si' -> 'local' y 'No' -> 'visitante' para reutilizar tus estilos CSS existentes de colores
  const cssClass = val === "Si" ? "local" : "visitante";
  btn.classList.add(`selected-${cssClass}`);

  card.classList.remove("has-error");
  updateProgress();
}

// ── PROGRESS ───────────────────────────────────
function updateProgress() {
  const fase = getCurrentFase();
  if (!fase) return;

  let puntosPotenciales = 0;
  let partidosRespondidos = 0;

  if (fase.fasePenales) {
    Object.values(state.predicciones).forEach((pred) => {
      if (pred && typeof pred === "object") {
        if (pred.ganador) {
          puntosPotenciales += 12; // 8 puntos por elegir ganador
          partidosRespondidos++;
        }
        if (pred.penales) {
          puntosPotenciales += 5; // 5 puntos por elegir penales (Sí/No)
        }
        if (pred.marcador) {
          puntosPotenciales += 5; // 5 puntos por elegir marcador
        }
      }
    });
  } else {
    const faseKey = MUNDIAL_DATA.config.faseActiva;
    const ptsPorAcierto = PUNTOS_POR_FASE_WEB[faseKey] || 3;
    const selected = Object.keys(state.predicciones).length;
    puntosPotenciales = selected * ptsPorAcierto;
    partidosRespondidos = selected;
  }

  const lbl = document.getElementById("prog-label");
  if (lbl) {
    lbl.innerHTML = `Puntos potenciales en juego: <strong style="color:var(--gold)">${puntosPotenciales}</strong> pts (${partidosRespondidos} de ${fase.partidos.length} partidos)`;
  }
}

// ── VALIDATE ───────────────────────────────────
function validateForm() {
  let valid = true;
  const faseKey = MUNDIAL_DATA.config.faseActiva;

  const nombre = document
    .getElementById("f-nombre")
    ?.value.trim()
    .replace(/\s+/g, " ");

  const apellido = document
    .getElementById("f-apellido")
    ?.value.trim()
    .replace(/\s+/g, " ");

  const cedula = document.getElementById("f-cedula")?.value.trim();
  const correo = document.getElementById("f-correo")?.value.trim();
  const telefono = document.getElementById("f-telefono")?.value.trim();

  // Campos obligatorios
  [
    ["f-nombre", nombre],
    ["f-apellido", apellido],
    ["f-cedula", cedula],
    ["f-correo", correo],
    ["f-telefono", telefono],
  ].forEach(([id, val]) => {
    const el = document.getElementById(id);

    if (!val) {
      el.classList.add("error");
      valid = false;
    } else {
      el.classList.remove("error");
    }
  });

  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,50}$/;
  const cedulaRegex = /^\d{10}$/;
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefonoRegex = /^\+?[0-9]{10,20}$/;
  const nombreEl = document.getElementById("f-nombre");
  const apellidoEl = document.getElementById("f-apellido");
  const cedulaEl = document.getElementById("f-cedula");
  const correoEl = document.getElementById("f-correo");

  // Nombre
  if (nombre && !nombreRegex.test(nombre)) {
    nombreEl.classList.add("error");
    valid = false;
  } else if (nombre) {
    nombreEl.classList.remove("error");
  }

  // Apellido
  if (apellido && !nombreRegex.test(apellido)) {
    apellidoEl.classList.add("error");
    valid = false;
  } else if (apellido) {
    apellidoEl.classList.remove("error");
  }

  // Cédula
  if (!cedulaRegex.test(cedula || "")) {
    cedulaEl.classList.add("error");
    valid = false;
  } else {
    cedulaEl.classList.remove("error");
  }

  // Correo
  if (correo && !correoRegex.test(correo)) {
    correoEl.classList.add("error");
    valid = false;
  } else if (correo) {
    correoEl.classList.remove("error");
  }

  // Pronósticos especiales
  if (faseKey === "grupos_j1") {
    const camposEspeciales = [
      "f-campeon",
      "f-subcampeon",
      "f-tercero",
      "f-balonoro",
      "f-ecuador",
    ];

    camposEspeciales.forEach((id) => {
      const el = document.getElementById(id);

      if (!el?.value) {
        el.classList.add("error");
        valid = false;
      } else {
        el.classList.remove("error");
      }
    });

    if (!valid) {
      showToast(
        "⚠ Completa todos los pronósticos especiales y datos requeridos",
        "error",
      );
    }
  }

  // Validate all matches
  let missingMatches = false;
  const fase = getCurrentFase();

  fase?.partidos.forEach((p) => {
    const pred = state.predicciones[p.id];
    let partidoIncompleto = false;

    if (fase.fasePenales) {
      // Es obligatorio que exista el objeto y que posea tanto ganador como penales definidos
      if (
        !pred ||
        typeof pred !== "object" ||
        !pred.ganador ||
        !pred.penales ||
        !pred.marcador
      ) {
        partidoIncompleto = true;
      }
    } else {
      if (!pred || typeof pred !== "string") {
        partidoIncompleto = true;
      }
    }

    if (partidoIncompleto) {
      document.getElementById(`mc-${p.id}`)?.classList.add("has-error");
      missingMatches = true;
      valid = false;
      if (p.grupo) switchGrupoTab(p.grupo);
    }
  });

  if (missingMatches)
    showToast("⚠ Selecciona un resultado para cada partido", "error");
  else if (!valid && !document.querySelector(".campeon-select.error"))
    showToast("⚠ Completa todos los campos", "error");

  return valid;
}

async function getUserIP() {
  const servicios = [
    "https://api.ipify.org?format=json",
    "https://api.ip.sb/jsonip",
    "https://ipapi.co/json/",
  ];

  for (const url of servicios) {
    try {
      // Usamos un timeout corto para no retrasar el envío si el bloqueo de cliente está activo
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1500);

      const res = await fetch(url, { signal: controller.signal }).catch(
        () => null,
      );
      clearTimeout(id);

      if (!res || !res.ok) continue;

      const data = await res.json().catch(() => ({}));
      const ip = data.ip || data.IP || "";
      if (ip) return ip;
    } catch (e) {
      // Silenciar el error en consola provocado por bloqueadores de publicidad
    }
  }
  return "bloqueado-por-cliente";
}

// ── HANDLE SUBMIT ──────────────────────────────
async function handleSubmit() {
  if (!validateForm()) return;

  const btn = document.getElementById("btn-enviar");
  btn.disabled = true;
  btn.textContent = "⏳ Enviando...";

  const nombre = document.getElementById("f-nombre").value.trim();
  const apellido = document.getElementById("f-apellido").value.trim();
  const cedula = document.getElementById("f-cedula").value.trim();
  const correo = document.getElementById("f-correo").value.trim();
  const telefono = document.getElementById("f-telefono").value.trim();

  const campeon = document.getElementById("f-campeon")?.value || "";
  const subcampeon = document.getElementById("f-subcampeon")?.value || "";
  const tercero = document.getElementById("f-tercero")?.value || "";
  const balonoro = document.getElementById("f-balonoro")?.value || "";
  const ecuador = document.getElementById("f-ecuador")?.value || "";
  const faseKey = MUNDIAL_DATA.config.faseActiva;
  const fase = getCurrentFase();

  // Aplanamiento dinámico de predicciones para la base de datos
  const prediccionesAplanadas = {};

  // BUSCA ESTA SECCIÓN EXACTA EN LA FUNCIÓN handleSubmit() Y REEMPLÁZALA:
  if (fase?.fasePenales) {
    Object.keys(state.predicciones).forEach((id) => {
      const pred = state.predicciones[id];
      if (pred && typeof pred === "object") {
        prediccionesAplanadas[`${id}_G`] = pred.ganador;
        prediccionesAplanadas[`${id}_P`] = pred.penales;
        prediccionesAplanadas[`${id}_M`] = pred.marcador; // Envía el valor "L-V" a la columna c0X_M
      }
    });
  } else {
    Object.assign(prediccionesAplanadas, state.predicciones);
  }

  const datos = {
    timestamp: new Date().toISOString(),
    nombre,
    apellido,
    cedula,
    correo,
    telefono,

    campeon,
    subcampeon,
    tercero,
    balonoro,
    ecuador,
    fase: faseKey,
    ip: await getUserIP(),
    dispositivo: navigator.userAgent,
    ...prediccionesAplanadas, // Se inyectan las cabeceras estructuradas como d01_G y d01_P
  };

  // Save locally for comprobante
  const localData = {
    fase: faseKey,

    nombre,
    apellido,
    cedula,
    correo,

    campeon,
    subcampeon,
    tercero,
    balonoro,
    ecuador,

    predicciones: { ...state.predicciones },

    timestamp: new Date().toISOString(),
    faseLabel: fase?.label,
  };

  try {
    await fetch(URL_SCRIPT, { method: "POST", body: JSON.stringify(datos) });
    const faseActual = MUNDIAL_DATA.config.faseActiva;

    localStorage.setItem(
      `mundial2026_done_${faseActual}`,
      JSON.stringify(localData),
    );
    localStorage.setItem(
      `mundial2026_comprobante_${faseActual}`,
      JSON.stringify(localData),
    );

    showSuccessModal(nombre, localData);
  } catch (e) {
    console.error(e);
    showToast("❌ Error al enviar. Intenta de nuevo.", "error");
    btn.disabled = false;
    btn.textContent = "⚽ Enviar Pronóstico";
  }
}

// ── SUCCESS MODAL ──────────────────────────────
function showSuccessModal(nombre, data) {
  document.getElementById("modal-nombre").textContent = nombre;
  document.getElementById("success-modal").classList.add("show");
  // Store data for download
  window._comprobanteData = data;
}

function closeModal() {
  document.getElementById("success-modal").classList.remove("show");
  checkAlreadySubmitted();
}

// ── DESCARGAR COMPROBANTE ──────────────────────
function descargarComprobante(faseKey) {
  const claveStorage = faseKey || MUNDIAL_DATA.config.faseActiva;

  let data = window._comprobanteData;
  if (!data) {
    try {
      data = JSON.parse(
        localStorage.getItem(`mundial2026_comprobante_${claveStorage}`),
      );
    } catch (e) {}
  }
  if (!data) {
    showToast("⚠ No enviaste un pronóstico desde este dispositivo", "error");
    return;
  }

  const faseData = MUNDIAL_DATA.fases[data.fase];
  const ts = new Date(data.timestamp).toLocaleString("es-EC", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const canvas = document.createElement("canvas");
  const W = 800,
    HEADER = 320,
    ROW = 52, // Incrementado para dar espacio a la segunda línea de datos del marcador
    PADDING = 40;
  const partidos = faseData?.partidos || [];
  canvas.width = W;
  canvas.height = HEADER + partidos.length * ROW + 160;

  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#0A0A0F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gold top bar
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, "#9A7D1A");
  grad.addColorStop(0.5, "#D4AF37");
  grad.addColorStop(1, "#9A7D1A");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 6);

  // Title
  ctx.fillStyle = "#D4AF37";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.fillText("POLLA MUNDIALISTA · COMPROBANTE", W / 2, 55);

  ctx.fillStyle = "#888899";
  ctx.font = "16px Arial";
  ctx.fillText(data.faseLabel || data.fase, W / 2, 82);

  // Participant
  ctx.fillStyle = "#F5F0E8";
  ctx.font = "bold 20px Arial";
  ctx.fillText(`${data.nombre} ${data.apellido}`, W / 2, 115);
  ctx.fillStyle = "#888899";
  ctx.font = "14px Arial";
  ctx.fillText(data.correo, W / 2, 138);
  ctx.fillText(ts, W / 2, 160);
  ctx.fillStyle = "#D4AF37";
  ctx.font = "bold 15px Arial";

  let yPos = 185;

  if (data.campeon) {
    ctx.fillText(`🏆 Campeón: ${data.campeon}`, W / 2, yPos);
    yPos += 24;
  }
  if (data.subcampeon) {
    ctx.fillText(`🥈 Subcampeon: ${data.subcampeon}`, W / 2, yPos);
    yPos += 24;
  }
  if (data.tercero) {
    ctx.fillText(`🥉 Tercer Lugar: ${data.tercero}`, W / 2, yPos);
    yPos += 24;
  }
  if (data.balonoro) {
    ctx.fillText(`⭐ Balón de Oro: ${data.balonoro}`, W / 2, yPos);
    yPos += 24;
  }
  if (data.ecuador) {
    ctx.fillText(`🇪🇨 Ecuador: ${data.ecuador}`, W / 2, yPos);
  }

  // Divider
  ctx.strokeStyle = "rgba(212,175,55,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PADDING, HEADER - 10);
  ctx.lineTo(W - PADDING, HEADER - 10);
  ctx.stroke();

  // Match rows
  partidos.forEach((p, i) => {
    const y = HEADER + i * ROW + 22;
    const pred = data.predicciones[p.id];

    let resultado = "—";
    let marcadorTexto = "";
    let emoji = "❌";
    let esEmpate = false;

    if (pred && typeof pred === "object") {
      const ganadorTexto = pred.ganador === "local" ? p.local : p.visitante;
      const penalesTexto =
        pred.penales === "Si" ? " (Penales)" : " (Tiempo Regular)";
      resultado = `Ganador: ${ganadorTexto}${penalesTexto}`;
      marcadorTexto = pred.marcador ? `Marcador Exacto: ${pred.marcador}` : "";
      emoji = "🏆";
    } else if (pred && typeof pred === "string") {
      resultado =
        pred === "local"
          ? p.local
          : pred === "visitante"
            ? p.visitante
            : "Empate";
      emoji = pred === "empate" ? "🤝" : "✅";
      esEmpate = pred === "empate";
    }

    // Row bg (Diseño mejorado con bordes limpios en lugar de bloques toscos)
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent";
    ctx.fillRect(PADDING - 10, y - 18, W - PADDING * 2 + 20, ROW);

    // Separador sutil inferior por fila
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.beginPath();
    ctx.moveTo(PADDING - 10, y - 18 + ROW);
    ctx.lineTo(W - PADDING + 10, y - 18 + ROW);
    ctx.stroke();

    // Izquierda: Meta-información del partido
    ctx.textAlign = "left";
    ctx.fillStyle = "#888899";
    ctx.font = "11px Arial";
    ctx.fillText(p.grupo ? `Grupo ${p.grupo}` : "Eliminatoria", PADDING, y - 4);

    // Izquierda: Equipos en contienda
    ctx.fillStyle = "#F5F0E8";
    ctx.font = "bold 14px Arial";
    ctx.fillText(`${p.local} vs ${p.visitante}`, PADDING, y + 14);

    // Derecha: Predicción de Ganador / Clasificado
    ctx.textAlign = "right";
    ctx.fillStyle = esEmpate ? "#D4AF37" : pred ? "#00C853" : "#C8102E";
    ctx.font = "bold 14px Arial";
    ctx.fillText(`${emoji} ${resultado}`, W - PADDING, y + 14);

    // Derecha Inferior: Renderizado del Marcador Exacto (Si existe la variable)
    if (marcadorTexto) {
      ctx.fillStyle = "#D4AF37";
      ctx.font = "12px Arial";
      ctx.fillText(marcadorTexto, W - PADDING, y + 30);
    }
  });

  // Bottom bar
  ctx.fillStyle = "rgba(212,175,55,0.15)";
  ctx.fillRect(0, canvas.height - 50, W, 50);
  ctx.fillStyle = "#888899";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Pronósticos Mundial 2026 · MX · USA · CAN",
    W / 2,
    canvas.height - 22,
  );

  // Download
  const link = document.createElement("a");
  link.download =
    `pronostico_mundial2026_${data.nombre}_${data.apellido}.png`.replace(
      /\s+/g,
      "_",
    );
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ── TOAST ──────────────────────────────────────
function showToast(msg, type = "") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
}

// ── SCROLL ANIMATIONS ──────────────────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
}

// ── UTILS ──────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function cerrarNotif() {
  const b = document.getElementById("notif-banner");
  if (b) b.style.display = "none";
  sessionStorage.setItem("notif_cerrada_cuartos", "true");
}

// ── ANIMACIÓN CONTROLADA DEL POZO ACUMULADO ────────────────────
function iniciarAnimacionPozo() {
  const target = 500.1;
  const duration = 3000; // Milisegundos de la subida inicial
  const start = 0;
  const startTime = performance.now();
  const el = document.getElementById("pozo-valor");

  if (!el) return;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing de desaceleración para realismo
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = start + (target - start) * easeProgress;

    if (progress < 1) {
      el.textContent = currentVal.toFixed(2);
      requestAnimationFrame(update);
    } else {
      // Fase de bucle infinito controlado sobre las centésimas una vez llega a 100.00
      setInterval(() => {
        // Genera fluctuación simulada en las últimas décimas [99.95 - 100.05]
        const variacion = Math.random() * 0.09 - 0.09;
        const pozoFlutuante = target + variacion;
        el.textContent = pozoFlutuante.toFixed(2);
      }, 150); // Velocidad del parpadeo numérico
    }
  }

  requestAnimationFrame(update);
}

// Inicializar al cargar el DOM
document.addEventListener("DOMContentLoaded", iniciarAnimacionPozo);

// ── CONTROL DEL MODAL DE INSTRUCCIONES ──────────────────────────
function openInstructionsModal() {
  const modal = document.getElementById("instructions-modal");
  if (modal) {
    modal.style.setProperty("display", "flex", "important");
    document.body.style.overflow = "hidden";
  }
}

function closeInstructionsModal() {
  const modal = document.getElementById("instructions-modal");
  if (modal) {
    modal.style.setProperty("display", "none", "important");
    document.body.style.overflow = "";
  }
}

// ── RANKING POPUP ──────────────────────────────
async function showRankingPopup() {
  const urlAppsScript =
    "https://script.google.com/macros/s/AKfycbw2A0MVxVfmsdp35HyqhN4FeMup0jWPLaJXFaizi5FGaiR_vbJjQ4EDRm48rMTd3mmLWw/exec";

  try {
    const response = await fetch(urlAppsScript);
    const apiData = await response.json();
    const data = apiData.ranking;

    if (!data || data.length === 0) return;

    const sorted = [...data]
      .sort((a, b) => b.total_pts - a.total_pts)
      .slice(0, 5);

    document.getElementById("ranking-popup-body").innerHTML = sorted
      .map((p, i) => {
        const pos = i + 1;
        const medal =
          pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : pos;
        const posClass = pos <= 3 ? `top${pos}` : "";
        const primerNombre = (p.nombre || "").trim().split(/\s+/)[0];
        const primerApellido = (p.apellido || "").trim().split(/\s+/)[0];

        return `
        <tr class="ranking-row">
          <td style="text-align:center;">
            <span class="rank-pos ${posClass}">${medal}</span>
          </td>

          <td>
            <span class="rank-name">${escapeHtml(primerNombre)} ${escapeHtml(primerApellido)}</span>
          </td>

          <td style="text-align:center;">
            <span class="rank-aciertos">${p.aciertos || 0}</span>
            <span style="color:var(--gray);font-size:0.8rem"> </span>
          </td>

          <td style="font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:600;color:var(--white);text-align:center;">
            ${p.total_pts}
            <span style="font-size:0.8rem;color:var(--gold);font-weight:400">PTS</span>
          </td>
        </tr>`;
      })
      .join("");

    document.getElementById("ranking-popup").classList.add("show");
    lanzarAnimacion();
  } catch (e) {
    console.error("Error cargando popup ranking:", e);
  }
}

function closeRankingPopup() {
  document.getElementById("ranking-popup").classList.remove("show");
  detenerAnimacion();
}

// ── ANIMACIONES POPUP ──────────────────────────
let animacionActiva = null;
let animFrames = [];

function lanzarAnimacion() {
  // Cambia aquí: "confetti" | "fuegos" | "estrellas" | "epico"
  const tipo = "confetti";

  if (tipo === "confetti") animConfetti();
  else if (tipo === "fuegos") animFuegos();
  else if (tipo === "estrellas") animEstrellas();
  else if (tipo === "epico") animEpico();
}

function detenerAnimacion() {
  animFrames.forEach((id) => cancelAnimationFrame(id));
  animFrames = [];
  document.querySelectorAll(".anim-canvas").forEach((c) => c.remove());
  document.querySelectorAll(".anim-particle").forEach((p) => p.remove());
}

function crearCanvas() {
  const c = document.createElement("canvas");
  c.className = "anim-canvas";
  c.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:1600;width:100%;height:100%";
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  document.body.appendChild(c);
  return c;
}

// 1. CONFETTI
function animConfetti() {
  const canvas = crearCanvas();
  const ctx = canvas.getContext("2d");
  const piezas = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: Math.random() * 12 + 6,
    h: Math.random() * 6 + 4,
    color: [
      "#D4AF37",
      "#F0D060",
      "#FF6B6B",
      "#00C853",
      "#4FC3F7",
      "#CE93D8",
      "#FF8A65",
    ][Math.floor(Math.random() * 7)],
    rot: Math.random() * 360,
    vel: Math.random() * 3 + 2,
    swing: Math.random() * 3 - 1.5,
    rotVel: Math.random() * 6 - 3,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piezas.forEach((p) => {
      p.y += p.vel;
      p.x += p.swing;
      p.rot += p.rotVel;
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    animFrames.push(requestAnimationFrame(draw));
  }
  draw();
}

// ── PARTIDOS DE HOY ────────────────────────────
function renderPartidosHoy() {
  const container = document.getElementById("partidos-hoy-container");
  if (!container) return;

  // Fecha de hoy en formato "13 de junio"
  const hoy = new Date();
  const fechaHoy = hoy.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
  document.getElementById("hoy-fecha-label").textContent =
    hoy.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Recopilar todos los partidos de todas las fases
  const todosLosPartidos = [];
  Object.values(MUNDIAL_DATA.fases).forEach((fase) => {
    if (fase.partidos) fase.partidos.forEach((p) => todosLosPartidos.push(p));
  });

  const partidosHoy = todosLosPartidos.filter((p) => p.fecha === fechaHoy);

  if (partidosHoy.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:2rem;color:var(--gray);font-family:'Barlow Condensed',sans-serif;font-size:1rem;letter-spacing:0.1em">
        ⚽ No hay partidos programados para hoy
      </div>`;
    return;
  }

  container.innerHTML = partidosHoy
    .map((p) => {
      const esEcuador = p.local === "Ecuador" || p.visitante === "Ecuador";
      const contenido = `
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:700;color:var(--white);display:flex;align-items:center;gap:8px;">
          <img src="https://flagcdn.com/24x18/${CODIGOS[p.local] || "un"}.png" style="width:24px;height:18px;border-radius:2px">
          ${escapeHtml(p.local)}
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;padding:0 1rem;">
          <span style="font-family:'Bebas Neue',sans-serif;font-size:1rem;color:var(--gray);letter-spacing:0.1em">VS</span>
          <span style="font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;color:var(--gold);letter-spacing:0.05em">${p.hora} ECT</span>
          ${p.grupo ? `<span style="font-family:'Barlow Condensed',sans-serif;font-size:0.65rem;color:var(--gray)">Grupo ${p.grupo}</span>` : ""}
        </div>
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:1rem;font-weight:700;color:var(--white);text-align:right;display:flex;align-items:center;justify-content:flex-end;gap:8px;">
          ${escapeHtml(p.visitante)}
          <img src="https://flagcdn.com/24x18/${CODIGOS[p.visitante] || "un"}.png" style="width:24px;height:18px;border-radius:2px">
        </div>`;

      return esEcuador
        ? `
        <div class="partido-ecuador">
          <div class="electric-border"></div>
          <div class="electric-glow-1"></div>
          <div class="electric-glow-2"></div>
          <div class="electric-bg"></div>
          <div class="card-inner">${contenido}</div>
        </div>`
        : `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:1rem 1.25rem;border:1px solid rgba(212,175,55,0.12);margin-bottom:0.5rem;background:rgba(212,175,55,0.03);">
          ${contenido}
        </div>`;
    })
    .join("");
}

const API_URL =
  "https://script.google.com/macros/s/AKfycbw2A0MVxVfmsdp35HyqhN4FeMup0jWPLaJXFaizi5FGaiR_vbJjQ4EDRm48rMTd3mmLWw/exec";

async function consultarDashboard() {
  const correoInput = document.getElementById("inputCorreo").value.trim();
  if (!correoInput) {
    alert("Por favor, ingresa un correo electrónico.");
    return;
  }

  document.getElementById("loading").style.display = "block";
  if (document.getElementById("dashboard-personal-container")) {
    document.getElementById("dashboard-personal-container").style.display =
      "none";
  }

  try {
    const response = await fetch(
      `${API_URL}?correo=${encodeURIComponent(correoInput)}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Respuesta de red no válida");
    }

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      document.getElementById("loading").style.display = "none";
      return;
    }

    renderizarResumen(data.participante);
    renderizarEliminatorias(data.fases);
  } catch (error) {
    console.error("Error al consultar el dashboard:", error);
    alert(
      'Ocurrió un error al obtener los datos. Asegúrate de que el script de Apps Script tenga habilitado el acceso para "Cualquiera" (Anyone).',
    );
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}

async function ejecutarFetchAlterno(correo) {
  try {
    const response = await fetch(
      `${API_URL}?correo=${encodeURIComponent(correo)}`,
      {
        method: "GET",
        mode: "cors",
        redirect: "follow",
      },
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    renderizarResumen(data.participante);
    renderizarEliminatorias(data.fases);
  } catch (e) {
    alert("Error de conexión con el servidor de Google.");
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}

function renderizarResumen(p) {
  window.currentDashboardData = p;
}

async function cargarParticipantes() {
  try {
    console.log("Iniciando carga de participantes...");

    // Usamos la misma URL que usas en renderRanking
    const urlAppsScript =
      "https://script.google.com/macros/s/AKfycbw2A0MVxVfmsdp35HyqhN4FeMup0jWPLaJXFaizi5FGaiR_vbJjQ4EDRm48rMTd3mmLWw/exec";

    const response = await fetch(urlAppsScript);
    const apiData = await response.json();
    const data = apiData.ranking; // Extraemos el array de la propiedad 'ranking'

    console.log("Datos recibidos:", data);

    if (!data || data.length === 0) {
      console.warn("La respuesta de Google Sheets está vacía.");
      return;
    }

    // Guardar globalmente para usarlo en otras funciones
    rankingData = data;

    const select = document.getElementById("selector-participantes");
    select.innerHTML = ""; // Limpiar antes de llenar

    data.forEach((p) => {
      let opt = document.createElement("option");
      opt.value = p.correo;
      opt.textContent = `${p.nombre} ${p.apellido}`;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error("Error al cargar participantes:", err);
  }
}

function evaluarEstado(pronostico, valorReal) {
  if (valorReal === undefined || valorReal === "")
    return { estado: "pendiente", icono: "⏳", clase: "bg-gray" };
  return pronostico === valorReal
    ? { estado: "acierto", icono: "✅", clase: "bg-green" }
    : { estado: "error", icono: "❌", clase: "bg-red" };
}

function renderizarDashboard(p) {
  // ── Mapa de IDs a partidos legibles ──
  const MAPA_PARTIDOS = {
    // Grupos J1
    a_j1_1: "México vs Sudáfrica",
    a_j1_2: "Corea del Sur vs Rep. Checa",
    b_j1_1: "Canadá vs Bosnia y Herz.",
    b_j1_2: "Qatar vs Suiza",
    c_j1_1: "Brasil vs Marruecos",
    c_j1_2: "Haití vs Escocia",
    d_j1_1: "Estados Unidos vs Paraguay",
    d_j1_2: "Australia vs Turquía",
    e_j1_1: "Alemania vs Curazao",
    e_j1_2: "Costa de Marfil vs Ecuador",
    f_j1_1: "Países Bajos vs Japón",
    f_j1_2: "Suecia vs Túnez",
    g_j1_1: "Bélgica vs Egipto",
    g_j1_2: "Irán vs Nueva Zelanda",
    h_j1_1: "España vs Cabo Verde",
    h_j1_2: "Arabia Saudita vs Uruguay",
    i_j1_1: "Francia vs Senegal",
    i_j1_2: "Irak vs Noruega",
    j_j1_1: "Argentina vs Argelia",
    j_j1_2: "Austria vs Jordania",
    k_j1_1: "Portugal vs Rep. D. Congo",
    k_j1_2: "Uzbekistán vs Colombia",
    l_j1_1: "Inglaterra vs Croacia",
    l_j1_2: "Ghana vs Panamá",
    // Grupos J2
    a_j2_1: "Rep. Checa vs Sudáfrica",
    a_j2_2: "México vs Corea del Sur",
    b_j2_1: "Suiza vs Bosnia y Herz.",
    b_j2_2: "Canadá vs Qatar",
    c_j2_1: "Escocia vs Marruecos",
    c_j2_2: "Brasil vs Haití",
    d_j2_1: "Estados Unidos vs Australia",
    d_j2_2: "Turquía vs Paraguay",
    e_j2_1: "Alemania vs Costa de Marfil",
    e_j2_2: "Ecuador vs Curazao",
    f_j2_1: "Países Bajos vs Suecia",
    f_j2_2: "Túnez vs Japón",
    g_j2_1: "Bélgica vs Irán",
    g_j2_2: "Nueva Zelanda vs Egipto",
    h_j2_1: "España vs Arabia Saudita",
    h_j2_2: "Uruguay vs Cabo Verde",
    i_j2_1: "Francia vs Irak",
    i_j2_2: "Noruega vs Senegal",
    j_j2_1: "Argentina vs Austria",
    j_j2_2: "Jordania vs Argelia",
    k_j2_1: "Portugal vs Uzbekistán",
    k_j2_2: "Colombia vs Rep. D. Congo",
    l_j2_1: "Inglaterra vs Ghana",
    l_j2_2: "Panamá vs Croacia",
    // Grupos J3
    a_j3_1: "Sudáfrica vs Corea del Sur",
    a_j3_2: "Rep. Checa vs México",
    b_j3_1: "Bosnia y Herz. vs Qatar",
    b_j3_2: "Suiza vs Canadá",
    c_j3_1: "Escocia vs Brasil",
    c_j3_2: "Marruecos vs Haití",
    d_j3_1: "Turquía vs Estados Unidos",
    d_j3_2: "Paraguay vs Australia",
    e_j3_1: "Ecuador vs Alemania",
    e_j3_2: "Curazao vs Costa de Marfil",
    f_j3_1: "Japón vs Suecia",
    f_j3_2: "Túnez vs Países Bajos",
    g_j3_1: "Nueva Zelanda vs Bélgica",
    g_j3_2: "Egipto vs Irán",
    h_j3_1: "Uruguay vs España",
    h_j3_2: "Cabo Verde vs Arabia Saudita",
    i_j3_1: "Senegal vs Irak",
    i_j3_2: "Noruega vs Francia",
    j_j3_1: "Jordania vs Argentina",
    j_j3_2: "Argelia vs Austria",
    k_j3_1: "Colombia vs Portugal",
    k_j3_2: "Rep. D. Congo vs Uzbekistán",
    l_j3_1: "Croacia vs Ghana",
    l_j3_2: "Panamá vs Inglaterra",
    // 16avos
    d01: "Sudáfrica vs Canadá",
    d02: "Brasil vs Japón",
    d03: "Alemania vs Paraguay",
    d04: "Países Bajos vs Marruecos",
    d05: "Costa de Marfil vs Noruega",
    d06: "Francia vs Suecia",
    d07: "México vs Ecuador",
    d08: "Inglaterra vs Rep. D. Congo",
    d09: "Bélgica vs Senegal",
    d10: "Estados Unidos vs Bosnia y Herz.",
    d11: "España vs Austria",
    d12: "Portugal vs Croacia",
    d13: "Suiza vs Argelia",
    d14: "Australia vs Egipto",
    d15: "Argentina vs Cabo Verde",
    d16: "Colombia vs Ghana",
    // Octavos
    o01: "Canadá vs Marruecos",
    o02: "Paraguay vs Francia",
    o03: "Brasil vs Noruega",
    o04: "México vs Inglaterra",
    o05: "Portugal vs España",
    o06: "Estados Unidos vs Bélgica",
    o07: "Argentina vs Egipto",
    o08: "Colombia vs Suiza",
    // Cuartos
    c01: "Francia vs Marruecos",
    c02: "España vs Bélgica",
    c03: "Noruega vs Inglaterra",
    c04: "Argentina vs Suiza",
    // Semis
    s01: "Por definir",
    s02: "Por definir",
    // Final
    f01: "Final",
    f02: "Tercer lugar",
  };

  const CODIGOS_BANDERAS = {
    México: "mx",
    Sudáfrica: "za",
    "Corea del Sur": "kr",
    "Rep. Checa": "cz",
    Canadá: "ca",
    "Bosnia y Herz.": "ba",
    Qatar: "qa",
    Suiza: "ch",
    Brasil: "br",
    Marruecos: "ma",
    Haití: "ht",
    Escocia: "gb-sct",
    "Estados Unidos": "us",
    Paraguay: "py",
    Australia: "au",
    Turquía: "tr",
    Alemania: "de",
    Curazao: "cw",
    "Costa de Marfil": "ci",
    Ecuador: "ec",
    "Países Bajos": "nl",
    Japón: "jp",
    Suecia: "se",
    Túnez: "tn",
    Bélgica: "be",
    Egipto: "eg",
    Irán: "ir",
    "Nueva Zelanda": "nz",
    España: "es",
    Uruguay: "uy",
    "Arabia Saudita": "sa",
    "Cabo Verde": "cv",
    Francia: "fr",
    Senegal: "sn",
    Noruega: "no",
    Irak: "iq",
    Argentina: "ar",
    Argelia: "dz",
    Austria: "at",
    Jordania: "jo",
    Portugal: "pt",
    Colombia: "co",
    Uzbekistán: "uz",
    "Rep. D. Congo": "cd",
    Inglaterra: "gb-eng",
    Croacia: "hr",
    Panamá: "pa",
    Ghana: "gh",
  };

  function bandera(equipo) {
    const code = CODIGOS_BANDERAS[equipo];
    if (!code) return "";
    return `<img src="https://flagcdn.com/20x15/${code}.png" style="width:20px;height:15px;vertical-align:middle;border-radius:2px;margin-right:4px">`;
  }

  // Leer resultados reales desde MUNDIAL_DATA si existen
  const reales = MUNDIAL_DATA.resultados || {};

  function valorLegible(val) {
    if (!val || val === "-") return "—";
    if (val === "local") return "Local";
    if (val === "visitante") return "Visitante";
    if (val === "empate") return "🤝 Empate";
    return val;
  }

  function tarjetaPartido(id, pronostico, esElim, tienePenales, tieneM) {
    const nombre = MAPA_PARTIDOS[id] || id;
    const [local, visitante] = nombre.split(" vs ");
    const ganKey = esElim ? `${id}_G` : id;
    const penKey = `${id}_P`;
    const mKey = `${id}_M`;

    const datos = esElim ? p[obtenerFasePorId(id)] : p.grupos;
    if (!datos) return "";

    const pronGan = datos[ganKey] || datos[id] || "";
    const pronPen = datos[penKey] || "";
    const pronM = datos[mKey] || "";

    const acierto = esAcierto(ganKey, pronGan) ?? esAcierto(id, pronGan);

    let ganadorTexto = "—";
    if (pronGan === "local") ganadorTexto = `${bandera(local)}${local}`;
    else if (pronGan === "visitante")
      ganadorTexto = `${bandera(visitante)}${visitante}`;
    else if (pronGan === "empate") ganadorTexto = "🤝 Empate";
    else if (pronGan) ganadorTexto = pronGan;

    const colorBorde =
      acierto === true
        ? "#00C853"
        : acierto === false
          ? "#C8102E"
          : "rgba(255,255,255,0.08)";
    const colorFondo =
      acierto === true
        ? "rgba(0,200,83,0.07)"
        : acierto === false
          ? "rgba(200,16,46,0.07)"
          : "rgba(255,255,255,0.02)";
    const icono = acierto === true ? "✅" : acierto === false ? "❌" : "⏳";

    return `
      <div style="border:1px solid ${colorBorde}; background:${colorFondo}; border-radius:6px; padding:0.6rem 0.75rem; font-family:'Barlow Condensed',sans-serif;">
        <div style="font-size:0.7rem; color:#888; letter-spacing:0.08em; margin-bottom:0.25rem;">${escapeHtml(nombre)}</div>
        <div style="display:flex; align-items:center; gap:6px; font-size:0.95rem; color:#F5F0E8; font-weight:600;">
          <span>${icono}</span>
          <span>${ganadorTexto}</span>
        </div>
        ${pronPen ? `<div style="font-size:0.75rem; color:#888; margin-top:0.2rem;">Penales: <span style="color:#D4AF37">${escapeHtml(pronPen)}</span></div>` : ""}
        ${pronM ? `<div style="font-size:0.75rem; color:#888; margin-top:0.2rem;">Marcador: <span style="color:#D4AF37">${escapeHtml(pronM)}</span></div>` : ""}
      </div>`;
  }

  function obtenerFasePorId(id) {
    if (id.startsWith("d")) return "dieciseisavos";
    if (id.startsWith("o")) return "octavos";
    if (id.startsWith("c")) return "cuartos";
    if (id.startsWith("s")) return "semifinal";
    if (id.startsWith("f")) return "final";
    return "grupos";
  }

  function seccionFase(titulo, ids, esElim) {
    const tarjetas = ids.map((id) => tarjetaPartido(id, null, esElim)).join("");
    if (!tarjetas.trim()) return "";
    return `
      <div style="margin-bottom:1.5rem;">
        <div style="font-family:'Bebas Neue',sans-serif; font-size:1.1rem; color:#D4AF37; letter-spacing:0.1em; margin-bottom:0.6rem; padding-bottom:0.4rem; border-bottom:1px solid rgba(212,175,55,0.2);">
          ${titulo}
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:0.5rem;">
          ${tarjetas}
        </div>
      </div>`;
  }

  const nombre = `${p.grupos?.nombre || ""} ${p.grupos?.apellido || ""}`.trim();

  const especiales = `
    <div style="background:rgba(212,175,55,0.06); border:1px solid rgba(212,175,55,0.2); border-radius:6px; padding:1rem; margin-bottom:1.5rem; display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-family:'Barlow Condensed',sans-serif; font-size:0.9rem; color:#F5F0E8;">
      <span>🏆 Campeón: <strong style="color:#D4AF37">${escapeHtml(p.grupos?.campeon || "—")}</strong></span>
      <span>🥈 Subcampeón: <strong style="color:#D4AF37">${escapeHtml(p.grupos?.subcampeon || "—")}</strong></span>
      <span>🥉 Tercer lugar: <strong style="color:#D4AF37">${escapeHtml(p.grupos?.tercero || "—")}</strong></span>
      <span>⭐ Balón de Oro: <strong style="color:#D4AF37">${escapeHtml(p.grupos?.balonoro || "—")}</strong></span>
      <span style="grid-column:1/-1">🇪🇨 Ecuador llegará a: <strong style="color:#D4AF37">${escapeHtml(p.grupos?.ecuador || "—")}</strong></span>
    </div>`;

  const j1ids = [
    "a_j1_1",
    "a_j1_2",
    "b_j1_1",
    "b_j1_2",
    "c_j1_1",
    "c_j1_2",
    "d_j1_1",
    "d_j1_2",
    "e_j1_1",
    "e_j1_2",
    "f_j1_1",
    "f_j1_2",
    "g_j1_1",
    "g_j1_2",
    "h_j1_1",
    "h_j1_2",
    "i_j1_1",
    "i_j1_2",
    "j_j1_1",
    "j_j1_2",
    "k_j1_1",
    "k_j1_2",
    "l_j1_1",
    "l_j1_2",
  ];
  const j2ids = [
    "a_j2_1",
    "a_j2_2",
    "b_j2_1",
    "b_j2_2",
    "c_j2_1",
    "c_j2_2",
    "d_j2_1",
    "d_j2_2",
    "e_j2_1",
    "e_j2_2",
    "f_j2_1",
    "f_j2_2",
    "g_j2_1",
    "g_j2_2",
    "h_j2_1",
    "h_j2_2",
    "i_j2_1",
    "i_j2_2",
    "j_j2_1",
    "j_j2_2",
    "k_j2_1",
    "k_j2_2",
    "l_j2_1",
    "l_j2_2",
  ];
  const j3ids = [
    "a_j3_1",
    "a_j3_2",
    "b_j3_1",
    "b_j3_2",
    "c_j3_1",
    "c_j3_2",
    "d_j3_1",
    "d_j3_2",
    "e_j3_1",
    "e_j3_2",
    "f_j3_1",
    "f_j3_2",
    "g_j3_1",
    "g_j3_2",
    "h_j3_1",
    "h_j3_2",
    "i_j3_1",
    "i_j3_2",
    "j_j3_1",
    "j_j3_2",
    "k_j3_1",
    "k_j3_2",
    "l_j3_1",
    "l_j3_2",
  ];
  const d16ids = [
    "d01",
    "d02",
    "d03",
    "d04",
    "d05",
    "d06",
    "d07",
    "d08",
    "d09",
    "d10",
    "d11",
    "d12",
    "d13",
    "d14",
    "d15",
    "d16",
  ];
  const o8ids = ["o01", "o02", "o03", "o04", "o05", "o06", "o07", "o08"];
  const c4ids = ["c01", "c02", "c03", "c04"];
  const s2ids = ["s01", "s02"];
  const fids = ["f01", "f02"];

  const { totalAciertos, totalPuntos } = calcularTotales(p);

  const contenido = `
    <di style="background:#0A0A0F; min-height:100vh; padding:1.5rem; color:#F5F0E8;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <div style="font-family:'Bebas Neue',sans-serif; font-size:2rem; color:#D4AF37; letter-spacing:0.1em;">${escapeHtml(nombre)}</div>
          <div style="font-family:'Barlow Condensed',sans-serif; font-size:0.8rem; color:#888; letter-spacing:0.1em;">PRONÓSTICOS MUNDIALISTAS 2026</div>
        </div>
        <button onclick="closeModal()" style="background:transparent; border:1px solid rgba(212,175,55,0.3); color:#D4AF37; padding:0.5rem 1rem; cursor:pointer;">✕ CERRAR</button>
      </div>

      ${especiales}

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:10px; margin-bottom:1.5rem;">
        ${generarTarjetaStat("Aciertos Totales", totalAciertos, "✅")}
        ${generarTarjetaStat("Puntaje Total sin especiales", totalPuntos, "🏆")}
      </div>

      ${seccionFase("JORNADA 1", j1ids, false)}

      

      ${seccionFase("JORNADA 2", j2ids, false)}
      ${seccionFase("JORNADA 3", j3ids, false)}
      ${p.dieciseisavos ? seccionFase("DIECISEISAVOS", d16ids, true) : ""}
      ${p.octavos ? seccionFase("OCTAVOS", o8ids, true) : ""}
      ${p.cuartos ? seccionFase("CUARTOS", c4ids, true) : ""}
      ${p.semifinal ? seccionFase("SEMIFINALES", s2ids, true) : ""}
      ${p.final ? seccionFase("FINAL", fids, true) : ""}

      <div style="text-align:center; margin-top:2rem; font-family:'Barlow Condensed',sans-serif; font-size:0.7rem; color:#444; letter-spacing:0.15em;">
        ✅ ACIERTO &nbsp;·&nbsp; ❌ FALLO &nbsp;·&nbsp; ⏳ PENDIENTE
      </div>
    </div>`;

  const modal = document.getElementById("success-modal");
  const box = modal?.querySelector(".modal-box");
  if (box) {
    box.style.cssText =
      "max-width:95vw; width:95vw; max-height:90vh; overflow-y:auto; padding:0; background:#0A0A0F; border:1px solid rgba(212,175,55,0.25);";
    box.innerHTML = contenido;
    modal.classList.add("show");
  }
}

async function consultarDashboard(correo) {
  const URL =
    "https://script.google.com/macros/s/AKfycbw2A0MVxVfmsdp35HyqhN4FeMup0jWPLaJXFaizi5FGaiR_vbJjQ4EDRm48rMTd3mmLWw/exec";

  try {
    const response = await fetch(
      `${URL}?accion=obtenerDetalle&correo=${encodeURIComponent(correo)}`,
    );
    const data = await response.json();

    if (data && data.participante) {
      // 1. Guardar resultados reales globalmente para que esAcierto los use
      window.MUNDIAL_REALES = data.resultados || {};

      // 2. Renderizar usando los pronósticos
      renderizarDashboard(data.participante.pronosticos);
    }
  } catch (err) {
    console.error("Error crítico:", err);
  }
}

async function iniciarDashboard() {
  const select = document.getElementById("selector-participantes");
  const correo = select
    ? select.value
    : document.getElementById("inputCorreo")?.value;

  if (!correo) {
    alert("Correo no encontrado");
    return;
  }

  try {
    // Definición correcta de la variable response
    const response = await fetch(
      `${API_URL}?accion=obtenerDetalle&correo=${encodeURIComponent(correo)}`,
    );

    if (!response.ok) throw new Error("Error en la conexión");

    const data = await response.json();

    if (data && data.participante) {
      window.RESULTADOS_REALES = data.resultados || {};
      renderizarDashboard(data.participante.pronosticos);
    }
  } catch (err) {
    console.error("Error en iniciarDashboard:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarParticipantes();
});

// 1. VARIABLE GLOBAL ÚNICA
window.RESULTADOS_REALES = {};

function esAcierto(id, pronPrincipal) {
  const reales = window.RESULTADOS_REALES || {};

  // 1. Intentamos obtener el resultado real buscando tanto con sufijo como sin él
  // Si id es "d01_G", busca "d01_G" y luego "d01"
  const rawReal = reales[id] || reales[id.replace("_G", "")];

  // 2. Si no hay dato real, es PENDIENTE
  // Importante: verificamos que 'ganador' exista dentro del objeto real
  if (!rawReal || typeof rawReal !== "object" || !rawReal.ganador) {
    return null; // Esto disparará el icono ⏳ (Pendiente)
  }

  const realGanador = rawReal.ganador.toLowerCase().trim();
  const pron = String(pronPrincipal).toLowerCase().trim();

  // 3. Comparación
  return pron === realGanador;
}

function calcularTotales(p) {
  const fases = [
    "grupos",
    "dieciseisavos",
    "octavos",
    "cuartos",
    "semifinal",
    "final",
  ];
  let totalAciertos = 0;
  let totalPuntos = 0;

  fases.forEach((fase) => {
    if (p[fase]) {
      Object.keys(p[fase]).forEach((k) => {
        if (k.startsWith("aciertos_")) totalAciertos += p[fase][k];
        if (k.startsWith("puntaje_")) totalPuntos += p[fase][k];
      });
    }
  });
  return { totalAciertos, totalPuntos };
}

function generarTarjetaStat(titulo, valor, icono) {
  return `
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(212,175,55,0.1); border-radius:6px; padding:0.8rem; text-align:center;">
      <div style="font-size:0.65rem; color:#888; text-transform:uppercase; letter-spacing:0.1em;">${titulo}</div>
      <div style="font-size:1.1rem; color:#F5F0E8; font-weight:bold; margin-top:0.3rem;">${icono} ${valor || 0}</div>
    </div>`;
}
