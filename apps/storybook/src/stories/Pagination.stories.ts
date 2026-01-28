import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-pagination
 *
 * Componente de paginação para navegação entre páginas.
 *
 * ### Características
 * - Botões de anterior/próximo
 * - Números de página clicáveis
 * - Ellipsis para muitas páginas
 * - Acessibilidade com aria-labels
 *
 * ### Eventos
 * - `page-change`: Disparado ao mudar de página, com `{ page }` no detail
 */
export default {
  title: 'Components/Pagination',
  component: 'zev-pagination',
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Página atual',
      table: { defaultValue: { summary: '1' } },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total de páginas',
      table: { defaultValue: { summary: '1' } },
    },
  },
};

export const Default = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-pagination
        current-page=${args.currentPage}
        total-pages=${args.totalPages}
        @page-change=${(e: CustomEvent) => action('page-change')(e.detail)}
      ></zev-pagination>
    </div>
  `,
};

export const FirstPage = {
  name: 'Primeira Página',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-pagination
        current-page="1"
        total-pages="10"
        @page-change=${(e: CustomEvent) => action('page-change')(e.detail)}
      ></zev-pagination>
    </div>
  `,
};

export const MiddlePage = {
  name: 'Página do Meio',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-pagination
        current-page="5"
        total-pages="10"
        @page-change=${(e: CustomEvent) => action('page-change')(e.detail)}
      ></zev-pagination>
    </div>
  `,
};

export const LastPage = {
  name: 'Última Página',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-pagination
        current-page="10"
        total-pages="10"
        @page-change=${(e: CustomEvent) => action('page-change')(e.detail)}
      ></zev-pagination>
    </div>
  `,
};

export const ManyPages = {
  name: 'Muitas Páginas',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-pagination
        current-page="25"
        total-pages="50"
        @page-change=${(e: CustomEvent) => action('page-change')(e.detail)}
      ></zev-pagination>
    </div>
  `,
};

export const FewPages = {
  name: 'Poucas Páginas',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-pagination
        current-page="2"
        total-pages="3"
        @page-change=${(e: CustomEvent) => action('page-change')(e.detail)}
      ></zev-pagination>
    </div>
  `,
};

export const InContext = {
  name: 'Em Contexto',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <div style="
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 600px;
      ">
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--zev-font-primary);
          color: var(--zev-color-text-secondary);
          font-size: var(--zev-fs-small);
        ">
          <span>Mostrando 1-10 de 100 vagas</span>
          <span>Página 1 de 10</span>
        </div>
        <zev-pagination
          current-page="1"
          total-pages="10"
          @page-change=${(e: CustomEvent) => action('page-change')(e.detail)}
        ></zev-pagination>
      </div>
    </div>
  `,
};
