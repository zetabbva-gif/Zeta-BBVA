# ZETA — Landing page

Landing page de una sola página (single-page, scroll vertical) cuyo único
objetivo es dirigir al usuario a la descarga de la app ZETA. No requiere
build ni dependencias: es HTML, CSS y JavaScript vanilla, con el CSS y el
JS modularizados por sección.

## Estructura del proyecto

```
zeta-landing/
  index.html
  css/
    base.css          ← reset, variables CSS, tipografías, utilidades
    nav.css
    hero.css
    trust-bar.css      ← ver nota en "Arquitectura del proyecto"
    que-es.css
    porque.css
    control.css
    simulador.css
    testimoniales.css
    cta-final.css
    footer.css
    modales.css        ← modales login/registro + tooltip ZETips
  js/
    animations.js       ← fadeUp global + window.ZETA compartido
    nav.js
    hero.js
    simulador.js
    testimoniales.js
    modales.js
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

## Arquitectura del proyecto

El código está modularizado por secciones: cada sección de la web tiene su
propio archivo CSS y (cuando tiene lógica propia) su propio archivo JS.
Para modificar una sección, basta con editar su archivo — no hace falta
tocar el resto.

### CSS

Los `<link>` de `index.html` cargan los archivos en este orden (importa:
`base.css` va primero porque define las variables `:root` y las utilidades
que el resto de archivos reutiliza):

- Variables globales, reset y utilidades → `css/base.css`
- Navegación → `css/nav.css`
- Hero → `css/hero.css`
- Barra de confianza → `css/trust-bar.css` *(ver nota abajo)*
- Qué es ZETA → `css/que-es.css`
- Por qué ZETA → `css/porque.css`
- Toma el control → `css/control.css`
- Simulador → `css/simulador.css`
- Testimoniales → `css/testimoniales.css`
- CTA final → `css/cta-final.css`
- Footer → `css/footer.css`
- Modales y tooltip de ZETips → `css/modales.css`

Ningún archivo de sección redefine variables — todos usan las de `:root`
declaradas en `base.css`. Las tres secciones con layout "imagen + texto"
(Qué es ZETA, Por qué ZETA, Toma el control) repiten la regla `.split-inner`
en su propio archivo en lugar de compartirla desde `base.css`: así cada
sección queda autocontenida y se puede ajustar su layout sin tocar las
otras dos.

> **Nota sobre `trust-bar.css`:** la barra de confianza no está presente en
> la versión actual de la landing (se retiró en una iteración anterior por
> falta de legibilidad; su información — "Respaldada por BBVA · Regulada
> por el Banco de España" — vive ahora en el badge del hero, `.hero-badge`
> en `css/hero.css`). El archivo se mantiene vacío y documentado para
> conservar la arquitectura de 12 módulos pedida, listo por si la sección
> se reincorpora en el futuro.

### JavaScript

Los `<script defer>` se cargan al final del `<body>` en este orden:

1. `js/animations.js` — declara `window.ZETA` (compartido entre módulos,
   sin `import`/`export` para que funcione en GitHub Pages sin servidor) y
   el `IntersectionObserver` que activa el `fadeUp` en todas las secciones.
2. `js/nav.js` — smooth scroll con offset del nav y highlight del enlace
   activo.
3. `js/hero.js` — reservado; el hero no tiene lógica propia (su fadeUp lo
   cubre `animations.js` y el Ken Burns es CSS puro en `hero.css`).
4. `js/simulador.js` — chips de objetivo, sliders sincronizados, cálculo
   en tiempo real y ZETip dinámico.
5. `js/testimoniales.js` — reservado; no hay carrusel implementado (la
   sección es una rejilla estática de 3 columnas).
6. `js/modales.js` — tooltip de ZETips, apertura/cierre de los modales de
   login y registro, focus trap, validación de formularios y toggle de
   mostrar/ocultar contraseña.

Todos los módulos usan el patrón IIFE (`(function () { ... })()`), no ES
modules. El botón "Iniciar sesión" del nav se define en el HTML dentro de
`nav.css`, pero su comportamiento de apertura de modal vive en
`modales.js`, que es el dueño del estado (`openModal`/`closeModal`) —
mantenerlo junto evita duplicar esa lógica entre dos archivos.

## Menú móvil eliminado

El menú hamburguesa y el drawer lateral se han eliminado por completo
(HTML, CSS y JS). En pantallas menores de 768px la nav solo muestra el
logo y el botón "Descárgala gratis"; los enlaces de navegación y el botón
"Iniciar sesión" se ocultan (`display: none` en `css/nav.css`) sin ningún
menú alternativo.

## Sustituir las imágenes

| Archivo                     | Dónde se usa                              | Recomendación de tamaño / encuadre |
|------------------------------|--------------------------------------------|--------------------------------------|
| `assets/logo-zeta.png`       | Nav, footer, modales de login/registro, página de descarga | Logo con fondo transparente, formato horizontal (≈300×100 px) |
| `assets/pablo.png`           | Foto del Hero (columna derecha)            | **PNG con fondo transparente (canal alpha)**, figura centrada, sin texto superpuesto — ver nota de remove.bg abajo |
| `assets/foto-que-es.png`     | Sección "Qué es ZETA"                      | Foto horizontal, grupo de jóvenes en entorno urbano, mínimo 1000×1200 px |
| `assets/foto-control.png`    | Sección "Toma el control"                  | Foto de un smartphone con la app, mínimo 1000×1200 px |
| `assets/foto-simulador.png`  | Sección "Por qué ZETA"                     | Foto/mockup de interfaz gamificada, mínimo 1000×1200 px |

Reemplaza el archivo en `/assets/` manteniendo el nombre exacto (incluye
mayúsculas/minúsculas) y la página lo recogerá automáticamente al
recargar — no hace falta editar `index.html` ni ningún CSS.

Si prefieres usar otro formato (JPG, WebP), actualiza también la extensión
en el atributo `src` correspondiente dentro de `index.html` y de
`download/index.html`, y en la regla `background-image` de `css/hero.css`
(la que usa la versión mobile del hero).

> **Nota sobre `assets/pablo.png`:** el hero ya no usa `mix-blend-mode` ni
> `filter` — la imagen se muestra tal cual sobre el fondo `#0A0A0A` del
> hero (`.hero-media` / `.hero::before` en `css/hero.css`), así que
> necesita tener el fondo ya recortado en el propio archivo. La versión
> actual del repo tiene el fondo quitado con un recorte automático por
> color (funciona porque el fondo original era blanco liso), pero antes de
> publicar a producción sustitúyela por una versión profesional: sube la
> foto a [remove.bg](https://www.remove.bg/), descarga el PNG con canal
> alpha resultante y sobrescribe `assets/pablo.png` manteniendo el mismo
> nombre — dará un recorte más limpio en los bordes (pelo, dedos) que el
> recorte automático.

## Cómo cambiar el QR placeholder por el real

Solo hay un QR en toda la landing: el de la sección CTA final
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
   `border-radius` en `css/cta-final.css`, así que la imagen los hereda
   automáticamente).
3. El `<a href="download/index.html">` que envuelve el QR puedes dejarlo
   así (útil para probar el flujo haciendo clic desde el propio navegador)
   o, si prefieres que el QR sea puramente una imagen escaneable sin enlace
   de respaldo, puedes quitar el `<a>` y dejar solo la `<img>`.

## Página de descarga inteligente (`/download`)

`download/index.html` es la página a la que apunta el QR. No forma parte
de esta refactorización (se mantiene igual). Al cargarse, detecta el
dispositivo por `navigator.userAgent` y redirige automáticamente:

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
   el QR funcione, y **las carpetas `css/` y `js/` enteras** (los 12
   archivos CSS y los 6 archivos JS) — si falta alguno, esa sección
   concreta perderá sus estilos o su interactividad.

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
- El simulador y los modales de login/registro están implementados en
  JavaScript vanilla (sin dependencias) — ver "Arquitectura del proyecto"
  para dónde vive cada pieza.
- Respeta `prefers-reduced-motion`: si el usuario tiene desactivadas las
  animaciones a nivel de sistema, las transiciones, el fadeUp y el Ken
  Burns del hero se deshabilitan automáticamente.
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
