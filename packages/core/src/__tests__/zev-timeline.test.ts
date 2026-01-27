import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/timeline/zev-timeline.js';
import '../components/timeline-item/zev-timeline-item.js';
import type { ZevTimeline } from '../components/timeline/zev-timeline.js';

describe('zev-timeline', () => {
  let element: ZevTimeline;

  beforeEach(async () => {
    element = fixture<ZevTimeline>('zev-timeline');
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
    expect(element.items).toEqual([]);
    expect(element.connected).toBe(false);
  });

  it('should have timeline container', async () => {
    const timeline = shadowQuery<HTMLDivElement>(element, '.timeline');
    expect(timeline).toBeDefined();
  });

  it('should render items from array prop', async () => {
    element.items = [
      { year: '2024', title: 'Engineer', description: 'Building' },
      { year: '2023', title: 'Developer', description: 'Coding' },
    ];
    await elementUpdated(element);

    const items = element.shadowRoot?.querySelectorAll('zev-timeline-item');
    expect(items?.length).toBe(2);
  });

  it('should pass props to timeline items', async () => {
    element.items = [
      { year: '2024', title: 'Engineer', description: 'Building' },
    ];
    await elementUpdated(element);

    const item = element.shadowRoot?.querySelector('zev-timeline-item');
    expect(item?.getAttribute('year')).toBe('2024');
    expect(item?.getAttribute('title')).toBe('Engineer');
    expect(item?.getAttribute('description')).toBe('Building');
  });

  it('should reflect connected attribute', async () => {
    element.connected = true;
    await elementUpdated(element);

    expect(element.hasAttribute('connected')).toBe(true);
  });

  it('should pass connected to items from array', async () => {
    element.connected = true;
    element.items = [
      { year: '2024', title: 'Engineer', description: 'Building' },
    ];
    await elementUpdated(element);

    const item = element.shadowRoot?.querySelector('zev-timeline-item');
    expect(item?.hasAttribute('connected')).toBe(true);
  });

  it('should render slotted content when no items', async () => {
    element.items = [];
    await elementUpdated(element);

    const slot = shadowQuery<HTMLSlotElement>(element, 'slot');
    expect(slot).toBeDefined();
  });

  it('should pass connected to slotted children', async () => {
    cleanup(element);
    const container = document.createElement('div');
    container.innerHTML = `
      <zev-timeline connected>
        <zev-timeline-item year="2024" title="Test" description="Desc"></zev-timeline-item>
      </zev-timeline>
    `;
    document.body.appendChild(container);
    element = container.querySelector('zev-timeline') as ZevTimeline;
    await elementUpdated(element);

    // Wait for the component to update children
    await new Promise(resolve => setTimeout(resolve, 0));

    const item = container.querySelector('zev-timeline-item');
    expect(item?.hasAttribute('connected')).toBe(true);

    cleanup(element);
    container.remove();
  });

  it('should update children when connected changes', async () => {
    cleanup(element);
    const container = document.createElement('div');
    container.innerHTML = `
      <zev-timeline>
        <zev-timeline-item year="2024" title="Test" description="Desc"></zev-timeline-item>
      </zev-timeline>
    `;
    document.body.appendChild(container);
    element = container.querySelector('zev-timeline') as ZevTimeline;
    await elementUpdated(element);

    const item = container.querySelector('zev-timeline-item');
    expect(item?.hasAttribute('connected')).toBe(false);

    element.connected = true;
    await elementUpdated(element);
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(item?.hasAttribute('connected')).toBe(true);

    cleanup(element);
    container.remove();
  });
});
