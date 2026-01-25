# Zev Design System

Design system construído com **Web Components (Lit)** e wrappers para **React**.

## Estrutura

```
zev/
├── packages/
│   ├── tokens/       @zev/tokens   – Design tokens (CSS + TS)
│   ├── core/         @zev/core     – Web Components com Lit
│   └── react/        @zev/react    – Wrappers React (@lit/react)
└── apps/
    └── storybook/    Preview e documentação visual
```

## Stack

- **Monorepo:** Turborepo + npm workspaces
- **Web Components:** Lit 3
- **React wrappers:** @lit/react `createComponent`
- **Build:** TypeScript (tsc), sem bundler
- **Preview:** Storybook 8 (web-components-vite)
- **Linguagem:** TypeScript

## Comandos

```bash
npm install          # Instala todas as dependências
npm run build        # Compila todos os pacotes
npm run storybook    # Abre Storybook em localhost:6006
npm run clean        # Remove artefatos de build
```

## Pacotes

### @zev/tokens

Design tokens como CSS custom properties e constantes TypeScript.

**CSS (importar no app):**
```css
@import '@zev/tokens/css';
```

**TypeScript:**
```ts
import { colors, fontSize, spacing } from '@zev/tokens';
```

**Tokens disponíveis:**

| Categoria | Prefixo | Exemplo |
|-----------|---------|---------|
| Cores | `--zev-color-*` | `--zev-color-blue`, `--zev-color-black` |
| Tipografia | `--zev-fs-*`, `--zev-fw-*` | `--zev-fs-heading`, `--zev-fw-black` |
| Espaçamento | `--zev-spacing-*`, `--zev-gap-*` | `--zev-spacing-section` |
| Transições | `--zev-transition-*` | `--zev-transition-base` |
| Z-index | `--zev-z-*` | `--zev-z-navbar`, `--zev-z-modal` |

### @zev/core

7 Web Components registrados como custom elements com prefixo `zev-`.

| Componente | Tag | Descrição |
|------------|-----|-----------|
| Navbar | `<zev-navbar>` | Barra fixa com blur, links, lang toggle, menu mobile |
| Hero | `<zev-hero>` | Seção full-height com nome display e CTA |
| About | `<zev-about>` | Bio, skills com tags, timeline |
| ProjectCard | `<zev-project-card>` | Card translúcido para listagem de projetos |
| ProjectDetail | `<zev-project-detail>` | Modal com overlay, animações, ESC para fechar |
| CallToAction | `<zev-call-to-action>` | Heading + botão primário |
| Footer | `<zev-footer>` | Links, info, nome decorativo |

### @zev/react

Wrappers React com eventos tipados para cada componente.

| Componente React | Eventos |
|-----------------|---------|
| `ZevNavbar` | `onLangToggle`, `onNavClick` |
| `ZevHero` | `onCtaClick` |
| `ZevAbout` | — |
| `ZevProjectCard` | `onCardClick` |
| `ZevProjectDetail` | `onClose` |
| `ZevCallToAction` | `onCtaClick` |
| `ZevFooter` | — |

## Uso

### React

```tsx
import '@zev/tokens/css';
import { ZevNavbar, ZevHero, ZevProjectCard } from '@zev/react';

function App() {
  return (
    <>
      <ZevNavbar
        logo="CM"
        lang="pt"
        langLabel="EN"
        links={[
          { label: 'About', href: '#about' },
          { label: 'Projects', href: '#projects' },
        ]}
        onLangToggle={(e) => console.log(e.detail.lang)}
        onNavClick={(e) => console.log(e.detail.link)}
      />

      <ZevHero
        tag="[01]"
        label="Portfolio"
        year="2024"
        name="CAIO MALVEZZI"
        subtitle="Frontend Developer"
        ctaText="See my work"
        ctaHref="#projects"
        onCtaClick={(e) => console.log(e.detail.href)}
      />

      <ZevProjectCard
        number="01"
        role="Lead Developer"
        title="Design System"
        description="Component library built with Lit"
        techTags={['Lit', 'TypeScript', 'CSS']}
        onCardClick={(e) => console.log(e.detail)}
      />
    </>
  );
}
```

### Vanilla HTML

```html
<link rel="stylesheet" href="node_modules/@zev/tokens/src/css/tokens.css">
<script type="module" src="node_modules/@zev/core/dist/index.js"></script>

<zev-navbar logo="CM" lang-label="EN"></zev-navbar>

<zev-hero
  name="CAIO MALVEZZI"
  subtitle="Frontend Developer"
  cta-text="See my work"
></zev-hero>

<zev-call-to-action
  heading="Let's work together"
  button-text="Get in touch"
></zev-call-to-action>

<script>
  // Passar dados complexos via JavaScript
  const navbar = document.querySelector('zev-navbar');
  navbar.links = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
  ];

  // Ouvir eventos
  navbar.addEventListener('lang-toggle', (e) => {
    console.log('Novo idioma:', e.detail.lang);
  });
</script>
```

## Componentes — API

### zev-navbar

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `logo` | `string` | `'CM'` | Texto do logo |
| `links` | `NavLink[]` | `[]` | Links de navegação |
| `lang` | `string` | `'pt'` | Idioma atual |
| `lang-label` | `string` | `'EN'` | Label do toggle de idioma |

| Evento | Detail | Descrição |
|--------|--------|-----------|
| `lang-toggle` | `{ lang: string }` | Toggle de idioma clicado |
| `nav-click` | `{ link: NavLink }` | Link de navegação clicado |

### zev-hero

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `tag` | `string` | `'[01]'` | Tag da seção |
| `label` | `string` | `''` | Label acima do nome |
| `year` | `string` | `''` | Ano exibido no label |
| `name` | `string` | `''` | Nome em display |
| `subtitle` | `string` | `''` | Subtítulo |
| `cta-text` | `string` | `''` | Texto do CTA |
| `cta-href` | `string` | `'#'` | Href do CTA |

| Evento | Detail | Descrição |
|--------|--------|-----------|
| `cta-click` | `{ href: string }` | CTA clicado |

### zev-about

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `tag` | `string` | `'[02]'` | Tag da seção |
| `title` | `string` | `''` | Título da seção |
| `bio` | `string` | `''` | Texto bio (\\n separa parágrafos) |
| `skills` | `string[]` | `[]` | Lista de skills |
| `timeline` | `TimelineItem[]` | `[]` | Items do timeline |

### zev-project-card

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `number` | `string` | `''` | Número do projeto |
| `role` | `string` | `''` | Role/cargo badge |
| `title` | `string` | `''` | Título do projeto |
| `description` | `string` | `''` | Descrição curta |
| `tech-tags` | `string[]` | `[]` | Tags de tecnologia |

| Evento | Detail | Descrição |
|--------|--------|-----------|
| `card-click` | `{ number, title }` | Card clicado |

### zev-project-detail

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `open` | `boolean` | `false` | Controla visibilidade do modal |
| `project` | `ProjectData` | `null` | Dados do projeto |

| Evento | Detail | Descrição |
|--------|--------|-----------|
| `close` | — | Fechar solicitado (ESC, click fora, botão X) |

### zev-call-to-action

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `tag` | `string` | `'[04]'` | Tag da seção |
| `label` | `string` | `''` | Label do header |
| `heading` | `string` | `''` | Título principal |
| `description` | `string` | `''` | Texto descritivo |
| `button-text` | `string` | `''` | Texto do botão |
| `button-href` | `string` | `'#'` | Href do botão |

| Evento | Detail | Descrição |
|--------|--------|-----------|
| `cta-click` | `{ href: string }` | Botão clicado |

### zev-footer

| Propriedade | Tipo | Default | Descrição |
|-------------|------|---------|-----------|
| `heading` | `string` | `''` | Título da seção de contato |
| `links` | `FooterLink[]` | `[]` | Links de contato |
| `info` | `FooterInfo[]` | `[]` | Items de informação |
| `decorative-name` | `string` | `''` | Nome decorativo grande |
| `copyright` | `string` | `''` | Texto de copyright |

## Types

```ts
interface NavLink {
  label: string;
  href: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface ProjectData {
  number: string;
  role: string;
  title: string;
  description: string;
  techTags: string[];
  highlights: string[];
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterInfo {
  label: string;
  value: string;
}
```

## Arquitetura

### Base class

Todos os componentes estendem `ZevBase` (que estende `LitElement`):

- Shared styles (box-sizing reset, font-family)
- Helper `emitEvent()` com `bubbles: true` e `composed: true`
- Getter `isMobile` para queries responsivas

### Tokens no Shadow DOM

CSS custom properties (`--zev-*`) atravessam shadow DOM boundaries naturalmente. Basta incluir `tokens.css` no documento host e todos os componentes herdam os valores.

### React wrappers

Cada wrapper usa `@lit/react` `createComponent` para:
- Mapear properties JS para o custom element
- Converter custom events para callbacks React (`onEventName`)
- Tipar os eventos com `EventName<CustomEvent<T>>`

### Build pipeline

```
@zev/tokens (tsc)
     ↓
@zev/core   (tsc, depende de tokens)
     ↓
@zev/react  (tsc, depende de core)
```

Turborepo gerencia a ordem via `dependsOn: ["^build"]`.

## Dark Mode

O dark mode é ativado automaticamente via `prefers-color-scheme` (preferência do SO). Também é possível forçar manualmente via atributo `data-theme`:

```ts
// Forçar dark
document.documentElement.setAttribute('data-theme', 'dark');

// Forçar light
document.documentElement.setAttribute('data-theme', 'light');

// Automático (segue SO)
document.documentElement.removeAttribute('data-theme');
```

**Tokens semânticos** usados pelos componentes:

| Token | Light | Dark |
|-------|-------|------|
| `--zev-color-bg-primary` | #FFFFFF | #0A0A0A |
| `--zev-color-bg-secondary` | #F5F5F5 | #1A1A1A |
| `--zev-color-text-primary` | #0A0A0A | #F5F5F5 |
| `--zev-color-text-secondary` | #888888 | #AAAAAA |
| `--zev-color-accent` | #0000FF | #4D4DFF |

No Storybook, use o toggle de tema no toolbar (ícone de espelho) para alternar entre Light, Dark e System.

## Uso local com npm link

Para testar os pacotes em outro projeto sem publicar no npm:

### 1. Build do design system

```bash
cd c:\Users\malve\Desktop\zev
npm run build
```

### 2. Registrar os pacotes globalmente

```bash
cd packages/tokens && npm link
cd ../core && npm link
cd ../react && npm link
```

Cada `npm link` cria um symlink global apontando para o pacote local.

### 3. Vincular no projeto consumidor

```bash
cd meu-projeto
npm link @zev/tokens @zev/core @zev/react
```

### 4. Usar normalmente

```tsx
// Os imports funcionam como se os pacotes estivessem instalados
import '@zev/tokens/css';
import { ZevNavbar, ZevHero } from '@zev/react';
```

### 5. Refletir mudanças

Quando alterar algo no design system:

```bash
cd c:\Users\malve\Desktop\zev
npm run build
```

O projeto consumidor reflete as mudanças automaticamente (é um symlink).

### 6. Desvincular

Quando não precisar mais do link:

```bash
# No projeto consumidor
npm unlink @zev/tokens @zev/core @zev/react

# Nos pacotes do design system (opcional)
cd packages/tokens && npm unlink
cd ../core && npm unlink
cd ../react && npm unlink
```

### Troubleshooting

| Problema | Solução |
|----------|---------|
| "Module not found" após link | Rode `npm run build` no zev antes de linkar |
| Duplicação de `lit` | Adicione `resolve.dedupe: ['lit']` no vite/webpack do consumidor |
| Link não funciona no Windows | Use terminal como Administrador para criar symlinks |
| Types não resolvem | Verifique que o `dist/` existe (rode build primeiro) |
