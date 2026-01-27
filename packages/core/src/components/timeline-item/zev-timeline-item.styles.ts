import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .item__dot {
    width: 10px;
    height: 10px;
    background: var(--zev-color-accent);
    border-radius: 50%;
    margin-top: 0.4rem;
    flex-shrink: 0;
  }

  .item__content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .item__year {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-accent);
    letter-spacing: var(--zev-ls-wide);
  }

  .item__title {
    font-size: var(--zev-fs-body);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
    margin: 0;
  }

  .item__description {
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
    line-height: var(--zev-lh-body);
    margin: 0;
  }

  /* Variante: com linha conectora */
  :host([connected]) {
    position: relative;
    padding-left: 1.25rem;
  }

  :host([connected])::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--zev-color-border-tag);
  }

  :host([connected]) .item {
    gap: 1.5rem;
  }

  :host([connected]) .item__dot {
    position: absolute;
    left: 0;
    margin-top: 0.4rem;
    z-index: 1;
  }

  /* Primeiro e último item não tem linha */
  :host([connected]:first-child)::before {
    top: 0.6rem;
  }

  :host([connected]:last-child)::before {
    bottom: calc(100% - 0.6rem);
  }
`;
