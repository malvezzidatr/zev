import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-button
 *
 * Componente de botão com múltiplas variantes e tamanhos.
 *
 * ### Características
 * - 3 variantes: primary, secondary, ghost
 * - 3 tamanhos: sm, md, lg
 * - Estado disabled
 * - Suporta conteúdo via slot
 *
 * ### Eventos
 * - `button-click`: Disparado ao clicar, com `{ variant }` no detail
 */
export default {
  title: 'Components/Button',
  component: 'zev-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'Variante visual do botão',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Se o botão está desabilitado',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export const Default = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-button
        variant=${args.variant}
        size=${args.size}
        ?disabled=${args.disabled}
        @button-click=${(e: CustomEvent) => action('button-click')(e.detail)}
      >
        Click me
      </zev-button>
    </div>
  `,
};

export const Variants = {
  name: 'Variantes',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; flex-wrap: wrap;">
      <zev-button variant="primary" @button-click=${(e: CustomEvent) => action('button-click')(e.detail)}>
        Primary
      </zev-button>
      <zev-button variant="secondary" @button-click=${(e: CustomEvent) => action('button-click')(e.detail)}>
        Secondary
      </zev-button>
      <zev-button variant="ghost" @button-click=${(e: CustomEvent) => action('button-click')(e.detail)}>
        Ghost
      </zev-button>
    </div>
  `,
};

export const Sizes = {
  name: 'Tamanhos',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <zev-button size="sm">Small</zev-button>
      <zev-button size="md">Medium</zev-button>
      <zev-button size="lg">Large</zev-button>
    </div>
  `,
};

export const Disabled = {
  name: 'Desabilitado',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; flex-wrap: wrap;">
      <zev-button variant="primary" disabled>Primary Disabled</zev-button>
      <zev-button variant="secondary" disabled>Secondary Disabled</zev-button>
      <zev-button variant="ghost" disabled>Ghost Disabled</zev-button>
    </div>
  `,
};

export const AllCombinations = {
  name: 'Todas as Combinações',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 1rem; align-items: center; justify-items: start;">
        <!-- Headers -->
        <div style="font-family: var(--zev-font-primary); font-weight: bold; color: var(--zev-color-text-secondary);">Small</div>
        <div style="font-family: var(--zev-font-primary); font-weight: bold; color: var(--zev-color-text-secondary);">Medium</div>
        <div style="font-family: var(--zev-font-primary); font-weight: bold; color: var(--zev-color-text-secondary);">Large</div>

        <!-- Primary -->
        <zev-button variant="primary" size="sm">Primary</zev-button>
        <zev-button variant="primary" size="md">Primary</zev-button>
        <zev-button variant="primary" size="lg">Primary</zev-button>

        <!-- Secondary -->
        <zev-button variant="secondary" size="sm">Secondary</zev-button>
        <zev-button variant="secondary" size="md">Secondary</zev-button>
        <zev-button variant="secondary" size="lg">Secondary</zev-button>

        <!-- Ghost -->
        <zev-button variant="ghost" size="sm">Ghost</zev-button>
        <zev-button variant="ghost" size="md">Ghost</zev-button>
        <zev-button variant="ghost" size="lg">Ghost</zev-button>
      </div>
    </div>
  `,
};
