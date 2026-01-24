import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@zev/core';

/**
 * ## zev-project-detail
 *
 * Modal de detalhe de projeto com overlay escuro e animações.
 *
 * ### Características
 * - Overlay fullscreen com `rgba(0,0,0,0.85)` e animação `fadeIn`
 * - Conteúdo com animação `slideUp`
 * - Fecha via: ESC, click no overlay, botão X
 * - Botão X roda 90deg no hover
 * - Tech tags com background azul sólido
 * - Highlights com bullets quadrados azuis (8x8px)
 * - Body lock (`overflow: hidden`) quando aberto
 * - Em mobile: alinha ao fundo da tela
 *
 * ### Eventos
 * - `close`: Disparado quando o modal solicita fechamento
 *
 * ### Controle de estado
 * O componente é controlado externamente via a prop `open`.
 * Ao receber o evento `close`, o consumidor deve setar `open = false`.
 */
export default {
  title: 'Components/ProjectDetail',
  component: 'zev-project-detail',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controla se o modal está visível',
      table: { defaultValue: { summary: 'false' } },
    },
    project: {
      control: 'object',
      description: 'Objeto `ProjectData` com dados do projeto',
    },
  },
};

const sampleProject = {
  number: '01',
  role: 'Lead Frontend Developer',
  title: 'E-Commerce Platform',
  description: 'A comprehensive e-commerce solution featuring real-time inventory management, personalized recommendations, and a seamless checkout experience. Built with modern web technologies for optimal performance and accessibility.',
  techTags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
  highlights: [
    'Reduced page load time by 40% through code splitting and lazy loading',
    'Implemented real-time inventory sync across multiple warehouses',
    'Built a custom design system used by 3 product teams',
    'Achieved 99.9% uptime with comprehensive error handling',
  ],
};

export const Open = {
  name: 'Aberto',
  args: {
    open: true,
    project: sampleProject,
  },
  render: (args: any) => html`
    <zev-project-detail
      .open=${args.open}
      .project=${args.project}
      @close=${() => action('close')('Modal close requested')}
    ></zev-project-detail>
  `,
};

export const WithoutHighlights = {
  name: 'Sem Highlights',
  args: {
    open: true,
    project: {
      number: '02',
      role: 'Frontend Developer',
      title: 'Dashboard App',
      description: 'Real-time analytics dashboard with live data visualization and interactive charts.',
      techTags: ['React', 'D3.js', 'WebSocket'],
      highlights: [],
    },
  },
  render: (args: any) => html`
    <zev-project-detail
      .open=${args.open}
      .project=${args.project}
      @close=${() => action('close')('Modal close requested')}
    ></zev-project-detail>
  `,
};

export const Closed = {
  name: 'Fechado',
  args: {
    open: false,
    project: sampleProject,
  },
  render: (args: any) => html`
    <zev-project-detail
      .open=${args.open}
      .project=${args.project}
      @close=${() => action('close')('Modal close requested')}
    ></zev-project-detail>
    <div style="padding: 2rem;">
      <p>Modal fechado - nada visível. Altere o controle <code>open</code> para <code>true</code>.</p>
    </div>
  `,
};
