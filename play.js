/* Deltager-siden (mobil): indtast kode, vælg sprog + navn, svar på spørgsmål */
(function () {
  'use strict';

  var Live = window.Live;
  var QS = window.QUESTIONS;
  var app = document.getElementById('app');
  var esc = Live.esc;

  var P = {
    lang: load('bq_playlang', (navigator.language || 'da').toLowerCase().indexOf('da') === 0 ? 'da' : 'en'),
    code: null, pid: null, name: '',
    st: null, qs: null, me: null, myAns: {}, fetching: {},
    refs: [], timer: null, timeUpShown: -1
  };

  function load(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function remove(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  function S() { return Live.S[P.lang]; }
  function base() { return Live.db.ref('games/' + P.code); }

  /* ---------- start ---------- */
  Live.ready().then(function () {
    var saved = null;
    try { saved = JSON.parse(load('bq_play', 'null')); } catch (e) { saved = null; }
    var urlCode = new URLSearchParams(location.search).get('code');
    if (saved && (!urlCode || urlCode === saved.code)) {
      return Live.db.ref('games/' + saved.code + '/players/' + saved.pid).once('value').then(function (s) {
        if (s.exists()) {
          P.lang = saved.lang || P.lang;
          return enter(saved.code, saved.pid, saved.name);
        }
        remove('bq_play');
        return showJoin(urlCode);
      });
    }
    return showJoin(urlCode);
  }).catch(function (e) {
    var s = S();
    var msg = e && e.message === 'config' ? s.configBody : s.connectError;
    var title = e && e.message === 'config' ? s.configTitle : s.playTitle;
    app.innerHTML = '<div class="card"><h2>' + esc(title) + '</h2><p>' + esc(msg) + '</p></div>';
  });

  function langToggle(act) {
    return '<div class="langtog"><button type="button" data-act="' + act + '" data-v="da" class="' + (P.lang === 'da' ? 'on' : '') + '">Dansk</button>' +
      '<button type="button" data-act="' + act + '" data-v="en" class="' + (P.lang === 'en' ? 'on' : '') + '">English</button></div>';
  }

  /* ---------- trin 1: kode ---------- */
  function showJoin(prefill) {
    detach();
    var s = S();
    app.className = 'screen center';
    document.documentElement.lang = P.lang;
    if (prefill && /^\d{5}$/.test(prefill)) { checkCode(prefill); return; }
    app.innerHTML =
      '<div class="card"><div class="logo">BIBELQUIZ · LIVE</div>' +
      langToggle('joinlang') +
      '<h2>' + s.playTitle + '</h2>' +
      '<label class="f" for="code">' + s.codeLabel + '</label>' +
      '<input id="code" class="codein" type="tel" inputmode="numeric" maxlength="5" autocomplete="off" placeholder="12345" aria-label="' + esc(s.codePh) + '">' +
      '<div id="msg"></div>' +
      '<button type="button" class="btn primary block" data-act="code">' + s.next2 + '</button></div>';
    var el = document.getElementById('code');
    if (el) el.focus();
  }

  function checkCode(code) {
    code = String(code || '').replace(/\D/g, '');
    var s = S();
    var msg = document.getElementById('msg');
    if (code.length !== 5) { if (msg) msg.innerHTML = '<div class="err">' + esc(s.codeNotFound) + '</div>'; return; }
    Live.db.ref('games/' + code + '/state').once('value').then(function (snap) {
      var st = snap.val();
      if (!st) return fail(s.codeNotFound);
      if (st.phase === 'final') return fail(s.codeFinished);
      P.code = code;
      showProfile();
    }).catch(function () { fail(s.connectError); });
    function fail(text) {
      if (!document.getElementById('msg')) { showJoinPlain(); }
      document.getElementById('msg').innerHTML = '<div class="err">' + esc(text) + '</div>';
    }
  }

  function showJoinPlain() {
    var s = S();
    app.className = 'screen center';
    app.innerHTML =
      '<div class="card"><div class="logo">BIBELQUIZ · LIVE</div>' + langToggle('joinlang') +
      '<h2>' + s.playTitle + '</h2>' +
      '<label class="f" for="code">' + s.codeLabel + '</label>' +
      '<input id="code" class="codein" type="tel" inputmode="numeric" maxlength="5" autocomplete="off" placeholder="12345">' +
      '<div id="msg"></div><button type="button" class="btn primary block" data-act="code">' + s.next2 + '</button></div>';
  }

  /* ---------- trin 2: sprog + navn ---------- */
  function showProfile() {
    var s = S();
    app.className = 'screen center';
    document.documentElement.lang = P.lang;
    app.innerHTML =
      '<div class="card"><div class="logo">BIBELQUIZ · LIVE</div>' +
      '<label class="f">' + s.langLabel + '</label>' + langToggle('proflang') +
      '<label class="f" for="nm">' + s.nameLabel + '</label>' +
      '<input id="nm" type="text" maxlength="16" autocomplete="off" autocapitalize="words" placeholder="' + esc(s.namePh) + '" value="' + esc(P.name) + '">' +
      '<p class="muted" style="text-align:left;margin:8px 0 0">' + s.nameHelp + '</p>' +
      '<div id="msg"></div>' +
      '<button type="button" class="btn primary block" data-act="join">' + s.join + '</button></div>';
    var el = document.getElementById('nm');
    if (el) el.focus();
  }

  function joinGame() {
    var s = S();
    var nm = document.getElementById('nm');
    var name = (nm.value || '').replace(/\s+/g, ' ').trim().slice(0, 16);
    if (!name) { document.getElementById('msg').innerHTML = '<div class="err">' + esc(s.nameNeeded) + '</div>'; return; }
    P.name = name;
    var plRef = Live.db.ref('games/' + P.code + '/players');
    plRef.once('value').then(function (snap) {
      var used = {};
      var v = snap.val() || {};
      Object.keys(v).forEach(function (k) { used[(v[k].name || '').toLowerCase()] = true; });
      var finalName = name, n = 2;
      while (used[finalName.toLowerCase()]) { finalName = name + ' ' + n; n++; }
      var ref = plRef.push();
      return ref.set({ uid: Live.uid, name: finalName, lang: P.lang, score: 0, last: 0 }).then(function () {
        save('bq_playlang', P.lang);
        save('bq_play', JSON.stringify({ code: P.code, pid: ref.key, name: finalName, lang: P.lang }));
        enter(P.code, ref.key, finalName);
      });
    }).catch(function () {
      document.getElementById('msg').innerHTML = '<div class="err">' + esc(s.connectError) + '</div>';
    });
  }

  /* ---------- med i spillet ---------- */
  function detach() {
    P.refs.forEach(function (r) { r.off(); });
    P.refs = [];
    clearInterval(P.timer);
  }

  function enter(code, pid, name) {
    detach();
    P.code = code; P.pid = pid; P.name = name;
    P.st = null; P.qs = null; P.me = null; P.myAns = {}; P.fetching = {};
    base().child('qs').once('value').then(function (s) { P.qs = s.val(); render(); });
    var stRef = base().child('state');
    var meRef = base().child('players/' + pid);
    stRef.on('value', function (s) {
      P.st = s.val();
      if (!P.st) return gone();
      if (P.st.phase === 'question') ensureMyAnswer(P.st.q);
      render();
    });
    meRef.on('value', function (s) { P.me = s.val(); render(); });
    P.refs.push(stRef, meRef);
  }

  function ensureMyAnswer(q) {
    if (P.myAns[q] !== undefined || P.fetching[q]) return;
    P.fetching[q] = true;
    base().child('answers/' + q + '/' + P.pid).once('value').then(function (s) {
      var v = s.val();
      if (v && typeof v.a === 'number' && P.myAns[q] === undefined) { P.myAns[q] = v.a; render(); }
    });
  }

  function gone() {
    detach();
    remove('bq_play');
    app.className = 'screen center';
    app.innerHTML = '<div class="card"><h2>' + S().gameGone + '</h2><button type="button" class="btn primary block" data-act="again">' + S().again + '</button></div>';
  }

  function render() {
    if (!P.st || !P.pid) return;
    clearInterval(P.timer);
    document.documentElement.lang = P.lang;
    var ph = P.st.phase;
    if (ph === 'lobby') renderWait();
    else if (ph === 'question') renderQuestion();
    else if (ph === 'reveal') renderReveal();
    else if (ph === 'final') renderFinal();
  }

  function renderWait() {
    var s = S();
    app.className = 'screen center';
    app.innerHTML =
      '<div class="status"><div class="emoji">🙌</div><h2>' + s.youAreIn + ', ' + esc(P.name) + '!</h2>' +
      '<p class="muted pulse">' + s.waitStart + '</p></div>' +
      '<button type="button" class="btn small" data-act="leave">' + s.leave + '</button>';
  }

  function remaining() {
    return P.st.start + P.st.dur * 1000 - Live.serverNow();
  }

  function renderQuestion() {
    var s = S(), i = P.st.q;
    if (!P.qs || !P.qs[i]) { app.className = 'screen center'; app.innerHTML = '<p class="muted pulse">…</p>'; return; }
    var item = P.qs[i], qd = QS[item.i];
    var mine = P.myAns[i];
    var rem = P.st.start ? remaining() : P.st.dur * 1000;
    app.className = 'screen';

    if (mine === undefined && rem <= 0) {
      app.innerHTML = '<div class="phone"><div class="status"><div class="emoji">⏰</div><h2>' + s.timeUp + '</h2><p class="muted">' + s.timeUpHelp + '</p></div></div>';
      return;
    }

    var html = '<div class="phone"><div class="ptop"><span>' + s.question + ' ' + (i + 1) + ' / ' + P.qs.length + '</span><span class="ptimer" id="pt">' + Math.max(0, Math.ceil(rem / 1000)) + '</span></div>' +
      '<div class="pbar"><i id="pb"></i></div>' +
      '<p class="pq">' + esc(qd[P.lang].q) + '</p>';
    if (mine !== undefined) {
      html += '<div class="popts">' + item.o.map(function (k, pos) {
        return '<div class="popt c' + pos + (pos === mine ? ' chosen' : ' faded') + '"><span class="shape">' + Live.SHAPES[pos] + '</span><span>' + esc(Live.optText(qd, P.lang, k)) + '</span></div>';
      }).join('') + '</div>' +
        '<div class="status" style="padding:18px 0 0"><h2 style="font-size:1.5rem">' + s.locked + '</h2><p class="muted pulse">' + s.lockedHelp + '</p></div>';
    } else {
      html += '<div class="popts">' + item.o.map(function (k, pos) {
        return '<button type="button" class="popt c' + pos + '" data-act="answer" data-v="' + pos + '"><span class="shape">' + Live.SHAPES[pos] + '</span><span>' + esc(Live.optText(qd, P.lang, k)) + '</span></button>';
      }).join('') + '</div>';
    }
    html += '</div>';
    app.innerHTML = html;
    ptick();
    P.timer = setInterval(ptick, 250);
  }

  function ptick() {
    if (!P.st || P.st.phase !== 'question') return;
    var rem = remaining(), total = P.st.dur * 1000;
    var pt = document.getElementById('pt'), pb = document.getElementById('pb');
    if (pt) pt.textContent = Math.max(0, Math.ceil(rem / 1000));
    if (pb) pb.style.width = Math.max(0, Math.min(100, rem / total * 100)) + '%';
    if (rem <= 0 && P.myAns[P.st.q] === undefined && P.timeUpShown !== P.st.q) {
      P.timeUpShown = P.st.q;
      render();
    }
  }

  function answer(pos) {
    var q = P.st.q;
    if (P.myAns[q] !== undefined || remaining() <= 0) return;
    P.myAns[q] = pos;
    render();
    base().child('answers/' + q + '/' + P.pid).set({ a: pos, t: Live.ts }).catch(function () {
      var box = document.querySelector('.status');
      if (box) box.insertAdjacentHTML('beforeend', '<div class="err">' + esc(S().sendError) + '</div>');
    });
    if (navigator.vibrate) { try { navigator.vibrate(30); } catch (e) { /* ignore */ } }
  }

  function renderReveal() {
    var s = S(), i = P.st.q;
    app.className = 'screen center';
    if (!P.qs || !P.qs[i] || !P.me || P.me.rq !== i) {
      app.innerHTML = '<p class="muted pulse">' + s.loadingResult + '</p>';
      return;
    }
    var item = P.qs[i], qd = QS[item.i];
    var correctPos = item.o.indexOf(0);
    var correctText = Live.optText(qd, P.lang, 0);
    var ok = P.me.ok;
    var cls = ok === true ? 'ok' : 'bad';
    var emoji = ok === true ? '🎉' : ok === false ? '😕' : '⏰';
    var title = ok === true ? s.correct : ok === false ? s.wrong : s.noAns;
    app.innerHTML =
      '<div class="status ' + cls + '"><div class="emoji">' + emoji + '</div><h2>' + title + '</h2>' +
      (ok === true ? '<div class="gain">+' + Live.fmt(P.me.last) + ' ' + s.pts + '</div>' : '') +
      '<div class="box"><div class="muted">' + s.rightAnswer + '</div><b>' + Live.SHAPES[correctPos] + ' ' + esc(correctText) + '</b>' +
      '<div class="muted" style="margin-top:4px">' + s.readMore + ' ' + esc(Live.bookRef(qd, P.lang)) + '</div></div>' +
      '<div class="box"><b>' + s.place + ' ' + (P.me.rank || '–') + '</b><div class="muted">' + s.total + ': ' + Live.fmt(P.me.score) + ' ' + s.pts + '</div></div></div>';
  }

  function renderFinal() {
    var s = S();
    app.className = 'screen center';
    var me = P.me || {};
    var medal = me.rank === 1 ? '🥇' : me.rank === 2 ? '🥈' : me.rank === 3 ? '🥉' : '🎉';
    app.innerHTML =
      '<div class="status"><div class="emoji">' + medal + '</div><h2>' + s.finalTitle + '</h2>' +
      '<div class="box"><b>' + s.finalPlace + ' ' + (me.rank || '–') + '</b><div class="muted">' + Live.fmt(me.score) + ' ' + s.pts + '</div></div>' +
      '<p class="muted">' + s.thanks + '</p></div>' +
      '<button type="button" class="btn primary" data-act="again">' + s.again + '</button>';
    remove('bq_play');
  }

  /* ---------- handlinger ---------- */
  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act;
    if (act === 'joinlang') { P.lang = el.dataset.v; save('bq_playlang', P.lang); showJoinPlain(); }
    else if (act === 'proflang') {
      var nm = document.getElementById('nm'); if (nm) P.name = nm.value;
      P.lang = el.dataset.v; save('bq_playlang', P.lang); showProfile();
    }
    else if (act === 'code') checkCode(document.getElementById('code').value);
    else if (act === 'join') joinGame();
    else if (act === 'answer') answer(parseInt(el.dataset.v, 10));
    else if (act === 'leave') { detach(); remove('bq_play'); showJoinPlain(); }
    else if (act === 'again') { detach(); remove('bq_play'); P.pid = null; history.replaceState(null, '', location.pathname); showJoinPlain(); }
  });

  app.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      if (e.target.id === 'code') checkCode(e.target.value);
      else if (e.target.id === 'nm') joinGame();
    }
  });
})();
