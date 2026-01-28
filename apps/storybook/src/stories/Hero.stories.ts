import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-hero
 *
 * Seção hero full-height com nome em display, label, subtítulo e CTA.
 *
 * ### Características
 * - Ocupa `min-height: 100vh`
 * - Nome com tipografia display (até 12rem)
 * - CTA com arrow animado no hover (translateX)
 * - Scroll indicator com animação bounce
 * - Responsivo: nome reduz em mobile, info empilha verticalmente
 *
 * ### Eventos
 * - `cta-click`: Disparado ao clicar no link CTA
 */
export default {
  title: 'Components/Hero',
  component: 'zev-hero',
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
      description: 'Tag numerada da seção',
      table: { defaultValue: { summary: '[01]' } },
    },
    label: {
      control: 'text',
      description: 'Label exibido acima do nome',
    },
    year: {
      control: 'text',
      description: 'Ano exibido ao lado do label',
    },
    name: {
      control: 'text',
      description: 'Nome principal em display (uppercase)',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo abaixo do nome',
    },
    ctaText: {
      control: 'text',
      description: 'Texto do link CTA. Se vazio, CTA não aparece.',
    },
    ctaHref: {
      control: 'text',
      description: 'Href do CTA',
      table: { defaultValue: { summary: '#' } },
    },
  },
};

export const Default = {
  args: {
    tag: '[01]',
    label: 'Portfolio',
    year: '2024',
    name: 'CAIO MALVEZZI',
    subtitle: 'Frontend Developer & UI Designer',
    ctaText: 'See my work',
    ctaHref: '#projects',
  },
  render: (args: any) => html`
    <zev-hero
      tag=${args.tag}
      label=${args.label}
      year=${args.year}
      name=${args.name}
      subtitle=${args.subtitle}
      cta-text=${args.ctaText}
      cta-href=${args.ctaHref}
      @cta-click=${(e: CustomEvent) => action('cta-click')(e.detail)}
    ></zev-hero>
  `,
};

export const WithoutCTA = {
  name: 'Sem CTA',
  args: {
    tag: '[01]',
    label: 'Portfolio',
    year: '2024',
    name: 'JOHN DOE',
    subtitle: 'Creative Developer',
    ctaText: '',
  },
  render: (args: any) => html`
    <zev-hero
      tag=${args.tag}
      label=${args.label}
      year=${args.year}
      name=${args.name}
      subtitle=${args.subtitle}
    ></zev-hero>
  `,
};

export const LongName = {
  name: 'Nome Longo',
  args: {
    name: 'ALESSANDRO MONTENEGRO',
    subtitle: 'Fullstack Developer',
    ctaText: 'View projects',
    ctaHref: '#projects',
  },
  render: (args: any) => html`
    <zev-hero
      name=${args.name}
      subtitle=${args.subtitle}
      cta-text=${args.ctaText}
      cta-href=${args.ctaHref}
      @cta-click=${(e: CustomEvent) => action('cta-click')(e.detail)}
    ></zev-hero>
  `,
};
