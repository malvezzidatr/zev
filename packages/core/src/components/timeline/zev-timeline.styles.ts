import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Variante: com linha conectora */
  :host([connected]) .timeline {
    gap: 1.5rem;
  }
`;
