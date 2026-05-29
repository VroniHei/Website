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
  function closeMenu() { nav.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow = ''; }
  function toggleMenu() {
    var open = menu.classList.toggle('open');
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
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
    sendBtn.addEventListener('click', function () {
      var name = document.getElementById('f-name').value.trim();
      var email = document.getElementById('f-mail').value.trim();
      var topic = document.getElementById('f-topic').value.trim();
      var message = document.getElementById('f-msg').value.trim();
      var to = 'info@veronika-heidrich.de';
      var subject = 'Kontaktanfrage von ' + (name || 'Interessent:in');
      var body = 'Name: ' + (name || '–') + '\n';
      body += 'E-Mail: ' + (email || '–') + '\n';
      body += 'Thema: ' + (topic || '–') + '\n\n';
      body += 'Nachricht:\n' + (message || '–');
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

  /* ---- Voices swipe slider + dots ---- */
  var voicesGrid = document.querySelector('.voices-grid');
  var vDots = Array.prototype.slice.call(document.querySelectorAll('.voices-dots .vd'));
  if (voicesGrid && vDots.length) {
    function isSliderMode() { return voicesGrid.scrollWidth > voicesGrid.clientWidth + 4; }
    function getSlideIndex() {
      var firstCard = voicesGrid.querySelector('.voice');
      if (!firstCard) return 0;
      var step = firstCard.offsetWidth + 16;
      return Math.round(voicesGrid.scrollLeft / step);
    }
    function activateDot(index) {
      vDots.forEach(function (d, i) { d.classList.toggle('on', i === index); });
    }
    voicesGrid.addEventListener('scroll', function () {
      if (!isSliderMode()) return;
      activateDot(getSlideIndex());
    }, { passive: true });
    vDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        if (!isSliderMode()) return;
        var firstCard = voicesGrid.querySelector('.voice');
        if (!firstCard) return;
        var step = firstCard.offsetWidth + 16;
        voicesGrid.scrollTo({ left: i * step, behavior: 'smooth' });
      });
    });
  }

})();
