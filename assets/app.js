/* KeyAtlas — app.js */

'use strict';

// ── Tab switching ─────────────────────────────────────────────────────────

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');
    // clear search when switching tabs
    document.getElementById('search').value = '';
    document.querySelectorAll('.key-card').forEach(c => c.classList.remove('hidden'));
  });
});

// ── Integration guide tabs ────────────────────────────────────────────────

document.querySelectorAll('.int-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.int-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.int-panel').forEach(p => p.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById('int-' + btn.dataset.int).classList.remove('hidden');
  });
});

// ── Copy to clipboard ─────────────────────────────────────────────────────

function copyText(text, btn) {
  // Decode HTML entities so we copy the raw text
  const decoded = text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  navigator.clipboard.writeText(decoded).then(() => {
    const original = btn.textContent;
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    showToast();
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback for environments where clipboard API is unavailable
    const el = document.createElement('textarea');
    el.value = decoded;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    btn.textContent = '✓';
    btn.classList.add('copied');
    showToast();
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

// Per-key copy buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => copyText(btn.dataset.copy, btn));
});

// Copy all shell template
document.getElementById('copy-all-btn').addEventListener('click', function() {
  const text = document.getElementById('shell-template').textContent;
  copyText(text, this);
});

// Copy subfinder template
document.getElementById('copy-subfinder-btn').addEventListener('click', function() {
  const text = document.getElementById('subfinder-template').textContent;
  copyText(text, this);
});

// ── Toast ─────────────────────────────────────────────────────────────────

let toastTimer = null;

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 1800);
}

// ── Live Search ───────────────────────────────────────────────────────────

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();

  if (!q) {
    // restore all tabs and cards
    document.querySelectorAll('.key-card').forEach(c => c.classList.remove('hidden'));
    return;
  }

  // Show all panels so search results span all tabs
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('hidden'));

  // Filter cards
  document.querySelectorAll('.key-card').forEach(card => {
    const searchText = (card.dataset.search || '') + ' ' + card.textContent.toLowerCase();
    card.classList.toggle('hidden', !searchText.includes(q));
  });
});

// Clear search on Escape
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    // restore active tab state
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    const activeBtn = document.querySelector('.tab-btn');
    if (activeBtn) {
      activeBtn.classList.add('active');
      const id = 'tab-' + activeBtn.dataset.tab;
      const panel = document.getElementById(id);
      if (panel) panel.classList.remove('hidden');
    }
  }
});
