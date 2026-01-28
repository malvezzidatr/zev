import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/empty-state/zev-empty-state.js';
import type { ZevEmptyState } from '../components/empty-state/zev-empty-state.js';

describe('zev-empty-state', () => {
  let element: ZevEmptyState;

  beforeEach(async () => {
    element = fixture<ZevEmptyState>('zev-empty-state');
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
    expect(element.title).toBe('');
    expect(element.description).toBe('');
  });

  it('should render title', async () => {
    element.title = 'No results found';
    await elementUpdated(element);

    const title = shadowQuery<HTMLHeadingElement>(element, '.empty-state__title');
    expect(title?.textContent).toBe('No results found');
  });

  it('should render description', async () => {
    element.description = 'Try adjusting your filters';
    await elementUpdated(element);

    const description = shadowQuery<HTMLParagraphElement>(element, '.empty-state__description');
    expect(description?.textContent).toBe('Try adjusting your filters');
  });

  it('should not render title when empty', async () => {
    element.title = '';
    await elementUpdated(element);

    const title = shadowQuery<HTMLHeadingElement>(element, '.empty-state__title');
    expect(title).toBeNull();
  });

  it('should not render description when empty', async () => {
    element.description = '';
    await elementUpdated(element);

    const description = shadowQuery<HTMLParagraphElement>(element, '.empty-state__description');
    expect(description).toBeNull();
  });

  it('should render default icon', () => {
    const icon = shadowQuery<HTMLDivElement>(element, '.empty-state__icon');
    expect(icon).toBeDefined();

    const svg = shadowQuery<SVGElement>(element, '.empty-state__icon svg');
    expect(svg).toBeDefined();
  });

  it('should have icon slot', () => {
    const iconSlot = shadowQuery<HTMLSlotElement>(element, 'slot[name="icon"]');
    expect(iconSlot).toBeDefined();
  });

  it('should have action slot', () => {
    const actionSlot = shadowQuery<HTMLSlotElement>(element, 'slot[name="action"]');
    expect(actionSlot).toBeDefined();
  });
});
