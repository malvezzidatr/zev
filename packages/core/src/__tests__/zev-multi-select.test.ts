import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/multi-select/zev-multi-select.js';
import type { ZevMultiSelect } from '../components/multi-select/zev-multi-select.js';

describe('zev-multi-select', () => {
  let element: ZevMultiSelect;
  const testOptions = [
    { value: 'family', label: 'Family' },
    { value: 'family-in-law', label: 'Family in law' },
    { value: 'coworkers', label: 'Co-workers' },
    { value: 'friends', label: 'Friends' },
  ];

  beforeEach(async () => {
    element = fixture<ZevMultiSelect>('zev-multi-select');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render with default values', () => {
    expect(element.options).toEqual([]);
    expect(element.value).toEqual([]);
    expect(element.disabled).toBe(false);
    expect(element.searchable).toBe(true);
    expect(element.maxDisplayTags).toBe(3);
    expect(element.label).toBe('');
  });

  it('should render label when provided', async () => {
    element.label = 'Tags';
    await elementUpdated(element);

    const label = shadowQuery<HTMLLabelElement>(element, '.multi-select__label');
    expect(label).toBeDefined();
    expect(label?.textContent).toBe('Tags');
  });

  it('should not render label when empty', async () => {
    element.label = '';
    await elementUpdated(element);

    const label = shadowQuery<HTMLLabelElement>(element, '.multi-select__label');
    expect(label).toBeNull();
  });

  it('should render floating label inside trigger when no value', async () => {
    element.label = 'Tags';
    element.options = testOptions;
    await elementUpdated(element);

    const label = shadowQuery<HTMLLabelElement>(element, '.multi-select__label');
    expect(label).toBeDefined();
    expect(label?.textContent).toBe('Tags');

    // Trigger should not have --has-value class
    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    expect(trigger?.classList.contains('multi-select__trigger--has-value')).toBe(false);
  });

  it('should float label when has selected values', async () => {
    element.label = 'Tags';
    element.options = testOptions;
    element.value = ['family'];
    await elementUpdated(element);

    // Trigger should have --has-value class
    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    expect(trigger?.classList.contains('multi-select__trigger--has-value')).toBe(true);
  });

  it('should open dropdown on click', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const dropdown = shadowQuery<HTMLDivElement>(element, '.multi-select__dropdown');
    expect(dropdown).toBeDefined();
  });

  it('should not open dropdown when disabled', async () => {
    element.options = testOptions;
    element.disabled = true;
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const dropdown = shadowQuery<HTMLDivElement>(element, '.multi-select__dropdown');
    expect(dropdown).toBeNull();
  });

  it('should render all options in dropdown', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const options = shadowQueryAll<HTMLDivElement>(element, '.multi-select__option');
    expect(options.length).toBe(4);
  });

  it('should select option on click', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const options = shadowQueryAll<HTMLDivElement>(element, '.multi-select__option');
    options[0]?.click();
    await elementUpdated(element);

    expect(element.value).toContain('family');
  });

  it('should deselect option on second click', async () => {
    element.options = testOptions;
    element.value = ['family'];
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const options = shadowQueryAll<HTMLDivElement>(element, '.multi-select__option');
    options[0]?.click();
    await elementUpdated(element);

    expect(element.value).not.toContain('family');
  });

  it('should render tags for selected values', async () => {
    element.options = testOptions;
    element.value = ['family', 'friends'];
    await elementUpdated(element);

    const tags = shadowQueryAll(element, 'zev-tag');
    expect(tags.length).toBe(2);
  });

  it('should show +N indicator when more tags than maxDisplayTags', async () => {
    element.options = testOptions;
    element.value = ['family', 'family-in-law', 'coworkers', 'friends'];
    element.maxDisplayTags = 2;
    await elementUpdated(element);

    const tags = shadowQueryAll(element, 'zev-tag');
    expect(tags.length).toBe(2);

    const moreIndicator = shadowQuery<HTMLSpanElement>(element, '.multi-select__more');
    expect(moreIndicator).toBeDefined();
    expect(moreIndicator?.textContent).toBe('+2');
  });

  it('should emit multi-select-change event on selection', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('multi-select-change', handler);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const options = shadowQueryAll<HTMLDivElement>(element, '.multi-select__option');
    options[0]?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({
      values: ['family'],
      labels: ['Family'],
    });
  });

  it('should filter options based on search query', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const searchInput = shadowQuery<HTMLInputElement>(element, '.multi-select__search-input');
    if (searchInput) {
      searchInput.value = 'family';
      searchInput.dispatchEvent(new Event('input'));
    }
    await elementUpdated(element);

    const options = shadowQueryAll<HTMLDivElement>(element, '.multi-select__option');
    expect(options.length).toBe(2); // 'Family' and 'Family in law'
  });

  it('should emit multi-select-search event on search', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('multi-select-search', handler);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const searchInput = shadowQuery<HTMLInputElement>(element, '.multi-select__search-input');
    if (searchInput) {
      searchInput.value = 'test';
      searchInput.dispatchEvent(new Event('input'));
    }
    await elementUpdated(element);

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ query: 'test' });
  });

  it('should not render search input when searchable is false', async () => {
    element.options = testOptions;
    element.searchable = false;
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const searchInput = shadowQuery<HTMLInputElement>(element, '.multi-select__search-input');
    expect(searchInput).toBeNull();
  });

  it('should show empty message when no options match search', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    const searchInput = shadowQuery<HTMLInputElement>(element, '.multi-select__search-input');
    if (searchInput) {
      searchInput.value = 'xyz';
      searchInput.dispatchEvent(new Event('input'));
    }
    await elementUpdated(element);

    const emptyMessage = shadowQuery<HTMLDivElement>(element, '.multi-select__empty');
    expect(emptyMessage).not.toBeNull();
    expect(emptyMessage?.textContent?.trim()).toBe('Nenhuma opção encontrada');
  });

  it('should have disabled styling when disabled', async () => {
    element.disabled = true;
    await elementUpdated(element);

    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    expect(trigger?.classList.contains('multi-select__trigger--disabled')).toBe(true);
  });

  it('should toggle dropdown open state', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    // Initially closed
    let dropdown = shadowQuery<HTMLDivElement>(element, '.multi-select__dropdown');
    expect(dropdown).toBeNull();

    // Open
    const trigger = shadowQuery<HTMLDivElement>(element, '.multi-select__trigger');
    trigger?.click();
    await elementUpdated(element);

    dropdown = shadowQuery<HTMLDivElement>(element, '.multi-select__dropdown');
    expect(dropdown).not.toBeNull();

    // Close
    trigger?.click();
    await elementUpdated(element);

    dropdown = shadowQuery<HTMLDivElement>(element, '.multi-select__dropdown');
    expect(dropdown).toBeNull();
  });

  describe('accessibility', () => {
    it('should have role combobox on trigger', async () => {
      const trigger = shadowQuery<HTMLElement>(element, '.multi-select__trigger');
      expect(trigger?.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-expanded false when closed', async () => {
      const trigger = shadowQuery<HTMLElement>(element, '.multi-select__trigger');
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-haspopup listbox', async () => {
      const trigger = shadowQuery<HTMLElement>(element, '.multi-select__trigger');
      expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('should have tabindex 0 on trigger', async () => {
      const trigger = shadowQuery<HTMLElement>(element, '.multi-select__trigger');
      expect(trigger?.getAttribute('tabindex')).toBe('0');
    });

    it('should open on Enter key', async () => {
      const trigger = shadowQuery<HTMLElement>(element, '.multi-select__trigger');
      trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await elementUpdated(element);

      const dropdown = shadowQuery<HTMLElement>(element, '.multi-select__dropdown');
      expect(dropdown).not.toBeNull();
    });

    it('should close on Escape key', async () => {
      const trigger = shadowQuery<HTMLElement>(element, '.multi-select__trigger');
      trigger?.click();
      await elementUpdated(element);

      trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await elementUpdated(element);

      const dropdown = shadowQuery<HTMLElement>(element, '.multi-select__dropdown');
      expect(dropdown).toBeNull();
    });

    it('should have role listbox on options container', async () => {
      const trigger = shadowQuery<HTMLElement>(element, '.multi-select__trigger');
      trigger?.click();
      await elementUpdated(element);

      const options = shadowQuery<HTMLElement>(element, '.multi-select__options');
      expect(options?.getAttribute('role')).toBe('listbox');
    });

    it('should have role option on each option', async () => {
      element.options = [{ value: '1', label: 'One' }, { value: '2', label: 'Two' }];
      await elementUpdated(element);

      const trigger = shadowQuery<HTMLElement>(element, '.multi-select__trigger');
      trigger?.click();
      await elementUpdated(element);

      const opts = shadowQueryAll<HTMLElement>(element, '[role="option"]');
      expect(opts.length).toBe(2);
    });

    it('should have aria-hidden on chevron SVG', async () => {
      const svg = shadowQuery<SVGElement>(element, '.multi-select__chevron');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
