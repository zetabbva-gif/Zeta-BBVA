(function () {
  'use strict';

  var nav = document.getElementById('nav');

  function navHeight() {
    return nav ? nav.offsetHeight : 0;
  }

  /* ============================================================
     1. SMOOTH SCROLL con offset del nav fijo
     ============================================================ */
  function scrollToTarget(hash) {
    var target = document.querySelector(hash);
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight();
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var hash = link.getAttribute('href');
      if (!hash || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      closeDrawer();
      scrollToTarget(hash);
    });
  });

  /* ============================================================
     2a. HIGHLIGHT DEL ENLACE ACTIVO EN EL NAV
     ============================================================ */
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
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-' + (navHeight() + 40) + 'px 0px -60% 0px', threshold: 0 }
    );
    navSections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ============================================================
     2b. ANIMACIONES FADE-UP AL ENTRAR EN VIEWPORT
     ============================================================ */
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

  /* ============================================================
     3. HAMBURGUESA / DRAWER MÓVIL
     ============================================================ */
  var hamburger = document.getElementById('hamburger');
  var drawer = document.getElementById('mobile-drawer');
  var drawerOverlay = document.getElementById('drawer-overlay');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawerOverlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  /* ============================================================
     4. SIMULADOR ZETA
     ============================================================ */
  var goalChips = document.querySelectorAll('#sim-goal-chips .chip-option');
  var cantidadSlider = document.getElementById('sim-cantidad-slider');
  var cantidadInput = document.getElementById('sim-cantidad-input');
  var ahorroSlider = document.getElementById('sim-ahorro-slider');
  var ahorroInput = document.getElementById('sim-ahorro-input');
  var resultText = document.getElementById('sim-result-text');
  var zetip = document.getElementById('sim-zetip');
  var zetipText = document.getElementById('sim-zetip-text');
  var selectedGoal = 'viaje';

  var cantidadError = document.getElementById('sim-cantidad-error');
  var ahorroError = document.getElementById('sim-ahorro-error');

  var PLACEHOLDER_RESULT = 'Completa los datos anteriores para ver tu resultado.';

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  goalChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      goalChips.forEach(function (c) {
        c.setAttribute('aria-pressed', 'false');
      });
      chip.setAttribute('aria-pressed', 'true');
      selectedGoal = chip.getAttribute('data-goal');

      var defaultValue = parseInt(chip.getAttribute('data-default'), 10);
      if (!isNaN(defaultValue)) {
        var clamped = clamp(defaultValue, parseInt(cantidadSlider.min, 10), parseInt(cantidadSlider.max, 10));
        cantidadSlider.value = clamped;
        cantidadInput.value = clamped;
      }
      calcularSimulador();
    });
  });

  function syncSliderInput(slider, input, errorEl) {
    slider.addEventListener('input', function () {
      input.value = slider.value;
      if (errorEl) errorEl.textContent = '';
      calcularSimulador();
    });
    input.addEventListener('input', function () {
      if (input.value === '') return;
      var min = parseInt(slider.min, 10);
      var max = parseInt(slider.max, 10);
      var raw = parseInt(input.value, 10) || 0;

      if (errorEl) {
        errorEl.textContent = raw > 0 && raw < min ? 'El importe mínimo es ' + min + '€.' : '';
      }

      var value = clamp(raw, min, max);
      slider.value = value;
      calcularSimulador();
    });
    input.addEventListener('blur', function () {
      var min = parseInt(slider.min, 10);
      var max = parseInt(slider.max, 10);
      var value = clamp(parseInt(input.value, 10) || min, min, max);
      input.value = value;
      slider.value = value;
      if (errorEl) errorEl.textContent = '';
      calcularSimulador();
    });
  }

  if (cantidadSlider && cantidadInput) syncSliderInput(cantidadSlider, cantidadInput, cantidadError);
  if (ahorroSlider && ahorroInput) syncSliderInput(ahorroSlider, ahorroInput, ahorroError);

  function calcularSimulador() {
    if (!cantidadInput || !ahorroInput || !resultText) return;

    var objetivo = parseFloat(cantidadInput.value);
    var ahorroMensual = parseFloat(ahorroInput.value);

    if (!ahorroMensual || ahorroMensual <= 0 || !objetivo || objetivo <= 0) {
      resultText.textContent = PLACEHOLDER_RESULT;
      zetip.hidden = true;
      return;
    }

    var meses = Math.ceil(objetivo / ahorroMensual);
    var resultado = '¡Con ZETA puedes alcanzar tu objetivo en ' + meses + ' meses!';

    if (meses > 24) {
      var anios = Math.round((meses / 12) * 10) / 10;
      resultado += ' (aproximadamente ' + anios + ' años)';
    }
    resultText.textContent = resultado;

    var mesesConBonus = Math.ceil(objetivo / (ahorroMensual + 20));
    var diferencia = meses - mesesConBonus;

    if (diferencia > 0) {
      zetipText.textContent = '⚡ ZETip: con 20€ más al mes llegas ' + diferencia + ' meses antes.';
      zetip.hidden = false;
    } else {
      zetip.hidden = true;
    }
  }

  calcularSimulador();

  /* ============================================================
     4b. TOOLTIP ZETips (hover en desktop, tap en mobile)
     ============================================================ */
  var tooltipTrigger = document.querySelector('.tooltip-trigger');
  var tooltipEl = document.getElementById('tooltip-zetips');
  var tooltipOverlay = document.getElementById('tooltip-overlay');

  function isMobileViewport() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  function showTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.add('is-visible');
    if (isMobileViewport() && tooltipOverlay) {
      tooltipOverlay.hidden = false;
      requestAnimationFrame(function () { tooltipOverlay.classList.add('is-visible'); });
    }
  }

  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove('is-visible');
    if (tooltipOverlay) {
      tooltipOverlay.classList.remove('is-visible');
      tooltipOverlay.hidden = true;
    }
  }

  if (tooltipTrigger && tooltipEl) {
    tooltipTrigger.addEventListener('click', function (event) {
      if (!isMobileViewport()) return;
      event.stopPropagation();
      if (tooltipEl.classList.contains('is-visible')) {
        hideTooltip();
      } else {
        showTooltip();
      }
    });

    document.addEventListener('click', function (event) {
      if (tooltipEl.classList.contains('is-visible') && !tooltipTrigger.contains(event.target)) {
        hideTooltip();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') hideTooltip();
    });
  }

  /* ============================================================
     6. MODALES (login / registro)
     ============================================================ */
  var loginModal = document.getElementById('login-modal');
  var registerModal = document.getElementById('register-modal');
  var openLoginBtn = document.getElementById('open-login');
  var openLoginMobileBtn = document.getElementById('open-login-mobile');
  var goToRegisterBtn = document.getElementById('go-to-register');
  var goToLoginBtn = document.getElementById('go-to-login');

  var lastFocusedElement = null;
  var activeModal = null;

  function getFocusableElements(container) {
    return container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }

  function openModal(modal) {
    if (!modal) return;
    if (activeModal) closeModal(activeModal, { skipFocusRestore: true });
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    activeModal = modal;
    document.body.style.overflow = 'hidden';
    var focusable = getFocusableElements(modal);
    if (focusable.length) focusable[0].focus();
  }

  function closeModal(modal, options) {
    if (!modal) return;
    modal.hidden = true;
    if (activeModal === modal) activeModal = null;
    document.body.style.overflow = '';
    if (!(options && options.skipFocusRestore) && lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function closeAnyOpenModal() {
    if (activeModal) closeModal(activeModal);
  }

  if (openLoginBtn) openLoginBtn.addEventListener('click', function () { openModal(loginModal); });
  if (openLoginMobileBtn) openLoginMobileBtn.addEventListener('click', function () { closeDrawer(); openModal(loginModal); });
  if (goToRegisterBtn) goToRegisterBtn.addEventListener('click', function () { openModal(registerModal); });
  if (goToLoginBtn) goToLoginBtn.addEventListener('click', function () { openModal(loginModal); });

  document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeAnyOpenModal();
    });
  });

  [loginModal, registerModal].forEach(function (modal) {
    if (!modal) return;
    modal.addEventListener('click', function (event) {
      if (event.target === modal) closeAnyOpenModal();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (activeModal) {
      closeAnyOpenModal();
      return;
    }
    if (drawer && drawer.classList.contains('is-open')) closeDrawer();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab' || !activeModal) return;
    var focusable = Array.prototype.slice.call(getFocusableElements(activeModal));
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* ============================================================
     6b. TOGGLE MOSTRAR/OCULTAR CONTRASEÑA
     ============================================================ */
  document.querySelectorAll('[data-password-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById(btn.getAttribute('data-password-toggle'));
      if (!input) return;
      var isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.textContent = isPassword ? 'Ocultar' : 'Ver';
      btn.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });

  /* ============================================================
     6c. VALIDACIÓN DE FORMULARIOS
     ============================================================ */
  function setError(input, message) {
    var errorEl = document.querySelector('[data-error-for="' + input.id + '"]');
    if (errorEl) errorEl.textContent = message || '';
    input.classList.toggle('invalid', !!message);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = document.getElementById('login-email');
      var password = document.getElementById('login-password');
      var valid = true;

      if (!email.value.trim()) {
        setError(email, 'Introduce tu email.');
        valid = false;
      } else if (!isValidEmail(email.value.trim())) {
        setError(email, 'Introduce un email válido.');
        valid = false;
      } else {
        setError(email, '');
      }

      if (!password.value) {
        setError(password, 'Introduce tu contraseña.');
        valid = false;
      } else if (password.value.length < 8) {
        setError(password, 'La contraseña debe tener al menos 8 caracteres.');
        valid = false;
      } else {
        setError(password, '');
      }

      if (valid) {
        closeAnyOpenModal();
        loginForm.reset();
      }
    });
  }

  var registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = document.getElementById('register-name');
      var email = document.getElementById('register-email');
      var password = document.getElementById('register-password');
      var terms = document.getElementById('register-terms');
      var valid = true;

      if (!name.value.trim()) {
        setError(name, 'Introduce tu nombre completo.');
        valid = false;
      } else {
        setError(name, '');
      }

      if (!email.value.trim()) {
        setError(email, 'Introduce tu email.');
        valid = false;
      } else if (!isValidEmail(email.value.trim())) {
        setError(email, 'Introduce un email válido.');
        valid = false;
      } else {
        setError(email, '');
      }

      if (!password.value) {
        setError(password, 'Introduce una contraseña.');
        valid = false;
      } else if (password.value.length < 8) {
        setError(password, 'La contraseña debe tener al menos 8 caracteres.');
        valid = false;
      } else {
        setError(password, '');
      }

      var termsError = document.querySelector('[data-error-for="register-terms"]');
      if (!terms.checked) {
        if (termsError) termsError.textContent = 'Debes aceptar los términos para continuar.';
        valid = false;
      } else if (termsError) {
        termsError.textContent = '';
      }

      if (valid) {
        closeAnyOpenModal();
        registerForm.reset();
      }
    });
  }

})();
