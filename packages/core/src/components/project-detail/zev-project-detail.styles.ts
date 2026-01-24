import { css } from 'lit';

export const styles = css`
  :host {
    display: contents;
  }

  .modal__overlay {
    position: fixed;
    inset: 0;
    background: var(--zev-color-modal-overlay);
    z-index: var(--zev-z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  }

  .modal__content {
    background: var(--zev-color-white);
    max-width: 700px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    padding: 3rem;
    position: relative;
    animation: slideUp 0.4s ease;
  }

  .modal__close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--zev-color-gray-dark);
    transition: var(--zev-transition-base);
    padding: 0.5rem;
  }

  .modal__close:hover {
    color: var(--zev-color-black);
    transform: rotate(90deg);
  }

  .modal__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .modal__number {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-blue);
  }

  .modal__role {
    font-size: 0.7rem;
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
    color: var(--zev-color-gray-dark);
    border: 1px solid var(--zev-color-border-tag);
    padding: 0.25rem 0.5rem;
  }

  .modal__title {
    font-size: var(--zev-fs-subheading);
    font-weight: var(--zev-fw-black);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-tight);
    color: var(--zev-color-black);
    margin: 0 0 1.5rem;
  }

  .modal__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--zev-gap-tags);
    margin-bottom: 1.5rem;
  }

  .modal__tag {
    font-size: 0.75rem;
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
    background: var(--zev-color-blue);
    color: var(--zev-color-white);
    padding: 0.3rem 0.6rem;
  }

  .modal__description {
    font-size: var(--zev-fs-body);
    line-height: var(--zev-lh-body-relaxed);
    color: var(--zev-color-text-modal-content);
    margin: 0 0 2rem;
  }

  .modal__highlights-title {
    font-size: var(--zev-fs-body);
    font-weight: var(--zev-fw-bold);
    text-transform: uppercase;
    letter-spacing: var(--zev-ls-wide);
    color: var(--zev-color-black);
    margin: 0 0 1rem;
  }

  .modal__highlights-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .modal__highlights-list li {
    position: relative;
    padding-left: 1.5rem;
    font-size: var(--zev-fs-body);
    line-height: var(--zev-lh-body);
    color: var(--zev-color-text-modal-secondary);
  }

  .modal__highlights-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    background: var(--zev-color-blue);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .modal__overlay {
      align-items: flex-end;
    }

    .modal__content {
      padding: 2rem;
      max-height: 90vh;
      width: 100%;
    }
  }
`;
