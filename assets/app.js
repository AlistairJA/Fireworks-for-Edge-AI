/* Cadence — console UI behaviours.
   Static mockup: no backend, no network. Numbers are illustrative. */

(function () {
  'use strict';

  /* ---- filter tabs (Runs) ---------------------------------------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var target = document.querySelector(group.dataset.tabs);
    if (!target) return;
    group.addEventListener('click', function (e) {
      var tab = e.target.closest('.tab');
      if (!tab) return;
      group.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var want = tab.dataset.filter;
      target.querySelectorAll('[data-kind]').forEach(function (row) {
        row.classList.toggle('is-hidden', want !== 'all' && row.dataset.kind !== want);
      });
    });
  });

  /* ---- single-select chip groups (hardware, versions, ops) -------- */
  document.querySelectorAll('[data-select]').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var item = e.target.closest('[data-value]');
      if (!item || !group.contains(item)) return;
      group.querySelectorAll('[data-value]').forEach(function (i) { i.classList.remove('active'); });
      item.classList.add('active');
      var echo = document.querySelector(group.dataset.select);
      if (echo && item.dataset.echo) echo.textContent = item.dataset.echo;
    });
  });

  /* ---- optimization pass toggles (Result) ------------------------ */
  var passes = document.querySelector('[data-passes]');
  if (passes) {
    var BASE = 44.2;
    var BASE_SUCCESS = 96.2;
    var FLOOR = 95.0;

    var out = {
      speedup: document.querySelector('[data-out="speedup"]'),
      ms:      document.querySelector('[data-out="ms"]'),
      hz:      document.querySelector('[data-out="hz"]'),
      hzbar:   document.querySelector('[data-out="hzbar"]'),
      success: document.querySelector('[data-out="success"]'),
      guard:   document.querySelector('[data-out="guard"]'),
      guardnote: document.querySelector('[data-out="guardnote"]')
    };

    function recompute() {
      var saved = 0, lost = 0;
      passes.querySelectorAll('.toggle-row').forEach(function (row) {
        if (row.classList.contains('off')) return;
        saved += parseFloat(row.dataset.ms);
        lost  += parseFloat(row.dataset.succ);
      });
      var after = BASE - saved;
      var hz = 1000 / after;
      var success = BASE_SUCCESS - lost;
      var ok = success >= FLOOR;

      if (out.speedup) out.speedup.textContent = (BASE / after).toFixed(2);
      if (out.ms)      out.ms.textContent = after.toFixed(1);
      if (out.hz)      out.hz.textContent = hz.toFixed(1);
      if (out.hzbar)   out.hzbar.style.width = Math.min(100, hz / 60 * 100).toFixed(1) + '%';
      if (out.success) {
        out.success.textContent = success.toFixed(1) + ' %';
        out.success.style.color = ok ? 'var(--good)' : 'var(--crit)';
      }
      if (out.guard) {
        out.guard.textContent = ok ? 'Guard held' : 'Guard breached';
        out.guard.style.color = ok ? 'var(--good)' : 'var(--crit)';
      }
      if (out.guardnote) {
        out.guardnote.className = 'note ' + (ok ? 'good' : 'bad');
      }
    }

    passes.addEventListener('click', function (e) {
      var row = e.target.closest('.toggle-row');
      if (!row) return;
      row.classList.toggle('off');
      var gain = row.querySelector('.t-gain');
      if (gain) {
        gain.textContent = row.classList.contains('off')
          ? 'off'
          : '−' + parseFloat(row.dataset.ms).toFixed(1) + ' ms';
      }
      recompute();
    });

    recompute();
  }
})();
