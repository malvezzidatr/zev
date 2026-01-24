import { css } from 'lit';

export const sharedStyles = css`
  :host {
    box-sizing: border-box;
    font-family: var(--zev-font-primary);
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  :host([hidden]) {
    display: none !important;
  }
`;

export const sectionStyles = css`
  .section {
    padding: var(--zev-spacing-section) var(--zev-spacing-container);
  }

  .section__container {
    max-width: var(--zev-container-max-width);
    margin: 0 auto;
  }

  .section__header {
    display: flex;
    align-items: center;
    gap: var(--zev-gap-header);
    margin-bottom: 3rem;
  }

  .section__tag {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-blue);
    letter-spacing: var(--zev-ls-wide);
    text-transform: uppercase;
  }

  .section__title {
    font-size: var(--zev-fs-heading);
    font-weight: var(--zev-fw-black);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-tight);
    line-height: var(--zev-lh-heading);
    margin: 0;
  }
`;
