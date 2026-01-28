import { html } from 'lit';
import '@malvezzidatr/zev-core';

/**
 * ## zev-section-header
 *
 * Header de seção reutilizável com tag numerada e título.
 *
 * ### Características
 * - Tag opcional no formato [0X]
 * - Variantes de layout: inline, stacked, centered
 * - Tamanhos: small, medium, large
 * - Suporta título via slot ou prop
 *
 * ### Uso comum
 * - Headers de seções (About, Projects, Contact)
 * - Títulos de páginas internas
 * - Headers de cards ou modais
 */
export default {
  title: 'Components/SectionHeader',
  component: 'zev-section-header',
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
      description: 'Tag da seção (ex: [01], [02])',
      table: { defaultValue: { summary: '' } },
    },
    title: {
      control: 'text',
      description: 'Título da seção',
      table: { defaultValue: { summary: '' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['inline', 'stacked', 'centered'],
      description: 'Variante de layout',
      table: { defaultValue: { summary: 'inline' } },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do título',
      table: { defaultValue: { summary: 'medium' } },
    },
  },
};

export const Default = {
  args: {
    tag: '[01]',
    title: 'About',
    variant: 'inline',
    size: 'medium',
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-section-header
        tag=${args.tag}
        title=${args.title}
        variant=${args.variant}
        size=${args.size}
      ></zev-section-header>
    </div>
  `,
};

export const Variants = {
  name: 'Variantes de Layout',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; flex-direction: column; gap: 3rem;">
      <div>
        <p style="color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); font-size: 0.75rem; margin-bottom: 1rem;">INLINE (padrão)</p>
        <zev-section-header tag="[01]" title="About" variant="inline"></zev-section-header>
      </div>
      <div>
        <p style="color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); font-size: 0.75rem; margin-bottom: 1rem;">STACKED</p>
        <zev-section-header tag="[02]" title="Projects" variant="stacked"></zev-section-header>
      </div>
      <div>
        <p style="color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); font-size: 0.75rem; margin-bottom: 1rem;">CENTERED</p>
        <zev-section-header tag="[03]" title="Contact" variant="centered"></zev-section-header>
      </div>
    </div>
  `,
};

export const Sizes = {
  name: 'Tamanhos',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; flex-direction: column; gap: 3rem;">
      <div>
        <p style="color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); font-size: 0.75rem; margin-bottom: 1rem;">SMALL</p>
        <zev-section-header tag="[01]" title="Small Title" size="small"></zev-section-header>
      </div>
      <div>
        <p style="color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); font-size: 0.75rem; margin-bottom: 1rem;">MEDIUM (padrão)</p>
        <zev-section-header tag="[02]" title="Medium Title" size="medium"></zev-section-header>
      </div>
      <div>
        <p style="color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); font-size: 0.75rem; margin-bottom: 1rem;">LARGE</p>
        <zev-section-header tag="[03]" title="Large Title" size="large"></zev-section-header>
      </div>
    </div>
  `,
};

export const WithoutTag = {
  name: 'Sem Tag',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-section-header title="Just a Title"></zev-section-header>
    </div>
  `,
};

export const InContext = {
  name: 'Em Contexto (About Section)',
  render: () => html`
    <div style="padding: 4rem 2rem; background: var(--zev-color-bg-secondary);">
      <div style="max-width: 1200px; margin: 0 auto;">
        <zev-section-header tag="[02]" title="About"></zev-section-header>
        <p style="color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); line-height: 1.8; max-width: 600px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  `,
};

export const OnDarkBackground = {
  name: 'Em Fundo Escuro',
  render: () => html`
    <div style="padding: 4rem 2rem; background: var(--zev-color-accent);">
      <zev-section-header
        tag="[03]"
        title="Projects"
        style="--zev-color-text-primary: #fff; --zev-color-accent: #fff;"
      ></zev-section-header>
    </div>
  `,
};
