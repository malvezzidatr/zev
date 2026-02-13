import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .upload {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .upload__label {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
  }

  .upload__dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 2rem;
    border: 2px dashed var(--zev-color-border-tag);
    border-radius: 8px;
    background: var(--zev-color-bg-secondary);
    cursor: pointer;
    transition: var(--zev-transition-base);
  }

  .upload__dropzone:hover {
    border-color: var(--zev-color-accent);
    background: var(--zev-color-bg-primary);
  }

  .upload__dropzone--dragging {
    border-color: var(--zev-color-accent);
    background: var(--zev-color-bg-primary);
    border-style: solid;
  }

  .upload__dropzone--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .upload__dropzone--error {
    border-color: var(--zev-color-error);
  }

  .upload__icon {
    color: var(--zev-color-text-secondary);
  }

  .upload__dropzone:hover .upload__icon,
  .upload__dropzone--dragging .upload__icon {
    color: var(--zev-color-accent);
  }

  .upload__text {
    text-align: center;
  }

  .upload__text-main {
    font-size: var(--zev-fs-body);
    color: var(--zev-color-text-primary);
  }

  .upload__text-main span {
    color: var(--zev-color-accent);
    font-weight: var(--zev-fw-bold);
  }

  .upload__text-hint {
    font-size: var(--zev-fs-small);
    color: var(--zev-color-text-secondary);
    margin-top: 0.25rem;
  }

  .upload__input {
    display: none;
  }

  .upload__files {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .upload__file {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: var(--zev-color-bg-secondary);
    border-radius: 6px;
  }

  .upload__file-icon {
    color: var(--zev-color-accent);
    flex-shrink: 0;
  }

  .upload__file-info {
    flex: 1;
    min-width: 0;
  }

  .upload__file-name {
    font-size: var(--zev-fs-small);
    font-weight: var(--zev-fw-bold);
    color: var(--zev-color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload__file-size {
    font-size: 0.75rem;
    color: var(--zev-color-text-secondary);
  }

  .upload__file-remove {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--zev-color-text-secondary);
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: var(--zev-transition-base);
  }

  .upload__file-remove:hover {
    color: var(--zev-color-error);
    background: var(--zev-color-bg-primary);
  }

  .upload__error {
    font-size: var(--zev-fs-small);
    color: var(--zev-color-error);
  }

  .upload__dropzone:focus-visible {
    outline: 2px solid var(--zev-color-accent);
    outline-offset: 2px;
  }

  .upload__file-remove:focus-visible {
    outline: 2px solid var(--zev-color-accent);
    outline-offset: 2px;
  }
`;
