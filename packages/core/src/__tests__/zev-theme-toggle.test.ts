import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/theme-toggle/zev-theme-toggle.js';
import type { ZevThemeToggle } from '../components/theme-toggle/zev-theme-toggle.js';

describe('zev-theme-toggle', () => {
  let element: ZevThemeToggle;

  beforeEach(async () => {
    document.documentElement.removeAttribute('data-theme');
    element = fixture<ZevThemeToggle>('zev-theme-toggle');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
    document.documentElement.removeAttribute('data-theme');
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should read initial theme from data-theme attribute when dark', async () => {
    cleanup(element);
    document.documentElement.setAttribute('data-theme', 'dark');

    element = fixture<ZevThemeToggle>('zev-theme-toggle');
    await elementUpdated(element);

    expect(element.theme).toBe('dark');
  });

  it('should read initial theme from data-theme attribute when light', async () => {
    cleanup(element);
    document.documentElement.setAttribute('data-theme', 'light');

    element = fixture<ZevThemeToggle>('zev-theme-toggle');
    await elementUpdated(element);

    expect(element.theme).toBe('light');
  });

  it('should use prefers-color-scheme dark when no data-theme is set', async () => {
    cleanup(element);
    document.documentElement.removeAttribute('data-theme');

    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    element = fixture<ZevThemeToggle>('zev-theme-toggle');
    await elementUpdated(element);

    expect(element.theme).toBe('dark');

    window.matchMedia = originalMatchMedia;
  });

  it('should use light theme when prefers-color-scheme is light and no data-theme', async () => {
    cleanup(element);
    document.documentElement.removeAttribute('data-theme');

    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    element = fixture<ZevThemeToggle>('zev-theme-toggle');
    await elementUpdated(element);

    expect(element.theme).toBe('light');

    window.matchMedia = originalMatchMedia;
  });

  it('should have a toggle button', async () => {
    const button = shadowQuery<HTMLButtonElement>(element, '.toggle');
    expect(button).toBeDefined();
    expect(button?.tagName).toBe('BUTTON');
  });

  it('should have aria-label for accessibility', async () => {
    const button = shadowQuery<HTMLButtonElement>(element, '.toggle');
    expect(button?.getAttribute('aria-label')).toBeTruthy();
  });

  it('should toggle theme from light to dark on click', async () => {
    element.theme = 'light';
    await elementUpdated(element);

    const button = shadowQuery<HTMLButtonElement>(element, '.toggle');
    button?.click();
    await elementUpdated(element);

    expect(element.theme).toBe('dark');
  });

  it('should toggle theme from dark to light on click', async () => {
    element.theme = 'dark';
    await elementUpdated(element);

    const button = shadowQuery<HTMLButtonElement>(element, '.toggle');
    button?.click();
    await elementUpdated(element);

    expect(element.theme).toBe('light');
  });

  it('should set data-theme attribute on document', async () => {
    element.theme = 'light';
    await elementUpdated(element);

    const button = shadowQuery<HTMLButtonElement>(element, '.toggle');
    button?.click();
    await elementUpdated(element);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should emit theme-change event on toggle', async () => {
    const handler = vi.fn();
    element.addEventListener('theme-change', handler);

    const button = shadowQuery<HTMLButtonElement>(element, '.toggle');
    button?.click();
    await elementUpdated(element);

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toHaveProperty('theme');
  });

  it('should show sun icon in dark mode', async () => {
    element.theme = 'dark';
    await elementUpdated(element);

    const svg = shadowQuery<SVGElement>(element, 'svg');
    expect(svg).toBeDefined();
  });

  it('should show moon icon in light mode', async () => {
    element.theme = 'light';
    await elementUpdated(element);

    const svg = shadowQuery<SVGElement>(element, 'svg');
    expect(svg).toBeDefined();
  });
});
