import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-timeline-item.styles.js';

@customElement('zev-timeline-item')
export class ZevTimelineItem extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Ano ou período */
  @property() year = '';

  /** Título do item */
  @property() title = '';

  /** Descrição do item */
  @property() description = '';

  /** Se mostra linha conectora (usado dentro de zev-timeline) */
  @property({ type: Boolean, reflect: true }) connected = false;

  render() {
    return html`
      <div class="item">
        <div class="item__dot"></div>
        <div class="item__content">
          ${this.year ? html`<span class="item__year">${this.year}</span>` : nothing}
          <h4 class="item__title">
            <slot name="title">${this.title}</slot>
          </h4>
          <p class="item__description">
            <slot>${this.description}</slot>
          </p>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-timeline-item': ZevTimelineItem;
  }
}
