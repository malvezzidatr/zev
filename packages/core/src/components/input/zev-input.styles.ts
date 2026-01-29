import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input__label {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    font-weight: 500;
    color: var(--zev-color-text-primary);
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

  .input--with-clear {
    padding-right: 2.5rem;
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

  .input__clear {
    position: absolute;
    right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 50%;
    transition: var(--zev-transition-base);
  }

  .input__clear svg {
    width: 1rem;
    height: 1rem;
    fill: var(--zev-color-text-secondary);
    transition: var(--zev-transition-base);
  }

  .input__clear:hover {
    background: var(--zev-color-bg-secondary);
  }

  .input__clear:hover svg {
    fill: var(--zev-color-text-primary);
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

  :host([disabled]) .input__label {
    opacity: 0.5;
  }
`;
