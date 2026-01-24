import { css } from 'lit';

export const styles = css`
  .about {
    background: var(--zev-color-gray);
  }

  .about__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--zev-gap-grid-desktop);
  }

  .about__bio p {
    font-size: var(--zev-fs-body);
    line-height: 1.8;
    color: var(--zev-color-gray-dark);
    margin: 0 0 1rem;
  }

  .about__skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--zev-gap-tags);
    margin-top: 2rem;
  }

  .about__skill-tag {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
    border: 1px solid var(--zev-color-border-tag);
    padding: 0.4rem 0.8rem;
    transition: var(--zev-transition-base);
    cursor: default;
  }

  .about__skill-tag:hover {
    background: var(--zev-color-blue);
    color: var(--zev-color-white);
    border-color: var(--zev-color-blue);
  }

  .about__timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .about__timeline-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .about__timeline-dot {
    width: 10px;
    height: 10px;
    background: var(--zev-color-blue);
    border-radius: 50%;
    margin-top: 0.4rem;
    flex-shrink: 0;
  }

  .about__timeline-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .about__timeline-year {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-blue);
    letter-spacing: var(--zev-ls-wide);
  }

  .about__timeline-title {
    font-size: var(--zev-fs-body);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-black);
    margin: 0;
  }

  .about__timeline-desc {
    font-size: var(--zev-fs-small);
    color: var(--zev-color-gray-dark);
    line-height: var(--zev-lh-body);
    margin: 0;
  }

  @media (max-width: 768px) {
    .about__grid {
      grid-template-columns: 1fr;
      gap: var(--zev-gap-grid-mobile);
    }
  }
`;
