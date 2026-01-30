import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
  }

  .multi-select-container {
    display: flex;
    flex-direction: column;
  }

  .multi-select-wrapper {
    position: relative;
  }

  .multi-select__trigger {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.375rem;
    min-height: 3.5rem;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 4px;
    cursor: pointer;
    transition: var(--zev-transition-base);
  }

  .multi-select__trigger:hover {
    border-color: var(--zev-color-text-secondary);
  }

  .multi-select__trigger--open {
    border-color: var(--zev-color-accent);
  }

  .multi-select__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--zev-color-bg-secondary);
  }

  .multi-select__trigger--disabled:hover {
    border-color: var(--zev-color-border-tag);
  }

  /* Floating label styles */
  .multi-select__label {
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
    z-index: 1;
  }

  /* Label floats up when has value */
  .multi-select__trigger--has-value ~ .multi-select__label {
    top: 0;
    transform: translateY(-50%);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }

  /* Label color changes on open */
  .multi-select__trigger--open ~ .multi-select__label {
    color: var(--zev-color-accent);
  }

  .multi-select__trigger--has-value.multi-select__trigger--open ~ .multi-select__label {
    color: var(--zev-color-accent);
  }

  .multi-select__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    flex: 1;
  }

  .multi-select__more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    background: var(--zev-color-accent);
    color: var(--zev-color-text-inverse);
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    font-weight: 500;
    border-radius: 4px;
  }

  .multi-select__chevron {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--zev-color-text-secondary);
    pointer-events: none;
    transition: var(--zev-transition-base);
  }

  .multi-select__chevron--open {
    transform: translateY(-50%) rotate(180deg);
  }

  .multi-select__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.25rem;
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-height: 300px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .multi-select__search {
    padding: 0.75rem;
    border-bottom: 1px solid var(--zev-color-border-tag);
  }

  .multi-select__search-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-primary);
    background: var(--zev-color-bg-secondary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 4px;
    transition: var(--zev-transition-base);
  }

  .multi-select__search-input::placeholder {
    color: var(--zev-color-text-secondary);
  }

  .multi-select__search-input:focus {
    outline: none;
    border-color: var(--zev-color-accent);
  }

  .multi-select__options {
    overflow-y: auto;
    max-height: 220px;
  }

  .multi-select__option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: var(--zev-transition-base);
  }

  .multi-select__option:hover {
    background: var(--zev-color-bg-secondary);
  }

  .multi-select__option--selected {
    background: var(--zev-color-bg-secondary);
  }

  .multi-select__checkbox {
    width: 1.125rem;
    height: 1.125rem;
    border: 2px solid var(--zev-color-border-tag);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--zev-transition-base);
    flex-shrink: 0;
  }

  .multi-select__checkbox--checked {
    background: var(--zev-color-accent);
    border-color: var(--zev-color-accent);
  }

  .multi-select__checkbox svg {
    width: 0.75rem;
    height: 0.75rem;
    fill: var(--zev-color-text-inverse);
    opacity: 0;
    transition: var(--zev-transition-base);
  }

  .multi-select__checkbox--checked svg {
    opacity: 1;
  }

  .multi-select__option-icon {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: var(--zev-color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .multi-select__option-label {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-primary);
  }

  .multi-select__empty {
    padding: 1rem;
    text-align: center;
    color: var(--zev-color-text-secondary);
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
  }

  /* Disabled state */
  :host([disabled]) .multi-select__trigger {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--zev-color-bg-secondary);
  }

  :host([disabled]) .multi-select__label {
    background: var(--zev-color-bg-secondary);
  }
`;
