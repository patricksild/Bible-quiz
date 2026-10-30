(function () {
  'use strict';

  var BOOKS = window.BOOKS;
  var QS = window.QUESTIONS;
  var GROUPS = { children: [1, 6], confirm: [4, 12], student: [10, 20] };

  var T = {
    da: {
      tagline: 'Test din paratviden om Bibelen',
      tab_level: 'Niveau',
      tab_group: 'Målgruppe',
      tab_books: 'Selvstudie',
      levelHelp: 'Vælg sværhedsgrad fra 1 (meget let) til 20 (meget svær). Du får spørgsmål tæt på det valgte niveau.',
      level: 'Niveau',
      lvl: ['Meget let', 'Let', 'Middel', 'Svær', 'Meget svær'],
      easy: 'Let', hard: 'Svær',
      groupHelp: 'Vælg en målgruppe, og få spørgsmål i det passende niveau.',
      groups: {
        children: ['Børn', 'Niveau 1–6'],
        confirm: ['Konfirmander', 'Niveau 4–12'],
        student: ['Bibelstuderende', 'Niveau 10–20']
      },
      booksHelp: 'Vælg de bibelbøger, du har læst, og test, om du har forstået og husker indholdet.',
      all: 'Hele Bibelen', ot: 'Gamle Testamente', nt: 'Nye Testamente', none: 'Ryd valg',
      otTitle: 'Det Gamle Testamente', ntTitle: 'Det Nye Testamente',
      available: 'Spørgsmål til rådighed',
      noneAvail: 'Der er endnu ingen spørgsmål til dit valg.',
      howMany: 'Antal spørgsmål',
      start: 'Start quiz',
      question: 'Spørgsmål', of: 'af', score: 'Point',
      right: 'Rigtigt!', wrong: 'Ikke helt rigtigt.', correctWas: 'Det rigtige svar er markeret.',
      readMore: 'Læs i',
      next: 'Næste spørgsmål', finish: 'Se resultat',
      result: 'Dit resultat', again: 'Prøv igen', home: 'Til forsiden',
      missed: 'Det her skal du læse igen',
      yourAnswer: 'Dit svar', correctAnswer: 'Rigtigt svar',
      perfect: 'Perfekt! Ikke en eneste fejl.',
      msgs: ['Godt klaret – bliv ved med at læse!', 'Rigtig flot – du kender din Bibel!', 'Rigtig godt – næsten ingen fejl.', 'Du er godt på vej. Læs og prøv igen!'],
      live: 'Live-quiz til events',
      liveHost: 'Start som quizmaster',
      liveJoin: 'Deltag med en kode',
      foot: 'Bibelsteder følger Bibelen 1992 (dansk) og NIV (engelsk).'
    },
    en: {
      tagline: 'Test your Bible knowledge',
      tab_level: 'Level',
      tab_group: 'Audience',
      tab_books: 'Self-study',
      levelHelp: 'Choose a difficulty from 1 (very easy) to 20 (very hard). You get questions close to the chosen level.',
      level: 'Level',
      lvl: ['Very easy', 'Easy', 'Medium', 'Hard', 'Very hard'],
      easy: 'Easy', hard: 'Hard',
      groupHelp: 'Pick an audience and get questions at the right level.',
      groups: {
        children: ['Children', 'Level 1–6'],
        confirm: ['Confirmation class', 'Level 4–12'],
        student: ['Bible students', 'Level 10–20']
      },
      booksHelp: 'Select the Bible books you have read and test whether you understood and remember them.',
      all: 'Whole Bible', ot: 'Old Testament', nt: 'New Testament', none: 'Clear',
      otTitle: 'Old Testament', ntTitle: 'New Testament',
      available: 'Questions available',
      noneAvail: 'There are no questions for your selection yet.',
      howMany: 'Number of questions',
      start: 'Start quiz',
      question: 'Question', of: 'of', score: 'Score',
      right: 'Correct!', wrong: 'Not quite.', correctWas: 'The right answer is highlighted.',
      readMore: 'Read',
      next: 'Next question', finish: 'See result',
      result: 'Your result', again: 'Try again', home: 'Back to start',
      missed: 'Worth reading again',
      yourAnswer: 'Your answer', correctAnswer: 'Correct answer',
      perfect: 'Perfect! Not a single mistake.',
      msgs: ['Well done – keep reading!', 'Great job – you know your Bible!', 'Very good – almost no mistakes.', 'You are on your way. Read and try again!'],
      live: 'Live quiz for events',
      liveHost: 'Host as quizmaster',
      liveJoin: 'Join with a code',
      foot: 'Passages follow the Bibelen 1992 (Danish) and NIV (English).'
    }
  };

  var state = {
    lang: load('bq_lang', 'da'),
    mode: 'level',
    level: 8,
    group: 'children',
    books: new Set(JSON.parse(load('bq_books', '[]'))),
    count: 10,
    quiz: null
  };

  var app = document.getElementById('app');

  function load(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  function t() { return T[state.lang]; }
  function bookName(b) { return BOOKS[b - 1][state.lang === 'da' ? 0 : 1]; }
  function refText(q) {
    var r = q.ref ? ' ' + (state.lang === 'da' ? q.ref.replace(':', ',') : q.ref) : '';
    return bookName(q.b) + r;
  }
  function optText(q, k) { var d = q[state.lang]; return k === 0 ? d.a : d.w[k - 1]; }
  function lvlLabel(n) { return t().lvl[Math.min(4, Math.floor((n - 1) / 4))]; }

  /* ---------- question pool ---------- */
  function poolFor(mode) {
    if (mode === 'group') {
      var r = GROUPS[state.group];
      return QS.filter(function (q) { return q.l >= r[0] && q.l <= r[1]; });
    }
    if (mode === 'books') return QS.filter(function (q) { return state.books.has(q.b); });
    return QS;
  }
  function pickQuestions() {
    var list;
    if (state.mode === 'level') {
      list = QS.map(function (q) { return { q: q, d: Math.abs(q.l - state.level) + Math.random() * 0.9 }; })
        .sort(function (a, b) { return a.d - b.d; })
        .slice(0, state.count)
        .map(function (x) { return x.q; });
      return shuffle(list);
    }
    return shuffle(poolFor(state.mode)).slice(0, state.count);
  }

  /* ---------- home ---------- */
  function panelHtml() {
    var s = t();
    if (state.mode === 'level') {
      return '<div class="slider-box"><p class="help">' + s.levelHelp + '</p>' +
        '<output id="lvlOut">' + s.level + ' ' + state.level + '</output>' +
        '<small id="lvlName">' + lvlLabel(state.level) + '</small>' +
        '<input type="range" id="lvl" min="1" max="20" value="' + state.level + '" aria-label="' + s.level + '">' +
        '<div class="scale"><span>1 · ' + s.easy + '</span><span>20 · ' + s.hard + '</span></div></div>';
    }
    if (state.mode === 'group') {
      return '<p class="help">' + s.groupHelp + '</p><div class="groups">' +
        Object.keys(GROUPS).map(function (g) {
          return '<button type="button" class="gcard" data-act="group" data-v="' + g + '" aria-pressed="' + (state.group === g) + '">' +
            '<div><strong>' + s.groups[g][0] + '</strong><span>' + s.groups[g][1] + '</span></div></button>';
        }).join('') + '</div>';
    }
    function chips(from, to) {
      var out = '';
      for (var i = from; i <= to; i++) {
        out += '<label class="chip"><input type="checkbox" data-book="' + i + '"' + (state.books.has(i) ? ' checked' : '') + '><span>' + esc(bookName(i)) + '</span></label>';
      }
      return out;
    }
    return '<p class="help">' + s.booksHelp + '</p>' +
      '<div class="toolbar">' +
      '<button type="button" class="btn" data-act="sel" data-v="all">' + s.all + '</button>' +
      '<button type="button" class="btn" data-act="sel" data-v="ot">' + s.ot + '</button>' +
      '<button type="button" class="btn" data-act="sel" data-v="nt">' + s.nt + '</button>' +
      '<button type="button" class="btn" data-act="sel" data-v="none">' + s.none + '</button></div>' +
      '<div class="testament">' + s.otTitle + '</div><div class="chips">' + chips(1, 39) + '</div>' +
      '<div class="testament">' + s.ntTitle + '</div><div class="chips">' + chips(40, 66) + '</div>';
  }

  function renderHome() {
    var s = t();
    document.documentElement.lang = state.lang;
    document.getElementById('brandTag').textContent = s.tagline;
    document.getElementById('foot').textContent = s.foot;
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)); });
    app.innerHTML =
      '<section class="card">' +
      '<div class="tabs" role="tablist">' +
      ['level', 'group', 'books'].map(function (m) {
        return '<button type="button" role="tab" class="tab" aria-selected="' + (state.mode === m) + '" data-act="mode" data-v="' + m + '">' + s['tab_' + m] + '</button>';
      }).join('') + '</div>' +
      '<div id="panel">' + panelHtml() + '</div>' +
      '<div class="row"><span class="label">' + s.howMany + '</span><div class="seg">' +
      [5, 10, 15, 20].map(function (n) {
        return '<button type="button" class="segbtn" data-act="count" data-v="' + n + '" aria-pressed="' + (state.count === n) + '">' + n + '</button>';
      }).join('') + '</div></div>' +
      '<p id="avail" class="muted"></p>' +
      '<button type="button" id="startBtn" class="btn primary big" data-act="start">' + s.start + '</button>' +
      '</section>' +
      '<p class="live-link">' + s.live + ': <a href="host.html">' + s.liveHost + '</a> · <a href="play.html">' + s.liveJoin + '</a></p>';
    updateAvail();
  }

  function updateAvail() {
    var n = poolFor(state.mode).length;
    var el = document.getElementById('avail');
    var btn = document.getElementById('startBtn');
    if (!el) return;
    if (state.mode === 'level') {
      el.textContent = '';
    } else {
      el.textContent = n ? t().available + ': ' + n : t().noneAvail;
    }
    btn.disabled = n === 0;
  }

  /* ---------- quiz ---------- */
  function startQuiz() {
    var qs = pickQuestions();
    if (!qs.length) return;
    state.quiz = {
      items: qs.map(function (q) { return { q: q, order: shuffle([0, 1, 2, 3]) }; }),
      i: 0, score: 0, chosen: null, missed: []
    };
    renderQuiz();
  }

  var KEYS = ['A', 'B', 'C', 'D'];

  function renderQuiz() {
    var s = t(), z = state.quiz, it = z.items[z.i], q = it.q;
    var answered = z.chosen !== null;
    var correctPos = it.order.indexOf(0);
    var html = '<section class="card">' +
      '<div class="meta"><span>' + s.question + ' ' + (z.i + 1) + ' ' + s.of + ' ' + z.items.length + '</span><span>' + s.score + ': ' + z.score + '</span></div>' +
      '<div class="bar"><i style="width:' + ((z.i + (answered ? 1 : 0)) / z.items.length * 100) + '%"></i></div>' +
      '<span class="tag">' + esc(bookName(q.b)) + '</span>' +
      '<h2 class="qtext">' + esc(q[state.lang].q) + '</h2><div class="options">';
    it.order.forEach(function (k, pos) {
      var cls = 'opt';
      if (answered) {
        if (pos === correctPos) cls += ' correct';
        else if (pos === z.chosen) cls += ' wrong';
        else cls += ' dim';
      }
      html += '<button type="button" class="' + cls + '" data-act="answer" data-v="' + pos + '"' + (answered ? ' disabled' : '') + '>' +
        '<span class="k">' + KEYS[pos] + '</span><span>' + esc(optText(q, k)) + '</span></button>';
    });
    html += '</div>';
    if (answered) {
      var ok = z.chosen === correctPos;
      html += '<div class="feedback ' + (ok ? 'ok' : 'bad') + '" role="status">' + (ok ? s.right : s.wrong) +
        '<small>' + (ok ? '' : s.correctWas + ' ') + s.readMore + ' ' + esc(refText(q)) + '</small></div>' +
        '<button type="button" id="nextBtn" class="btn primary big" data-act="next">' + (z.i + 1 >= z.items.length ? s.finish : s.next) + '</button>';
    }
    html += '</section>';
    app.innerHTML = html;
    var nb = document.getElementById('nextBtn');
    if (nb) nb.focus();
  }

  function answer(pos) {
    var z = state.quiz;
    if (z.chosen !== null) return;
    var it = z.items[z.i];
    z.chosen = pos;
    if (pos === it.order.indexOf(0)) z.score++;
    else z.missed.push({ q: it.q, chosenText: optText(it.q, it.order[pos]) });
    renderQuiz();
  }

  function next() {
    var z = state.quiz;
    if (z.i + 1 >= z.items.length) return renderResult();
    z.i++; z.chosen = null;
    renderQuiz();
    window.scrollTo(0, 0);
  }

  function renderResult() {
    var s = t(), z = state.quiz, n = z.items.length;
    var pct = Math.round(z.score / n * 100);
    var msg = pct === 100 ? s.perfect : pct >= 85 ? s.msgs[1] : pct >= 65 ? s.msgs[2] : pct >= 40 ? s.msgs[0] : s.msgs[3];
    var html = '<section class="card result"><p class="muted">' + s.result + '</p>' +
      '<div class="big">' + z.score + ' / ' + n + '</div><div class="pct">' + pct + '%</div>' +
      '<p><strong>' + msg + '</strong></p>';
    if (z.missed.length) {
      html += '<div class="review"><h3>' + s.missed + '</h3>';
      z.missed.forEach(function (m) {
        html += '<div class="rev"><b>' + esc(m.q[state.lang].q) + '</b>' +
          '<div class="bad">' + s.yourAnswer + ': ' + esc(m.chosenText) + '</div>' +
          '<div class="ok">' + s.correctAnswer + ': ' + esc(m.q[state.lang].a) + '</div>' +
          '<div class="muted">' + s.readMore + ' ' + esc(refText(m.q)) + '</div></div>';
      });
      html += '</div>';
    }
    html += '<div class="actions"><button type="button" class="btn primary big" data-act="start">' + s.again + '</button>' +
      '<button type="button" class="btn" data-act="home">' + s.home + '</button></div></section>';
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

  /* ---------- events ---------- */
  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act, v = el.dataset.v;
    if (act === 'mode') { state.mode = v; renderHome(); }
    else if (act === 'group') { state.group = v; renderHome(); }
    else if (act === 'count') { state.count = parseInt(v, 10); renderHome(); }
    else if (act === 'sel') {
      var from = v === 'nt' ? 40 : 1, to = v === 'ot' ? 39 : 66;
      state.books = new Set();
      if (v !== 'none') for (var i = from; i <= to; i++) state.books.add(i);
      save('bq_books', JSON.stringify(Array.from(state.books)));
      renderHome();
    }
    else if (act === 'start') startQuiz();
    else if (act === 'answer') answer(parseInt(v, 10));
    else if (act === 'next') next();
    else if (act === 'home') { state.quiz = null; renderHome(); }
  });

  app.addEventListener('input', function (e) {
    if (e.target.id === 'lvl') {
      state.level = parseInt(e.target.value, 10);
      document.getElementById('lvlOut').textContent = t().level + ' ' + state.level;
      document.getElementById('lvlName').textContent = lvlLabel(state.level);
    }
  });

  app.addEventListener('change', function (e) {
    var b = e.target.dataset && e.target.dataset.book;
    if (b) {
      var n = parseInt(b, 10);
      if (e.target.checked) state.books.add(n); else state.books.delete(n);
      save('bq_books', JSON.stringify(Array.from(state.books)));
      updateAvail();
    }
  });

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      state.lang = b.dataset.lang;
      save('bq_lang', state.lang);
      document.documentElement.lang = state.lang;
      document.querySelectorAll('.lang button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.lang === state.lang)); });
      document.getElementById('brandTag').textContent = t().tagline;
      document.getElementById('foot').textContent = t().foot;
      if (state.quiz && state.quiz.i < state.quiz.items.length && document.querySelector('.qtext')) renderQuiz();
      else if (document.querySelector('.result')) renderResult();
      else renderHome();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (!state.quiz || state.quiz.chosen !== null) return;
    if (!document.querySelector('.qtext')) return;
    var idx = ['1', '2', '3', '4'].indexOf(e.key);
    if (idx > -1) answer(idx);
  });

  renderHome();
})();
