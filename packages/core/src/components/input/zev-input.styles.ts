import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-primary);
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 4px;
    transition: var(--zev-transition-base);
  }

  .input::placeholder {
    color: var(--zev-color-text-secondary);
  }

  .input:focus {
    outline: none;
    border-color: var(--zev-color-accent);
  }

  .input--with-icon {
    padding-left: 2.75rem;
  }

  .input__icon {
    position: absolute;
    left: 0.875rem;
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--zev-color-text-secondary);
    pointer-events: none;
  }

  .input:focus ~ .input__icon,
  .input:focus + .input__icon {
    fill: var(--zev-color-accent);
  }

  .input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--zev-color-bg-secondary);
  }

  :host([disabled]) .input {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--zev-color-bg-secondary);
  }
`;
