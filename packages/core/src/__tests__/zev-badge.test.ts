import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/badge/zev-badge.js';
import type { ZevBadge } from '../components/badge/zev-badge.js';

describe('zev-badge', () => {
  let element: ZevBadge;

  beforeEach(async () => {
    element = fixture<ZevBadge>('zev-badge');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render with default variant (neutral)', () => {
    expect(element.variant).toBe('neutral');
    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.classList.contains('badge--neutral')).toBe(true);
  });

  it('should render label prop', async () => {
    element.label = 'Active';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.textContent?.trim()).toBe('Active');
  });

  it('should apply success variant class', async () => {
    element.variant = 'success';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.classList.contains('badge--success')).toBe(true);
    expect(badge?.classList.contains('badge--neutral')).toBe(false);
  });

  it('should apply warning variant class', async () => {
    element.variant = 'warning';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.classList.contains('badge--warning')).toBe(true);
  });

  it('should apply info variant class', async () => {
    element.variant = 'info';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.classList.contains('badge--info')).toBe(true);
  });

  it('should apply match variant class', async () => {
    element.variant = 'match';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.classList.contains('badge--match')).toBe(true);
  });

  it('should apply match-low level class', async () => {
    element.variant = 'match';
    element.level = 'low';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.classList.contains('badge--match-low')).toBe(true);
    expect(badge?.classList.contains('badge--match-medium')).toBe(false);
  });

  it('should apply match-medium level class by default', async () => {
    element.variant = 'match';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.classList.contains('badge--match-medium')).toBe(true);
  });

  it('should apply match-high level class', async () => {
    element.variant = 'match';
    element.level = 'high';
    await elementUpdated(element);

    const badge = shadowQuery<HTMLSpanElement>(element, '.badge');
    expect(badge?.classList.contains('badge--match-high')).toBe(true);
  });

  it('should render slotted content', async () => {
    cleanup(element);
    const container = document.createElement('div');
    container.innerHTML = '<zev-badge>Remoto</zev-badge>';
    document.body.appendChild(container);
    element = container.querySelector('zev-badge') as ZevBadge;
    await elementUpdated(element);

    const slot = shadowQuery<HTMLSlotElement>(element, 'slot');
    expect(slot).toBeDefined();

    cleanup(element);
    container.remove();
  });
});
