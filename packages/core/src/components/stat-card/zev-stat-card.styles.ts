import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 8px;
    text-align: center;
    transition: var(--zev-transition-base);
  }

  .stat-card--accent {
    border-color: var(--zev-color-accent);
    background: var(--zev-color-card-default);
  }

  .stat-card__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--zev-color-accent);
  }

  .stat-card__icon ::slotted(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  .stat-card__value {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-heading);
    font-weight: var(--zev-fw-black);
    color: var(--zev-color-text-primary);
    line-height: 1;
  }

  .stat-card__label {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }
`;
