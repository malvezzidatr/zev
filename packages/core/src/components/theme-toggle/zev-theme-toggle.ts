import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-theme-toggle.styles.js';

export type ThemeMode = 'light' | 'dark';

@customElement('zev-theme-toggle')
export class ZevThemeToggle extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property() theme: ThemeMode = this._getInitialTheme();

  private _getInitialTheme(): ThemeMode {
    const stored = document.documentElement.getAttribute('data-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private _toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    this.emitEvent('theme-change', { theme: this.theme });
  }

  private _renderSunIcon() {
    return html`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-3a1 1 0 0 0 1-1V1a1 1 0 1 0-2 0v2a1 1 0 0 0 1 1zm0 18a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1zm9-10h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zM4 11H2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm14.07-5.66 1.41-1.41a1 1 0 1 0-1.41-1.41l-1.41 1.41a1 1 0 0 0 1.41 1.41zM5.93 17.66l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.41zm12.14 0a1 1 0 0 0-1.41 1.41l1.41 1.41a1 1 0 0 0 1.41-1.41l-1.41-1.41zM5.93 6.34a1 1 0 0 0 1.41-1.41L5.93 3.52a1 1 0 0 0-1.41 1.41l1.41 1.41z"/>
      </svg>
    `;
  }

  private _renderMoonIcon() {
    return html`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73A8.15 8.15 0 0 1 9.08 5.49a8.59 8.59 0 0 1 .25-2 1 1 0 0 0-.35-1 1 1 0 0 0-1.05-.17 10 10 0 1 0 13.71 10.68z"/>
      </svg>
    `;
  }

  render() {
    const label = this.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

    return html`
      <button
        class="toggle"
        @click=${this._toggle}
        aria-label=${label}
        title=${label}
      >
        ${this.theme === 'dark' ? this._renderSunIcon() : this._renderMoonIcon()}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-theme-toggle': ZevThemeToggle;
  }
}
