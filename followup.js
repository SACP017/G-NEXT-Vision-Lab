const followupMarkup = () => `<div class="panel detail-card followup-panel">
  <div class="panel-head"><div><h2>Seguimiento de la oportunidad</h2><p>Actualiza los datos operativos y deja trazabilidad del caso.</p></div><span class="counter">Editable</span></div>
  <div class="tracking-grid">
    <label>Bloqueo 1<select id="detailBlock1"></select></label>
    <label>Bloqueo 2<select id="detailBlock2"></select></label>
    <label>Fecha de envío de promesa<input id="detailSent" type="date" /></label>
    <label>Fecha de gestión<input id="detailManaged" type="date" /></label>
    <label class="wide-field">Entidad real de crédito<select id="detailBank"></select></label>
    <label class="wide-field">Nueva observación<textarea id="detailNote" rows="3" placeholder="Escribe el avance, bloqueo o próximo paso..."></textarea></label>
  </div>
  <div class="history-head"><b>Historial de observaciones</b><span id="historyCount">2 registros</span></div>
  <div class="observation-history" id="observationHistory">
    <div class="observation"><span class="history-avatar">SA</span><div><b>Validación de documentos completada</b><p>Se revisó la información disponible y se dejó lista para gestión.</p><small>Sebastián A. · Hoy, 9:42 a. m.</small></div></div>
    <div class="observation"><span class="history-avatar teal-avatar">NG</span><div><b>Seguimiento de promesa solicitado</b><p>Cliente pendiente de confirmar firma del documento.</p><small>Equipo NGDS · Ayer, 3:18 p. m.</small></div></div>
  </div>
  <div class="save-status" id="saveStatus" aria-live="polite">
    <div class="save-status-copy"><span class="sync-icon">✓</span><div><b id="saveStatusTitle">Listo para guardar</b><small id="saveStatusText">La actualización se simulará en Oracle y Tracking Tools.</small></div></div>
    <div class="save-progress" aria-hidden="true"><i></i></div>
  </div>
  <button class="primary save-followup" id="saveFollowup">Guardar seguimiento</button>
</div>`;

const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const originalOpenDetail = openDetail;

openDetail = function(op) {
  originalOpenDetail(op);
  const record = records.find(item => item.op === op);
  const host = document.querySelector('.detail-layout > div');
  if (!host || !record) return;

  document.querySelector('.followup-panel')?.remove();
  host.insertAdjacentHTML('afterbegin', followupMarkup());
  $('#detailSent').value = record.sent || '';
  $('#detailManaged').value = record.managed || '';

  const notes = record.notes || [];
  if (notes.length) {
    $('#observationHistory').insertAdjacentHTML('afterbegin', notes.slice().reverse().map(note => `<div class="observation new-observation"><span class="history-avatar">SA</span><div><b>${escapeHtml(note.text)}</b><p>Observación sincronizada desde la ficha de oportunidad.</p><small>Sebastián A. · ${escapeHtml(note.when || 'Ahora')}</small></div></div>`).join(''));
    $('#historyCount').textContent = `${notes.length + 2} registros`;
  }

  $('#saveFollowup').addEventListener('click', () => {
    const button = $('#saveFollowup');
    if (button.dataset.saving === 'true') return;
    button.dataset.saving = 'true';
    button.disabled = true;
    button.textContent = 'Guardando…';
    const status = $('#saveStatus');
    status.className = 'save-status is-saving';
    $('#saveStatusTitle').textContent = 'Guardando notas en Oracle…';
    $('#saveStatusText').textContent = 'Registrando bloqueos, fechas, entidad y observación.';

    setTimeout(() => {
      if (!document.body.contains(status)) return;
      $('#saveStatusTitle').textContent = 'Dejando observación en Tracking Tools…';
      $('#saveStatusText').textContent = 'Replicando la trazabilidad para el seguimiento del analista.';
    }, 5000);

    setTimeout(() => {
      if (!document.body.contains(status)) return;
      record.block1 = $('#detailBlock1').value;
      record.block2 = $('#detailBlock2').value;
      record.sent = $('#detailSent').value;
      record.managed = $('#detailManaged').value;
      record.bank = $('#detailBank').value;
      const text = $('#detailNote').value.trim();
      if (text) {
        record.notes = record.notes || [];
        record.notes.push({text, when: 'Ahora'});
        $('#observationHistory').insertAdjacentHTML('afterbegin', `<div class="observation new-observation"><span class="history-avatar">SA</span><div><b>${escapeHtml(text)}</b><p>Observación guardada en Oracle y Tracking Tools.</p><small>Sebastián A. · Ahora</small></div></div>`);
        $('#detailNote').value = '';
        $('#historyCount').textContent = `${record.notes.length + 2} registros`;
      }
      if (typeof syncOperationalSummary === 'function') syncOperationalSummary(record);
      status.className = 'save-status is-saved';
      $('#saveStatusTitle').textContent = 'Guardado correctamente';
      $('#saveStatusText').textContent = 'Notas registradas en Oracle y observación creada en Tracking Tools.';
      button.textContent = 'Guardado ✓';
      button.dataset.saving = 'false';
      setTimeout(() => {
        if (!document.body.contains(button)) return;
        button.disabled = false;
        button.textContent = 'Guardar seguimiento';
      }, 1800);
    }, 10000);
  });
};
