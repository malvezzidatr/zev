import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem 2rem;
  }

  .empty-state__icon {
    margin-bottom: 1.5rem;
    color: var(--zev-color-text-secondary);
  }

  .empty-state__icon svg,
  .empty-state__icon ::slotted(svg) {
    width: 4rem;
    height: 4rem;
    fill: currentColor;
  }

  .empty-state__title {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-subheading);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
    margin: 0 0 0.5rem;
    line-height: var(--zev-lh-heading);
  }

  .empty-state__description {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-secondary);
    line-height: var(--zev-lh-body);
    margin: 0;
    max-width: 400px;
  }

  .empty-state__action {
    margin-top: 1.5rem;
  }
`;
