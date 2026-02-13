import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-loader.styles.js';

export type LoaderSize = 'sm' | 'md' | 'lg';

/**
 * Skeleton loader component for loading states
 * @element zev-loader
 */
@customElement('zev-loader')
export class ZevLoader extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** The size of the skeleton loader */
  @property() size: LoaderSize = 'md';

  /** Custom width (e.g. '200px', '100%') */
  @property() width = '';

  /** Custom height (e.g. '20px', '2rem') */
  @property() height = '';

  render() {
    const classes = {
      skeleton: true,
      'skeleton--sm': this.size === 'sm',
      'skeleton--md': this.size === 'md',
      'skeleton--lg': this.size === 'lg',
    };

    const inlineStyle = [
      this.width ? `width: ${this.width}` : '',
      this.height ? `height: ${this.height}` : '',
    ].filter(Boolean).join('; ');

    return html`<div class=${classMap(classes)} style=${inlineStyle || nothing}></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-loader': ZevLoader;
  }
}
