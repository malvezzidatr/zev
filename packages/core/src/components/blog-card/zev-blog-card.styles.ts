import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    height: 100%;
  }

  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform var(--zev-transition-base),
                box-shadow var(--zev-transition-base),
                border-color var(--zev-transition-base);
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--zev-color-accent);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  .card__image-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
    background: var(--zev-color-bg-secondary);
  }

  .card__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--zev-transition-base);
  }

  .card:hover .card__image {
    transform: scale(1.05);
  }

  .card__image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--zev-color-text-secondary);
    font-size: 3rem;
  }

  .card__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }

  .card__meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }

  .card__date {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .card__read-time {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .card__read-time::before {
    content: '•';
    margin-right: 0.5rem;
  }

  .card__title {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body-large);
    font-weight: 700;
    color: var(--zev-color-text-primary);
    margin: 0 0 0.75rem;
    line-height: var(--zev-lh-heading);
    transition: color var(--zev-transition-base);
  }

  .card:hover .card__title {
    color: var(--zev-color-accent);
  }

  .card__excerpt {
    flex: 1;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-secondary);
    line-height: var(--zev-lh-body);
    margin: 0 0 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: auto;
  }

  .card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .card__tag {
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    font-weight: 500;
    color: var(--zev-color-accent);
    background: transparent;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--zev-color-accent);
    border-radius: 4px;
    transition: background var(--zev-transition-base),
                color var(--zev-transition-base);
  }

  .card:hover .card__tag {
    background: var(--zev-color-accent);
    color: var(--zev-color-text-inverse);
  }

  .card__author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }

  .card__author-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    background: var(--zev-color-bg-secondary);
  }
`;
