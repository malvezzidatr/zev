import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-hero.styles.js';

@customElement('zev-hero')
export class ZevHero extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property() tag = '[01]';
  @property() label = '';
  @property() year = '';
  @property() name = '';
  @property() subtitle = '';
  @property({ attribute: 'cta-text' }) ctaText = '';
  @property({ attribute: 'cta-href' }) ctaHref = '#';

  private _handleCtaClick(e: Event) {
    e.preventDefault();
    this.emitEvent('cta-click', { href: this.ctaHref });
  }

  render() {
    return html`
      <section class="hero">
        <div class="hero__container">
          <div class="hero__label">
            <span class="hero__tag">${this.tag}</span>
            <span class="hero__label-text">${this.label}</span>
            <span class="hero__year">${this.year}</span>
          </div>

          <h1 class="hero__name">${this.name}</h1>

          <div class="hero__info">
            <p class="hero__subtitle">${this.subtitle}</p>
            ${this.ctaText ? html`
              <a class="hero__cta" href=${this.ctaHref} @click=${this._handleCtaClick}>
                ${this.ctaText}
                <span class="hero__cta-arrow">\u2192</span>
              </a>
            ` : ''}
          </div>
        </div>

        <div class="hero__scroll-indicator">
          <span>\u2193</span>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-hero': ZevHero;
  }
}
