import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@zev/core';

/**
 * ## zev-tag
 *
 * Componente de tag reutilizável para labels, skills, categorias e tech stacks.
 *
 * ### Características
 * - Variantes: default, accent, outline, ghost
 * - Tamanhos: small, medium, large
 * - Modo interativo (clicável) com hover effects
 * - Botão de remoção opcional
 * - Suporta conteúdo via slot ou prop `label`
 *
 * ### Eventos
 * - `tag-click`: Disparado ao clicar (quando `interactive=true`), com `{ label }` no detail
 * - `tag-remove`: Disparado ao clicar no botão remover, com `{ label }` no detail
 */
export default {
  title: 'Components/Tag',
  component: 'zev-tag',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido na tag',
      table: { defaultValue: { summary: '' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'accent', 'outline', 'ghost'],
      description: 'Variante visual da tag',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Tamanho da tag',
      table: { defaultValue: { summary: 'medium' } },
    },
    interactive: {
      control: 'boolean',
      description: 'Se a tag é clicável',
      table: { defaultValue: { summary: 'false' } },
    },
    removable: {
      control: 'boolean',
      description: 'Se a tag pode ser removida',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export const Default = {
  args: {
    label: 'Tag',
    variant: 'default',
    size: 'medium',
    interactive: false,
    removable: false,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-tag
        label=${args.label}
        variant=${args.variant}
        size=${args.size}
        ?interactive=${args.interactive}
        ?removable=${args.removable}
        @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}
        @tag-remove=${(e: CustomEvent) => action('tag-remove')(e.detail)}
      ></zev-tag>
    </div>
  `,
};

export const Variants = {
  name: 'Variantes',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; flex-wrap: wrap;">
      <zev-tag label="Default" variant="default"></zev-tag>
      <zev-tag label="Accent" variant="accent"></zev-tag>
      <zev-tag label="Outline" variant="outline"></zev-tag>
    </div>
    <div style="padding: 2rem; background: var(--zev-color-accent); display: flex; gap: 1rem; flex-wrap: wrap;">
      <zev-tag label="Ghost (em fundo azul)" variant="ghost"></zev-tag>
    </div>
  `,
};

export const Sizes = {
  name: 'Tamanhos',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; align-items: center;">
      <zev-tag label="Small" size="small"></zev-tag>
      <zev-tag label="Medium" size="medium"></zev-tag>
      <zev-tag label="Large" size="large"></zev-tag>
    </div>
  `,
};

export const Interactive = {
  name: 'Interativa',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; flex-wrap: wrap;">
      <zev-tag
        label="Clique em mim"
        interactive
        @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}
      ></zev-tag>
      <zev-tag
        label="React"
        interactive
        @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}
      ></zev-tag>
      <zev-tag
        label="TypeScript"
        interactive
        @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}
      ></zev-tag>
    </div>
  `,
};

export const Removable = {
  name: 'Removível',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; flex-wrap: wrap;">
      <zev-tag
        label="React"
        removable
        @tag-remove=${(e: CustomEvent) => action('tag-remove')(e.detail)}
      ></zev-tag>
      <zev-tag
        label="TypeScript"
        removable
        @tag-remove=${(e: CustomEvent) => action('tag-remove')(e.detail)}
      ></zev-tag>
      <zev-tag
        label="Node.js"
        removable
        @tag-remove=${(e: CustomEvent) => action('tag-remove')(e.detail)}
      ></zev-tag>
    </div>
  `,
};

export const SkillList = {
  name: 'Lista de Skills',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-secondary);">
      <h3 style="margin: 0 0 1rem; font-family: var(--zev-font-primary); color: var(--zev-color-text-primary); text-transform: uppercase; font-size: var(--zev-fs-small); letter-spacing: 0.1em;">
        Skills
      </h3>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <zev-tag label="React" interactive @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}></zev-tag>
        <zev-tag label="TypeScript" interactive @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}></zev-tag>
        <zev-tag label="Node.js" interactive @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}></zev-tag>
        <zev-tag label="GraphQL" interactive @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}></zev-tag>
        <zev-tag label="PostgreSQL" interactive @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}></zev-tag>
        <zev-tag label="Docker" interactive @tag-click=${(e: CustomEvent) => action('tag-click')(e.detail)}></zev-tag>
      </div>
    </div>
  `,
};

export const TechStackOnCard = {
  name: 'Tech Stack em Card',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-accent);">
      <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 4px; padding: 1.5rem;">
        <h3 style="margin: 0 0 1rem; font-family: var(--zev-font-primary); color: #fff; font-size: 1.25rem;">
          Project Name
        </h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <zev-tag label="React" variant="ghost" size="small"></zev-tag>
          <zev-tag label="TypeScript" variant="ghost" size="small"></zev-tag>
          <zev-tag label="Tailwind" variant="ghost" size="small"></zev-tag>
        </div>
      </div>
    </div>
  `,
};

export const AccentTags = {
  name: 'Tags Accent (Modal)',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <h3 style="margin: 0 0 1rem; font-family: var(--zev-font-primary); color: var(--zev-color-text-primary); font-size: var(--zev-fs-small); text-transform: uppercase; letter-spacing: 0.1em;">
        Tecnologias
      </h3>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <zev-tag label="React" variant="accent" size="small"></zev-tag>
        <zev-tag label="Next.js" variant="accent" size="small"></zev-tag>
        <zev-tag label="Prisma" variant="accent" size="small"></zev-tag>
        <zev-tag label="PostgreSQL" variant="accent" size="small"></zev-tag>
      </div>
    </div>
  `,
};
