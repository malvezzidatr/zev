import { html } from 'lit';
import '@malvezzidatr/zev-core';

/**
 * ## zev-sticky-sidebar
 *
 * Sidebar com imagem e detalhes, com opção de ser fixa (sticky) durante o scroll.
 *
 * ### Características
 * - Imagem no topo com aspect-ratio 16:9
 * - Placeholder quando não há imagem
 * - Título e descrição
 * - Borda colorida superior com variantes
 * - Modo sticky opcional para fixar durante scroll
 * - Slot para conteúdo adicional (botões, links, etc.)
 *
 * ### Variantes
 * - `primary`: Cor de destaque (azul)
 * - `success`: Verde
 * - `warning`: Amarelo/Laranja
 * - `info`: Azul claro
 * - `neutral`: Cinza
 */
export default {
  title: 'Components/StickySidebar',
  component: 'zev-sticky-sidebar',
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'text',
      description: 'URL da imagem',
    },
    title: {
      control: 'text',
      description: 'Título da sidebar',
    },
    description: {
      control: 'text',
      description: 'Descrição/texto da sidebar',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'info', 'neutral'],
      description: 'Variante da cor da borda superior',
    },
    sticky: {
      control: 'boolean',
      description: 'Se a sidebar deve ser sticky (fixa no scroll)',
    },
  },
};

export const Default = {
  args: {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    title: 'Lorem Ipsum',
    description: 'Pellentesque habitant morbi tristique senectus et netus.',
    variant: 'primary',
    sticky: false,
  },
  render: (args: any) => html`
    <zev-sticky-sidebar
      image="${args.image}"
      title="${args.title}"
      description="${args.description}"
      variant="${args.variant}"
      ?sticky="${args.sticky}"
    ></zev-sticky-sidebar>
  `,
};

export const Variants = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap;">
      <zev-sticky-sidebar
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
        title="Primary"
        description="Variante primary com cor de destaque."
        variant="primary"
      ></zev-sticky-sidebar>

      <zev-sticky-sidebar
        image="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop"
        title="Success"
        description="Variante success para indicar sucesso."
        variant="success"
      ></zev-sticky-sidebar>

      <zev-sticky-sidebar
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop"
        title="Warning"
        description="Variante warning para alertas."
        variant="warning"
      ></zev-sticky-sidebar>

      <zev-sticky-sidebar
        image="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=225&fit=crop"
        title="Info"
        description="Variante info para informações."
        variant="info"
      ></zev-sticky-sidebar>

      <zev-sticky-sidebar
        image="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=225&fit=crop"
        title="Neutral"
        description="Variante neutral para uso geral."
        variant="neutral"
      ></zev-sticky-sidebar>
    </div>
  `,
};

export const WithoutImage = {
  args: {
    title: 'Sem Imagem',
    description: 'Quando não há imagem, um placeholder é exibido.',
    variant: 'info',
  },
  render: (args: any) => html`
    <zev-sticky-sidebar
      title="${args.title}"
      description="${args.description}"
      variant="${args.variant}"
    ></zev-sticky-sidebar>
  `,
};

export const WithSlotContent = {
  render: () => html`
    <zev-sticky-sidebar
      image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
      title="Projeto Incrível"
      description="Um projeto fantástico com tecnologias modernas."
      variant="primary"
    >
      <div style="display: flex; gap: 8px;">
        <zev-button variant="primary" size="sm">Ver Mais</zev-button>
        <zev-button variant="secondary" size="sm">GitHub</zev-button>
      </div>
    </zev-sticky-sidebar>
  `,
};

export const StickyDemo = {
  render: () => html`
    <div style="display: flex; gap: 24px;">
      <div style="flex: 1;">
        <zev-sticky-sidebar
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
          title="Sidebar Sticky"
          description="Esta sidebar permanece fixa durante o scroll. Role a página para ver o efeito."
          variant="success"
          sticky
        >
          <zev-button variant="primary" size="sm">Ação</zev-button>
        </zev-sticky-sidebar>
      </div>

      <div style="flex: 2;">
        <div style="height: 200vh; padding: 16px; background: var(--zev-color-bg-secondary); border-radius: 8px;">
          <h2 style="color: var(--zev-color-text-primary); margin: 0 0 16px;">Conteúdo Principal</h2>
          <p style="color: var(--zev-color-text-secondary);">
            Role a página para ver a sidebar sticky em ação. Ela permanecerá fixa no topo
            enquanto você navega pelo conteúdo.
          </p>
          <p style="color: var(--zev-color-text-secondary); margin-top: 100vh;">
            Você ainda pode ver a sidebar aqui!
          </p>
        </div>
      </div>
    </div>
  `,
};

export const ProductCard = {
  render: () => html`
    <zev-sticky-sidebar
      image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=225&fit=crop"
      title="Relógio Smartwatch Pro"
      description="Smartwatch com monitor cardíaco, GPS integrado e bateria de longa duração."
      variant="primary"
    >
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <span style="font-size: 20px; font-weight: bold; color: var(--zev-color-text-primary);">R$ 899,00</span>
        <zev-button variant="primary">Comprar Agora</zev-button>
      </div>
    </zev-sticky-sidebar>
  `,
};

export const ArticleSidebar = {
  render: () => html`
    <zev-sticky-sidebar
      image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=225&fit=crop"
      title="Como criar componentes Web"
      description="Aprenda a criar Web Components reutilizáveis com Lit Element e TypeScript."
      variant="info"
    >
      <div style="display: flex; flex-direction: column; gap: 8px; color: var(--zev-color-text-secondary); font-size: 14px;">
        <span>📅 28 de Janeiro, 2025</span>
        <span>⏱️ 5 min de leitura</span>
        <div style="display: flex; gap: 4px; margin-top: 8px;">
          <zev-tag label="Web Components" size="small"></zev-tag>
          <zev-tag label="TypeScript" size="small"></zev-tag>
        </div>
      </div>
    </zev-sticky-sidebar>
  `,
};
