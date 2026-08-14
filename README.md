# ZETA — Landing page

Landing page de una sola página (single-page, scroll vertical) cuyo único
objetivo es dirigir al usuario a la descarga de la app ZETA. No requiere
build ni dependencias: es HTML, CSS y JavaScript vanilla.

## Estructura del proyecto

```
zeta-landing/
  index.html
  css/
    styles.css
  js/
    main.js
  assets/
    logo-zeta.png
    pablo.png
    foto-que-es.png
    foto-control.png
    foto-simulador.png
  README.md
```

## Sustituir los placeholders de imagen

Todas las imágenes de `/assets/` son placeholders generados automáticamente
(fondo de color con el nombre de la imagen escrito encima) para que puedas
ver el layout completo antes de tener las fotos reales. Sustitúyelas
manualmente por archivos con el **mismo nombre** y usa **el mismo formato
(PNG)** para no tener que tocar el HTML:

| Archivo                     | Dónde se usa                              | Recomendación de tamaño / encuadre |
|------------------------------|--------------------------------------------|--------------------------------------|
| `assets/logo-zeta.png`       | Nav, footer, modales de login/registro     | Logo con fondo transparente, formato horizontal (≈300×100 px) |
| `assets/pablo.png`           | Foto de campaña del Hero (columna derecha) | Retrato vertical, encuadre desde arriba (`object-position: top`), mínimo 1000×1400 px |
| `assets/foto-que-es.png`     | Sección "Qué es ZETA"                      | Foto horizontal, grupo de jóvenes en entorno urbano, mínimo 1000×1200 px |
| `assets/foto-control.png`    | Sección "Ten el control"                   | Foto de un smartphone con la app, mínimo 1000×1200 px |
| `assets/foto-simulador.png`  | Sección "Por qué ZETA"                     | Foto/mockup de interfaz gamificada, mínimo 1000×1200 px |

Simplemente reemplaza el archivo en `/assets/` manteniendo el nombre exacto
(incluye mayúsculas/minúsculas) y la página lo recogerá automáticamente al
recargar — no hace falta editar `index.html` ni `styles.css`.

Si prefieres usar otro formato (JPG, WebP), actualiza también la extensión
en el atributo `src` correspondiente dentro de `index.html`.

## Cómo cambiar el QR placeholder por el real

Hay **dos** QR placeholder en la página, ambos son simples cajas con el
texto "QR" (no imágenes, para evitar depender de una librería de
generación de códigos):

1. **QR flotante** (fijo en el margen derecho, a media altura): en
   `index.html`, busca el bloque `<div class="qr-float" id="qr-float">` y
   el `<div class="qr-popover-box" ...>QR</div>` dentro de él.
2. **QR de la sección CTA final** ("¿A qué esperas?"): busca
   `<div class="cta-qr-box" ...>QR</div>` dentro de `<section class="cta-final" id="descarga">`.

Para poner el QR real, sustituye cada `<div class="...">QR</div>` por una
imagen, por ejemplo:

```html
<img src="assets/qr-app.png" alt="Código QR para descargar la app ZETA" class="cta-qr-box">
```

(añade el archivo de imagen del QR dentro de `/assets/` y ajusta el `class`
según el contenedor — `qr-popover-box` o `cta-qr-box` — para heredar el
tamaño y bordes ya definidos en `css/styles.css`).

También puedes generar el QR dinámicamente en el navegador (por ejemplo con
una librería como `qrcode.js`) apuntando a la URL real de descarga de la
app; en ese caso sustituye el `<div>` por un `<canvas>` y añade el script
correspondiente en `js/main.js`.

## Actualizar la fecha del bono de bienvenida

En `index.html`, dentro de la sección CTA final (`id="descarga"`), busca:

```html
<p class="cta-urgency fade-up" ...>
  Regístrate antes del <span data-bonus-deadline>30 de septiembre</span> y llévate tu bono de 20€
</p>
```

Cambia el texto **"30 de septiembre"** por la nueva fecha límite. El
atributo `data-bonus-deadline` está pensado para que, si en el futuro
quieres calcular la fecha dinámicamente (por ejemplo mostrando siempre
"fin de mes" o una cuenta atrás), puedas seleccionar ese elemento desde
`js/main.js` con `document.querySelector('[data-bonus-deadline]')` sin
tener que buscar el texto a mano.

## Activar el canonical URL real

El `<head>` de `index.html` incluye una URL canónica provisional:

```html
<link rel="canonical" href="https://zeta.bbva.es/">
```

En cuanto el dominio definitivo esté disponible, sustituye ese `href` por
la URL real de producción (por ejemplo, la de GitHub Pages si es donde vive
la landing, o el dominio final si ya está asignado). Aprovecha también para
revisar y actualizar estas otras etiquetas del `<head>` que referencian la
misma URL o dominio:

- `og:image` (ahora mismo apunta a `assets/pablo.png` como ruta relativa;
  para que se vea bien al compartir en redes sociales, cámbiala por una URL
  absoluta, ej. `https://zeta.bbva.es/assets/pablo.png`).

No hace falta tocar nada más: el resto de metadatos SEO (`title`,
`description`, `keywords`, Open Graph, JSON-LD) ya están listos para
producción.

## Subir a GitHub Pages

1. Crea un repositorio nuevo en GitHub (o usa uno existente) y sube el
   contenido de esta carpeta (`index.html`, `css/`, `js/`, `assets/`) a la
   raíz del repositorio (o a una subcarpeta, ver paso 3).

   ```bash
   cd zeta-landing
   git init
   git add .
   git commit -m "Landing page ZETA"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
   git push -u origin main
   ```

2. En GitHub, entra en el repositorio → **Settings** → **Pages**.
3. En **Source**, selecciona la rama `main` y la carpeta `/ (root)` (o
   `/docs` si subiste el contenido dentro de una carpeta `docs/` — en ese
   caso renombra `zeta-landing/` a `docs/` antes de hacer push).
4. Guarda. GitHub tardará uno o dos minutos en publicar el sitio; la URL
   aparecerá en la propia pantalla de **Pages**, con el formato:
   `https://<tu-usuario>.github.io/<tu-repo>/`
5. Cada vez que hagas `git push` a la rama configurada, GitHub Pages
   redesplegará automáticamente la página con los cambios.

No hace falta ningún paso de build: al ser HTML/CSS/JS estático, GitHub
Pages lo sirve tal cual.

## Notas técnicas

- Tipografías cargadas desde Google Fonts (Bricolage Grotesque, Hanken
  Grotesk, Rubik) — requiere conexión a internet para verse con el
  tipo de letra definitivo; si necesitas que funcione 100% offline,
  descarga los `.woff2` y sirve las fuentes desde `/assets/fonts/`.
- El simulador, los modales de login/registro, el menú móvil y el QR
  flotante están implementados en JavaScript vanilla (sin dependencias)
  en `js/main.js`.
- Respeta `prefers-reduced-motion`: si el usuario tiene desactivadas las
  animaciones a nivel de sistema, las transiciones y el fade-up se
  deshabilitan automáticamente.
- SEO/GEO: `title`, `meta description`, `keywords`, `canonical` y Open
  Graph en el `<head>`, más dos bloques JSON-LD (`MobileApplication` para
  la app y `WebApplication` para el simulador) y microdata
  `schema.org/Review` en las tarjetas de testimonios.
- El tooltip de "ZETips" (sección "Toma el control") se abre con hover en
  escritorio y con tap en móvil (con overlay); se cierra con ESC o al
  tocar fuera.
