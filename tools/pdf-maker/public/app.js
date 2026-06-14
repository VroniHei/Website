'use strict';

// ── State ────────────────────────────────────────────────────────────────────
let selectedFile = null;
let currentJob   = null; // AbortController for active SSE

// ── Element-Refs ─────────────────────────────────────────────────────────────
const uploadZone   = document.getElementById('upload-zone');
const fileInput    = document.getElementById('file-input');
const uploadTitle  = document.getElementById('upload-title');
const uploadSub    = document.getElementById('upload-sub');
const btnCreate    = document.getElementById('btn-create');
const progressCard = document.getElementById('progress-card');
const stepsEl      = document.getElementById('steps');
const errorBanner  = document.getElementById('error-banner');
const errorText    = document.getElementById('error-text');
const btnRetry     = document.getElementById('btn-retry');
const downloadCard = document.getElementById('download-card');
const dlName       = document.getElementById('dl-name');
const dlMeta       = document.getElementById('dl-meta');
const dlLink       = document.getElementById('dl-link');
const statusPill   = document.getElementById('status-pill');
const statusText   = document.getElementById('status-text');

// ── Qualitäts-Hinweise ───────────────────────────────────────────────────────
const QUALITY_HINTS = {
  web:     '72–96 dpi · kleine Datei, schnell',
  print:   '120 dpi · ausgewogen für den Druck',
  archive: '300 dpi · höchste Qualität, große Datei',
};

const PAGESIZE_HINTS = {
  A4:       'A4 · 210 × 297 mm, gängigstes Format',
  A5:       'A5 · 148 × 210 mm, kompakt',
  original: 'Behält das Format des Dokuments bei',
  custom:   'Eigene Maße in Millimetern eingeben',
};

// ── Segmented Controls (Qualität, Format, Feldschrift) ───────────────────────
function setSeg(groupId, value) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.seg-opt').forEach(opt => {
    const active = opt.dataset.value === value;
    opt.classList.toggle('active', active);
    const radio = opt.querySelector('input[type="radio"]');
    if (radio) radio.checked = active;
  });
}
function getSeg(name, fallback) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
}
function setQuality(value) {
  setSeg('presets', value);
  const hint = document.getElementById('quality-hint');
  if (hint) hint.textContent = QUALITY_HINTS[value] || '';
}
function setFieldSize(value) {
  setSeg('fieldsize-seg', value);
}
function setPageSize(value) {
  const sel = document.getElementById('pagesize-select');
  if (sel) sel.value = value;
  const hint = document.getElementById('pagesize-hint');
  if (hint) hint.textContent = PAGESIZE_HINTS[value] || 'A4 ist das gängigste Format';
  const custom = document.getElementById('custom-size');
  if (custom) custom.hidden = value !== 'custom';
}

[['presets', 'quality'], ['fieldsize-seg', 'fieldsize']].forEach(([groupId, name]) => {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.addEventListener('click', e => {
    const opt = e.target.closest('.seg-opt');
    if (!opt) return;
    if (name === 'quality') setQuality(opt.dataset.value);
    else setFieldSize(opt.dataset.value);
    saveSettings();
  });
});

// Format-Dropdown
const pagesizeSelect = document.getElementById('pagesize-select');
if (pagesizeSelect) pagesizeSelect.addEventListener('change', () => { setPageSize(pagesizeSelect.value); saveSettings(); });

// Custom-Maße: bei Eingabe speichern
['custom-w', 'custom-h'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', saveSettings);
});

// ── Settings persistieren ────────────────────────────────────────────────────
const STORAGE_KEY = 'il-pdf-maker-settings';

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (s.quality)         setQuality(s.quality);
    if (s.formFields  != null) document.getElementById('opt-formfields').checked = s.formFields;
    if (s.links       != null) document.getElementById('opt-links').checked       = s.links;
    if (s.copyButtons != null) document.getElementById('opt-copy').checked        = s.copyButtons;
    if (s.linearize   != null) document.getElementById('opt-linearize').checked   = s.linearize;
    if (s.highlight   != null) document.getElementById('opt-highlight').checked   = s.highlight;
    if (s.accessible  != null) document.getElementById('opt-accessible').checked  = s.accessible;
    if (s.pageSize)        setPageSize(s.pageSize);
    if (s.customW != null) document.getElementById('custom-w').value               = s.customW;
    if (s.customH != null) document.getElementById('custom-h').value               = s.customH;
    if (s.fieldSize)       setFieldSize(String(s.fieldSize));
    if (s.title)           document.getElementById('meta-title').value             = s.title;
    if (s.author)          document.getElementById('meta-author').value            = s.author;
    if (s.description)     document.getElementById('meta-description').value        = s.description;
    if (s.copyright)       document.getElementById('meta-copyright').value          = s.copyright;
    if (s.lang)            document.getElementById('meta-lang').value              = s.lang;
  } catch {}
}

function saveSettings() {
  const s = {
    quality:     getSeg('quality', 'web'),
    formFields:  document.getElementById('opt-formfields').checked,
    highlight:   document.getElementById('opt-highlight').checked,
    links:       document.getElementById('opt-links').checked,
    copyButtons: document.getElementById('opt-copy').checked,
    linearize:   document.getElementById('opt-linearize').checked,
    accessible:  document.getElementById('opt-accessible').checked,
    pageSize:    document.getElementById('pagesize-select').value,
    customW:     document.getElementById('custom-w').value,
    customH:     document.getElementById('custom-h').value,
    fieldSize:   getSeg('fieldsize', '9.5'),
    title:       document.getElementById('meta-title').value,
    author:      document.getElementById('meta-author').value,
    description: document.getElementById('meta-description').value,
    copyright:   document.getElementById('meta-copyright').value,
    lang:        document.getElementById('meta-lang').value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function getSettings() {
  return {
    quality:     getSeg('quality', 'web'),
    formFields:  document.getElementById('opt-formfields').checked,
    highlightFields: document.getElementById('opt-highlight').checked,
    links:       document.getElementById('opt-links').checked,
    copyButtons: document.getElementById('opt-copy').checked,
    linearize:   document.getElementById('opt-linearize').checked,
    accessible:  document.getElementById('opt-accessible').checked,
    pageSize:    document.getElementById('pagesize-select').value,
    customWidth:  parseFloat(document.getElementById('custom-w').value) || undefined,
    customHeight: parseFloat(document.getElementById('custom-h').value) || undefined,
    fieldFontSize: parseFloat(getSeg('fieldsize', '9.5')),
    metadata: {
      title:       document.getElementById('meta-title').value || undefined,
      author:      document.getElementById('meta-author').value || undefined,
      description: document.getElementById('meta-description').value || undefined,
      copyright:   document.getElementById('meta-copyright').value || undefined,
      lang:        document.getElementById('meta-lang').value,
    },
  };
}

// Alle anderen Settings-Inputs
document.querySelectorAll('.field-input, .field-select, .chip input').forEach(el => {
  el.addEventListener('change', saveSettings);
});

// Info-Tooltips: Klick auf das Chip-ⓘ darf das Häkchen nicht umschalten
document.querySelectorAll('.info-btn').forEach(btn => {
  btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); });
});

// ── Metadaten-Akkordeon ──────────────────────────────────────────────────────
const metaHeader = document.getElementById('meta-header');
if (metaHeader) metaHeader.addEventListener('click', () => metaHeader.classList.toggle('open'));

// ── Upload-Zone ──────────────────────────────────────────────────────────────
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', e => {
  e.preventDefault();
  uploadZone.classList.add('drag-over');
});
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) setFile(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) setFile(fileInput.files[0]);
});

function setFile(file) {
  const isHtml = /\.html?$/i.test(file.name) || file.type === 'text/html';
  const isMd   = /\.(md|markdown)$/i.test(file.name) || file.type === 'text/markdown';
  if (!isHtml && !isMd) {
    showError('Bitte eine HTML- oder Markdown-Datei auswählen.');
    return;
  }
  selectedFile = file;
  uploadZone.classList.add('has-file');
  uploadTitle.innerHTML = `<div class="upload-filename">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    ${file.name}
  </div>`;
  uploadSub.textContent = formatBytes(file.size) + (isMd ? ' · Markdown · Editorial-Stil' : '');
  // Bei Markdown sind interaktive Optionen nicht relevant — Hinweis ist im UI.
  document.body.classList.toggle('is-markdown', isMd);
  updateCreateBtn();
}

function updateCreateBtn() {
  btnCreate.disabled = !selectedFile;
}

// ── Datei auswählen (öffnet den nativen Datei-Dialog) ─────────────────────────
// Der native Picker merkt sich auf dem Mac den zuletzt genutzten Ordner
// (z.B. Downloads). Die gewählte Datei landet direkt im Upload-Feld.
const btnPickFile = document.getElementById('btn-pick-file');
if (btnPickFile) {
  btnPickFile.addEventListener('click', (e) => {
    e.stopPropagation(); // sonst feuert auch der Upload-Zone-Klick
    fileInput.click();
  });
}

// ── Status-Pill ──────────────────────────────────────────────────────────────
function setStatus(state, text) {
  statusPill.className = 'status-pill' + (state === 'error' ? ' error' : '');
  statusText.textContent = text;
}

// ── Fortschritts-Schritte ─────────────────────────────────────────────────────
const STEP_ORDER = ['browser', 'extract', 'render', 'compress', 'acroform', 'linearize', 'done'];

function resetSteps() {
  stepsEl.querySelectorAll('.step-row').forEach(row => {
    row.className = 'step-row pending';
    row.querySelector('.step-msg').textContent = '';
    row.querySelector('.step-time').textContent = '';
  });
}

function activateStep(stepKey, msg) {
  const row = stepsEl.querySelector(`[data-step="${stepKey}"]`);
  if (!row) return;
  row.style.display = '';
  row.className = 'step-row running';
  if (msg) row.querySelector('.step-msg').textContent = msg;
  row.querySelector('.step-icon').innerHTML = '<div class="spinner"></div>';
}

function completeStep(stepKey, msg, elapsed) {
  const row = stepsEl.querySelector(`[data-step="${stepKey}"]`);
  if (!row) return;
  row.style.display = '';
  row.className = 'step-row done';
  if (msg) row.querySelector('.step-msg').textContent = msg;
  if (elapsed != null) row.querySelector('.step-time').textContent = `${(elapsed/1000).toFixed(1)}s`;
  row.querySelector('.step-icon').textContent = '✓';
}

function failStep(stepKey, msg) {
  const row = stepsEl.querySelector(`[data-step="${stepKey}"]`);
  if (!row) return;
  row.className = 'step-row error';
  if (msg) row.querySelector('.step-msg').textContent = msg;
  row.querySelector('.step-icon').textContent = '✕';
}

// ── Fehler-Anzeige ────────────────────────────────────────────────────────────
function showError(msg) {
  errorText.textContent = msg;
  errorBanner.classList.add('visible');
  downloadCard.classList.remove('visible');
  setStatus('error', 'Fehler');
}

function hideError() { errorBanner.classList.remove('visible'); }

btnRetry.addEventListener('click', () => {
  hideError();
  startConversion();
});

// ── Konvertierung ─────────────────────────────────────────────────────────────
btnCreate.addEventListener('click', startConversion);

const BTN_CREATE_HTML = btnCreate.innerHTML;
function setBtnLoading(on) {
  if (on) {
    btnCreate.classList.add('loading');
    btnCreate.disabled = true;
    btnCreate.innerHTML = '<span class="spinner spinner--dark"></span> PDF wird erstellt …';
  } else {
    btnCreate.classList.remove('loading');
    btnCreate.innerHTML = BTN_CREATE_HTML;
    updateCreateBtn();
  }
}

function startConversion() {
  saveSettings();
  hideError();
  downloadCard.classList.remove('visible');
  progressCard.classList.add('visible');
  resetSteps();
  setBtnLoading(true);
  setStatus('', 'Wird erstellt…');

  // Fortschritt sichtbar machen — sonst startet er unterhalb des Sichtfelds.
  requestAnimationFrame(() => {
    progressCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const settings = getSettings();

  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('settings', JSON.stringify(settings));
  startSSE(formData);
}

function startSSE(formData) {
  // POST mit FormData über XMLHttpRequest + SSE-ähnlichem Streaming
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/convert');
  xhr.setRequestHeader('Accept', 'text/event-stream');

  let buffer = '';
  let lastActiveStep = null;

  xhr.onprogress = () => {
    const newText = xhr.responseText.slice(buffer.length);
    buffer = xhr.responseText;
    const lines = newText.split('\n');
    let eventName = null;
    for (const line of lines) {
      if (line.startsWith('event: '))  { eventName = line.slice(7).trim(); continue; }
      if (line.startsWith('data: ')) {
        try {
          const d = JSON.parse(line.slice(6));
          handleEvent(eventName || 'progress', d);
          eventName = null;
        } catch {}
      }
    }
  };

  xhr.onload = () => { setBtnLoading(false); };

  xhr.onerror = () => {
    showError('Server nicht erreichbar.');
    setBtnLoading(false);
  };

  currentJob = xhr;
  xhr.send(formData);

  function handleEvent(name, data) {
    if (name === 'progress') {
      const step = data.step;
      if (!step) return;

      if (lastActiveStep && lastActiveStep !== step) {
        completeStep(lastActiveStep, '', data.elapsed);
      }

      if (step === 'fetch') {
        activateStep('fetch', data.msg || 'Handoff wird abgerufen…');
      } else {
        activateStep(step, data.msg);
      }
      lastActiveStep = step;

    } else if (name === 'done') {
      if (lastActiveStep) completeStep(lastActiveStep, '');
      completeStep('done', 'PDF erfolgreich erstellt');

      const { jobId, filename, size, pages, fields, links, buttons } = data;
      dlName.textContent = filename || 'dokument-interaktiv.pdf';

      const parts = [];
      if (size)    parts.push(formatBytes(size));
      if (pages)   parts.push(`${pages} Seiten`);
      if (fields)  parts.push(`${fields} Felder`);
      if (buttons) parts.push(`${buttons} Copy-Buttons`);
      dlMeta.textContent = parts.join(' · ');

      dlLink.href = `/api/download/${jobId}`;
      dlLink.setAttribute('download', filename || 'dokument.pdf');
      downloadCard.classList.add('visible');

      setStatus('', 'Fertig');
      setBtnLoading(false);
      requestAnimationFrame(() => downloadCard.scrollIntoView({ behavior: 'smooth', block: 'center' }));

    } else if (name === 'error') {
      if (lastActiveStep) failStep(lastActiveStep, data.message);
      showError(data.message || 'Unbekannter Fehler');
      setBtnLoading(false);
    }
  }
}

// ── Health-Check beim Start ───────────────────────────────────────────────────
async function checkHealth() {
  try {
    const r = await fetch('/health');
    const h = await r.json();
    if (!h.gs)          setStatus('error', 'Ghostscript fehlt');
    else if (!h.playwright) setStatus('error', 'Playwright fehlt');
    else                setStatus('', 'Bereit');
  } catch {
    setStatus('error', 'Server offline');
  }
}

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────
function formatBytes(b) {
  if (!b) return '';
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  return (b / (1024 * 1024)).toFixed(2) + ' MB';
}

// ── Init ──────────────────────────────────────────────────────────────────────
loadSettings();
checkHealth();
resetSteps();
