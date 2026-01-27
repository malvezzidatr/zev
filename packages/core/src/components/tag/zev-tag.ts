import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-tag.styles.js';

export type TagVariant = 'default' | 'accent' | 'outline' | 'ghost';
export type TagSize = 'small' | 'medium' | 'large';

@customElement('zev-tag')
export class ZevTag extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Texto da tag */
  @property() label = '';

  /** Variante visual */
  @property() variant: TagVariant = 'default';

  /** Tamanho da tag */
  @property() size: TagSize = 'medium';

  /** Se a tag é interativa (clicável) */
  @property({ type: Boolean, reflect: true }) interactive = false;

  /** Se a tag pode ser removida */
  @property({ type: Boolean }) removable = false;

  private _handleClick() {
    if (this.interactive) {
      this.emitEvent('tag-click', { label: this.label });
    }
  }

  private _handleRemove(e: Event) {
    e.stopPropagation();
    this.emitEvent('tag-remove', { label: this.label });
  }

  private _renderRemoveButton() {
    if (!this.removable) return nothing;

    return html`
      <button
        class="tag__remove"
        @click=${this._handleRemove}
        aria-label="Remover ${this.label}"
        type="button"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    `;
  }

  render() {
    const classes = {
      tag: true,
      'tag--small': this.size === 'small',
      'tag--large': this.size === 'large',
      'tag--accent': this.variant === 'accent',
      'tag--outline': this.variant === 'outline',
      'tag--ghost': this.variant === 'ghost',
    };

    return html`
      <span
        class=${classMap(classes)}
        @click=${this._handleClick}
        role=${this.interactive ? 'button' : nothing}
        tabindex=${this.interactive ? '0' : nothing}
      >
        <slot>${this.label}</slot>
        ${this._renderRemoveButton()}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-tag': ZevTag;
  }
}
