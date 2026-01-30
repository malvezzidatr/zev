import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-input
 *
 * Componente de input de texto com floating label no estilo Material Design outlined.
 *
 * ### Características
 * - Floating label que sobe para a borda quando focado ou com valor
 * - Ícones opcionais: search, filter
 * - Botão X para limpar (aparece automaticamente quando há texto)
 * - Suporte a placeholder
 * - Estado disabled
 *
 * ### Eventos
 * - `input-change`: Disparado ao digitar ou limpar, com `{ value }` no detail
 * - `input-clear`: Disparado ao clicar no botão de limpar
 */
export default {
  title: 'Components/Input',
  component: 'zev-input',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Floating label (estilo outlined)',
      table: { defaultValue: { summary: '' } },
    },
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
    label: 'Label',
    placeholder: '',
    value: '',
    icon: 'none',
    disabled: false,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-input
        label=${args.label}
        placeholder=${args.placeholder}
        value=${args.value}
        icon=${args.icon}
        ?disabled=${args.disabled}
        @input-change=${(e: CustomEvent) => action('input-change')(e.detail)}
        @input-clear=${() => action('input-clear')()}
      ></zev-input>
    </div>
  `,
};

export const FloatingLabel = {
  name: 'Floating Label',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <p style="margin-bottom: 1rem; font-family: var(--zev-font-primary); color: var(--zev-color-text-secondary); font-size: 0.875rem;">
        Clique no campo para ver a label flutuar
      </p>
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <zev-input
          label="Email"
          @input-change=${(e: CustomEvent) => action('input-change')(e.detail)}
        ></zev-input>
        <zev-input
          label="Nome completo"
          value="João Silva"
          @input-change=${(e: CustomEvent) => action('input-change')(e.detail)}
        ></zev-input>
      </div>
    </div>
  `,
};

export const WithValue = {
  name: 'Com Valor',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-input
        label="Email"
        value="usuario@email.com"
        @input-change=${(e: CustomEvent) => action('input-change')(e.detail)}
        @input-clear=${() => action('input-clear')()}
      ></zev-input>
    </div>
  `,
};

export const WithSearchIcon = {
  name: 'Com Ícone de Busca',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-input
        label="Buscar"
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
        label="Filtrar"
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
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <zev-input
          label="Campo desabilitado"
          disabled
        ></zev-input>
        <zev-input
          label="Campo com valor"
          value="Valor existente"
          disabled
        ></zev-input>
      </div>
    </div>
  `,
};

export const JobFilters = {
  name: 'Filtros de Vagas',
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
          Busca de Vagas
        </h3>
        <zev-input
          label="Buscar vagas por título, empresa ou descrição..."
          icon="search"
          @input-change=${(e: CustomEvent) => action('search')(e.detail)}
          @input-clear=${() => action('search-clear')()}
        ></zev-input>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <zev-input
            label="Local"
            @input-change=${(e: CustomEvent) => action('local')(e.detail)}
          ></zev-input>
          <zev-input
            label="Empresa"
            @input-change=${(e: CustomEvent) => action('empresa')(e.detail)}
          ></zev-input>
        </div>
      </div>
    </div>
  `,
};
