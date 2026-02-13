import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/loader/zev-loader.js';
import type { ZevLoader } from '../components/loader/zev-loader.js';

describe('zev-loader', () => {
  let element: ZevLoader;

  beforeEach(async () => {
    element = fixture<ZevLoader>('zev-loader');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render with default size (md)', () => {
    expect(element.size).toBe('md');
    const skeleton = shadowQuery<HTMLDivElement>(element, '.skeleton');
    expect(skeleton?.classList.contains('skeleton--md')).toBe(true);
  });

  it('should apply sm size class', async () => {
    element.size = 'sm';
    await elementUpdated(element);

    const skeleton = shadowQuery<HTMLDivElement>(element, '.skeleton');
    expect(skeleton?.classList.contains('skeleton--sm')).toBe(true);
    expect(skeleton?.classList.contains('skeleton--md')).toBe(false);
  });

  it('should apply lg size class', async () => {
    element.size = 'lg';
    await elementUpdated(element);

    const skeleton = shadowQuery<HTMLDivElement>(element, '.skeleton');
    expect(skeleton?.classList.contains('skeleton--lg')).toBe(true);
  });

  it('should have skeleton base class', () => {
    const skeleton = shadowQuery<HTMLDivElement>(element, '.skeleton');
    expect(skeleton?.classList.contains('skeleton')).toBe(true);
  });

  it('should apply custom width', async () => {
    element.width = '200px';
    await elementUpdated(element);

    const skeleton = shadowQuery<HTMLDivElement>(element, '.skeleton');
    expect(skeleton?.style.width).toBe('200px');
  });

  it('should apply custom height', async () => {
    element.height = '3rem';
    await elementUpdated(element);

    const skeleton = shadowQuery<HTMLDivElement>(element, '.skeleton');
    expect(skeleton?.style.height).toBe('3rem');
  });

  it('should apply both width and height', async () => {
    element.width = '100px';
    element.height = '20px';
    await elementUpdated(element);

    const skeleton = shadowQuery<HTMLDivElement>(element, '.skeleton');
    expect(skeleton?.style.width).toBe('100px');
    expect(skeleton?.style.height).toBe('20px');
  });
});
