/* Hotel Ivy Studios — Homepage v3 interactions (no dependencies) */
(function () {
  'use strict';

  var doc = document.documentElement;
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------------- loader ---------------- */
  function ready() { doc.classList.add('is-ready'); }
  if (reduce || store.get('v3-intro')) {
    doc.classList.add('is-done');
    requestAnimationFrame(ready);
  } else {
    doc.classList.add('is-loading');
    var countEl = $('[data-ld-count]');
    var t0 = performance.now(), MIN = 1700, loaded = false, finished = false;
    window.addEventListener('load', function () { loaded = true; }, { once: true });
    if (document.readyState === 'complete') loaded = true;
    (function tick(t) {
      var p = clamp((t - t0) / MIN, 0, 1);
      var shown = Math.round((loaded ? p : Math.min(p, 0.9)) * 100);
      countEl.textContent = shown;
      if (shown >= 100 || t - t0 > 4000) {
        if (finished) return; finished = true;
        countEl.textContent = 100;
        doc.classList.add('is-loaded');
        setTimeout(ready, 450);
        setTimeout(function () { doc.classList.add('is-done'); }, 1300);
        store.set('v3-intro', '1');
        return;
      }
      requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------------- header + sheet ---------------- */
  var hd = $('[data-hd]');
  var menuBtn = $('.hd__menu');
  var sheet = $('#sheet');
  function setSheet(open) {
    body.classList.toggle('sheet-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) { sheet.hidden = false; }
    else { setTimeout(function () { if (!body.classList.contains('sheet-open')) sheet.hidden = true; }, 800); }
  }
  menuBtn.addEventListener('click', function () { setSheet(!body.classList.contains('sheet-open')); });
  $$('a', sheet).forEach(function (a) { a.addEventListener('click', function () { setSheet(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (body.classList.contains('sheet-open')) { setSheet(false); menuBtn.focus(); }
    if (dock && dock.classList.contains('is-open')) setDock(false);
  });

  var links = $$('.hd__links a');
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (x.isIntersecting) links.forEach(function (l) { l.classList.toggle('is-on', l.getAttribute('href') === '#' + x.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var t = $(l.getAttribute('href')); if (t) secIO.observe(t); });
  }

  /* ---------------- reveals + counters ---------------- */
  var rvs = $$('[data-rv]');
  rvs.forEach(function (el) {
    var i = $$(':scope > [data-rv]', el.parentElement).indexOf(el);
    if (i > 0) el.style.setProperty('--d', (i * 0.08).toFixed(2) + 's');
  });
  function countUp(el) {
    var target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || '0', 10);
    if (reduce) { el.textContent = target.toFixed(dec); return; }
    var s = performance.now();
    (function step(t) {
      var p = clamp((t - s) / 1500, 0, 1);
      el.textContent = (target * (1 - Math.pow(1 - p, 4))).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    })(s);
  }
  var mark = $('[data-mark]');
  if (mark) {
    var txt = mark.textContent;
    mark.innerHTML = txt.split('').map(function (c, i) { return '<span class="l" style="--i:' + i + '">' + (c === ' ' ? '&nbsp;' : c) + '</span>'; }).join('');
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return;
        x.target.classList.add('is-in');
        $$('[data-count]', x.target).forEach(countUp);
        io.unobserve(x.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    rvs.forEach(function (el) { io.observe(el); });
    if (mark) io.observe(mark);
  } else {
    rvs.forEach(function (el) { el.classList.add('is-in'); });
    if (mark) mark.classList.add('is-in');
    $$('[data-count]').forEach(countUp);
  }

  /* ---------------- manifesto words ---------------- */
  var mf = $('[data-mf]');
  var mfBits = [];
  if (mf) {
    mf.setAttribute('aria-label', mf.textContent.replace(/\s+/g, ' ').trim());
    var out = [];
    Array.prototype.slice.call(mf.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) out.push(document.createTextNode(' '));
          else { var s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); s.textContent = w; out.push(s); }
        });
      } else { n.setAttribute('aria-hidden', 'true'); out.push(n); }
    });
    mf.textContent = '';
    out.forEach(function (n) { mf.appendChild(n); });
    mfBits = $$('.w, .mf__pic', mf);
  }

  /* ---------------- a day at ivy ---------------- */
  var daySec = $('[data-day]');
  if (daySec) {
    var moments = $$('[data-moment]', daySec);
    var timeEl = $('[data-day-time]'), labelEl = $('[data-day-label]'), sun = $('[data-day-sun]');
    var cur = -1;
    var setMoment = function (i) {
      if (i === cur) return;
      cur = i;
      var m = moments[i];
      moments.forEach(function (x, k) { x.classList.toggle('is-on', k === i); });
      daySec.style.setProperty('--day-bg', m.dataset.bg);
      daySec.style.setProperty('--day-fg', m.dataset.fg);
      daySec.classList.toggle('is-night', i === moments.length - 1);
      timeEl.classList.add('swap');
      setTimeout(function () { timeEl.textContent = m.dataset.time; labelEl.textContent = m.dataset.label; timeEl.classList.remove('swap'); }, reduce ? 0 : 260);
      var t = parseFloat(m.dataset.t), a = Math.PI * (1 - t);
      sun.setAttribute('style', 'transform: translate(' + (110 + Math.cos(a) * 100).toFixed(1) + 'px,' + (110 - Math.sin(a) * 100).toFixed(1) + 'px)');
    };
    setMoment(0);
    if ('IntersectionObserver' in window) {
      var dio = new IntersectionObserver(function (en) {
        en.forEach(function (x) { if (x.isIntersecting) setMoment(+x.target.dataset.moment); });
      }, { rootMargin: '-45% 0px -45% 0px' });
      moments.forEach(function (m) { dio.observe(m); });
    }
  }

  /* ---------------- bento clock (live time) ---------------- */
  var ch = $('[data-clock-h]'), cm = $('[data-clock-m]');
  function clock() {
    var d = new Date(), m = d.getMinutes(), h = d.getHours() % 12 + m / 60;
    if (ch) ch.style.transform = 'rotate(' + h * 30 + 'deg)';
    if (cm) cm.style.transform = 'rotate(' + m * 6 + 'deg)';
  }
  clock(); setInterval(clock, 30000);

  /* ---------------- radar hover ---------------- */
  $$('[data-pt]').forEach(function (li) {
    var g = $('[data-pt-g="' + li.dataset.pt + '"]');
    var on = function (v) { li.classList.toggle('is-hot', v); if (g) g.classList.toggle('is-hot', v); };
    li.addEventListener('mouseenter', function () { on(true); });
    li.addEventListener('mouseleave', function () { on(false); });
  });

  /* ---------------- draggable gallery ---------------- */
  var view = $('[data-drag]'), track = $('[data-drag-track]');
  var gx = 0, vel = 0, dragging = false, lastX = 0, half = 0, galVisible = false;
  function measure() { half = track ? track.scrollWidth / 2 : 0; }
  if (view && track) {
    measure();
    view.addEventListener('pointerdown', function (e) {
      dragging = true; lastX = e.clientX; vel = 0; view.classList.add('is-drag');
      view.setPointerCapture(e.pointerId);
    });
    view.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX; lastX = e.clientX;
      gx += dx; vel = dx;
    });
    var end = function () { dragging = false; view.classList.remove('is-drag'); };
    view.addEventListener('pointerup', end);
    view.addEventListener('pointercancel', end);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { galVisible = en[0].isIntersecting; }).observe(view);
    else galVisible = true;
    (function loop() {
      if (galVisible && half) {
        if (!dragging) { vel *= 0.92; gx += vel + (reduce ? 0 : -0.6); }
        if (gx <= -half) gx += half;
        if (gx > 0) gx -= half;
        track.style.transform = 'translate3d(' + gx.toFixed(1) + 'px,0,0)';
        track.style.setProperty('--skew', clamp(vel * -0.25, -6, 6).toFixed(2) + 'deg');
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------- booking dock ---------------- */
  var dock = $('[data-dock]');
  var dockOpenBtn = $('[data-dock-open]');
  function setDock(open) {
    dock.classList.toggle('is-open', open);
    dockOpenBtn.setAttribute('aria-expanded', String(open));
    dockOpenBtn.innerHTML = open ? '<i class="las la-times" aria-hidden="true"></i> Close' : '<i class="las la-calendar" aria-hidden="true"></i> Check availability';
  }
  if (dock) {
    dockOpenBtn.addEventListener('click', function () { setDock(!dock.classList.contains('is-open')); });
    var inEl = $('[data-in-date]', dock), outEl = $('[data-out-date]', dock), err = $('.dock__err', dock);
    var iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
    var add = function (s, n) { var p = s.split('-'); return iso(new Date(+p[0], p[1] - 1, +p[2] + n)); };
    var mdy = function (s) { var p = s.split('-'); return p[1] + '/' + p[2] + '/' + p[0]; };
    var today = iso(new Date());
    inEl.min = today; inEl.value = today; outEl.min = add(today, 1); outEl.value = add(today, 1);
    inEl.addEventListener('change', function () {
      if (!inEl.value) return;
      outEl.min = add(inEl.value, 1);
      if (!outEl.value || outEl.value <= inEl.value) outEl.value = add(inEl.value, 1);
      err.textContent = '';
    });
    outEl.addEventListener('change', function () { err.textContent = ''; });
    dock.addEventListener('submit', function (e) {
      var a = inEl.value, b = outEl.value;
      if (!a || !b) { e.preventDefault(); err.textContent = 'Choose your check-in and check-out dates.'; return; }
      if (a < today) { e.preventDefault(); err.textContent = 'Check-in can’t be in the past.'; return; }
      if (b <= a) { e.preventDefault(); err.textContent = 'Check-out must be after check-in.'; return; }
      dock.elements.date.value = mdy(a) + ' - ' + mdy(b);
    });
  }

  /* ---------------- scroll loop ---------------- */
  var xp = $('[data-xp]');
  var cards = $$('[data-card]');
  var px = reduce ? [] : $$('[data-px]');
  var footer = $('.ft');
  var lastY = window.scrollY, ticking = false;

  function frame() {
    var y = window.scrollY, vh = window.innerHeight;

    /* hero expansion */
    var heroEnd = vh;
    if (xp) {
      var r = xp.getBoundingClientRect();
      heroEnd = r.bottom;
      if (!reduce) {
        var p = clamp(-r.top / (r.height - vh), 0, 1);
        var e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        xp.style.setProperty('--e', e.toFixed(4));
      }
    }

    /* header hide on scroll down (not while menu open) */
    if (!body.classList.contains('sheet-open')) hd.classList.toggle('is-up', y > lastY + 2 && y > vh * 2);
    if (y < lastY - 2) hd.classList.remove('is-up');
    lastY = y;

    /* dock visibility */
    if (dock) {
      var fr = footer.getBoundingClientRect();
      var on = heroEnd < vh * 0.9 && fr.top > vh * 0.75;
      if (!on && dock.classList.contains('is-open')) setDock(false);
      dock.classList.toggle('is-on', on);
    }

    /* manifesto words light up */
    if (mfBits.length && !reduce) {
      var mr = mf.getBoundingClientRect();
      var mp = clamp((vh * 0.85 - mr.top) / (mr.height + vh * 0.3), 0, 1);
      var lit = Math.round(mp * mfBits.length);
      for (var i = 0; i < mfBits.length; i++) mfBits[i].classList.toggle('on', i < lit);
    }

    /* stacked cards depth */
    if (!reduce) {
      for (var c = 0; c < cards.length - 1; c++) {
        var a = cards[c].getBoundingClientRect(), b = cards[c + 1].getBoundingClientRect();
        var q = clamp((a.top + a.height - b.top) / (a.height - 22), 0, 1);
        cards[c].style.transform = 'scale(' + (1 - q * 0.06).toFixed(4) + ')';
        cards[c].style.filter = q > 0.01 ? 'brightness(' + (1 - q * 0.22).toFixed(3) + ')' : '';
      }
    }

    /* parallax */
    px.forEach(function (el) {
      var pr = el.parentElement.getBoundingClientRect();
      if (pr.bottom < 0 || pr.top > vh) return;
      el.style.translate = '0 ' + ((pr.top + pr.height / 2 - vh / 2) * -0.15).toFixed(1) + 'px';
    });

    ticking = false;
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', function () { measure(); req(); });
  window.addEventListener('load', function () { measure(); req(); });
  frame();
})();
