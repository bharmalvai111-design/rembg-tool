import { RAILWAY_API_URL, SANDBOX_FILE_PATH } from './config.js';

const fileInput = document.getElementById('fileInput');
const btnRemove = document.getElementById('btnRemove');
const btnAuto = document.getElementById('btnAuto');
const inputPreview = document.getElementById('inputPreview');
const outputPreview = document.getElementById('outputPreview');

btnRemove.addEventListener('click', async () => {
  const f = fileInput.files[0];
  if (!f) return alert('Please select a file first.');
  inputPreview.src = URL.createObjectURL(f);
  await sendBlobToApi(f);
});

btnAuto.addEventListener('click', async () => {
  try {
    const res = await fetch(SANDBOX_FILE_PATH);
    if (!res.ok) throw new Error('Auto file not available in this browser');
    const blob = await res.blob();
    inputPreview.src = URL.createObjectURL(blob);
    await sendBlobToApi(blob);
  } catch (e) {
    alert('Auto file fetch failed: ' + e.message + '\nUse a local file instead.');
  }
});

async function sendBlobToApi(blob) {
  if (!RAILWAY_API_URL || RAILWAY_API_URL.includes('REPLACE_WITH')) {
    return alert('Please set RAILWAY_API_URL in config.js to your Railway app URL.');
  }
  try {
    const fd = new FormData();
    fd.append('image', blob, 'input.png');
    const res = await fetch(RAILWAY_API_URL + '/remove', { method: 'POST', body: fd });
    if (!res.ok) {
      const text = await res.text();
      throw new Error('Server returned ' + res.status + ': ' + text);
    }
    const out = await res.blob();
    outputPreview.src = URL.createObjectURL(out);
  } catch (err) {
    alert('Request failed: ' + err.message);
  }
}