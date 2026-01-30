import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/select/zev-select.js';
import type { ZevSelect } from '../components/select/zev-select.js';

describe('zev-select', () => {
  let element: ZevSelect;
  const testOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ];

  beforeEach(async () => {
    element = fixture<ZevSelect>('zev-select');
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
    expect(element.value).toBe('');
    expect(element.disabled).toBe(false);
    expect(element.label).toBe('');
  });

  it('should have empty option for initial state', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const emptyOption = shadowQuery<HTMLOptionElement>(element, 'option[value=""]');
    expect(emptyOption).toBeDefined();
    expect(emptyOption?.textContent?.trim()).toBe('');
  });

  it('should render options', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const options = shadowQueryAll<HTMLOptionElement>(element, 'option');
    // +1 for placeholder option
    expect(options.length).toBe(4);
    expect(options[1].value).toBe('react');
    expect(options[1].textContent?.trim()).toBe('React');
  });

  it('should select value', async () => {
    element.options = testOptions;
    element.value = 'vue';
    await elementUpdated(element);

    // Check component property maintains the value
    expect(element.value).toBe('vue');

    // Check that the vue option exists
    const options = shadowQueryAll<HTMLOptionElement>(element, 'option');
    const vueOption = Array.from(options).find(opt => opt.value === 'vue');
    expect(vueOption).toBeDefined();
    expect(vueOption?.textContent?.trim()).toBe('Vue');
  });

  it('should emit select-change event on change', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('select-change', handler);

    const select = shadowQuery<HTMLSelectElement>(element, '.select');
    if (select) {
      select.value = 'react';
      select.dispatchEvent(new Event('change'));
    }

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ value: 'react', label: 'React' });
  });

  it('should update value property on change', async () => {
    element.options = testOptions;
    await elementUpdated(element);

    const select = shadowQuery<HTMLSelectElement>(element, '.select');
    if (select) {
      select.value = 'angular';
      select.dispatchEvent(new Event('change'));
    }

    expect(element.value).toBe('angular');
  });

  it('should be disabled when disabled prop is true', async () => {
    element.disabled = true;
    await elementUpdated(element);

    const select = shadowQuery<HTMLSelectElement>(element, '.select');
    expect(select?.disabled).toBe(true);
  });

  it('should render chevron icon', () => {
    const chevron = shadowQuery<SVGElement>(element, '.select__chevron');
    expect(chevron).toBeDefined();
  });

  it('should render label when provided', async () => {
    element.label = 'Tecnologia';
    await elementUpdated(element);

    const label = shadowQuery<HTMLLabelElement>(element, '.select__label');
    expect(label).toBeDefined();
    expect(label?.textContent).toBe('Tecnologia');
  });

  it('should not render label when empty', async () => {
    element.label = '';
    await elementUpdated(element);

    const label = shadowQuery<HTMLLabelElement>(element, '.select__label');
    expect(label).toBeNull();
  });
});
