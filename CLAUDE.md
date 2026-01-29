# Zev Design System - Contexto de Desenvolvimento

## Regras Principais

1. **Todo componente novo DEVE ter uma story no Storybook.** Não considere um componente completo sem sua respectiva story.
2. **Todo componente novo DEVE ter testes unitários.** Não considere um componente completo sem seus respectivos testes.

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

### 3. Testes Unitários (packages/core)

- [ ] Criar `packages/core/src/__tests__/zev-{nome}.test.ts`
- [ ] Testar renderização do componente
- [ ] Testar todas as props
- [ ] Testar eventos emitidos
- [ ] Testar interações (click, hover, etc.)
- [ ] Rodar `npm run test` e garantir 100% dos testes passando

### 4. Storybook (apps/storybook)

- [ ] Criar `apps/storybook/src/stories/{Nome}.stories.ts`
- [ ] Incluir JSDoc com descrição, características e eventos
- [ ] Usar `tags: ['autodocs']` para gerar documentação automática
- [ ] Definir `argTypes` para todos os props com controls
- [ ] Criar story `Default` com args padrão
- [ ] Criar variações relevantes (estados, contextos de uso)
- [ ] Usar `action()` para logar eventos no painel Actions

### 5. Build e Verificação

- [ ] Rodar `npm run build` na raiz e garantir zero erros
- [ ] Rodar `npm run test` e garantir todos os testes passando
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

### Estrutura de Teste

```typescript
// zev-{nome}.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/{nome}/zev-{nome}.js';
import type { Zev{Nome} } from '../components/{nome}/zev-{nome}.js';

describe('zev-{nome}', () => {
  let element: Zev{Nome};

  beforeEach(async () => {
    element = fixture<Zev{Nome}>('zev-{nome}');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render prop correctly', async () => {
    element.myProp = 'value';
    await elementUpdated(element);

    const el = shadowQuery<HTMLElement>(element, '.my-class');
    expect(el?.textContent).toBe('value');
  });

  it('should emit event on interaction', async () => {
    const handler = vi.fn();
    element.addEventListener('event-name', handler);

    const button = shadowQuery<HTMLButtonElement>(element, 'button');
    button?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toHaveProperty('key', 'value');
  });
});
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

## Build e Testes

```bash
npm run build        # Compila tokens → core → react (Turborepo)
npm run test         # Roda testes unitários (Vitest)
npm run storybook    # Dev server em localhost:6006
npm run clean        # Remove dist/ e storybook-static/
```

### Testes no pacote core

```bash
cd packages/core
npm run test         # Roda testes uma vez
npm run test:watch   # Roda testes em modo watch
```

## Publicação (npm publish)

Ao publicar uma nova versão no npm, siga TODOS os passos:

1. [ ] Atualizar versão em `packages/tokens/package.json`
2. [ ] Atualizar versão em `packages/core/package.json` (e dependência do tokens)
3. [ ] Atualizar versão em `packages/react/package.json` (e dependência do core)
4. [ ] Atualizar `CHANGELOG.md` na raiz do projeto
5. [ ] **IMPORTANTE: Atualizar `apps/storybook/src/docs/Changelog.mdx`** (arquivo separado!)
6. [ ] Rodar `npm run build` e `npm run test`
7. [ ] Publicar na ordem: tokens → core → react
8. [ ] Commit e push para disparar deploy do Storybook

```bash
# Ordem de publicação
cd packages/tokens && npm publish --access public
cd ../core && npm publish --access public
cd ../react && npm publish --access public
```

> ⚠️ **Atenção:** O arquivo `Changelog.mdx` do Storybook é separado do `CHANGELOG.md` da raiz. Ambos devem ser atualizados para que o changelog apareça corretamente no Storybook publicado.
