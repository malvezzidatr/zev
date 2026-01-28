import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/button/zev-button.js';
import type { ZevButton } from '../components/button/zev-button.js';

describe('zev-button', () => {
  let element: ZevButton;

  beforeEach(async () => {
    element = fixture<ZevButton>('zev-button');
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
    expect(element.variant).toBe('primary');
    expect(element.size).toBe('md');
    expect(element.disabled).toBe(false);
  });

  it('should apply primary variant class by default', () => {
    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    expect(button?.classList.contains('btn--primary')).toBe(true);
  });

  it('should apply secondary variant class', async () => {
    element.variant = 'secondary';
    await elementUpdated(element);

    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    expect(button?.classList.contains('btn--secondary')).toBe(true);
    expect(button?.classList.contains('btn--primary')).toBe(false);
  });

  it('should apply ghost variant class', async () => {
    element.variant = 'ghost';
    await elementUpdated(element);

    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    expect(button?.classList.contains('btn--ghost')).toBe(true);
  });

  it('should apply sm size class', async () => {
    element.size = 'sm';
    await elementUpdated(element);

    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    expect(button?.classList.contains('btn--sm')).toBe(true);
  });

  it('should apply lg size class', async () => {
    element.size = 'lg';
    await elementUpdated(element);

    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    expect(button?.classList.contains('btn--lg')).toBe(true);
  });

  it('should emit button-click event when clicked', async () => {
    const handler = vi.fn();
    element.addEventListener('button-click', handler);

    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    button?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ variant: 'primary' });
  });

  it('should include variant in event detail', async () => {
    element.variant = 'secondary';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('button-click', handler);

    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    button?.click();

    expect(handler.mock.calls[0][0].detail).toEqual({ variant: 'secondary' });
  });

  it('should not emit button-click event when disabled', async () => {
    element.disabled = true;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('button-click', handler);

    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    button?.click();

    expect(handler).not.toHaveBeenCalled();
  });

  it('should have disabled attribute on button when disabled', async () => {
    element.disabled = true;
    await elementUpdated(element);

    const button = shadowQuery<HTMLButtonElement>(element, '.btn');
    expect(button?.disabled).toBe(true);
  });

  it('should render slotted content', async () => {
    cleanup(element);
    const container = document.createElement('div');
    container.innerHTML = '<zev-button>Click me</zev-button>';
    document.body.appendChild(container);
    element = container.querySelector('zev-button') as ZevButton;
    await elementUpdated(element);

    const slot = shadowQuery<HTMLSlotElement>(element, 'slot');
    expect(slot).toBeDefined();

    cleanup(element);
    container.remove();
  });
});
