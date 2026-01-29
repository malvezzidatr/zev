import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/input/zev-input.js';
import type { ZevInput } from '../components/input/zev-input.js';

describe('zev-input', () => {
  let element: ZevInput;

  beforeEach(async () => {
    element = fixture<ZevInput>('zev-input');
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
    expect(element.placeholder).toBe('');
    expect(element.value).toBe('');
    expect(element.icon).toBe('none');
    expect(element.disabled).toBe(false);
    expect(element.label).toBe('');
  });

  it('should render placeholder', async () => {
    element.placeholder = 'Search...';
    await elementUpdated(element);

    const input = shadowQuery<HTMLInputElement>(element, '.input');
    expect(input?.placeholder).toBe('Search...');
  });

  it('should render value', async () => {
    element.value = 'test value';
    await elementUpdated(element);

    const input = shadowQuery<HTMLInputElement>(element, '.input');
    expect(input?.value).toBe('test value');
  });

  it('should render search icon', async () => {
    element.icon = 'search';
    await elementUpdated(element);

    const icon = shadowQuery<SVGElement>(element, '.input__icon');
    expect(icon).toBeDefined();

    const input = shadowQuery<HTMLInputElement>(element, '.input');
    expect(input?.classList.contains('input--with-icon')).toBe(true);
  });

  it('should render filter icon', async () => {
    element.icon = 'filter';
    await elementUpdated(element);

    const icon = shadowQuery<SVGElement>(element, '.input__icon');
    expect(icon).toBeDefined();
  });

  it('should not render icon when none', async () => {
    element.icon = 'none';
    await elementUpdated(element);

    const icon = shadowQuery<SVGElement>(element, '.input__icon');
    expect(icon).toBeNull();
  });

  it('should emit input-change event on input', async () => {
    const handler = vi.fn();
    element.addEventListener('input-change', handler);

    const input = shadowQuery<HTMLInputElement>(element, '.input');
    if (input) {
      input.value = 'new value';
      input.dispatchEvent(new Event('input'));
    }

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ value: 'new value' });
  });

  it('should update value property on input', async () => {
    const input = shadowQuery<HTMLInputElement>(element, '.input');
    if (input) {
      input.value = 'updated';
      input.dispatchEvent(new Event('input'));
    }

    expect(element.value).toBe('updated');
  });

  it('should be disabled when disabled prop is true', async () => {
    element.disabled = true;
    await elementUpdated(element);

    const input = shadowQuery<HTMLInputElement>(element, '.input');
    expect(input?.disabled).toBe(true);
  });

  it('should render label when provided', async () => {
    element.label = 'Email';
    await elementUpdated(element);

    const label = shadowQuery<HTMLLabelElement>(element, '.input__label');
    expect(label).toBeDefined();
    expect(label?.textContent).toBe('Email');
  });

  it('should not render label when empty', async () => {
    element.label = '';
    await elementUpdated(element);

    const label = shadowQuery<HTMLLabelElement>(element, '.input__label');
    expect(label).toBeNull();
  });

  it('should render clear button when has value', async () => {
    element.value = 'test';
    await elementUpdated(element);

    const clearBtn = shadowQuery<HTMLButtonElement>(element, '.input__clear');
    expect(clearBtn).toBeDefined();
  });

  it('should not render clear button when empty', async () => {
    element.value = '';
    await elementUpdated(element);

    const clearBtn = shadowQuery<HTMLButtonElement>(element, '.input__clear');
    expect(clearBtn).toBeNull();
  });

  it('should not render clear button when disabled', async () => {
    element.value = 'test';
    element.disabled = true;
    await elementUpdated(element);

    const clearBtn = shadowQuery<HTMLButtonElement>(element, '.input__clear');
    expect(clearBtn).toBeNull();
  });

  it('should clear value and emit events on clear button click', async () => {
    element.value = 'test';
    await elementUpdated(element);

    const clearHandler = vi.fn();
    const changeHandler = vi.fn();
    element.addEventListener('input-clear', clearHandler);
    element.addEventListener('input-change', changeHandler);

    const clearBtn = shadowQuery<HTMLButtonElement>(element, '.input__clear');
    clearBtn?.click();

    expect(element.value).toBe('');
    expect(clearHandler).toHaveBeenCalled();
    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler.mock.calls[0][0].detail).toEqual({ value: '' });
  });

  it('should add input--with-clear class when has value', async () => {
    element.value = 'test';
    await elementUpdated(element);

    const input = shadowQuery<HTMLInputElement>(element, '.input');
    expect(input?.classList.contains('input--with-clear')).toBe(true);
  });
});
