import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-select.styles.js';

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Select dropdown component
 * @element zev-select
 * @fires select-change - Fired when the selection changes
 */
@customElement('zev-select')
export class ZevSelect extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Array of options */
  @property({ type: Array }) options: SelectOption[] = [];

  /** Current selected value */
  @property() value = '';

  /** Placeholder text */
  @property() placeholder = 'Selecione uma opção';

  /** Whether the select is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    const selected = this.options.find(opt => opt.value === this.value);
    this.emitEvent('select-change', {
      value: this.value,
      label: selected?.label || '',
    });
  }

  render() {
    return html`
      <div class="select-wrapper">
        <select
          class="select"
          .value=${this.value}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
        >
          <option value="" ?disabled=${!!this.value} ?selected=${!this.value}>
            ${this.placeholder}
          </option>
          ${this.options.map(
            opt => html`
              <option value=${opt.value} ?selected=${opt.value === this.value}>
                ${opt.label}
              </option>
            `
          )}
        </select>
        <svg class="select__chevron" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-select': ZevSelect;
  }
}
