// APW Electrical: menu, theme, scroll effects, contact form helper
(function () {
  var root = document.documentElement;
  var body = document.body;
  var toggle = document.querySelector('.menu-toggle');
  var header = document.querySelector('.site-header');
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header height (mobile menu sits under it) ---------- */
  function setHeaderHeight() {
    if (header) root.style.setProperty('--header-h', header.getBoundingClientRect().bottom + 'px');
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    body.classList.remove('menu-open');
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setHeaderHeight();
      var open = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 920) closeMenu(); });

  /* ---------- Theme (initial value is set inline in <head>) ---------- */
  var themeBtn = document.querySelector('.theme-toggle');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('apw-theme', next); } catch (e) {}
    });
  }
  // Follow system changes until the visitor picks a theme themselves
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('apw-theme'); } catch (err) {}
      if (!saved) applyTheme(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- Back to top button ---------- */
  var toTop = document.createElement('button');
  toTop.type = 'button';
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });
  body.appendChild(toTop);

  /* ---------- Scroll: header shadow + back-to-top (rAF throttled) ---------- */
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 8);
    toTop.classList.toggle('show', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll (staggered) ---------- */
  var targets = document.querySelectorAll(
    'main .section-head, main .card, main .split > *, .gallery img, .quote, .post, .service-block, .chips li, .contact-list li, .form, .cta .container > *, .strip .container > div'
  );
  if ('IntersectionObserver' in window && !reduceMotion) {
    var counts = new Map();
    targets.forEach(function (el) {
      var p = el.parentNode, i = counts.get(p) || 0;
      counts.set(p, i + 1);
      el.style.setProperty('--d', Math.min(i * 70, 350) + 'ms');
      el.classList.add('reveal');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target;
          el.classList.add('in');
          io.unobserve(el);
          // drop the stagger delay afterwards so hover effects respond instantly
          setTimeout(function () { el.style.removeProperty('--d'); }, 900);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Smooth in-page links (respecting reduced motion) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    closeMenu();
    t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (id === '#main') { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
  });

  /* ---------- Footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Contact form: opens the visitor's email app ---------- */
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var subject = 'Quote request: ' + (f.service.value || 'Electrical work');
      var lines = [
        'Name: ' + f.name.value,
        'Phone: ' + f.phone.value,
        'Suburb: ' + f.suburb.value,
        'Service: ' + f.service.value,
        '',
        f.message.value
      ];
      window.location.href = 'mailto:info@apwelectrical.com.au?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }
})();
