/* =======================================================================
   ZETA — hero.js
   El hero no tiene lógica JS propia por ahora:
   · La animación de entrada (fadeUp) de sus textos la gestiona el
     observer compartido en animations.js (misma clase .fade-up que
     usa el resto de secciones).
   · El efecto Ken Burns de la foto de Pablo es una animación CSS pura
     (@keyframes kenBurns en css/hero.css) — no requiere JavaScript.
   Este archivo se mantiene como módulo reservado para futura lógica
   específica del hero, siguiendo la arquitectura de un archivo por
   sección.
   ======================================================================= */
