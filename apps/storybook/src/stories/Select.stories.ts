import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-select
 *
 * Componente de select dropdown com floating label no estilo Material Design outlined.
 *
 * ### Características
 * - Floating label que sobe para a borda quando focado ou com valor
 * - Recebe array de opções via prop
 * - Placeholder customizável
 * - Estado disabled
 *
 * ### Eventos
 * - `select-change`: Disparado ao selecionar, com `{ value, label }` no detail
 */
export default {
  title: 'Components/Select',
  component: 'zev-select',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Floating label (estilo outlined)',
      table: { defaultValue: { summary: '' } },
    },
    value: {
      control: 'text',
      description: 'Valor selecionado',
      table: { defaultValue: { summary: '' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Se o select está desabilitado',
      table: { defaultValue: { summary: 'false' } },
    },
    options: {
      control: 'object',
      description: 'Array de opções { value, label }',
    },
  },
};

const defaultOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

export const Default = {
  args: {
    label: 'Tecnologia',
    value: '',
    disabled: false,
    options: defaultOptions,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-select
        label=${args.label}
        value=${args.value}
        ?disabled=${args.disabled}
        .options=${args.options}
        @select-change=${(e: CustomEvent) => action('select-change')(e.detail)}
      ></zev-select>
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
        <zev-select
          label="Tecnologia"
          .options=${defaultOptions}
          @select-change=${(e: CustomEvent) => action('select-change')(e.detail)}
        ></zev-select>
        <zev-select
          label="Tecnologia"
          value="vue"
          .options=${defaultOptions}
          @select-change=${(e: CustomEvent) => action('select-change')(e.detail)}
        ></zev-select>
      </div>
    </div>
  `,
};

export const WithValue = {
  name: 'Com Valor',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-select
        label="Tecnologia"
        value="vue"
        .options=${defaultOptions}
        @select-change=${(e: CustomEvent) => action('select-change')(e.detail)}
      ></zev-select>
    </div>
  `,
};

export const Disabled = {
  name: 'Desabilitado',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <zev-select
          label="Select desabilitado"
          disabled
          .options=${defaultOptions}
        ></zev-select>
        <zev-select
          label="Select com valor"
          value="react"
          disabled
          .options=${defaultOptions}
        ></zev-select>
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
        max-width: 800px;
        padding: 1.5rem;
        border: 1px solid var(--zev-color-border-tag);
        border-radius: 8px;
      ">
        <h3 style="margin: 0; font-family: var(--zev-font-primary); color: var(--zev-color-text-primary);">
          Filtros
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
          <zev-select
            label="Nível"
            .options=${[
              { value: 'junior', label: 'Júnior' },
              { value: 'mid', label: 'Pleno' },
              { value: 'senior', label: 'Sênior' },
            ]}
            @select-change=${(e: CustomEvent) => action('nivel')(e.detail)}
          ></zev-select>
          <zev-select
            label="Área"
            .options=${[
              { value: 'frontend', label: 'Frontend' },
              { value: 'backend', label: 'Backend' },
              { value: 'fullstack', label: 'Full Stack' },
              { value: 'mobile', label: 'Mobile' },
            ]}
            @select-change=${(e: CustomEvent) => action('area')(e.detail)}
          ></zev-select>
          <zev-select
            label="Modalidade"
            .options=${[
              { value: 'remote', label: 'Remoto' },
              { value: 'hybrid', label: 'Híbrido' },
              { value: 'onsite', label: 'Presencial' },
            ]}
            @select-change=${(e: CustomEvent) => action('modalidade')(e.detail)}
          ></zev-select>
          <zev-select
            label="Fonte"
            .options=${[
              { value: 'github', label: 'GitHub Jobs' },
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'gupy', label: 'Gupy' },
            ]}
            @select-change=${(e: CustomEvent) => action('fonte')(e.detail)}
          ></zev-select>
        </div>
      </div>
    </div>
  `,
};
