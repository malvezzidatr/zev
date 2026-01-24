# Design System - Caio Malvezzi Portfolio

## 1. Design Tokens

### 1.1 Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-white` | `#FFFFFF` | Background principal, texto em superfícies escuras |
| `--color-black` | `#0A0A0A` | Texto principal, botões primários, footer background |
| `--color-blue` | `#0000FF` | Cor de destaque/acento, seção de projetos, hover states, tags |
| `--color-gray` | `#F5F5F5` | Background secundário (seção About) |
| `--color-gray-dark` | `#888888` | Texto secundário, subtítulos, metadados |

**Cores derivadas (não tokenizadas):**
- `rgba(255, 255, 255, 0.08)` - Cards sobre fundo azul (estado padrão)
- `rgba(255, 255, 255, 0.15)` - Cards sobre fundo azul (hover) e bordas
- `rgba(255, 255, 255, 0.95)` - Navbar background (com blur)
- `rgba(0, 0, 0, 0.85)` - Overlay do modal
- `rgba(255, 255, 255, 0.1)` - Bordas sutis sobre fundo escuro
- `#e0e0e0` - Bordas de tags e separadores
- `#444` / `#555` - Texto de conteúdo no modal

### 1.2 Tipografia

**Fonte:** Inter (Google Fonts) - pesos 400, 700, 900

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-primary` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` | Fonte única do sistema |
| `--fs-display` | `clamp(3rem, 15vw, 12rem)` | Nome do hero, texto decorativo |
| `--fs-heading` | `clamp(2rem, 5vw, 4.5rem)` | Títulos de seção |
| `--fs-subheading` | `clamp(1.25rem, 2.5vw, 2rem)` | Subtítulos, heading do footer |
| `--fs-body` | `clamp(1rem, 1.2vw, 1.125rem)` | Texto de parágrafo |
| `--fs-small` | `0.875rem` | Labels, tags, metadados |
| `--fs-nav` | `0.85rem` | Links de navegação |

| Token | Valor | Uso |
|-------|-------|-----|
| `--fw-regular` | `400` | Texto de corpo |
| `--fw-bold` | `700` | Labels, links, tags |
| `--fw-black` | `900` | Títulos, logo, headings |

**Padrões tipográficos:**
- `letter-spacing: -0.02em` a `-0.03em` - Títulos grandes (display/heading)
- `letter-spacing: 0.05em` a `0.15em` - Labels, tags, metadados (uppercase)
- `line-height: 0.85` - Display text (nome gigante)
- `line-height: 1.0` - Headings de seção
- `line-height: 1.6` a `1.9` - Corpo de texto
- `text-transform: uppercase` - Títulos, labels, tags, botões

### 1.3 Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `--spacing-section` | `clamp(4rem, 10vh, 8rem)` | Padding vertical de seções |
| `--spacing-container` | `clamp(1.5rem, 5vw, 6rem)` | Padding horizontal (gutters) |

**Padrões de espaçamento recorrentes:**
- Container max-width: `1400px` com `margin: 0 auto`
- Gap de grids: `4rem` (desktop), `3rem` (mobile)
- Gap entre tags: `0.5rem`
- Gap de header (tag + label): `1.5rem`
- Margin-bottom de headers: `1rem` a `4rem`

### 1.4 Transições e Animações

| Token | Valor | Uso |
|-------|-------|-----|
| `--transition-base` | `0.3s ease` | Todas as transições padrão |

**Keyframes:**
- `bounce` - Scroll indicator (translateY 0→8px, 2s infinite)
- `fadeIn` - Modal overlay (opacity 0→1, 0.3s)
- `slideUp` - Modal content (translateY 30px→0 + opacity, 0.4s)

### 1.5 Z-index

| Valor | Elemento |
|-------|----------|
| `1000` | Navbar |
| `2000` | Modal overlay (ProjectDetail) |

### 1.6 Breakpoints

| Breakpoint | Uso |
|------------|-----|
| `768px` | Mobile - grids colapsam, hamburger menu aparece |

---

## 2. Layout

### 2.1 Container Pattern
Todos os componentes seguem:
```css
.component__container {
  max-width: 1400px;
  margin: 0 auto;
}
```
Com padding externo via `--spacing-container` na seção pai.

### 2.2 Section Pattern
```css
.section {
  padding: var(--spacing-section) var(--spacing-container);
}
```

### 2.3 Grid Patterns
- **2 colunas iguais:** `grid-template-columns: 1fr 1fr` (About, Footer)
- **Auto-fit responsivo:** `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` (Projects)
- Todas colapsam para `1fr` em mobile (768px)

### 2.4 Section Header Pattern
```css
.section__header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
```
Com `[0X]` tag em azul + label em uppercase.

---

## 3. Componentes

### 3.1 Navbar
**Anatomia:** Logo | [Lang Toggle] [Links] [Hamburger (mobile)]
- **Posição:** Fixed, top 0, full-width
- **Background:** `rgba(255, 255, 255, 0.95)` + `backdrop-filter: blur(10px)`
- **Logo:** Iniciais "CM", peso 900
- **Lang Toggle:** Botão com borda 2px, hover muda para azul
- **Links:** Uppercase, bold, underline animado no hover (barra azul)
- **Hamburger:** 3 spans que animam para X quando ativo
- **Mobile menu:** Slide-in da direita, 70% width, position fixed

### 3.2 Hero
**Anatomia:** Label [tag + texto + ano] | Nome (display) | Info [subtitle + CTA]
- **Full-height:** `min-height: 100vh`, flex column center
- **Nome:** Font-size display (~15vw), peso 900, uppercase, line-height 0.85
- **CTA:** Inline-flex, uppercase, border-bottom 2px, arrow anima no hover
- **Scroll indicator:** Absoluto bottom, bounce animation

### 3.3 About
**Anatomia:** Header [tag + título] | Grid [Bio + Skills | Timeline]
- **Background:** `--color-gray` (#F5F5F5)
- **Bio:** Parágrafos com line-height 1.8, cor cinza
- **Skills:** Flex-wrap tags com borda, hover muda para azul
- **Timeline:** Items com dot azul (10x10px) + conteúdo

### 3.4 ProjectCard
**Anatomia:** Header [número + role badge] | Título | Descrição | Tech tags
- **Background:** `rgba(255, 255, 255, 0.08)` com borda translúcida
- **Hover:** Background 0.15, translateY(-4px)
- **Role badge:** Font 0.7rem, uppercase, borda translúcida
- **Tech tags:** Font 0.75rem, bold, borda translúcida
- **Cursor:** pointer (abre modal)

### 3.5 ProjectDetail (Modal)
**Anatomia:** Close button | Header [número + role] | Título | Tech tags | Descrição | Highlights
- **Overlay:** Fixed fullscreen, rgba(0,0,0,0.85), fadeIn
- **Modal:** max-width 700px, max-height 85vh, overflow-y auto, slideUp
- **Close:** SVG X, rotate 90deg no hover
- **Tech tags:** Background azul sólido (diferente dos cards)
- **Highlights:** Lista com bullets quadrados azuis (8x8px)
- **Fecha:** ESC, click outside, botão X
- **Body lock:** `overflow: hidden` quando aberto

### 3.6 CallToAction
**Anatomia:** Label [tag + texto] | Heading | Texto | Botão
- **Background:** Branco
- **Heading:** fs-heading, peso 900, uppercase
- **Botão primário:** Background preto, texto branco, uppercase, hover muda para azul

### 3.7 Footer
**Anatomia:** Grid [Contact links | Info] | Bottom [nome decorativo + copyright]
- **Background:** `--color-black`
- **Texto:** Branco com opacidades variadas (0.4 a 0.8)
- **Links:** Opacity 0.8, hover → 1 + cor azul
- **Info labels:** Font 0.75rem, opacity 0.5, uppercase
- **Nome decorativo:** clamp(2.5rem, 10vw, 8rem), opacity 0.05, absolute
- **Bottom border:** 1px solid rgba(255,255,255,0.1)

---

## 4. Padrões de Interação

### 4.1 Hover States
| Elemento | Efeito |
|----------|--------|
| Links de nav | Underline azul cresce da esquerda (width 0→100%) |
| CTA link | Cor azul + border azul + arrow translada 4px |
| Skill tags | Background azul + texto branco + border azul |
| Project cards | Background mais claro + translateY(-4px) |
| Botão primário | Background preto → azul |
| Footer links | Opacity 0.8→1 + cor azul |
| Lang toggle | Background azul + border azul + texto branco |
| Close button | Cor escura + rotate 90deg |
| Botão CTA arrow | translateX(4px) |

### 4.2 Padrão de Hover Arrow
Usado em CTA links e botões - o arrow (`→`) translada 4px para a direita.

### 4.3 Focus States
Não definidos explicitamente (usar padrão do browser ou adicionar).

---

## 5. Padrões de Nomenclatura

### 5.1 CSS - BEM
```
.block
.block__element
.block__element--modifier
```
Exemplos:
- `.navbar__links`
- `.project-card__tech-tag`
- `.project-detail__highlights-title`
- `.about__timeline-item`

### 5.2 Componentes React
- PascalCase para componentes: `ProjectCard`, `ProjectDetail`, `CallToAction`
- Estrutura de pasta: `ComponentName/ComponentName.jsx` + `ComponentName.css`
- Hook customizado: `useLanguage()`
- Context pattern: `LanguageContext` + `LanguageProvider`

### 5.3 Tags de Seção
Padrão `[0X]` para numerar seções:
- `[01]` - Hero (Portfolio)
- `[02]` - About
- `[03]` - Projects
- `[04]` - CTA

---

## 6. Responsividade

### 6.1 Estratégia
- **Fluid Typography:** `clamp()` para todos os tamanhos de fonte escaláveis
- **Fluid Spacing:** `clamp()` para paddings de seção e container
- **Breakpoint único:** `768px` para colapsar grids e ativar mobile nav
- **Mobile-specific:** Hero name font-size override para `clamp(3rem, 18vw, 8rem)`

### 6.2 Mobile Adaptations
- Grids 2-col → 1-col
- Navbar links → slide-in panel da direita
- Hero info → flex column
- Modal → align-items: flex-end (sobe de baixo)
- Modal padding reduzido

---

## 7. Internacionalização (i18n)

### 7.1 Arquitetura
- `LanguageContext` com React Context API
- `translations.js` com objeto `{ pt: {...}, en: {...} }`
- Toggle via `useLanguage()` hook que retorna `{ lang, t, toggleLang }`
- Todos os textos vêm de `t.section.key`
- Dados dinâmicos (projetos, experiência) também são traduzidos

### 7.2 Idiomas
- Português (padrão): `lang: 'pt'`
- Inglês: `lang: 'en'`

---

## 8. Inventário de Superfícies

| Superfície | Background | Texto | Accent |
|------------|-----------|-------|--------|
| Hero | Branco | Preto | Azul (tag) |
| About | Cinza (#F5F5F5) | Preto + Cinza escuro | Azul (dots, tag hover) |
| Projects | Azul (#0000FF) | Branco | Branco (translúcido) |
| CTA | Branco | Preto | Preto→Azul (botão) |
| Footer | Preto (#0A0A0A) | Branco (opacidades) | Azul (hover) |
| Modal | Branco | Preto + Cinza | Azul (tags, bullets) |
| Navbar | Branco (95% opacity) | Preto | Azul (underline, lang hover) |

---

## 9. Dependências Externas

- **Google Fonts:** Inter (400, 700, 900)
- **React 19** + Vite 6
- **Sem bibliotecas de UI** - CSS puro
- **Sem ícones de biblioteca** - SVGs inline e entidades HTML (`→`, `↓`)
