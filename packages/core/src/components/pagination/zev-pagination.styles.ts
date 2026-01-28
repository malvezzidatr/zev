import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--zev-font-primary);
  }

  .pagination__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    background: transparent;
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 4px;
    cursor: pointer;
    transition: var(--zev-transition-base);
    color: var(--zev-color-text-primary);
  }

  .pagination__btn:hover:not(:disabled) {
    border-color: var(--zev-color-accent);
    color: var(--zev-color-accent);
  }

  .pagination__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination__btn svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
  }

  .pagination__pages {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .pagination__page {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 0.5rem;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-regular);
    color: var(--zev-color-text-primary);
    cursor: pointer;
    transition: var(--zev-transition-base);
  }

  .pagination__page:hover:not(:disabled):not(.pagination__page--active) {
    background: var(--zev-color-bg-secondary);
  }

  .pagination__page--active {
    background: var(--zev-color-accent);
    color: var(--zev-color-white);
    font-weight: var(--zev-fw-bold);
    cursor: default;
  }

  .pagination__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2.5rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }
`;
