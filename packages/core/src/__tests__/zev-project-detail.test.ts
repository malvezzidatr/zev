import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/project-detail/zev-project-detail.js';
import type { ZevProjectDetail } from '../components/project-detail/zev-project-detail.js';

const mockProject = {
  number: '01',
  role: 'Frontend Developer',
  title: 'Test Project',
  description: 'A description of the test project',
  techTags: ['React', 'TypeScript', 'Node.js'],
  highlights: ['Feature 1', 'Feature 2', 'Feature 3'],
};

describe('zev-project-detail', () => {
  let element: ZevProjectDetail;

  beforeEach(async () => {
    element = fixture<ZevProjectDetail>('zev-project-detail');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
    document.body.style.overflow = '';
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should not render content when closed', async () => {
    element.open = false;
    element.project = mockProject;
    await elementUpdated(element);

    const overlay = shadowQuery<HTMLElement>(element, '.modal__overlay');
    expect(overlay).toBeNull();
  });

  it('should not render content when no project', async () => {
    element.open = true;
    element.project = null;
    await elementUpdated(element);

    const overlay = shadowQuery<HTMLElement>(element, '.modal__overlay');
    expect(overlay).toBeNull();
  });

  it('should render content when open with project', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const overlay = shadowQuery<HTMLElement>(element, '.modal__overlay');
    expect(overlay).toBeDefined();
  });

  it('should render project number', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const number = shadowQuery<HTMLElement>(element, '.modal__number');
    expect(number?.textContent).toBe('01');
  });

  it('should render project role', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const role = shadowQuery<HTMLElement>(element, '.modal__role');
    expect(role?.textContent).toBe('Frontend Developer');
  });

  it('should render project title', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const title = shadowQuery<HTMLElement>(element, '.modal__title');
    expect(title?.textContent).toBe('Test Project');
  });

  it('should render project description', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const description = shadowQuery<HTMLElement>(element, '.modal__description');
    expect(description?.textContent).toBe('A description of the test project');
  });

  it('should render tech tags', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const tags = shadowQueryAll<HTMLElement>(element, '.modal__tag');
    expect(tags.length).toBe(3);
    expect(tags[0].textContent).toBe('React');
    expect(tags[1].textContent).toBe('TypeScript');
    expect(tags[2].textContent).toBe('Node.js');
  });

  it('should render highlights', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const highlightsTitle = shadowQuery<HTMLElement>(element, '.modal__highlights-title');
    const highlightsList = shadowQueryAll<HTMLElement>(element, '.modal__highlights-list li');

    expect(highlightsTitle?.textContent).toBe('Highlights');
    expect(highlightsList.length).toBe(3);
    expect(highlightsList[0].textContent).toBe('Feature 1');
  });

  it('should not render highlights when empty', async () => {
    element.open = true;
    element.project = { ...mockProject, highlights: [] };
    await elementUpdated(element);

    const highlights = shadowQuery<HTMLElement>(element, '.modal__highlights');
    expect(highlights).toBeNull();
  });

  it('should emit close event on close button click', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('close', handler);

    const closeButton = shadowQuery<HTMLButtonElement>(element, '.modal__close');
    closeButton?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('should emit close event on overlay click', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('close', handler);

    const overlay = shadowQuery<HTMLElement>(element, '.modal__overlay');
    overlay?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('should not emit close event when clicking modal content', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('close', handler);

    const content = shadowQuery<HTMLElement>(element, '.modal__content');
    content?.click();

    expect(handler).not.toHaveBeenCalled();
  });

  it('should emit close event on Escape key', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('close', handler);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(handler).toHaveBeenCalled();
  });

  it('should not emit close event on Escape when closed', async () => {
    element.open = false;
    element.project = mockProject;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('close', handler);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not emit close event on other keys', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('close', handler);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(handler).not.toHaveBeenCalled();
  });

  it('should set body overflow to hidden when open', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should clear body overflow when closed', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    element.open = false;
    await elementUpdated(element);

    expect(document.body.style.overflow).toBe('');
  });

  it('should clear body overflow on disconnect', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    expect(document.body.style.overflow).toBe('hidden');

    element.remove();

    expect(document.body.style.overflow).toBe('');
  });

  it('should have dialog role and aria-modal', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const content = shadowQuery<HTMLElement>(element, '.modal__content');
    expect(content?.getAttribute('role')).toBe('dialog');
    expect(content?.getAttribute('aria-modal')).toBe('true');
  });

  it('should have accessible close button', async () => {
    element.open = true;
    element.project = mockProject;
    await elementUpdated(element);

    const closeButton = shadowQuery<HTMLButtonElement>(element, '.modal__close');
    expect(closeButton?.getAttribute('aria-label')).toBe('Fechar');
  });

  describe('accessibility', () => {
    it('should have aria-labelledby pointing to title', async () => {
      element.open = true;
      element.project = mockProject;
      await elementUpdated(element);

      const content = shadowQuery<HTMLElement>(element, '.modal__content');
      expect(content?.getAttribute('aria-labelledby')).toBe('project-detail-title');
    });

    it('should have id on title for aria-labelledby', async () => {
      element.open = true;
      element.project = mockProject;
      await elementUpdated(element);

      const title = shadowQuery<HTMLElement>(element, '.modal__title');
      expect(title?.getAttribute('id')).toBe('project-detail-title');
    });

    it('should have aria-hidden on close button SVG', async () => {
      element.open = true;
      element.project = mockProject;
      await elementUpdated(element);

      const svg = shadowQuery<SVGElement>(element, '.modal__close svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
