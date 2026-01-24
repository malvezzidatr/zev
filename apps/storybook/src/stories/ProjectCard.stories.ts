import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@zev/core';

/**
 * ## zev-project-card
 *
 * Card de projeto para uso sobre fundo azul (seção Projects).
 *
 * ### Características
 * - Background translúcido (`rgba(255,255,255,0.08)`)
 * - Hover: background mais claro + `translateY(-4px)`
 * - Header com número e role badge
 * - Tech tags com borda translúcida
 * - Cursor pointer (clicável)
 *
 * ### Eventos
 * - `card-click`: Disparado ao clicar no card, com `{ number, title }` no detail
 *
 * ### Contexto de uso
 * Este componente foi projetado para ser usado sobre um fundo azul (`--zev-color-blue`).
 * Os decorators das stories simulam esse contexto.
 */
export default {
  title: 'Components/ProjectCard',
  component: 'zev-project-card',
  tags: ['autodocs'],
  decorators: [
    (story: () => unknown) => html`
      <div style="background: var(--zev-color-blue, #0000FF); padding: 2rem; min-height: 100vh;">
        ${story()}
      </div>
    `,
  ],
  argTypes: {
    number: {
      control: 'text',
      description: 'Número identificador do projeto',
    },
    role: {
      control: 'text',
      description: 'Role/cargo exibido como badge',
    },
    title: {
      control: 'text',
      description: 'Título do projeto (uppercase)',
    },
    description: {
      control: 'text',
      description: 'Descrição curta do projeto',
    },
    techTags: {
      control: 'object',
      description: 'Array de strings com tecnologias usadas',
    },
  },
};

export const Default = {
  args: {
    number: '01',
    role: 'Frontend Developer',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution built with React and Node.js, featuring real-time inventory and personalized recommendations.',
    techTags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  render: (args: any) => html`
    <zev-project-card
      number=${args.number}
      role=${args.role}
      title=${args.title}
      description=${args.description}
      .techTags=${args.techTags}
      @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
    ></zev-project-card>
  `,
};

export const Grid = {
  name: 'Grid de Cards',
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
      <zev-project-card
        number="01"
        role="Lead Developer"
        title="Design System"
        description="Component library with Web Components and Lit"
        .techTags=${['Lit', 'TypeScript', 'CSS']}
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-project-card>
      <zev-project-card
        number="02"
        role="Frontend Developer"
        title="Dashboard App"
        description="Real-time analytics dashboard with WebSocket updates"
        .techTags=${['React', 'D3.js', 'WebSocket']}
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-project-card>
      <zev-project-card
        number="03"
        role="Fullstack Developer"
        title="Social Platform"
        description="Community platform with real-time messaging features"
        .techTags=${['Next.js', 'Prisma', 'tRPC']}
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-project-card>
    </div>
  `,
};

export const ManyTags = {
  name: 'Muitas Tags',
  args: {
    number: '04',
    role: 'Tech Lead',
    title: 'Enterprise App',
    description: 'Large-scale enterprise application with microservices architecture',
    techTags: ['React', 'TypeScript', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis'],
  },
  render: (args: any) => html`
    <zev-project-card
      number=${args.number}
      role=${args.role}
      title=${args.title}
      description=${args.description}
      .techTags=${args.techTags}
      @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
    ></zev-project-card>
  `,
};
