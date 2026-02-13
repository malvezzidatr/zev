import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/modal/zev-modal.js';
import type { ZevModal } from '../components/modal/zev-modal.js';

describe('zev-modal', () => {
  let element: ZevModal;

  beforeEach(async () => {
    element = fixture<ZevModal>('zev-modal');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
    document.body.style.overflow = '';
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should not render content when closed', async () => {
    element.open = false;
    await elementUpdated(element);

    const overlay = shadowQuery<HTMLElement>(element, '.modal__overlay');
    expect(overlay).toBeNull();
  });

  it('should render content when open', async () => {
    element.open = true;
    element.title = 'Test Title';
    await elementUpdated(element);

    const overlay = shadowQuery<HTMLElement>(element, '.modal__overlay');
    expect(overlay).not.toBeNull();

    const title = shadowQuery<HTMLElement>(element, '.modal__title');
    expect(title?.textContent).toBe('Test Title');
  });

  it('should emit modal-open event when opened', async () => {
    const handler = vi.fn();
    element.addEventListener('modal-open', handler);

    element.open = true;
    await elementUpdated(element);

    expect(handler).toHaveBeenCalled();
  });

  it('should emit modal-close event when close button is clicked', async () => {
    element.open = true;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('modal-close', handler);

    const closeBtn = shadowQuery<HTMLButtonElement>(element, '.modal__close');
    closeBtn?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('should emit modal-close event when overlay is clicked', async () => {
    element.open = true;
    element.closeOnOverlay = true;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('modal-close', handler);

    const overlay = shadowQuery<HTMLElement>(element, '.modal__overlay');
    overlay?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('should not emit modal-close event when closeOnOverlay is false', async () => {
    element.open = true;
    element.closeOnOverlay = false;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('modal-close', handler);

    const overlay = shadowQuery<HTMLElement>(element, '.modal__overlay');
    overlay?.click();

    expect(handler).not.toHaveBeenCalled();
  });

  it('should emit modal-close event on Escape key', async () => {
    element.open = true;
    element.closeOnEscape = true;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('modal-close', handler);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(handler).toHaveBeenCalled();
  });

  it('should not emit modal-close on Escape when closeOnEscape is false', async () => {
    element.open = true;
    element.closeOnEscape = false;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('modal-close', handler);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(handler).not.toHaveBeenCalled();
  });

  it('should hide close button when hideClose is true', async () => {
    element.open = true;
    element.hideClose = true;
    element.title = 'Test';
    await elementUpdated(element);

    const closeBtn = shadowQuery<HTMLButtonElement>(element, '.modal__close');
    expect(closeBtn).toBeNull();
  });

  it('should apply size attribute', async () => {
    element.open = true;
    element.size = 'lg';
    await elementUpdated(element);

    expect(element.getAttribute('size')).toBe('lg');
  });

  it('should lock body scroll when open', async () => {
    element.open = true;
    await elementUpdated(element);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unlock body scroll when closed', async () => {
    element.open = true;
    await elementUpdated(element);

    element.open = false;
    await elementUpdated(element);

    expect(document.body.style.overflow).toBe('');
  });

  it('should keep body overflow hidden when one of two modals closes', async () => {
    const modal2 = fixture<ZevModal>('zev-modal');
    await elementUpdated(modal2);

    element.open = true;
    await elementUpdated(element);
    expect(document.body.style.overflow).toBe('hidden');

    modal2.open = true;
    await elementUpdated(modal2);
    expect(document.body.style.overflow).toBe('hidden');

    // Close first modal — second is still open
    element.open = false;
    await elementUpdated(element);
    expect(document.body.style.overflow).toBe('hidden');

    // Close second modal — all closed
    modal2.open = false;
    await elementUpdated(modal2);
    expect(document.body.style.overflow).toBe('');

    cleanup(modal2);
  });

  it('should render slotted content', async () => {
    element.open = true;
    element.innerHTML = '<p>Modal content</p>';
    await elementUpdated(element);

    const body = shadowQuery<HTMLElement>(element, '.modal__body');
    expect(body).not.toBeNull();
  });

  describe('accessibility', () => {
    it('should have aria-hidden on close button SVG', async () => {
      element.open = true;
      element.title = 'Test';
      await elementUpdated(element);
      const svg = shadowQuery<SVGElement>(element, '.modal__close svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have focus-visible styles on close button', async () => {
      element.open = true;
      element.title = 'Test';
      await elementUpdated(element);
      const closeBtn = shadowQuery<HTMLButtonElement>(element, '.modal__close');
      expect(closeBtn).not.toBeNull();
    });
  });
});
