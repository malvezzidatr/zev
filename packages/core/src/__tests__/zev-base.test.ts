import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ZevBase } from '../base/zev-base.js';
import { fixture, cleanup, elementUpdated } from './test-helpers.js';

// Test component that exposes protected members
@customElement('zev-test-base')
class ZevTestBase extends ZevBase {
  get testIsMobile(): boolean {
    return this.isMobile;
  }

  testEmitEvent<T>(name: string, detail?: T) {
    return this.emitEvent(name, detail);
  }

  render() {
    return html`<div>Test</div>`;
  }
}

describe('ZevBase', () => {
  let element: ZevTestBase;

  beforeEach(async () => {
    element = fixture<ZevTestBase>('zev-test-base');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should have shared styles', () => {
    expect(ZevBase.styles).toBeDefined();
    expect(ZevBase.styles.length).toBeGreaterThan(0);
  });

  it('should emit custom events with bubbles and composed', () => {
    const handler = vi.fn();
    element.addEventListener('test-event', handler);

    element.testEmitEvent('test-event', { value: 42 });

    expect(handler).toHaveBeenCalled();
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
    expect(event.detail).toEqual({ value: 42 });
  });

  it('should emit events without detail', () => {
    const handler = vi.fn();
    element.addEventListener('simple-event', handler);

    element.testEmitEvent('simple-event');

    expect(handler).toHaveBeenCalled();
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toBeNull();
  });

  it('should return isMobile based on matchMedia', () => {
    // In happy-dom, matchMedia returns false by default
    const result = element.testIsMobile;
    expect(typeof result).toBe('boolean');
  });

  it('should check isMobile with mock', () => {
    const originalMatchMedia = window.matchMedia;

    // Mock matchMedia to return true for mobile
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    expect(element.testIsMobile).toBe(true);

    // Restore
    window.matchMedia = originalMatchMedia;
  });
});

declare global {
  interface HTMLElementTagNameMap {
    'zev-test-base': ZevTestBase;
  }
}
