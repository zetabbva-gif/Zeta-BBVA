/* =======================================================================
   ZETA — estilos globales (FASE 1: solo escritorio)
   TODO fase 2: añadir media queries para la versión móvil.
   El HTML está estructurado en columnas/flex/grid para poder introducir
   breakpoints más adelante sin reescribir el marcado.
   ======================================================================= */

:root {
  --color-purple: #8F7DBC;
  --color-white: #FFFFFF;

  /* Color de tipografía base (sobre fondo blanco) */
  --color-text: #A855F7;
  /* Misma tonalidad, oscurecida solo para uso sobre fondo morado:
     #A855F7 sobre #8F7DBC no alcanza WCAG AA (contraste ~1.1:1).
     #2F0458 mantiene el matiz (hue ~271°) y alcanza ~4.56:1 (AA texto normal). */
  --color-text-on-purple: #2F0458;

  --color-body: #262130;
  --color-body-on-purple: #211539;

  --font-heading: 'Bricolage Grotesque', 'Segoe UI', sans-serif;
  --font-subheading: 'Hanken Grotesk', 'Segoe UI', sans-serif;
  --font-body: 'Rubik', 'Segoe UI', sans-serif;

  --container-width: 1200px;
  --header-height: 84px;
  --section-padding-y: 96px;

  --transition-base: 0.3s ease;
}

/* ============================ RESET ============================ */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--color-body);
  background: var(--color-white);
  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1, h2, h3 {
  margin: 0 0 16px;
  color: var(--color-text);
}

h1, h2 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 2.75rem;
  line-height: 1.15;
}

h3 {
  font-family: var(--font-subheading);
  font-weight: 600;
  font-size: 1.375rem;
}

p {
  margin: 0 0 16px;
  font-family: var(--font-body);
  font-weight: 400;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--color-white);
  color: var(--color-text);
  padding: 12px 20px;
  z-index: 1000;
}

.skip-link:focus {
  left: 16px;
  top: 16px;
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 40px;
}

.container-fluid {
  width: 100%;
  padding: 0 40px;
}

/* Fondos de sección: alternan blanco / morado según data-bg */
section[data-bg="white"],
footer[data-bg="white"] {
  background-color: var(--color-white);
}

section[data-bg="purple"],
footer[data-bg="purple"] {
  background-color: var(--color-purple);
}

/* Texto morado sobre fondo morado usa el tono ajustado para contraste AA */
[data-bg="purple"] h1,
[data-bg="purple"] h2,
[data-bg="purple"] h3 {
  color: var(--color-text-on-purple);
}

[data-bg="purple"] p,
[data-bg="purple"] label,
[data-bg="purple"] .sim-step {
  color: var(--color-body-on-purple);
}

.btn {
  display: inline-block;
  border: none;
  border-radius: 999px;
  padding: 14px 32px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.btn-primary {
  background: var(--color-text);
  color: var(--color-white);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(168, 85, 247, 0.35);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 2px solid var(--color-text);
}

/* ============================ HEADER ============================ */
.site-header {
  position: sticky;
  top: 0;
  z-index: 500;
  height: var(--header-height);
  background: var(--color-white);
  border-bottom: 1px solid rgba(168, 85, 247, 0.15);
}

.header-inner {
  max-width: var(--container-width);
  margin: 0 auto;
  height: 100%;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.logo-img {
  height: 32px;
  width: auto;
}

.main-nav ul {
  display: flex;
  gap: 40px;
}

.main-nav a {
  font-family: var(--font-body);
  font-weight: 500;
  color: var(--color-text);
  padding: 8px 0;
  position: relative;
}

.main-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--color-text);
  transition: width var(--transition-base);
}

.main-nav a:hover::after {
  width: 100%;
}

.header-cta {
  flex-shrink: 0;
}

.qr-widget {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px 6px 6px;
  border-radius: 999px;
  border: 1px solid rgba(168, 85, 247, 0.25);
}

.qr-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--color-white);
  transition: background-color var(--transition-base);
  overflow: hidden;
}

.qr-visual canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.qr-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text);
  max-width: 120px;
  line-height: 1.3;
}

/* ============================ HERO ============================ */
.hero {
  position: relative;
  height: 88vh;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-media .img-placeholder {
  height: 100%;
}

.hero-quote {
  position: relative;
  z-index: 1;
  max-width: 620px;
  margin: 48px 0 0 48px;
  padding: 20px 28px;
  background: rgba(255, 255, 255, 0.88);
  color: var(--color-text);
  font-family: var(--font-subheading);
  font-weight: 600;
  font-size: 1.375rem;
  line-height: 1.4;
  border-radius: 12px;
}

.hero-cta {
  position: relative;
  z-index: 1;
  align-self: center;
  margin-bottom: 56px;
}

/* ============================ IMAGE PLACEHOLDERS ============================ */
.img-placeholder {
  position: relative;
  width: 100%;
  min-height: 380px;
  background: #D9D9D9;
  border-radius: 16px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.img-placeholder--cover {
  border-radius: 0;
  min-height: 100%;
}

.img-placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 2px, transparent 2px 14px);
}

.img-placeholder::after {
  content: 'Imagen placeholder — ' attr(data-future-src);
  position: relative;
  margin: 16px;
  padding: 6px 12px;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: #6B6B6B;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 6px;
}

/* ============================ SPLIT SECTIONS ============================ */
.split-section {
  padding: var(--section-padding-y) 0;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
}

.col-text h1,
.col-text h2 {
  margin-bottom: 12px;
}

.col-text h3 {
  margin-bottom: 24px;
  color: var(--color-text);
}

[data-bg="purple"] .col-text h3 {
  color: var(--color-text-on-purple);
}

/* ============================ SIMULADOR ============================ */
.simulator-section {
  padding: var(--section-padding-y) 0;
}

.simulator-grid {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 24px;
}

.sim-panel {
  flex: 1 1 0;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
}

.sim-panel--goal {
  flex: 1.4 1 0;
}

.sim-panel h2,
.sim-panel h3 {
  color: var(--color-text-on-purple);
}

.sim-step {
  font-family: var(--font-body);
  font-weight: 500;
  color: var(--color-body-on-purple);
  margin-bottom: 16px;
}

.sim-goal-options {
  border: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sim-goal-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  color: var(--color-body-on-purple);
  font-size: 0.9375rem;
  cursor: pointer;
  transition: background var(--transition-base);
}

.sim-goal-option:has(input:checked) {
  background: var(--color-white);
  font-weight: 500;
}

.sim-panel-footer {
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
}

.sim-panel-footer h3 {
  font-size: 1.125rem;
  margin-bottom: 12px;
}

.sim-panel-footer p {
  color: var(--color-body-on-purple);
  font-size: 0.9375rem;
}

.sim-input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-white);
  border-radius: 12px;
  padding: 14px 18px;
}

.sim-input-symbol {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-text);
}

.sim-input {
  border: none;
  outline: none;
  width: 100%;
  font-family: var(--font-body);
  font-size: 1.25rem;
  color: var(--color-body);
  background: transparent;
}

.sim-input::-webkit-outer-spin-button,
.sim-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.sim-panel--result {
  background: var(--color-white);
}

.sim-result-title {
  font-family: var(--font-subheading);
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: var(--color-text);
}

.sim-result-text {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--color-body);
  margin-bottom: 24px;
}

.sim-advice {
  margin-top: auto;
  padding: 18px;
  background: rgba(168, 85, 247, 0.08);
  border-radius: 12px;
}

.sim-advice-label {
  display: block;
  font-family: var(--font-subheading);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
}

.sim-advice-text {
  margin: 0;
  font-size: 0.9375rem;
}

/* ============================ FORMULARIO ============================ */
.form-section {
  padding: var(--section-padding-y) 0;
}

.zeta-form {
  max-width: 560px;
}

.form-fields {
  min-height: 40px;
}

.form-consent {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 24px 0;
  font-size: 0.9375rem;
}

.form-consent a {
  color: var(--color-text);
  text-decoration: underline;
}

.form-consent input {
  margin-top: 4px;
}

/* ============================ FOOTER ============================ */
.site-footer {
  color: var(--color-text-on-purple);
}

.footer-top {
  padding: 56px 40px;
  text-align: center;
  border-bottom: 1px solid rgba(47, 4, 88, 0.25);
}

.footer-top p {
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  color: var(--color-text-on-purple);
}

.footer-bottom {
  padding: 24px 40px;
}

.footer-bottom nav ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
}

.footer-bottom a {
  font-size: 0.9375rem;
  color: var(--color-body-on-purple);
}

.footer-bottom a:hover {
  text-decoration: underline;
}

/* ============================ SCROLL REVEAL ============================ */
.reveal {
  opacity: 0;
  transform: translateX(64px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* ============================ COOKIE BANNER ============================ */
.cookie-banner {
  position: fixed;
  left: 24px;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  max-width: 720px;
  margin: 0 auto;
  background: var(--color-white);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(38, 33, 48, 0.18);
  padding: 24px 28px;
}

.cookie-banner p {
  margin: 0 0 16px;
  font-size: 0.9375rem;
}

.cookie-banner a {
  color: var(--color-text);
  text-decoration: underline;
}

.cookie-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cookie-modal:not([hidden]) {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(38, 33, 48, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cookie-modal-content {
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--color-white);
  border-radius: 16px;
  padding: 32px;
}

.cookie-category {
  padding: 16px 0;
  border-top: 1px solid rgba(168, 85, 247, 0.15);
}

.cookie-category label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.cookie-category p {
  margin: 8px 0 0 26px;
  font-size: 0.875rem;
  color: #5A5560;
}

.cookie-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

/* ============================ PÁGINAS PLACEHOLDER LEGALES ============================ */
.legal-placeholder {
  max-width: 720px;
  margin: 0 auto;
  padding: 120px 40px;
}

.legal-placeholder h1 {
  margin-bottom: 16px;
}

/* TODO fase 2: breakpoints (ej. @media (max-width: 1024px) / (max-width: 640px))
   para apilar .two-col, .simulator-grid y ajustar .header-inner en móvil. */
