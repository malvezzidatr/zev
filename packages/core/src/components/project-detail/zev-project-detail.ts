import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-project-detail.styles.js';

export interface ProjectData {
  number: string;
  role: string;
  title: string;
  description: string;
  techTags: string[];
  highlights: string[];
}

@customElement('zev-project-detail')
export class ZevProjectDetail extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Object }) project: ProjectData | null = null;

  private _boundKeydown = this._handleKeydown.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._boundKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._boundKeydown);
    document.body.style.overflow = '';
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      document.body.style.overflow = this.open ? 'hidden' : '';
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open) {
      this._requestClose();
    }
  }

  private _handleOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal__overlay')) {
      this._requestClose();
    }
  }

  private _requestClose() {
    this.emitEvent('close');
  }

  render() {
    if (!this.open || !this.project) return nothing;

    return html`
      <div class="modal__overlay" @click=${this._handleOverlayClick}>
        <div class="modal__content" role="dialog" aria-modal="true">
          <button class="modal__close" @click=${this._requestClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="modal__header">
            <span class="modal__number">${this.project.number}</span>
            <span class="modal__role">${this.project.role}</span>
          </div>

          <h2 class="modal__title">${this.project.title}</h2>

          <div class="modal__tags">
            ${this.project.techTags.map(tag => html`
              <span class="modal__tag">${tag}</span>
            `)}
          </div>

          <p class="modal__description">${this.project.description}</p>

          ${this.project.highlights.length > 0 ? html`
            <div class="modal__highlights">
              <h3 class="modal__highlights-title">Highlights</h3>
              <ul class="modal__highlights-list">
                ${this.project.highlights.map(item => html`<li>${item}</li>`)}
              </ul>
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-project-detail': ZevProjectDetail;
  }
}
