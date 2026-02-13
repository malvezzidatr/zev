import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fixture, cleanup, elementUpdated, shadowQuery } from './test-helpers.js';
import '../components/stat-card/zev-stat-card.js';
import type { ZevStatCard } from '../components/stat-card/zev-stat-card.js';

describe('zev-stat-card', () => {
  let element: ZevStatCard;

  beforeEach(async () => {
    element = fixture<ZevStatCard>('zev-stat-card');
    await elementUpdated(element);
  });

  afterEach(() => {
    cleanup(element);
  });

  it('should render', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('should render value', async () => {
    element.value = '1.234';
    await elementUpdated(element);

    const value = shadowQuery<HTMLElement>(element, '.stat-card__value');
    expect(value?.textContent).toBe('1.234');
  });

  it('should render label', async () => {
    element.label = 'Total de Vagas';
    await elementUpdated(element);

    const label = shadowQuery<HTMLElement>(element, '.stat-card__label');
    expect(label?.textContent).toBe('Total de Vagas');
  });

  it('should have default variant', () => {
    expect(element.variant).toBe('default');
    const card = shadowQuery<HTMLElement>(element, '.stat-card');
    expect(card?.classList.contains('stat-card--accent')).toBe(false);
  });

  it('should apply accent variant', async () => {
    element.variant = 'accent';
    await elementUpdated(element);

    const card = shadowQuery<HTMLElement>(element, '.stat-card');
    expect(card?.classList.contains('stat-card--accent')).toBe(true);
  });

  it('should not render value when empty', async () => {
    element.value = '';
    await elementUpdated(element);

    const value = shadowQuery<HTMLElement>(element, '.stat-card__value');
    expect(value).toBeNull();
  });

  it('should not render label when empty', async () => {
    element.label = '';
    await elementUpdated(element);

    const label = shadowQuery<HTMLElement>(element, '.stat-card__label');
    expect(label).toBeNull();
  });

  it('should have icon slot', () => {
    const iconSlot = shadowQuery<HTMLSlotElement>(element, 'slot[name="icon"]');
    expect(iconSlot).not.toBeNull();
  });
});
