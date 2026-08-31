(function () {
  var track    = document.getElementById('testimonials-track');
  var dots     = document.querySelectorAll('.t-dot');
  var slides   = document.querySelectorAll('.testimonials-slide');
  var current  = 0;
  var total    = slides.length;
  var timer    = null;
  var INTERVAL = 5000;

  if (!track || total === 0) return;

  function goTo(index) {

    // Evitar cambios innecesarios
    if (index === current) return;

    // Preparar el nuevo grupo
    slides[index].classList.add('is-entering');

    // Hacer desaparecer el grupo actual
    slides[current].classList.remove('is-active');

    // Actualizar accesibilidad y dots
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('t-dot--active');
    dots[current].setAttribute('aria-selected', 'false');

    // Actualizar índice
    current = index;

    // Mostrar el nuevo grupo
    slides[current].classList.add('is-active');
    slides[current].setAttribute('aria-hidden', 'false');

    dots[current].classList.add('t-dot--active');
    dots[current].setAttribute('aria-selected', 'true');

    // Limpiar clase de entrada después de la animación
    setTimeout(function () {
      slides[index].classList.remove('is-entering');
    }, 800);
  }

  function next() {
    goTo((current + 1) % total);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(next, INTERVAL);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  /* Dots */
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var idx = parseInt(dot.getAttribute('data-index'), 10);

      stopTimer();
      goTo(idx);
      startTimer();
    });
  });

  /* Pausa al hover */
  var carousel = document.querySelector('.testimonials-carousel');

  if (carousel) {
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);
  }

  /* Swipe táctil */
  var startX = 0;

  track.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      stopTimer();

      goTo(
        diff > 0
          ? (current + 1) % total
          : (current - 1 + total) % total
      );

      startTimer();
    }
  });

  /* Reducción de movimiento */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    slides.forEach(function (slide, index) {
      slide.classList.toggle('is-active', index === 0);
    });

    return;
  }

  /* Mostrar el primer grupo */
  slides[0].classList.add('is-active');
  slides[0].setAttribute('aria-hidden', 'false');

  dots[0].classList.add('t-dot--active');
  dots[0].setAttribute('aria-selected', 'true');

  startTimer();

})();
