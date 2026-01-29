import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-modal
 *
 * Modal dialog genérico com overlay, header, e botão fechar.
 *
 * ### Características
 * - Fechamento via ESC, overlay click ou botão X
 * - Tamanhos: sm, md, lg, xl, full
 * - Bloqueia scroll do body quando aberto
 * - Animação de entrada suave
 * - Slot para conteúdo e footer
 *
 * ### Eventos
 * - `modal-open`: Emitido quando o modal é aberto
 * - `modal-close`: Emitido quando o usuário tenta fechar o modal
 */
export default {
  title: 'Components/Modal',
  component: 'zev-modal',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Se o modal está aberto',
      table: { defaultValue: { summary: 'false' } },
    },
    title: {
      control: 'text',
      description: 'Título do modal',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Tamanho do modal',
      table: { defaultValue: { summary: 'md' } },
    },
    hideClose: {
      control: 'boolean',
      description: 'Ocultar botão de fechar',
      table: { defaultValue: { summary: 'false' } },
    },
    closeOnOverlay: {
      control: 'boolean',
      description: 'Fechar ao clicar no overlay',
      table: { defaultValue: { summary: 'true' } },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Fechar ao pressionar ESC',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

const handleModalClose = action('modal-close');
const handleModalOpen = action('modal-open');

export const Default = {
  name: 'Default',
  render: () => {
    const toggleModal = (open: boolean) => {
      const modal = document.querySelector('#demo-modal') as any;
      if (modal) modal.open = open;
    };

    return html`
      <zev-button @button-click=${() => toggleModal(true)}>Abrir Modal</zev-button>

      <zev-modal
        id="demo-modal"
        title="Título do Modal"
        @modal-close=${(e: CustomEvent) => { handleModalClose(e); toggleModal(false); }}
        @modal-open=${handleModalOpen}
      >
        <p>Este é o conteúdo do modal. Você pode colocar qualquer elemento aqui.</p>
        <p>Clique fora, pressione ESC ou clique no X para fechar.</p>
      </zev-modal>
    `;
  },
};

export const WithFooter = {
  name: 'Com Footer',
  render: () => {
    const toggleModal = (open: boolean) => {
      const modal = document.querySelector('#footer-modal') as any;
      if (modal) modal.open = open;
    };

    return html`
      <zev-button @button-click=${() => toggleModal(true)}>Abrir Modal com Footer</zev-button>

      <zev-modal
        id="footer-modal"
        title="Confirmação"
        @modal-close=${(e: CustomEvent) => { handleModalClose(e); toggleModal(false); }}
      >
        <p>Tem certeza que deseja continuar com esta ação?</p>

        <div slot="footer" style="display: flex; gap: 0.75rem; justify-content: flex-end; padding: 1rem 1.5rem; border-top: 1px solid var(--zev-color-border-tag);">
          <zev-button variant="ghost" @button-click=${() => toggleModal(false)}>Cancelar</zev-button>
          <zev-button variant="primary" @button-click=${() => toggleModal(false)}>Confirmar</zev-button>
        </div>
      </zev-modal>
    `;
  },
};

export const Sizes = {
  name: 'Tamanhos',
  render: () => {
    const toggleModal = (id: string, open: boolean) => {
      const modal = document.querySelector(`#${id}`) as any;
      if (modal) modal.open = open;
    };

    return html`
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <zev-button @button-click=${() => toggleModal('sm-modal', true)}>Small</zev-button>
        <zev-button @button-click=${() => toggleModal('md-modal', true)}>Medium</zev-button>
        <zev-button @button-click=${() => toggleModal('lg-modal', true)}>Large</zev-button>
        <zev-button @button-click=${() => toggleModal('xl-modal', true)}>Extra Large</zev-button>
        <zev-button @button-click=${() => toggleModal('full-modal', true)}>Full</zev-button>
      </div>

      <zev-modal id="sm-modal" title="Small Modal" size="sm" @modal-close=${() => toggleModal('sm-modal', false)}>
        <p>Modal pequeno (400px)</p>
      </zev-modal>

      <zev-modal id="md-modal" title="Medium Modal" size="md" @modal-close=${() => toggleModal('md-modal', false)}>
        <p>Modal médio (600px) - padrão</p>
      </zev-modal>

      <zev-modal id="lg-modal" title="Large Modal" size="lg" @modal-close=${() => toggleModal('lg-modal', false)}>
        <p>Modal grande (800px)</p>
      </zev-modal>

      <zev-modal id="xl-modal" title="Extra Large Modal" size="xl" @modal-close=${() => toggleModal('xl-modal', false)}>
        <p>Modal extra grande (1000px)</p>
      </zev-modal>

      <zev-modal id="full-modal" title="Full Modal" size="full" @modal-close=${() => toggleModal('full-modal', false)}>
        <p>Modal fullscreen (95vw)</p>
      </zev-modal>
    `;
  },
};

export const NoCloseButton = {
  name: 'Sem Botão Fechar',
  render: () => {
    const toggleModal = (open: boolean) => {
      const modal = document.querySelector('#no-close-modal') as any;
      if (modal) modal.open = open;
    };

    return html`
      <zev-button @button-click=${() => toggleModal(true)}>Abrir Modal</zev-button>

      <zev-modal
        id="no-close-modal"
        title="Modal sem X"
        .hideClose=${true}
        @modal-close=${() => toggleModal(false)}
      >
        <p>Este modal não tem o botão X, mas ainda pode ser fechado clicando fora ou pressionando ESC.</p>
        <div style="margin-top: 1rem;">
          <zev-button @button-click=${() => toggleModal(false)}>Fechar</zev-button>
        </div>
      </zev-modal>
    `;
  },
};

export const NoOverlayClose = {
  name: 'Sem Fechar no Overlay',
  render: () => {
    const toggleModal = (open: boolean) => {
      const modal = document.querySelector('#no-overlay-modal') as any;
      if (modal) modal.open = open;
    };

    return html`
      <zev-button @button-click=${() => toggleModal(true)}>Abrir Modal</zev-button>

      <zev-modal
        id="no-overlay-modal"
        title="Modal Persistente"
        .closeOnOverlay=${false}
        @modal-close=${() => toggleModal(false)}
      >
        <p>Este modal não fecha ao clicar no overlay. Use o botão X ou ESC.</p>
      </zev-modal>
    `;
  },
};

export const FormExample = {
  name: 'Exemplo com Formulário',
  render: () => {
    const toggleModal = (open: boolean) => {
      const modal = document.querySelector('#form-modal') as any;
      if (modal) modal.open = open;
    };

    return html`
      <zev-button @button-click=${() => toggleModal(true)}>Novo Cadastro</zev-button>

      <zev-modal
        id="form-modal"
        title="Cadastrar Usuário"
        size="md"
        @modal-close=${() => toggleModal(false)}
      >
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <zev-input label="Nome completo" placeholder="Digite seu nome"></zev-input>
          <zev-input label="E-mail" placeholder="seu@email.com"></zev-input>
          <zev-select
            label="Cargo"
            placeholder="Selecione..."
            .options=${[
              { value: 'dev', label: 'Desenvolvedor' },
              { value: 'design', label: 'Designer' },
              { value: 'pm', label: 'Product Manager' },
            ]}
          ></zev-select>
        </div>

        <div slot="footer" style="display: flex; gap: 0.75rem; justify-content: flex-end; padding: 1rem 1.5rem; border-top: 1px solid var(--zev-color-border-tag);">
          <zev-button variant="ghost" @button-click=${() => toggleModal(false)}>Cancelar</zev-button>
          <zev-button variant="primary" @button-click=${() => { action('form-submit')(); toggleModal(false); }}>Salvar</zev-button>
        </div>
      </zev-modal>
    `;
  },
};
