import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/hero/zev-hero.js';
import type { ZevHero } from '../components/hero/zev-hero.js';

describe('zev-hero', () => {
  let element: ZevHero;

  beforeEach(async () => {
    element = fixture<ZevHero>('zev-hero');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render tag', async () => {
    element.tag = '[01]';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLElement>(element, '.hero__tag');
    expect(tag?.textContent).toBe('[01]');
  });

  it('should render label', async () => {
    element.label = 'Portfolio';
    await elementUpdated(element);

    const label = shadowQuery<HTMLElement>(element, '.hero__label-text');
    expect(label?.textContent).toBe('Portfolio');
  });

  it('should render name', async () => {
    element.name = 'John Doe';
    await elementUpdated(element);

    const name = shadowQuery<HTMLElement>(element, '.hero__name');
    expect(name?.textContent).toBe('John Doe');
  });

  it('should render subtitle', async () => {
    element.subtitle = 'Senior Developer';
    await elementUpdated(element);

    const subtitle = shadowQuery<HTMLElement>(element, '.hero__subtitle');
    expect(subtitle?.textContent).toBe('Senior Developer');
  });

  it('should render CTA button when provided', async () => {
    element.ctaText = 'Get Started';
    element.ctaHref = '#start';
    await elementUpdated(element);

    const cta = shadowQuery<HTMLAnchorElement>(element, '.hero__cta');
    expect(cta).toBeDefined();
    expect(cta?.textContent?.trim()).toContain('Get Started');
    expect(cta?.getAttribute('href')).toBe('#start');
  });

  it('should not render CTA when text is empty', async () => {
    element.ctaText = '';
    await elementUpdated(element);

    const cta = shadowQuery<HTMLAnchorElement>(element, '.hero__cta');
    expect(cta).toBeNull();
  });

  it('should emit cta-click event', async () => {
    element.ctaText = 'Click Me';
    element.ctaHref = '#click';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('cta-click', handler);

    const cta = shadowQuery<HTMLAnchorElement>(element, '.hero__cta');
    cta?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toHaveProperty('href', '#click');
  });

  it('should have scroll indicator', async () => {
    const scrollIndicator = shadowQuery<HTMLElement>(element, '.hero__scroll-indicator');
    expect(scrollIndicator).toBeDefined();
  });

  it('should render year', async () => {
    element.year = '2025';
    await elementUpdated(element);

    const year = shadowQuery<HTMLElement>(element, '.hero__year');
    expect(year?.textContent).toBe('2025');
  });
});
