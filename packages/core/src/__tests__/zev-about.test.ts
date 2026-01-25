import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/about/zev-about.js';
import type { ZevAbout } from '../components/about/zev-about.js';

describe('zev-about', () => {
  let element: ZevAbout;

  beforeEach(async () => {
    element = fixture<ZevAbout>('zev-about');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render tag', async () => {
    element.tag = '[01]';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLElement>(element, '.section__tag');
    expect(tag?.textContent).toBe('[01]');
  });

  it('should render title', async () => {
    element.title = 'About Me';
    await elementUpdated(element);

    const title = shadowQuery<HTMLElement>(element, '.section__title');
    expect(title?.textContent).toBe('About Me');
  });

  it('should render bio', async () => {
    element.bio = 'I am a developer';
    await elementUpdated(element);

    const bio = shadowQuery<HTMLElement>(element, '.about__bio');
    expect(bio?.textContent?.trim()).toContain('I am a developer');
  });

  it('should render skills', async () => {
    element.skills = ['JavaScript', 'TypeScript', 'React'];
    await elementUpdated(element);

    const skills = shadowQueryAll<HTMLElement>(element, '.about__skill-tag');
    expect(skills.length).toBe(3);
    expect(skills[0].textContent).toBe('JavaScript');
  });

  it('should render timeline items', async () => {
    element.timeline = [
      { year: '2020', title: 'Job 1', description: 'First job' },
      { year: '2022', title: 'Job 2', description: 'Second job' },
    ];
    await elementUpdated(element);

    const items = shadowQueryAll<HTMLElement>(element, '.about__timeline-item');
    expect(items.length).toBe(2);
  });

  it('should render timeline year', async () => {
    element.timeline = [{ year: '2020', title: 'Job', description: 'Desc' }];
    await elementUpdated(element);

    const year = shadowQuery<HTMLElement>(element, '.about__timeline-year');
    expect(year?.textContent).toBe('2020');
  });

  it('should render timeline title', async () => {
    element.timeline = [{ year: '2020', title: 'My Job', description: 'Desc' }];
    await elementUpdated(element);

    const title = shadowQuery<HTMLElement>(element, '.about__timeline-title');
    expect(title?.textContent).toBe('My Job');
  });

  it('should render timeline description', async () => {
    element.timeline = [{ year: '2020', title: 'Job', description: 'A great job' }];
    await elementUpdated(element);

    const desc = shadowQuery<HTMLElement>(element, '.about__timeline-desc');
    expect(desc?.textContent).toBe('A great job');
  });
});
