import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-theme-toggle
 *
 * Botão de alternância entre dark mode e light mode.
 *
 * ### Características
 * - Ícone de lua (light mode) ou sol (dark mode)
 * - Botão circular com borda sutil
 * - Hover destaca com cor accent
 * - Altera `data-theme` no `<html>` automaticamente
 * - Detecta tema inicial via `prefers-color-scheme` ou `data-theme` existente
 *
 * ### Eventos
 * - `theme-change`: Disparado ao clicar, com `{ theme: 'light' | 'dark' }` no detail
 */
export default {
  title: 'Components/ThemeToggle',
  component: 'zev-theme-toggle',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Tema atual do toggle',
      table: { defaultValue: { summary: 'auto-detected' } },
    },
  },
};

export const Default = {
  args: {
    theme: 'light',
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; align-items: center; gap: 1rem;">
      <zev-theme-toggle
        theme=${args.theme}
        @theme-change=${(e: CustomEvent) => action('theme-change')(e.detail)}
      ></zev-theme-toggle>
      <span style="color: var(--zev-color-text-primary); font-family: var(--zev-font-primary); font-size: var(--zev-fs-body);">
        Clique para alternar o tema
      </span>
    </div>
  `,
};

export const DarkMode = {
  name: 'Dark Mode',
  args: {
    theme: 'dark',
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; align-items: center; gap: 1rem;">
      <zev-theme-toggle
        theme=${args.theme}
        @theme-change=${(e: CustomEvent) => action('theme-change')(e.detail)}
      ></zev-theme-toggle>
      <span style="color: var(--zev-color-text-primary); font-family: var(--zev-font-primary); font-size: var(--zev-fs-body);">
        Clique para alternar o tema
      </span>
    </div>
  `,
};

export const InNavbar = {
  name: 'Dentro da Navbar',
  render: () => html`
    <div style="display: flex; align-items: center; justify-content: flex-end; padding: 1rem 2rem; background: var(--zev-color-navbar-bg); backdrop-filter: blur(10px); border-bottom: 1px solid var(--zev-color-border-tag);">
      <span style="margin-right: auto; font-weight: 700; color: var(--zev-color-text-primary); font-family: var(--zev-font-primary);">CM</span>
      <zev-theme-toggle
        @theme-change=${(e: CustomEvent) => action('theme-change')(e.detail)}
      ></zev-theme-toggle>
    </div>
  `,
};
