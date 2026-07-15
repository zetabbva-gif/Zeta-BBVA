(function () {
  'use strict';

  /* ============================================================
     1. SMOOTH SCROLL (nav del header + CTA del hero)
     ============================================================ */
  function scrollToTarget(targetSelector) {
    var target = document.querySelector(targetSelector);
    if (!target) return;
    var header = document.getElementById('site-header');
    var headerHeight = header ? header.offsetHeight : 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-scroll]').forEach(function (el) {
    el.addEventListener('click', function (event) {
      var targetSelector = el.getAttribute('data-target') || el.getAttribute('href');
      if (!targetSelector || targetSelector.charAt(0) !== '#') return;
      event.preventDefault();
      scrollToTarget(targetSelector);
    });
  });

  /* ============================================================
     2. ANIMACIONES DE SCROLL (derecha -> izquierda, una sola vez)
     ============================================================ */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback sin IntersectionObserver: mostrar todo directamente.
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ============================================================
     3. QR STICKY: detección de tienda + color sincronizado con el scroll
     ============================================================ */
  var APP_STORE_URL = 'https://apps.apple.com/app/id-placeholder'; // TODO: sustituir por URL real
  var GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=placeholder'; // TODO: sustituir por URL real

  function detectStore() {
    var ua = navigator.userAgent || navigator.vendor || window.opera || '';
    var isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    var isAndroid = /Android/.test(ua);

    if (isIOS) {
      return { url: APP_STORE_URL, label: 'Descárgatela en App Store' };
    }
    if (isAndroid) {
      return { url: GOOGLE_PLAY_URL, label: 'Descárgatela en Google Play' };
    }
    // Escritorio / dispositivo no identificado: se ofrece App Store por defecto.
    return { url: APP_STORE_URL, label: 'Escanea para descargar la app' };
  }

  var qrLink = document.getElementById('qr-link');
  var qrLabel = document.getElementById('qr-label');
  var store = detectStore();

  if (qrLink) {
    qrLink.setAttribute('href', store.url);
  }
  if (qrLabel) {
    qrLabel.textContent = store.label;
  }

  /* Dibuja un patrón visual tipo QR (placeholder no escaneable).
     TODO: sustituir por una librería real de generación de QR que codifique
     store.url en un código escaneable antes de producción. El enlace ya
     redirige correctamente a la tienda correspondiente al hacer clic. */
  function drawFakeQr(canvas, seedText) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var size = canvas.width;
    var modules = 12;
    var cell = size / modules;

    ctx.clearRect(0, 0, size, size);

    // hash determinista simple a partir del texto (misma URL -> mismo patrón)
    var hash = 0;
    for (var i = 0; i < seedText.length; i++) {
      hash = (hash * 31 + seedText.charCodeAt(i)) >>> 0;
    }

    function pseudoRandom(x, y) {
      var n = (x * 928371 + y * 123457 + hash) >>> 0;
      n = (n ^ (n >>> 15)) >>> 0;
      return n % 2 === 0;
    }

    ctx.fillStyle = '#1A1A1A';

    for (var row = 0; row < modules; row++) {
      for (var col = 0; col < modules; col++) {
        var inFinder =
          (row < 3 && col < 3) ||
          (row < 3 && col >= modules - 3) ||
          (row >= modules - 3 && col < 3);
        var draw;
        if (inFinder) {
          // hueco interior del ojo del finder pattern
          var localRow = row < 3 ? row : row - (modules - 3);
          var localCol = col < 3 ? col : col - (modules - 3);
          draw = !(localRow === 1 && localCol === 1);
        } else {
          draw = pseudoRandom(row, col);
        }
        if (draw) {
          ctx.fillRect(col * cell, row * cell, cell - 1, cell - 1);
        }
      }
    }
  }

  var qrCanvas = document.getElementById('qr-canvas');
  if (qrCanvas) {
    drawFakeQr(qrCanvas, store.url);
  }

  var qrVisual = document.getElementById('qr-visual');
  var sections = document.querySelectorAll('[data-bg]');
  var PURPLE = '#8F7DBC';
  var WHITE = '#FFFFFF';

  function setQrBackground(sectionBg) {
    if (!qrVisual) return;
    // El QR usa el color contrario al fondo de la sección visible.
    qrVisual.style.backgroundColor = sectionBg === 'purple' ? WHITE : PURPLE;
  }

  if ('IntersectionObserver' in window && sections.length) {
    var header = document.getElementById('site-header');
    var headerHeight = header ? header.offsetHeight : 0;

    var bgObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var bg = entry.target.getAttribute('data-bg');
            if (bg && bg !== 'none') {
              setQrBackground(bg);
            }
          }
        });
      },
      {
        rootMargin: '-' + (headerHeight + 1) + 'px 0px -70% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      bgObserver.observe(section);
    });
  }

  /* ============================================================
     4. SIMULADOR ZETA
     ============================================================ */
  var cantidadInput = document.getElementById('sim-cantidad');
  var ahorroInput = document.getElementById('sim-ahorro');
  var resultadoTexto = document.getElementById('sim-resultado-texto');
  var consejoTexto = document.getElementById('sim-consejo-texto');

  var PLACEHOLDER_RESULTADO = 'Completa los datos anteriores para ver tu resultado.';

  function calcularSimulador() {
    if (!cantidadInput || !ahorroInput || !resultadoTexto || !consejoTexto) return;

    var cantidadObjetivo = parseFloat(cantidadInput.value);
    var ahorroMensual = parseFloat(ahorroInput.value);

    if (!cantidadObjetivo || !ahorroMensual || cantidadObjetivo <= 0 || ahorroMensual <= 0) {
      resultadoTexto.textContent = PLACEHOLDER_RESULTADO;
      consejoTexto.textContent = '';
      return;
    }

    var meses = Math.ceil(cantidadObjetivo / ahorroMensual);
    var mesesConMasAhorro = Math.ceil(cantidadObjetivo / (ahorroMensual + 20));
    var diferencia = meses - mesesConMasAhorro;

    resultadoTexto.textContent = '¡Vas a poder alcanzar tu objetivo en ' + meses + ' meses!';

    if (diferencia > 0) {
      consejoTexto.textContent = 'Si aumentaras solo 20 € al mes, podrías conseguirlo ' + diferencia + ' meses antes.';
    } else {
      consejoTexto.textContent = 'Ya estás ahorrando al ritmo óptimo para este objetivo.';
    }
  }

  if (cantidadInput) cantidadInput.addEventListener('input', calcularSimulador);
  if (ahorroInput) ahorroInput.addEventListener('input', calcularSimulador);

})();
