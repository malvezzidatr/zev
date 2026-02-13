import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ZevBase } from '../../base/zev-base.js';
import { styles } from './zev-multi-select.styles.js';
import '../tag/zev-tag.js';

export interface MultiSelectOption {
  value: string;
  label: string;
  icon?: string;
}

/**
 * Multi-select dropdown component with tags
 * @element zev-multi-select
 * @fires multi-select-change - Fired when selection changes
 * @fires multi-select-search - Fired when search query changes
 */
@customElement('zev-multi-select')
export class ZevMultiSelect extends ZevBase {
  static styles = [...ZevBase.styles, styles];

  /** Floating label text */
  @property() label = '';

  /** Array of available options */
  @property({ type: Array }) options: MultiSelectOption[] = [];

  /** Array of selected values */
  @property({ type: Array }) value: string[] = [];

  /** Whether the select is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether search is enabled */
  @property({ type: Boolean }) searchable = true;

  /** Maximum number of tags to display before showing +N */
  @property({ type: Number }) maxDisplayTags = 3;

  /** Search placeholder text */
  @property() searchPlaceholder = 'Buscar...';

  @state() private _isOpen = false;
  @state() private _searchQuery = '';
  @state() private _focusedIndex = -1;

  private _multiSelectId = `zev-multi-select-${Math.random().toString(36).substring(2, 9)}`;
  private _boundHandleClickOutside = this._handleClickOutside.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundHandleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundHandleClickOutside);
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has('_focusedIndex') && this._focusedIndex >= 0) {
      const options = this.shadowRoot?.querySelectorAll<HTMLElement>('[role="option"]');
      if (options && options[this._focusedIndex]) {
        options[this._focusedIndex].focus();
      }
    }
  }

  private _handleClickOutside(e: MouseEvent) {
    if (!this.contains(e.target as Node)) {
      this._isOpen = false;
    }
  }

  private _toggleDropdown(e?: Event) {
    if (e) {
      e.stopPropagation();
    }
    if (this.disabled) return;
    this._isOpen = !this._isOpen;
    if (!this._isOpen) {
      this._searchQuery = '';
      this._focusedIndex = -1;
    }
  }

  private _handleTriggerKeydown(e: KeyboardEvent) {
    if (this.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._toggleDropdown();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this._isOpen) {
          this._isOpen = true;
        }
        this._focusedIndex = 0;
        break;
      case 'Escape':
        if (this._isOpen) {
          e.preventDefault();
          this._isOpen = false;
          this._searchQuery = '';
          this._focusedIndex = -1;
          // Return focus to trigger
          const trigger = this.shadowRoot?.querySelector<HTMLElement>('.multi-select__trigger');
          trigger?.focus();
        }
        break;
      case 'ArrowUp':
        if (this._isOpen) {
          e.preventDefault();
          const opts = this._filteredOptions;
          this._focusedIndex = opts.length - 1;
        }
        break;
    }
  }

  private _handleOptionKeydown(e: KeyboardEvent, index: number) {
    const options = this._filteredOptions;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._focusedIndex = index < options.length - 1 ? index + 1 : 0;
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._focusedIndex = index > 0 ? index - 1 : options.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._toggleOption(options[index].value);
        break;
      case 'Escape':
        e.preventDefault();
        this._isOpen = false;
        this._searchQuery = '';
        this._focusedIndex = -1;
        const trigger = this.shadowRoot?.querySelector<HTMLElement>('.multi-select__trigger');
        trigger?.focus();
        break;
    }
  }

  private _handleSearchInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchQuery = input.value;
    this.emitEvent('multi-select-search', { query: this._searchQuery });
  }

  private _toggleOption(optionValue: string) {
    const isSelected = this.value.includes(optionValue);
    let newValue: string[];

    if (isSelected) {
      newValue = this.value.filter(v => v !== optionValue);
    } else {
      newValue = [...this.value, optionValue];
    }

    this.value = newValue;
    this._emitChange();
  }

  private _removeTag(optionValue: string, e?: Event) {
    if (e) {
      e.stopPropagation();
    }
    this.value = this.value.filter(v => v !== optionValue);
    this._emitChange();
  }

  private _emitChange() {
    const selectedOptions = this.options.filter(opt => this.value.includes(opt.value));
    this.emitEvent('multi-select-change', {
      values: this.value,
      labels: selectedOptions.map(opt => opt.label),
    });
  }

  private get _filteredOptions(): MultiSelectOption[] {
    if (!this._searchQuery) return this.options;
    const query = this._searchQuery.toLowerCase();
    return this.options.filter(opt =>
      opt.label.toLowerCase().includes(query)
    );
  }

  private get _selectedOptions(): MultiSelectOption[] {
    return this.options.filter(opt => this.value.includes(opt.value));
  }

  private _renderLabel() {
    if (!this.label) return nothing;
    return html`<label class="multi-select__label" id="${this._multiSelectId}-label">${this.label}</label>`;
  }

  private _renderTags() {
    const selected = this._selectedOptions;
    if (selected.length === 0) {
      return nothing;
    }

    const visibleTags = selected.slice(0, this.maxDisplayTags);
    const hiddenCount = selected.length - this.maxDisplayTags;

    return html`
      <div class="multi-select__tags">
        ${visibleTags.map(opt => html`
          <zev-tag
            label=${opt.label}
            variant="accent"
            size="small"
            removable
            @tag-remove=${() => this._removeTag(opt.value)}
          ></zev-tag>
        `)}
        ${hiddenCount > 0 ? html`
          <span class="multi-select__more">+${hiddenCount}</span>
        ` : nothing}
      </div>
    `;
  }

  private _renderCheckbox(isChecked: boolean) {
    const classes = {
      'multi-select__checkbox': true,
      'multi-select__checkbox--checked': isChecked,
    };

    return html`
      <span class=${classMap(classes)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </span>
    `;
  }

  private _renderOption(option: MultiSelectOption, index: number) {
    const isSelected = this.value.includes(option.value);
    const isFocused = this._focusedIndex === index;
    const classes = {
      'multi-select__option': true,
      'multi-select__option--selected': isSelected,
      'multi-select__option--focused': isFocused,
    };

    return html`
      <div
        class=${classMap(classes)}
        role="option"
        aria-selected=${isSelected}
        tabindex=${isFocused ? '0' : '-1'}
        @click=${() => this._toggleOption(option.value)}
        @keydown=${(e: KeyboardEvent) => this._handleOptionKeydown(e, index)}
      >
        ${this._renderCheckbox(isSelected)}
        ${option.icon ? html`
          <span class="multi-select__option-icon">${option.icon}</span>
        ` : nothing}
        <span class="multi-select__option-label">${option.label}</span>
      </div>
    `;
  }

  private _renderDropdown() {
    if (!this._isOpen) return nothing;

    const filteredOptions = this._filteredOptions;

    return html`
      <div class="multi-select__dropdown">
        ${this.searchable ? html`
          <div class="multi-select__search">
            <input
              type="text"
              class="multi-select__search-input"
              placeholder=${this.searchPlaceholder}
              .value=${this._searchQuery}
              @input=${this._handleSearchInput}
              @click=${(e: Event) => e.stopPropagation()}
            />
          </div>
        ` : nothing}
        <div class="multi-select__options" role="listbox" aria-multiselectable="true">
          ${filteredOptions.length > 0
            ? filteredOptions.map((opt, i) => this._renderOption(opt, i))
            : html`<div class="multi-select__empty">Nenhuma opção encontrada</div>`
          }
        </div>
      </div>
    `;
  }

  render() {
    const hasValue = this.value.length > 0;

    const triggerClasses = {
      'multi-select__trigger': true,
      'multi-select__trigger--open': this._isOpen,
      'multi-select__trigger--disabled': this.disabled,
      'multi-select__trigger--has-value': hasValue,
    };

    const chevronClasses = {
      'multi-select__chevron': true,
      'multi-select__chevron--open': this._isOpen,
    };

    return html`
      <div class="multi-select-container">
        <div class="multi-select-wrapper">
          <div
            class=${classMap(triggerClasses)}
            role="combobox"
            tabindex="0"
            aria-expanded=${this._isOpen}
            aria-haspopup="listbox"
            aria-labelledby=${this.label ? `${this._multiSelectId}-label` : nothing}
            @click=${this._toggleDropdown}
            @keydown=${this._handleTriggerKeydown}
          >
            ${this._renderTags()}
            <svg class=${classMap(chevronClasses)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
          ${this._renderLabel()}
          ${this._renderDropdown()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zev-multi-select': ZevMultiSelect;
  }
}
