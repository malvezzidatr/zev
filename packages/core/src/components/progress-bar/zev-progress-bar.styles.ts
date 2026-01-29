import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .progress {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .progress__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .progress__label {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
  }

  .progress__value {
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
  }

  .progress__track {
    width: 100%;
    height: 8px;
    background: var(--zev-color-bg-secondary);
    border-radius: 4px;
    overflow: hidden;
  }

  :host([size="sm"]) .progress__track {
    height: 4px;
  }

  :host([size="lg"]) .progress__track {
    height: 12px;
  }

  .progress__bar {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  /* Variants */
  :host([variant="primary"]) .progress__bar {
    background: var(--zev-color-accent);
  }

  :host([variant="success"]) .progress__bar {
    background: var(--zev-color-success);
  }

  :host([variant="warning"]) .progress__bar {
    background: var(--zev-color-warning);
  }

  :host([variant="error"]) .progress__bar {
    background: var(--zev-color-error);
  }

  :host([variant="info"]) .progress__bar {
    background: var(--zev-color-info);
  }

  /* Indeterminate animation */
  :host([indeterminate]) .progress__bar {
    width: 30% !important;
    animation: indeterminate 1.5s ease-in-out infinite;
  }

  @keyframes indeterminate {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(200%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  /* Striped animation */
  :host([striped]) .progress__bar {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  }

  :host([striped][animated]) .progress__bar {
    animation: stripes 1s linear infinite;
  }

  @keyframes stripes {
    from {
      background-position: 1rem 0;
    }
    to {
      background-position: 0 0;
    }
  }
`;
