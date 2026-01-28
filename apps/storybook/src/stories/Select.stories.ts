import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-select
 *
 * Componente de select dropdown.
 *
 * ### Características
 * - Recebe array de opções via prop
 * - Placeholder customizável
 * - Estado disabled
 * - Emite evento select-change ao selecionar
 *
 * ### Eventos
 * - `select-change`: Disparado ao selecionar, com `{ value, label }` no detail
 */
export default {
  title: 'Components/Select',
  component: 'zev-select',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
      table: { defaultValue: { summary: 'Selecione uma opção' } },
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
    placeholder: 'Selecione uma tecnologia',
    value: '',
    disabled: false,
    options: defaultOptions,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-select
        placeholder=${args.placeholder}
        value=${args.value}
        ?disabled=${args.disabled}
        .options=${args.options}
        @select-change=${(e: CustomEvent) => action('select-change')(e.detail)}
      ></zev-select>
    </div>
  `,
};

export const WithValue = {
  name: 'Com Valor Selecionado',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-select
        placeholder="Selecione uma tecnologia"
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
      <zev-select
        placeholder="Select desabilitado"
        disabled
        .options=${defaultOptions}
      ></zev-select>
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
          Filtros
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
          <zev-select
            placeholder="Modalidade"
            .options=${[
              { value: 'remote', label: 'Remoto' },
              { value: 'hybrid', label: 'Híbrido' },
              { value: 'onsite', label: 'Presencial' },
            ]}
            @select-change=${(e: CustomEvent) => action('modalidade')(e.detail)}
          ></zev-select>
          <zev-select
            placeholder="Senioridade"
            .options=${[
              { value: 'junior', label: 'Júnior' },
              { value: 'mid', label: 'Pleno' },
              { value: 'senior', label: 'Sênior' },
            ]}
            @select-change=${(e: CustomEvent) => action('senioridade')(e.detail)}
          ></zev-select>
          <zev-select
            placeholder="Fonte"
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
