import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .card {
    background: var(--zev-color-card-default);
    border: 1px solid var(--zev-color-card-hover);
    padding: 2rem;
    cursor: pointer;
    transition: var(--zev-transition-base);
  }

  .card:hover {
    background: var(--zev-color-card-hover);
    transform: translateY(-4px);
  }

  .card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .card__number {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-white);
    opacity: 0.7;
  }

  .card__role {
    font-size: 0.7rem;
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
    color: var(--zev-color-white);
    border: 1px solid var(--zev-color-card-hover);
    padding: 0.25rem 0.5rem;
  }

  .card__title {
    font-size: var(--zev-fs-subheading);
    font-weight: var(--zev-fw-black);
    color: var(--zev-color-white);
    margin: 0 0 0.75rem;
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-tight);
  }

  .card__description {
    font-size: var(--zev-fs-body);
    color: var(--zev-color-white);
    opacity: 0.8;
    line-height: var(--zev-lh-body);
    margin: 0 0 1.5rem;
  }

  .card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--zev-gap-tags);
  }

  .card__tag {
    font-size: 0.75rem;
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-white);
    border: 1px solid var(--zev-color-card-hover);
    padding: 0.25rem 0.6rem;
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
  }
`;
