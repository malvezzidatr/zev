import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-timeline.styles.js';

export interface TimelineItemData {
  year: string;
  title: string;
  description: string;
}

@customElement('zev-timeline')
export class ZevTimeline extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Lista de items do timeline (alternativa ao slot) */
  @property({ type: Array }) items: TimelineItemData[] = [];

  /** Se mostra linha conectando os items */
  @property({ type: Boolean, reflect: true }) connected = false;

  private _updateChildrenConnected() {
    const children = this.querySelectorAll('zev-timeline-item');
    children.forEach(child => {
      if (this.connected) {
        child.setAttribute('connected', '');
      } else {
        child.removeAttribute('connected');
      }
    });
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('connected')) {
      this._updateChildrenConnected();
    }
  }

  firstUpdated() {
    this._updateChildrenConnected();
  }

  render() {
    const hasItems = this.items.length > 0;

    return html`
      <div class="timeline">
        ${hasItems
          ? this.items.map(item => html`
              <zev-timeline-item
                year=${item.year}
                title=${item.title}
                description=${item.description}
                ?connected=${this.connected}
              ></zev-timeline-item>
            `)
          : html`<slot @slotchange=${this._updateChildrenConnected}></slot>`
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-timeline': ZevTimeline;
  }
}
