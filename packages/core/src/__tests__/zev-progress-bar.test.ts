import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/progress-bar/zev-progress-bar.js';
import type { ZevProgressBar } from '../components/progress-bar/zev-progress-bar.js';

describe('zev-progress-bar', () => {
  let element: ZevProgressBar;

  beforeEach(async () => {
    element = fixture<ZevProgressBar>('zev-progress-bar');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render track and bar', async () => {
    const track = shadowQuery<HTMLElement>(element, '.progress__track');
    const bar = shadowQuery<HTMLElement>(element, '.progress__bar');

    expect(track).not.toBeNull();
    expect(bar).not.toBeNull();
  });

  it('should set bar width based on value', async () => {
    element.value = 50;
    element.max = 100;
    await elementUpdated(element);

    const bar = shadowQuery<HTMLElement>(element, '.progress__bar');
    expect(bar?.style.width).toBe('50%');
  });

  it('should handle value greater than max', async () => {
    element.value = 150;
    element.max = 100;
    await elementUpdated(element);

    const bar = shadowQuery<HTMLElement>(element, '.progress__bar');
    expect(bar?.style.width).toBe('100%');
  });

  it('should handle negative value', async () => {
    element.value = -10;
    element.max = 100;
    await elementUpdated(element);

    const bar = shadowQuery<HTMLElement>(element, '.progress__bar');
    expect(bar?.style.width).toBe('0%');
  });

  it('should display label', async () => {
    element.label = 'Loading...';
    await elementUpdated(element);

    const label = shadowQuery<HTMLElement>(element, '.progress__label');
    expect(label?.textContent).toBe('Loading...');
  });

  it('should show percentage value when showValue is true', async () => {
    element.value = 75;
    element.showValue = true;
    await elementUpdated(element);

    const value = shadowQuery<HTMLElement>(element, '.progress__value');
    expect(value?.textContent).toBe('75%');
  });

  it('should not show value when showValue is false', async () => {
    element.value = 75;
    element.showValue = false;
    await elementUpdated(element);

    const value = shadowQuery<HTMLElement>(element, '.progress__value');
    expect(value).toBeNull();
  });

  it('should apply variant attribute', async () => {
    element.variant = 'success';
    await elementUpdated(element);

    expect(element.getAttribute('variant')).toBe('success');
  });

  it('should apply size attribute', async () => {
    element.size = 'lg';
    await elementUpdated(element);

    expect(element.getAttribute('size')).toBe('lg');
  });

  it('should apply indeterminate attribute', async () => {
    element.indeterminate = true;
    await elementUpdated(element);

    expect(element.hasAttribute('indeterminate')).toBe(true);
  });

  it('should not show value when indeterminate', async () => {
    element.indeterminate = true;
    element.showValue = true;
    await elementUpdated(element);

    const value = shadowQuery<HTMLElement>(element, '.progress__value');
    expect(value).toBeNull();
  });

  it('should apply striped attribute', async () => {
    element.striped = true;
    await elementUpdated(element);

    expect(element.hasAttribute('striped')).toBe(true);
  });

  it('should apply animated attribute', async () => {
    element.animated = true;
    await elementUpdated(element);

    expect(element.hasAttribute('animated')).toBe(true);
  });

  it('should have correct aria attributes', async () => {
    element.value = 50;
    element.max = 100;
    element.label = 'Progress';
    await elementUpdated(element);

    const progress = shadowQuery<HTMLElement>(element, '.progress');
    expect(progress?.getAttribute('role')).toBe('progressbar');
    expect(progress?.getAttribute('aria-valuenow')).toBe('50');
    expect(progress?.getAttribute('aria-valuemin')).toBe('0');
    expect(progress?.getAttribute('aria-valuemax')).toBe('100');
  });
});
