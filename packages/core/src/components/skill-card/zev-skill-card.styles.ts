import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .skill-card {
    background: var(--zev-color-bg-primary);
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 8px;
    padding: 1.5rem;
    font-family: var(--zev-font-primary);
  }

  .skill-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--zev-color-border-tag);
  }

  .skill-card__title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
  }

  .skill-card__badge {
    flex-shrink: 0;
    padding: 0.25rem 0.5rem;
    font-size: 0.625rem;
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 4px;
  }

  .skill-card__badge--differential {
    background: #dbeafe;
    color: #1d4ed8;
  }

  .skill-card__badge--required {
    background: #fef3c7;
    color: #b45309;
  }

  .skill-card__badge--optional {
    background: #e5e7eb;
    color: #4b5563;
  }

  /* Dark mode badge colors */
  :host-context([data-theme="dark"]) .skill-card__badge--differential {
    background: rgba(59, 130, 246, 0.2);
    color: #93c5fd;
  }

  :host-context([data-theme="dark"]) .skill-card__badge--required {
    background: rgba(245, 158, 11, 0.2);
    color: #fcd34d;
  }

  :host-context([data-theme="dark"]) .skill-card__badge--optional {
    background: rgba(107, 114, 128, 0.2);
    color: #9ca3af;
  }

  .skill-card__section {
    margin-bottom: 1rem;
  }

  .skill-card__section:last-child {
    margin-bottom: 0;
  }

  .skill-card__section-title {
    margin: 0 0 0.5rem 0;
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
  }

  .skill-card__section-text {
    margin: 0;
    font-size: var(--zev-fs-small);
    line-height: 1.6;
    color: var(--zev-color-text-secondary);
  }

  .skill-card__resources {
    border-top: 1px solid var(--zev-color-border-tag);
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .skill-card__resource-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .skill-card__resource-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--zev-color-border-tag);
  }

  .skill-card__resource-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .skill-card__resource-link {
    color: var(--zev-color-text-primary);
    text-decoration: none;
    font-size: var(--zev-fs-small);
    transition: color 0.15s ease;
  }

  .skill-card__resource-link:hover {
    color: var(--zev-color-accent);
  }

  .skill-card__resource-type {
    flex-shrink: 0;
    padding: 0.25rem 0.75rem;
    font-size: 0.625rem;
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 4px;
    border: 1px solid;
  }

  .skill-card__resource-type--docs {
    background: transparent;
    border-color: var(--zev-color-border-tag);
    color: var(--zev-color-text-secondary);
  }

  .skill-card__resource-type--video {
    background: transparent;
    border-color: var(--zev-color-border-tag);
    color: var(--zev-color-text-secondary);
  }

  .skill-card__resource-type--article {
    background: transparent;
    border-color: var(--zev-color-border-tag);
    color: var(--zev-color-text-secondary);
  }

  .skill-card__resource-type--course {
    background: transparent;
    border-color: var(--zev-color-border-tag);
    color: var(--zev-color-text-secondary);
  }
`;
