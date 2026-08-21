/* =======================================================================
   ZETA — animations.js
   Se carga primero. Declara el objeto global window.ZETA que usan el
   resto de módulos para compartir utilidades (patrón IIFE, sin
   import/export para que funcione directamente en GitHub Pages).
   Contiene el IntersectionObserver que activa el fadeUp de entrada en
   todas las secciones.
   ======================================================================= */

window.ZETA = window.ZETA || {};

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Utilidad compartida: altura del nav, usada por nav.js para
     el offset del smooth scroll y del highlight de sección activa.
     ---------------------------------------------------------- */
  window.ZETA.navEl = document.getElementById('nav');
  window.ZETA.getNavHeight = function () {
    return window.ZETA.navEl ? window.ZETA.navEl.offsetHeight : 0;
  };

  /* ----------------------------------------------------------
     Animaciones fadeUp al entrar en viewport (todas las secciones)
     ---------------------------------------------------------- */
  var fadeElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
