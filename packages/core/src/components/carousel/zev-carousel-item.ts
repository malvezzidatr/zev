import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';

@customElement('zev-carousel-item')
export class ZevCarouselItem extends ZevBase {
  static styles = [
    ...ZevBase.styles,
    css`
      :host {
        display: block;
        flex-shrink: 0;
        width: 100%;
        box-sizing: border-box;
      }

      .carousel-item {
        width: 100%;
        height: 100%;
      }

      /* Gap support from parent */
      :host([data-gap="sm"]) {
        padding: 0 0.25rem;
      }

      :host([data-gap="md"]) {
        padding: 0 0.5rem;
      }

      :host([data-gap="lg"]) {
        padding: 0 1rem;
      }
    `,
  ];

  render() {
    return html`
      <div class="carousel-item">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-carousel-item': ZevCarouselItem;
  }
}
