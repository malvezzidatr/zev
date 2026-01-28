import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/pagination/zev-pagination.js';
import type { ZevPagination } from '../components/pagination/zev-pagination.js';

describe('zev-pagination', () => {
  let element: ZevPagination;

  beforeEach(async () => {
    element = fixture<ZevPagination>('zev-pagination');
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
    expect(element.currentPage).toBe(1);
    expect(element.totalPages).toBe(1);
  });

  it('should not render when totalPages is 1', () => {
    const nav = shadowQuery<HTMLElement>(element, '.pagination');
    expect(nav).toBeNull();
  });

  it('should render pagination when totalPages > 1', async () => {
    element.totalPages = 5;
    await elementUpdated(element);

    const nav = shadowQuery<HTMLElement>(element, '.pagination');
    expect(nav).toBeDefined();
  });

  it('should render correct number of page buttons', async () => {
    element.totalPages = 5;
    await elementUpdated(element);

    const pages = shadowQueryAll<HTMLButtonElement>(element, '.pagination__page');
    expect(pages.length).toBe(5);
  });

  it('should highlight current page', async () => {
    element.totalPages = 5;
    element.currentPage = 3;
    await elementUpdated(element);

    const activePage = shadowQuery<HTMLButtonElement>(element, '.pagination__page--active');
    expect(activePage?.textContent?.trim()).toBe('3');
  });

  it('should disable prev button on first page', async () => {
    element.totalPages = 5;
    element.currentPage = 1;
    await elementUpdated(element);

    const prevBtn = shadowQuery<HTMLButtonElement>(element, '.pagination__btn--prev');
    expect(prevBtn?.disabled).toBe(true);
  });

  it('should disable next button on last page', async () => {
    element.totalPages = 5;
    element.currentPage = 5;
    await elementUpdated(element);

    const nextBtn = shadowQuery<HTMLButtonElement>(element, '.pagination__btn--next');
    expect(nextBtn?.disabled).toBe(true);
  });

  it('should emit page-change event when page is clicked', async () => {
    element.totalPages = 5;
    element.currentPage = 1;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('page-change', handler);

    const pages = shadowQueryAll<HTMLButtonElement>(element, '.pagination__page');
    pages[2]?.click(); // Click page 3

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ page: 3 });
  });

  it('should emit page-change event when prev button is clicked', async () => {
    element.totalPages = 5;
    element.currentPage = 3;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('page-change', handler);

    const prevBtn = shadowQuery<HTMLButtonElement>(element, '.pagination__btn--prev');
    prevBtn?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ page: 2 });
  });

  it('should emit page-change event when next button is clicked', async () => {
    element.totalPages = 5;
    element.currentPage = 3;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('page-change', handler);

    const nextBtn = shadowQuery<HTMLButtonElement>(element, '.pagination__btn--next');
    nextBtn?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ page: 4 });
  });

  it('should show ellipsis for many pages', async () => {
    element.totalPages = 20;
    element.currentPage = 10;
    await elementUpdated(element);

    const ellipsis = shadowQueryAll<HTMLElement>(element, '.pagination__ellipsis');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('should have aria-label on navigation', async () => {
    element.totalPages = 5;
    await elementUpdated(element);

    const nav = shadowQuery<HTMLElement>(element, '.pagination');
    expect(nav?.getAttribute('aria-label')).toBe('Paginação');
  });
});
