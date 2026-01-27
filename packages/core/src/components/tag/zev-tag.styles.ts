import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 2px;
    background: transparent;
    color: var(--zev-color-text-secondary);
    transition: background var(--zev-transition-base),
                border-color var(--zev-transition-base),
                color var(--zev-transition-base);
    cursor: default;
    line-height: 1;
  }

  /* Size variants */
  .tag--small {
    padding: 0.25rem 0.5rem;
    font-size: 0.7rem;
  }

  .tag--large {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  /* Variant: accent */
  .tag--accent {
    background: var(--zev-color-accent);
    border-color: var(--zev-color-accent);
    color: #fff;
  }

  /* Variant: outline (default is already outline-like) */
  .tag--outline {
    background: transparent;
    border-color: var(--zev-color-border-tag);
    color: var(--zev-color-text-secondary);
  }

  /* Variant: ghost */
  .tag--ghost {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    color: #fff;
  }

  /* Interactive states */
  :host([interactive]) .tag {
    cursor: pointer;
  }

  :host([interactive]) .tag:hover {
    background: var(--zev-color-accent);
    border-color: var(--zev-color-accent);
    color: #fff;
  }

  :host([interactive]) .tag:focus {
    outline: 2px solid var(--zev-color-accent);
    outline-offset: 2px;
  }

  :host([interactive]) .tag--accent:hover {
    background: var(--zev-color-text-primary);
    border-color: var(--zev-color-text-primary);
  }

  /* Removable */
  .tag__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.25rem;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity var(--zev-transition-base);
  }

  .tag__remove:hover {
    opacity: 1;
  }

  .tag__remove svg {
    width: 12px;
    height: 12px;
    fill: currentColor;
  }
`;
