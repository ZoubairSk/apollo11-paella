# Comparativa: Documento del portafolio vs. Web Next.js (estado actual)

Fuente de requisitos: documento aportado por **Álvaro García Martínez** (tema: Apollo XI) basado en “fases para la creación de un sitio web”.

## 1) Objetivos del sitio (documento) vs implementación

### Objetivos declarados en el documento
- Explicar **contexto** de Carrera Espacial (Guerra Fría, bloques EE.UU.–URSS, avances).
- Presentar la **misión Apollo 11** (Saturn V, Eagle, tripulación, control de misión, alunizaje, riesgos) con enfoque didáctico.
- Mostrar **impacto social/cultural/científico/tecnológico** y promover reflexión crítica (ética, justicia social, etc.).

### Estado en la web Next.js
- **Contexto y Carrera Espacial**: **implementado** con sección MDX y subpáginas.
- **Misión Apollo XI**: **implementado** con sección MDX y subpáginas (Saturn V / Eagle / Alunizaje).
- **Impacto/legado**: **pendiente** (no hay sección dedicada todavía).

## 2) Servicios (documento) vs secciones actuales

### Servicios previstos
- Contexto histórico (Guerra Fría y Carrera Espacial)
- Sección misión Apollo 11
- Bibliografía/protagonistas
- Línea temporal (1957–1975)
- Recursos y bibliografía recomendada

### Estado actual
- **Carrera Espacial**: ✅
- **Misión Apollo XI**: ✅
- **Protagonistas**: ✅ (listado + perfiles extendidos en MDX)
- **Cronología 1957–1975**: ✅ (dataset y UI)
- **Recursos/Bibliografía**: ❌ (pendiente)

## 3) Funcionalidades (documento) vs estado actual

### Requisitos del documento
- Menús temáticos (Contexto, Programas espaciales, Apolo 11, Protagonistas, Impacto y legado, Cronología, Recursos).
- Sistema de **etiquetas/tags** (URSS, NASA, tripulación, tecnología, ética…).
- **Metadatos** básicos (autor, fecha, categoría/tema).
- Búsqueda (Drupal) por títulos/texto y resultados listados.

### Estado actual
- **Menú temático**: ✅ parcialmente.
  - Actualmente: Home, Carrera Espacial, Protagonistas, Cronología, Misión, Sobre.
  - Falta: **Impacto y legado**, **Recursos y bibliografía** (como tabs).
- **Tags**: ❌ pendiente (no hay taxonomía/etiquetas navegables en la UI todavía).
- **Metadatos**:
  - ✅ Metadata SEO base (title/description/canonical/hreflang, sitemap/robots).
  - ❌ Metadatos académicos por página (autor/fecha/tipo/tema) aún no expuestos.
- **Búsqueda**: ❌ pendiente (no hay buscador en Next.js todavía).

## 4) Arquitectura de contenido (documento) vs implementación

### En el documento
Contenido organizado por categorías: Contexto histórico, Carrera Espacial, Programa Apollo 11, Protagonistas, Cronología e impacto.

### En la web Next.js
- Contenido **repo-based** (MDX/JSON):
  - `content/es/**` y `content/en/**`
  - `content/data/timeline.json`
  - `content/data/protagonists.json`
- Renderizado MDX server-side:
  - Home: `src/app/[locale]/page.tsx`
  - Carrera Espacial: `src/app/[locale]/carrera-espacial/**`
  - Misión: `src/app/[locale]/mision-apollo-xi/**`
  - Sobre: `src/app/[locale]/sobre/page.tsx`
  - Protagonistas: `src/app/[locale]/protagonistas/**`

## 5) Navegación y menú (mapa conceptual del documento)

### Mapa del documento (resumen)
- Inicio → presentación / objetivo / contexto / posguerra / Guerra Fría / bloques
- Carrera Espacial → avances / programa soviético / programa USA
- Misión Apollo 11 → Saturn V / Eagle / desarrollo y alunizaje
- Protagonistas → tripulación / otros actores
- Cronología → hitos
- (Implícito en funcionalidades) Impacto y legado, Recursos

### En la web Next.js (estado)
- **Home** ✅
- **Carrera Espacial** ✅ con subpáginas:
  - contexto histórico, avances tecnológicos bélicos, programa soviético, programa estadounidense
- **Misión Apollo XI** ✅ con subpáginas:
  - Saturn V, Módulo Eagle, Alunizaje
- **Protagonistas** ✅ (4 perfiles)
- **Cronología** ✅ (1957–1975)
- **Impacto y legado** ❌ pendiente
- **Recursos y bibliografía** ❌ pendiente

## 6) Convenciones (documento) vs look & feel actual

### Documento
- Diseño sencillo y legible, tipografía sans-serif, buen contraste, fondo claro sugerido.

### Implementación actual
- Diseño moderno “space theme” (fondo oscuro + acentos).
- Tokens de color se definen en `src/app/globals.css` y se aplican vía utilidades (ej. `bg-background`, `bg-surface`, `text-muted`).

## 7) Licencias (documento)

### Documento
- Textos propios bajo **CC BY-SA**.
- Imágenes preferentes de NASA/dominio público o CC con créditos.

### Estado actual
- ❌ Aún no hay una página/nota de licencia y créditos de imágenes.

## 8) Búsqueda y resultados (documento)

### Documento
- Buscar por títulos/texto, lista de resultados con snippet.

### Estado actual
- ❌ Pendiente. (Recomendación: búsqueda client-side simple sobre índice de MDX/JSON, sin backend.)

## Recomendaciones inmediatas (siguiente paso)
- Añadir tabs y contenido para:
  - **Impacto y legado** ✅ (implementado)
  - **Recursos y bibliografía** ✅ (implementado)
- Definir “metadatos académicos” por MDX (frontmatter):
  - `author`, `created_at`, `updated_at`, `section`, `type`, `tags`
- Implementar **tags** + página de tags (listado y filtrado). ✅ (implementado: `/[locale]/tags`)
- Implementar **búsqueda** (UI + índice local) y mostrar resultados con snippet. ✅ (implementado: `/[locale]/buscar`)

## Nota de seguridad (importante)
El documento incluye credenciales de un hosting/DB de Drupal. **No deben subirse al repositorio** ni compartirse públicamente. Recomendación: **rotarlas** en el proveedor si siguen activas.


