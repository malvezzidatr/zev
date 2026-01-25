import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
  }

  .toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid var(--zev-color-border-tag);
    border-radius: 50%;
    background: var(--zev-color-bg-primary);
    color: var(--zev-color-text-primary);
    cursor: pointer;
    transition: background var(--zev-transition-base),
                border-color var(--zev-transition-base),
                color var(--zev-transition-base);
    padding: 0;
    line-height: 1;
  }

  .toggle:hover {
    border-color: var(--zev-color-accent);
    color: var(--zev-color-accent);
  }

  .toggle svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    transition: transform var(--zev-transition-base);
  }

  .toggle:hover svg {
    transform: rotate(15deg);
  }
`;
