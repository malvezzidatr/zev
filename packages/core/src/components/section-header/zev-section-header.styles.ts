import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    margin-bottom: var(--zev-spacing-header-mb, 4rem);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .header__tag {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-accent);
    letter-spacing: var(--zev-ls-wide);
  }

  .header__title {
    font-size: var(--zev-section-header-title-size, var(--zev-fs-heading));
    font-weight: var(--zev-fw-black);
    color: var(--zev-color-text-primary);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-tight);
    line-height: 1;
    margin: 0;
  }

  /* Variant: stacked (tag em cima do título) */
  :host([variant="stacked"]) .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  /* Variant: centered */
  :host([variant="centered"]) .header {
    justify-content: center;
    text-align: center;
  }

  :host([variant="centered"]) .header__title {
    text-align: center;
  }

  /* Size variants */
  :host([size="small"]) .header__title {
    font-size: var(--zev-fs-subheading);
  }

  :host([size="large"]) .header__title {
    font-size: var(--zev-fs-display);
  }
`;
