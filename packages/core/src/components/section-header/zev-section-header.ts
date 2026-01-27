import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-section-header.styles.js';

export type SectionHeaderVariant = 'inline' | 'stacked' | 'centered';
export type SectionHeaderSize = 'small' | 'medium' | 'large';

@customElement('zev-section-header')
export class ZevSectionHeader extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Tag da seção (ex: [01], [02]) */
  @property() tag = '';

  /** Título da seção */
  @property() title = '';

  /** Variante de layout */
  @property({ reflect: true }) variant: SectionHeaderVariant = 'inline';

  /** Tamanho do título */
  @property({ reflect: true }) size: SectionHeaderSize = 'medium';

  render() {
    return html`
      <header class="header">
        ${this.tag ? html`<span class="header__tag">${this.tag}</span>` : nothing}
        <h2 class="header__title">
          <slot>${this.title}</slot>
        </h2>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-section-header': ZevSectionHeader;
  }
}
