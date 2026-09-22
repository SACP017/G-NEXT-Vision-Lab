(() => {
  const reportsLink = document.querySelector('nav a[data-page="reports"]');
  const reportsPage = document.querySelector('.page[data-page="reports"]');
  if (!reportsLink || !reportsPage) return;

  reportsLink.insertAdjacentHTML('beforebegin','<a href="#envio-promesas" data-page="promise-shipping"><span>✉</span> Envío de promesas</a>');
  reportsPage.insertAdjacentHTML('beforebegin', `<div class="page hidden" data-page="promise-shipping">
    <section class="promise-simple" aria-labelledby="promisePageTitle">
      <h2 id="promisePageTitle">Envío de Promesas</h2>
      <form id="promiseSimpleForm">
        <label for="promiseOpportunity">Número de Oportunidad<b>*</b></label>
        <input id="promiseOpportunity" name="opportunity" inputmode="numeric" value="1234567" autocomplete="off">
        <div class="promise-simple-actions"><button type="submit" class="promise-validate">Validar</button><button type="button" class="promise-cancel" id="cancelPromise">Cancelar</button></div>
      </form>
    </section>
  </div>`);

  const navLink = document.querySelector('nav a[data-page="promise-shipping"]');
  const form = document.getElementById('promiseSimpleForm');
  const field = document.getElementById('promiseOpportunity');
  const saveChangesButton = document.querySelector('.page[data-page="detail"] .detail-actions .primary');
  saveChangesButton?.insertAdjacentHTML('beforebegin', '<button class="outline small promise-detail-action" id="openPromiseShipping" type="button">✉ Envío de promesas</button>');
  navLink.addEventListener('click', event => {
    event.preventDefault();
    setPage('promise-shipping');
    history.replaceState(null,'','#envio-promesas');
  });
  document.querySelectorAll('nav a[data-page]').forEach(link => link.addEventListener('click',() => {
    const hash = link.getAttribute('href');
    if (hash?.startsWith('#')) history.replaceState(null,'',hash);
  }));
  form.addEventListener('submit', event => event.preventDefault());
  document.getElementById('cancelPromise').addEventListener('click',() => {
    field.value = '';
    field.focus();
  });
  document.getElementById('openPromiseShipping')?.addEventListener('click', () => {
    const opportunity = document.getElementById('detailOp')?.textContent?.replace(/\D/g, '') || '';
    field.value = opportunity;
    setPage('promise-shipping');
    history.replaceState(null, '', '#envio-promesas');
    window.scrollTo({top: 0, behavior: 'smooth'});
    window.setTimeout(() => field.focus(), 250);
  });
  if (location.hash === '#envio-promesas') setPage('promise-shipping');
})();
