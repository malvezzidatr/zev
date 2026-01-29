import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-sticky-sidebar.styles.js';

export type SidebarVariant = 'primary' | 'success' | 'warning' | 'info' | 'neutral';

@customElement('zev-sticky-sidebar')
export class ZevStickySidebar extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property({ type: String })
  image = '';

  @property({ type: String })
  title = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  variant: SidebarVariant = 'primary';

  @property({ type: Boolean, reflect: true })
  sticky = false;

  private renderImage() {
    if (this.image) {
      return html`
        <div class="sidebar__image-container">
          <img
            class="sidebar__image"
            src="${this.image}"
            alt="${this.title || 'Sidebar image'}"
            loading="lazy"
          />
        </div>
      `;
    }

    return html`
      <div class="sidebar__image-container sidebar__image--placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
    `;
  }

  render() {
    return html`
      <aside class="sidebar">
        <div class="sidebar__accent sidebar__accent--${this.variant}"></div>
        ${this.renderImage()}
        <div class="sidebar__content">
          ${this.title ? html`<h3 class="sidebar__title">${this.title}</h3>` : nothing}
          ${this.description ? html`<p class="sidebar__description">${this.description}</p>` : nothing}
          <div class="sidebar__slot">
            <slot></slot>
          </div>
        </div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-sticky-sidebar': ZevStickySidebar;
  }
}
