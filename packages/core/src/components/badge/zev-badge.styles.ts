import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    font-family: var(--zev-font-primary);
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 4px;
    line-height: 1;
  }

  .badge--success {
    background: rgba(34, 197, 94, 0.15);
    color: var(--zev-color-success);
  }

  .badge--warning {
    background: rgba(245, 158, 11, 0.15);
    color: var(--zev-color-warning);
  }

  .badge--info {
    background: rgba(59, 130, 246, 0.15);
    color: var(--zev-color-info);
  }

  .badge--neutral {
    background: var(--zev-color-bg-secondary);
    color: var(--zev-color-text-secondary);
  }

  .badge--match-low {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
  }

  .badge--match-medium {
    background: rgba(245, 158, 11, 0.15);
    color: var(--zev-color-warning);
  }

  .badge--match-high {
    background: rgba(34, 197, 94, 0.15);
    color: var(--zev-color-success);
  }
`;
