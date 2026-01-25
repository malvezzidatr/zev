import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/blog-card/zev-blog-card.js';
import type { ZevBlogCard } from '../components/blog-card/zev-blog-card.js';

describe('zev-blog-card', () => {
  let element: ZevBlogCard;

  beforeEach(async () => {
    element = fixture<ZevBlogCard>('zev-blog-card');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render title', async () => {
    element.title = 'My Blog Post';
    await elementUpdated(element);

    const title = shadowQuery<HTMLElement>(element, '.card__title');
    expect(title?.textContent).toBe('My Blog Post');
  });

  it('should render excerpt', async () => {
    element.excerpt = 'This is a summary of the post';
    await elementUpdated(element);

    const excerpt = shadowQuery<HTMLElement>(element, '.card__excerpt');
    expect(excerpt?.textContent).toBe('This is a summary of the post');
  });

  it('should render date', async () => {
    element.date = 'Jan 24, 2025';
    await elementUpdated(element);

    const date = shadowQuery<HTMLElement>(element, '.card__date');
    expect(date?.textContent).toBe('Jan 24, 2025');
  });

  it('should render image when provided', async () => {
    element.image = 'https://example.com/image.jpg';
    await elementUpdated(element);

    const image = shadowQuery<HTMLImageElement>(element, '.card__image');
    expect(image).toBeDefined();
    expect(image?.getAttribute('src')).toBe('https://example.com/image.jpg');
  });

  it('should render placeholder when no image', async () => {
    element.image = '';
    await elementUpdated(element);

    const placeholder = shadowQuery<HTMLElement>(element, '.card__image-placeholder');
    expect(placeholder).toBeDefined();
  });

  it('should render tags', async () => {
    element.tags = ['JavaScript', 'React', 'CSS'];
    await elementUpdated(element);

    const tags = shadowQueryAll<HTMLElement>(element, '.card__tag');
    expect(tags.length).toBe(3);
    expect(tags[0].textContent).toBe('JavaScript');
  });

  it('should limit tags to 3', async () => {
    element.tags = ['One', 'Two', 'Three', 'Four', 'Five'];
    await elementUpdated(element);

    const tags = shadowQueryAll<HTMLElement>(element, '.card__tag');
    expect(tags.length).toBe(3);
  });

  it('should render read time when provided', async () => {
    element.readTime = '5 min read';
    await elementUpdated(element);

    const readTime = shadowQuery<HTMLElement>(element, '.card__read-time');
    expect(readTime?.textContent).toBe('5 min read');
  });

  it('should render author when provided', async () => {
    element.authorName = 'John Doe';
    await elementUpdated(element);

    const author = shadowQuery<HTMLElement>(element, '.card__author');
    expect(author?.textContent?.trim()).toBe('John Doe');
  });

  it('should render author avatar when provided', async () => {
    element.authorName = 'John Doe';
    element.authorAvatar = 'https://example.com/avatar.jpg';
    await elementUpdated(element);

    const avatar = shadowQuery<HTMLImageElement>(element, '.card__author-avatar');
    expect(avatar).toBeDefined();
    expect(avatar?.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('should emit card-click event on click', async () => {
    element.title = 'Test Post';
    element.slug = 'test-post';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('card-click', handler);

    const card = shadowQuery<HTMLElement>(element, '.card');
    card?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({
      title: 'Test Post',
      slug: 'test-post',
    });
  });
});
