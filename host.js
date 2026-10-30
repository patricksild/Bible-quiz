/* Quizmaster / storskærm. Denne side er "spilleder": den styrer faserne
   og regner point ud. Telefonerne (play.html) sender kun svar. */
(function () {
  'use strict';

  var Live = window.Live;
  var QS = window.QUESTIONS;
  var app = document.getElementById('app');
  var esc = Live.esc;

  var H = {
    lang: load('bq_hostlang', 'da'),
    total: 10, dur: 15, lo: 1, hi: 20,
    code: null, cfg: null, qs: null, st: null, players: {},
    answerCount: 0, answersRef: null, answersQ: -1,
    refs: [], timer: null, revealing: false, resumeCode: null
  };

  function load(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function remove(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  function S() { return Live.S[H.lang]; }
  function base() { return Live.db.ref('games/' + H.code); }
  function playerIds() { return Object.keys(H.players); }

  /* ---------- start ---------- */
  Live.ready().then(function () {
    var saved = load('bq_host_code', '');
    if (!saved) return renderSetup();
    return Live.db.ref('games/' + saved).once('value').then(function (s) {
      var g = s.val();
      if (g && g.hostUid === Live.uid && g.state && g.state.phase !== 'final') H.resumeCode = saved;
      else remove('bq_host_code');
      renderSetup();
    });
  }).catch(function (e) {
    var s = Live.S[H.lang];
    var msg = e && e.message === 'config' ? s.configBody : s.connectError;
    var title = e && e.message === 'config' ? s.configTitle : s.hostTitle;
    app.innerHTML = '<div class="card"><h2>' + esc(title) + '</h2><p>' + esc(msg) + '</p></div>';
  });

  /* ---------- opsætning ---------- */
  function renderSetup() {
    clearInterval(H.timer);
    var s = S();
    document.documentElement.lang = H.lang;
    function opts(list, cur, suffix) {
      return list.map(function (n) { return '<option value="' + n + '"' + (n === cur ? ' selected' : '') + '>' + n + (suffix || '') + '</option>'; }).join('');
    }
    var lvls = []; for (var i = 1; i <= 20; i++) lvls.push(i);
    app.innerHTML =
      '<div class="card">' +
      '<div class="logo">BIBELQUIZ · LIVE</div>' +
      '<h2>' + s.setupTitle + '</h2>' +
      '<label class="f">' + s.screenLang + '</label>' +
      '<div class="langtog"><button type="button" data-act="lang" data-v="da" class="' + (H.lang === 'da' ? 'on' : '') + '">Dansk</button>' +
      '<button type="button" data-act="lang" data-v="en" class="' + (H.lang === 'en' ? 'on' : '') + '">English</button></div>' +
      '<div class="row2"><div><label class="f">' + s.numQ + '</label><select id="total">' + opts([5, 10, 15, 20, 25, 30], H.total) + '</select></div>' +
      '<div><label class="f">' + s.secs + '</label><select id="dur">' + opts([10, 15, 20, 30], H.dur, ' s') + '</select></div></div>' +
      '<label class="f">' + s.level + '</label>' +
      '<div class="presets">' +
      [['all', 1, 20], ['children', 1, 6], ['confirm', 4, 12], ['student', 10, 20]].map(function (p) {
        return '<button type="button" class="btn small" data-act="preset" data-lo="' + p[1] + '" data-hi="' + p[2] + '">' + s.presets[p[0]] + '</button>';
      }).join('') + '</div>' +
      '<div class="row2" style="margin-top:10px"><div><label class="f">' + s.from + '</label><select id="lo">' + opts(lvls, H.lo) + '</select></div>' +
      '<div><label class="f">' + s.to + '</label><select id="hi">' + opts(lvls, H.hi) + '</select></div></div>' +
      '<div id="msg"></div>' +
      '<button type="button" class="btn primary block" data-act="create">' + s.create + '</button>' +
      (H.resumeCode ? '<button type="button" class="btn block" data-act="resume">' + s.resume + ' (' + H.resumeCode + ')</button>' : '') +
      '</div>';
  }

  function readSetup() {
    H.total = parseInt(document.getElementById('total').value, 10);
    H.dur = parseInt(document.getElementById('dur').value, 10);
    H.lo = parseInt(document.getElementById('lo').value, 10);
    H.hi = parseInt(document.getElementById('hi').value, 10);
    if (H.lo > H.hi) { var x = H.lo; H.lo = H.hi; H.hi = x; }
  }

  function createGame() {
    readSetup();
    var pool = Live.shuffle(QS.map(function (q, i) { return { q: q, i: i }; })
      .filter(function (x) { return x.q.l >= H.lo && x.q.l <= H.hi; }));
    var total = Math.min(H.total, pool.length);
    if (total < 3) {
      document.getElementById('msg').innerHTML = '<div class="err">' + esc(S().notEnough) + '</div>';
      return;
    }
    var qs = pool.slice(0, total).map(function (x) { return { i: x.i, o: Live.shuffle([0, 1, 2, 3]) }; });
    tryCode(0, qs, total);
  }

  function tryCode(attempt, qs, total) {
    if (attempt > 8) { document.getElementById('msg').innerHTML = '<div class="err">' + esc(S().connectError) + '</div>'; return; }
    var code = String(Math.floor(10000 + Math.random() * 90000));
    Live.db.ref('games/' + code).once('value').then(function (s) {
      if (s.exists()) return tryCode(attempt + 1, qs, total);
      return Live.db.ref('games/' + code).set({
        hostUid: Live.uid,
        created: Live.ts,
        cfg: { total: total, dur: H.dur, hostLang: H.lang, lo: H.lo, hi: H.hi },
        qs: qs,
        state: { phase: 'lobby', q: -1 }
      }).then(function () {
        save('bq_host_code', code);
        save('bq_hostlang', H.lang);
        attach(code);
      });
    }).catch(function () {
      var m = document.getElementById('msg');
      if (m) m.innerHTML = '<div class="err">' + esc(S().connectError) + '</div>';
    });
  }

  /* ---------- lyt til databasen ---------- */
  function detach() {
    H.refs.forEach(function (r) { r.off(); });
    H.refs = [];
    if (H.answersRef) { H.answersRef.off(); H.answersRef = null; }
    H.answersQ = -1;
    clearInterval(H.timer);
  }

  function attach(code) {
    detach();
    H.code = code; H.revealing = false; H.answerCount = 0;
    Live.db.ref('games/' + code).once('value').then(function (s) {
      var g = s.val();
      if (!g) { remove('bq_host_code'); H.resumeCode = null; return renderSetup(); }
      H.cfg = g.cfg; H.qs = g.qs; H.lang = g.cfg.hostLang || H.lang;
      var stRef = base().child('state');
      var plRef = base().child('players');
      stRef.on('value', function (ss) { H.st = ss.val(); onState(); });
      plRef.on('value', function (ps) { H.players = ps.val() || {}; onPlayers(); });
      H.refs.push(stRef, plRef);
    });
  }

  function onState() {
    if (!H.st) return;
    if (H.st.phase === 'question') {
      if (H.answersQ !== H.st.q) attachAnswers(H.st.q);
      H.revealing = false;
    }
    render();
  }

  function attachAnswers(q) {
    if (H.answersRef) H.answersRef.off();
    H.answersQ = q; H.answerCount = 0;
    H.answersRef = base().child('answers/' + q);
    H.answersRef.on('value', function (s) {
      var v = s.val() || {};
      H.answerCount = Object.keys(v).filter(function (pid) { return H.players[pid]; }).length;
      var el = document.getElementById('ans');
      if (el) el.textContent = H.answerCount + ' / ' + playerIds().length + ' ' + S().answered;
    });
  }

  function onPlayers() {
    if (!H.st) return;
    if (H.st.phase === 'lobby') updateLobby();
    else if (H.st.phase === 'question') {
      var el = document.getElementById('ans');
      if (el) el.textContent = H.answerCount + ' / ' + playerIds().length + ' ' + S().answered;
    }
  }

  /* ---------- visning ---------- */
  function render() {
    clearInterval(H.timer);
    document.documentElement.lang = H.lang;
    var ph = H.st && H.st.phase;
    if (ph === 'lobby') renderLobby();
    else if (ph === 'question') renderQuestion();
    else if (ph === 'reveal') renderReveal();
    else if (ph === 'final') renderFinal();
  }

  function joinUrl() {
    return new URL('play.html?code=' + H.code, location.href).href;
  }
  function joinShort() {
    return new URL('play.html', location.href).href.replace(/^https?:\/\//, '');
  }
  function qrSvg() {
    try {
      var qr = window.qrcode(0, 'M');
      qr.addData(joinUrl());
      qr.make();
      return qr.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
    } catch (e) { return ''; }
  }

  function renderLobby() {
    var s = S();
    app.className = 'screen big-lobby';
    var svg = qrSvg();
    app.innerHTML =
      '<div class="logo">BIBELQUIZ · LIVE</div>' +
      '<div class="join-line">' + s.joinAt + ' <b>' + esc(joinShort()) + '</b> ' + s.enterCode + '</div>' +
      '<div class="codebig">' + esc(H.code) + '</div>' +
      (svg ? '<div class="join-line">' + s.orScan + '</div><div class="qr">' + svg + '</div>' : '') +
      '<div class="count" id="pc"></div>' +
      '<div class="names" id="names"></div>' +
      '<div class="foot" style="justify-content:center;gap:14px">' +
      '<button type="button" class="btn primary" id="startBtn" data-act="start">' + s.start + '</button>' +
      '<button type="button" class="btn" data-act="cancel">' + s.cancel + '</button></div>';
    updateLobby();
  }

  function updateLobby() {
    var pc = document.getElementById('pc');
    if (!pc) return;
    var ids = playerIds();
    pc.textContent = ids.length ? ids.length + ' ' + S().players : S().waiting;
    var names = ids.map(function (id) { return H.players[id].name; }).reverse().slice(0, 60);
    document.getElementById('names').innerHTML = names.map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('');
    document.getElementById('startBtn').disabled = ids.length === 0;
  }

  function optsHtml(qd, o, reveal) {
    var correctPos = o.indexOf(0);
    var counts = (H.st && H.st.counts) || [0, 0, 0, 0];
    var tot = counts.reduce(function (a, b) { return a + b; }, 0) || 1;
    return '<div class="bigopts">' + o.map(function (k, pos) {
      var cls = 'bigopt c' + pos;
      if (reveal) cls += pos === correctPos ? ' correct' : ' dim';
      return '<div class="' + cls + '"><span class="shape">' + Live.SHAPES[pos] + '</span><span>' + esc(Live.optText(qd, H.lang, k)) + '</span>' +
        (reveal ? '<span class="cnt">' + (counts[pos] || 0) + '</span><span class="fill" style="width:' + Math.round((counts[pos] || 0) / tot * 100) + '%"></span>' : '') +
        '</div>';
    }).join('') + '</div>';
  }

  function renderQuestion() {
    var s = S(), i = H.st.q, item = H.qs[i], qd = QS[item.i];
    app.className = 'screen';
    app.innerHTML =
      '<div class="qhead"><span>' + s.question + ' ' + (i + 1) + ' / ' + H.qs.length + '</span><span class="timer" id="tm">' + H.st.dur + '</span></div>' +
      '<div class="tbar"><i id="tb"></i></div>' +
      '<div class="bigq">' + esc(qd[H.lang].q) + '</div>' +
      optsHtml(qd, item.o, false) +
      '<div class="foot"><span class="info" id="ans">' + H.answerCount + ' / ' + playerIds().length + ' ' + s.answered + '</span>' +
      '<button type="button" class="btn" data-act="reveal">' + s.showAnswer + '</button></div>';
    tick();
    H.timer = setInterval(tick, 200);
  }

  function tick() {
    var st = H.st;
    if (!st || st.phase !== 'question' || !st.start) return;
    var total = st.dur * 1000;
    var rem = st.start + total - Live.serverNow();
    var tm = document.getElementById('tm'), tb = document.getElementById('tb');
    if (tm) tm.textContent = Math.max(0, Math.ceil(rem / 1000));
    if (tb) tb.style.width = Math.max(0, Math.min(100, rem / total * 100)) + '%';
    var all = playerIds().length > 0 && H.answerCount >= playerIds().length;
    if (rem <= 0 || (all && rem < total - 1500)) reveal();
  }

  /* ---------- point og afsløring ---------- */
  function reveal() {
    if (H.revealing || !H.st || H.st.phase !== 'question') return;
    H.revealing = true;
    clearInterval(H.timer);
    var st = H.st, qi = st.q, item = H.qs[qi], correctPos = item.o.indexOf(0);
    base().child('answers/' + qi).once('value').then(function (s) {
      var ids = playerIds();
      var res = Live.scoreRound(s.val() || {}, ids, st.start, st.dur * 1000, correctPos);
      var scores = {};
      var updates = {};
      ids.forEach(function (pid) {
        var add = res.pts[pid] || 0;
        scores[pid] = { name: H.players[pid].name, score: (H.players[pid].score || 0) + add };
        updates['players/' + pid + '/score'] = scores[pid].score;
        updates['players/' + pid + '/last'] = add;
        updates['players/' + pid + '/ok'] = res.ok[pid] === undefined ? null : res.ok[pid];
        updates['players/' + pid + '/rq'] = qi;
      });
      Live.rankPlayers(scores).forEach(function (p) { updates['players/' + p.pid + '/rank'] = p.rank; });
      updates['state'] = {
        phase: 'reveal', q: qi, start: st.start, dur: st.dur,
        counts: res.counts, fastest: res.fastest ? H.players[res.fastest].name : null
      };
      return base().update(updates);
    }).catch(function () { H.revealing = false; });
  }

  function renderReveal() {
    var s = S(), i = H.st.q, item = H.qs[i], qd = QS[item.i];
    var last = i + 1 >= H.qs.length;
    var top = Live.rankPlayers(H.players).slice(0, 5);
    app.className = 'screen';
    app.innerHTML =
      '<div class="qhead"><span>' + s.question + ' ' + (i + 1) + ' / ' + H.qs.length + '</span><span class="muted">' + esc(Live.bookRef(qd, H.lang)) + '</span></div>' +
      '<div class="bigq" style="margin-top:14px">' + esc(qd[H.lang].q) + '</div>' +
      optsHtml(qd, item.o, true) +
      '<div class="revinfo">' +
      '<div class="panel"><h3>' + s.fastest + '</h3><div style="font-size:clamp(1.3rem,2.6vw,2.2rem);font-weight:800">' +
      (H.st.fastest ? '⚡ ' + esc(H.st.fastest) : esc(s.noAnswer)) + '</div></div>' +
      '<div class="panel"><h3>' + s.top5 + '</h3><ol class="lb">' +
      top.map(function (p) { return '<li><span><span class="n">' + p.rank + '.</span>' + esc(p.name) + '</span><b>' + Live.fmt(p.score) + '</b></li>'; }).join('') +
      '</ol></div></div>' +
      '<div class="foot"><span></span><button type="button" class="btn primary" data-act="next">' + (last ? s.showWinners : s.next) + '</button></div>';
  }

  function renderFinal() {
    var s = S();
    var top = Live.rankPlayers(H.players).slice(0, 3);
    var medals = ['🥇', '🥈', '🥉'];
    function pod(idx, cls) {
      var p = top[idx];
      if (!p) return '<div class="pod ' + cls + ' empty"><div class="blk">·</div></div>';
      return '<div class="pod ' + cls + '"><div class="who">' + esc(p.name) + '</div><div class="sc">' + Live.fmt(p.score) + ' ' + s.pts + '</div><div class="blk">' + medals[idx] + '</div></div>';
    }
    app.className = 'screen';
    app.innerHTML =
      '<div class="logo" style="text-align:center">BIBELQUIZ · LIVE</div>' +
      '<h1 style="text-align:center;font-size:clamp(2rem,5vw,4rem)">🏆 ' + s.winners + '</h1>' +
      '<div class="podium">' + pod(1, 'p2') + pod(0, 'p1') + pod(2, 'p3') + '</div>' +
      '<div class="foot" style="justify-content:center"><button type="button" class="btn primary" data-act="newquiz">' + s.newQuiz + '</button></div>';
  }

  /* ---------- handlinger ---------- */
  function startQuiz() {
    if (!playerIds().length) return;
    base().child('state').set({ phase: 'question', q: 0, start: Live.ts, dur: H.cfg.dur });
  }

  function nextQuestion() {
    var st = H.st;
    if (st.q + 1 >= H.qs.length) base().child('state').set({ phase: 'final', q: st.q });
    else base().child('state').set({ phase: 'question', q: st.q + 1, start: Live.ts, dur: H.cfg.dur });
  }

  function endGame(removeData) {
    var code = H.code;
    detach();
    remove('bq_host_code');
    H.resumeCode = null; H.code = null; H.st = null; H.players = {};
    var p = removeData && code ? Live.db.ref('games/' + code).remove() : Promise.resolve();
    p.then(function () { app.className = 'screen center'; renderSetup(); });
  }

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act;
    if (act === 'lang') { readSetup(); H.lang = el.dataset.v; save('bq_hostlang', H.lang); renderSetup(); }
    else if (act === 'preset') { document.getElementById('lo').value = el.dataset.lo; document.getElementById('hi').value = el.dataset.hi; }
    else if (act === 'create') createGame();
    else if (act === 'resume') { app.className = 'screen center'; attach(H.resumeCode); }
    else if (act === 'start') startQuiz();
    else if (act === 'reveal') reveal();
    else if (act === 'next') nextQuestion();
    else if (act === 'cancel') { if (confirm(S().confirmCancel)) endGame(true); }
    else if (act === 'newquiz') endGame(true);
  });
})();
