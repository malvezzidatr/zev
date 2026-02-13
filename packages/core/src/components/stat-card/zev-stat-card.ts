import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-stat-card.styles.js';

export type StatCardVariant = 'default' | 'accent';

/**
 * Stat card component for displaying statistics
 * @element zev-stat-card
 */
@customElement('zev-stat-card')
export class ZevStatCard extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** The statistic value to display */
  @property() value = '';

  /** Label describing the statistic */
  @property() label = '';

  /** Visual variant */
  @property() variant: StatCardVariant = 'default';

  render() {
    const classes = {
      'stat-card': true,
      'stat-card--accent': this.variant === 'accent',
    };

    return html`
      <div class=${classMap(classes)}>
        <div class="stat-card__icon">
          <slot name="icon"></slot>
        </div>
        ${this.value ? html`<div class="stat-card__value">${this.value}</div>` : nothing}
        ${this.label ? html`<div class="stat-card__label">${this.label}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-stat-card': ZevStatCard;
  }
}
