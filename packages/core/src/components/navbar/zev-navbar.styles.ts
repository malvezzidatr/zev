import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--zev-z-navbar);
  }

  .navbar {
    background: var(--zev-color-navbar-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .navbar__container {
    max-width: var(--zev-container-max-width);
    margin: 0 auto;
    padding: 1rem var(--zev-spacing-container);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar__logo {
    font-weight: var(--zev-fw-black);
    font-size: 1.2rem;
    text-decoration: none;
    color: var(--zev-color-black);
    letter-spacing: var(--zev-ls-tight);
  }

  .navbar__actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .navbar__lang-toggle {
    font-size: var(--zev-fs-nav);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    background: transparent;
    border: 2px solid var(--zev-color-black);
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    transition: var(--zev-transition-base);
    font-family: inherit;
  }

  .navbar__lang-toggle:hover {
    background: var(--zev-color-blue);
    border-color: var(--zev-color-blue);
    color: var(--zev-color-white);
  }

  .navbar__links {
    display: flex;
    gap: 2rem;
  }

  .navbar__link {
    font-size: var(--zev-fs-nav);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    text-decoration: none;
    color: var(--zev-color-black);
    position: relative;
  }

  .navbar__link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--zev-color-blue);
    transition: var(--zev-transition-base);
  }

  .navbar__link:hover::after {
    width: 100%;
  }

  .navbar__hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .navbar__hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--zev-color-black);
    transition: var(--zev-transition-base);
    transform-origin: center;
  }

  .navbar__hamburger--active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .navbar__hamburger--active span:nth-child(2) {
    opacity: 0;
  }

  .navbar__hamburger--active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  @media (max-width: 768px) {
    .navbar__hamburger {
      display: flex;
    }

    .navbar__links {
      position: fixed;
      top: 0;
      right: 0;
      width: 70%;
      height: 100vh;
      flex-direction: column;
      background: var(--zev-color-white);
      padding: 4rem 2rem;
      gap: 2rem;
      transform: translateX(100%);
      transition: var(--zev-transition-base);
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    }

    .navbar__links--open {
      transform: translateX(0);
    }
  }
`;
