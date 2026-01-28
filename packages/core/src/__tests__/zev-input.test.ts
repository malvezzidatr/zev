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
});
