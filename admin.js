/**
 * Frontline Healthcare — Admin Dashboard Extension
 * Loaded by index.html as <script src="admin.js"></script>
 * Sign in with code = FLH-ADMIN (must be opened via frontlinehealthcareohio.com/employee-portal)
 */

/* ── CSS ──────────────────────────────────────────────────────────────────── */
(function injectAdminCSS() {
  const css = `
.adm-page { min-height: 100vh; background: #f0f4f5; }
.adm-topbar {
  background: linear-gradient(135deg, #014A54 0%, #028090 100%);
  color: #fff; display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px; height: 62px; position: sticky; top: 0; z-index: 20;
  box-shadow: 0 4px 18px rgba(1,74,84,.25);
}
.adm-brand { font-family: Georgia,serif; font-weight: 700; font-size: 20px; }
.adm-brand small { display:block; font-family:system-ui,Arial,sans-serif; font-weight:400; font-size:11px; color:#6FD8C7; letter-spacing:.6px; text-transform:uppercase; }
.adm-signout { background:rgba(255,255,255,.15); border:1.5px solid rgba(255,255,255,.35); color:#fff; padding:8px 16px; border-radius:8px; font-size:13px; cursor:pointer; }
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
.adm-expand-btn { font-size:.75rem; color:#028090; background:none; border:none; cursor:pointer; padding:0; font-weight:600; }
.adm-expand-btn:hover { text-decoration:underline; }
.adm-detail { margin-top:14px; padding-top:14px; border-top:2px dashed #dce7e9; display:none; }
.adm-detail.open { display:block; }
.adm-detail-section { margin-bottom:18px; background:#f8fbfc; border:1px solid #dce7e9; border-radius:10px; padding:14px 16px; }
.adm-detail-section:last-child { margin-bottom:0; }
.adm-detail-heading { font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.7px; color:#028090; margin-bottom:10px; padding-bottom:6px; border-bottom:1.5px solid #dce7e9; }
.adm-detail-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:6px 18px; font-size:.83rem; }
.adm-detail-grid .full { grid-column:1/-1; }
.adm-detail-grid .k { color:#526A72; font-size:.78rem; }
.adm-detail-grid .v { font-weight:600; color:#1A2E35; word-break:break-word; }
.adm-elig-row { display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
.adm-badge { font-size:.74rem; padding:3px 11px; border-radius:99px; font-weight:600; }
.adm-badge.yes { background:#e3f5ec; color:#1f5c3a; }
.adm-badge.no  { background:#fff0f0; color:#b00020; }
.adm-emp-hist { background:#fff; border:1px solid #dce7e9; border-radius:8px; padding:10px 13px; margin-bottom:8px; font-size:.82rem; line-height:1.55; }
.adm-emp-hist:last-child { margin-bottom:0; }
.adm-emp-hist .eh-employer { font-weight:700; color:#014A54; font-size:.88rem; }
.adm-emp-hist .eh-title    { color:#526A72; font-size:.8rem; }
.adm-emp-hist .k           { color:#526A72; font-size:.78rem; }
.adm-quiz-mod { margin-bottom:14px; }
.adm-quiz-mod:last-child { margin-bottom:0; }
.adm-quiz-mod-title { font-size:.82rem; font-weight:700; color:#fff; margin-bottom:8px; padding:6px 12px; background:#028090; border-radius:7px; display:flex; justify-content:space-between; align-items:center; }
.adm-quiz-mod-title .qscore { font-size:.78rem; font-weight:600; opacity:.9; }
.adm-qblock { margin-bottom:10px; font-size:.8rem; padding-left:2px; }
.adm-qq { font-weight:600; color:#1A2E35; margin-bottom:5px; line-height:1.4; }
.adm-qopt { padding:4px 10px; border-radius:5px; color:#526A72; margin-bottom:2px; font-size:.79rem; }
.adm-qopt.correct { background:#e3f5ec; color:#1f5c3a; font-weight:700; }
.adm-qopt.wrong   { background:#fff0f0; color:#b00020; font-weight:600; text-decoration:line-through; }
.adm-no-data { color:#aaa; font-size:.82rem; font-style:italic; padding:6px 0; }
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
  .adm-detail-grid { grid-template-columns:1fr; }
}
`;
  const el = document.createElement('style');
  el.textContent = css;
  document.head.appendChild(el);
})();

const ONB_NAMES = { welcome:'Welcome', working:'Pay & Schedule', conduct:'Conduct', role:'Your Role' };
const CMP_NAMES = { hipaa:'HIPAA', abuse:'Abuse/Neglect', mui:'Incident Rpt', rights:'Client Rights', safety:'Emergency Safety' };
const CMP_IDS   = ['hipaa','abuse','mui','rights','safety'];

function _e(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

function timeAgo(isoStr) {
  if (!isoStr) return '—';
  const ms = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(ms/60000), h = Math.floor(m/60), d = Math.floor(h/24);
  if (d > 0) return d+'d ago'; if (h > 0) return h+'h ago';
  if (m > 0) return m+'m ago'; return 'just now';
}

function adminChecklist(state) {
  const pr = state.prog||{}, pf = state.profile||{}, ap = state.application||{};
  return {
    profile:     !!pf._complete,
    application: !!ap._complete,
    ack:   !!pr._ack, nda: !!pr._nda, attest: !!pr._attest, media: !!pr._media, secure: !!pr._secure,
    onboarding: ['welcome','working','conduct','role'].map(id=>({id,done:!!(pr[id]&&(pr[id].read||pr[id].passed))})),
    compliance: CMP_IDS.map(id=>({id,done:!!(pr[id]&&pr[id].passed),score:pr[id]?pr[id].score:null,date:pr[id]?pr[id].date:null,answers:pr[id]?pr[id].answers:null}))
  };
}

function adminOverallPct(cl) {
  const all=[cl.profile,cl.application,cl.ack,cl.nda,cl.attest,cl.media,cl.secure,
    ...cl.onboarding.map(x=>x.done),...cl.compliance.map(x=>x.done)];
  return Math.round(all.filter(Boolean).length/all.length*100);
}

function buildDetailHTML(s) {
  const pf=s.profile||{}, ap=s.application||{}, pr=s.prog||{};

  /* Personal Information */
  const fullName=[pf.first,pf.last].filter(Boolean).join(' ')||_e((s.user||{}).name||'');
  const fullAddr=[pf.addr,pf.city,pf.state,pf.zip].filter(Boolean).join(', ');
  const personalHTML=`<div class="adm-detail-section">
    <div class="adm-detail-heading">Personal Information</div>
    <div class="adm-detail-grid">
      <div><div class="k">Legal Name</div><div class="v">${_e(fullName)||'—'}</div></div>
      <div><div class="k">Date of Birth</div><div class="v">${_e(pf.dob)||'—'}</div></div>
      <div><div class="k">Phone</div><div class="v">${_e(pf.phone||ap.phone||'—')}</div></div>
      <div><div class="k">Email</div><div class="v">${_e(pf.email||ap.email||'—')}</div></div>
      ${fullAddr?`<div class="full"><div class="k">Address</div><div class="v">${_e(fullAddr)}</div></div>`:''}
      ${pf.sign?`<div><div class="k">Signature on file</div><div class="v">&#10003; ${_e(pf.sign)}</div></div>`:''}
      ${pf.date?`<div><div class="k">Profile signed</div><div class="v">${_e(pf.date)}</div></div>`:''}
    </div></div>`;

  /* Employment Application */
  let applHTML='';
  if(ap._complete||ap.pos){
    const eligBadges=[['18+ years old',ap.elig18],['Work authorization',ap.eligwork],["Driver's license",ap.eligdl],['Transportation',ap.eligtrans]]
      .filter(([,v])=>v).map(([l,v])=>`<span class="adm-badge ${v==='Yes'?'yes':'no'}">${_e(l)}: ${_e(v)}</span>`).join('');
    const doddItems=[ap.dodd1?(ap.dodd1+(ap.dodd1exp?` (exp ${ap.dodd1exp})`:'')):null,ap.dodd2||null,ap.dodd3||null].filter(Boolean);
    applHTML=`<div class="adm-detail-section">
      <div class="adm-detail-heading">Employment Application</div>
      <div class="adm-detail-grid">
        ${ap.pos?`<div><div class="k">Position applied for</div><div class="v">${_e(ap.pos)}</div></div>`:''}
        ${ap.avail?`<div><div class="k">Availability</div><div class="v">${_e(ap.avail)}</div></div>`:''}
        ${doddItems.length?`<div class="full"><div class="k">DODD Training</div><div class="v">${doddItems.map(_e).join(' | ')}</div></div>`:''}
        ${ap.skills?`<div class="full"><div class="k">Skills / additional info</div><div class="v">${_e(ap.skills)}</div></div>`:''}
      </div>
      ${eligBadges?`<div class="adm-elig-row">${eligBadges}</div>`:''}</div>`;
  }

  /* Employment History */
  const empItems=[1,2,3].map(n=>{
    const name=ap[`emp${n}_name`]; if(!name)return '';
    return `<div class="adm-emp-hist">
      <span class="eh-employer">${_e(name)}</span>${ap[`emp${n}_title`]?` <span class="eh-title">— ${_e(ap[`emp${n}_title`])}</span>`:''}
      ${(ap[`emp${n}_from`]||ap[`emp${n}_to`])?`<br><span class="k">Dates: </span>${_e(ap[`emp${n}_from`]||'')} – ${_e(ap[`emp${n}_to`]||'')}` :''}
      ${ap[`emp${n}_phone`]?`<br><span class="k">Phone: </span>${_e(ap[`emp${n}_phone`])}`:''}
      ${ap[`emp${n}_reason`]?`<br><span class="k">Reason for leaving: </span>${_e(ap[`emp${n}_reason`])}`:''}
      ${(ap[`emp${n}_contact`]==='Yes'||ap[`emp${n}_contact`]==='No')?`<br><span class="k">OK to contact: </span>${_e(ap[`emp${n}_contact`])}`:''}
    </div>`;
  }).filter(Boolean).join('');
  const histHTML=empItems?`<div class="adm-detail-section"><div class="adm-detail-heading">Employment History</div>${empItems}</div>`:'';

  /* Goals & Personal */
  const goalFields=[['Favorite food',pf.food],['Favorite color',pf.color],['Hobbies',pf.hobbies],
    ['1-year personal goal',pf.p1],['1-year work goal',pf.w1],['3-year personal goal',pf.p3],
    ['3-year work goal',pf.w3],['5-year personal goal',pf.p5],['5-year work goal',pf.w5]].filter(([,v])=>v);
  const goalsHTML=goalFields.length?`<div class="adm-detail-section">
    <div class="adm-detail-heading">Goals &amp; Personal</div>
    <div class="adm-detail-grid">${goalFields.map(([k,v])=>`<div class="${String(v).length>40?'full':''}"><div class="k">${_e(k)}</div><div class="v">${_e(v)}</div></div>`).join('')}</div></div>`:'';

  /* Compliance Quiz Answers */
  const cmpData=(typeof COMPLIANCE!=='undefined')?COMPLIANCE:[];
  const quizBlocks=CMP_IDS.map(id=>{
    const pdata=pr[id]; if(!pdata||(pdata.score==null&&!pdata.passed))return '';
    const modTitle=CMP_NAMES[id]||id;
    const scoreLabel=pdata.score!=null?pdata.score+'%':'?%';
    const passLabel=pdata.passed?'&#10003; Passed':(pdata.score!=null?'&#10007; Not yet passed':'');
    const answers=pdata.answers;
    if(!answers||!answers.length)return `<div class="adm-quiz-mod">
      <div class="adm-quiz-mod-title"><span>${_e(modTitle)}</span><span class="qscore">${scoreLabel} ${passLabel}</span></div>
      <p class="adm-no-data">Detailed answers not yet recorded — will capture on next attempt.</p></div>`;
    const mod=cmpData.find(m=>m.id===id);
    if(!mod||!mod.quiz)return `<div class="adm-quiz-mod">
      <div class="adm-quiz-mod-title"><span>${_e(modTitle)}</span><span class="qscore">${scoreLabel} ${passLabel}</span></div>
      <p class="adm-no-data">Score: ${scoreLabel}</p></div>`;
    const questionsHTML=mod.quiz.map((qq,qi)=>{
      const sel=answers[qi],cor=qq.a;
      const optsHTML=qq.o.map((op,oi)=>{
        let cls='adm-qopt',icon='&#9675;';
        if(oi===cor&&oi===sel){cls+=' correct';icon='&#10003;';}
        else if(oi===cor){cls+=' correct';icon='&#10003;';}
        else if(oi===sel){cls+=' wrong';icon='&#10007;';}
        return `<div class="${cls}">${icon} ${_e(op)}</div>`;
      }).join('');
      return `<div class="adm-qblock"><div class="adm-qq">${qi+1}. ${_e(qq.q)}</div>${optsHTML}</div>`;
    }).join('');
    return `<div class="adm-quiz-mod">
      <div class="adm-quiz-mod-title"><span>${_e(modTitle)}</span><span class="qscore">${scoreLabel} ${passLabel}</span></div>
      ${questionsHTML}</div>`;
  }).filter(Boolean).join('');
  const quizHTML=quizBlocks?`<div class="adm-detail-section"><div class="adm-detail-heading">Compliance Quiz Answers</div>${quizBlocks}</div>`:'';

  const hasContent=(pf.first||pf.last||pf.dob||pf.phone)||(ap.pos||ap._complete)||empItems||goalFields.length||quizBlocks;
  return hasContent?(personalHTML+applHTML+histHTML+goalsHTML+quizHTML):'<p class="adm-no-data" style="padding:8px 0">No profile data recorded yet.</p>';
}

function renderCards(rows) {
  const wrap=document.getElementById('adm-cards-wrap'), empty=document.getElementById('adm-empty');
  if(!wrap)return;
  if(!rows.length){wrap.style.display='none';empty.style.display='block';return;}
  empty.style.display='none'; wrap.style.display='flex';
  wrap.innerHTML=rows.map((r,idx)=>{
    const s=r.state||{},u=s.user||{},cl=r._cl,pct=r._pct;
    const pbarColor=pct===100?'#1f8a5b':pct>60?'#028090':pct>0?'#F2A94B':'#dce7e9';
    const docChips=[{label:'Profile',done:cl.profile},{label:'Application',done:cl.application},
      {label:'Handbook',done:cl.ack},{label:'NDA',done:cl.nda},{label:'DODD Attest',done:cl.attest},
      {label:'Media',done:cl.media},{label:'Secure Docs',done:cl.secure}]
      .map(x=>`<span class="adm-chip ${x.done?'done':'pend'}">${x.done?'&#10003;':'&#9675;'} ${x.label}</span>`).join('');
    const onbChips=cl.onboarding.map(x=>`<span class="adm-chip ${x.done?'done':'pend'}">${x.done?'&#10003;':'&#9675;'} ${ONB_NAMES[x.id]||x.id}</span>`).join('');
    const cmpChips=cl.compliance.map(x=>{
      const cls=x.done?'pass':(x.score!=null?'fail':'pend');
      const icon=x.done?'&#10003;':(x.score!=null?'&#10007;':'&#9675;');
      const sc=x.score!=null?`<span class="sc">${x.score}%</span>`:'';
      return `<span class="adm-chip ${cls}">${icon} ${CMP_NAMES[x.id]||x.id}${sc}</span>`;
    }).join('');
    return `<div class="adm-card" id="adm-card-${idx}">
      <div class="adm-card-top">
        <div class="adm-emp-info"><div class="adm-name">${_e(u.name||'Unknown')}</div><div class="adm-role">${_e(u.role||'—')}</div></div>
        <span class="adm-code">${_e(u.code||'—')}</span>
      </div>
      <div class="adm-pbar-row">
        <div class="adm-pbar-wrap"><div class="adm-pbar" style="width:${pct}%;background:${pbarColor}"></div></div>
        <span class="adm-pct">${pct}%</span>
      </div>
      <div class="adm-sections">
        <div class="adm-sec"><div class="adm-sec-title">Documents &amp; Agreements</div><div class="adm-chips">${docChips}</div></div>
        <div class="adm-sec"><div class="adm-sec-title">Onboarding Modules (4)</div><div class="adm-chips">${onbChips}</div></div>
        <div class="adm-sec"><div class="adm-sec-title">Compliance Quizzes (5)</div><div class="adm-chips">${cmpChips}</div></div>
      </div>
      <div class="adm-foot">
        <span class="adm-last">Last active: ${timeAgo(r.lastUpdated)}</span>
        <button class="adm-expand-btn" onclick="adminToggleDetail(${idx})">&#9660; View profile details</button>
      </div>
      <div class="adm-detail" id="adm-detail-${idx}">${buildDetailHTML(s)}</div>
    </div>`;
  }).join('');
}

window.adminToggleDetail=function(idx){
  const el=document.getElementById('adm-detail-'+idx);
  const btn=document.querySelector('#adm-card-'+idx+' .adm-expand-btn');
  if(!el)return;
  el.classList.toggle('open');
  if(btn)btn.innerHTML=el.classList.contains('open')?'&#9650; Hide details':'&#9660; View profile details';
};

window.renderAdmin=function(){
  const u=(typeof user==='function'&&user())||{};
  const appEl=document.getElementById('app'); if(!appEl)return;
  appEl.innerHTML=`<div class="adm-page">
    <div class="adm-topbar">
      <div class="adm-brand">Frontline Healthcare<small>Admin Dashboard</small></div>
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:13px;color:rgba(255,255,255,.75)">Signed in as ${_e(u.name||'Admin')}</span>
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
        <button class="adm-refresh" onclick="adminRefresh()">&#8635; Refresh data</button>
      </div>
      <div id="adm-loading" class="adm-loading"><div class="adm-spinner"></div><p>Fetching employee records…</p></div>
      <div id="adm-nocloud" class="adm-nocloud" style="display:none">
        <p>&#9888; <strong>Admin data requires Wix connection.</strong></p>
        <p>Open this portal at <strong>frontlinehealthcareohio.com/employee-portal</strong> and sign in with the admin code.</p>
      </div>
      <div id="adm-cards-wrap" class="adm-cards" style="display:none"></div>
      <div id="adm-empty" class="adm-empty" style="display:none"><div class="adm-empty-icon">&#128269;</div><p>No employees match your filter.</p></div>
    </div></div>`;
  adminRefresh();
};

window._adminRecords=[];

window.adminRefresh=function(){
  document.getElementById('adm-loading').style.display='block';
  document.getElementById('adm-nocloud').style.display='none';
  document.getElementById('adm-cards-wrap').style.display='none';
  document.getElementById('adm-empty').style.display='none';
  const embedded=window.parent&&window.parent!==window;
  if(!embedded){document.getElementById('adm-loading').style.display='none';document.getElementById('adm-nocloud').style.display='block';return;}
  try{window.parent.postMessage({type:'FLH_GET_ALL'},'*');}catch(_){}
};

window.adminFilter=function(){
  const q=(document.getElementById('adm-search')?.value||'').toLowerCase();
  const fil=document.getElementById('adm-filter')?.value||'all';
  renderCards(window._adminRecords.filter(r=>{
    const u=(r.state||{}).user||{}, pct=r._pct||0;
    return (fil==='all'||(fil==='done'&&pct===100)||(fil==='prog'&&pct>0&&pct<100)||(fil==='new'&&pct===0))&&
      (!q||(u.name||'').toLowerCase().includes(q)||(u.role||'').toLowerCase().includes(q)||(u.code||'').toLowerCase().includes(q));
  }));
};

window.renderAdminWithData=function(records,error){
  document.getElementById('adm-loading').style.display='none';
  if(error){const nc=document.getElementById('adm-nocloud');nc.style.display='block';
    nc.innerHTML=`<p>&#9888; <strong>Could not load employee data.</strong></p><p>${_e(error)}</p>`;return;}
  records.forEach(r=>{r._cl=adminChecklist(r.state||{});r._pct=adminOverallPct(r._cl);});
  window._adminRecords=records;
  const total=records.length,done=records.filter(r=>r._pct===100).length,
    prog=records.filter(r=>r._pct>0&&r._pct<100).length,nw=records.filter(r=>r._pct===0).length;
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('adm-n-total',total);set('adm-n-done',done);set('adm-n-prog',prog);set('adm-n-new',nw);
  document.getElementById('adm-cards-wrap').style.display='flex';
  adminFilter();
};

window.adminLogout=function(){
  if(typeof STATE!=='undefined'){STATE.user=null;STATE._view=null;}
  if(typeof render==='function')render();
};

window.loadAdminDashboard=function(){
  if(typeof CONFIG==='undefined')return;
  const _origDoSignin=window.doSignin;
  window.doSignin=function(){
    const code=(document.getElementById('si_code')?.value||'').trim();
    const aCode=(CONFIG.adminCode||'').toLowerCase();
    if(aCode&&code.toLowerCase()===aCode){
      const name=(document.getElementById('si_name')?.value||'').trim();
      const role=document.getElementById('si_role')?.value||'Administrator / Office';
      const err=document.getElementById('si_err');
      if(!name){if(err){err.textContent='Please enter your full name.';err.style.display='block';}return;}
      STATE.user={name,role,code,isAdmin:true};
      renderAdmin();return;
    }
    return _origDoSignin.apply(this,arguments);
  };
  const _origRender=window.render;
  window.render=function(){
    const u=typeof user==='function'?user():null;
    if(u&&u.isAdmin){renderAdmin();return;}
    return _origRender.apply(this,arguments);
  };
  window.addEventListener('message',function(e){
    const d=e.data;
    if(!d||typeof d!=='object'||d.type!=='FLH_ALL_STATE')return;
    renderAdminWithData(d.records||[],d.error||null);
  });
};
