import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .input-container {
    position: relative;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input {
    width: 100%;
    padding: 1rem 1rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-primary);
    background: transparent;
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 4px;
    transition: border-color 0.15s ease;
  }

  .input::placeholder {
    color: transparent;
  }

  .input:focus {
    outline: none;
    border-color: var(--zev-color-accent);
  }

  /* Floating label */
  .input__label {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-secondary);
    background: var(--zev-color-bg-primary);
    padding: 0 0.25rem;
    pointer-events: none;
    transition: all 0.15s ease;
  }

  /* Label floats up only when has value */
  .input--has-value ~ .input__label {
    top: 0;
    transform: translateY(-50%);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }

  .input:focus ~ .input__label {
    color: var(--zev-color-accent);
  }

  .input--has-value:focus ~ .input__label {
    color: var(--zev-color-accent);
  }

  /* With icon adjustments */
  .input--with-icon {
    padding-left: 2.75rem;
  }

  .input--with-icon ~ .input__label {
    left: 2.5rem;
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
    transition: fill 0.15s ease;
  }

  .input:focus ~ .input__icon {
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
    transition: background 0.15s ease;
  }

  .input__clear svg {
    width: 1rem;
    height: 1rem;
    fill: var(--zev-color-text-secondary);
    transition: fill 0.15s ease;
  }

  .input__clear:hover {
    background: var(--zev-color-bg-secondary);
  }

  .input__clear:hover svg {
    fill: var(--zev-color-text-primary);
  }

  /* Disabled state */
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
