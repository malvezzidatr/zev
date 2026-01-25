import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/footer/zev-footer.js';
import type { ZevFooter } from '../components/footer/zev-footer.js';

describe('zev-footer', () => {
  let element: ZevFooter;

  beforeEach(async () => {
    element = fixture<ZevFooter>('zev-footer');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render decorative name', async () => {
    element.decorativeName = 'John Doe';
    await elementUpdated(element);

    const name = shadowQuery<HTMLElement>(element, '.footer__decorative-name');
    expect(name?.textContent).toBe('John Doe');
  });

  it('should render heading', async () => {
    element.heading = 'Get in Touch';
    await elementUpdated(element);

    const heading = shadowQuery<HTMLElement>(element, '.footer__heading');
    expect(heading?.textContent).toBe('Get in Touch');
  });

  it('should render links', async () => {
    element.links = [
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
    ];
    await elementUpdated(element);

    const links = shadowQueryAll<HTMLAnchorElement>(element, '.footer__link');
    expect(links.length).toBe(2);
    expect(links[0].textContent?.trim()).toBe('GitHub');
    expect(links[0].getAttribute('href')).toBe('https://github.com');
  });

  it('should render info items', async () => {
    element.info = [
      { label: 'Location', value: 'São Paulo, BR' },
      { label: 'Available', value: 'Remote' },
    ];
    await elementUpdated(element);

    const items = shadowQueryAll<HTMLElement>(element, '.footer__info-item');
    expect(items.length).toBe(2);
  });

  it('should render info label and value', async () => {
    element.info = [{ label: 'Location', value: 'São Paulo, BR' }];
    await elementUpdated(element);

    const label = shadowQuery<HTMLElement>(element, '.footer__info-label');
    const value = shadowQuery<HTMLElement>(element, '.footer__info-value');

    expect(label?.textContent).toBe('Location');
    expect(value?.textContent).toBe('São Paulo, BR');
  });

  it('should render copyright', async () => {
    element.copyright = '© 2025 John Doe';
    await elementUpdated(element);

    const copyright = shadowQuery<HTMLElement>(element, '.footer__copyright');
    expect(copyright?.textContent).toBe('© 2025 John Doe');
  });

  it('should have links with target blank', async () => {
    element.links = [{ label: 'GitHub', href: 'https://github.com' }];
    await elementUpdated(element);

    const link = shadowQuery<HTMLAnchorElement>(element, '.footer__link');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener');
  });
});
