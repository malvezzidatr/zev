import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-pagination.styles.js';

/**
 * Pagination component for navigating through pages
 * @element zev-pagination
 * @fires page-change - Fired when the page changes
 */
@customElement('zev-pagination')
export class ZevPagination extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Current active page */
  @property({ type: Number, attribute: 'current-page' }) currentPage = 1;

  /** Total number of pages */
  @property({ type: Number, attribute: 'total-pages' }) totalPages = 1;

  private _goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.emitEvent('page-change', { page: this.currentPage });
  }

  private _getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  }

  private _renderPageNumbers() {
    const pages = this._getPageNumbers();

    return pages.map(page => {
      if (page === '...') {
        return html`<span class="pagination__ellipsis">...</span>`;
      }

      const isActive = page === this.currentPage;
      return html`
        <button
          class="pagination__page ${isActive ? 'pagination__page--active' : ''}"
          @click=${() => this._goToPage(page as number)}
          ?disabled=${isActive}
          aria-label="Página ${page}"
          aria-current=${isActive ? 'page' : nothing}
        >
          ${page}
        </button>
      `;
    });
  }

  render() {
    if (this.totalPages <= 1) return nothing;

    return html`
      <nav class="pagination" aria-label="Paginação">
        <button
          class="pagination__btn pagination__btn--prev"
          @click=${() => this._goToPage(this.currentPage - 1)}
          ?disabled=${this.currentPage <= 1}
          aria-label="Página anterior"
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <div class="pagination__pages">
          ${this._renderPageNumbers()}
        </div>
        <button
          class="pagination__btn pagination__btn--next"
          @click=${() => this._goToPage(this.currentPage + 1)}
          ?disabled=${this.currentPage >= this.totalPages}
          aria-label="Próxima página"
        >
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-pagination': ZevPagination;
  }
}
