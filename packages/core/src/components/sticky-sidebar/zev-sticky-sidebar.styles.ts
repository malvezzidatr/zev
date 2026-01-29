import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    max-width: 320px;
  }

  :host([sticky]) {
    position: sticky;
    top: var(--zev-spacing-gap, 24px);
  }

  .sidebar {
    background: var(--zev-color-card-default);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .sidebar__accent {
    height: 4px;
    width: 100%;
  }

  .sidebar__accent--primary {
    background: var(--zev-color-accent);
  }

  .sidebar__accent--success {
    background: var(--zev-color-success);
  }

  .sidebar__accent--warning {
    background: var(--zev-color-warning);
  }

  .sidebar__accent--info {
    background: var(--zev-color-info);
  }

  .sidebar__accent--neutral {
    background: var(--zev-color-text-secondary);
  }

  .sidebar__image-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .sidebar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sidebar__image--placeholder {
    background: var(--zev-color-bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar__image--placeholder svg {
    width: 48px;
    height: 48px;
    color: var(--zev-color-text-secondary);
    opacity: 0.5;
  }

  .sidebar__content {
    padding: 16px;
  }

  .sidebar__title {
    font-family: var(--zev-font-family);
    font-size: var(--zev-font-size-body);
    font-weight: var(--zev-font-weight-bold);
    color: var(--zev-color-text-primary);
    margin: 0 0 8px 0;
    line-height: var(--zev-line-height-heading);
  }

  .sidebar__description {
    font-family: var(--zev-font-family);
    font-size: var(--zev-font-size-small);
    color: var(--zev-color-text-secondary);
    margin: 0;
    line-height: var(--zev-line-height-body-relaxed);
  }

  .sidebar__slot {
    margin-top: 16px;
  }

  .sidebar__slot:empty {
    display: none;
  }
`;
