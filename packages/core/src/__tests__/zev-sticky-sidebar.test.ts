import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/sticky-sidebar/zev-sticky-sidebar.js';
import type { ZevStickySidebar } from '../components/sticky-sidebar/zev-sticky-sidebar.js';

describe('zev-sticky-sidebar', () => {
  let element: ZevStickySidebar;

  beforeEach(async () => {
    element = fixture<ZevStickySidebar>('zev-sticky-sidebar');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render sidebar structure', async () => {
    const sidebar = shadowQuery<HTMLElement>(element, '.sidebar');
    expect(sidebar).toBeDefined();

    const accent = shadowQuery<HTMLElement>(element, '.sidebar__accent');
    expect(accent).toBeDefined();

    const content = shadowQuery<HTMLElement>(element, '.sidebar__content');
    expect(content).toBeDefined();
  });

  it('should render title when provided', async () => {
    element.title = 'Test Title';
    await elementUpdated(element);

    const title = shadowQuery<HTMLElement>(element, '.sidebar__title');
    expect(title).toBeDefined();
    expect(title?.textContent).toBe('Test Title');
  });

  it('should not render title when not provided', async () => {
    element.title = '';
    await elementUpdated(element);

    const title = shadowQuery<HTMLElement>(element, '.sidebar__title');
    expect(title).toBeNull();
  });

  it('should render description when provided', async () => {
    element.description = 'Test description text';
    await elementUpdated(element);

    const description = shadowQuery<HTMLElement>(element, '.sidebar__description');
    expect(description).toBeDefined();
    expect(description?.textContent).toBe('Test description text');
  });

  it('should render image when provided', async () => {
    element.image = 'https://example.com/image.jpg';
    await elementUpdated(element);

    const img = shadowQuery<HTMLImageElement>(element, '.sidebar__image');
    expect(img).toBeDefined();
    expect(img?.src).toBe('https://example.com/image.jpg');
  });

  it('should render placeholder when no image provided', async () => {
    element.image = '';
    await elementUpdated(element);

    const placeholder = shadowQuery<HTMLElement>(element, '.sidebar__image--placeholder');
    expect(placeholder).toBeDefined();

    const svg = shadowQuery<SVGElement>(element, '.sidebar__image--placeholder svg');
    expect(svg).toBeDefined();
  });

  it('should apply variant class to accent bar', async () => {
    element.variant = 'success';
    await elementUpdated(element);

    const accent = shadowQuery<HTMLElement>(element, '.sidebar__accent');
    expect(accent?.classList.contains('sidebar__accent--success')).toBe(true);
  });

  it('should apply all variant classes correctly', async () => {
    const variants = ['primary', 'success', 'warning', 'info', 'neutral'] as const;

    for (const variant of variants) {
      element.variant = variant;
      await elementUpdated(element);

      const accent = shadowQuery<HTMLElement>(element, '.sidebar__accent');
      expect(accent?.classList.contains(`sidebar__accent--${variant}`)).toBe(true);
    }
  });

  it('should have sticky attribute when sticky is true', async () => {
    element.sticky = true;
    await elementUpdated(element);

    expect(element.hasAttribute('sticky')).toBe(true);
  });

  it('should not have sticky attribute when sticky is false', async () => {
    element.sticky = false;
    await elementUpdated(element);

    expect(element.hasAttribute('sticky')).toBe(false);
  });

  it('should render slot content', async () => {
    cleanup(element);

    const container = document.createElement('div');
    container.innerHTML = `
      <zev-sticky-sidebar>
        <button>Action Button</button>
      </zev-sticky-sidebar>
    `;
    document.body.appendChild(container);
    element = container.querySelector('zev-sticky-sidebar') as ZevStickySidebar;
    await elementUpdated(element);

    const slot = shadowQuery<HTMLSlotElement>(element, 'slot');
    expect(slot).toBeDefined();

    container.remove();
  });

  it('should use title as image alt text', async () => {
    element.image = 'https://example.com/image.jpg';
    element.title = 'My Title';
    await elementUpdated(element);

    const img = shadowQuery<HTMLImageElement>(element, '.sidebar__image');
    expect(img?.alt).toBe('My Title');
  });

  it('should have default alt text when no title', async () => {
    element.image = 'https://example.com/image.jpg';
    element.title = '';
    await elementUpdated(element);

    const img = shadowQuery<HTMLImageElement>(element, '.sidebar__image');
    expect(img?.alt).toBe('Sidebar image');
  });
});
