import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--zev-font-primary);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: var(--zev-transition-base);
  }

  /* Sizes */
  .btn--sm {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }

  .btn--md {
    padding: 0.75rem 1.5rem;
    font-size: var(--zev-fs-small);
  }

  .btn--lg {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  /* Primary variant */
  .btn--primary {
    background: var(--zev-color-accent);
    color: var(--zev-color-white);
  }

  .btn--primary:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  /* Secondary variant */
  .btn--secondary {
    background: transparent;
    border: 1px solid var(--zev-color-border-tag);
    color: var(--zev-color-text-primary);
  }

  .btn--secondary:hover:not(:disabled) {
    border-color: var(--zev-color-accent);
    color: var(--zev-color-accent);
  }

  /* Ghost variant */
  .btn--ghost {
    background: transparent;
    color: var(--zev-color-text-primary);
  }

  .btn--ghost:hover:not(:disabled) {
    color: var(--zev-color-accent);
    background: var(--zev-color-bg-secondary);
  }

  /* Outline Light variant - for colored backgrounds */
  .btn--outline-light {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
  }

  .btn--outline-light:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
  }

  /* Disabled state */
  .btn:disabled,
  :host([disabled]) .btn {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Focus state */
  .btn:focus-visible {
    outline: 2px solid var(--zev-color-accent);
    outline-offset: 2px;
  }
`;
