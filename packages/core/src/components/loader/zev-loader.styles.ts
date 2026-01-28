import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .skeleton {
    background: linear-gradient(
      90deg,
      var(--zev-color-bg-secondary) 25%,
      var(--zev-color-border-tag) 50%,
      var(--zev-color-bg-secondary) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
  }

  .skeleton--sm {
    height: 1rem;
    width: 100%;
  }

  .skeleton--md {
    height: 1.5rem;
    width: 100%;
  }

  .skeleton--lg {
    height: 2rem;
    width: 100%;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
