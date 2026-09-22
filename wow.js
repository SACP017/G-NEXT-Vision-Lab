/* G-NEXT Vision Lab: interactive presentation layer over the existing demo data. */
(() => {
  const data = typeof records !== 'undefined' ? records : [];
  const byStatus = status => data.filter(item => item.status === status);
  const html = (selector, position, content) => document.querySelector(selector)?.insertAdjacentHTML(position, content);
  const count = items => String(items.length).padStart(2, '0');

  html('.home-heading', 'afterend', `
    <section class="vision-hero" aria-label="Centro de decisiones">
      <div class="vision-hero-copy"><span class="vision-kicker"><i></i> CENTRO DE DECISIONES / WENDY LUNA</span>
        <h2>Haz que cada negocio <em>avance.</em></h2>
        <p>Una lectura visual de los casos que necesitan atención y la siguiente mejor acción.</p>
        <div class="vision-hero-actions"><button type="button" class="vision-button" data-vision-nav="opportunities">Explorar oportunidades <span>↗</span></button><button type="button" class="vision-ghost" data-vision-nav="reports">Ver inteligencia <span>→</span></button></div>
      </div>
      <div class="vision-orbit" aria-hidden="true"><div class="orbit-rim orbit-rim-one"></div><div class="orbit-rim orbit-rim-two"></div><div class="orbit-core"><span>TU CUMPLIMIENTO</span><strong id="complianceValue" data-target="80">0%</strong><small>AVANCE</small></div><i class="orbit-node n1"></i><i class="orbit-node n2"></i><i class="orbit-node n3"></i></div>
      <div class="vision-hero-footer"><span><i></i> Datos de demostración</span><span>VISIÓN 360° <b>✦</b></span></div>
    </section>`);

  let complianceTimer = 0;
  const animateCompliance = () => {
    const value = document.getElementById('complianceValue');
    if (!value) return;
    clearInterval(complianceTimer);
    const target = Number(value.dataset.target) || 80;
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) {
      value.textContent = `${target}%`;
      return;
    }
    let current = 0;
    value.textContent = '0%';
    value.classList.remove('is-counting');
    void value.offsetWidth;
    value.classList.add('is-counting');
    complianceTimer = setInterval(() => {
      const remaining = target - current;
      current = Math.min(target, current + Math.max(1, Math.ceil(remaining * .2)));
      value.textContent = `${current}%`;
      if (current >= target) {
        clearInterval(complianceTimer);
        value.classList.remove('is-counting');
      }
    }, 35);
  };
  setTimeout(animateCompliance, 100);
  document.querySelector('nav a[data-page="dashboard"]')?.addEventListener('click', () => setTimeout(animateCompliance, 40));

  const readyToSend = data.filter(item => item.status !== 'Finalizado' && /PROMESA POR ENVIAR/i.test(item.business));
  document.querySelector('.page[data-page="opportunities"] .opportunity-command')?.insertAdjacentHTML('afterend', `
    <section class="vision-radar radar-command ready-to-send-radar" aria-labelledby="homeReadyTitle">
      <div class="vision-section-head"><div><span class="vision-label">02 / CIERRE FINANCIERO</span><h2 id="homeReadyTitle">Listas para enviar</h2><p>Promesas con cierre financiero preparadas para el siguiente paso.</p></div><span class="vision-mini-tag">${count(readyToSend)} PREPARADAS</span></div>
      <div class="ready-radar-list radar-list">${readyToSend.map((item, index) => `<button class="radar-item radar-flip is-ready" type="button" data-open-op="${item.op}" aria-label="Abrir oportunidad ${item.op}, lista para enviar"><span class="radar-flip-inner"><span class="radar-face radar-front"><span class="radar-rank">0${index + 1}</span><span class="radar-item-main"><strong>#${item.op}</strong><small>${item.project} · ${item.ref}</small></span><span class="radar-state ready">Lista para enviar</span><span class="radar-arrow">↗</span><span class="radar-signal"><i></i><small>CIERRE FINANCIERO</small></span></span><span class="radar-face radar-back"><span class="radar-back-label">RESUMEN DEL NEGOCIO</span><strong>${item.business}</strong><span class="radar-summary"><span><i>Proyecto</i><b>${item.project}</b></span><span><i>Bloqueo principal</i><b>${item.block1}</b></span><span><i>Responsable</i><b>${responsibleFor(item)}</b></span></span><span class="radar-back-action">Abrir oportunidad <b>↗</b></span></span></span></button>`).join('')}</div>
    </section>`);

  const urgent = [...byStatus('En riesgo'), ...byStatus('Pendiente')].slice(0, 5);
  document.querySelector('.page[data-page="dashboard"] .home-kpis')?.insertAdjacentHTML('afterend', `
    <section class="vision-radar home-action-radar"><div class="vision-section-head"><div><span class="vision-label">RADAR DE ACCIÓN</span><h2>Empieza donde más importa</h2><p>Casos en riesgo y pendientes según los datos de esta demostración.</p></div><span class="vision-mini-tag">${count(urgent)} EN FOCO</span></div>
    <div class="radar-list">${urgent.map((item, index) => `<button class="radar-item radar-flip ${item.status === 'En riesgo' ? 'is-risk' : 'is-pending'}" type="button" data-open-op="${item.op}" aria-label="Abrir oportunidad ${item.op}"><span class="radar-flip-inner"><span class="radar-face radar-front"><span class="radar-rank">0${index + 1}</span><span class="radar-item-main"><strong>#${item.op}</strong><small>${item.project} · ${item.ref}</small></span><span class="radar-state ${item.status === 'En riesgo' ? 'risk' : ''}">${item.status}</span><span class="radar-arrow">↗</span></span><span class="radar-face radar-back"><span class="radar-back-label">RESUMEN DEL NEGOCIO</span><strong>${item.business}</strong><span class="radar-summary"><span><i>Proyecto</i><b>${item.project}</b></span><span><i>Bloqueo principal</i><b>${item.block1}</b></span><span><i>Responsable</i><b>${responsibleFor(item)}</b></span></span><span class="radar-back-action">Abrir oportunidad <b>↗</b></span></span></span></button>`).join('')}</div></section>`);

  html('.reports-heading', 'afterend', `
    <section class="scenario-lab"><div class="scenario-copy"><span class="vision-label">03 / LABORATORIO DE ESCENARIOS</span><h2>¿Qué pasa si recuperamos casos?</h2><p>Mueve el control para explorar un escenario hipotético. Esta visualización no es una predicción.</p><label for="scenarioRange">Casos en riesgo recuperados <strong id="scenarioValue">0</strong></label><input id="scenarioRange" type="range" min="0" max="${byStatus('En riesgo').length}" value="0" aria-label="Casos en riesgo recuperados"></div><div class="scenario-result"><span>ESCENARIO SIMULADO</span><strong id="scenarioRate">0%</strong><small>de casos finalizados o recuperados</small><div class="scenario-track"><i id="scenarioFill"></i></div><p id="scenarioNarrative"></p></div></section>`);

  html('.detail-heading', 'afterend', `<div class="detail-spotlight"><span>✦ NEXT BEST ACTION</span><strong id="spotlightTitle">Selecciona una oportunidad</strong><p id="spotlightText">Consulta el caso para descubrir el siguiente paso sugerido a partir de su estado actual.</p><small>Sugerencia demostrativa basada en reglas · Verifica antes de actuar</small></div>`);
  html('.user-hero', 'afterend', `<section class="profile-spotlight"><div><span class="vision-label">TU HUELLA EN G-NEXT</span><h2>Tu trabajo mueve el resultado.</h2><p>Cada caso finalizado representa un avance real del equipo.</p></div><div class="profile-spark" aria-hidden="true"><span style="height:38%"></span><span style="height:54%"></span><span style="height:48%"></span><span style="height:70%"></span><span style="height:82%"></span><span style="height:100%"></span></div><b>✦</b></section>`);

  document.querySelectorAll('[data-vision-nav]').forEach(button => button.addEventListener('click', () => { setPage(button.dataset.visionNav); window.scrollTo({top:0,behavior:'smooth'}); }));
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
