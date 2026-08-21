/* =======================================================================
   ZETA — simulador.js
   Lógica completa del simulador: chips de objetivo, sliders/inputs
   sincronizados, cálculo en tiempo real y ZETip dinámico.
   ======================================================================= */

(function () {
  'use strict';

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
})();
