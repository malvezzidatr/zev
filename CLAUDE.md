# Zev Design System - Contexto de Desenvolvimento

## Regra Principal

**Todo componente novo DEVE ter uma story no Storybook.** Não considere um componente completo sem sua respectiva story.

## Checklist para Novo Componente

Ao criar um novo componente, siga TODOS os passos abaixo:

### 1. Core (packages/core)

- [ ] Criar pasta `packages/core/src/components/{nome}/`
- [ ] Criar `zev-{nome}.styles.ts` com estilos usando tokens semânticos (`--zev-color-bg-primary`, `--zev-color-text-primary`, etc.)
- [ ] Criar `zev-{nome}.ts` com a classe do componente estendendo `ZevBase`
- [ ] Registrar com `@customElement('zev-{nome}')`
- [ ] Declarar no `HTMLElementTagNameMap`
- [ ] Exportar em `packages/core/src/index.ts`

### 2. React Wrapper (packages/react)

- [ ] Criar `packages/react/src/components/Zev{Nome}.ts`
- [ ] Usar `createComponent` do `@lit/react`
- [ ] Mapear eventos custom para props React (`onEventName`)
- [ ] Exportar em `packages/react/src/index.ts`

### 3. Storybook (apps/storybook)

- [ ] Criar `apps/storybook/src/stories/{Nome}.stories.ts`
- [ ] Incluir JSDoc com descrição, características e eventos
- [ ] Usar `tags: ['autodocs']` para gerar documentação automática
- [ ] Definir `argTypes` para todos os props com controls
- [ ] Criar story `Default` com args padrão
- [ ] Criar variações relevantes (estados, contextos de uso)
- [ ] Usar `action()` para logar eventos no painel Actions

### 4. Build e Verificação

- [ ] Rodar `npm run build` na raiz e garantir zero erros
- [ ] Atualizar links globais se necessário (`npm link` nos pacotes)

## Padrões do Projeto

### Estrutura de Componente

```typescript
// zev-{nome}.ts
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-{nome}.styles.js';

@customElement('zev-{nome}')
export class Zev{Nome} extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property() myProp = '';

  render() {
    return html`...`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-{nome}': Zev{Nome};
  }
}
```

### Estrutura de Estilos

```typescript
// zev-{nome}.styles.ts
import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }
  /* Usar tokens semânticos, NUNCA cores literais */
  /* --zev-color-bg-primary, --zev-color-text-primary, --zev-color-accent, etc. */
`;
```

### Estrutura React Wrapper

```typescript
// Zev{Nome}.ts
import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { Zev{Nome} as Zev{Nome}Element } from '@zev/core';

export const Zev{Nome} = createComponent({
  tagName: 'zev-{nome}',
  elementClass: Zev{Nome}Element,
  react: React,
  events: {
    onEventName: 'event-name' as EventName<CustomEvent<{ ... }>>,
  },
});
```

### Estrutura Story

```typescript
// {Nome}.stories.ts
import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@zev/core';

/**
 * ## zev-{nome}
 *
 * Descrição do componente.
 *
 * ### Características
 * - ...
 *
 * ### Eventos
 * - `event-name`: Descrição
 */
export default {
  title: 'Components/{Nome}',
  component: 'zev-{nome}',
  tags: ['autodocs'],
  argTypes: { ... },
};

export const Default = {
  args: { ... },
  render: (args: any) => html`<zev-{nome} ...></zev-{nome}>`,
};
```

## Tokens de Cor (Dark Mode)

Sempre usar tokens semânticos nos estilos. Nunca hardcodar cores.

| Uso | Token |
|-----|-------|
| Fundo principal | `--zev-color-bg-primary` |
| Fundo secundário | `--zev-color-bg-secondary` |
| Texto principal | `--zev-color-text-primary` |
| Texto secundário | `--zev-color-text-secondary` |
| Cor de destaque | `--zev-color-accent` |
| Fundo de card | `--zev-color-card-default` |
| Borda sutil | `--zev-color-border-tag` |
| Fundo navbar | `--zev-color-navbar-bg` |

## Eventos

- Usar `this.emitEvent('nome-do-evento', detail)` (via ZevBase)
- Eventos sempre com `bubbles: true` e `composed: true`
- Nomes em kebab-case: `theme-change`, `cta-click`, `card-click`

## Build

```bash
npm run build        # Compila tokens → core → react (Turborepo)
npm run storybook    # Dev server em localhost:6006
npm run clean        # Remove dist/ e storybook-static/
```
