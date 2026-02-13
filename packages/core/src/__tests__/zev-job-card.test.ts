import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/job-card/zev-job-card.js';
import type { ZevJobCard } from '../components/job-card/zev-job-card.js';

describe('zev-job-card', () => {
  let element: ZevJobCard;

  beforeEach(async () => {
    element = fixture<ZevJobCard>('zev-job-card');
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
    expect(element.company).toBe('');
    expect(element.location).toBe('');
    expect(element.tags).toEqual([]);
    expect(element.salary).toBe('');
    expect(element.remote).toBe(false);
    expect(element.postedAt).toBe('');
    expect(element.url).toBe('');
    expect(element.source).toBe('');
  });

  it('should render title', async () => {
    element.title = 'Senior Frontend Developer';
    await elementUpdated(element);

    const title = shadowQuery<HTMLHeadingElement>(element, '.job-card__title');
    expect(title?.textContent).toBe('Senior Frontend Developer');
  });

  it('should render company', async () => {
    element.company = 'Acme Inc';
    await elementUpdated(element);

    const company = shadowQuery<HTMLDivElement>(element, '.job-card__company');
    expect(company?.textContent).toBe('Acme Inc');
  });

  it('should render location', async () => {
    element.location = 'São Paulo, SP';
    await elementUpdated(element);

    const location = shadowQuery<HTMLSpanElement>(element, '.job-card__meta-item');
    expect(location?.textContent?.trim()).toContain('São Paulo, SP');
  });

  it('should render salary', async () => {
    element.salary = 'R$ 15.000 - R$ 20.000';
    await elementUpdated(element);

    const metaItems = shadowQueryAll<HTMLSpanElement>(element, '.job-card__meta-item');
    const salaryItem = Array.from(metaItems).find(item =>
      item.textContent?.includes('R$')
    );
    expect(salaryItem?.textContent?.trim()).toContain('R$ 15.000 - R$ 20.000');
  });

  it('should render remote badge when remote is true', async () => {
    element.remote = true;
    await elementUpdated(element);

    const badge = shadowQuery<HTMLElement>(element, 'zev-badge');
    expect(badge).toBeDefined();
    expect(badge?.getAttribute('variant')).toBe('success');
  });

  it('should not render remote badge when remote is false', async () => {
    element.remote = false;
    await elementUpdated(element);

    const badge = shadowQuery<HTMLElement>(element, 'zev-badge');
    expect(badge).toBeNull();
  });

  it('should render tags', async () => {
    element.tags = ['React', 'TypeScript', 'Node.js'];
    await elementUpdated(element);

    const tags = shadowQueryAll<HTMLElement>(element, 'zev-tag');
    expect(tags.length).toBe(3);
  });

  it('should limit tags to 5', async () => {
    element.tags = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'AWS', 'Kubernetes'];
    await elementUpdated(element);

    const tags = shadowQueryAll<HTMLElement>(element, 'zev-tag');
    expect(tags.length).toBe(5);
  });

  it('should render postedAt', async () => {
    element.postedAt = 'Há 2 dias';
    await elementUpdated(element);

    const posted = shadowQuery<HTMLSpanElement>(element, '.job-card__posted');
    expect(posted?.textContent).toBe('Há 2 dias');
  });

  it('should render source', async () => {
    element.source = 'LinkedIn';
    await elementUpdated(element);

    const source = shadowQuery<HTMLSpanElement>(element, '.job-card__source');
    expect(source?.textContent).toBe('LinkedIn');
  });

  it('should emit card-click event when clicked', async () => {
    element.title = 'Test Job';
    element.company = 'Test Company';
    element.url = 'https://example.com/job';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('card-click', handler);

    const card = shadowQuery<HTMLElement>(element, '.job-card');
    card?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({
      title: 'Test Job',
      company: 'Test Company',
      url: 'https://example.com/job',
    });
  });

  it('should apply no-hover class when disableHover is true', async () => {
    element.disableHover = true;
    await elementUpdated(element);

    const card = shadowQuery<HTMLElement>(element, '.job-card');
    expect(card?.classList.contains('job-card--no-hover')).toBe(true);
  });

  it('should not have no-hover class by default', () => {
    const card = shadowQuery<HTMLElement>(element, '.job-card');
    expect(card?.classList.contains('job-card--no-hover')).toBe(false);
  });

  it('should have article element for accessibility', () => {
    const article = shadowQuery<HTMLElement>(element, 'article.job-card');
    expect(article).toBeDefined();
  });

  describe('accessibility', () => {
    it('should have tabindex on article', async () => {
      element.title = 'Test';
      await elementUpdated(element);
      const article = shadowQuery<HTMLElement>(element, 'article');
      expect(article?.getAttribute('tabindex')).toBe('0');
    });

    it('should have role article', async () => {
      element.title = 'Test';
      await elementUpdated(element);
      const article = shadowQuery<HTMLElement>(element, 'article');
      expect(article?.getAttribute('role')).toBe('article');
    });

    it('should have aria-label with title', async () => {
      element.title = 'Frontend Dev';
      await elementUpdated(element);
      const article = shadowQuery<HTMLElement>(element, 'article');
      expect(article?.getAttribute('aria-label')).toBe('Frontend Dev');
    });

    it('should emit card-click on Enter key', async () => {
      element.title = 'Test';
      element.company = 'Company';
      await elementUpdated(element);

      const handler = vi.fn();
      element.addEventListener('card-click', handler);

      const article = shadowQuery<HTMLElement>(element, 'article');
      article?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(handler).toHaveBeenCalled();
    });

    it('should emit card-click on Space key', async () => {
      element.title = 'Test';
      element.company = 'Company';
      await elementUpdated(element);

      const handler = vi.fn();
      element.addEventListener('card-click', handler);

      const article = shadowQuery<HTMLElement>(element, 'article');
      article?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

      expect(handler).toHaveBeenCalled();
    });

    it('should have aria-hidden on decorative SVGs', async () => {
      element.location = 'São Paulo';
      element.salary = 'R$ 10k';
      await elementUpdated(element);

      const svgs = shadowQueryAll<SVGElement>(element, 'svg');
      svgs.forEach(svg => {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });
});
