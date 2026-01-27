import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/section-header/zev-section-header.js';
import type { ZevSectionHeader } from '../components/section-header/zev-section-header.js';

describe('zev-section-header', () => {
  let element: ZevSectionHeader;

  beforeEach(async () => {
    element = fixture<ZevSectionHeader>('zev-section-header');
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
    expect(element.tag).toBe('');
    expect(element.title).toBe('');
    expect(element.variant).toBe('inline');
    expect(element.size).toBe('medium');
  });

  it('should render tag prop', async () => {
    element.tag = '[01]';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.header__tag');
    expect(tag?.textContent).toBe('[01]');
  });

  it('should not render tag when empty', async () => {
    element.tag = '';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.header__tag');
    expect(tag).toBeNull();
  });

  it('should render title prop', async () => {
    element.title = 'About Me';
    await elementUpdated(element);

    const title = shadowQuery<HTMLHeadingElement>(element, '.header__title');
    expect(title?.textContent?.trim()).toBe('About Me');
  });

  it('should render slotted title content', async () => {
    cleanup(element);
    const container = document.createElement('div');
    container.innerHTML = '<zev-section-header>Custom Title</zev-section-header>';
    document.body.appendChild(container);
    element = container.querySelector('zev-section-header') as ZevSectionHeader;
    await elementUpdated(element);

    const slot = shadowQuery<HTMLSlotElement>(element, 'slot');
    expect(slot).toBeDefined();

    cleanup(element);
    container.remove();
  });

  // Variant tests
  it('should reflect variant attribute for inline', async () => {
    element.variant = 'inline';
    await elementUpdated(element);

    expect(element.getAttribute('variant')).toBe('inline');
  });

  it('should reflect variant attribute for stacked', async () => {
    element.variant = 'stacked';
    await elementUpdated(element);

    expect(element.getAttribute('variant')).toBe('stacked');
  });

  it('should reflect variant attribute for centered', async () => {
    element.variant = 'centered';
    await elementUpdated(element);

    expect(element.getAttribute('variant')).toBe('centered');
  });

  // Size tests
  it('should reflect size attribute for small', async () => {
    element.size = 'small';
    await elementUpdated(element);

    expect(element.getAttribute('size')).toBe('small');
  });

  it('should reflect size attribute for medium', async () => {
    element.size = 'medium';
    await elementUpdated(element);

    expect(element.getAttribute('size')).toBe('medium');
  });

  it('should reflect size attribute for large', async () => {
    element.size = 'large';
    await elementUpdated(element);

    expect(element.getAttribute('size')).toBe('large');
  });

  it('should have header element with correct structure', async () => {
    element.tag = '[02]';
    element.title = 'Projects';
    await elementUpdated(element);

    const header = shadowQuery<HTMLElement>(element, '.header');
    expect(header).toBeDefined();
    expect(header?.tagName).toBe('HEADER');

    const tag = shadowQuery<HTMLSpanElement>(element, '.header__tag');
    const title = shadowQuery<HTMLHeadingElement>(element, '.header__title');
    expect(tag).toBeDefined();
    expect(title).toBeDefined();
  });
});
