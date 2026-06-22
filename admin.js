/**
 * Frontline Healthcare — Admin Dashboard Extension
 * ─────────────────────────────────────────────────────────────────────────────
 * This file extends the employee portal with an admin dashboard.
 *
 * To activate:
 *  1. Upload this file to GitHub alongside index.html
 *  2. In index.html, find:
 *       validCodes: ["FLH-STORM", "FLH-MILLIE"],
 *     Change it to:
 *       validCodes: ["FLH-STORM", "FLH-MILLIE"],
 *       adminCode: "FLH-ADMIN",
 *  3. In index.html, find the very last line: </script></body></html>
 *     Just BEFORE that closing </script>, paste:
 *       loadAdminDashboard();
 *  4. Add this to index.html inside <head> (or just before </body>):
 *       <script src="admin.js"></script>
 *
 * Admin sign-in: use name = anything, role = anything, code = FLH-ADMIN
 * The portal must be open at frontlinehealthcareohio.com/employee-portal
 * and you must be signed into Wix as site admin for live data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── CSS ──────────────────────────────────────────────────────────────────── */
(function injectAdminCSS() {
  const css = `
/* ===== ADMIN DASHBOARD STYLES ===== */
.adm-page { min-height: 100vh; background: #f0f4f5; }
.adm-topbar {
  background: linear-gradient(135deg, #014A54 0%, #028090 100%);
  color: #fff; display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px; height: 62px; position: sticky; top: 0; z-index: 20;
  box-shadow: 0 4px 18px rgba(1,74,84,.25);
}
.adm-brand { font-family: Georgia,serif; font-weight: 700; font-size: 20px; }
.adm-brand small { display:block; font-family: system-ui,Arial,sans-serif; font-weight:400; font-size:11px; color:#6FD8C7; letter-spacing:.6px; text-transform:uppercase; }
.adm-signout { background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.35); color:#fff; padding:8px 16px; border-radius:8px; font-size:13px; cursor:pointer; }
.adm-signout:hover { background:rgba(255,255,255,.25); }

.adm-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; padding:22px 28px; background:#fff; border-bottom:1px solid #dce7e9; }
.adm-stat { background:#f8fbfc; border-radius:12px; padding:16px; text-align:center; border:1px solid #dce7e9; }
.adm-stat .n { font-size:2.2rem; font-weight:800; color:#014A54; }
.adm-stat.green .n { color:#1f8a5b; }
.adm-stat.amber .n { color:#c07a00; }
.adm-stat.gray  .n { color:#888; }
.adm-stat .lbl { font-size:.77rem; color:#526A72; margin-top:3px; }

.adm-body { padding:22px 28px; }
.adm-toolbar { display:flex; gap:10px; margin-bottom:18px; align-items:center; flex-wrap:wrap; }
.adm-toolbar input { flex:1; min-width:180px; padding:9px 14px; border:1.5px solid #dce7e9; border-radius:9px; font-size:.9rem; font-family:inherit; }
.adm-toolbar input:focus { outline:none; border-color:#028090; }
.adm-toolbar select { padding:9px 12px; border:1.5px solid #dce7e9; border-radius:9px; font-size:.9rem; background:#fff; cursor:pointer; }
.adm-refresh { background:#028090; color:#fff; border:none; padding:9px 18px; border-radius:9px; font-size:.88rem; font-weight:600; cursor:pointer; }
.adm-refresh:hover { background:#014A54; }

/* Employee cards */
.adm-cards { display:flex; flex-direction:column; gap:14px; }
.adm-card { background:#fff; border:1.5px solid #dce7e9; border-radius:14px; padding:20px 22px; box-shadow:0 3px 12px rgba(1,74,84,.06); transition:.15s; }
.adm-card:hover { border-color:#028090; box-shadow:0 4px 18px rgba(2,128,144,.12); }
.adm-card-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:14px; gap:12px; }
.adm-emp-info .adm-name { font-size:1.05rem; font-weight:700; color:#1A2E35; }
.adm-emp-info .adm-role { font-size:.8rem; color:#526A72; margin-top:2px; }
.adm-code { font-family:monospace; background:#eef3f4; padding:3px 10px; border-radius:6px; font-size:.82rem; color:#014A54; border:1px solid #dce7e9; white-space:nowrap; }
.adm-pbar-row { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
.adm-pbar-wrap { flex:1; height:11px; background:#eef3f4; border-radius:99px; overflow:hidden; }
.adm-pbar { height:100%; border-radius:99px; background:linear-gradient(90deg,#028090,#00A896); transition:width .5s; }
.adm-pct { font-size:.9rem; font-weight:700; color:#028090; min-width:40px; text-align:right; }
.adm-sections { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:10px; }
.adm-sec { background:#f8fbfc; border:1px solid #dce7e9; border-radius:9px; padding:11px 13px; }
.adm-sec-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.5px; color:#526A72; margin-bottom:8px; }
.adm-chips { display:flex; flex-wrap:wrap; gap:5px; }
.adm-chip { font-size:.73rem; padding:3px 9px; border-radius:99px; display:inline-flex; align-items:center; gap:3px; font-weight:500; }
.adm-chip.done  { background:#e3f5ec; color:#1f5c3a; }
.adm-chip.pend  { background:#f1f6f7; color:#526A72; }
.adm-chip.pass  { background:#e3f5ec; color:#1f5c3a; }
.adm-chip.fail  { background:#fff3e0; color:#905600; }
.adm-chip .sc   { font-weight:700; margin-left:2px; }
.adm-foot { display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:10px; border-top:1px solid #f0f4f5; }
.adm-last { font-size:.72rem; color:#aaa; }
.adm-expand-btn { font-size:.75rem; color:#028090; background:none; border:none; cursor:pointer; padding:0; }
.adm-expand-btn:hover { text-decoration:underline; }
.adm-detail { margin-top:12px; padding-top:12px; border-top:1px dashed #dce7e9; display:none; }
.adm-detail.open { display:block; }
.adm-detail-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:8px; font-size:.82rem; }
.adm-detail-grid .k { color:#526A72; }
.adm-detail-grid .v { font-weight:600; color:#1A2E35; }

/* Loading / empty states */
.adm-loading { text-align:center; padding:64px 20px; color:#526A72; }
.adm-spinner { width:44px; height:44px; border:3.5px solid #dce7e9; border-top-color:#028090; border-radius:50%; animation:admSpin .8s linear infinite; margin:0 auto 18px; }
@keyframes admSpin { to { transform:rotate(360deg); } }
.adm-nocloud { background:#fff8e1; border:1.5px solid #ffe082; border-radius:13px; padding:26px 28px; margin:10px 0; line-height:1.6; }
.adm-nocloud strong { color:#014A54; }
.adm-empty { text-align:center; padding:64px 20px; color:#888; }
.adm-empty-icon { font-size:3rem; margin-bottom:12px; }

@media(max-width:680px){
  .adm-stats { grid-template-columns:repeat(2,1fr); }
  .adm-body, .adm-topbar { padding-left:16px; padding-right:16px; }
}
`;
  const el = document.createElement('style');
  el.textContent = css;
  document.head.appendChild(el);
})();

/* ── Admin dashboard setup hook (called once from index.html) ─────────────── */
window.loadAdminDashboard = function () {
  if (typeof CONFIG === 'undefined') return;

  // ── 1. Patch doSignin to intercept the admin code ─────────────────────────
  const _origDoSignin = window.doSignin;
  window.doSignin = function () {
    const code  = (document.getElementById('si_code')?.value || '').trim();
    const aCode = (CONFIG.adminCode || '').toLowerCase();
    if (aCode && code.toLowerCase() === aCode) {
      const name = (document.getElementById('si_name')?.value || '').trim();
      const role =  document.getElementById('si_role')?.value || 'Administrator / Office';
      const err  =  document.getElementById('si_err');
      if (!name) {
        if (err) { err.textContent = 'Please enter your full name.'; err.style.display = 'block'; }
        return;
      }
      STATE.user = { name, role, code, isAdmin: true };
      // Do NOT persist admin to localStorage / cloud
      renderAdmin();
      return;
    }
    return _origDoSignin.apply(this, arguments);
  };

  // ── 2. Patch render() to route admin sessions to renderAdmin ──────────────
  const _origRender = window.render;
  window.render = function () {
    const u = typeof user === 'function' ? user() : null;
    if (u && u.isAdmin) { renderAdmin(); return; }
    return _origRender.apply(this, arguments);
  };

  // ── 3. Listen for FLH_ALL_STATE back from Wix ────────────────────────────
  window.addEventListener('message', function (e) {
    const d = e.data;
    if (!d || typeof d !== 'object' || d.type !== 'FLH_ALL_STATE') return;
    renderAdminWithData(d.records || [], d.error || null);
  });
};

/* ── Utility ──────────────────────────────────────────────────────────────── */
window.adminLogout = function () {
  if (typeof STATE !== 'undefined') { STATE.user = null; STATE._view = null; }
  if (typeof render === 'function') render();
};

window.cloudGetAll = function () {
  const embedded = (window.parent && window.parent !== window);
  if (!embedded) return false;
  try { window.parent.postMessage({ type: 'FLH_GET_ALL' }, '*'); } catch (_) {}
  return true;
};

/* ── Height reporting ─────────────────────────────────────────────────────── */
function sendHeight() {
  try {
    if (window.parent && window.parent !== window) {
      setTimeout(function () {
        window.parent.postMessage({ type: 'FLH_HEIGHT', height: document.body.scrollHeight }, '*');
      }, 150);
    }
  } catch (_) {}
}

/* ── Admin data helpers ───────────────────────────────────────────────────── */
function adminChecklist(state) {
  const pr = state.prog   || {};
  const pf = state.profile || {};
  const ap = state.application || {};
  const onb = ['welcome','working','conduct','role'];
  const cmp = ['hipaa','abuse','mui','rights','safety'];

  return {
    profile:     !!pf._complete,
    application: !!ap._complete,
    ack:         !!pr._ack,
    nda:         !!pr._nda,
    attest:      !!pr._attest,
    media:       !!pr._media,
    secure:      !!pr._secure,
    onboarding:  onb.map(id => ({ id, done: !!(pr[id] && (pr[id].read || pr[id].passed)) })),
    compliance:  cmp.map(id => ({
      id,
      done:  !!(pr[id] && pr[id].passed),
      score: pr[id] ? pr[id].score : null,
      date:  pr[id] ? pr[id].date  : null
    }))
  };
}

function adminOverallPct(cl) {
  const all = [
    cl.profile, cl.application, cl.ack, cl.nda, cl.attest, cl.media, cl.secure,
    ...cl.onboarding.map(x => x.done),
    ...cl.compliance.map(x => x.done)
  ];
  return Math.round(all.filter(Boolean).length / all.length * 100);
}

function e(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, c =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

function timeAgo(isoStr) {
  if (!isoStr) return '—';
  const ms = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(ms / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0)  return d  + 'd ago';
  if (h > 0)  return h  + 'h ago';
  if (m > 0)  return m  + 'm ago';
  return 'just now';
}

/* ── renderAdmin ──────────────────────────────────────────────────────────── */
window.renderAdmin = function () {
  const u = (typeof user === 'function' && user()) || {};
  const appEl = document.getElementById('app');
  if (!appEl) return;

  appEl.innerHTML = `
    <div class="adm-page">
      <div class="adm-topbar">
        <div class="adm-brand">Frontline Healthcare
          <small>Admin Dashboard</small>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:13px;color:rgba(255,255,255,.75)">Signed in as ${e(u.name || 'Admin')}</span>
          <button class="adm-signout" onclick="adminLogout()">Sign out</button>
        </div>
      </div>

      <div class="adm-stats">
        <div class="adm-stat"><div class="n" id="adm-n-total">—</div><div class="lbl">Total employees</div></div>
        <div class="adm-stat green"><div class="n" id="adm-n-done">—</div><div class="lbl">Fully complete</div></div>
        <div class="adm-stat amber"><div class="n" id="adm-n-prog">—</div><div class="lbl">In progress</div></div>
        <div class="adm-stat gray"><div class="n" id="adm-n-new">—</div><div class="lbl">Not started</div></div>
      </div>

      <div class="adm-body">
        <div class="adm-toolbar">
          <input type="text" id="adm-search" placeholder="Search by name, role, or code…" oninput="adminFilter()">
          <select id="adm-filter" onchange="adminFilter()">
            <option value="all">All employees</option>
            <option value="done">Fully complete</option>
            <option value="prog">In progress</option>
            <option value="new">Not started</option>
          </select>
          <button class="adm-refresh" onclick="adminRefresh()">↻ Refresh data</button>
        </div>

        <div id="adm-loading" class="adm-loading">
          <div class="adm-spinner"></div>
          <p>Fetching employee records…</p>
          <p style="font-size:.82rem;color:#aaa;margin-top:6px">Requires the portal to be open on your Wix site while signed in as a Wix admin.</p>
        </div>
        <div id="adm-nocloud" class="adm-nocloud" style="display:none">
          <p>⚠️ <strong>Admin data requires Wix connection.</strong></p>
          <p>Open this portal at <strong>frontlinehealthcareohio.com/employee-portal</strong>,
             sign in as a Wix member (admin account), then enter the admin code again.
             This view cannot fetch data when the portal is opened directly at
             frontlinehealthcare.github.io.</p>
        </div>
        <div id="adm-cards-wrap" class="adm-cards" style="display:none"></div>
        <div id="adm-empty" class="adm-empty" style="display:none">
          <div class="adm-empty-icon">🔍</div>
          <p>No employees match your filter.</p>
        </div>
      </div>
    </div>`;

  // Try to fetch data
  adminRefresh();
  sendHeight();
};

window._adminRecords = [];

window.adminRefresh = function () {
  document.getElementById('adm-loading').style.display = 'block';
  document.getElementById('adm-nocloud').style.display = 'none';
  document.getElementById('adm-cards-wrap').style.display = 'none';
  document.getElementById('adm-empty').style.display = 'none';

  const sent = cloudGetAll();
  if (!sent) {
    document.getElementById('adm-loading').style.display = 'none';
    document.getElementById('adm-nocloud').style.display = 'block';
    sendHeight();
  }
  // If sent, response will arrive via FLH_ALL_STATE message → renderAdminWithData()
};

window.adminFilter = function () {
  const q   = (document.getElementById('adm-search')?.value || '').toLowerCase();
  const fil = document.getElementById('adm-filter')?.value || 'all';
  const rows = window._adminRecords;
  const filtered = rows.filter(r => {
    const s = r.state || {};
    const u = s.user || {};
    const pct = r._pct || 0;
    const statusMatch =
      fil === 'all' ||
      (fil === 'done' && pct === 100) ||
      (fil === 'prog' && pct > 0 && pct < 100) ||
      (fil === 'new'  && pct === 0);
    const textMatch =
      !q ||
      (u.name || '').toLowerCase().includes(q) ||
      (u.role || '').toLowerCase().includes(q) ||
      (u.code || '').toLowerCase().includes(q);
    return statusMatch && textMatch;
  });
  renderCards(filtered);
};

/* ── renderAdminWithData ──────────────────────────────────────────────────── */
window.renderAdminWithData = function (records, error) {
  document.getElementById('adm-loading').style.display = 'none';

  if (error) {
    document.getElementById('adm-nocloud').style.display = 'block';
    document.getElementById('adm-nocloud').innerHTML = `
      <p>⚠️ <strong>Could not load employee data.</strong></p>
      <p>${e(error)}</p>
      <p>Make sure you are signed into your Wix site as a site admin (not just a member).</p>`;
    sendHeight();
    return;
  }

  // Annotate each record with computed summary
  records.forEach(r => {
    const cl = adminChecklist(r.state || {});
    r._cl  = cl;
    r._pct = adminOverallPct(cl);
  });

  window._adminRecords = records;

  // Update stat counters
  const total = records.length;
  const done  = records.filter(r => r._pct === 100).length;
  const prog  = records.filter(r => r._pct > 0 && r._pct < 100).length;
  const nw    = records.filter(r => r._pct === 0).length;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('adm-n-total', total);
  set('adm-n-done',  done);
  set('adm-n-prog',  prog);
  set('adm-n-new',   nw);

  document.getElementById('adm-cards-wrap').style.display = 'flex';
  adminFilter();
  sendHeight();
};

/* ── renderCards (the employee table/cards) ───────────────────────────────── */
function renderCards(rows) {
  const wrap = document.getElementById('adm-cards-wrap');
  const empty = document.getElementById('adm-empty');
  if (!wrap) return;

  if (!rows.length) {
    wrap.style.display = 'none';
    empty.style.display = 'block';
    sendHeight();
    return;
  }
  empty.style.display = 'none';
  wrap.style.display  = 'flex';

  const onbNames = { welcome:'Welcome', working:'Pay & Schedule', conduct:'Conduct', role:'Your Role' };
  const cmpNames = { hipaa:'HIPAA', abuse:'Abuse/Neglect', mui:'Incident Rpt', rights:'Client Rights', safety:'Emergency Safety' };

  wrap.innerHTML = rows.map((r, idx) => {
    const s   = r.state || {};
    const u   = s.user  || {};
    const cl  = r._cl;
    const pct = r._pct;

    const pbarColor = pct === 100 ? '#1f8a5b' : pct > 60 ? '#028090' : pct > 0 ? '#F2A94B' : '#dce7e9';

    const docChips = [
      { label:'Profile',     done: cl.profile },
      { label:'Application', done: cl.application },
      { label:'Handbook',    done: cl.ack },
      { label:'NDA',         done: cl.nda },
      { label:'DODD Attest', done: cl.attest },
      { label:'Media',       done: cl.media },
      { label:'Secure Docs', done: cl.secure },
    ].map(x =>
      `<span class="adm-chip ${x.done ? 'done' : 'pend'}">${x.done ? '✓' : '○'} ${x.label}</span>`
    ).join('');

    const onbChips = cl.onboarding.map(x =>
      `<span class="adm-chip ${x.done ? 'done' : 'pend'}">${x.done ? '✓' : '○'} ${onbNames[x.id] || x.id}</span>`
    ).join('');

    const cmpChips = cl.compliance.map(x => {
      const cls = x.done ? 'pass' : (x.score != null ? 'fail' : 'pend');
      const icon = x.done ? '✓' : (x.score != null ? '✗' : '○');
      const sc   = x.score != null ? `<span class="sc">${x.score}%</span>` : '';
      return `<span class="adm-chip ${cls}">${icon} ${cmpNames[x.id] || x.id}${sc}</span>`;
    }).join('');

    // Detail pane — profile fields
    const pf = s.profile || {};
    const ap = s.application || {};
    const detailRows = [
      ['DOB',          pf.dob     || '—'],
      ['Phone',        pf.phone   || '—'],
      ['Email',        pf.email   || ap.email || '—'],
      ['City / State', pf.city ? `${pf.city}, ${pf.state || ''}` : '—'],
      ['Position',     ap.pos     || '—'],
      ['Avail from',   ap.avail   || '—'],
      ['1-yr goal',    pf.w1      || '—'],
    ].map(([k, v]) =>
      `<div><span class="k">${e(k)}: </span><span class="v">${e(v)}</span></div>`
    ).join('');

    return `
      <div class="adm-card" id="adm-card-${idx}">
        <div class="adm-card-top">
          <div class="adm-emp-info">
            <div class="adm-name">${e(u.name || 'Unknown')}</div>
            <div class="adm-role">${e(u.role || '—')}</div>
          </div>
          <span class="adm-code">${e(u.code || '—')}</span>
        </div>

        <div class="adm-pbar-row">
          <div class="adm-pbar-wrap">
            <div class="adm-pbar" style="width:${pct}%;background:${pbarColor}"></div>
          </div>
          <span class="adm-pct">${pct}%</span>
        </div>

        <div class="adm-sections">
          <div class="adm-sec">
            <div class="adm-sec-title">Documents &amp; Agreements</div>
            <div class="adm-chips">${docChips}</div>
          </div>
          <div class="adm-sec">
            <div class="adm-sec-title">Onboarding Modules (4)</div>
            <div class="adm-chips">${onbChips}</div>
          </div>
          <div class="adm-sec">
            <div class="adm-sec-title">Compliance Quizzes (5)</div>
            <div class="adm-chips">${cmpChips}</div>
          </div>
        </div>

        <div class="adm-foot">
          <span class="adm-last">Last active: ${timeAgo(r.lastUpdated)}</span>
          <button class="adm-expand-btn" onclick="adminToggleDetail(${idx})">▼ View profile details</button>
        </div>

        <div class="adm-detail" id="adm-detail-${idx}">
          <div class="adm-detail-grid">${detailRows}</div>
        </div>
      </div>`;
  }).join('');

  sendHeight();
}

window.adminToggleDetail = function (idx) {
  const el = document.getElementById(`adm-detail-${idx}`);
  const btn = document.querySelector(`#adm-card-${idx} .adm-expand-btn`);
  if (!el) return;
  el.classList.toggle('open');
  if (btn) btn.textContent = el.classList.contains('open') ? '▲ Hide details' : '▼ View profile details';
  sendHeight();
};
