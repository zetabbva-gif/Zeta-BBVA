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
  download/
    index.html        ← smart redirect a App Store / Google Play
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
| `assets/logo-zeta.png`       | Nav, footer, modales de login/registro, página de descarga | Logo con fondo transparente, formato horizontal (≈300×100 px) |
| `assets/pablo.png`           | Foto de fondo a ancho completo del Hero    | Horizontal o vertical, encuadre desde arriba (`object-position: center top`), mínimo 1600×1000 px — cuanto más ancha, mejor cubre pantallas panorámicas |
| `assets/foto-que-es.png`     | Sección "Qué es ZETA"                      | Foto horizontal, grupo de jóvenes en entorno urbano, mínimo 1000×1200 px |
| `assets/foto-control.png`    | Sección "Toma el control"                  | Foto de un smartphone con la app, mínimo 1000×1200 px |
| `assets/foto-simulador.png`  | Sección "Por qué ZETA"                     | Foto/mockup de interfaz gamificada, mínimo 1000×1200 px |

Simplemente reemplaza el archivo en `/assets/` manteniendo el nombre exacto
(incluye mayúsculas/minúsculas) y la página lo recogerá automáticamente al
recargar — no hace falta editar `index.html` ni `styles.css`.

Si prefieres usar otro formato (JPG, WebP), actualiza también la extensión
en el atributo `src` correspondiente dentro de `index.html` y de
`download/index.html`.

## Cómo cambiar el QR placeholder por el real

Ahora solo queda un QR en toda la landing: el de la sección CTA final
("¿A qué esperas?"). Es un `<div class="cta-qr-box">QR</div>` dentro de un
enlace `<a href="download/index.html" class="cta-qr">` — el placeholder de
texto y el enlace apuntan ambos a la misma idea: la ruta `/download`.

Para poner el QR real:

1. Genera la imagen del QR codificando la URL de producción de la página
   de descarga (por ejemplo `https://zeta.bbva.es/download`).
2. En `index.html`, busca `<div class="cta-qr-box" aria-hidden="true">QR</div>`
   dentro de `<section class="cta-final" id="descarga">` y sustitúyelo por:

   ```html
   <img src="assets/qr-app.png" alt="Código QR para descargar la app ZETA" class="cta-qr-box">
   ```

   (añade el archivo de imagen del QR dentro de `/assets/`; la clase
   `cta-qr-box` ya define el tamaño 160×160px, el padding y el
   `border-radius` en `css/styles.css`, así que la imagen los hereda
   automáticamente).
3. El `<a href="download/index.html">` que envuelve el QR puedes dejarlo
   así (útil para probar el flujo haciendo clic desde el propio navegador)
   o, si prefieres que el QR sea puramente una imagen escaneable sin enlace
   de respaldo, puedes quitar el `<a>` y dejar solo la `<img>`.

## Página de descarga inteligente (`/download`)

`download/index.html` es la página a la que apunta el QR. Al cargarse,
detecta el dispositivo por `navigator.userAgent` y redirige automáticamente:

- **iOS** (iPhone/iPad/iPod) → App Store
- **Android** → Google Play
- **Escritorio** (o cualquier otro user agent) → se queda en la página y
  muestra el bloque `#desktop-fallback` con los dos botones de tienda y el
  aviso de escanear el QR desde el móvil.

### Añadir el ID real de App Store

Busca `[ID_APP]` en `download/index.html` (aparece dos veces: una en el
`<script>` y otra en el `href` del botón visible para escritorio) y
sustitúyelo por el ID real de la app, por ejemplo:

```
https://apps.apple.com/app/zeta/id1234567890
```

### Añadir el package name real de Google Play

Busca `[PACKAGE_NAME]` en `download/index.html` (misma lógica: aparece en
el `<script>` y en el botón de escritorio) y sustitúyelo por el package
name real, por ejemplo:

```
https://play.google.com/store/apps/details?id=es.bbva.zeta
```

Ambos placeholders están señalados con comentarios `<!-- SUSTITUIR POR ID
REAL DE APP STORE -->` y `<!-- SUSTITUIR POR PACKAGE NAME REAL DE GOOGLE
PLAY -->` para que sean fáciles de localizar.

## Activar la URL canónica real

Tanto `index.html` como `download/index.html` incluyen una URL canónica
provisional:

```html
<link rel="canonical" href="https://zeta.bbva.es/">        <!-- index.html -->
<link rel="canonical" href="https://zeta.bbva.es/download"> <!-- download/index.html -->
```

En cuanto el dominio definitivo esté disponible, sustituye esos `href` por
las URLs reales de producción (por ejemplo, las de GitHub Pages si es
donde vive la landing, o el dominio final si ya está asignado). Aprovecha
también para revisar y actualizar:

- `og:image` en `index.html` (ahora mismo apunta a `assets/pablo.png`
  como ruta relativa; para que se vea bien al compartir en redes
  sociales, cámbiala por una URL absoluta, ej.
  `https://zeta.bbva.es/assets/pablo.png`).

No hace falta tocar nada más: el resto de metadatos SEO (`title`,
`description`, `keywords`, Open Graph, JSON-LD) ya están listos para
producción.

## Subir a GitHub Pages

1. Crea un repositorio nuevo en GitHub (o usa uno existente) y sube el
   contenido de esta carpeta (`index.html`, `css/`, `js/`, `download/`,
   `assets/`) a la raíz del repositorio (o a una subcarpeta, ver paso 3).
   Es importante subir también la carpeta `download/` completa para que
   el QR funcione.

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
5. La página de descarga quedará disponible en
   `https://<tu-usuario>.github.io/<tu-repo>/download/` — es la URL que
   debe codificar el QR real (ver sección anterior).
6. Cada vez que hagas `git push` a la rama configurada, GitHub Pages
   redesplegará automáticamente la página con los cambios.

No hace falta ningún paso de build: al ser HTML/CSS/JS estático, GitHub
Pages lo sirve tal cual.

## Notas técnicas

- Tipografías cargadas desde Google Fonts (Bricolage Grotesque, Hanken
  Grotesk, Rubik) — requiere conexión a internet para verse con el
  tipo de letra definitivo; si necesitas que funcione 100% offline,
  descarga los `.woff2` y sirve las fuentes desde `/assets/fonts/`.
- El simulador, los modales de login/registro y el menú móvil están
  implementados en JavaScript vanilla (sin dependencias) en `js/main.js`.
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
- El fondo de cada sección ocupa siempre el 100% del ancho del viewport;
  únicamente el contenido interior está limitado a 1200px centrados, para
  que el texto no se estire en pantallas muy anchas.
