import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-skill-card
 *
 * Card educacional para exibir habilidades/competências com recursos de estudo.
 *
 * ### Características
 * - 3 tipos de badge: differential, required, optional
 * - Seção "Por que é importante"
 * - Seção "O que focar"
 * - Lista de recursos com tipos: docs, video, article, course
 *
 * ### Eventos
 * - `resource-click`: Disparado ao clicar em um recurso, com `{ label, url, type }` no detail
 */
export default {
  title: 'Components/SkillCard',
  component: 'zev-skill-card',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título da habilidade',
    },
    badge: {
      control: { type: 'select' },
      options: ['differential', 'required', 'optional'],
      description: 'Tipo do badge',
      table: { defaultValue: { summary: 'required' } },
    },
    badgeLabel: {
      control: 'text',
      description: 'Label customizado para o badge (opcional)',
    },
    importance: {
      control: 'text',
      description: 'Por que esta habilidade é importante',
    },
    focusPoints: {
      control: 'text',
      description: 'O que focar ao estudar',
    },
  },
};

const defaultResources = [
  { label: 'Documentação Jest', url: 'https://jestjs.io/docs/getting-started', type: 'docs' as const },
  { label: 'Testes com Jest - Rocketseat', url: 'https://youtube.com/example', type: 'video' as const },
];

export const Default = {
  args: {
    title: 'Jest',
    badge: 'differential',
    importance: 'A empresa valoriza a inovação e a entrega de soluções de alta qualidade, o que inclui a realização de testes automatizados para garantir a confiabilidade e a estabilidade das aplicações. O Jest é uma framework de teste popular para JavaScript, especialmente adequada para testar aplicações React e outras aplicações front-end.',
    focusPoints: 'Conhecimento de como escrever testes unitários e de integração, e usar mocks e stubs',
    resources: defaultResources,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 600px;">
      <zev-skill-card
        title=${args.title}
        badge=${args.badge}
        badgeLabel=${args.badgeLabel || ''}
        importance=${args.importance}
        focusPoints=${args.focusPoints}
        .resources=${args.resources}
        @resource-click=${(e: CustomEvent) => action('resource-click')(e.detail)}
      ></zev-skill-card>
    </div>
  `,
};

export const BadgeVariants = {
  name: 'Tipos de Badge',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
      <zev-skill-card
        title="TypeScript"
        badge="required"
        importance="TypeScript é essencial para projetos modernos de grande escala."
        focusPoints="Tipos, interfaces, generics e boas práticas."
      ></zev-skill-card>

      <zev-skill-card
        title="Jest"
        badge="differential"
        importance="Testes automatizados garantem qualidade do código."
        focusPoints="Testes unitários, mocks e integração."
      ></zev-skill-card>

      <zev-skill-card
        title="GraphQL"
        badge="optional"
        importance="Conhecimento em GraphQL é um diferencial para APIs modernas."
        focusPoints="Queries, mutations e schemas."
      ></zev-skill-card>
    </div>
  `,
};

export const WithResources = {
  name: 'Com Recursos',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 600px;">
      <zev-skill-card
        title="React"
        badge="required"
        importance="React é a biblioteca principal utilizada no front-end da empresa."
        focusPoints="Hooks, componentes funcionais, estado e ciclo de vida."
        .resources=${[
          { label: 'Documentação Oficial React', url: 'https://react.dev', type: 'docs' },
          { label: 'React do Zero - Rocketseat', url: 'https://youtube.com', type: 'video' },
          { label: 'Guia Completo de Hooks', url: 'https://blog.example.com', type: 'article' },
          { label: 'Curso React Avançado', url: 'https://udemy.com', type: 'course' },
        ]}
        @resource-click=${(e: CustomEvent) => action('resource-click')(e.detail)}
      ></zev-skill-card>
    </div>
  `,
};

export const MinimalContent = {
  name: 'Conteúdo Mínimo',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 600px;">
      <zev-skill-card
        title="Git"
        badge="required"
      ></zev-skill-card>
    </div>
  `,
};

export const CustomBadgeLabel = {
  name: 'Badge Customizado',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 600px;">
      <zev-skill-card
        title="Docker"
        badge="differential"
        badgeLabel="NICE TO HAVE"
        importance="Conhecimento em containerização ajuda no deploy e DevOps."
        focusPoints="Dockerfile, docker-compose e imagens."
      ></zev-skill-card>
    </div>
  `,
};

export const SkillsList = {
  name: 'Lista de Skills',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-secondary);">
      <h2 style="margin: 0 0 1.5rem 0; font-family: var(--zev-font-primary); color: var(--zev-color-text-primary);">
        Habilidades Técnicas
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem;">
        <zev-skill-card
          title="TypeScript"
          badge="required"
          importance="TypeScript é a linguagem principal utilizada em todos os projetos da empresa."
          focusPoints="Tipagem estática, interfaces, generics e utility types."
          .resources=${[
            { label: 'TypeScript Handbook', url: 'https://typescriptlang.org', type: 'docs' },
            { label: 'TypeScript na Prática', url: 'https://youtube.com', type: 'video' },
          ]}
          @resource-click=${(e: CustomEvent) => action('resource-click')(e.detail)}
        ></zev-skill-card>

        <zev-skill-card
          title="React"
          badge="required"
          importance="React é o framework front-end utilizado em todos os produtos."
          focusPoints="Hooks, Context API, performance e padrões avançados."
          .resources=${[
            { label: 'React Docs', url: 'https://react.dev', type: 'docs' },
            { label: 'React Patterns', url: 'https://reactpatterns.com', type: 'article' },
          ]}
          @resource-click=${(e: CustomEvent) => action('resource-click')(e.detail)}
        ></zev-skill-card>

        <zev-skill-card
          title="Jest & Testing Library"
          badge="differential"
          importance="Testes automatizados são valorizados para garantir qualidade."
          focusPoints="Testes unitários, de integração e mocks."
          .resources=${[
            { label: 'Jest Docs', url: 'https://jestjs.io', type: 'docs' },
            { label: 'Testing Library', url: 'https://testing-library.com', type: 'docs' },
          ]}
          @resource-click=${(e: CustomEvent) => action('resource-click')(e.detail)}
        ></zev-skill-card>

        <zev-skill-card
          title="GraphQL"
          badge="optional"
          importance="Algumas APIs utilizam GraphQL, conhecimento é um diferencial."
          focusPoints="Queries, mutations, Apollo Client."
          .resources=${[
            { label: 'GraphQL Learn', url: 'https://graphql.org/learn', type: 'docs' },
          ]}
          @resource-click=${(e: CustomEvent) => action('resource-click')(e.detail)}
        ></zev-skill-card>
      </div>
    </div>
  `,
};
