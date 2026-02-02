import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/skill-card/zev-skill-card.js';
import type { ZevSkillCard, SkillResource } from '../components/skill-card/zev-skill-card.js';

describe('zev-skill-card', () => {
  let element: ZevSkillCard;

  beforeEach(async () => {
    element = fixture<ZevSkillCard>('zev-skill-card');
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
    expect(element.badge).toBe('required');
    expect(element.badgeLabel).toBe('');
    expect(element.importance).toBe('');
    expect(element.focusPoints).toBe('');
    expect(element.resources).toEqual([]);
    expect(element.open).toBe(false);
  });

  it('should render title', async () => {
    element.title = 'Jest';
    await elementUpdated(element);

    const title = shadowQuery<HTMLHeadingElement>(element, '.skill-card__title');
    expect(title?.textContent).toBe('Jest');
  });

  it('should render default badge label for required', async () => {
    element.badge = 'required';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.skill-card__badge');
    expect(badge?.textContent?.trim()).toBe('OBRIGATÓRIO');
    expect(badge?.classList.contains('skill-card__badge--required')).toBe(true);
  });

  it('should render default badge label for differential', async () => {
    element.badge = 'differential';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.skill-card__badge');
    expect(badge?.textContent?.trim()).toBe('DIFERENCIAL');
    expect(badge?.classList.contains('skill-card__badge--differential')).toBe(true);
  });

  it('should render default badge label for optional', async () => {
    element.badge = 'optional';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.skill-card__badge');
    expect(badge?.textContent?.trim()).toBe('OPCIONAL');
    expect(badge?.classList.contains('skill-card__badge--optional')).toBe(true);
  });

  it('should render custom badge label', async () => {
    element.badge = 'differential';
    element.badgeLabel = 'CUSTOM LABEL';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.skill-card__badge');
    expect(badge?.textContent?.trim()).toBe('CUSTOM LABEL');
  });

  it('should start closed by default', async () => {
    element.importance = 'This is important';
    await elementUpdated(element);

    const card = shadowQuery<HTMLDivElement>(element, '.skill-card');
    expect(card?.classList.contains('skill-card--open')).toBe(false);
  });

  it('should toggle open when header is clicked', async () => {
    element.importance = 'This is important';
    await elementUpdated(element);

    const header = shadowQuery<HTMLButtonElement>(element, '.skill-card__header');
    header?.click();
    await elementUpdated(element);

    expect(element.open).toBe(true);
    const card = shadowQuery<HTMLDivElement>(element, '.skill-card');
    expect(card?.classList.contains('skill-card--open')).toBe(true);
  });

  it('should emit toggle event when clicked', async () => {
    element.importance = 'This is important';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('toggle', handler);

    const header = shadowQuery<HTMLButtonElement>(element, '.skill-card__header');
    header?.click();
    await elementUpdated(element);

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ open: true });

    // Click again to close
    header?.click();
    await elementUpdated(element);

    expect(handler.mock.calls[1][0].detail).toEqual({ open: false });
  });

  it('should render chevron when has content', async () => {
    element.importance = 'This is important';
    await elementUpdated(element);

    const chevron = shadowQuery<SVGElement>(element, '.skill-card__chevron');
    expect(chevron).toBeDefined();
  });

  it('should not render chevron when no content', async () => {
    element.importance = '';
    element.focusPoints = '';
    element.resources = [];
    await elementUpdated(element);

    const chevron = shadowQuery<SVGElement>(element, '.skill-card__chevron');
    expect(chevron).toBeNull();
  });

  it('should render importance section when open', async () => {
    element.importance = 'This is important because...';
    element.open = true;
    await elementUpdated(element);

    const sectionTitle = shadowQuery<HTMLHeadingElement>(element, '.skill-card__section-title');
    expect(sectionTitle?.textContent).toBe('Por que é importante:');

    const sectionText = shadowQuery<HTMLParagraphElement>(element, '.skill-card__section-text');
    expect(sectionText?.textContent).toBe('This is important because...');
  });

  it('should render focus section when open', async () => {
    element.focusPoints = 'Focus on unit tests and integration tests';
    element.open = true;
    await elementUpdated(element);

    const sectionTitles = shadowQueryAll<HTMLHeadingElement>(element, '.skill-card__section-title');
    const focusTitle = Array.from(sectionTitles).find(el => el.textContent === 'O que focar:');
    expect(focusTitle).toBeDefined();
  });

  it('should render resources when open', async () => {
    const resources: SkillResource[] = [
      { label: 'Documentation', url: 'https://docs.example.com', type: 'docs' },
      { label: 'Video Tutorial', url: 'https://video.example.com', type: 'video' },
    ];
    element.resources = resources;
    element.open = true;
    await elementUpdated(element);

    const resourceItems = shadowQueryAll<HTMLLIElement>(element, '.skill-card__resource-item');
    expect(resourceItems.length).toBe(2);

    const links = shadowQueryAll<HTMLAnchorElement>(element, '.skill-card__resource-link');
    expect(links[0]?.textContent?.trim()).toBe('Documentation');
    expect(links[1]?.textContent?.trim()).toBe('Video Tutorial');
  });

  it('should render correct resource type labels', async () => {
    const resources: SkillResource[] = [
      { label: 'Doc', url: 'https://example.com', type: 'docs' },
      { label: 'Vid', url: 'https://example.com', type: 'video' },
      { label: 'Art', url: 'https://example.com', type: 'article' },
      { label: 'Crs', url: 'https://example.com', type: 'course' },
    ];
    element.resources = resources;
    element.open = true;
    await elementUpdated(element);

    const typeLabels = shadowQueryAll<HTMLSpanElement>(element, '.skill-card__resource-type');
    expect(typeLabels[0]?.textContent?.trim()).toBe('DOCS');
    expect(typeLabels[1]?.textContent?.trim()).toBe('VIDEO');
    expect(typeLabels[2]?.textContent?.trim()).toBe('ARTIGO');
    expect(typeLabels[3]?.textContent?.trim()).toBe('CURSO');
  });

  it('should emit resource-click event when resource is clicked', async () => {
    const resources: SkillResource[] = [
      { label: 'Documentation', url: 'https://docs.example.com', type: 'docs' },
    ];
    element.resources = resources;
    element.open = true;
    await elementUpdated(element);

    // Mock window.open
    const originalOpen = window.open;
    window.open = vi.fn();

    const handler = vi.fn();
    element.addEventListener('resource-click', handler);

    const link = shadowQuery<HTMLAnchorElement>(element, '.skill-card__resource-link');
    link?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({
      label: 'Documentation',
      url: 'https://docs.example.com',
      type: 'docs',
    });

    // Restore window.open
    window.open = originalOpen;
  });

  it('should have aria-expanded attribute on header', async () => {
    element.importance = 'This is important';
    await elementUpdated(element);

    const header = shadowQuery<HTMLButtonElement>(element, '.skill-card__header');
    expect(header?.getAttribute('aria-expanded')).toBe('false');

    element.open = true;
    await elementUpdated(element);
    expect(header?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should render all sections together when open', async () => {
    element.title = 'Jest';
    element.badge = 'differential';
    element.importance = 'Important for testing';
    element.focusPoints = 'Unit tests';
    element.resources = [{ label: 'Docs', url: 'https://example.com', type: 'docs' }];
    element.open = true;
    await elementUpdated(element);

    const title = shadowQuery<HTMLHeadingElement>(element, '.skill-card__title');
    expect(title?.textContent).toBe('Jest');

    const badge = shadowQuery<HTMLSpanElement>(element, '.skill-card__badge');
    expect(badge?.textContent?.trim()).toBe('DIFERENCIAL');

    const sections = shadowQueryAll<HTMLDivElement>(element, '.skill-card__section');
    expect(sections.length).toBe(3); // importance, focus, resources
  });
});
