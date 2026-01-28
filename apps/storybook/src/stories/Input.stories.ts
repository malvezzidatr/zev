import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-input
 *
 * Componente de input de texto com ícone opcional.
 *
 * ### Características
 * - Ícones opcionais: search, filter
 * - Suporte a placeholder
 * - Estado disabled
 * - Emite evento input-change ao digitar
 *
 * ### Eventos
 * - `input-change`: Disparado ao digitar, com `{ value }` no detail
 */
export default {
  title: 'Components/Input',
  component: 'zev-input',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
      table: { defaultValue: { summary: '' } },
    },
    value: {
      control: 'text',
      description: 'Valor do input',
      table: { defaultValue: { summary: '' } },
    },
    icon: {
      control: { type: 'select' },
      options: ['none', 'search', 'filter'],
      description: 'Ícone exibido',
      table: { defaultValue: { summary: 'none' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Se o input está desabilitado',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Digite algo...',
    value: '',
    icon: 'none',
    disabled: false,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-input
        placeholder=${args.placeholder}
        value=${args.value}
        icon=${args.icon}
        ?disabled=${args.disabled}
        @input-change=${(e: CustomEvent) => action('input-change')(e.detail)}
      ></zev-input>
    </div>
  `,
};

export const WithSearchIcon = {
  name: 'Com Ícone de Busca',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-input
        placeholder="Buscar vagas..."
        icon="search"
        @input-change=${(e: CustomEvent) => action('input-change')(e.detail)}
      ></zev-input>
    </div>
  `,
};

export const WithFilterIcon = {
  name: 'Com Ícone de Filtro',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-input
        placeholder="Filtrar resultados..."
        icon="filter"
        @input-change=${(e: CustomEvent) => action('input-change')(e.detail)}
      ></zev-input>
    </div>
  `,
};

export const Disabled = {
  name: 'Desabilitado',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-input
        placeholder="Input desabilitado"
        value="Valor existente"
        disabled
      ></zev-input>
    </div>
  `,
};

export const SearchFilter = {
  name: 'Filtro de Busca',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <div style="
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 600px;
        padding: 1.5rem;
        border: 1px solid var(--zev-color-border-tag);
        border-radius: 8px;
      ">
        <h3 style="margin: 0; font-family: var(--zev-font-primary); color: var(--zev-color-text-primary);">
          Filtros
        </h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <zev-input
            placeholder="Buscar por título..."
            icon="search"
            style="flex: 1; min-width: 200px;"
            @input-change=${(e: CustomEvent) => action('search')(e.detail)}
          ></zev-input>
          <zev-input
            placeholder="Filtrar por local..."
            icon="filter"
            style="flex: 1; min-width: 200px;"
            @input-change=${(e: CustomEvent) => action('filter')(e.detail)}
          ></zev-input>
        </div>
      </div>
    </div>
  `,
};
