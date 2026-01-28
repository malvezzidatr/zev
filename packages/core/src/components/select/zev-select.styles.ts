import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .select {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-primary);
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 4px;
    cursor: pointer;
    appearance: none;
    transition: var(--zev-transition-base);
  }

  .select:focus {
    outline: none;
    border-color: var(--zev-color-accent);
  }

  .select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--zev-color-bg-secondary);
  }

  :host([disabled]) .select {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--zev-color-bg-secondary);
  }

  .select__chevron {
    position: absolute;
    right: 0.875rem;
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--zev-color-text-secondary);
    pointer-events: none;
    transition: var(--zev-transition-base);
  }

  .select:focus ~ .select__chevron {
    fill: var(--zev-color-accent);
  }

  /* Style placeholder option */
  .select option[value=""] {
    color: var(--zev-color-text-secondary);
  }
`;
