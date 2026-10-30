/* Fælles logik for live-quizzen (storskærm + mobil) */
(function () {
  'use strict';

  var Live = (window.Live = {});

  Live.COLORS = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];
  Live.SHAPES = ['▲', '◆', '●', '■'];
  Live.POINTS_BASE = 600;   // point for et rigtigt svar
  Live.POINTS_SPEED = 400;  // ekstra, op til dette, efter hvor hurtigt man svarer
  Live.POINTS_FIRST = 200;  // bonus til den hurtigste med rigtigt svar
  Live.GRACE_MS = 2000;     // tolerance for netforsinkelse

  Live.esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  };

  Live.shuffle = function (a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = a[i]; a[i] = a[j]; a[j] = x;
    }
    return a;
  };

  Live.optText = function (q, lang, k) {
    var d = q[lang];
    return k === 0 ? d.a : d.w[k - 1];
  };

  Live.bookRef = function (q, lang) {
    var name = window.BOOKS[q.b - 1][lang === 'da' ? 0 : 1];
    var r = q.ref ? ' ' + (lang === 'da' ? q.ref.replace(':', ',') : q.ref) : '';
    return name + r;
  };

  Live.fmt = function (n) {
    return Number(n || 0).toLocaleString('da-DK');
  };

  /* ---------- tid (serverens ur, så alle er enige) ---------- */
  Live.offset = 0;
  Live.serverNow = function () { return Date.now() + Live.offset; };

  /* ---------- point og rangering (ren funktion, kan testes) ---------- */
  Live.scoreRound = function (answers, playerIds, startTs, durMs, correctPos) {
    var counts = [0, 0, 0, 0];
    var rows = [];
    playerIds.forEach(function (pid) {
      var a = answers && answers[pid];
      if (!a || typeof a.a !== 'number' || typeof a.t !== 'number') return;
      var el = a.t - startTs;
      if (el > durMs + Live.GRACE_MS) return; // for sent
      if (a.a < 0 || a.a > 3) return;
      rows.push({ pid: pid, a: a.a, el: Math.max(0, el) });
      counts[a.a]++;
    });
    var correct = rows.filter(function (r) { return r.a === correctPos; })
      .sort(function (x, y) { return x.el - y.el; });
    var pts = {};
    correct.forEach(function (r, i) {
      var frac = Math.min(r.el, durMs) / durMs;
      pts[r.pid] = Math.round(Live.POINTS_BASE + Live.POINTS_SPEED * (1 - frac)) + (i === 0 ? Live.POINTS_FIRST : 0);
    });
    var ok = {};
    rows.forEach(function (r) { ok[r.pid] = r.a === correctPos; });
    return {
      counts: counts,
      pts: pts,
      ok: ok,
      fastest: correct.length ? correct[0].pid : null,
      fastestMs: correct.length ? correct[0].el : null
    };
  };

  Live.rankPlayers = function (players) {
    var arr = Object.keys(players || {}).map(function (pid) {
      return { pid: pid, name: players[pid].name || '', score: players[pid].score || 0 };
    }).sort(function (a, b) { return b.score - a.score || a.name.localeCompare(b.name); });
    var rank = 0, prev = null;
    arr.forEach(function (p, i) {
      if (p.score !== prev) { rank = i + 1; prev = p.score; }
      p.rank = rank;
    });
    return arr;
  };

  /* ---------- Firebase ---------- */
  Live.configured = function () {
    var c = window.FIREBASE_CONFIG;
    return !!(c && c.apiKey && c.databaseURL && c.apiKey.indexOf('DIN_') !== 0 && c.databaseURL.indexOf('DIT-') < 0);
  };

  Live.ready = function () {
    if (!Live.configured()) return Promise.reject(new Error('config'));
    if (typeof firebase === 'undefined') return Promise.reject(new Error('sdk'));
    if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
    Live.db = firebase.database();
    Live.ts = firebase.database.ServerValue.TIMESTAMP;
    Live.db.ref('.info/serverTimeOffset').on('value', function (s) { Live.offset = s.val() || 0; });
    return firebase.auth().signInAnonymously().then(function (cred) {
      Live.uid = cred.user.uid;
      return Live;
    });
  };

  /* ---------- tekster ---------- */
  Live.S = {
    da: {
      htmlLang: 'da',
      // fælles
      configTitle: 'Live-quizzen er ikke sat op endnu',
      configBody: 'Udfyld firebase-config.js med dine Firebase-oplysninger. Se README.md for en trin-for-trin vejledning.',
      connectError: 'Kunne ikke forbinde til databasen. Tjek internettet og at Anonymous login er slået til i Firebase.',
      pts: 'point',
      question: 'Spørgsmål',
      // quizmaster
      hostTitle: 'Live-quiz · Quizmaster',
      setupTitle: 'Opret en live-quiz',
      screenLang: 'Sprog på storskærmen',
      numQ: 'Antal spørgsmål',
      secs: 'Tid pr. spørgsmål',
      seconds: 'sekunder',
      level: 'Sværhedsgrad',
      from: 'Fra niveau',
      to: 'Til niveau',
      presets: { all: 'Alle niveauer', children: 'Børn', confirm: 'Konfirmander', student: 'Bibelstuderende' },
      create: 'Opret quiz',
      resume: 'Fortsæt din igangværende quiz',
      notEnough: 'Der er for få spørgsmål i det valgte niveauinterval. Udvid intervallet.',
      joinAt: 'Gå til',
      enterCode: 'og indtast koden',
      orScan: 'eller scan QR-koden',
      players: 'deltagere',
      waiting: 'Venter på deltagere …',
      start: 'Start quizzen',
      cancel: 'Afbryd quiz',
      confirmCancel: 'Vil du afbryde og slette quizzen?',
      answered: 'har svaret',
      showAnswer: 'Vis svar nu',
      next: 'Næste spørgsmål',
      showWinners: 'Vis vinderne',
      fastest: 'Hurtigst med rigtigt svar',
      top5: 'Stillingen',
      winners: 'Vinderne',
      newQuiz: 'Ny quiz',
      noAnswer: 'Ingen svarede',
      busy: 'Gør klar …',
      // mobil
      playTitle: 'Deltag i quizzen',
      codeLabel: 'Quizkode',
      codePh: 'Skriv koden fra skærmen',
      next2: 'Næste',
      codeNotFound: 'Koden findes ikke. Tjek tallene på storskærmen.',
      codeFinished: 'Den quiz er allerede slut.',
      langLabel: 'Vælg dit sprog',
      nameLabel: 'Vælg et brugernavn',
      namePh: 'Fx Sara',
      nameHelp: 'Navnet er midlertidigt og vises på storskærmen.',
      join: 'Deltag',
      nameNeeded: 'Skriv et brugernavn.',
      youAreIn: 'Du er med',
      waitStart: 'Vent på, at quizmasteren starter. Kig op på storskærmen!',
      tapAnswer: 'Tryk på dit svar',
      locked: 'Svar modtaget!',
      lockedHelp: 'Vent på, at tiden løber ud.',
      timeUp: 'Tiden er gået',
      timeUpHelp: 'Du nåede ikke at svare.',
      loadingResult: 'Henter resultat …',
      correct: 'Rigtigt!',
      wrong: 'Forkert',
      noAns: 'Intet svar',
      rightAnswer: 'Rigtigt svar',
      place: 'Du er nr.',
      total: 'Samlet',
      readMore: 'Læs i',
      finalTitle: 'Quizzen er slut!',
      finalPlace: 'Du blev nr.',
      thanks: 'Tak fordi du var med.',
      gameGone: 'Quizzen er afsluttet.',
      leave: 'Forlad quiz',
      again: 'Deltag i en ny quiz',
      sendError: 'Dit svar nåede måske ikke frem.'
    },
    en: {
      htmlLang: 'en',
      configTitle: 'The live quiz is not set up yet',
      configBody: 'Fill in firebase-config.js with your Firebase details. See README.md for step-by-step instructions.',
      connectError: 'Could not connect to the database. Check your internet and that Anonymous sign-in is enabled in Firebase.',
      pts: 'pts',
      question: 'Question',
      hostTitle: 'Live quiz · Quizmaster',
      setupTitle: 'Create a live quiz',
      screenLang: 'Language on the big screen',
      numQ: 'Number of questions',
      secs: 'Time per question',
      seconds: 'seconds',
      level: 'Difficulty',
      from: 'From level',
      to: 'To level',
      presets: { all: 'All levels', children: 'Children', confirm: 'Confirmation class', student: 'Bible students' },
      create: 'Create quiz',
      resume: 'Resume your quiz in progress',
      notEnough: 'There are too few questions in the chosen level range. Widen the range.',
      joinAt: 'Go to',
      enterCode: 'and enter the code',
      orScan: 'or scan the QR code',
      players: 'players',
      waiting: 'Waiting for players …',
      start: 'Start the quiz',
      cancel: 'Cancel quiz',
      confirmCancel: 'Cancel and delete the quiz?',
      answered: 'answered',
      showAnswer: 'Show answer now',
      next: 'Next question',
      showWinners: 'Show the winners',
      fastest: 'Fastest correct answer',
      top5: 'Standings',
      winners: 'The winners',
      newQuiz: 'New quiz',
      noAnswer: 'Nobody answered',
      busy: 'Getting ready …',
      playTitle: 'Join the quiz',
      codeLabel: 'Quiz code',
      codePh: 'Enter the code from the screen',
      next2: 'Next',
      codeNotFound: 'That code does not exist. Check the digits on the big screen.',
      codeFinished: 'That quiz has already finished.',
      langLabel: 'Choose your language',
      nameLabel: 'Choose a username',
      namePh: 'E.g. Sara',
      nameHelp: 'The name is temporary and shown on the big screen.',
      join: 'Join',
      nameNeeded: 'Please enter a username.',
      youAreIn: "You're in",
      waitStart: 'Wait for the quizmaster to start. Look up at the big screen!',
      tapAnswer: 'Tap your answer',
      locked: 'Answer received!',
      lockedHelp: 'Wait for the time to run out.',
      timeUp: "Time's up",
      timeUpHelp: "You didn't answer in time.",
      loadingResult: 'Loading result …',
      correct: 'Correct!',
      wrong: 'Wrong',
      noAns: 'No answer',
      rightAnswer: 'Correct answer',
      place: 'You are number',
      total: 'Total',
      readMore: 'Read',
      finalTitle: 'The quiz is over!',
      finalPlace: 'You finished number',
      thanks: 'Thanks for playing.',
      gameGone: 'The quiz has ended.',
      leave: 'Leave quiz',
      again: 'Join a new quiz',
      sendError: 'Your answer may not have been delivered.'
    }
  };
})();
