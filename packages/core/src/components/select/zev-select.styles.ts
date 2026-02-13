import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .select-container {
    position: relative;
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .select {
    width: 100%;
    min-height: 3.5rem;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-primary);
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 4px;
    cursor: pointer;
    appearance: none;
    transition: border-color 0.15s ease;
  }

  .select option {
    background: var(--zev-color-bg-primary);
    color: var(--zev-color-text-primary);
  }

  :host-context([data-theme="dark"]) .select {
    color-scheme: dark;
  }

  .select:focus {
    outline: none;
    border-color: var(--zev-color-accent);
  }

  /* Floating label */
  .select__label {
    position: absolute;
    left: 1rem;
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
  .select--has-value ~ .select__label {
    top: 0;
    transform: translateY(-50%);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }

  .select:focus ~ .select__label {
    color: var(--zev-color-accent);
  }

  .select--has-value:focus ~ .select__label {
    color: var(--zev-color-accent);
  }

  /* Disabled state */
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
    transition: fill 0.15s ease;
  }

  .select:focus ~ .select__chevron {
    fill: var(--zev-color-accent);
  }

  /* Style placeholder option */
  .select option[value=""] {
    color: var(--zev-color-text-secondary);
  }

  :host([disabled]) .select__label {
    opacity: 0.5;
  }
`;
