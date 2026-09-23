const businessStates = [
  {name:'CON CIERRE FINANCIERO - PROMESA POR ENVIAR', branch:'send', step:1},
  {name:'PROMESA ENVIADA', branch:'signature', step:2},
  {name:'PROMESA CON CUMPLIMIENTO', branch:'compliance', step:3},
  {name:'SIN CIERRE FINANCIERO', branch:'credit', step:1},
  {name:'NEGOCIO EN RIESGO', branch:'credit', step:1},
  {name:'DESISTIMIENTO EN PROCESO', branch:'withdrawal', step:2},
  {name:'PENDIENTE VINCULACIÓN A LA FIDUCIARIA', branch:'link', step:1},
  {name:'PENDIENTE TRÁMITE CON CARTERA', branch:'link', step:1},
  {name:'CLIENTE PENDIENTE DE SOPORTE DE RECURSOS PROPIOS', branch:'send', step:1}
];

const realBlock1 = ['En proceso de envío','Pendiente Cargue de Bono','Pendiente insumos (linderos - planos - especificaciones)','Caso Jurídico','Pendiente Carta De Aprobacion De Credito','Pendiente Radicar Credito Y Subsidio','Desistimiento Radicado En El Web Service','Pendiente Vinculacion De Cliente A La Fiduciaria','Documentos cargados a Oracle','Promesa con Cumplimiento'];
const realBlock2 = ['Envío marconi 1','Pendiente Carta De Aprobacion De Credito','Pendiente Radicar Credito Y Subsidio','Pendiente envío documentos sustentación recursos propios del cliente','Cliente no firma - Novedades con el cliente','Caso Juridico','Paquete de subsidio por enviar','Firmada por el Cliente - En Revisión de Trámites','SIN CIERRE FINANCIERO','Sin bloqueo'];
const realBanks = ['BANCO DAVIVIENDA S.A.','BANCO DE BOGOTA S.A.','BANCOLOMBIA S.A.','BANCO BBVA COLOMBIA S.A.','BANCO AV VILLAS S.A.','BANCO CAJA SOCIAL - BCSC S.A.','FONDO NACIONAL DEL AHORRO','CONTADO CONFIRMADO'];
const branchSteps = {
  send:['Validar información','Cierre financiero','Enviar promesa','Finalizado'],
  signature:['Validar información','Promesa enviada','Confirmar firma','Finalizado'],
  compliance:['Validar información','Promesa enviada','Promesa firmada','Finalizado'],
  credit:['Solicitar crédito','Validar información','Cierre financiero','Finalizado'],
  withdrawal:['Solicitar desistimiento','Documentos de desistimiento','Radicar en Web Service','Finalizado'],
  link:['Validar información','Vincular cliente','Confirmar','Finalizado']
};

const projectMap = {
  '788931':'JARDINES DE FONTANAR', '676840':'HACIENDA SAMARIA', '670259':'RESERVA DE LA CIÉNAGA',
  '626109':'RIVERA DEL VALLE', '741874':'RESERVA DE LA CIÉNAGA', '435589':'MANZANO HDA. EL BOSQUE',
  '667255':'RESERVA DE LA CIÉNAGA', '592022':'BARÚ', '660069':'RESERVA DE LA CIÉNAGA',
  '796224':'RESERVA DE LA CIÉNAGA', '313375':'PASEO DEL PARQUE', '315457':'PASEO DEL PARQUE',
  '842460':'PASEO DEL PARQUE', '845199':'PASEO DEL PARQUE', '845856':'TUPARRO', '847610':'SAMARIA'
};

const clientNames = ['Laura Martínez','Andrés Rojas','Camila Torres','Felipe Vargas','Natalia Gómez','Daniel Cárdenas','Valentina Castro','Juan Esteban Ruiz','Mariana López','Santiago Moreno','Paula Herrera','David Ramírez','Juliana Silva','Nicolás Medina','Carolina Ortiz','Mateo Jiménez','Sara Beltrán'];
const clientAddresses = ['Cra. 19 # 103-42, Bogotá','Calle 87 # 12-18, Bogotá','Av. El Dorado # 68-35, Bogotá','Cra. 7 # 72-41, Bogotá','Calle 140 # 11-62, Bogotá','Cra. 58 # 128-20, Bogotá','Calle 26 # 92-15, Bogotá','Cra. 15 # 93-47, Bogotá','Calle 116 # 19-24, Bogotá','Cra. 9 # 80-36, Bogotá','Calle 127 # 45-19, Bogotá','Cra. 24 # 63-28, Bogotá','Calle 100 # 14-56, Bogotá','Cra. 52 # 106-31, Bogotá','Calle 74 # 22-40, Bogotá','Cra. 13 # 119-33, Bogotá','Calle 91 # 17-25, Bogotá'];
const civilStates = ['Soltera','Casado','Soltera','Unión libre','Casada','Soltero'];

function createClientProfile(index) {
  const name = clientNames[index % clientNames.length];
  const emailName = name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,'.');
  return {name, id:`1.000.${String(420 + index).padStart(3,'0')}.${String(310 + index).padStart(3,'0')}`, email:`${emailName}@ejemplo.com`, phone:`+57 300 555 ${String(1200 + index * 37).slice(-4)}`, civil:civilStates[index % civilStates.length], address:clientAddresses[index % clientAddresses.length]};
}

records.forEach((record, index) => {
  const state = businessStates.find(item => item.name === record.business) || businessStates[index % businessStates.length];
  Object.assign(record, {
    business: record.business || state.name, branch: record.branch || state.branch, step: record.step ?? state.step,
    project: record.project || projectMap[record.op] || 'OTROS PROYECTOS',
    cell: record.cell || ['Asesor Área de Trámites','Envíos','Créditos','Llamadas','Desistimientos'][index % 5],
    block1: record.block1 || realBlock1[index % realBlock1.length], block2: record.block2 || realBlock2[index % realBlock2.length],
    bank: record.bank || realBanks[index % realBanks.length],
    sent: index % 3 === 0 ? '2026-08-18' : index % 3 === 1 ? '2026-08-22' : '',
    managed: '2026-09-08',
    client: record.client || createClientProfile(index)
  });
});

function responsibleFor(record) {
  const selected = profile();
  if (selected.person) return selected.person;
  if (selected.field && record[selected.field] && !/no aplica/i.test(record[selected.field])) return record[selected.field];
  return record.closure || record.calls || record.credits || 'Por asignar';
}

function setOperationalTableHeaders() {
  const labels = ['OPORTUNIDAD','REFERENCIA','ESTADO DEL NEGOCIO','BLOQUEO 1','BLOQUEO 2','ENTIDAD REAL DE CRÉDITO','ANALISTA RESPONSABLE','ASIGNAR'];
  document.querySelectorAll('#rows, #rows2').forEach(body => {
    const table = body.closest('table');
    table?.classList.add('operations-table');
    table?.querySelectorAll('thead th').forEach((th, index) => th.textContent = labels[index]);
  });
  $('#search')?.setAttribute('placeholder','Buscar por oportunidad, referencia, bloqueo o entidad...');
  $('#search2')?.setAttribute('placeholder','Buscar por oportunidad, bloqueo o entidad...');
}

let opportunityView = 'assigned';
let selectedProject = '';
const opportunityColumnFilters = {
  op: [],
  ref: [],
  status: [],
  block1: [],
  block2: [],
  bank: [],
  analyst: []
};

function opportunityScope(list) {
  if (opportunityView === 'projects') return list.filter(record => record.status !== 'Finalizado');
  if (opportunityView === 'ready') return list.filter(record => record.status !== 'Finalizado' && /PROMESA POR ENVIAR/i.test(record.business));
  if (opportunityView === 'ranking') return list.filter(record => record.status === 'En riesgo');
  if (opportunityView === 'banks') return list.filter(record => !/sin entidad|contado/i.test(record.bank));
  if (opportunityView === 'project') return list.filter(record => record.status !== 'Finalizado' && record.project === selectedProject);
  return list;
}

function opportunityScopeLabel() {
  if (opportunityView === 'projects') return 'Oportunidades pertenecientes a proyectos activos';
  if (opportunityView === 'ready') return 'Promesas listas para enviar';
  if (opportunityView === 'ranking') return 'Casos prioritarios para mejorar tu posición en el ranking';
  if (opportunityView === 'banks') return 'Oportunidades con entidad de crédito vinculada';
  if (opportunityView === 'project') return `Proyecto: ${selectedProject}`;
  return 'Todas las oportunidades asignadas a Wendy Luna';
}

function resetOpportunityFilters(resetScope = false) {
  if (resetScope) {
    opportunityView = 'assigned';
    selectedProject = '';
  }
  if ($('#search2')) $('#search2').value = '';
  Object.keys(opportunityColumnFilters).forEach(key => { opportunityColumnFilters[key] = []; });
}

function openOpportunityView(view, project = '') {
  opportunityView = view;
  selectedProject = project;
  resetOpportunityFilters();
  setPage('opportunities');
  renderTable();
  history.replaceState(null, '', '#oportunidades');
}

renderTable = function() {
  const q = ($('#search2')?.value || '').trim().toLowerCase();
  const list = opportunityScope(visible()).filter(record => {
    const matchesSearch = !q || Object.values(record).join(' ').toLowerCase().includes(q);
    const matchesColumns = Object.entries(opportunityColumnFilters).every(([key,values]) => {
      if (!values.length) return true;
      const recordValue = key === 'analyst' ? responsibleFor(record) : record[key];
      return values.includes(String(recordValue || ''));
    });
    return matchesSearch && matchesColumns;
  });
  const statusTone = {'Finalizado':'mint', 'En gestión':'violet', 'Pendiente':'amber', 'En riesgo':'pink'};
  const initials = value => String(value || 'NA').split(/\s+/).filter(Boolean).slice(-2).map(part => part[0]).join('').toUpperCase();
  const html = list.map(record => {
    const responsible = responsibleFor(record);
    const tone = statusTone[record.status] || 'cyan';
    return `<tr class="opportunity-record tone-${tone}">
      <td data-label="Oportunidad" class="opportunity-id-cell"><div class="opportunity-id"><span class="opportunity-signal"></span><div><button class="op-link" data-op="${record.op}">#${record.op}</button><small>${record.project}</small></div></div></td>
      <td data-label="Referencia"><span class="reference-code">${record.ref}</span></td>
      <td data-label="Estado del negocio"><span class="business-state"><i></i>${record.business}</span><small class="record-status">${record.status}</small></td>
      <td data-label="Bloqueo 1"><span class="block-cell"><i>01</i>${record.block1}</span></td>
      <td data-label="Bloqueo 2"><span class="block-cell"><i>02</i>${record.block2}</span></td>
      <td data-label="Entidad real de crédito"><span class="bank-cell"><i>◇</i>${record.bank}</span></td>
      <td data-label="Analista responsable"><span class="analyst-cell"><i>${initials(responsible)}</i><b>${responsible}</b></span></td>
      <td data-label="Acción">${current === 'admin' ? `<select class="assign" data-op="${record.op}"><option>${record.closure}</option><option>NGDS - Wendy Luna</option><option>NGDS - Tania Guzmán</option><option>NGDS - Santiago Ausique</option><option>NGDS - Alejandra Marin</option></select>` : `<button class="row-action" type="button" data-op="${record.op}" aria-label="Abrir oportunidad ${record.op}">↗</button>`}</td>
    </tr>`;
  }).join('') || `<tr class="opportunity-empty"><td colspan="8"><strong>No encontramos oportunidades con estos filtros.</strong><span>Prueba otra combinación o limpia los filtros de las columnas.</span></td></tr>`;
  if ($('#rows')) $('#rows').innerHTML = html;
  if ($('#rows2')) $('#rows2').innerHTML = html;
  if ($('#total')) $('#total').textContent = visible().length;
  if ($('#opportunityScope')) $('#opportunityScope').textContent = opportunityScopeLabel();
  document.querySelectorAll('.result-count').forEach(item => item.textContent = `${list.length} resultados`);
  if ($('#roleText')) $('#roleText').textContent = current === 'admin' ? 'Todos los casos de la operación' : `Casos asignados a ${profile().area}${profile().person ? ' · ' + profile().person : ''}`;
  document.querySelectorAll('.assign').forEach(select => select.addEventListener('change', event => {
    const record = records.find(item => item.op === event.target.dataset.op);
    record.closure = event.target.value;
    renderTable();
  }));
  document.querySelectorAll('.op-link').forEach(link => link.addEventListener('click', () => openDetail(link.dataset.op)));
  document.querySelectorAll('.row-action').forEach(button => button.addEventListener('click', () => openDetail(button.dataset.op)));
  syncDashboardAnalytics();
};

function syncDashboardAnalytics() {
  const list = visible();
  const counts = {Finalizado:0, 'En gestión':0, Pendiente:0, 'En riesgo':0};
  list.forEach(record => { counts[record.status] = (counts[record.status] || 0) + 1; });
  const total = list.length || 1;
  const active = total - counts.Finalizado;
  const percent = value => Math.round((value / total) * 100);
  const pad = value => String(value).padStart(2, '0');

  const navCount = document.querySelector('nav a[data-page="opportunities"] em');
  if (navCount) navCount.textContent = total;

  const metricCards = document.querySelectorAll('.metrics .metric');
  const metricData = [
    [total, 'Mis oportunidades', `${active} activas`],
    [active, 'Casos activos', 'Sin finalizar'],
    [counts['En riesgo'], 'En riesgo', 'Requieren atención'],
    [`${percent(counts.Finalizado)}%`, 'Avance del pipeline', `Meta 75%`]
  ];
  metricCards.forEach((card, index) => {
    const data = metricData[index];
    if (!data) return;
    card.querySelector('strong').textContent = typeof data[0] === 'number' ? pad(data[0]) : data[0];
    card.querySelector('small').textContent = data[1];
    card.querySelector('i').textContent = data[2];
  });

  const barData = [
    ['Finalizado', counts.Finalizado, '#19b8b0'],
    ['En gestión', counts['En gestión'], '#7968f4'],
    ['Pendiente', counts.Pendiente, '#f4a64d'],
    ['En riesgo', counts['En riesgo'], '#ed6b9a']
  ];
  document.querySelectorAll('.bars > div').forEach((row, index) => {
    const [label, value, color] = barData[index];
    const share = percent(value);
    row.querySelector('.bar-label span').textContent = label;
    row.querySelector('.bar-label b').innerHTML = `${pad(value)} <small>${share}%</small>`;
    const fill = row.querySelector('.bar-track span');
    fill.style.width = `${share}%`;
    fill.style.background = color;
  });

  const commandCards = document.querySelectorAll('.opportunity-command-grid > article');
  const commandData = [
    ['PIPELINE ACTIVO', active, 'oportunidades en curso', `${total} asignadas`],
    ['EN GESTIÓN', counts['En gestión'], 'con actividad reciente', 'Seguimiento'],
    ['RIESGO ALTO', counts['En riesgo'], 'requieren intervención', 'Prioridad'],
    ['AVANCE', `${percent(counts.Finalizado)}%`, 'casos finalizados', `${counts.Finalizado} cerrado`]
  ];
  commandCards.forEach((card, index) => {
    const data = commandData[index];
    card.querySelector('small').textContent = data[0];
    card.querySelector('strong').textContent = typeof data[1] === 'number' ? pad(data[1]) : data[1];
    card.querySelector('p').textContent = data[2];
    card.querySelector('em').textContent = data[3];
  });

  const pipeline = document.querySelector('.pipeline-donut');
  if (pipeline) {
    const finalEnd = percent(counts.Finalizado);
    const manageEnd = finalEnd + percent(counts['En gestión']);
    const pendingEnd = manageEnd + percent(counts.Pendiente);
    pipeline.style.background = `conic-gradient(#27d2cc 0 ${finalEnd}%,#785ff5 ${finalEnd}% ${manageEnd}%,#f6ae4b ${manageEnd}% ${pendingEnd}%,#ed6ba3 ${pendingEnd}% 100%)`;
    pipeline.querySelector('strong').textContent = pad(total);
  }
  const legendValues = [counts.Finalizado, counts['En gestión'], counts.Pendiente, counts['En riesgo']];
  document.querySelectorAll('.donut-legend em').forEach((item, index) => { item.textContent = `${percent(legendValues[index])}%`; });

  const withinSla = Math.max(0, total - counts['En riesgo']);
  const slaPercent = percent(withinSla);
  const sla = document.querySelector('.sla-donut');
  if (sla) {
    sla.style.background = `conic-gradient(#25d1c8 0 ${slaPercent}%,#313647 ${slaPercent}% 100%)`;
    sla.querySelector('strong').innerHTML = `${slaPercent}<span>%</span>`;
  }
  const slaMetrics = document.querySelectorAll('.metric-stack b');
  if (slaMetrics.length === 3) {
    slaMetrics[0].textContent = `${pad(withinSla)} casos`;
    slaMetrics[1].textContent = `${pad(Math.min(2, active))} casos`;
    slaMetrics[2].textContent = `${pad(Math.min(1, counts['En riesgo']))} caso`;
  }

  const systemValues = document.querySelectorAll('.system-status > div');
  if (systemValues[2]) systemValues[2].querySelector('b').textContent = `${slaPercent}%`;
  if (systemValues[3]) systemValues[3].querySelector('b').textContent = `${pad(counts['En riesgo'])} casos`;

  const activeList = list.filter(record => record.status !== 'Finalizado');
  const projects = activeList.reduce((result, record) => {
    result[record.project] = (result[record.project] || 0) + 1;
    return result;
  }, {});
  const projectEntries = Object.entries(projects).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  const readyToSend = activeList.filter(record => /PROMESA POR ENVIAR/i.test(record.business)).length;
  const linkedBanks = new Set(list.map(record => record.bank).filter(bank => bank && !/sin entidad|contado/i.test(bank)));
  const projectsTotal = document.getElementById('homeProjects');
  const readyTotal = document.getElementById('homeReady');
  const banksTotal = document.getElementById('homeBanks');
  if (projectsTotal) projectsTotal.textContent = projectEntries.length;
  if (readyTotal) readyTotal.textContent = pad(readyToSend);
  if (banksTotal) banksTotal.textContent = pad(linkedBanks.size);

  const projectBars = document.getElementById('projectBars');
  if (projectBars) {
    const maxProject = Math.max(...projectEntries.map(([, value]) => value), 1);
    projectBars.innerHTML = projectEntries.map(([name, value], index) => `<button type="button" class="project-row" data-project="${name}"><div><span><i>${String(index + 1).padStart(2, '0')}</i>${name}</span><b>${value}</b></div><div class="project-track"><span style="width:${Math.max(12, (value / maxProject) * 100)}%"></span></div></button>`).join('');
    projectBars.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openOpportunityView('project', button.dataset.project)));
  }

  const homeRing = document.getElementById('homeRing');
  if (homeRing) {
    const finalEnd = percent(counts.Finalizado);
    const manageEnd = finalEnd + percent(counts['En gestión']);
    const pendingEnd = manageEnd + percent(counts.Pendiente);
    homeRing.style.background = `conic-gradient(#27d2cc 0 ${finalEnd}%,#785ff5 ${finalEnd}% ${manageEnd}%,#f6ae4b ${manageEnd}% ${pendingEnd}%,#ed6ba3 ${pendingEnd}% 100%)`;
    homeRing.querySelector('strong').textContent = total;
  }
  const homeLegend = document.getElementById('homeStatusLegend');
  if (homeLegend) {
    const items = [['Finalizadas',counts.Finalizado,'cyan'],['En gestión',counts['En gestión'],'purple'],['Pendientes',counts.Pendiente,'amber'],['En riesgo',counts['En riesgo'],'pink']];
    homeLegend.innerHTML = items.map(([label,value,color]) => `<div><i class="${color}"></i><span>${label}</span><b>${pad(value)}</b><em>${percent(value)}%</em></div>`).join('');
  }
}

function syncOperationalSummary(record) {
  const fields = [
    ['detailValidator','Estado del negocio',record.business], ['detailMonth','Bloqueo 1',record.block1],
    ['detailCell','Bloqueo 2',record.block2], ['detailClosure','Entidad real de crédito',record.bank],
    ['detailCredits','Analista responsable',responsibleFor(record)]
  ];
  fields.forEach(([id,label,value]) => {
    const element = document.getElementById(id);
    if (element?.previousElementSibling) element.previousElementSibling.textContent = label;
    if (element) element.textContent = value;
  });
  $('#detailTag').innerHTML = tag(record.business);
}

function renderClientCard(record) {
  const paymentCard = document.querySelector('.payment-card');
  if (!paymentCard) return;
  document.querySelector('.client-card')?.remove();
  paymentCard.insertAdjacentHTML('afterend', `<div class="panel detail-card client-card"><div class="panel-head"><div><h2>Datos del cliente</h2><p>Información de contacto asociada a la oportunidad.</p></div><span class="client-demo">DATOS DE EJEMPLO</span></div><div class="client-grid"><label>Nombre completo<input data-client="name" disabled></label><label>Cédula<input data-client="id" disabled></label><label>Correo electrónico<input data-client="email" type="email" disabled></label><label>Teléfono<input data-client="phone" type="tel" disabled></label><label>Estado civil<input data-client="civil" disabled></label><label>Dirección<input data-client="address" disabled></label></div><div class="client-actions"><span class="client-edit-status">Información protegida</span><button type="button" class="outline small" id="editClient">✎ Editar datos</button></div></div>`);
  const card = document.querySelector('.client-card');
  const fields = [...card.querySelectorAll('[data-client]')];
  fields.forEach(field => { field.value = record.client[field.dataset.client] || ''; });
  const button = card.querySelector('#editClient');
  const status = card.querySelector('.client-edit-status');
  button.addEventListener('click', () => {
    const editing = card.classList.toggle('is-editing');
    fields.forEach(field => { field.disabled = !editing; });
    if (editing) {
      button.textContent = '✓ Guardar datos';
      status.textContent = 'Edición habilitada';
      fields[0]?.focus();
      return;
    }
    fields.forEach(field => { record.client[field.dataset.client] = field.value.trim(); });
    button.textContent = 'Guardado ✓';
    status.textContent = 'Datos actualizados';
    setTimeout(() => {
      if (!document.body.contains(button)) return;
      button.textContent = '✎ Editar datos';
      status.textContent = 'Información protegida';
    }, 1400);
  });
}

function drawTimeline(record) {
  const steps = branchSteps[record.branch] || branchSteps.send;
  const wrap = document.querySelector('.detail-timeline');
  if (!wrap) return;
  const flowName = record.branch === 'withdrawal' ? 'Desistimiento' : record.branch === 'credit' ? 'Cierre financiero y crédito' : record.branch === 'link' ? 'Vinculación fiduciaria' : 'Promesa de compraventa';
  wrap.innerHTML = `<div class="timeline-branch"><label><span>Estado de negocio</span><select id="businessStatus">${businessStates.map(state => `<option value="${state.name}">${state.name}</option>`).join('')}</select></label><small>Flujo activo: <b>${flowName}</b></small></div><div class="timeline-flow">${steps.map((name, index) => `${index ? `<div class="timeline-line ${index <= record.step ? 'filled' : ''}"></div>` : ''}<div class="timeline-step ${index < record.step ? 'done' : ''} ${index === record.step ? 'current' : ''}"><span>${index < record.step ? '✓' : index + 1}</span><b>${name}</b></div>`).join('')}</div>`;
  $('#businessStatus').value = record.business;
  $('#businessStatus').addEventListener('change', event => {
    const state = businessStates.find(item => item.name === event.target.value) || businessStates[0];
    Object.assign(record, {business:state.name, branch:state.branch, step:state.step});
    syncOperationalSummary(record);
    drawTimeline(record);
  });
}

const previousDetail = openDetail;
openDetail = function(op) {
  previousDetail(op);
  const record = records.find(item => item.op === op);
  if (!record) return;
  document.querySelector('.detail-timeline')?.remove();
  document.querySelector('.detail-heading')?.insertAdjacentHTML('afterend','<div class="detail-timeline"></div>');
  drawTimeline(record);
  $('#detailBlock1').innerHTML = realBlock1.map(value => `<option>${value}</option>`).join('');
  $('#detailBlock2').innerHTML = realBlock2.map(value => `<option>${value}</option>`).join('');
  $('#detailBank').innerHTML = ['Seleccionar entidad', ...realBanks].map(value => `<option>${value}</option>`).join('');
  $('#detailBlock1').value = record.block1;
  $('#detailBlock2').value = record.block2;
  $('#detailBank').value = record.bank;
  syncOperationalSummary(record);
  renderClientCard(record);
};

setOperationalTableHeaders();
document.querySelectorAll('[data-home-filter]').forEach(button => button.addEventListener('click', () => openOpportunityView(button.dataset.homeFilter)));
document.querySelector('nav a[data-page="opportunities"]')?.addEventListener('click', () => {
  resetOpportunityFilters(true);
  renderTable();
});
renderTable();
