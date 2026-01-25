import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    background: var(--zev-color-bg-primary);
  }

  .cta__label {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
    color: var(--zev-color-text-secondary);
  }

  .cta__heading {
    font-size: var(--zev-fs-heading);
    font-weight: var(--zev-fw-black);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-tight);
    line-height: var(--zev-lh-heading);
    margin: 1rem 0;
    color: var(--zev-color-text-primary);
  }

  .cta__description {
    font-size: var(--zev-fs-body);
    line-height: var(--zev-lh-body);
    color: var(--zev-color-text-secondary);
    margin: 0 0 2rem;
    max-width: 600px;
  }

  .cta__button {
    display: inline-block;
    background: var(--zev-color-text-primary);
    color: var(--zev-color-bg-primary);
    text-decoration: none;
    text-transform: uppercase;
    font-weight: var(--zev-fw-bold);
    font-size: var(--zev-fs-small);
    letter-spacing: var(--zev-ls-wide);
    padding: 1rem 2rem;
    transition: var(--zev-transition-base);
    cursor: pointer;
    border: none;
  }

  .cta__button:hover {
    background: var(--zev-color-accent);
    color: var(--zev-color-text-inverse);
  }
`;
