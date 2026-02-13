import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery, shadowQueryAll } from './test-helpers.js';
import '../components/navbar/zev-navbar.js';
import type { ZevNavbar } from '../components/navbar/zev-navbar.js';

describe('zev-navbar', () => {
  let element: ZevNavbar;

  beforeEach(async () => {
    element = fixture<ZevNavbar>('zev-navbar');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render logo text', async () => {
    element.logo = 'ZEV';
    await elementUpdated(element);

    const logo = shadowQuery<HTMLElement>(element, '.navbar__logo');
    expect(logo?.textContent).toBe('ZEV');
  });

  it('should have default logoHref as /', () => {
    const logo = shadowQuery<HTMLAnchorElement>(element, '.navbar__logo');
    expect(logo?.getAttribute('href')).toBe('/');
  });

  it('should use custom logoHref', async () => {
    element.logoHref = '/home';
    await elementUpdated(element);

    const logo = shadowQuery<HTMLAnchorElement>(element, '.navbar__logo');
    expect(logo?.getAttribute('href')).toBe('/home');
  });

  it('should render navigation links', async () => {
    element.links = [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
    ];
    await elementUpdated(element);

    const links = shadowQueryAll<HTMLAnchorElement>(element, '.navbar__link');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toBe('Home');
    expect(links[0].getAttribute('href')).toBe('#home');
  });

  it('should have hamburger menu for mobile', async () => {
    const hamburger = shadowQuery<HTMLButtonElement>(element, '.navbar__hamburger');
    expect(hamburger).toBeDefined();
  });

  it('should toggle mobile menu on hamburger click', async () => {
    const hamburger = shadowQuery<HTMLButtonElement>(element, '.navbar__hamburger');
    const links = shadowQuery<HTMLElement>(element, '.navbar__links');

    expect(links?.classList.contains('navbar__links--open')).toBe(false);

    hamburger?.click();
    await elementUpdated(element);

    const linksAfter = shadowQuery<HTMLElement>(element, '.navbar__links');
    expect(linksAfter?.classList.contains('navbar__links--open')).toBe(true);
  });

  it('should emit lang-toggle event with en when lang is pt', async () => {
    element.lang = 'pt';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('lang-toggle', handler);

    const langToggle = shadowQuery<HTMLButtonElement>(element, '.navbar__lang-toggle');
    langToggle?.click();
    await elementUpdated(element);

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ lang: 'en' });
  });

  it('should emit lang-toggle event with pt when lang is en', async () => {
    element.lang = 'en';
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('lang-toggle', handler);

    const langToggle = shadowQuery<HTMLButtonElement>(element, '.navbar__lang-toggle');
    langToggle?.click();
    await elementUpdated(element);

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ lang: 'pt' });
  });

  it('should have lang label displayed', async () => {
    element.langLabel = 'PT';
    await elementUpdated(element);

    const langToggle = shadowQuery<HTMLButtonElement>(element, '.navbar__lang-toggle');
    expect(langToggle?.textContent?.trim()).toBe('PT');
  });

  it('should emit nav-click event when clicking a link', async () => {
    element.links = [{ label: 'Home', href: '#home' }];
    await elementUpdated(element);

    const handler = vi.fn();
    element.addEventListener('nav-click', handler);

    const link = shadowQuery<HTMLAnchorElement>(element, '.navbar__link');
    link?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('should show lang toggle by default', async () => {
    expect(element.showLangToggle).toBe(true);
    const langToggle = shadowQuery<HTMLButtonElement>(element, '.navbar__lang-toggle');
    expect(langToggle).not.toBeNull();
  });

  it('should hide lang toggle when showLangToggle is false', async () => {
    element.showLangToggle = false;
    await elementUpdated(element);

    const langToggle = shadowQuery<HTMLButtonElement>(element, '.navbar__lang-toggle');
    expect(langToggle).toBeNull();
  });

  describe('accessibility', () => {
    it('should have aria-label on nav element', async () => {
      const nav = shadowQuery<HTMLElement>(element, '.navbar');
      expect(nav?.getAttribute('aria-label')).toBe('Navegação principal');
    });

    it('should have aria-label on lang toggle', async () => {
      element.showLangToggle = true;
      element.langLabel = 'EN';
      await elementUpdated(element);

      const toggle = shadowQuery<HTMLElement>(element, '.navbar__lang-toggle');
      expect(toggle?.getAttribute('aria-label')).toContain('EN');
    });

    it('should close menu on Escape key', async () => {
      element.links = [{ label: 'Home', href: '/' }];
      await elementUpdated(element);

      // Open menu
      const hamburger = shadowQuery<HTMLButtonElement>(element, '.navbar__hamburger');
      hamburger?.click();
      await elementUpdated(element);

      // Press Escape
      const nav = shadowQuery<HTMLElement>(element, '.navbar');
      nav?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await elementUpdated(element);

      const links = shadowQuery<HTMLElement>(element, '.navbar__links');
      expect(links?.classList.contains('navbar__links--open')).toBe(false);
    });
  });
});
