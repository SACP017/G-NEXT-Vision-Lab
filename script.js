const records=[
{op:'788931',ref:'T5-405',validator:'Plan 2026 - No liberado',month:'2026-12',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En gestión',business:'PROMESA ENVIADA',block1:'Enviada - Pendiente Firma Promesa Por Parte De Cliente',block2:'Envío marconi 2',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'676840',ref:'CASA-137',validator:'Desistimientos',month:'2026-09',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En gestión',business:'PROMESA ENVIADA',block1:'Enviada - Pendiente Firma Promesa Por Parte De Cliente',block2:'Sin bloqueo adicional',bank:'BANCO AV VILLAS S.A.',priority:'Prioridad 2'},
{op:'670259',ref:'3-309',validator:'Plan 2026 - 2do Semestre',month:'2026-12',cell:'Créditos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'Pendiente',business:'SIN CIERRE FINANCIERO',block1:'Pendiente Radicar Crédito Y Subsidio',block2:'Envío marconi 1',bank:'BANCOLOMBIA S.A.',priority:'Prioridad 2'},
{op:'626109',ref:'14-303',validator:'Plan 2027 - 1er Semestre',month:'2027-03',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En riesgo',business:'SIN CIERRE FINANCIERO',block1:'Crédito Negado - Vencido',block2:'Envío marconi 1',bank:'BANCO DAVIVIENDA S.A.',priority:'Prioridad 2'},
{op:'741874',ref:'4-808',validator:'Plan 2026 - 2do Semestre',month:'2026-11',cell:'Créditos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'Pendiente',business:'SIN CIERRE FINANCIERO',block1:'Cliente No Ha Radicado Solicitud De Crédito A Banco',block2:'Sin bloqueo adicional',bank:'BANCOLOMBIA S.A.',priority:'Prioridad 2'},
{op:'435589',ref:'10-901',validator:'Plan 2027 - 1er Semestre',month:'2027-01',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'Pendiente',business:'CLIENTE PENDIENTE DE SOPORTE DE RECURSOS PROPIOS',block1:'Pendiente soporte pago última cuota',block2:'Sin bloqueo adicional',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'667255',ref:'3-609',validator:'Plan 2026 - 2do Semestre',month:'2026-12',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'Pendiente',business:'CLIENTE PENDIENTE DE SOPORTE DE RECURSOS PROPIOS',block1:'Pendiente soporte pago última cuota',block2:'Cliente localizado - 3 días - 3 llamadas por día',bank:'CONTADO CONFIRMADO',priority:'Prioridad 2'},
{op:'592022',ref:'2-305',validator:'Plan 2026 - 2do Semestre',month:'2026-11',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En gestión',business:'PROMESA ENVIADA',block1:'Enviada - Pendiente Firma Promesa Por Parte De Cliente',block2:'Envío marconi 2',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'660069',ref:'3-1610',validator:'Plan 2026 - 2do Semestre',month:'2026-12',cell:'Créditos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'Pendiente',business:'SIN CIERRE FINANCIERO',block1:'Pendiente respuesta PQRS',block2:'Envío marconi 1',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'796224',ref:'3-1601',validator:'Plan 2026 - 2do Semestre',month:'2026-12',cell:'Créditos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'Pendiente',business:'SIN CIERRE FINANCIERO',block1:'Pendiente Carta De Aprobación De Crédito',block2:'Sin bloqueo adicional',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'313375',ref:'2-1901',validator:'Plan 2026 - 2do Semestre',month:'2026-12',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En riesgo',business:'NEGOCIO EN RIESGO',block1:'Cliente no responde marconi',block2:'Envío marconi 1',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'315457',ref:'1-2012',validator:'Plan 2027 - 1er Semestre',month:'2027-02',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En riesgo',business:'DESISTIMIENTO EN PROCESO',block1:'Pendiente Envío Documentos Cliente Para Inicio De Desistimiento',block2:'Envío marconi 2',bank:'BANCO CAJA SOCIAL - BCSC S.A.',priority:'Prioridad 3'},
{op:'845199',ref:'1-810',validator:'Plan 2027 - 1er Semestre',month:'2027-01',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'Pendiente',business:'PENDIENTE VINCULACIÓN A LA FIDUCIARIA',block1:'Pendiente Vinculación De Cliente A La Fiduciaria',block2:'Sin bloqueo adicional',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'842460',ref:'1-811',validator:'Plan 2027 - 1er Semestre',month:'2027-01',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En gestión',business:'PENDIENTE TRÁMITE CON CARTERA',block1:'SharePoint cargado a cartera - en espera de gestión',block2:'Sin bloqueo adicional',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'845856',ref:'8-304',validator:'Plan 2027 - 1er Semestre',month:'2027-01',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En gestión',business:'CON CIERRE FINANCIERO - PROMESA POR ENVIAR',block1:'En proceso de envío',block2:'Sin bloqueo adicional',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'847610',ref:'CASA-95',validator:'Plan 2026 - 2do Semestre',month:'Habilitado',cell:'Envíos',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'En gestión',business:'CON CIERRE FINANCIERO - PROMESA POR ENVIAR',block1:'En proceso de envío',block2:'Sin bloqueo adicional',bank:'Sin entidad registrada',priority:'Prioridad 2'},
{op:'536348',ref:'CASA-120',validator:'Plan 2026 - 1er Semestre',month:'Habilitado',cell:'Finalizado',closure:'Wendy Luna',credits:'No aplica',calls:'No aplica',desist:'No aplica',risk:'No aplica',status:'Finalizado',business:'PROMESA CON CUMPLIMIENTO',block1:'Promesa con cumplimiento',block2:'Sin bloqueo adicional',bank:'Sin entidad registrada',priority:'Completado'}];
const profiles={admin:{label:'Administrador',area:'Todos',field:null},cierre:{label:'Asesor Cierre Financiero',area:'Cierre Financiero',field:'closure'},wendy:{label:'Wendy Luna',area:'Cierre Financiero',field:'closure',person:'Wendy Luna'},envio:{label:'Asesor Envío',area:'Envío de promesas',field:'calls'},linda:{label:'Linda Garcia',area:'Envío de promesas',field:'calls',person:'Linda Garcia'},creditos:{label:'Asesor Créditos',area:'Créditos',field:'credits'},aleja:{label:'Alejandra Marin',area:'Créditos',field:'credits',person:'Alejandra Marin'},desistimientos:{label:'Asesor Desistimientos',area:'Desistimientos',field:'desist'},jennifer:{label:'Jennifer Martinez',area:'Desistimientos',field:'desist',person:'Jennifer Martinez'},riesgos:{label:'Asesor Riesgos',area:'Riesgos',field:'risk'}};
let current='wendy';const $=s=>document.querySelector(s);const profile=()=>profiles[current];
function visible(){const p=profile();if(!p.field)return records;return records.filter(r=>{const v=r[p.field]||'';return p.person?v.toLowerCase().includes(p.person.toLowerCase()):v&&v.toLowerCase()!=='no aplica';});}
function tag(s){return `<span class="tag ${s==='Finalizado'?'final':s==='Pendiente'?'pending':'gestion'}">${s}</span>`;}
function renderTable(){const q=($('#search')?.value||$('#search2')?.value||'').toLowerCase();const list=visible().filter(r=>Object.values(r).join(' ').toLowerCase().includes(q));const html=list.map(r=>`<tr><td><button class="op-link" data-op="${r.op}">${r.op}</button></td><td>${r.ref}</td><td>${r.validator}</td><td>${r.month}</td><td>${r.cell}</td><td>${r.closure}</td><td>${tag(r.status)}</td><td>${current==='admin'?`<select class="assign" data-op="${r.op}"><option>${r.closure}</option><option>NGDS - Wendy Luna</option><option>NGDS - Tania Guzmán</option><option>NGDS - Santiago Ausique</option><option>NGDS - Alejandra Marin</option></select>`:'⋮'}</td></tr>`).join('');if($('#rows'))$('#rows').innerHTML=html;if($('#rows2'))$('#rows2').innerHTML=html;$('#total').textContent=list.length;$('.result-count').textContent=`${list.length} resultados`;$('#roleText').textContent=current==='admin'?'Todos los casos de la operación':`Casos asignados a ${profile().area}${profile().person?' · '+profile().person:''}`;document.querySelectorAll('.assign').forEach(el=>el.addEventListener('change',e=>{const r=records.find(x=>x.op===e.target.dataset.op);r.closure=e.target.value;renderTable();}));document.querySelectorAll('.op-link').forEach(el=>el.addEventListener('click',()=>openDetail(el.dataset.op)));}
function setPage(page){document.querySelectorAll('.page').forEach(x=>x.classList.toggle('hidden',x.dataset.page!==page));document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('active',x.dataset.page===page));if(page==='opportunities')renderTable();}
function openDetail(op){const r=records.find(x=>x.op===op);if(!r)return;$('#detailOp').textContent='#'+r.op;$('#detailTitle').textContent=`Oportunidad #${r.op}`;$('#detailSubtitle').textContent=`Referencia ${r.ref} · ${r.validator}`;$('#detailRef').textContent=r.ref;$('#detailValidator').textContent=r.validator;$('#detailMonth').textContent=r.month;$('#detailCell').textContent=r.cell;$('#detailClosure').textContent=r.closure;$('#detailCredits').textContent=r.credits;$('#detailTag').innerHTML=tag(r.status);setPage('detail');}
$('#profile')?.addEventListener('change',e=>{current=e.target.value;renderTable();});$('#search')?.addEventListener('input',renderTable);$('#search2')?.addEventListener('input',renderTable);$('#backToList')?.addEventListener('click',()=>setPage('opportunities'));document.querySelectorAll('nav a[data-page]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();setPage(a.dataset.page);}));document.querySelectorAll('.marconi').forEach(b=>b.addEventListener('click',()=>{$('#marconiToast').textContent=`${b.dataset.marconi} preparado para la oportunidad seleccionada. Acción simulada.`;$('#marconiToast').classList.add('toast-ok');}));renderTable();const initialPage={'#oportunidades':'opportunities','#reportes':'reports'}[location.hash]||'dashboard';setPage(initialPage);

const userMenu=document.querySelector('.user-mini[data-page="user"]');const profileForm=$('#profileForm');const editProfile=$('#editProfile');const profileActions=$('#profileActions');const profileToast=$('#profileToast');
userMenu?.addEventListener('click',()=>setPage('user'));
editProfile?.addEventListener('click',()=>{profileForm.classList.add('is-editing');profileForm.querySelectorAll('input,select').forEach(field=>field.disabled=false);profileActions.classList.remove('hidden');editProfile.classList.add('hidden');profileToast.classList.remove('show');profileForm.querySelector('input')?.focus();});
$('#cancelEdit')?.addEventListener('click',()=>{profileForm.reset();profileForm.classList.remove('is-editing');profileForm.querySelectorAll('input,select').forEach(field=>field.disabled=true);profileActions.classList.add('hidden');editProfile.classList.remove('hidden');});
profileForm?.addEventListener('submit',event=>{event.preventDefault();profileForm.classList.remove('is-editing');profileForm.querySelectorAll('input,select').forEach(field=>field.disabled=true);profileActions.classList.add('hidden');editProfile.classList.remove('hidden');profileToast.textContent='Cambios guardados correctamente.';profileToast.classList.add('show');});
$('#changePhoto')?.addEventListener('click',()=>{profileToast.textContent='La carga de una nueva foto estará disponible al conectar el perfil corporativo.';profileToast.classList.add('show');});
$('#securityButton')?.addEventListener('click',()=>{profileToast.textContent='Tu cuenta está protegida y la verificación en dos pasos está activa.';profileToast.classList.add('show');});

const themeToggle=$('#themeToggle');
function applyTheme(theme){
  const isLight=theme==='light';
  document.body.classList.toggle('light-mode',isLight);
  themeToggle?.setAttribute('aria-pressed',String(isLight));
  themeToggle?.setAttribute('aria-label',isLight?'Cambiar a modo oscuro':'Cambiar a modo claro');
  if(themeToggle){
    themeToggle.querySelector('.theme-toggle-icon').textContent=isLight?'◐':'☼';
    themeToggle.querySelector('.theme-label').textContent=isLight?'Modo oscuro':'Modo claro';
    themeToggle.querySelector('em').textContent=isLight?'ON':'OFF';
  }
}
let savedTheme='dark';
try{savedTheme=localStorage.getItem('gnext-theme')||'dark';}catch(error){}
applyTheme(savedTheme);
themeToggle?.addEventListener('click',()=>{
  const nextTheme=document.body.classList.contains('light-mode')?'dark':'light';
  applyTheme(nextTheme);
  try{localStorage.setItem('gnext-theme',nextTheme);}catch(error){}
});

const sidebarToggle=$('#sidebarToggle');
const setSidebarState=collapsed=>{document.body.classList.toggle('sidebar-collapsed',collapsed);sidebarToggle?.setAttribute('aria-expanded',String(!collapsed));sidebarToggle?.setAttribute('aria-label',collapsed?'Expandir menú lateral':'Contraer menú lateral');};
setSidebarState(localStorage.getItem('gnext-sidebar')==='collapsed');
sidebarToggle?.addEventListener('click',()=>{const collapsed=!document.body.classList.contains('sidebar-collapsed');setSidebarState(collapsed);localStorage.setItem('gnext-sidebar',collapsed?'collapsed':'expanded');});

if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
  document.querySelectorAll('.metric,.content-grid>.panel,.opportunity-command-grid>.panel,.report-card-3d,.home-kpi,.home-grid>.panel').forEach(card=>{
    card.classList.add('tilt-card');
    card.addEventListener('mousemove',event=>{const rect=card.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;card.style.setProperty('--ry',`${x*4.5}deg`);card.style.setProperty('--rx',`${y*-4.5}deg`);card.classList.add('is-tilting');});
    card.addEventListener('mouseleave',()=>{card.style.setProperty('--ry','0deg');card.style.setProperty('--rx','0deg');card.classList.remove('is-tilting');});
  });
}

(() => {
  const canUseTrail = !matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!canUseTrail) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'cursorTrail';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const context = canvas.getContext('2d');
  const particles = [];
  let width = 0;
  let height = 0;
  let ratio = 1;
  let previousX = -100;
  let previousY = -100;
  let lastSpawn = 0;

  function resizeTrail() {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function addParticle(x, y, strength = 1) {
    particles.push({
      x,
      y,
      radius: 3.1 + Math.random() * 2.5,
      life: 1,
      decay: .022 + Math.random() * .01,
      driftX: (Math.random() - .5) * .2,
      driftY: -.08 - Math.random() * .16,
      strength
    });
    if (particles.length > 95) particles.shift();
  }

  window.addEventListener('mousemove', event => {
    const now = performance.now();
    const distance = Math.hypot(event.clientX - previousX, event.clientY - previousY);
    if (distance < 5 && now - lastSpawn < 22) return;
    const steps = Math.min(3, Math.max(1, Math.floor(distance / 18)));
    for (let step = 0; step < steps; step += 1) {
      const progress = (step + 1) / steps;
      addParticle(
        previousX < 0 ? event.clientX : previousX + (event.clientX - previousX) * progress,
        previousY < 0 ? event.clientY : previousY + (event.clientY - previousY) * progress,
        .82 + progress * .18
      );
    }
    previousX = event.clientX;
    previousY = event.clientY;
    lastSpawn = now;
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => {
    previousX = -100;
    previousY = -100;
  });
  window.addEventListener('resize', resizeTrail, { passive: true });

  function renderTrail() {
    context.clearRect(0, 0, width, height);
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.life -= particle.decay;
      if (particle.life <= 0) {
        particles.splice(index, 1);
        continue;
      }
      particle.x += particle.driftX;
      particle.y += particle.driftY;
      const radius = particle.radius * particle.life;
      const glow = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius * 3.3);
      glow.addColorStop(0, `rgba(34, 197, 199, ${particle.life * .28 * particle.strength})`);
      glow.addColorStop(.35, `rgba(34, 197, 199, ${particle.life * .12})`);
      glow.addColorStop(1, 'rgba(34, 197, 199, 0)');
      context.fillStyle = glow;
      context.beginPath();
      context.arc(particle.x, particle.y, radius * 3.3, 0, Math.PI * 2);
      context.fill();
    }
    requestAnimationFrame(renderTrail);
  }

  resizeTrail();
  requestAnimationFrame(renderTrail);
})();
