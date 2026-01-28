import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-badge.styles.js';

export type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral';

/**
 * Badge component for status indicators
 * @element zev-badge
 */
@customElement('zev-badge')
export class ZevBadge extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** The visual variant of the badge */
  @property() variant: BadgeVariant = 'neutral';

  /** Text label for the badge (alternative to slot) */
  @property() label = '';

  render() {
    const classes = {
      badge: true,
      'badge--success': this.variant === 'success',
      'badge--warning': this.variant === 'warning',
      'badge--info': this.variant === 'info',
      'badge--neutral': this.variant === 'neutral',
    };

    return html`
      <span class=${classMap(classes)}>
        <slot>${this.label}</slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-badge': ZevBadge;
  }
}
