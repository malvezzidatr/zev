import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-input.styles.js';

export type InputIcon = 'search' | 'filter' | 'none';

/**
 * Input component with optional icon
 * @element zev-input
 * @fires input-change - Fired when the input value changes
 */
@customElement('zev-input')
export class ZevInput extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Placeholder text */
  @property() placeholder = '';

  /** Current value */
  @property() value = '';

  /** Icon to display */
  @property() icon: InputIcon = 'none';

  /** Whether the input is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.emitEvent('input-change', { value: this.value });
  }

  private _renderIcon() {
    if (this.icon === 'none') return nothing;

    if (this.icon === 'search') {
      return html`
        <svg class="input__icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      `;
    }

    if (this.icon === 'filter') {
      return html`
        <svg class="input__icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
        </svg>
      `;
    }

    return nothing;
  }

  render() {
    const hasIcon = this.icon !== 'none';

    return html`
      <div class="input-wrapper">
        ${this._renderIcon()}
        <input
          type="text"
          class="input ${hasIcon ? 'input--with-icon' : ''}"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-input': ZevInput;
  }
}
