# Migración: Next.js (este repo) → Drupal 10.6 (sitio clásico)

Objetivo: recrear este sitio (estructura, rutas, i18n, contenido) en **Drupal 10.6** como **sitio clásico** (Twig + theme), importando el contenido desde este repo (`content/**` y `content/data/*.json`).

## Qué se puede migrar “directo” y qué no

### Migrable de forma fiable
- **Contenido**:
  - MDX/Markdown de `content/**` → nodos Drupal (Body + campos).
  - JSON de `content/data/*.json` → nodos Drupal (cronología/protagonistas).
- **Estructura de navegación**:
  - Menú principal y aliases de URL (Pathauto).
- **i18n**:
  - ES/EN con Content Translation.

### No migrable “copiar/pegar”
- **UI/tema** (Tailwind/React/Next layouts) → hay que **reconstruir** en un theme Drupal (Twig + CSS/JS).
  - Sí se puede replicar la **paleta** y el layout, pero es trabajo de theming.

## Inventario del contenido en este repo
- **MDX/Markdown**:
  - `content/es/**` (español)
  - `content/en/**` (inglés)
- **Datos JSON**:
  - `content/data/timeline.json`
  - `content/data/protagonists.json`

## 1) Configurar Drupal 10.6 (base)

### Módulos a habilitar (core/contrib recomendados)
- **Core**:
  - Content Translation
  - Language
  - Locale
  - Path
  - Views
  - Field UI
  - Taxonomy
- **Contrib**:
  - Pathauto
  - Redirect
  - (Opcional) Paragraphs (si quieres maquetación editorial flexible)
  - (Opcional) Search API (mejor búsqueda que el core)
  - (Para import simple) Feeds / Feeds Tamper *o* importer basado en Migrate API (recomendado)

### Idiomas
- ES como idioma por defecto
- EN como secundario
- Activar **Content Translation** para los tipos de contenido que definamos

## 2) Modelado de contenido (tipos + campos)

Recomendación: mantenerlo simple y alineado con la estructura actual.

### Tipo de contenido: `page` (Páginas)
Para: Home, Sobre, Recursos, Impacto y legado (y páginas generales).

Campos sugeridos:
- `body` (Long text)
- `field_summary` (text) → equivale a `description` del frontmatter
- `field_tags` (taxonomy term reference) (opcional pero recomendable)
- `field_order` (integer) (opcional)
- `field_author` (text) (opcional)
- `field_created_at` (date) (opcional)
- `field_updated_at` (date) (opcional)

### Tipo de contenido: `article_section` (Artículo/Sección)
Para: subpáginas de Carrera Espacial y Misión Apollo XI.

Campos:
- Igual que `page`, + `field_section` (taxonomy: Carrera Espacial / Misión Apollo XI)

### Tipo de contenido: `protagonist`
Para: Armstrong, Aldrin, Collins, Personajes secundarios.

Campos:
- `body` (perfil extendido)
- `field_summary` (resumen corto)
- `field_role` (text)
- `field_tags` (taxonomy)
- (Opcional) `field_image` (media)

### Tipo de contenido: `timeline_event`
Para: cada evento 1957–1975.

Campos:
- `title`
- `field_year` (integer)
- `field_summary` (text)
- (Opcional) `field_tags` (taxonomy)

## 3) Taxonomías
- **Tags** (para replicar `/tags` y relaciones)
- **Section** (Carrera Espacial, Misión Apollo XI, Impacto y legado, Recursos, Protagonistas, Cronología)

## 4) URLs (Pathauto + Redirect)

Objetivo: mantener URLs estilo:
- `/es/carrera-espacial` y subpáginas `/es/carrera-espacial/contexto-historico`…
- `/es/mision-apollo-xi` y subpáginas `/es/mision-apollo-xi/saturn-v`…
- Lo mismo en `/en/...`

Acciones:
- Configurar Pathauto por tipo de contenido y por idioma.
- Habilitar Redirect para preservar rutas si cambian.

## 5) Importación del contenido (2 opciones)

### Opción A — Importación rápida (menos “ingeniería”)
Cuándo: pocas páginas, o si el objetivo es “funciona” rápido.

Pasos:
- Convertir MDX → Markdown/HTML compatible (en este repo el MDX es casi todo Markdown, suele pegarse bien).
- Crear nodos manualmente o importar por CSV con Feeds.
- Copiar `title`, `description`, `tags` y `body`.
- Para cronología/protagonistas: CSV desde `content/data/*.json`.

Pros:
- Rápida
Contras:
- Menos reproducible; si cambias contenido en el repo, reimportar es manual.

### Opción B — Import profesional con Migrate API (recomendada)
Cuándo: quieres un proceso repetible y limpio.

Idea:
- Crear un módulo custom `apolloxi_migrate` en Drupal.
- Implementar migraciones:
  - `apolloxi_pages_es`, `apolloxi_pages_en`
  - `apolloxi_sections_es`, `apolloxi_sections_en`
  - `apolloxi_protagonists_es`, `apolloxi_protagonists_en`
  - `apolloxi_timeline_es`, `apolloxi_timeline_en`
- Fuente: filesystem (leer `content/es/**`, `content/en/**`, y JSON).
- Transformación: frontmatter → campos; body → body; tags → términos.
- Traducciones: crear ES y luego importar EN como traducción del mismo nodo (Content Translation).

Pros:
- Repetible, versionable
Contras:
- Requiere implementación (1–2 días según complejidad y experiencia)

## 6) Theme Drupal (replicar UI)

Objetivo: “parecerse” a la web actual.

Acciones:
- Crear subtheme (recomendación: tema custom ligero).
- Llevar la paleta (CSS variables) similar a `src/app/globals.css` a `:root` del theme.
- Rehacer:
  - Header/Nav (menú principal + selector de idioma)
  - Footer
  - Layouts de artículo (toc/sidebar si quieres)
  - Cards/listados (cronología, protagonistas)

Nota: replicar pixel-perfect es posible, pero la conversión no es automática.

## 7) Búsqueda y tags en Drupal
- **Tags**: vistas por término y página de listado.
- **Búsqueda**:
  - Simple: buscador core
  - Mejor: Search API (recomendado) con índice de nodos + filtros por tags/sección

## Checklist mínimo “para entregar”
- [ ] Idiomas ES/EN + traducción de contenido
- [ ] Tipos de contenido + campos
- [ ] Menú principal
- [ ] Pathauto + Redirect
- [ ] Importación de páginas (ES/EN)
- [ ] Importación de cronología (1957–1975)
- [ ] Importación de protagonistas
- [ ] Página de tags + vistas por término
- [ ] Búsqueda
- [ ] Theme (mínimo: header/footer/typography/colores)


