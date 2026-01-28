import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-empty-state.styles.js';

/**
 * Empty state component for when no content is available
 * @element zev-empty-state
 * @slot icon - Custom icon slot
 * @slot action - Custom action slot (button, link, etc.)
 */
@customElement('zev-empty-state')
export class ZevEmptyState extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Title text */
  @property() title = '';

  /** Description text */
  @property() description = '';

  private _renderDefaultIcon() {
    return html`
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
      </svg>
    `;
  }

  render() {
    return html`
      <div class="empty-state">
        <div class="empty-state__icon">
          <slot name="icon">${this._renderDefaultIcon()}</slot>
        </div>
        ${this.title ? html`<h3 class="empty-state__title">${this.title}</h3>` : nothing}
        ${this.description ? html`<p class="empty-state__description">${this.description}</p>` : nothing}
        <div class="empty-state__action">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-empty-state': ZevEmptyState;
  }
}
