/* =========================================================
   Vroni · Website interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---- Sticky nav shadow ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  function closeMenu() {
    nav.classList.remove('open'); menu.classList.remove('open');
    document.body.style.overflow = '';
    if (burger) { burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Menü öffnen'); }
  }
  function toggleMenu() {
    var open = menu.classList.toggle('open');
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (burger) { burger.setAttribute('aria-expanded', open ? 'true' : 'false'); burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen'); }
  }
  if (burger) burger.addEventListener('click', toggleMenu);
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* ---- Smooth anchor scroll with nav offset ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ---- Scroll reveal (with failsafes so content is never stuck hidden) ---- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach(function (el) {
      if (el.classList.contains('in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
  // Manual fallback: reveal whatever is in view, on load + scroll.
  revealInView();
  window.addEventListener('scroll', revealInView, { passive: true });
  window.addEventListener('resize', revealInView, { passive: true });
  // Hard failsafe: if transitions don't run (throttled/non-compositing context),
  // force the final visible state with no transition so content can never stick hidden.
  setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add('shown'); });
  }, 1400);

  /* ---- Active nav link via section in view ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('#navLinks a'));
  var sections = navLinks.map(function (l) { return document.querySelector(l.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = sections.indexOf(en.target);
        if (i < 0) return;
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        navLinks[i].classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  /* ---- Contact form (mailto) ---- */
  var sendBtn = document.getElementById('sendBtn');
  var form = document.getElementById('contactForm');
  if (sendBtn && form) {
    function setFieldError(fieldId, hasError) {
      var field = document.getElementById(fieldId);
      if (!field) return;
      if (hasError) field.classList.add('error'); else field.classList.remove('error');
    }
    // Clear error on input
    ['f-mail', 'f-msg'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function() { setFieldError('field-' + id.replace('f-', ''), false); });
    });
    sendBtn.addEventListener('click', function () {
      var name    = document.getElementById('f-name').value.trim();
      var email   = document.getElementById('f-mail').value.trim();
      var topic   = document.getElementById('f-topic').value.trim();
      var message = document.getElementById('f-msg').value.trim();
      var valid = true;
      if (!email) { setFieldError('field-mail', true); valid = false; }
      if (!message) { setFieldError('field-msg', true); valid = false; }
      if (!valid) return;
      var to      = 'info@veronika-heidrich.de';
      var subject = 'Kontaktanfrage von ' + (name || 'Interessent:in');
      var body    = 'Name: ' + (name || '–') + '\n';
      body += 'E-Mail: ' + (email || '–') + '\n';
      body += 'Thema: ' + (topic || '–') + '\n\n';
      body += 'Nachricht:\n' + message;
      var href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = href;
    });
  }
  /* ---- Ansatz accordion (single open) ---- */
  var principles = document.querySelectorAll('.principle');
  principles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var willOpen = !btn.classList.contains('is-open');
      principles.forEach(function (o) { o.classList.remove('is-open'); o.setAttribute('aria-expanded', 'false'); });
      if (willOpen) { btn.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---- Hero scroll-down button ---- */
  var scrollDown = document.getElementById('scrollDown');
  if (scrollDown) {
    scrollDown.addEventListener('click', function () {
      var t = document.getElementById('pain');
      if (!t) return;
      var y = t.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }

  /* ---- Voices slider (mobile/tablet horizontal scroll-snap) ---- */
  var voicesGrid = document.querySelector('.voices-grid');
  var voiceCards = voicesGrid ? voicesGrid.querySelectorAll('.voice') : [];
  var voiceDots  = document.querySelectorAll('.voices-dots .vd');
  if (voicesGrid && voiceCards.length && voiceDots.length) {
    function setActiveDot(idx) {
      voiceDots.forEach(function (d, i) {
        if (i === idx) d.classList.add('on'); else d.classList.remove('on');
      });
    }
    function activeFromScroll() {
      // only when grid is in scroll-snap mode (mobile/tablet)
      if (voicesGrid.scrollWidth <= voicesGrid.clientWidth + 4) return;
      var center = voicesGrid.scrollLeft + voicesGrid.clientWidth / 2;
      var best = 0, bestDist = Infinity;
      voiceCards.forEach(function (card, i) {
        var cardCenter = card.offsetLeft + card.offsetWidth / 2;
        var d = Math.abs(cardCenter - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActiveDot(best);
    }
    voicesGrid.addEventListener('scroll', function () {
      window.requestAnimationFrame(activeFromScroll);
    });
    voiceDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        var card = voiceCards[i]; if (!card) return;
        var target = card.offsetLeft - (voicesGrid.clientWidth - card.offsetWidth) / 2;
        voicesGrid.scrollTo({ left: target, behavior: 'smooth' });
      });
    });
    window.addEventListener('resize', activeFromScroll);
    activeFromScroll();
  }

})();
