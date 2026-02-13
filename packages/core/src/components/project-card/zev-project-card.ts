import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-project-card.styles.js';

@customElement('zev-project-card')
export class ZevProjectCard extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property() number = '';
  @property() role = '';
  @property() title = '';
  @property() description = '';
  @property({ type: Array, attribute: 'tech-tags' }) techTags: string[] = [];

  private _handleClick() {
    this.emitEvent('card-click', {
      number: this.number,
      title: this.title,
    });
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  render() {
    return html`
      <article
        class="card"
        tabindex="0"
        role="article"
        aria-label=${this.title}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}>
        <div class="card__header">
          <span class="card__number">${this.number}</span>
          <span class="card__role">${this.role}</span>
        </div>
        <h3 class="card__title">${this.title}</h3>
        <p class="card__description">${this.description}</p>
        <div class="card__tags">
          ${this.techTags.map(tag => html`
            <span class="card__tag">${tag}</span>
          `)}
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-project-card': ZevProjectCard;
  }
}
