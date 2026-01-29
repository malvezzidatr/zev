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
    background: var(--zev-color-bg-primary);
    max-width: 600px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    border-radius: 8px;
    animation: slideUp 0.4s ease;
  }

  :host([size="sm"]) .modal__content {
    max-width: 400px;
  }

  :host([size="lg"]) .modal__content {
    max-width: 800px;
  }

  :host([size="xl"]) .modal__content {
    max-width: 1000px;
  }

  :host([size="full"]) .modal__content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--zev-color-border-tag);
  }

  .modal__title {
    font-size: var(--zev-fs-body);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
    margin: 0;
  }

  .modal__close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--zev-color-text-secondary);
    transition: var(--zev-transition-base);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .modal__close:hover {
    color: var(--zev-color-text-primary);
    background: var(--zev-color-bg-secondary);
  }

  .modal__body {
    padding: 1.5rem;
  }

  .modal__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--zev-color-border-tag);
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
      max-width: 100%;
      width: 100%;
      max-height: 90vh;
      border-radius: 12px 12px 0 0;
    }

    :host([size="sm"]) .modal__content,
    :host([size="lg"]) .modal__content,
    :host([size="xl"]) .modal__content {
      max-width: 100%;
    }
  }
`;
