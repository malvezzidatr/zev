import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    height: 100%;
  }

  .job-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 8px;
    cursor: pointer;
    transition: var(--zev-transition-base);
    height: 100%;
    min-height: 220px;
    box-sizing: border-box;
  }

  .job-card:hover {
    border-color: var(--zev-color-accent);
    transform: var(--zev-job-card-hover-transform, translateY(-2px));
    box-shadow: var(--zev-job-card-hover-shadow, 0 8px 16px rgba(0, 0, 0, 0.1));
  }

  .job-card--no-hover:hover {
    transform: none;
    box-shadow: none;
    border-color: var(--zev-color-border-tag);
  }

  .job-card--no-hover:hover .job-card__title {
    color: var(--zev-color-text-primary);
  }

  .job-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .job-card__title {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
    margin: 0;
    line-height: var(--zev-lh-heading);
  }

  .job-card:hover .job-card__title {
    color: var(--zev-color-accent);
  }

  .job-card__company {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-secondary);
  }

  .job-card__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }

  .job-card__meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .job-card__meta-item svg {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
  }

  .job-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    flex: 1;
    align-content: flex-start;
  }

  .job-card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid var(--zev-color-border-tag);
  }

  .job-card__source {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: var(--zev-fw-bold);
  }
`;
