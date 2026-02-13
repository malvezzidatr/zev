import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-blog-card.styles.js';

export interface BlogPostData {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image?: string;
  tags?: string[];
  readTime?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

@customElement('zev-blog-card')
export class ZevBlogCard extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property() title = '';
  @property() excerpt = '';
  @property() date = '';
  @property() slug = '';
  @property() image = '';
  @property({ type: Array }) tags: string[] = [];
  @property({ attribute: 'read-time' }) readTime = '';
  @property({ attribute: 'author-name' }) authorName = '';
  @property({ attribute: 'author-avatar' }) authorAvatar = '';

  private _handleClick() {
    this.emitEvent('card-click', {
      title: this.title,
      slug: this.slug,
    });
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  private _renderImage() {
    if (this.image) {
      return html`
        <div class="card__image-container">
          <img class="card__image" src=${this.image} alt=${this.title} loading="lazy" />
        </div>
      `;
    }
    return html`
      <div class="card__image-container">
        <div class="card__image-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/>
          </svg>
        </div>
      </div>
    `;
  }

  private _renderMeta() {
    return html`
      <div class="card__meta">
        <span class="card__date">${this.date}</span>
        ${this.readTime ? html`<span class="card__read-time">${this.readTime}</span>` : nothing}
      </div>
    `;
  }

  private _renderTags() {
    if (!this.tags.length) return nothing;
    return html`
      <div class="card__tags">
        ${this.tags.slice(0, 3).map(tag => html`<span class="card__tag">${tag}</span>`)}
      </div>
    `;
  }

  private _renderAuthor() {
    if (!this.authorName) return nothing;
    return html`
      <div class="card__author">
        ${this.authorAvatar
          ? html`<img class="card__author-avatar" src=${this.authorAvatar} alt=${this.authorName} />`
          : nothing
        }
        <span>${this.authorName}</span>
      </div>
    `;
  }

  render() {
    return html`
      <article
        class="card"
        tabindex="0"
        role="article"
        aria-label=${this.title}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}>
        ${this._renderImage()}
        <div class="card__content">
          ${this._renderMeta()}
          <h3 class="card__title">${this.title}</h3>
          <p class="card__excerpt">${this.excerpt}</p>
          <div class="card__footer">
            ${this._renderTags()}
            ${this._renderAuthor()}
          </div>
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-blog-card': ZevBlogCard;
  }
}
