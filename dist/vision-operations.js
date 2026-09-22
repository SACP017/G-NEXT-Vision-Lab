/* Visual operations: all communications are previews; no external requests are made. */
(() => {
  const all = records;
  const selected = new Set();
  const statusOrder = [
    {key:'Pendiente',title:'Por activar',icon:'◇',description:'Casos esperando validación o soporte',tone:'gold'},
    {key:'En gestión',title:'En movimiento',icon:'↗',description:'Gestiones que avanzan hacia cierre',tone:'purple'},
    {key:'En riesgo',title:'Intervención',icon:'!',description:'Bloqueos para resolver con prioridad',tone:'rose'},
    {key:'Finalizado',title:'Cierre',icon:'✓',description:'Oportunidades completadas',tone:'aqua'}
  ];
  const h = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const format = value => String(value).padStart(2,'0');
  const count = status => all.filter(record => record.status === status).length;
  const opportunityCommand = document.querySelector('.page[data-page="opportunities"] .opportunity-command');
  opportunityCommand?.classList.add('is-streamlined');
  opportunityCommand?.querySelector('.opportunity-command-grid')?.remove();
  opportunityCommand?.querySelector('.command-heading > .primary')?.remove();
  const flow = document.createElement('section');
  flow.className = 'ops-flow';
  flow.innerHTML = `<div class="ops-flow-heading"><div><span class="vision-label">MAPA VIVO / 17 OPORTUNIDADES</span><h2>El recorrido hacia el cierre</h2><p>Explora una etapa y salta al listado de los casos que la componen.</p></div><div class="ops-flow-total"><strong>${format(all.length)}</strong><span>CASOS EN EL MAPA</span></div></div><div class="ops-spine" role="group" aria-label="Etapas del pipeline"></div><div class="ops-flow-foot"><span><i></i> Datos del prototipo</span><span>Selecciona una etapa para filtrar el listado ↗</span></div>`;
  const readyPanel = document.querySelector('.page[data-page="opportunities"] .ready-to-send-radar');
  readyPanel?.before(flow);
  if (readyPanel) {
    const overview = document.createElement('div');
    overview.className = 'opportunity-overview-split';
    flow.before(overview);
    overview.append(flow, readyPanel);
  }
  const spine = flow.querySelector('.ops-spine');
  spine.innerHTML = statusOrder.map((stage,index) => {
    const cases = all.filter(record => record.status === stage.key);
    return `<button class="ops-node ${stage.tone}" type="button" data-flow="${h(stage.key)}" aria-label="Ver ${cases.length} casos en ${h(stage.title)}"><span class="ops-node-top"><b>0${index+1}</b><i>${stage.icon}</i></span><strong>${format(cases.length)}</strong><span class="ops-node-title">${stage.title}</span><small>${stage.description}</small><span class="ops-node-foot"><span>${Math.round(cases.length / Math.max(1,all.length) * 100)}% del total</span><b>↗</b></span></button>`;
  }).join('');

  const radar = document.querySelector('.page[data-page="dashboard"] .home-action-radar');
  radar?.classList.add('radar-command');
  const highRisk = all.filter(record => record.status === 'En riesgo');
  radar?.querySelector('.vision-section-head')?.insertAdjacentHTML('afterend', `<div class="radar-beacon"><div class="beacon-visual" aria-hidden="true"><div class="beacon-circle a"></div><div class="beacon-circle b"></div><div class="beacon-circle c"></div><span>✦</span></div><div class="beacon-copy"><span>SEÑAL DE ATENCIÓN</span><strong>${format(highRisk.length)} negocios necesitan intervención</strong><p>Prioriza bloqueos de crédito, respuesta del cliente y documentos para desistimiento.</p></div><button type="button" class="beacon-action" data-risk-view>Ver casos en riesgo <span>↗</span></button></div>`);
  radar?.querySelectorAll('.radar-item').forEach(card => {
    const record = all.find(item => item.op === card.dataset.openOp);
    if (!record) return;
    const severity = record.status === 'En riesgo' ? 92 : 58;
    card.style.setProperty('--radar-level',`${severity}%`);
    card.querySelector('.radar-front')?.insertAdjacentHTML('beforeend',`<span class="radar-signal"><i></i><small>${record.status === 'En riesgo' ? 'ATENCIÓN ALTA' : 'SEGUIMIENTO'}</small></span>`);
  });

  const tableFilters = document.querySelector('.opportunity-table .filters');
  if (tableFilters) {
    tableFilters.querySelectorAll(':scope > button.filter').forEach(button => button.remove());
    tableFilters.querySelector('#search2')?.addEventListener('input',() => renderTable());
  }

  const filterColumns = [
    {key:'op',index:0,label:'oportunidad',value:record => record.op,option:record => `#${record.op} · ${record.project}`},
    {key:'ref',index:1,label:'referencia',value:record => record.ref},
    {key:'status',index:2,label:'estado del negocio',value:record => record.status},
    {key:'block1',index:3,label:'bloqueo 1',value:record => record.block1},
    {key:'block2',index:4,label:'bloqueo 2',value:record => record.block2},
    {key:'bank',index:5,label:'entidad real de crédito',value:record => record.bank},
    {key:'analyst',index:6,label:'analista responsable',value:record => responsibleFor(record)}
  ];
  const headerCells = [...document.querySelectorAll('.opportunity-table thead th')];
  filterColumns.forEach(definition => {
    const cell = headerCells[definition.index];
    if (!cell || cell.querySelector('[data-column-filter-button]')) return;
    const title = cell.textContent.trim();
    const optionMap = new Map();
    all.forEach(record => {
      const value = String(definition.value(record) || '');
      if (value && !optionMap.has(value)) optionMap.set(value,String(definition.option?.(record) || value));
    });
    const options = [...optionMap.entries()]
      .sort((left,right) => left[1].localeCompare(right[1],'es',{numeric:true}))
      .map(([value,label]) => `<label class="column-filter-option" data-option-label="${h(label)}"><input type="checkbox" value="${h(value)}" data-column-filter-check="${definition.key}"><span>${h(label)}</span></label>`).join('');
    cell.textContent = '';
    cell.insertAdjacentHTML('beforeend', `<div class="column-filter-heading"><span>${h(title)}</span><button type="button" class="column-filter-button" data-column-filter-button="${definition.key}" aria-label="Filtrar por ${h(definition.label)}" aria-expanded="false"><span aria-hidden="true">▼</span><b data-column-filter-count></b></button><div class="column-filter-menu" data-column-filter-menu="${definition.key}" hidden><label class="column-filter-search"><span>Buscar en ${h(definition.label)}</span><input type="search" data-column-option-search="${definition.key}" placeholder="Escribe para buscar..." autocomplete="off"></label><div class="column-filter-options" role="group" aria-label="Opciones de ${h(definition.label)}">${options}</div><div class="column-filter-empty" hidden>Sin opciones que coincidan.</div><button type="button" data-clear-column="${definition.key}">Limpiar este filtro</button></div></div>`);
  });
  const opportunityTable = document.querySelector('.opportunity-table');
  const closeColumnMenus = except => {
    opportunityTable?.querySelectorAll('[data-column-filter-menu]').forEach(menu => {
      if (menu === except) return;
      menu.hidden = true;
      const button = opportunityTable.querySelector(`[data-column-filter-button="${menu.dataset.columnFilterMenu}"]`);
      button?.setAttribute('aria-expanded','false');
    });
  };
  opportunityTable?.addEventListener('click',event => {
    const trigger = event.target.closest('[data-column-filter-button]');
    if (trigger) {
      const menu = opportunityTable.querySelector(`[data-column-filter-menu="${trigger.dataset.columnFilterButton}"]`);
      const willOpen = menu?.hidden;
      closeColumnMenus(menu);
      if (menu) menu.hidden = !willOpen;
      trigger.setAttribute('aria-expanded',String(Boolean(willOpen)));
      if (willOpen) menu.querySelector('[data-column-option-search]')?.focus();
      return;
    }
    const clear = event.target.closest('[data-clear-column]');
    if (clear) {
      opportunityColumnFilters[clear.dataset.clearColumn] = [];
      renderTable();
    }
  });
  opportunityTable?.addEventListener('change',event => {
    const checkbox = event.target.closest('[data-column-filter-check]');
    if (!checkbox) return;
    const key = checkbox.dataset.columnFilterCheck;
    opportunityColumnFilters[key] = [...opportunityTable.querySelectorAll(`[data-column-filter-check="${key}"]:checked`)].map(input => input.value);
    renderTable();
  });
  opportunityTable?.addEventListener('input',event => {
    const search = event.target.closest('[data-column-option-search]');
    if (!search) return;
    const menu = search.closest('[data-column-filter-menu]');
    const query = search.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    let visibleOptions = 0;
    menu.querySelectorAll('.column-filter-option').forEach(option => {
      const label = option.dataset.optionLabel.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
      option.hidden = Boolean(query) && !label.includes(query);
      if (!option.hidden) visibleOptions += 1;
    });
    const empty = menu.querySelector('.column-filter-empty');
    if (empty) empty.hidden = visibleOptions > 0;
  });
  document.addEventListener('click',event => {
    if (!event.target.closest('.column-filter-heading')) closeColumnMenus();
  });
  document.addEventListener('keydown',event => {
    if (event.key === 'Escape') closeColumnMenus();
  });

  const toolbar = document.createElement('div');
  toolbar.className = 'bulk-toolbar';
  toolbar.setAttribute('aria-live','polite');
  toolbar.innerHTML = `<div class="bulk-count"><span id="bulkCount">0</span><div><strong>casos seleccionados</strong><small>Prepara una comunicación para este grupo</small></div></div><div class="bulk-actions"><button type="button" data-channel="mensaje">✉ Mensaje</button><button type="button" data-channel="correo">@ Correo</button><button type="button" data-channel="marconi">✦ Marconi</button><button type="button" class="bulk-clear" id="clearSelection">Limpiar</button></div>`;
  document.querySelector('.opportunity-table .panel-head')?.after(toolbar);
  const tableActions = document.querySelector('.opportunity-table .table-actions');
  tableActions?.insertAdjacentHTML('afterbegin','<button type="button" class="bulk-launch">✦ Comunicaciones masivas</button>');

  const modal = document.createElement('div');
  modal.className = 'ops-modal hidden';
  modal.id = 'opsModal';
  modal.innerHTML = `<div class="ops-modal-shade" data-close-composer></div><section class="ops-dialog" role="dialog" aria-modal="true" aria-labelledby="composerTitle"><div class="ops-dialog-head"><div><span class="vision-label">CENTRO DE COMUNICACIONES / DEMOSTRACIÓN</span><h2 id="composerTitle">Preparar comunicación</h2></div><button type="button" class="ops-close" data-close-composer aria-label="Cerrar">×</button></div><div class="ops-dialog-body"><div class="ops-form"><label>Canal<select id="composerChannel"><option value="mensaje">Mensaje</option><option value="correo">Correo</option><option value="marconi">Marconi</option></select></label><label>Plantilla<select id="composerTemplate"><option value="seguimiento">Seguimiento del caso</option><option value="documentos">Solicitud de documentos</option><option value="firma">Recordatorio de firma</option></select></label><label>Asunto<input id="composerSubject" type="text" maxlength="100"></label><label>Contenido<textarea id="composerBody" rows="7" maxlength="1000"></textarea></label></div><aside class="ops-preview"><span>VISTA PREVIA / NO SE ENVÍA</span><strong id="previewTitle"></strong><p id="previewBody"></p><div class="preview-recipients"><b id="previewCount">0</b><span>oportunidades seleccionadas</span></div><small>Revisa destinatarios, consentimiento y datos antes de cualquier integración real.</small></aside></div><div class="ops-dialog-foot"><span id="composerFeedback">Prototipo visual: no hay conexión de envío.</span><button type="button" class="vision-button" id="simulatePrepare">Preparar borrador <span>↗</span></button></div></section>`;
  document.body.appendChild(modal);
  let previousFocus;
  const close = () => { modal.classList.add('hidden'); document.body.classList.remove('modal-open'); previousFocus?.focus(); };
  modal.querySelectorAll('[data-close-composer]').forEach(button => button.addEventListener('click',close));
  document.addEventListener('keydown',event => { if(event.key === 'Escape' && !modal.classList.contains('hidden')) close(); });
  const templates = {
    seguimiento:['Seguimiento de tu oportunidad','Hola, queremos compartirte el estado de tu oportunidad y confirmar el siguiente paso de la gestión.'],
    documentos:['Documentos pendientes','Hola, para continuar con tu oportunidad necesitamos revisar los documentos pendientes. Por favor contacta a tu analista.'],
    firma:['Firma de promesa','Hola, te invitamos a revisar el estado de la firma de tu promesa de compraventa con tu analista.']
  };
  const syncPreview = () => {
    modal.querySelector('#previewTitle').textContent = modal.querySelector('#composerSubject').value || 'Sin asunto';
    modal.querySelector('#previewBody').textContent = modal.querySelector('#composerBody').value || 'Escribe un mensaje para ver la vista previa.';
    modal.querySelector('#previewCount').textContent = selected.size;
  };
  modal.querySelector('#composerTemplate').addEventListener('change',event => {
    const [subject,body] = templates[event.target.value];
    modal.querySelector('#composerSubject').value = subject;
    modal.querySelector('#composerBody').value = body;
    syncPreview();
  });
  modal.querySelectorAll('#composerSubject,#composerBody,#composerChannel').forEach(field => field.addEventListener('input',syncPreview));
  const openComposer = (channel='mensaje') => {
    previousFocus = document.activeElement;
    if (!selected.size) {
      toolbar.classList.add('needs-selection');
      toolbar.querySelector('.bulk-count small').textContent = 'Marca las casillas de los casos que quieres incluir';
      document.querySelector('.opportunity-table .table-wrap')?.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    toolbar.classList.remove('needs-selection');
    modal.querySelector('#composerChannel').value = channel;
    modal.querySelector('#composerTemplate').value = 'seguimiento';
    modal.querySelector('#composerTemplate').dispatchEvent(new Event('change'));
    modal.querySelector('#composerFeedback').textContent = 'Prototipo visual: no hay conexión de envío.';
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    modal.querySelector('#composerChannel').focus();
  };
  document.querySelector('.bulk-launch')?.addEventListener('click',() => openComposer());
  toolbar.querySelectorAll('[data-channel]').forEach(button => button.addEventListener('click',() => openComposer(button.dataset.channel)));
  toolbar.querySelector('#clearSelection').addEventListener('click',() => { selected.clear(); renderSelection(); });
  modal.querySelector('#simulatePrepare').addEventListener('click',() => {
    modal.querySelector('#composerFeedback').textContent = `Borrador preparado para ${selected.size} caso${selected.size === 1 ? '' : 's'} en esta demostración. No se envió nada.`;
  });

  function renderSelection() {
    document.querySelectorAll('#rows2 .row-select').forEach(input => { input.checked = selected.has(input.value); input.closest('tr')?.classList.toggle('is-selected',input.checked); });
    const visible = [...document.querySelectorAll('#rows2 .row-select')];
    const allToggle = document.getElementById('selectAllCases');
    if (allToggle) { allToggle.checked = visible.length > 0 && visible.every(input => input.checked); allToggle.indeterminate = visible.some(input => input.checked) && !allToggle.checked; }
    toolbar.classList.toggle('has-selection',selected.size > 0);
    if (selected.size) { toolbar.classList.remove('needs-selection'); toolbar.querySelector('.bulk-count small').textContent = 'Prepara una comunicación para este grupo'; }
    toolbar.querySelector('#bulkCount').textContent = selected.size;
  }
  const priorRenderTable = renderTable;
  renderTable = function(...args) {
    priorRenderTable(...args);
    const table = document.querySelector('#rows2')?.closest('table');
    if (!table) return;
    const th = table.querySelector('thead th:first-child');
    if (th && !th.querySelector('#selectAllCases')) {
      const heading = th.querySelector('.column-filter-heading') || th;
      heading.insertAdjacentHTML('afterbegin','<label class="select-cell"><input id="selectAllCases" type="checkbox" aria-label="Seleccionar todos los casos visibles"><span></span></label>');
    }
    table.querySelectorAll('#rows2 tr').forEach(row => {
      const op = row.querySelector('.op-link')?.dataset.op;
      if (!op) return;
      row.dataset.record = op;
      row.querySelector('td:first-child')?.insertAdjacentHTML('afterbegin',`<label class="select-cell"><input class="row-select" type="checkbox" value="${op}" aria-label="Seleccionar oportunidad ${op}"><span></span></label>`);
    });
    filterColumns.forEach(definition => {
      const values = opportunityColumnFilters[definition.key];
      const button = table.querySelector(`[data-column-filter-button="${definition.key}"]`);
      button?.classList.toggle('is-active',values.length > 0);
      const count = button?.querySelector('[data-column-filter-count]');
      if (count) count.textContent = values.length ? values.length : '';
      table.querySelectorAll(`[data-column-filter-check="${definition.key}"]`).forEach(input => { input.checked = values.includes(input.value); });
    });
    renderSelection();
  };
  document.querySelector('#rows2')?.addEventListener('change',event => {
    if (!event.target.matches('.row-select')) return;
    event.target.checked ? selected.add(event.target.value) : selected.delete(event.target.value);
    renderSelection();
  });
  document.querySelector('.opportunity-table')?.addEventListener('change',event => {
    if (event.target.id !== 'selectAllCases') return;
    document.querySelectorAll('#rows2 .row-select').forEach(input => event.target.checked ? selected.add(input.value) : selected.delete(input.value));
    renderSelection();
  });
  renderTable();

  const filterStatus = status => {
    openOpportunityView('assigned');
    opportunityColumnFilters.status = [status];
    renderTable();
    document.querySelector('.opportunity-table')?.scrollIntoView({behavior:'smooth',block:'start'});
  };
  spine.querySelectorAll('[data-flow]').forEach(button => button.addEventListener('click',() => filterStatus(button.dataset.flow)));
  radar?.querySelector('[data-risk-view]')?.addEventListener('click',() => filterStatus('En riesgo'));

  const signal = document.createElement('section');
  signal.className = 'deal-intelligence';
  signal.innerHTML = `<div class="deal-intel-head"><div><span class="vision-label">INTELIGENCIA DEL NEGOCIO</span><h2>Señales para decidir</h2><p>Alertas explicables calculadas con el estado y los bloqueos de este caso.</p></div><div class="deal-gauge"><strong id="dealAttention">—</strong><span>ÍNDICE DE ATENCIÓN<br>ILUSTRATIVO</span></div></div><div class="deal-alerts" id="dealAlerts"></div><div class="deal-intel-foot">Estas señales son reglas de demostración. Valida la información antes de tomar decisiones.</div>`;
  document.querySelector('.detail-spotlight')?.after(signal);
  const classify = record => {
    const alerts = [];
    const text = `${record.block1} ${record.block2} ${record.business}`.toLowerCase();
    if (record.status === 'En riesgo' || /negado|vencido|no responde|desistimiento/.test(text)) alerts.push({tone:'critical',icon:'!',title:'Intervención prioritaria',body:record.block1,action:'Revisar el bloqueo y contactar al responsable.'});
    if (/crédito|credito|banco|aprobación|radicar/.test(text)) alerts.push({tone:'amber',icon:'↗',title:'Hito financiero',body:'El avance depende de una gestión de crédito o entidad financiera.',action:'Confirmar radicación, respuesta y próximo responsable.'});
    if (/firma|promesa enviada/.test(text)) alerts.push({tone:'purple',icon:'✎',title:'Firma pendiente',body:'La promesa requiere confirmación de firma o seguimiento.',action:'Verificar con el cliente el estado de la firma.'});
    if (/document|soporte|insumo/.test(text)) alerts.push({tone:'blue',icon:'▤',title:'Documentación por validar',body:'Hay soportes o documentos asociados al siguiente paso.',action:'Revisar exactamente qué falta y solicitarlo.'});
    if (!alerts.length) alerts.push({tone:'aqua',icon:'✓',title:record.status === 'Finalizado' ? 'Cierre registrado' : 'Seguimiento normal',body:record.status === 'Finalizado' ? 'No se detectan bloqueos activos en este registro.' : record.block1,action:record.status === 'Finalizado' ? 'Documentar el resultado.' : 'Confirmar el próximo hito.'});
    return alerts.slice(0,3);
  };
  const priorOpenDetail = openDetail;
  openDetail = function(op) {
    priorOpenDetail(op);
    const record = all.find(item => item.op === op);
    if (!record) return;
    const alerts = classify(record);
    const score = record.status === 'En riesgo' ? 88 : record.status === 'Pendiente' ? 62 : record.status === 'En gestión' ? 39 : 12;
    signal.querySelector('#dealAttention').textContent = score;
    signal.style.setProperty('--attention',`${score}%`);
    signal.querySelector('#dealAlerts').innerHTML = alerts.map(alert => `<article class="deal-alert ${alert.tone}"><span class="alert-icon">${alert.icon}</span><span class="alert-level">${alert.tone === 'critical' ? 'ALERTA ALTA' : 'SEÑAL DE GESTIÓN'}</span><h3>${h(alert.title)}</h3><p>${h(alert.body)}</p><small>${h(alert.action)}</small></article>`).join('');
  };
})();
