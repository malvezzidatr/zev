import { html } from 'lit';
import '@zev/core';

/**
 * ## zev-footer
 *
 * Footer com links de contato, informações e nome decorativo.
 *
 * ### Características
 * - Background preto (`--zev-color-black`)
 * - Grid 2 colunas: links de contato | informações
 * - Links com opacity 0.8, hover → 1 + cor azul
 * - Info labels em uppercase, opacity 0.5
 * - Nome decorativo grande com opacity 0.05 (absoluto)
 * - Borda sutil no bottom (`rgba(255,255,255,0.1)`)
 * - Colapsa para 1 coluna em mobile (< 768px)
 *
 * ### Dados
 * - `links`: Array de `{ label, href }` — links de contato
 * - `info`: Array de `{ label, value }` — informações extras
 */
export default {
  title: 'Components/Footer',
  component: 'zev-footer',
  tags: ['autodocs'],
  argTypes: {
    heading: {
      control: 'text',
      description: 'Título da seção de contato',
    },
    links: {
      control: 'object',
      description: 'Array de `{ label, href }` com links de contato',
    },
    info: {
      control: 'object',
      description: 'Array de `{ label, value }` com informações',
    },
    decorativeName: {
      control: 'text',
      description: 'Nome grande decorativo com baixa opacidade',
    },
    copyright: {
      control: 'text',
      description: 'Texto de copyright',
    },
  },
};

export const Default = {
  args: {
    heading: 'Get in touch',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Email', href: 'mailto:hello@example.com' },
    ],
    info: [
      { label: 'Location', value: 'São Paulo, Brazil' },
      { label: 'Availability', value: 'Open to opportunities' },
    ],
    decorativeName: 'CAIO MALVEZZI',
    copyright: '© 2024 All rights reserved',
  },
  render: (args: any) => html`
    <zev-footer
      heading=${args.heading}
      .links=${args.links}
      .info=${args.info}
      decorative-name=${args.decorativeName}
      copyright=${args.copyright}
    ></zev-footer>
  `,
};

export const Portuguese = {
  name: 'Português',
  args: {
    heading: 'Entre em contato',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Behance', href: 'https://behance.net' },
      { label: 'Email', href: 'mailto:hello@example.com' },
    ],
    info: [
      { label: 'Localização', value: 'São Paulo, Brasil' },
      { label: 'Disponibilidade', value: 'Aberto a propostas' },
      { label: 'Stack', value: 'React, TypeScript, Node.js' },
    ],
    decorativeName: 'CAIO MALVEZZI',
    copyright: '© 2024 Todos os direitos reservados',
  },
  render: (args: any) => html`
    <zev-footer
      heading=${args.heading}
      .links=${args.links}
      .info=${args.info}
      decorative-name=${args.decorativeName}
      copyright=${args.copyright}
    ></zev-footer>
  `,
};

export const Minimal = {
  name: 'Mínimo',
  args: {
    heading: 'Contact',
    links: [
      { label: 'Email', href: 'mailto:hello@example.com' },
    ],
    info: [],
    decorativeName: '',
    copyright: '© 2024',
  },
  render: (args: any) => html`
    <zev-footer
      heading=${args.heading}
      .links=${args.links}
      .info=${args.info}
      decorative-name=${args.decorativeName}
      copyright=${args.copyright}
    ></zev-footer>
  `,
};
