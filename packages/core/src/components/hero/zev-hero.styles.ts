import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 var(--zev-spacing-container);
    position: relative;
    background: var(--zev-color-white);
  }

  .hero__container {
    max-width: var(--zev-container-max-width);
    width: 100%;
  }

  .hero__label {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .hero__tag {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-blue);
    letter-spacing: var(--zev-ls-wide);
  }

  .hero__label-text {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
    color: var(--zev-color-gray-dark);
  }

  .hero__year {
    font-size: var(--zev-fs-small);
    color: var(--zev-color-gray-dark);
  }

  .hero__name {
    font-size: var(--zev-fs-display);
    font-weight: var(--zev-fw-black);
    text-transform: uppercase;
    line-height: var(--zev-lh-display);
    letter-spacing: var(--zev-ls-tighter);
    color: var(--zev-color-black);
    margin: 0;
  }

  .hero__info {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .hero__subtitle {
    font-size: var(--zev-fs-body);
    color: var(--zev-color-gray-dark);
    margin: 0;
  }

  .hero__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    text-decoration: none;
    color: var(--zev-color-black);
    border-bottom: 2px solid var(--zev-color-black);
    padding-bottom: 0.25rem;
    transition: var(--zev-transition-base);
  }

  .hero__cta:hover {
    color: var(--zev-color-blue);
    border-color: var(--zev-color-blue);
  }

  .hero__cta-arrow {
    transition: var(--zev-transition-base);
  }

  .hero__cta:hover .hero__cta-arrow {
    transform: translateX(4px);
  }

  .hero__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    color: var(--zev-color-gray-dark);
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }

  @media (max-width: 768px) {
    .hero__name {
      font-size: clamp(3rem, 18vw, 8rem);
    }

    .hero__info {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
