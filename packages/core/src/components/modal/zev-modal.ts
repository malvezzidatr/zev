import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-modal.styles.js';
import { activateFocusTrap, type FocusTrapResult } from '../../base/focus-trap.js';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@customElement('zev-modal')
export class ZevModal extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) title = '';
  @property({ type: String, reflect: true }) size: ModalSize = 'md';
  @property({ type: Boolean, attribute: 'hide-close' }) hideClose = false;
  @property({ type: Boolean, attribute: 'close-on-overlay' }) closeOnOverlay = true;
  @property({ type: Boolean, attribute: 'close-on-escape' }) closeOnEscape = true;

  private static _openCount = 0;
  private _boundKeydown = this._handleKeydown.bind(this);
  private _focusTrap: FocusTrapResult | null = null;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._boundKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._boundKeydown);
    this._focusTrap?.deactivate();
    this._focusTrap = null;
    if (this.open) {
      ZevModal._openCount = Math.max(0, ZevModal._openCount - 1);
      if (ZevModal._openCount === 0) {
        document.body.style.overflow = '';
      }
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        ZevModal._openCount++;
        document.body.style.overflow = 'hidden';
        this.emitEvent('modal-open');
        requestAnimationFrame(() => {
          const content = this.shadowRoot?.querySelector<HTMLElement>('.modal__content');
          if (content) {
            this._focusTrap = activateFocusTrap(content);
          }
        });
      } else {
        this._focusTrap?.deactivate();
        this._focusTrap = null;
        ZevModal._openCount = Math.max(0, ZevModal._openCount - 1);
        if (ZevModal._openCount === 0) {
          document.body.style.overflow = '';
        }
      }
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open && this.closeOnEscape) {
      this._requestClose();
    }
  }

  private _handleOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal__overlay') && this.closeOnOverlay) {
      this._requestClose();
    }
  }

  private _requestClose() {
    this.emitEvent('modal-close');
  }

  render() {
    if (!this.open) return nothing;

    return html`
      <div class="modal__overlay" @click=${this._handleOverlayClick}>
        <div class="modal__content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          ${this.title || !this.hideClose ? html`
            <div class="modal__header">
              <h2 id="modal-title" class="modal__title">${this.title}</h2>
              ${!this.hideClose ? html`
                <button class="modal__close" @click=${this._requestClose} aria-label="Fechar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              ` : nothing}
            </div>
          ` : nothing}

          <div class="modal__body">
            <slot></slot>
          </div>

          <slot name="footer">
            <div class="modal__footer" style="display: none;"></div>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-modal': ZevModal;
  }
}
