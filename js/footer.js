(function () {
  var expandBtns = document.querySelectorAll(
    '.footer-expand-btn'
  );
  var closeBtns = document.querySelectorAll(
    '.footer-panel-close'
  );

  function closeAll() {
    document.querySelectorAll('.footer-panel')
      .forEach(function (panel) {
        panel.hidden = true;
      });
    expandBtns.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  function openPanel(panelId, triggerBtn) {
    closeAll();
    var panel = document.getElementById(panelId);
    if (!panel) return;
    panel.hidden = false;
    if (triggerBtn) {
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
    panel.scrollIntoView({ behavior: 'smooth',
                           block: 'nearest' });
  }

  expandBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panelId = btn.getAttribute('data-panel');
      var isOpen  = btn.getAttribute('aria-expanded')
                    === 'true';
      if (isOpen) {
        closeAll();
      } else {
        openPanel(panelId, btn);
      }
    });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeAll();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
})();
