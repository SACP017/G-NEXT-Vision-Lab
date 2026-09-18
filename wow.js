/* G-NEXT Vision Lab: interactive presentation layer over the existing demo data. */
(() => {
  const data = typeof records !== 'undefined' ? records : [];
  const byStatus = status => data.filter(item => item.status === status);
  const html = (selector, position, content) => document.querySelector(selector)?.insertAdjacentHTML(position, content);
  const count = items => String(items.length).padStart(2, '0');

  html('.home-heading', 'afterend', `
    <section class="vision-hero" aria-label="Centro de decisiones">
      <div class="vision-hero-copy"><span class="vision-kicker"><i></i> CENTRO DE DECISIONES / WENDY LUNA</span>
        <h2>Haz que cada oportunidad <em>avance.</em></h2>
        <p>Una lectura visual del pipeline, los casos que necesitan atención y la siguiente mejor acción.</p>
        <div class="vision-hero-actions"><button type="button" class="vision-button" data-vision-nav="opportunities">Explorar oportunidades <span>↗</span></button><button type="button" class="vision-ghost" data-vision-nav="reports">Ver inteligencia <span>→</span></button></div>
      </div>
      <div class="vision-orbit" aria-hidden="true"><div class="orbit-rim orbit-rim-one"></div><div class="orbit-rim orbit-rim-two"></div><div class="orbit-core"><span>PIPELINE</span><strong>${data.length}</strong><small>oportunidades</small></div><i class="orbit-node n1"></i><i class="orbit-node n2"></i><i class="orbit-node n3"></i></div>
      <div class="vision-hero-footer"><span><i></i> Datos de demostración</span><span>VISIÓN 360° <b>✦</b></span></div>
    </section>`);

  html('.home-kpis', 'afterend', `
    <section class="vision-section">
      <div class="vision-section-head"><div><span class="vision-label">01 / EL RECORRIDO</span><h2>El pipeline, de un vistazo</h2><p>Selecciona una etapa para abrir los casos correspondientes.</p></div><span class="vision-mini-tag">EMBUDO INTERACTIVO ↗</span></div>
      <div class="vision-funnel" id="visionFunnel"></div>
    </section>`);

  const funnel = [
    {name:'Pendientes', key:'Pendiente', color:'amber', note:'Requieren un primer impulso'},
    {name:'En gestión', key:'En gestión', color:'violet', note:'Trabajo en movimiento'},
    {name:'En riesgo', key:'En riesgo', color:'coral', note:'Necesitan intervención'},
    {name:'Finalizados', key:'Finalizado', color:'mint', note:'Meta alcanzada'}
  ];
  const total = Math.max(1, data.length);
  document.getElementById('visionFunnel').innerHTML = funnel.map((stage, index) => {
    const value = byStatus(stage.key).length;
    return `<button class="funnel-stage ${stage.color}" type="button" data-stage="${stage.key}" style="--share:${Math.max(12, value / total * 100)}%"><span class="stage-index">0${index + 1} / 04</span><span class="stage-number">${count(byStatus(stage.key))}<small>${Math.round(value / total * 100)}%</small></span><strong>${stage.name}</strong><span class="stage-note">${stage.note}</span><span class="stage-meter"><i></i></span><span class="stage-arrow">↗</span></button>`;
  }).join('');

  const urgent = [...byStatus('En riesgo'), ...byStatus('Pendiente')].slice(0, 5);
  html('.opportunity-command', 'afterend', `
    <section class="vision-radar"><div class="vision-section-head"><div><span class="vision-label">02 / RADAR DE ACCIÓN</span><h2>Empieza donde más importa</h2><p>Casos en riesgo y pendientes según los datos de esta demostración.</p></div><span class="vision-mini-tag">${count(urgent)} EN FOCO</span></div>
    <div class="radar-list">${urgent.map((item, index) => `<button class="radar-item" type="button" data-open-op="${item.op}"><span class="radar-rank">0${index + 1}</span><span class="radar-item-main"><strong>${item.ref}</strong><small>Oportunidad #${item.op} · ${item.validator}</small></span><span class="radar-state ${item.status === 'En riesgo' ? 'risk' : ''}">${item.status}</span><span class="radar-arrow">↗</span></button>`).join('')}</div></section>`);

  html('.reports-heading', 'afterend', `
    <section class="scenario-lab"><div class="scenario-copy"><span class="vision-label">03 / LABORATORIO DE ESCENARIOS</span><h2>¿Qué pasa si recuperamos casos?</h2><p>Mueve el control para explorar un escenario hipotético. Esta visualización no es una predicción.</p><label for="scenarioRange">Casos en riesgo recuperados <strong id="scenarioValue">0</strong></label><input id="scenarioRange" type="range" min="0" max="${byStatus('En riesgo').length}" value="0" aria-label="Casos en riesgo recuperados"></div><div class="scenario-result"><span>ESCENARIO SIMULADO</span><strong id="scenarioRate">0%</strong><small>de casos finalizados o recuperados</small><div class="scenario-track"><i id="scenarioFill"></i></div><p id="scenarioNarrative"></p></div></section>`);

  html('.detail-heading', 'afterend', `<div class="detail-spotlight"><span>✦ NEXT BEST ACTION</span><strong id="spotlightTitle">Selecciona una oportunidad</strong><p id="spotlightText">Consulta el caso para descubrir el siguiente paso sugerido a partir de su estado actual.</p><small>Sugerencia demostrativa basada en reglas · Verifica antes de actuar</small></div>`);
  html('.user-hero', 'afterend', `<section class="profile-spotlight"><div><span class="vision-label">TU HUELLA EN G-NEXT</span><h2>Tu trabajo mueve el resultado.</h2><p>Cada caso finalizado representa un avance real del equipo.</p></div><div class="profile-spark" aria-hidden="true"><span style="height:38%"></span><span style="height:54%"></span><span style="height:48%"></span><span style="height:70%"></span><span style="height:82%"></span><span style="height:100%"></span></div><b>✦</b></section>`);

  document.querySelectorAll('[data-vision-nav]').forEach(button => button.addEventListener('click', () => { setPage(button.dataset.visionNav); window.scrollTo({top:0,behavior:'smooth'}); }));
  document.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => {
    setPage('opportunities');
    const term = button.dataset.stage;
    const search = document.getElementById('search2');
    if (search) { search.value = term; search.dispatchEvent(new Event('input', {bubbles:true})); }
    document.querySelector('.opportunity-table')?.scrollIntoView({behavior:'smooth',block:'start'});
  }));
  document.querySelectorAll('[data-open-op]').forEach(button => button.addEventListener('click', () => { openDetail(button.dataset.openOp); window.scrollTo({top:0,behavior:'smooth'}); }));
  const range = document.getElementById('scenarioRange');
  const updateScenario = () => {
    const recovered = Number(range.value);
    const completed = byStatus('Finalizado').length;
    const rate = Math.round((completed + recovered) / total * 100);
    document.getElementById('scenarioValue').textContent = recovered;
    document.getElementById('scenarioRate').textContent = `${rate}%`;
    document.getElementById('scenarioFill').style.width = `${rate}%`;
    document.getElementById('scenarioNarrative').textContent = recovered ? `Si ${recovered} caso${recovered === 1 ? '' : 's'} en riesgo avanza${recovered === 1 ? '' : 'n'} hasta cierre, el indicador ilustrativo subiría ${Math.round(recovered / total * 100)} puntos.` : 'Arrastra el control para construir una hipótesis de recuperación.';
  };
  range.addEventListener('input', updateScenario);
  updateScenario();

  const oldOpenDetail = openDetail;
  openDetail = function(op) {
    oldOpenDetail(op);
    const item = data.find(entry => entry.op === op);
    if (!item) return;
    const action = item.status === 'En riesgo' ? 'Intervenir el bloqueo hoy' : item.status === 'Pendiente' ? 'Destrabar la siguiente validación' : item.status === 'Finalizado' ? 'Documentar el cierre' : 'Acelerar el siguiente hito';
    document.getElementById('spotlightTitle').textContent = action;
    document.getElementById('spotlightText').textContent = item.status === 'Finalizado' ? `El caso ${item.ref} está finalizado. Revisa la documentación y registra el aprendizaje.` : `${item.ref}: ${item.block1}. Consulta el seguimiento y confirma la acción con el equipo.`;
  };
})();
