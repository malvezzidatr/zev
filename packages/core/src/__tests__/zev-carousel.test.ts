import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/carousel/zev-carousel.js';
import '../components/carousel/zev-carousel-item.js';
import type { ZevCarousel } from '../components/carousel/zev-carousel.js';

// Helper to wait for slot to be assigned
async function waitForSlots(element: ZevCarousel, expectedCount: number, maxAttempts = 10): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    await elementUpdated(element);
    const slot = element.shadowRoot?.querySelector('slot');
    const assigned = slot?.assignedElements() || [];
    if (assigned.length === expectedCount) {
      // Dispatch slotchange event manually for happy-dom compatibility
      slot?.dispatchEvent(new Event('slotchange'));
      await elementUpdated(element);
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}

describe('zev-carousel', () => {
  let element: ZevCarousel;

  beforeEach(async () => {
    element = fixture<ZevCarousel>('zev-carousel');
    // Add some carousel items
    for (let i = 0; i < 5; i++) {
      const item = document.createElement('zev-carousel-item');
      item.innerHTML = `<div>Slide ${i + 1}</div>`;
      element.appendChild(item);
    }
    await waitForSlots(element, 5);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render navigation buttons by default', async () => {
    const prevBtn = shadowQuery<HTMLButtonElement>(element, '.carousel__nav--prev');
    const nextBtn = shadowQuery<HTMLButtonElement>(element, '.carousel__nav--next');

    expect(prevBtn).not.toBeNull();
    expect(nextBtn).not.toBeNull();
  });

  it('should hide navigation when hide-nav is set', async () => {
    element.hideNav = true;
    await elementUpdated(element);

    const navButtons = shadowQueryAll<HTMLButtonElement>(element, '.carousel__nav');
    navButtons.forEach((btn) => {
      expect(getComputedStyle(btn).display).toBe('none');
    });
  });

  it('should render indicators when slides exist', async () => {
    const indicators = shadowQueryAll<HTMLButtonElement>(element, '.carousel__indicator');
    expect(indicators.length).toBeGreaterThan(0);
  });

  it('should hide indicators when hide-indicators is set', async () => {
    element.hideIndicators = true;
    await elementUpdated(element);

    const indicatorsContainer = shadowQuery<HTMLElement>(element, '.carousel__indicators');
    expect(indicatorsContainer).toBeNull();
  });

  it('should disable prev button on first slide without loop', async () => {
    element.loop = false;
    await elementUpdated(element);

    const prevBtn = shadowQuery<HTMLButtonElement>(element, '.carousel__nav--prev');
    expect(prevBtn?.disabled).toBe(true);
  });

  it('should navigate to next slide on next button click', async () => {
    const handler = vi.fn();
    element.addEventListener('carousel-change', handler);

    const nextBtn = shadowQuery<HTMLButtonElement>(element, '.carousel__nav--next');
    nextBtn?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.index).toBe(1);
    expect(handler.mock.calls[0][0].detail.previousIndex).toBe(0);
  });

  it('should navigate to specific slide via goTo method', async () => {
    const handler = vi.fn();
    element.addEventListener('carousel-change', handler);

    element.goTo(3);

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.index).toBe(3);
  });

  it('should navigate via indicator click', async () => {
    const handler = vi.fn();
    element.addEventListener('carousel-change', handler);

    const indicators = shadowQueryAll<HTMLButtonElement>(element, '.carousel__indicator');
    indicators[2]?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail.index).toBe(2);
  });

  it('should loop to first slide when at end with loop enabled', async () => {
    element.loop = true;
    element.goTo(4); // Last slide
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('carousel-change', handler);

    const nextBtn = shadowQuery<HTMLButtonElement>(element, '.carousel__nav--next');
    nextBtn?.click();

    expect(handler.mock.calls[0][0].detail.index).toBe(0);
  });

  it('should loop to last slide when at start with loop enabled', async () => {
    element.loop = true;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('carousel-change', handler);

    const prevBtn = shadowQuery<HTMLButtonElement>(element, '.carousel__nav--prev');
    prevBtn?.click();

    expect(handler.mock.calls[0][0].detail.index).toBe(4);
  });

  it('should clamp index without loop', async () => {
    element.loop = false;
    await elementUpdated(element);

    element.goTo(100);
    await elementUpdated(element);

    // Should be clamped to max index
    const indicators = shadowQueryAll<HTMLButtonElement>(element, '.carousel__indicator');
    const activeIndicator = shadowQuery<HTMLButtonElement>(element, '.carousel__indicator--active');
    const lastIndex = indicators.length - 1;

    expect(indicators[lastIndex]).toBe(activeIndicator);
  });

  it('should apply slidesPerView attribute', async () => {
    element.slidesPerView = 3;
    await elementUpdated(element);

    expect(element.getAttribute('slides-per-view')).toBe('3');
  });

  it('should apply gap attribute', async () => {
    element.gap = 'md';
    await elementUpdated(element);

    expect(element.getAttribute('gap')).toBe('md');
  });

  it('should mark active indicator', async () => {
    element.goTo(2);
    await elementUpdated(element);

    const indicators = shadowQueryAll<HTMLButtonElement>(element, '.carousel__indicator');
    expect(indicators[2]?.classList.contains('carousel__indicator--active')).toBe(true);
  });

  describe('accessibility', () => {
    it('should have role region on carousel', async () => {
      const carousel = shadowQuery<HTMLElement>(element, '.carousel');
      expect(carousel?.getAttribute('role')).toBe('region');
    });

    it('should have aria-roledescription', async () => {
      const carousel = shadowQuery<HTMLElement>(element, '.carousel');
      expect(carousel?.getAttribute('aria-roledescription')).toBe('carrossel');
    });

    it('should have aria-label on carousel', async () => {
      const carousel = shadowQuery<HTMLElement>(element, '.carousel');
      expect(carousel?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-hidden on nav SVGs', async () => {
      const svgs = shadowQueryAll<SVGElement>(element, '.carousel__nav svg');
      svgs.forEach(svg => {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should have live region for slide announcements', async () => {
      const live = shadowQuery<HTMLElement>(element, '.carousel__live');
      expect(live?.getAttribute('aria-live')).toBe('polite');
    });

    it('should show pause button when autoplay is enabled', async () => {
      element.autoplay = true;
      await elementUpdated(element);

      const pause = shadowQuery<HTMLElement>(element, '.carousel__pause');
      expect(pause).not.toBeNull();
    });
  });
});

describe('zev-carousel-item', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = fixture('zev-carousel-item');
    element.innerHTML = '<div>Test content</div>';
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render slotted content', async () => {
    const slot = shadowQuery<HTMLSlotElement>(element, 'slot');
    expect(slot).not.toBeNull();
  });
});
