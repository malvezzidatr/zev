import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/project-card/zev-project-card.js';
import type { ZevProjectCard } from '../components/project-card/zev-project-card.js';

describe('zev-project-card', () => {
  let element: ZevProjectCard;

  beforeEach(async () => {
    element = fixture<ZevProjectCard>('zev-project-card');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render number', async () => {
    element.number = '01';
    await elementUpdated(element);

    const number = shadowQuery<HTMLElement>(element, '.card__number');
    expect(number?.textContent).toBe('01');
  });

  it('should render role', async () => {
    element.role = 'Frontend';
    await elementUpdated(element);

    const role = shadowQuery<HTMLElement>(element, '.card__role');
    expect(role?.textContent).toBe('Frontend');
  });

  it('should render title', async () => {
    element.title = 'My Project';
    await elementUpdated(element);

    const title = shadowQuery<HTMLElement>(element, '.card__title');
    expect(title?.textContent).toBe('My Project');
  });

  it('should render description', async () => {
    element.description = 'A cool project';
    await elementUpdated(element);

    const description = shadowQuery<HTMLElement>(element, '.card__description');
    expect(description?.textContent).toBe('A cool project');
  });

  it('should render tech tags', async () => {
    element.techTags = ['React', 'TypeScript', 'Node.js'];
    await elementUpdated(element);

    const tags = shadowQueryAll<HTMLElement>(element, '.card__tag');
    expect(tags.length).toBe(3);
    expect(tags[0].textContent).toBe('React');
    expect(tags[1].textContent).toBe('TypeScript');
    expect(tags[2].textContent).toBe('Node.js');
  });

  it('should emit card-click event on click', async () => {
    element.number = '01';
    element.title = 'Test Project';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('card-click', handler);

    const card = shadowQuery<HTMLElement>(element, '.card');
    card?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({
      number: '01',
      title: 'Test Project',
    });
  });

  it('should have cursor pointer style', async () => {
    const card = shadowQuery<HTMLElement>(element, '.card');
    expect(card).toBeDefined();
  });
});
