/* =========================================================
   ĐẤU TRƯỜNG AI – trang Minigame
   #minigame            sảnh chính + phiếu nhận thưởng
   #minigame-thathaygia Thật hay Giả? (practice.js → P.mgTF)
   #minigame-trieuphu   Ai là nhà kiến tạo số? (12 nấc, 3 quyền trợ giúp)
   #minigame-dienthoai  Điện thoại báo động (tình huống mô phỏng)
   #minigame-rungchuong Rung chuông vàng (trình chiếu cho hội trường)
   ========================================================= */
(function(){
const A = window.APP, D = A.D, st = A.st, $ = A.$, $$ = A.$$, esc = A.esc, I = window.ICON;
const P = window.PAGES, R = window.ARENA;
if (R.tfMore && !D.__tfMore) { D.tf.push(...R.tfMore); D.__tfMore = true; }
st.arena = Object.assign({ ladder: 0, phone: 0, lPlays: 0, pPlays: 0 }, st.arena || {});
const LETTERS = ['A', 'B', 'C', 'D'];

/* ---------- điểm & phiếu thưởng ---------- */
function parts(){
  const W = R.prize.weights;
  return {
    tf: Math.round((st.game.best || 0) / 10 * W.tf),
    ladder: Math.round((st.arena.ladder || 0) / 12 * W.ladder),
    phone: Math.round((st.arena.phone || 0) / 12 * W.phone)
  };
}
function total(){ const p = parts(); return p.tf + p.ladder + p.phone; }
function played(){ return { tf: (st.game.plays || 0) > 0, ladder: st.arena.lPlays > 0, phone: st.arena.pPlays > 0 }; }
function rankOf(t){ return R.prize.ranks.find(r => t >= r.min) || null; }
function norm(s){ return String(s || '').trim().toLowerCase().normalize('NFC').replace(/\s+/g, ' '); }
function code(name, cls, t){
  let h = 5381; const s = norm(name) + '|' + norm(cls).replace(/\s/g, '') + '|' + t + '|' + D.site.key;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36).toUpperCase().padStart(6, '0').slice(-6);
}
window.ARENA_CODE = code; window.ARENA_TOTAL = () => total();

/* ---------- SẢNH CHÍNH ---------- */
const MODES = [
  { k: 'thathaygia', t: 'Thật hay Giả?', d: '10 câu ngẫu nhiên, 15 giây mỗi câu. Phản xạ nhanh, đúng là thắng.', ic: 'check', g: 'linear-gradient(135deg,#16a34a,#0f766e)', best: () => (st.game.best || 0) + '/10', w: 'tf' },
  { k: 'trieuphu', t: 'Ai là nhà kiến tạo số?', d: 'Leo 12 nấc từ dễ tới khó. 3 quyền trợ giúp: 50:50, Đổi câu và… Hỏi AI (có khi AI sai!).', ic: 'flash', g: 'linear-gradient(135deg,#7c3aed,#2563eb)', best: () => (st.arena.ladder || 0) + '/12 nấc', w: 'ladder' },
  { k: 'dienthoai', t: 'Điện thoại báo động', d: 'Tin nhắn, cuộc gọi “lạ” liên tục đổ về. Em xử lý thế nào trong 25 giây?', ic: 'phone', g: 'linear-gradient(135deg,#ea580c,#db2777)', best: () => (st.arena.phone || 0) + '/12 điểm', w: 'phone' }
];
function hub(v){
  const W = R.prize.weights;
  v.innerHTML = P.pageHead('Minigame', 'Đấu trường AI', 'Chơi 3 thử thách, cộng điểm, nhận phiếu thưởng. Điểm cao nhất của mỗi thử thách được giữ lại, chơi lại bao nhiêu lần cũng được.') +
  '<section class="sec"><div class="wrap">' +
    '<div class="ar-grid">' + MODES.map((m, i) => '<a class="ar-card" href="#minigame-' + m.k + '" style="--g:' + m.g + '"><span class="ar-num">' + (i + 1) + '</span><span class="ar-ic">' + I(m.ic) + '</span><h3>' + esc(m.t) + '</h3><p>' + esc(m.d) + '</p><div class="ar-foot"><span>Kỷ lục: <b>' + m.best() + '</b></span><span>tối đa ' + W[m.w] + ' điểm</span></div><span class="ar-play">' + I('play') + ' Chơi ngay</span></a>').join('') + '</div>' +
    '<div class="ar-prize" id="arPrize"></div>' +
    '<a class="ar-bell" href="#minigame-rungchuong"><span class="ar-ic">' + I('megaphone') + '</span><div><b>Rung chuông vàng AI</b><p>Chế độ trình chiếu cho thầy cô điều khiển cả hội trường: câu hỏi lớn, đồng hồ đếm ngược, đếm số bạn còn trên sàn, kiểm tra phiếu nhận thưởng.</p></div><span class="go">' + I('arrow') + '</span></a>' +
  '</div></section>';
  const box = $('#arPrize', v);
  function draw(){
    const p = parts(), t = p.tf + p.ladder + p.phone, pl = played(), all = pl.tf && pl.ladder && pl.phone, rk = rankOf(t), ok = all && st.name.trim() && st.cls.trim();
    box.innerHTML = '<div class="ar-ph"><div><div class="eyebrow">Phiếu nhận thưởng</div><h2>Tổng điểm của em</h2></div><div class="ar-total"><b>' + t + '</b><span>/100</span></div></div>' +
      '<div class="ar-bars">' + MODES.map(m => '<div class="ar-bar"><span>' + (pl[m.w] ? I('check') : '<i class="dot"></i>') + ' ' + esc(m.t) + '</span><div class="ar-track"><i style="width:' + (p[m.w] / W[m.w] * 100) + '%;background:' + m.g + '"></i></div><b>' + p[m.w] + '/' + W[m.w] + '</b></div>').join('') + '</div>' +
      '<div class="ar-ranks">' + R.prize.ranks.slice().reverse().map(r => '<span class="' + (rk && rk.n === r.n ? 'on' : '') + '" style="--rc:' + r.c + '">' + r.n + '<small>từ ' + r.min + '</small></span>').join('') + '</div>' +
      '<div class="ar-form"><label>Họ và tên<input id="arName" value="' + esc(st.name) + '" placeholder="Nguyễn Văn A" autocomplete="off"></label><label>Lớp<input id="arCls" value="' + esc(st.cls) + '" placeholder="12A1" autocomplete="off"></label></div>' +
      '<p class="small muted" style="margin:10px 0 0">' + esc(R.prize.rule) + '</p>' +
      '<div class="row" style="margin-top:14px"><button class="btn orange" id="arShow"' + (ok ? '' : ' disabled') + '>' + I('award') + ' Mở phiếu nhận thưởng</button>' +
      (ok ? '' : '<span class="small muted">' + (!all ? 'Chơi đủ 3 thử thách để mở phiếu (còn: ' + MODES.filter(m => !pl[m.w]).map(m => m.t).join(', ') + ').' : 'Nhập họ tên và lớp để mở phiếu.') + '</span>') + '</div>';
  }
  draw();
  box.addEventListener('change', e => {
    if (e.target.id === 'arName') { st.name = e.target.value.trim(); A.save(); draw(); }
    if (e.target.id === 'arCls') { st.cls = e.target.value.trim(); A.save(); draw(); }
  });
  box.addEventListener('click', e => { if (e.target.closest('#arShow')) ticket(); });
}
function ticket(){
  const t = total(), rk = rankOf(t), p = parts(), d = new Date();
  const ov = document.createElement('div'); ov.className = 'ar-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Phiếu nhận thưởng');
  ov.innerHTML = '<div class="ar-ticket" style="--rc:' + (rk ? rk.c : '#64748b') + '"><button class="ar-x" aria-label="Đóng">' + I('x') + '</button>' +
    '<div class="ar-tk-top">' + esc(D.site.school || D.site.name) + '</div><div class="ar-tk-sub">ĐẤU TRƯỜNG AI · PHIẾU NHẬN THƯỞNG</div>' +
    '<div class="ar-medal">' + I('award') + '</div><div class="ar-rank">' + (rk ? 'HẠNG ' + rk.n : 'CHƯA XẾP HẠNG') + '</div>' +
    '<div class="ar-tk-name">' + esc(st.name) + '</div><div class="ar-tk-cls">Lớp ' + esc(st.cls) + '</div>' +
    '<div class="ar-tk-score"><b>' + t + '</b>/100 điểm</div>' +
    '<div class="ar-tk-parts"><span>Thật hay Giả ' + p.tf + '</span><span>Nhà kiến tạo ' + p.ladder + '</span><span>Điện thoại ' + p.phone + '</span></div>' +
    '<div class="ar-code">Mã xác nhận <b>' + code(st.name, st.cls, t) + '</b></div>' +
    '<div class="ar-tk-time">' + d.toLocaleDateString('vi-VN') + ' · ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + '</div>' +
    '<p class="ar-tk-note">' + (rk && t >= 75 ? 'Đưa phiếu này cho Ban tổ chức để nhận quà.' : 'Chơi lại để nâng hạng, từ 75 điểm (hạng VÀNG) được nhận quà.') + '</p></div>';
  document.body.appendChild(ov);
  if (rk && t >= 75) { A.SND.win(); A.confetti(); }
  const close = () => { ov.remove(); document.removeEventListener('keydown', esc_); };
  const esc_ = e => { if (e.key === 'Escape') close(); };
  ov.addEventListener('click', e => { if (e.target === ov || e.target.closest('.ar-x')) close(); });
  document.addEventListener('keydown', esc_);
  $('.ar-x', ov).focus();
}

/* ---------- AI LÀ NHÀ KIẾN TẠO SỐ? ---------- */
function ladder(v){
  const T = 30, RUNGS = R.rungs;
  v.innerHTML = P.pageHead('Đấu trường AI', 'Ai là nhà kiến tạo số?', '12 câu hỏi từ dễ tới khó, 30 giây mỗi câu. Trả lời sai là dừng cuộc chơi. Em có 3 quyền trợ giúp, mỗi quyền dùng một lần.') +
    '<div class="game ar-wide"><a class="ar-back" href="#minigame">' + I('left') + ' Đấu trường AI</a><div id="g"></div></div>';
  const g = $('#g', v);
  let qs, spare, lv, qi = 0, used, timer, t0, done_, aiHint, cut;
  function setup(){
    const tier = k => A.shuffle(R.ladder[k]);
    const e = tier('e'), m = tier('m'), h = tier('h');
    qs = [...e.slice(0, 4), ...m.slice(0, 4), ...h.slice(0, 4)];
    spare = { e: e.slice(4), m: m.slice(4), h: h.slice(4) };
    lv = 0; used = { f50: false, swap: false, ai: false };
    qs = qs.map(shuffleQ);
    ask();
  }
  function shuffleQ(q){ const ord = A.shuffle([0, 1, 2, 3]); return { q: q.q, o: ord.map(k => q.o[k]), a: ord.indexOf(q.a), e: q.e }; }
  const tierOf = i => i < 4 ? 'e' : i < 8 ? 'm' : 'h';
  function ladderHTML(){
    return '<ol class="ar-ladder">' + RUNGS.map((r, i) => '<li class="' + (i < lv ? 'fin' : i === lv ? 'on' : '') + (i === 3 || i === 7 ? ' ms' : '') + '"><span>' + (i + 1) + '</span>' + esc(r) + '</li>').reverse().join('') + '</ol>';
  }
  function ask(){
    done_ = false; aiHint = null; cut = []; qi = lv;
    render(); t0 = performance.now(); clearInterval(timer);
    timer = setInterval(() => {
      const left = T - (performance.now() - t0) / 1000, bar = $('#gBar', g);
      if (!bar) { clearInterval(timer); return; }
      bar.style.transform = 'scaleX(' + Math.max(left / T, 0) + ')';
      $('#gT', g).innerHTML = I('clock') + ' ' + Math.ceil(Math.max(left, 0)) + 's';
      if (left <= 5 && left > 0 && Math.ceil(left) !== ask.lastTick) { ask.lastTick = Math.ceil(left); A.SND.tick && A.SND.tick(); }
      if (left <= 0) answer(null);
    }, 100);
  }
  function render(fb){
    const q = qs[qi];
    g.innerHTML = '<div class="ar-lwrap">' + ladderHTML() + '<div class="gcard ar-lcard">' +
      '<div class="gtop"><span class="pill">Nấc ' + (qi + 1) + '/12 · ' + ['Dễ', 'Vừa', 'Khó'][Math.floor(qi / 4)] + '</span><span class="pill" id="gT">' + I('clock') + ' ' + T + 's</span></div>' +
      '<div class="gtimer"><i id="gBar"></i></div>' +
      '<div class="ar-life">' +
        '<button data-l="f50"' + (used.f50 || done_ ? ' disabled' : '') + '><b>50:50</b><small>Bỏ 2 đáp án sai</small></button>' +
        '<button data-l="swap"' + (used.swap || done_ ? ' disabled' : '') + '>' + I('refresh') + '<small>Đổi câu hỏi</small></button>' +
        '<button data-l="ai"' + (used.ai || done_ ? ' disabled' : '') + '>' + I('bot') + '<small>Hỏi AI</small></button></div>' +
      '<div class="gq ar-q">' + esc(q.q) + '</div>' +
      (aiHint ? '<div class="ar-ai">' + I('bot') + '<div><b>Trợ lý AI:</b> “Tôi chắc chắn ' + aiHint.p + '% đáp án đúng là <b>' + LETTERS[aiHint.k] + '</b>.”<small>Nhớ nhé: AI có thể sai một cách rất tự tin. Người quyết định là em!</small></div></div>' : '') +
      '<div class="ar-opts">' + q.o.map((o, k) => {
        let c = 'ar-opt'; if (fb) { if (k === q.a) c += ' ok'; else if (k === fb.pick) c += ' no'; }
        return '<button class="' + c + '" data-k="' + k + '"' + (cut.includes(k) || fb ? ' disabled' : '') + (cut.includes(k) ? ' style="visibility:hidden"' : '') + '><span>' + LETTERS[k] + '</span>' + esc(o) + '</button>';
      }).join('') + '</div>' +
      (fb ? fb.html : '') + '</div></div>';
  }
  function answer(k){
    if (done_) return; done_ = true; clearInterval(timer);
    const q = qs[qi], ok = k === q.a;
    const aiWrong = aiHint && aiHint.k !== q.a;
    if (ok) {
      A.SND.ok(); lv++;
      const last = lv >= 12;
      render({ pick: k, html: '<div class="fb ok" style="text-align:left;margin-top:14px">' + I('check') + '<div><b>Chính xác! Em lên nấc “' + esc(RUNGS[lv - 1]) + '”.</b> ' + esc(q.e) + (aiWrong ? ' <i>Em đã không tin AI khi AI sai. Tuyệt vời!</i>' : '') + '</div></div><div class="row" style="justify-content:center;margin-top:14px"><button class="btn orange" id="lNext">' + (last ? I('award') + ' Nhận danh hiệu' : 'Câu tiếp theo ' + I('right')) + '</button></div>' });
      if (lv >= 12) finish(true);
    } else {
      A.SND.no();
      render({ pick: k, html: '<div class="fb no" style="text-align:left;margin-top:14px">' + I('alert') + '<div><b>' + (k === null ? 'Hết giờ!' : 'Chưa đúng!') + ' Đáp án: ' + LETTERS[q.a] + '.</b> ' + esc(q.e) + (aiWrong && k === aiHint.k ? ' <i>Lần này AI đã “ảo giác”: trả lời sai mà vẫn rất tự tin.</i>' : '') + '</div></div><div class="row" style="justify-content:center;margin-top:14px"><button class="btn orange" id="lEnd">' + I('award') + ' Xem kết quả</button></div>' });
      finish(false);
    }
    const nb = $('#lNext', g) || $('#lEnd', g); nb && nb.focus();
  }
  function finish(win){
    st.arena.lPlays++; st.arena.ladder = Math.max(st.arena.ladder || 0, lv); A.save();
    finish.win = win;
  }
  function result(){
    const title = lv ? RUNGS[lv - 1] : 'Chưa có danh hiệu';
    if (lv >= 8) { A.SND.win(); A.confetti(); }
    g.innerHTML = '<div class="gcard"><div class="eyebrow">Kết quả</div><div class="gres">' + lv + '/12 nấc</div><p style="font-weight:800;font-size:1.15rem">Danh hiệu: ' + esc(title) + '</p>' +
      '<p class="muted">Kỷ lục của em: ' + st.arena.ladder + '/12 · tính ' + parts().ladder + '/' + R.prize.weights.ladder + ' điểm vào phiếu thưởng.</p>' +
      '<div class="row" style="justify-content:center;margin-top:12px"><button class="btn orange" id="lAgain">' + I('refresh') + ' Chơi lại</button><a class="btn ghost" href="#minigame">' + I('award') + ' Về Đấu trường</a></div></div>';
  }
  g.addEventListener('click', e => {
    const o = e.target.closest('[data-k]'); if (o && !done_) { answer(+o.dataset.k); return; }
    const l = e.target.closest('[data-l]');
    if (l && !done_) {
      const q = qs[qi], k = l.dataset.l; A.SND.tap();
      if (k === 'f50') { used.f50 = true; cut = A.shuffle([0, 1, 2, 3].filter(x => x !== q.a)).slice(0, 2); }
      if (k === 'swap') { const sp = spare[tierOf(qi)]; if (sp.length) { used.swap = true; qs[qi] = shuffleQ(sp.shift()); cut = []; aiHint = null; t0 = performance.now(); } }
      if (k === 'ai') {
        used.ai = true;
        const pr = { e: .8, m: .65, h: .5 }[tierOf(qi)];
        const pool = [0, 1, 2, 3].filter(x => !cut.includes(x));
        const right = Math.random() < pr, wrongs = pool.filter(x => x !== q.a);
        aiHint = { k: right || !wrongs.length ? q.a : wrongs[Math.floor(Math.random() * wrongs.length)], p: 88 + Math.floor(Math.random() * 11) };
      }
      const left = T - (performance.now() - t0) / 1000;
      render(); const bar = $('#gBar', g); if (bar) bar.style.transform = 'scaleX(' + Math.max(left / T, 0) + ')';
      return;
    }
    if (e.target.closest('#lNext')) { if (lv >= 12) result(); else ask(); return; }
    if (e.target.closest('#lEnd')) { result(); return; }
    if (e.target.closest('#lAgain') || e.target.closest('#lGo')) setup();
  });
  const key = e => {
    if (!document.body.contains(g)) return;
    const i = 'abcd'.indexOf(e.key.toLowerCase());
    if (i >= 0 && !done_ && qs && $('.ar-opt', g)) { const b = $$('.ar-opt', g)[i]; if (b && !b.disabled) answer(i); }
  };
  document.addEventListener('keydown', key);
  g.innerHTML = '<div class="gcard gstart"><span class="pill">' + I('flash') + ' 12 nấc · 30 giây/câu · 3 quyền trợ giúp</span><h2 style="margin:16px 0 6px">Ai là nhà kiến tạo số?</h2><p>Từ “Người dùng mới” leo lên “NHÀ KIẾN TẠO SỐ”. Quyền trợ giúp “Hỏi AI” rất tự tin… nhưng không phải lúc nào cũng đúng!</p>' +
    (st.arena.ladder ? '<p><b>Kỷ lục của em: ' + st.arena.ladder + '/12 nấc</b></p>' : '') + '<p class="small">Bàn phím: phím A, B, C, D để chọn đáp án.</p>' +
    '<div class="row" style="justify-content:center;margin-top:18px"><button class="btn orange" id="lGo">' + I('play') + ' Bắt đầu</button></div></div>';
  return () => { clearInterval(timer); document.removeEventListener('keydown', key); };
}

/* ---------- ĐIỆN THOẠI BÁO ĐỘNG ---------- */
function phone(v){
  const N = 6, T = 25;
  v.innerHTML = P.pageHead('Đấu trường AI', 'Điện thoại báo động', N + ' tình huống ngẫu nhiên. Đọc tin nhắn, cuộc gọi rồi chọn cách xử lý trong ' + T + ' giây. Xử lý tốt nhất +2, tạm được +1, nguy hiểm 0 điểm.') +
    '<div class="game ar-wide"><a class="ar-back" href="#minigame">' + I('left') + ' Đấu trường AI</a><div id="g"></div></div>';
  const g = $('#g', v);
  let list, i, score, timer, t0, done_, typing = [], log;
  function clearT(){ clearInterval(timer); typing.forEach(clearTimeout); typing = []; }
  function start(){ list = A.shuffle(R.phone).slice(0, N).map(s => Object.assign({}, s, { o: A.shuffle(s.o) })); i = 0; score = 0; log = []; show(); }
  function show(){
    clearT(); done_ = false;
    const s = list[i];
    g.innerHTML = '<div class="ar-ph-wrap"><div class="ar-phone' + (s.call ? ' call' : '') + '"><div class="ar-notch"></div>' +
      '<div class="ar-ph-head"><span class="ar-av" style="background:' + s.c + '">' + esc(s.av) + '</span><div><b>' + esc(s.from) + '</b><small>' + esc(s.app) + (s.call ? ' · đang gọi…' : '') + '</small></div></div>' +
      '<div class="ar-chat" id="pChat"></div></div>' +
      '<div class="ar-side"><div class="gtop"><span class="pill">Tình huống ' + (i + 1) + '/' + N + '</span><span class="pill">' + I('star') + ' ' + score + ' điểm</span><span class="pill" id="gT">' + I('clock') + ' ' + T + 's</span></div>' +
      '<div class="gtimer"><i id="gBar"></i></div><h3 class="ar-ask">Em sẽ làm gì?</h3><div class="ar-popts" id="pOpts"><p class="muted small">Đang nhận tin nhắn…</p></div><div id="pFb"></div></div></div>';
    const chat = $('#pChat', g);
    s.msgs.forEach((m, k) => {
      typing.push(setTimeout(() => { chat.insertAdjacentHTML('beforeend', '<div class="ar-typing"><i></i><i></i><i></i></div>'); }, k * 1100));
      typing.push(setTimeout(() => { const ty = $('.ar-typing', chat); ty && ty.remove(); chat.insertAdjacentHTML('beforeend', '<div class="ar-msg">' + esc(m) + '</div>'); A.SND.tap(); }, k * 1100 + 700));
    });
    typing.push(setTimeout(opts, s.msgs.length * 1100 + 200));
  }
  function opts(){
    const s = list[i];
    $('#pOpts', g).innerHTML = s.o.map((o, k) => '<button class="ar-popt" data-k="' + k + '"><span>' + LETTERS[k] + '</span>' + esc(o.t) + '</button>').join('');
    t0 = performance.now(); clearInterval(timer);
    timer = setInterval(() => {
      const left = T - (performance.now() - t0) / 1000, bar = $('#gBar', g);
      if (!bar) { clearInterval(timer); return; }
      bar.style.transform = 'scaleX(' + Math.max(left / T, 0) + ')';
      $('#gT', g).innerHTML = I('clock') + ' ' + Math.ceil(Math.max(left, 0)) + 's';
      if (left <= 0) pick(null);
    }, 100);
  }
  function pick(k){
    if (done_) return; done_ = true; clearInterval(timer);
    const s = list[i], o = k === null ? null : s.o[k], pts = o ? o.s : 0, best = s.o.findIndex(x => x.s === 2);
    score += pts; log.push(pts);
    pts === 2 ? A.SND.ok() : A.SND.no();
    $$('.ar-popt', g).forEach((b, j) => { b.disabled = true; b.classList.add('s' + s.o[j].s); if (j === k) b.classList.add('picked'); });
    const lab = o === null ? 'Hết giờ! 0 điểm' : pts === 2 ? 'Xử lý xuất sắc! +2' : pts === 1 ? 'Tạm được. +1' : 'Nguy hiểm! 0 điểm';
    $('#pFb', g).innerHTML = '<div class="fb ' + (pts === 2 ? 'ok' : pts === 1 ? 'mid' : 'no') + '" style="text-align:left;margin-top:14px">' + I(pts === 2 ? 'check' : 'alert') + '<div><b>' + lab + '</b> ' + esc(o ? o.e : '') + (pts < 2 ? '<br><b>Cách tốt nhất:</b> ' + esc(s.o[best].t) + '. ' + esc(s.o[best].e) : '') + '</div></div>' +
      '<div class="row" style="margin-top:12px"><button class="btn orange" id="pNext">' + (i < N - 1 ? 'Tình huống tiếp ' + I('right') : I('award') + ' Xem kết quả') + '</button></div>';
    $('#pNext', g).focus();
  }
  function result(){
    st.arena.pPlays++; st.arena.phone = Math.max(st.arena.phone || 0, score); A.save();
    if (score >= 9) { A.SND.win(); A.confetti(); }
    const msg = score >= 11 ? 'Chiếc điện thoại an toàn nhất lớp!' : score >= 9 ? 'Rất tỉnh táo trước bẫy lừa và deepfake.' : score >= 6 ? 'Khá ổn, đọc lại các cách xử lý tốt nhất nhé.' : 'Điện thoại của em đang gặp nguy! Chơi lại để luyện phản xạ.';
    g.innerHTML = '<div class="gcard"><div class="eyebrow">Kết quả</div><div class="gres">' + score + '/' + (N * 2) + '</div><p style="font-weight:800">' + msg + '</p>' +
      '<div class="row" style="justify-content:center;gap:6px;margin:12px 0">' + log.map(x => '<span class="ar-dot s' + x + '">' + x + '</span>').join('') + '</div>' +
      '<p class="muted">Kỷ lục: ' + st.arena.phone + '/12 · tính ' + parts().phone + '/' + R.prize.weights.phone + ' điểm vào phiếu thưởng.</p>' +
      '<div class="row" style="justify-content:center;margin-top:12px"><button class="btn orange" id="pAgain">' + I('refresh') + ' Chơi lại (tình huống mới)</button><a class="btn ghost" href="#minigame">' + I('award') + ' Về Đấu trường</a></div></div>';
  }
  g.addEventListener('click', e => {
    const b = e.target.closest('[data-k]'); if (b && !done_) { pick(+b.dataset.k); return; }
    if (e.target.closest('#pNext')) { i++; if (i < N) show(); else result(); return; }
    if (e.target.closest('#pAgain') || e.target.closest('#pGo')) start();
  });
  g.innerHTML = '<div class="gcard gstart"><span class="pill">' + I('phone') + ' ' + N + ' tình huống · ' + T + ' giây/tình huống</span><h2 style="margin:16px 0 6px">Điện thoại báo động</h2><p>Cuộc gọi video từ “mẹ”, tin nhắn trúng học bổng, clip deepfake trong nhóm lớp… Em có giữ được bình tĩnh?</p>' +
    (st.arena.phone ? '<p><b>Kỷ lục của em: ' + st.arena.phone + '/12</b></p>' : '') +
    '<div class="row" style="justify-content:center;margin-top:18px"><button class="btn orange" id="pGo">' + I('play') + ' Mở điện thoại</button></div></div>';
  return () => clearT();
}

/* ---------- RUNG CHUÔNG VÀNG (trình chiếu) ---------- */
function bell(v){
  const B = R.bell, T = B.time;
  const bank = A.shuffle([
    ...['e', 'm', 'h'].flatMap(k => R.ladder[k].map(q => ({ type: 'mcq', lv: k, q: q.q, o: q.o, a: q.a, e: q.e }))),
    ...D.tf.map(q => ({ type: 'tf', lv: 'tf', q: q.q, a: q.a, e: q.e }))
  ]);
  let idx = -1, timer = null, t0 = 0, left = T, revealed = false, alive = 0, filter = 'all';
  v.innerHTML = '<div class="bell"><div class="bell-top"><a class="ar-back light" href="#minigame">' + I('left') + ' Đấu trường AI</a><b>' + I('megaphone') + ' ' + esc(B.title) + '</b><span class="bell-school">' + esc(D.site.school || D.site.name) + '</span><button class="btn ghost small" id="bFs">' + I('expand') + ' Toàn màn hình</button></div>' +
    '<div class="bell-stage" id="bStage"></div>' +
    '<div class="bell-ctrl"><div class="bell-alive"><span>Còn trên sàn</span><button id="bMinus" aria-label="Bớt một bạn">−</button><input id="bAlive" type="number" min="0" value="0" aria-label="Số bạn còn trên sàn"><button id="bPlus" aria-label="Thêm một bạn">+</button></div>' +
    '<select id="bFilter" aria-label="Loại câu hỏi"><option value="all">Tất cả câu hỏi</option><option value="tf">Đúng / Sai</option><option value="e">Trắc nghiệm dễ</option><option value="m">Trắc nghiệm vừa</option><option value="h">Trắc nghiệm khó</option></select>' +
    '<button class="btn" id="bNext">' + I('right') + ' Câu mới (N)</button><button class="btn orange" id="bGo">' + I('play') + ' Đếm giờ (Space)</button><button class="btn ghost" id="bShow">' + I('eye') + ' Đáp án (Enter)</button></div>' +
    '<details class="bell-verify"><summary>' + I('award') + ' Kiểm tra phiếu nhận thưởng của học sinh</summary><div class="ar-form"><label>Họ và tên<input id="vName"></label><label>Lớp<input id="vCls"></label><label>Tổng điểm<input id="vScore" type="number" min="0" max="100"></label><label>Mã xác nhận<input id="vCode" maxlength="6" style="text-transform:uppercase"></label></div><div class="row" style="margin-top:10px"><button class="btn small" id="vGo">Kiểm tra</button><span id="vRes"></span></div><p class="small muted">Mã được tính từ họ tên, lớp và tổng điểm. Phiếu sửa tay sẽ không khớp mã.</p></details></div>';
  const stage = $('#bStage', v);
  function cur(){ return bank[idx]; }
  function draw(){
    const q = cur();
    if (!q) { stage.innerHTML = '<div class="bell-intro"><div class="bell-big">' + I('megaphone') + '</div><h1>' + esc(B.title) + '</h1><p>' + esc(B.lead) + '</p><p class="bell-hint">Bấm <b>Câu mới</b> hoặc phím <b>N</b> để bắt đầu.</p></div>'; return; }
    stage.innerHTML = '<div class="bell-q"><div class="bell-meta"><span>Câu ' + (bell.count || 1) + '</span><span>' + (q.type === 'tf' ? 'ĐÚNG hay SAI?' : 'Chọn A, B, C hay D') + '</span></div>' +
      '<div class="bell-clock' + (left <= 5 && timer ? ' warn' : '') + '"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54"/><circle class="p" cx="60" cy="60" r="54" style="stroke-dashoffset:' + (339.3 * (1 - left / T)) + '"/></svg><b>' + Math.ceil(left) + '</b></div>' +
      '<h2>' + esc(q.q) + '</h2>' +
      (q.type === 'tf' ? '<div class="bell-opts tf"><div class="' + (revealed ? (q.a ? 'ok' : 'dim') : '') + '">ĐÚNG</div><div class="' + (revealed ? (!q.a ? 'ok' : 'dim') : '') + '">SAI</div></div>'
        : '<div class="bell-opts">' + q.o.map((o, k) => '<div class="' + (revealed ? (k === q.a ? 'ok' : 'dim') : '') + '"><span>' + LETTERS[k] + '</span>' + esc(o) + '</div>').join('') + '</div>') +
      (revealed ? '<div class="bell-exp">' + I('check') + ' ' + esc(q.e) + '</div>' : '') + '</div>';
  }
  function next(){
    clearInterval(timer); timer = null; left = T; revealed = false;
    do { idx = (idx + 1) % bank.length; } while (filter !== 'all' && bank[idx].lv !== filter);
    bell.count = (bell.count || 0) + 1; A.SND.flip && A.SND.flip(); draw();
  }
  function go(){
    if (!cur() || revealed || timer) return;
    t0 = performance.now() - (T - left) * 1000;
    timer = setInterval(() => {
      const l = T - (performance.now() - t0) / 1000;
      if (Math.ceil(l) !== Math.ceil(left) && l > 0) A.SND.tick && A.SND.tick();
      left = Math.max(l, 0); draw();
      if (left <= 0) { clearInterval(timer); timer = null; A.SND.no(); }
    }, 200);
    draw();
  }
  function show(){ if (!cur()) return; clearInterval(timer); timer = null; revealed = true; A.SND.win(); draw(); }
  v.addEventListener('click', e => {
    if (e.target.closest('#bNext')) next();
    if (e.target.closest('#bGo')) go();
    if (e.target.closest('#bShow')) show();
    if (e.target.closest('#bMinus')) { alive = Math.max(0, alive - 1); $('#bAlive', v).value = alive; }
    if (e.target.closest('#bPlus')) { alive++; $('#bAlive', v).value = alive; }
    if (e.target.closest('#bFs')) { const el = $('.bell', v); (document.fullscreenElement ? document.exitFullscreen() : (el.requestFullscreen ? el.requestFullscreen() : Promise.reject())).catch(() => A.toast('Trình duyệt này không cho phép toàn màn hình. Hãy nhấn F11.')); }
    if (e.target.closest('#vGo')) {
      const n = $('#vName', v).value, c = $('#vCls', v).value, s = parseInt($('#vScore', v).value, 10), k = $('#vCode', v).value.trim().toUpperCase();
      const ok = n.trim() && c.trim() && !isNaN(s) && code(n, c, s) === k;
      $('#vRes', v).innerHTML = ok ? '<b style="color:var(--green)">' + I('check') + ' Hợp lệ' + (s >= 75 ? ' – đủ điều kiện nhận quà' : ' – chưa đủ 75 điểm') + '</b>' : '<b style="color:var(--red)">' + I('x') + ' Không khớp. Kiểm tra lại họ tên, lớp, điểm.</b>';
    }
  });
  $('#bAlive', v).addEventListener('input', e => { alive = Math.max(0, parseInt(e.target.value, 10) || 0); });
  $('#bFilter', v).addEventListener('change', e => { filter = e.target.value; });
  const key = e => {
    if (!document.body.contains(stage) || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === ' ') { e.preventDefault(); go(); }
    if (e.key === 'Enter') { e.preventDefault(); show(); }
    if (e.key.toLowerCase() === 'n') next();
  };
  document.addEventListener('keydown', key);
  bell.count = 0; draw();
  return () => { clearInterval(timer); document.removeEventListener('keydown', key); };
}

/* ---------- ĐỊNH TUYẾN ---------- */
P.minigame = function(v, param){
  if (param === 'thathaygia') return P.mgTF(v);
  if (param === 'trieuphu') return ladder(v);
  if (param === 'dienthoai') return phone(v);
  if (param === 'rungchuong') return bell(v);
  return hub(v);
};
})();
