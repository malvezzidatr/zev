import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-input.styles.js';

export type InputIcon = 'search' | 'filter' | 'none';

/**
 * Input component with optional icon and clear button
 * @element zev-input
 * @fires input-change - Fired when the input value changes
 * @fires input-clear - Fired when the clear button is clicked
 */
@customElement('zev-input')
export class ZevInput extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Label text displayed above the input */
  @property() label = '';

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

  private _handleClear() {
    this.value = '';
    this.emitEvent('input-clear', {});
    this.emitEvent('input-change', { value: '' });
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

  private _renderClearButton() {
    if (!this.value || this.disabled) return nothing;

    return html`
      <button
        type="button"
        class="input__clear"
        @click=${this._handleClear}
        aria-label="Limpar campo"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    `;
  }

  private _renderLabel() {
    if (!this.label) return nothing;

    return html`<label class="input__label">${this.label}</label>`;
  }

  render() {
    const hasIcon = this.icon !== 'none';
    const hasClear = !!this.value && !this.disabled;

    return html`
      <div class="input-container">
        ${this._renderLabel()}
        <div class="input-wrapper">
          ${this._renderIcon()}
          <input
            type="text"
            class="input ${hasIcon ? 'input--with-icon' : ''} ${hasClear ? 'input--with-clear' : ''}"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
          />
          ${this._renderClearButton()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-input': ZevInput;
  }
}
