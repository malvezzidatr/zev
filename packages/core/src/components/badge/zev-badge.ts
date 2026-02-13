import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-badge.styles.js';

export type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral' | 'match';
export type BadgeLevel = 'low' | 'medium' | 'high';

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

  /** Match level for the match variant */
  @property() level: BadgeLevel = 'medium';

  render() {
    const classes = {
      badge: true,
      'badge--success': this.variant === 'success',
      'badge--warning': this.variant === 'warning',
      'badge--info': this.variant === 'info',
      'badge--neutral': this.variant === 'neutral',
      'badge--match': this.variant === 'match',
      'badge--match-low': this.variant === 'match' && this.level === 'low',
      'badge--match-medium': this.variant === 'match' && this.level === 'medium',
      'badge--match-high': this.variant === 'match' && this.level === 'high',
    };

    return html`
      <span class=${classMap(classes)} role="status">
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
