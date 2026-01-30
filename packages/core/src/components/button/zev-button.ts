import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-button.styles.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline-light';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component with multiple variants and sizes
 * @element zev-button
 * @fires button-click - Fired when the button is clicked
 */
@customElement('zev-button')
export class ZevButton extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** The visual variant of the button */
  @property() variant: ButtonVariant = 'primary';

  /** The size of the button */
  @property() size: ButtonSize = 'md';

  /** Whether the button is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.emitEvent('button-click', { variant: this.variant });
  }

  render() {
    const classes = {
      btn: true,
      'btn--primary': this.variant === 'primary',
      'btn--secondary': this.variant === 'secondary',
      'btn--ghost': this.variant === 'ghost',
      'btn--outline-light': this.variant === 'outline-light',
      'btn--sm': this.size === 'sm',
      'btn--md': this.size === 'md',
      'btn--lg': this.size === 'lg',
    };

    return html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-button': ZevButton;
  }
}
