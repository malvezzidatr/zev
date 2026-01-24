import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    background: var(--zev-color-black);
    color: var(--zev-color-white);
  }

  .footer__container {
    max-width: var(--zev-container-max-width);
    margin: 0 auto;
    padding: var(--zev-spacing-section) var(--zev-spacing-container);
  }

  .footer__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--zev-gap-grid-desktop);
  }

  .footer__heading {
    font-size: var(--zev-fs-subheading);
    font-weight: var(--zev-fw-black);
    text-transform: uppercase;
    margin: 0 0 2rem;
  }

  .footer__links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer__link {
    color: var(--zev-color-white);
    opacity: 0.8;
    text-decoration: none;
    font-size: var(--zev-fs-body);
    transition: var(--zev-transition-base);
  }

  .footer__link:hover {
    opacity: 1;
    color: var(--zev-color-blue);
  }

  .footer__info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .footer__info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .footer__info-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wider);
    opacity: 0.5;
  }

  .footer__info-value {
    font-size: var(--zev-fs-body);
    opacity: 0.8;
  }

  .footer__bottom {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--zev-color-border-subtle);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .footer__decorative-name {
    font-size: clamp(2.5rem, 10vw, 8rem);
    font-weight: var(--zev-fw-black);
    text-transform: uppercase;
    opacity: 0.05;
    position: absolute;
    left: 0;
    white-space: nowrap;
    pointer-events: none;
  }

  .footer__copyright {
    font-size: var(--zev-fs-small);
    opacity: 0.4;
    margin-left: auto;
  }

  @media (max-width: 768px) {
    .footer__grid {
      grid-template-columns: 1fr;
      gap: var(--zev-gap-grid-mobile);
    }
  }
`;
