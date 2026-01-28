import { html } from 'lit';
import '@malvezzidatr/zev-core';

/**
 * ## zev-empty-state
 *
 * Componente de estado vazio para quando não há conteúdo.
 *
 * ### Características
 * - Título e descrição customizáveis
 * - Slot para ícone customizado
 * - Slot para ação (botão, link, etc.)
 * - Ícone padrão de pasta vazia
 *
 * ### Uso
 * Ideal para indicar listas vazias, resultados de busca sem retorno, etc.
 */
export default {
  title: 'Components/EmptyState',
  component: 'zev-empty-state',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do estado vazio',
      table: { defaultValue: { summary: '' } },
    },
    description: {
      control: 'text',
      description: 'Descrição do estado vazio',
      table: { defaultValue: { summary: '' } },
    },
  },
};

export const Default = {
  args: {
    title: 'Nenhum resultado encontrado',
    description: 'Tente ajustar os filtros ou fazer uma nova busca.',
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-empty-state
        title=${args.title}
        description=${args.description}
      ></zev-empty-state>
    </div>
  `,
};

export const WithCustomIcon = {
  name: 'Com Ícone Customizado',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-empty-state
        title="Nenhuma vaga encontrada"
        description="Não encontramos vagas com os filtros selecionados."
      >
        <svg slot="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
      </zev-empty-state>
    </div>
  `,
};

export const WithAction = {
  name: 'Com Ação',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-empty-state
        title="Nenhuma vaga salva"
        description="Salve vagas para revisá-las depois."
      >
        <zev-button slot="action" variant="primary">
          Explorar vagas
        </zev-button>
      </zev-empty-state>
    </div>
  `,
};

export const NoJobs = {
  name: 'Sem Vagas',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <div style="
        border: 1px solid var(--zev-color-border-tag);
        border-radius: 8px;
        padding: 2rem;
      ">
        <zev-empty-state
          title="Nenhuma vaga encontrada"
          description="Tente mudar os filtros de busca ou verificar novamente mais tarde."
        >
          <svg slot="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <zev-button slot="action" variant="secondary">
            Limpar filtros
          </zev-button>
        </zev-empty-state>
      </div>
    </div>
  `,
};

export const OnlyTitle = {
  name: 'Apenas Título',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-empty-state
        title="Lista vazia"
      ></zev-empty-state>
    </div>
  `,
};
