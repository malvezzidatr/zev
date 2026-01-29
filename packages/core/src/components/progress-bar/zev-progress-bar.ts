import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-progress-bar.styles.js';

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

@customElement('zev-progress-bar')
export class ZevProgressBar extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) label = '';
  @property({ type: Boolean, attribute: 'show-value' }) showValue = false;
  @property({ type: String, reflect: true }) variant: ProgressBarVariant = 'primary';
  @property({ type: String, reflect: true }) size: ProgressBarSize = 'md';
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) striped = false;
  @property({ type: Boolean, reflect: true }) animated = false;

  private get _percentage(): number {
    if (this.indeterminate) return 0;
    const percentage = (this.value / this.max) * 100;
    return Math.min(100, Math.max(0, percentage));
  }

  render() {
    const hasHeader = this.label || this.showValue;

    return html`
      <div class="progress" role="progressbar" aria-valuenow=${this.indeterminate ? nothing : this.value} aria-valuemin="0" aria-valuemax=${this.max} aria-label=${this.label || 'Progress'}>
        ${hasHeader ? html`
          <div class="progress__header">
            ${this.label ? html`<span class="progress__label">${this.label}</span>` : html`<span></span>`}
            ${this.showValue && !this.indeterminate ? html`<span class="progress__value">${Math.round(this._percentage)}%</span>` : nothing}
          </div>
        ` : nothing}
        <div class="progress__track">
          <div class="progress__bar" style="width: ${this._percentage}%"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-progress-bar': ZevProgressBar;
  }
}
