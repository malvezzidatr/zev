# Plano: Dark Mode via prefers-color-scheme

## Resumo

Adicionar suporte a dark mode automático (segue preferência do SO) usando `@media (prefers-color-scheme: dark)` nos tokens CSS. Os componentes já usam CSS custom properties, então a troca será automática.

## Abordagem: Tokens Semânticos

O sistema atual usa nomes literais (`--zev-color-white`, `--zev-color-black`). Para dark mode funcionar corretamente, vamos adicionar **tokens semânticos** que mapeiam para os literais e são overridden no dark mode:

```css
/* Semânticos - usados pelos componentes */
--zev-color-bg-primary: var(--zev-color-white);
--zev-color-bg-secondary: var(--zev-color-gray);
--zev-color-bg-inverse: var(--zev-color-black);
--zev-color-text-primary: var(--zev-color-black);
--zev-color-text-secondary: var(--zev-color-gray-dark);
--zev-color-text-inverse: var(--zev-color-white);
--zev-color-accent: var(--zev-color-blue);
```

No dark mode, esses semânticos apontam para valores invertidos.

## Arquivos a Modificar

### 1. `packages/tokens/src/css/tokens.css`
- Adicionar tokens semânticos no `:root`
- Adicionar bloco `@media (prefers-color-scheme: dark)` com overrides

### 2. `packages/tokens/src/colors.ts`
- Adicionar exports dos tokens semânticos (light + dark)

### 3. `packages/tokens/src/index.ts`
- Re-exportar novos tipos se necessário

### 4. Estilos dos componentes (7 arquivos):
- `packages/core/src/components/navbar/zev-navbar.styles.ts`
- `packages/core/src/components/hero/zev-hero.styles.ts`
- `packages/core/src/components/about/zev-about.styles.ts`
- `packages/core/src/components/project-card/zev-project-card.styles.ts`
- `packages/core/src/components/project-detail/zev-project-detail.styles.ts`
- `packages/core/src/components/call-to-action/zev-call-to-action.styles.ts`
- `packages/core/src/components/footer/zev-footer.styles.ts`

### 5. `packages/core/src/base/shared-styles.ts`
- Atualizar section styles para usar tokens semânticos

## Mapeamento de Tokens (Light → Dark)

| Token Semântico | Light (padrão) | Dark |
|-----------------|----------------|------|
| `--zev-color-bg-primary` | #FFFFFF | #0A0A0A |
| `--zev-color-bg-secondary` | #F5F5F5 | #1A1A1A |
| `--zev-color-bg-inverse` | #0A0A0A | #141414 |
| `--zev-color-text-primary` | #0A0A0A | #F5F5F5 |
| `--zev-color-text-secondary` | #888888 | #AAAAAA |
| `--zev-color-text-inverse` | #FFFFFF | #F5F5F5 |
| `--zev-color-accent` | #0000FF | #4D4DFF |
| `--zev-color-navbar-bg` | rgba(255,255,255,0.95) | rgba(10,10,10,0.95) |
| `--zev-color-card-default` | rgba(255,255,255,0.08) | rgba(255,255,255,0.06) |
| `--zev-color-card-hover` | rgba(255,255,255,0.15) | rgba(255,255,255,0.12) |
| `--zev-color-border-tag` | #e0e0e0 | #333333 |
| `--zev-color-text-modal-content` | #444 | #DDD |
| `--zev-color-text-modal-secondary` | #555 | #BBB |
| `--zev-color-modal-overlay` | rgba(0,0,0,0.85) | rgba(0,0,0,0.9) |

## Mudanças por Componente

### Navbar
- Background: usar `--zev-color-navbar-bg` (já usa, será overridden)
- Texto/logo: `--zev-color-black` → `--zev-color-text-primary`
- Mobile menu bg: `--zev-color-white` → `--zev-color-bg-primary`

### Hero
- Background: `--zev-color-white` → `--zev-color-bg-primary`
- Nome/texto: `--zev-color-black` → `--zev-color-text-primary`
- Tags: `--zev-color-blue` → `--zev-color-accent`
- Texto secundário: `--zev-color-gray-dark` → `--zev-color-text-secondary`

### About
- Background: `--zev-color-gray` → `--zev-color-bg-secondary`
- Texto: `--zev-color-gray-dark` → `--zev-color-text-secondary`
- Tags border: `--zev-color-border-tag` (já será overridden)
- Timeline dots: `--zev-color-blue` → `--zev-color-accent`

### Project Card
- Cards: `--zev-color-card-default/hover` (já será overridden)
- Texto: `--zev-color-white` → `--zev-color-text-inverse` (continua claro pois o fundo é azul)

### Project Detail (Modal)
- Overlay: `--zev-color-modal-overlay` (já será overridden)
- Content bg: hardcoded white → `--zev-color-bg-primary`
- Texto: `--zev-color-text-modal-content/secondary` (já será overridden)

### Call to Action
- Background: herda → `--zev-color-bg-primary`
- Texto: `--zev-color-black` → `--zev-color-text-primary`
- Botão: preto→azul no hover mantém lógica mas usa tokens semânticos

### Footer
- Background: `--zev-color-black` → `--zev-color-bg-inverse`
- Texto: `--zev-color-white` → `--zev-color-text-inverse`
- Border: `--zev-color-border-subtle` (mantém)

## Verificação

1. `npm run build` — compilar sem erros
2. `npm run storybook` — visualizar componentes
3. Alternar preferência de cor no OS/DevTools para validar a troca
4. Verificar contraste e legibilidade em ambos os modos
