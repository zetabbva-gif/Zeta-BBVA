/* =======================================================================
   ZETA — modales.js
   Tooltip de ZETips (hover en desktop, tap en mobile) y modales de
   login/registro: apertura/cierre, focus trap, validación de
   formularios y toggle de contraseña.
   ======================================================================= */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     TOOLTIP ZETips
     ---------------------------------------------------------- */
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

  /* ----------------------------------------------------------
     MODALES (login / registro)
     ---------------------------------------------------------- */
  var loginModal = document.getElementById('login-modal');
  var registerModal = document.getElementById('register-modal');
  var openLoginBtn = document.getElementById('open-login');
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
    if (activeModal) closeAnyOpenModal();
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

  /* ----------------------------------------------------------
     TOGGLE MOSTRAR/OCULTAR CONTRASEÑA
     ---------------------------------------------------------- */
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

  /* ----------------------------------------------------------
     VALIDACIÓN DE FORMULARIOS
     ---------------------------------------------------------- */
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
