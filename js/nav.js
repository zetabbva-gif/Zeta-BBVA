/* =======================================================================
   ZETA — nav.js
   Smooth scroll con offset del nav fijo, highlight del enlace activo
   (IntersectionObserver). El botón "Iniciar sesión" solo vive en el
   nav — su comportamiento de apertura de modal se gestiona en
   modales.js, que es el módulo dueño del estado de los modales.
   Sin lógica de drawer/hamburguesa: se eliminó por completo.
   ======================================================================= */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. SMOOTH SCROLL con offset del nav fijo
     ---------------------------------------------------------- */
  function scrollToTarget(hash) {
    var target = document.querySelector(hash);
    if (!target) return;
    var navHeight = window.ZETA && window.ZETA.getNavHeight ? window.ZETA.getNavHeight() : 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var hash = link.getAttribute('href');
      if (!hash || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      scrollToTarget(hash);
    });
  });

  /* ----------------------------------------------------------
     2. HIGHLIGHT DEL ENLACE ACTIVO EN EL NAV
     ---------------------------------------------------------- */
  var navLinks = document.querySelectorAll('[data-nav-link]');
  var navSections = Array.prototype.map
    .call(navLinks, function (link) {
      var hash = link.getAttribute('href');
      return hash ? document.querySelector(hash) : null;
    })
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', isActive);
    });
  }

  if ('IntersectionObserver' in window && navSections.length) {
    var navHeight = window.ZETA && window.ZETA.getNavHeight ? window.ZETA.getNavHeight() : 0;
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-' + (navHeight + 40) + 'px 0px -60% 0px', threshold: 0 }
    );
    navSections.forEach(function (section) {
      navObserver.observe(section);
    });
  }
})();
