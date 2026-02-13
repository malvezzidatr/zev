import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-file-upload.styles.js';

export interface UploadedFile {
  file: File;
  id: string;
}

@customElement('zev-file-upload')
export class ZevFileUpload extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  @property({ type: String }) label = '';
  @property({ type: String }) accept = '';
  @property({ type: Number, attribute: 'max-size' }) maxSize = 10 * 1024 * 1024; // 10MB default
  @property({ type: Number, attribute: 'max-files' }) maxFiles = 1;
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';

  @state() private _files: UploadedFile[] = [];
  @state() private _isDragging = false;

  public clearFiles() {
    this._files = [];
  }

  private _generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }

  private _formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private _validateFile(file: File): string | null {
    // Check file size
    if (file.size > this.maxSize) {
      return `Arquivo muito grande. Máximo: ${this._formatFileSize(this.maxSize)}`;
    }

    // Check file type
    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map(t => t.trim().toLowerCase());
      const fileType = file.type.toLowerCase();
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type;
        }
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.replace('/*', '/'));
        }
        return fileType === type;
      });

      if (!isAccepted) {
        return `Tipo de arquivo não permitido. Aceitos: ${this.accept}`;
      }
    }

    return null;
  }

  private _handleFiles(fileList: FileList | null) {
    if (!fileList || this.disabled) return;

    const files = Array.from(fileList);
    const errors: string[] = [];
    const validFiles: UploadedFile[] = [];

    for (const file of files) {
      if (!this.multiple && validFiles.length >= 1) {
        break;
      }
      const currentCount = this.multiple ? this._files.length : 0;
      if (currentCount + validFiles.length >= this.maxFiles) {
        errors.push(`Máximo de ${this.maxFiles} arquivo(s) permitido(s)`);
        break;
      }

      const validationError = this._validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        validFiles.push({ file, id: this._generateId() });
      }
    }

    if (validFiles.length > 0) {
      if (this.multiple) {
        this._files = [...this._files, ...validFiles];
      } else {
        this._files = validFiles;
      }

      this.emitEvent('file-select', {
        files: this._files.map(f => f.file),
      });
    }

    if (errors.length > 0) {
      this.emitEvent('file-error', { errors });
    }
  }

  private _handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled) {
      this._isDragging = true;
    }
  }

  private _handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this._isDragging = false;
  }

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this._isDragging = false;

    if (!this.disabled && e.dataTransfer) {
      this._handleFiles(e.dataTransfer.files);
    }
  }

  private _handleClick() {
    if (!this.disabled) {
      const input = this.shadowRoot?.querySelector<HTMLInputElement>('.upload__input');
      input?.click();
    }
  }

  private _handleDropzoneKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  private _handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this._handleFiles(input.files);
    input.value = ''; // Reset input to allow selecting same file again
  }

  private _handleRemoveFile(id: string) {
    const removedFile = this._files.find(f => f.id === id);
    this._files = this._files.filter(f => f.id !== id);

    if (removedFile) {
      this.emitEvent('file-remove', {
        file: removedFile.file,
        files: this._files.map(f => f.file),
      });
    }
  }

  render() {
    const dropzoneClasses = {
      'upload__dropzone': true,
      'upload__dropzone--dragging': this._isDragging,
      'upload__dropzone--disabled': this.disabled,
      'upload__dropzone--error': !!this.error,
    };

    const hintText = this.hint || `Máximo ${this._formatFileSize(this.maxSize)}${this.accept ? ` • ${this.accept}` : ''}`;

    return html`
      <div class="upload">
        ${this.label ? html`<label class="upload__label">${this.label}</label>` : nothing}

        <div
          class=${classMap(dropzoneClasses)}
          role="button"
          tabindex="0"
          aria-label="Arraste arquivos ou clique para selecionar"
          @click=${this._handleClick}
          @keydown=${this._handleDropzoneKeydown}
          @dragover=${this._handleDragOver}
          @dragleave=${this._handleDragLeave}
          @drop=${this._handleDrop}
        >
          <input
            type="file"
            class="upload__input"
            accept=${this.accept || nothing}
            ?multiple=${this.multiple}
            ?disabled=${this.disabled}
            @change=${this._handleInputChange}
          />

          <svg class="upload__icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>

          <div class="upload__text">
            <p class="upload__text-main">
              Arraste arquivos ou <span>clique para selecionar</span>
            </p>
            <p class="upload__text-hint">${hintText}</p>
          </div>
        </div>

        ${this.error ? html`<p class="upload__error" role="alert" aria-live="assertive">${this.error}</p>` : nothing}

        ${this._files.length > 0 ? html`
          <div class="upload__files">
            ${this._files.map(({ file, id }) => html`
              <div class="upload__file">
                <svg class="upload__file-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <div class="upload__file-info">
                  <p class="upload__file-name">${file.name}</p>
                  <p class="upload__file-size">${this._formatFileSize(file.size)}</p>
                </div>
                <button
                  class="upload__file-remove"
                  @click=${() => this._handleRemoveFile(id)}
                  aria-label="Remover arquivo"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-file-upload': ZevFileUpload;
  }
}
