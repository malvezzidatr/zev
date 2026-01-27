import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/timeline-item/zev-timeline-item.js';
import type { ZevTimelineItem } from '../components/timeline-item/zev-timeline-item.js';

describe('zev-timeline-item', () => {
  let element: ZevTimelineItem;

  beforeEach(async () => {
    element = fixture<ZevTimelineItem>('zev-timeline-item');
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
    expect(element.year).toBe('');
    expect(element.title).toBe('');
    expect(element.description).toBe('');
    expect(element.connected).toBe(false);
  });

  it('should render year prop', async () => {
    element.year = '2024';
    await elementUpdated(element);

    const year = shadowQuery<HTMLSpanElement>(element, '.item__year');
    expect(year?.textContent).toBe('2024');
  });

  it('should not render year when empty', async () => {
    element.year = '';
    await elementUpdated(element);

    const year = shadowQuery<HTMLSpanElement>(element, '.item__year');
    expect(year).toBeNull();
  });

  it('should render title prop', async () => {
    element.title = 'Software Engineer';
    await elementUpdated(element);

    const title = shadowQuery<HTMLHeadingElement>(element, '.item__title');
    expect(title?.textContent?.trim()).toBe('Software Engineer');
  });

  it('should render description prop', async () => {
    element.description = 'Working on amazing projects';
    await elementUpdated(element);

    const desc = shadowQuery<HTMLParagraphElement>(element, '.item__description');
    expect(desc?.textContent?.trim()).toBe('Working on amazing projects');
  });

  it('should have dot element', async () => {
    const dot = shadowQuery<HTMLDivElement>(element, '.item__dot');
    expect(dot).toBeDefined();
  });

  it('should reflect connected attribute', async () => {
    element.connected = true;
    await elementUpdated(element);

    expect(element.hasAttribute('connected')).toBe(true);
  });

  it('should not have connected attribute by default', async () => {
    expect(element.hasAttribute('connected')).toBe(false);
  });

  it('should have correct structure', async () => {
    element.year = '2023';
    element.title = 'Developer';
    element.description = 'Building stuff';
    await elementUpdated(element);

    const item = shadowQuery<HTMLDivElement>(element, '.item');
    const content = shadowQuery<HTMLDivElement>(element, '.item__content');

    expect(item).toBeDefined();
    expect(content).toBeDefined();
  });

  it('should render slotted description content', async () => {
    cleanup(element);
    const container = document.createElement('div');
    container.innerHTML = '<zev-timeline-item>Custom description</zev-timeline-item>';
    document.body.appendChild(container);
    element = container.querySelector('zev-timeline-item') as ZevTimelineItem;
    await elementUpdated(element);

    const slot = element.shadowRoot?.querySelector('slot:not([name])');
    expect(slot).toBeDefined();

    cleanup(element);
    container.remove();
  });

  it('should render slotted title content', async () => {
    cleanup(element);
    const container = document.createElement('div');
    container.innerHTML = '<zev-timeline-item><span slot="title">Custom Title</span></zev-timeline-item>';
    document.body.appendChild(container);
    element = container.querySelector('zev-timeline-item') as ZevTimelineItem;
    await elementUpdated(element);

    const slot = element.shadowRoot?.querySelector('slot[name="title"]');
    expect(slot).toBeDefined();

    cleanup(element);
    container.remove();
  });
});
