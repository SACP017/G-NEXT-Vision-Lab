(() => {
  const reportsLink = document.querySelector('nav a[data-page="reports"]');
  const reportsPage = document.querySelector('.page[data-page="reports"]');
  if (!reportsLink || !reportsPage) return;

  const money = value => new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP', maximumFractionDigits: 0}).format(value);
  const safe = value => String(value ?? '').replace(/[&<>"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[character]));
  const opportunityList = () => typeof records === 'undefined' ? [] : records;

  reportsLink.insertAdjacentHTML('beforebegin', '<a href="#envio-promesas" data-page="promise-shipping"><span>✉</span> Envío de promesas</a>');
  reportsPage.insertAdjacentHTML('beforebegin', `<div class="page hidden" data-page="promise-shipping">
    <section class="promise-page" aria-labelledby="promisePageTitle">
      <header class="promise-page-header">
        <div><p class="eyebrow">GESTIÓN DOCUMENTAL</p><h2 id="promisePageTitle">Envío de Promesas</h2><p>Consulta una oportunidad para preparar y revisar su promesa.</p></div>
        <button class="promise-ai-button" id="promiseAiButton" type="button"><span>✦</span> Prevalidar con agente de IA</button>
      </header>
      <form id="promiseSimpleForm" class="promise-search-card">
        <label for="promiseOpportunity">Número de Oportunidad<b>*</b></label>
        <div class="promise-search-row"><input id="promiseOpportunity" name="opportunity" inputmode="numeric" placeholder="Escribe el número de la oportunidad" autocomplete="off"><button type="submit" class="promise-validate">Validar</button><button type="button" class="promise-cancel" id="cancelPromise">Cancelar</button></div>
        <p class="promise-feedback" id="promiseFeedback" role="status" aria-live="polite">Ingresa una oportunidad registrada para consultar su información.</p>
      </form>
      <div class="promise-workspace hidden" id="promiseWorkspace"></div>
    </section>
  </div>`);

  const navLink = document.querySelector('nav a[data-page="promise-shipping"]');
  const form = document.getElementById('promiseSimpleForm');
  const field = document.getElementById('promiseOpportunity');
  const feedback = document.getElementById('promiseFeedback');
  const workspace = document.getElementById('promiseWorkspace');
  const aiButton = document.getElementById('promiseAiButton');
  const saveChangesButton = document.querySelector('.page[data-page="detail"] .detail-actions .primary');
  saveChangesButton?.insertAdjacentHTML('beforebegin', '<button class="outline small promise-detail-action" id="openPromiseShipping" type="button">✉ Envío de promesas</button>');

  function extraData(record, index) {
    const base = 198000000 + (index * 7400000);
    const separation = 1000000 + ((index % 3) * 500000);
    const plan = Math.round(base * .09);
    const credits = Math.round(base * .68);
    const subsidies = base - separation - plan - credits;
    const client = record.client || {};
    return {
      value: base, separation, plan, credits, subsidies,
      property: record.ref || `${4 + index}-${203 + index}`,
      showroom: record.project || 'SALA PRINCIPAL',
      sprv: `${String(20 + index % 8).padStart(2, '0')}/08/2024`,
      pequ: `${String(12 + index % 10).padStart(2, '0')}/12/2024`,
      clientName: client.name || ['Laura Martínez','Andrés Rojas','Camila Torres'][index % 3],
      clientPhone: client.phone || `+57 310 555 ${String(1400 + index * 37).slice(-4)}`,
      clientEmail: client.email || `cliente.${record.op}@ejemplo.com`,
      notary: `${20 + index % 15} · BOGOTÁ D.C.`,
      paid: Math.round(base * .1),
      installments: 24 + index % 12,
      sources: 2 + index % 3
    };
  }

  function renderWorkspace(record) {
    const index = Math.max(0, opportunityList().findIndex(item => item.op === record.op));
    const detail = extraData(record, index);
    workspace.innerHTML = `<div class="promise-validation-bar"><span><i></i>Oportunidad #${safe(record.op)} validada</span><b>Disponible para preparar</b></div>
      <div class="promise-layout">
        <aside class="promise-person-column">
          <section class="promise-side-section"><h3>Información del inmueble</h3><dl><div><dt>Proyecto</dt><dd>${safe(record.project)}</dd></div><div><dt>Etapa</dt><dd>${safe(record.validator)}</dd></div><div><dt>Sala de ventas</dt><dd>${safe(detail.showroom)}</dd></div><div><dt>Inmueble</dt><dd>${safe(detail.property)}</dd></div><div><dt>SPRV</dt><dd>${detail.sprv}</dd></div><div><dt>PEQU</dt><dd>${detail.pequ}</dd></div></dl></section>
          <section class="promise-side-section"><h3>Información del comprador</h3><div class="promise-client"><span>PRINCIPAL</span><strong>${safe(detail.clientName)}</strong><small>Tel. ${safe(detail.clientPhone)}</small><small>${safe(detail.clientEmail)}</small></div></section>
        </aside>
        <div class="promise-main-column">
          <section class="promise-data-card"><h3>Conceptos iniciales</h3><div class="promise-two-fields"><label>Separación<input value="${money(detail.separation)} · pagado ${money(detail.separation)}" readonly></label><label>Confirmación<input value="${money(0)}" readonly></label></div></section>
          <section class="promise-data-card"><h3>Datos de la Promesa</h3><div class="promise-two-fields"><label>Entidad de Crédito del Constructor<input value="${safe(record.bank || 'Sin entidad registrada')}" readonly></label><label>Fecha escritura pactada en promesa<input id="promiseSigningDate" type="date"></label><label>Especificaciones<input value="Sin especificaciones adicionales" readonly><small>Información demostrativa asociada al proyecto.</small></label><label>Notaría<input value="${safe(detail.notary)}" readonly></label><label>Días para entrega del inmueble<input type="number" value="60" min="1"></label></div></section>
          <div class="promise-accordions">
            <section><button type="button" class="promise-accordion" aria-expanded="false">Cumplimientos <span>›</span></button><div class="promise-accordion-panel"><p>No hay novedades de cumplimiento registradas para esta oportunidad.</p></div></section>
            <section><button type="button" class="promise-accordion" aria-expanded="false">Plan de pagos existente <em>${detail.installments} cuotas</em><span>›</span></button><div class="promise-accordion-panel"><div class="promise-mini-grid"><b>Cuota inicial</b><span>${money(detail.separation)}</span><b>Cuotas del plan</b><span>${money(detail.plan)}</span><b>Saldo proyectado</b><span>${money(detail.credits + detail.subsidies)}</span></div></div></section>
            <section><button type="button" class="promise-accordion" aria-expanded="false">Modificar condiciones de venta <span>›</span></button><div class="promise-accordion-panel"><p>Las condiciones actuales coinciden con la información registrada en la oportunidad.</p></div></section>
            <section><button type="button" class="promise-accordion" aria-expanded="false">Cuotas del plan <em>${detail.installments}</em><span>›</span></button><div class="promise-accordion-panel"><p>${detail.installments} cuotas configuradas para el plan comercial.</p></div></section>
            <section><button type="button" class="promise-accordion" aria-expanded="false">Fuentes de pago <em>${detail.sources}</em><span>›</span></button><div class="promise-accordion-panel"><p>Crédito, recursos propios y subsidio registrados.</p></div></section>
            <section><button type="button" class="promise-accordion" aria-expanded="false">Asignación de parqueaderos y depósitos <em>0</em><span>›</span></button><div class="promise-accordion-panel"><p>Sin asignaciones adicionales.</p></div></section>
          </div>
        </div>
        <aside class="promise-summary-column">
          <span class="promise-ready"><i></i> Disponible para preparar</span>
          <section class="promise-summary-card"><h3>Resumen de Operaciones</h3><div><span>Ya pagado (cartera)</span><b>${money(detail.paid)}</b></div><div><span>Separación</span><b>${money(detail.separation)}</b></div><div><span>Cuotas del plan</span><b>${money(detail.plan)}</b></div><div><span>Créditos</span><b>${money(detail.credits)}</b></div><div><span>Subsidios</span><b>${money(detail.subsidies)}</b></div><div class="total"><span>Total</span><b>${money(detail.value)}</b></div><div class="property-value"><span>Valor del Inmueble</span><b>${money(detail.value)}</b></div><div class="promise-difference"><small>DIFERENCIA</small><strong>${money(0)}</strong><span>El plan coincide con el valor del inmueble</span></div></section>
          <section class="promise-send-card"><small id="promisePendingLabel">Sin cambios pendientes</small><div class="promise-missing" id="promiseMissing"><b>Falta esto para poder enviar</b><span>Falta la fecha de escritura pactada en promesa</span></div><button id="sendPromiseButton" type="button" disabled>Enviar Promesa</button></section>
          <button type="button" class="promise-history">› Historial de envíos <em>0</em><span>Refrescar</span></button>
        </aside>
      </div>`;
    workspace.classList.remove('hidden');
    workspace.scrollIntoView({behavior: 'smooth', block: 'start'});
    bindWorkspaceInteractions();
  }

  function bindWorkspaceInteractions() {
    workspace.querySelectorAll('.promise-accordion').forEach(button => button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      button.closest('section').classList.toggle('open', !expanded);
    }));
    const signingDate = document.getElementById('promiseSigningDate');
    const sendButton = document.getElementById('sendPromiseButton');
    const missing = document.getElementById('promiseMissing');
    const pending = document.getElementById('promisePendingLabel');
    signingDate?.addEventListener('input', () => {
      const ready = Boolean(signingDate.value);
      sendButton.disabled = !ready;
      missing.classList.toggle('resolved', ready);
      pending.textContent = ready ? '1 cambio pendiente por guardar' : 'Sin cambios pendientes';
    });
    sendButton?.addEventListener('click', () => {
      sendButton.textContent = 'Promesa preparada ✓';
      sendButton.disabled = true;
      pending.textContent = 'Preparación simulada completada';
    });
  }

  navLink.addEventListener('click', event => {
    event.preventDefault();
    setPage('promise-shipping');
    history.replaceState(null, '', '#envio-promesas');
  });
  document.querySelectorAll('nav a[data-page]').forEach(link => link.addEventListener('click', () => {
    const hash = link.getAttribute('href');
    if (hash?.startsWith('#')) history.replaceState(null, '', hash);
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const opportunity = field.value.replace(/\D/g, '');
    const record = opportunityList().find(item => item.op === opportunity);
    if (!record) {
      workspace.classList.add('hidden');
      feedback.textContent = 'No encontramos esa oportunidad. Verifica el número e inténtalo nuevamente.';
      feedback.classList.add('error');
      field.focus();
      return;
    }
    feedback.textContent = `Oportunidad #${record.op} validada correctamente.`;
    feedback.classList.remove('error');
    renderWorkspace(record);
  });
  document.getElementById('cancelPromise').addEventListener('click', () => {
    form.reset();
    workspace.classList.add('hidden');
    workspace.innerHTML = '';
    feedback.textContent = 'Ingresa una oportunidad registrada para consultar su información.';
    feedback.classList.remove('error');
    field.focus();
  });
  aiButton.addEventListener('click', () => {
    const validationBar = workspace.querySelector('.promise-validation-bar');
    if (!validationBar) {
      feedback.textContent = 'Primero valida una oportunidad para iniciar la prevalidación con IA.';
      feedback.classList.remove('error');
      field.focus();
      return;
    }
    aiButton.classList.add('is-processing');
    aiButton.innerHTML = '<span>✦</span> Analizando información...';
    window.setTimeout(() => {
      validationBar.querySelector('b').textContent = 'Prevalidación IA completada';
      validationBar.classList.add('ai-complete');
      aiButton.classList.remove('is-processing');
      aiButton.classList.add('is-complete');
      aiButton.innerHTML = '<span>✓</span> Prevalidación completada';
    }, 700);
  });
  document.getElementById('openPromiseShipping')?.addEventListener('click', () => {
    const opportunity = document.getElementById('detailOp')?.textContent?.replace(/\D/g, '') || '';
    field.value = opportunity;
    workspace.classList.add('hidden');
    workspace.innerHTML = '';
    feedback.textContent = 'Pulsa Validar para consultar la información de esta oportunidad.';
    feedback.classList.remove('error');
    setPage('promise-shipping');
    history.replaceState(null, '', '#envio-promesas');
    window.scrollTo({top: 0, behavior: 'smooth'});
    window.setTimeout(() => field.focus(), 250);
  });
  if (location.hash === '#envio-promesas') setPage('promise-shipping');
})();
