import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/tag/zev-tag.js';
import type { ZevTag } from '../components/tag/zev-tag.js';

describe('zev-tag', () => {
  let element: ZevTag;

  beforeEach(async () => {
    element = fixture<ZevTag>('zev-tag');
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
    expect(element.label).toBe('');
    expect(element.variant).toBe('default');
    expect(element.size).toBe('medium');
    expect(element.interactive).toBe(false);
    expect(element.removable).toBe(false);
  });

  it('should render label prop', async () => {
    element.label = 'React';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.textContent?.trim()).toBe('React');
  });

  it('should render slotted content', async () => {
    cleanup(element);
    const container = document.createElement('div');
    container.innerHTML = '<zev-tag>TypeScript</zev-tag>';
    document.body.appendChild(container);
    element = container.querySelector('zev-tag') as ZevTag;
    await elementUpdated(element);

    const slot = shadowQuery<HTMLSlotElement>(element, 'slot');
    expect(slot).toBeDefined();

    cleanup(element);
    container.remove();
  });

  // Size variants
  it('should apply small size class', async () => {
    element.size = 'small';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.classList.contains('tag--small')).toBe(true);
  });

  it('should apply large size class', async () => {
    element.size = 'large';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.classList.contains('tag--large')).toBe(true);
  });

  it('should not apply size class for medium (default)', async () => {
    element.size = 'medium';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.classList.contains('tag--small')).toBe(false);
    expect(tag?.classList.contains('tag--large')).toBe(false);
  });

  // Variant styles
  it('should apply accent variant class', async () => {
    element.variant = 'accent';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.classList.contains('tag--accent')).toBe(true);
  });

  it('should apply outline variant class', async () => {
    element.variant = 'outline';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.classList.contains('tag--outline')).toBe(true);
  });

  it('should apply ghost variant class', async () => {
    element.variant = 'ghost';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.classList.contains('tag--ghost')).toBe(true);
  });

  // Interactive behavior
  it('should reflect interactive attribute', async () => {
    element.interactive = true;
    await elementUpdated(element);

    expect(element.hasAttribute('interactive')).toBe(true);
  });

  it('should add role button when interactive', async () => {
    element.interactive = true;
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.getAttribute('role')).toBe('button');
  });

  it('should add tabindex when interactive', async () => {
    element.interactive = true;
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.getAttribute('tabindex')).toBe('0');
  });

  it('should not have role button when not interactive', async () => {
    element.interactive = false;
    await elementUpdated(element);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    expect(tag?.hasAttribute('role')).toBe(false);
  });

  it('should emit tag-click event when interactive and clicked', async () => {
    element.interactive = true;
    element.label = 'Clickable';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('tag-click', handler);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    tag?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ label: 'Clickable' });
  });

  it('should not emit tag-click event when not interactive', async () => {
    element.interactive = false;
    element.label = 'Not Clickable';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('tag-click', handler);

    const tag = shadowQuery<HTMLSpanElement>(element, '.tag');
    tag?.click();

    expect(handler).not.toHaveBeenCalled();
  });

  // Removable behavior
  it('should not show remove button by default', async () => {
    const removeBtn = shadowQuery<HTMLButtonElement>(element, '.tag__remove');
    expect(removeBtn).toBeNull();
  });

  it('should show remove button when removable', async () => {
    element.removable = true;
    await elementUpdated(element);

    const removeBtn = shadowQuery<HTMLButtonElement>(element, '.tag__remove');
    expect(removeBtn).toBeDefined();
    expect(removeBtn?.tagName).toBe('BUTTON');
  });

  it('should have aria-label on remove button', async () => {
    element.removable = true;
    element.label = 'Test';
    await elementUpdated(element);

    const removeBtn = shadowQuery<HTMLButtonElement>(element, '.tag__remove');
    expect(removeBtn?.getAttribute('aria-label')).toBe('Remover Test');
  });

  it('should emit tag-remove event when remove button clicked', async () => {
    element.removable = true;
    element.label = 'Removable';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('tag-remove', handler);

    const removeBtn = shadowQuery<HTMLButtonElement>(element, '.tag__remove');
    removeBtn?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ label: 'Removable' });
  });

  it('should stop propagation when remove button clicked', async () => {
    element.removable = true;
    element.interactive = true;
    element.label = 'Both';
    await elementUpdated(element);

    const clickHandler = vi.fn();
    const removeHandler = vi.fn();
    element.addEventListener('tag-click', clickHandler);
    element.addEventListener('tag-remove', removeHandler);

    const removeBtn = shadowQuery<HTMLButtonElement>(element, '.tag__remove');
    removeBtn?.click();

    expect(removeHandler).toHaveBeenCalled();
    expect(clickHandler).not.toHaveBeenCalled();
  });

  describe('accessibility', () => {
    it('should handle Enter key when interactive', async () => {
      element.interactive = true;
      element.label = 'Test';
      await elementUpdated(element);

      const handler = vi.fn();
      element.addEventListener('tag-click', handler);

      const span = shadowQuery<HTMLElement>(element, '.tag');
      span?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(handler).toHaveBeenCalled();
    });

    it('should handle Space key when interactive', async () => {
      element.interactive = true;
      element.label = 'Test';
      await elementUpdated(element);

      const handler = vi.fn();
      element.addEventListener('tag-click', handler);

      const span = shadowQuery<HTMLElement>(element, '.tag');
      span?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

      expect(handler).toHaveBeenCalled();
    });
  });
});
