import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-navbar
 *
 * Barra de navegação fixa com fundo translúcido e blur.
 * Inclui logo, toggle de idioma, links de navegação e menu hamburger para mobile.
 *
 * ### Características
 * - Posição fixa no topo com `backdrop-filter: blur(10px)`
 * - Toggle de idioma opcional com hover azul
 * - Links com underline animado no hover
 * - Menu hamburger em telas < 768px com slide-in lateral
 *
 * ### Eventos
 * - `lang-toggle`: Disparado ao clicar no toggle de idioma
 * - `nav-click`: Disparado ao clicar em um link de navegação
 *
 * ### Props
 * - `logo-href`: URL para onde o logo redireciona ao ser clicado (default: `/`)
 */
export default {
  title: 'Components/Navbar',
  component: 'zev-navbar',
  tags: ['autodocs'],
  argTypes: {
    logo: {
      control: 'text',
      description: 'Texto exibido como logo',
      table: { defaultValue: { summary: 'CM' } },
    },
    logoHref: {
      control: 'text',
      description: 'URL de redirecionamento ao clicar no logo',
      table: { defaultValue: { summary: '/' } },
    },
    lang: {
      control: 'select',
      options: ['pt', 'en'],
      description: 'Idioma atual',
      table: { defaultValue: { summary: 'pt' } },
    },
    langLabel: {
      control: 'text',
      description: 'Label do botão de idioma',
      table: { defaultValue: { summary: 'EN' } },
    },
    links: {
      control: 'object',
      description: 'Array de links de navegação `{ label, href }`',
    },
    showLangToggle: {
      control: 'boolean',
      description: 'Se o botão de alternar idioma está visível',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export const Default = {
  args: {
    logo: 'CM',
    logoHref: '/',
    lang: 'pt',
    langLabel: 'EN',
    showLangToggle: true,
    links: [
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  render: (args: any) => html`
    <zev-navbar
      .logo=${args.logo}
      .logoHref=${args.logoHref}
      .lang=${args.lang}
      .langLabel=${args.langLabel}
      .showLangToggle=${args.showLangToggle}
      .links=${args.links}
      @lang-toggle=${(e: CustomEvent) => action('lang-toggle')(e.detail)}
      @nav-click=${(e: CustomEvent) => action('nav-click')(e.detail)}
    ></zev-navbar>
    <div style="height: 200vh; padding: 6rem 2rem;">
      <p style="color: #888;">Scroll para ver o comportamento fixo da navbar.</p>
    </div>
  `,
};

export const English = {
  args: {
    logo: 'CM',
    lang: 'en',
    langLabel: 'PT',
    links: [
      { label: 'Sobre', href: '#about' },
      { label: 'Projetos', href: '#projects' },
      { label: 'Contato', href: '#contact' },
    ],
  },
  render: (args: any) => html`
    <zev-navbar
      .logo=${args.logo}
      .lang=${args.lang}
      .langLabel=${args.langLabel}
      .links=${args.links}
      @lang-toggle=${(e: CustomEvent) => action('lang-toggle')(e.detail)}
      @nav-click=${(e: CustomEvent) => action('nav-click')(e.detail)}
    ></zev-navbar>
  `,
};

export const CustomLogo = {
  args: {
    logo: 'ZEV',
    lang: 'pt',
    langLabel: 'EN',
    links: [
      { label: 'Docs', href: '#docs' },
      { label: 'Components', href: '#components' },
    ],
  },
  render: (args: any) => html`
    <zev-navbar
      .logo=${args.logo}
      .lang=${args.lang}
      .langLabel=${args.langLabel}
      .links=${args.links}
      @lang-toggle=${(e: CustomEvent) => action('lang-toggle')(e.detail)}
      @nav-click=${(e: CustomEvent) => action('nav-click')(e.detail)}
    ></zev-navbar>
  `,
};

export const WithoutLangToggle = {
  name: 'Sem Toggle de Idioma',
  render: () => html`
    <zev-navbar
      logo="ZEV"
      .showLangToggle=${false}
      .links=${[
        { label: 'Home', href: '#home' },
        { label: 'Docs', href: '#docs' },
        { label: 'Components', href: '#components' },
      ]}
      @nav-click=${(e: CustomEvent) => action('nav-click')(e.detail)}
    ></zev-navbar>
    <div style="height: 200vh; padding: 6rem 2rem;">
      <p style="color: #888;">Navbar sem o botão de troca de idioma.</p>
    </div>
  `,
};
