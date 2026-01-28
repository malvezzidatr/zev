import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-job-card.styles.js';
import '../tag/zev-tag.js';
import '../badge/zev-badge.js';

/**
 * Job card component for displaying job listings
 * @element zev-job-card
 * @fires card-click - Fired when the card is clicked
 */
@customElement('zev-job-card')
export class ZevJobCard extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Job title */
  @property() title = '';

  /** Company name */
  @property() company = '';

  /** Job location */
  @property() location = '';

  /** Technology tags */
  @property({ type: Array }) tags: string[] = [];

  /** Salary information */
  @property() salary = '';

  /** Whether the job is remote */
  @property({ type: Boolean }) remote = false;

  /** When the job was posted */
  @property({ attribute: 'posted-at' }) postedAt = '';

  /** Job URL */
  @property() url = '';

  /** Job source (GitHub, LinkedIn, Gupy) */
  @property() source = '';

  private _handleClick() {
    this.emitEvent('card-click', {
      title: this.title,
      company: this.company,
      url: this.url,
    });
  }

  private _renderLocationIcon() {
    return html`
      <svg viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `;
  }

  private _renderSalaryIcon() {
    return html`
      <svg viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
      </svg>
    `;
  }

  render() {
    return html`
      <article class="job-card" @click=${this._handleClick}>
        <div class="job-card__header">
          <h3 class="job-card__title">${this.title}</h3>
          ${this.remote ? html`<zev-badge variant="success" label="Remoto"></zev-badge>` : nothing}
        </div>

        <div class="job-card__company">${this.company}</div>

        <div class="job-card__meta">
          ${this.location
            ? html`
                <span class="job-card__meta-item">
                  ${this._renderLocationIcon()}
                  ${this.location}
                </span>
              `
            : nothing}
          ${this.salary
            ? html`
                <span class="job-card__meta-item">
                  ${this._renderSalaryIcon()}
                  ${this.salary}
                </span>
              `
            : nothing}
        </div>

        ${this.tags.length > 0
          ? html`
              <div class="job-card__tags">
                ${this.tags.slice(0, 5).map(
                  tag => html`<zev-tag label=${tag} size="small"></zev-tag>`
                )}
              </div>
            `
          : nothing}

        <div class="job-card__footer">
          <span class="job-card__posted">${this.postedAt}</span>
          ${this.source
            ? html`<span class="job-card__source">${this.source}</span>`
            : nothing}
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-job-card': ZevJobCard;
  }
}
