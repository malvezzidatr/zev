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

  /** Label text displayed above the select */
  @property() label = '';

  /** Placeholder text when nothing is selected */
  @property() placeholder = 'Selecione uma opção';

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

  private _boundHandleClickOutside = this._handleClickOutside.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundHandleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundHandleClickOutside);
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
    return html`<label class="multi-select__label">${this.label}</label>`;
  }

  private _renderTags() {
    const selected = this._selectedOptions;
    if (selected.length === 0) {
      return html`<span class="multi-select__placeholder">${this.placeholder}</span>`;
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
        <svg viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </span>
    `;
  }

  private _renderOption(option: MultiSelectOption) {
    const isSelected = this.value.includes(option.value);
    const classes = {
      'multi-select__option': true,
      'multi-select__option--selected': isSelected,
    };

    return html`
      <div
        class=${classMap(classes)}
        @click=${() => this._toggleOption(option.value)}
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
        <div class="multi-select__options">
          ${filteredOptions.length > 0
            ? filteredOptions.map(opt => this._renderOption(opt))
            : html`<div class="multi-select__empty">Nenhuma opção encontrada</div>`
          }
        </div>
      </div>
    `;
  }

  render() {
    const triggerClasses = {
      'multi-select__trigger': true,
      'multi-select__trigger--open': this._isOpen,
      'multi-select__trigger--disabled': this.disabled,
    };

    const chevronClasses = {
      'multi-select__chevron': true,
      'multi-select__chevron--open': this._isOpen,
    };

    return html`
      <div class="multi-select-container">
        ${this._renderLabel()}
        <div class="multi-select-wrapper">
          <div
            class=${classMap(triggerClasses)}
            @click=${this._toggleDropdown}
          >
            ${this._renderTags()}
            <svg class=${classMap(chevronClasses)} viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
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
