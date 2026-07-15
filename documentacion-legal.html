(function () {
  'use strict';

  var STORAGE_KEY = 'zeta-cookie-consent';

  var banner = document.getElementById('cookie-banner');
  var modal = document.getElementById('cookie-modal');
  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');
  var settingsBtn = document.getElementById('cookie-settings');
  var saveBtn = document.getElementById('cookie-save');
  var closeBtn = document.getElementById('cookie-modal-close');
  var manageLink = document.getElementById('manage-cookies-link');
  var analyticsCheckbox = document.getElementById('cookie-analytics');
  var marketingCheckbox = document.getElementById('cookie-marketing');

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {
      /* localStorage no disponible: el consentimiento no persiste entre visitas */
    }
  }

  /* Aplica el consentimiento a Google Consent Mode v2 y, si procede,
     habilita la carga de scripts de analítica/marketing. */
  function applyConsent(consent) {
    gtag('consent', 'update', {
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied',
      'analytics_storage': consent.analytics ? 'granted' : 'denied'
    });

    if (consent.analytics) {
      loadAnalyticsScripts();
    }
    if (consent.marketing) {
      loadMarketingScripts();
    }
  }

  var analyticsLoaded = false;
  function loadAnalyticsScripts() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    // TODO: insertar aquí el snippet real de Google Analytics 4 / GTM
    // (bloqueado hasta que el usuario da su consentimiento de categoría "analíticas").
  }

  var marketingLoaded = false;
  function loadMarketingScripts() {
    if (marketingLoaded) return;
    marketingLoaded = true;
    // TODO: insertar aquí los scripts reales de marketing/publicidad
    // (bloqueados hasta que el usuario da su consentimiento de categoría "marketing").
  }

  function showBanner() {
    if (banner) banner.hidden = false;
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function showModal() {
    var consent = readConsent();
    if (analyticsCheckbox) analyticsCheckbox.checked = !!(consent && consent.analytics);
    if (marketingCheckbox) marketingCheckbox.checked = !!(consent && consent.marketing);
    if (modal) modal.hidden = false;
  }

  function hideModal() {
    if (modal) modal.hidden = true;
  }

  function init() {
    var consent = readConsent();
    if (consent) {
      applyConsent(consent);
    } else {
      showBanner();
    }
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      var consent = { necessary: true, analytics: true, marketing: true };
      saveConsent(consent);
      applyConsent(consent);
      hideBanner();
      hideModal();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      var consent = { necessary: true, analytics: false, marketing: false };
      saveConsent(consent);
      applyConsent(consent);
      hideBanner();
      hideModal();
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', function () {
      showModal();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      var consent = {
        necessary: true,
        analytics: !!(analyticsCheckbox && analyticsCheckbox.checked),
        marketing: !!(marketingCheckbox && marketingCheckbox.checked)
      };
      saveConsent(consent);
      applyConsent(consent);
      hideModal();
      hideBanner();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
  }

  if (manageLink) {
    manageLink.addEventListener('click', function (event) {
      event.preventDefault();
      showModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
