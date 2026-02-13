import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-navbar.styles.js';

export interface NavLink {
  label: string;
  href: string;
}

@customElement('zev-navbar')
export class ZevNavbar extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property() logo = 'CM';
  @property({ attribute: 'logo-href' }) logoHref = '/';
  @property({ type: Array }) links: NavLink[] = [];
  @property() lang = 'pt';
  @property({ attribute: 'lang-label' }) langLabel = 'EN';
  @property({ type: Boolean, attribute: 'show-lang-toggle' }) showLangToggle = true;

  @state() private _menuOpen = false;

  private _toggleMenu() {
    this._menuOpen = !this._menuOpen;
    if (this._menuOpen) {
      // Focus first link when menu opens
      requestAnimationFrame(() => {
        const firstLink = this.shadowRoot?.querySelector<HTMLElement>('.navbar__link');
        firstLink?.focus();
      });
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this._menuOpen) {
      this._menuOpen = false;
      // Return focus to hamburger
      const hamburger = this.shadowRoot?.querySelector<HTMLElement>('.navbar__hamburger');
      hamburger?.focus();
    }
  }

  private _handleLangToggle() {
    this.emitEvent('lang-toggle', { lang: this.lang === 'pt' ? 'en' : 'pt' });
  }

  private _handleNavClick(link: NavLink) {
    this._menuOpen = false;
    this.emitEvent('nav-click', { link });
  }

  render() {
    return html`
      <nav class="navbar" aria-label="Navegação principal" @keydown=${this._handleKeydown}>
        <div class="navbar__container">
          <a class="navbar__logo" href=${this.logoHref}>${this.logo}</a>

          <div class="navbar__actions">
            ${this.showLangToggle ? html`
              <button class="navbar__lang-toggle" @click=${this._handleLangToggle} aria-label="Idioma: ${this.langLabel}">
                ${this.langLabel}
              </button>
            ` : nothing}

            <div class=${classMap({
              'navbar__links': true,
              'navbar__links--open': this._menuOpen,
            })}>
              ${this.links.map(link => html`
                <a
                  class="navbar__link"
                  href=${link.href}
                  @click=${() => this._handleNavClick(link)}
                >${link.label}</a>
              `)}
            </div>

            <button
              class=${classMap({
                'navbar__hamburger': true,
                'navbar__hamburger--active': this._menuOpen,
              })}
              @click=${this._toggleMenu}
              aria-label="Toggle menu"
              aria-expanded=${this._menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-navbar': ZevNavbar;
  }
}
