import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-call-to-action
 *
 * Seção de call-to-action com heading, descrição e botão primário.
 *
 * ### Características
 * - Background branco
 * - Heading em `fs-heading`, peso 900, uppercase
 * - Botão primário: fundo preto, hover muda para azul
 * - Layout com section padding padrão
 *
 * ### Eventos
 * - `cta-click`: Disparado ao clicar no botão, com `{ href }` no detail
 */
export default {
  title: 'Components/CallToAction',
  component: 'zev-call-to-action',
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
      description: 'Tag numerada da seção',
      table: { defaultValue: { summary: '[04]' } },
    },
    label: {
      control: 'text',
      description: 'Label do header da seção',
    },
    heading: {
      control: 'text',
      description: 'Título principal (uppercase)',
    },
    description: {
      control: 'text',
      description: 'Texto descritivo abaixo do heading',
    },
    buttonText: {
      control: 'text',
      description: 'Texto do botão CTA',
    },
    buttonHref: {
      control: 'text',
      description: 'Href do botão',
      table: { defaultValue: { summary: '#' } },
    },
  },
};

export const Default = {
  args: {
    tag: '[04]',
    label: 'Contact',
    heading: "Let's work together",
    description: "I'm always open to new opportunities and collaborations. Let's create something amazing.",
    buttonText: 'Get in touch',
    buttonHref: 'mailto:hello@example.com',
  },
  render: (args: any) => html`
    <zev-call-to-action
      tag=${args.tag}
      label=${args.label}
      heading=${args.heading}
      description=${args.description}
      button-text=${args.buttonText}
      button-href=${args.buttonHref}
      @cta-click=${(e: CustomEvent) => action('cta-click')(e.detail)}
    ></zev-call-to-action>
  `,
};

export const Portuguese = {
  name: 'Português',
  args: {
    tag: '[04]',
    label: 'Contato',
    heading: 'Vamos trabalhar juntos',
    description: 'Estou sempre aberto a novas oportunidades e colaborações. Vamos criar algo incrível.',
    buttonText: 'Entre em contato',
    buttonHref: 'mailto:hello@example.com',
  },
  render: (args: any) => html`
    <zev-call-to-action
      tag=${args.tag}
      label=${args.label}
      heading=${args.heading}
      description=${args.description}
      button-text=${args.buttonText}
      button-href=${args.buttonHref}
      @cta-click=${(e: CustomEvent) => action('cta-click')(e.detail)}
    ></zev-call-to-action>
  `,
};
