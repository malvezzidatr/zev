import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-skill-card.styles.js';

export type SkillBadgeVariant = 'differential' | 'required' | 'optional';
export type ResourceType = 'docs' | 'video' | 'article' | 'course';

export interface SkillResource {
  label: string;
  url: string;
  type: ResourceType;
}

/**
 * Skill card accordion component for educational content
 * @element zev-skill-card
 * @fires toggle - Fired when accordion is expanded/collapsed
 * @fires resource-click - Fired when a resource link is clicked
 */
@customElement('zev-skill-card')
export class ZevSkillCard extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Title of the skill */
  @property() title = '';

  /** Badge variant */
  @property() badge: SkillBadgeVariant = 'required';

  /** Badge label (optional, defaults based on variant) */
  @property() badgeLabel = '';

  /** Why this skill is important */
  @property() importance = '';

  /** What to focus on */
  @property() focusPoints = '';

  /** Resources for learning */
  @property({ type: Array }) resources: SkillResource[] = [];

  /** Whether the accordion is open */
  @property({ type: Boolean, reflect: true }) open = false;

  private _getBadgeLabel(): string {
    if (this.badgeLabel) return this.badgeLabel;

    switch (this.badge) {
      case 'differential': return 'DIFERENCIAL';
      case 'required': return 'OBRIGATÓRIO';
      case 'optional': return 'OPCIONAL';
      default: return '';
    }
  }

  private _getResourceTypeLabel(type: ResourceType): string {
    switch (type) {
      case 'docs': return 'DOCS';
      case 'video': return 'VIDEO';
      case 'article': return 'ARTIGO';
      case 'course': return 'CURSO';
    }
  }

  private _handleToggle() {
    this.open = !this.open;
    this.emitEvent('toggle', { open: this.open });
  }

  private _handleResourceClick(resource: SkillResource, e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.emitEvent('resource-click', {
      label: resource.label,
      url: resource.url,
      type: resource.type
    });

    // Open link in new tab
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  }

  render() {
    const hasContent = this.importance || this.focusPoints || this.resources.length > 0;

    return html`
      <div class="skill-card ${this.open ? 'skill-card--open' : ''}">
        <button
          class="skill-card__header"
          @click=${this._handleToggle}
          aria-expanded=${this.open}
          aria-controls="content"
        >
          <div class="skill-card__header-content">
            <h3 class="skill-card__title">${this.title}</h3>
            <span class="skill-card__badge skill-card__badge--${this.badge}">
              ${this._getBadgeLabel()}
            </span>
          </div>
          ${hasContent ? html`
            <svg class="skill-card__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          ` : nothing}
        </button>

        ${hasContent ? html`
          <div class="skill-card__content" id="content">
            <div class="skill-card__content-inner">
              ${this.importance ? html`
                <div class="skill-card__section">
                  <h4 class="skill-card__section-title">Por que é importante:</h4>
                  <p class="skill-card__section-text">${this.importance}</p>
                </div>
              ` : nothing}

              ${this.focusPoints ? html`
                <div class="skill-card__section">
                  <h4 class="skill-card__section-title">O que focar:</h4>
                  <p class="skill-card__section-text">${this.focusPoints}</p>
                </div>
              ` : nothing}

              ${this.resources.length > 0 ? html`
                <div class="skill-card__section skill-card__resources">
                  <h4 class="skill-card__section-title">Recursos para estudar:</h4>
                  <ul class="skill-card__resource-list">
                    ${this.resources.map(resource => html`
                      <li class="skill-card__resource-item">
                        <a
                          href=${resource.url}
                          class="skill-card__resource-link"
                          @click=${(e: Event) => this._handleResourceClick(resource, e)}
                        >
                          ${resource.label}
                        </a>
                        <span class="skill-card__resource-type skill-card__resource-type--${resource.type}">
                          ${this._getResourceTypeLabel(resource.type)}
                        </span>
                      </li>
                    `)}
                  </ul>
                </div>
              ` : nothing}
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-skill-card': ZevSkillCard;
  }
}
