import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/call-to-action/zev-call-to-action.js';
import type { ZevCallToAction } from '../components/call-to-action/zev-call-to-action.js';

describe('zev-call-to-action', () => {
  let element: ZevCallToAction;

  beforeEach(async () => {
    element = fixture<ZevCallToAction>('zev-call-to-action');
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
    element.tag = '[04]';
    await elementUpdated(element);

    const tag = shadowQuery<HTMLElement>(element, '.section__tag');
    expect(tag?.textContent).toBe('[04]');
  });

  it('should render label', async () => {
    element.label = 'Contact';
    await elementUpdated(element);

    const label = shadowQuery<HTMLElement>(element, '.cta__label');
    expect(label?.textContent).toBe('Contact');
  });

  it('should render heading', async () => {
    element.heading = "Let's work together";
    await elementUpdated(element);

    const heading = shadowQuery<HTMLElement>(element, '.cta__heading');
    expect(heading?.textContent).toBe("Let's work together");
  });

  it('should render description', async () => {
    element.description = 'Get in touch with me';
    await elementUpdated(element);

    const description = shadowQuery<HTMLElement>(element, '.cta__description');
    expect(description?.textContent).toBe('Get in touch with me');
  });

  it('should render button with text', async () => {
    element.buttonText = 'Contact Me';
    await elementUpdated(element);

    const button = shadowQuery<HTMLElement>(element, '.cta__button');
    expect(button?.textContent?.trim()).toBe('Contact Me');
  });

  it('should render button with href', async () => {
    element.buttonHref = 'mailto:test@example.com';
    await elementUpdated(element);

    const button = shadowQuery<HTMLAnchorElement>(element, '.cta__button');
    expect(button?.getAttribute('href')).toBe('mailto:test@example.com');
  });

  it('should emit cta-click event on button click', async () => {
    element.buttonText = 'Click';
    element.buttonHref = '#contact';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('cta-click', handler);

    const button = shadowQuery<HTMLAnchorElement>(element, '.cta__button');
    button?.click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toHaveProperty('href', '#contact');
  });
});
