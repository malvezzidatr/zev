import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { sectionStyles } from '../../base/shared-styles.js';
import { styles } from './zev-call-to-action.styles.js';

@customElement('zev-call-to-action')
export class ZevCallToAction extends ZevBase {
  static styles = [...ZevBase.styles, sectionStyles, styles];

  @property() tag = '[04]';
  @property() label = '';
  @property() heading = '';
  @property() description = '';
  @property({ attribute: 'button-text' }) buttonText = '';
  @property({ attribute: 'button-href' }) buttonHref = '#';

  private _handleClick(e: Event) {
    e.preventDefault();
    this.emitEvent('cta-click', { href: this.buttonHref });
  }

  render() {
    return html`
      <section class="section">
        <div class="section__container">
          <div class="section__header">
            <span class="section__tag">${this.tag}</span>
            <span class="cta__label">${this.label}</span>
          </div>
          <h2 class="cta__heading">${this.heading}</h2>
          <p class="cta__description">${this.description}</p>
          <a
            class="cta__button"
            href=${this.buttonHref}
            @click=${this._handleClick}
          >
            ${this.buttonText}
          </a>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-call-to-action': ZevCallToAction;
  }
}
