import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-multi-select
 *
 * Componente de select com seleção múltipla usando tags.
 *
 * ### Características
 * - Label opcional acima do componente
 * - Seleção múltipla com tags removíveis
 * - Campo de busca para filtrar opções
 * - Limite configurável de tags visíveis (mostra +N)
 * - Estado disabled
 *
 * ### Eventos
 * - `multi-select-change`: Disparado ao selecionar/remover, com `{ values, labels }` no detail
 * - `multi-select-search`: Disparado ao buscar, com `{ query }` no detail
 */
export default {
  title: 'Components/MultiSelect',
  component: 'zev-multi-select',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label exibida acima do select',
      table: { defaultValue: { summary: '' } },
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder quando nada selecionado',
      table: { defaultValue: { summary: 'Selecione uma opção' } },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Texto placeholder do campo de busca',
      table: { defaultValue: { summary: 'Buscar...' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Se o select está desabilitado',
      table: { defaultValue: { summary: 'false' } },
    },
    searchable: {
      control: 'boolean',
      description: 'Se a busca está habilitada',
      table: { defaultValue: { summary: 'true' } },
    },
    maxDisplayTags: {
      control: 'number',
      description: 'Máximo de tags visíveis antes de mostrar +N',
      table: { defaultValue: { summary: '3' } },
    },
    options: {
      control: 'object',
      description: 'Array de opções { value, label, icon? }',
    },
    value: {
      control: 'object',
      description: 'Array de valores selecionados',
    },
  },
};

const defaultOptions = [
  { value: 'family', label: 'Family' },
  { value: 'family-in-law', label: 'Family in law' },
  { value: 'coworkers', label: 'Co-workers' },
  { value: 'friends', label: 'Friends' },
  { value: 'hockey-club', label: 'Hockey club' },
  { value: 'startup-investor', label: 'Startup Investor Col...' },
  { value: 'swiss-embassy', label: 'Swiss Embassy' },
  { value: 'zurich-meetup', label: 'Zurich Meetup Group' },
];

export const Default = {
  args: {
    label: 'Multi-select',
    placeholder: 'Choose a tag',
    searchPlaceholder: 'Search',
    disabled: false,
    searchable: true,
    maxDisplayTags: 3,
    options: defaultOptions,
    value: [],
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-multi-select
        label=${args.label}
        placeholder=${args.placeholder}
        searchPlaceholder=${args.searchPlaceholder}
        ?disabled=${args.disabled}
        ?searchable=${args.searchable}
        maxDisplayTags=${args.maxDisplayTags}
        .options=${args.options}
        .value=${args.value}
        @multi-select-change=${(e: CustomEvent) => action('multi-select-change')(e.detail)}
        @multi-select-search=${(e: CustomEvent) => action('multi-select-search')(e.detail)}
      ></zev-multi-select>
    </div>
  `,
};

export const WithSelectedValues = {
  name: 'Com Valores Selecionados',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-multi-select
        label="Multi-select"
        placeholder="Choose a tag"
        .options=${defaultOptions}
        .value=${['family', 'family-in-law', 'coworkers']}
        @multi-select-change=${(e: CustomEvent) => action('multi-select-change')(e.detail)}
      ></zev-multi-select>
    </div>
  `,
};

export const WithManySelected = {
  name: 'Com Muitos Selecionados (+N)',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-multi-select
        label="Multi-select"
        placeholder="Choose a tag"
        maxDisplayTags="3"
        .options=${defaultOptions}
        .value=${['family', 'family-in-law', 'coworkers', 'friends', 'hockey-club']}
        @multi-select-change=${(e: CustomEvent) => action('multi-select-change')(e.detail)}
      ></zev-multi-select>
      <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--zev-color-text-secondary);">
        5 itens selecionados, mostrando 3 + indicador "+2"
      </p>
    </div>
  `,
};

export const WithoutSearch = {
  name: 'Sem Busca',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-multi-select
        label="Tags"
        placeholder="Selecione tags"
        .searchable=${false}
        .options=${defaultOptions}
        @multi-select-change=${(e: CustomEvent) => action('multi-select-change')(e.detail)}
      ></zev-multi-select>
    </div>
  `,
};

export const Disabled = {
  name: 'Desabilitado',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-multi-select
        label="Multi-select"
        placeholder="Select desabilitado"
        disabled
        .options=${defaultOptions}
        .value=${['family', 'friends']}
      ></zev-multi-select>
    </div>
  `,
};

export const Technologies = {
  name: 'Tecnologias',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <zev-multi-select
        label="Tecnologias"
        placeholder="Selecione as tecnologias"
        searchPlaceholder="Buscar tecnologia..."
        .options=${[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'javascript', label: 'JavaScript' },
          { value: 'nodejs', label: 'Node.js' },
          { value: 'python', label: 'Python' },
        ]}
        @multi-select-change=${(e: CustomEvent) => action('multi-select-change')(e.detail)}
      ></zev-multi-select>
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
        gap: 1.5rem;
        max-width: 600px;
        padding: 1.5rem;
        border: 1px solid var(--zev-color-border-tag);
        border-radius: 8px;
      ">
        <h3 style="margin: 0; font-family: var(--zev-font-primary); color: var(--zev-color-text-primary);">
          Filtros Avançados
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          <zev-multi-select
            label="Tecnologias"
            placeholder="Todas"
            .options=${[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue.js' },
              { value: 'angular', label: 'Angular' },
              { value: 'node', label: 'Node.js' },
              { value: 'python', label: 'Python' },
            ]}
            @multi-select-change=${(e: CustomEvent) => action('tecnologias')(e.detail)}
          ></zev-multi-select>
          <zev-multi-select
            label="Modalidade"
            placeholder="Todas"
            .options=${[
              { value: 'remote', label: 'Remoto' },
              { value: 'hybrid', label: 'Híbrido' },
              { value: 'onsite', label: 'Presencial' },
            ]}
            @multi-select-change=${(e: CustomEvent) => action('modalidade')(e.detail)}
          ></zev-multi-select>
          <zev-multi-select
            label="Senioridade"
            placeholder="Todas"
            .options=${[
              { value: 'junior', label: 'Júnior' },
              { value: 'mid', label: 'Pleno' },
              { value: 'senior', label: 'Sênior' },
              { value: 'lead', label: 'Tech Lead' },
            ]}
            @multi-select-change=${(e: CustomEvent) => action('senioridade')(e.detail)}
          ></zev-multi-select>
        </div>
      </div>
    </div>
  `,
};
