import { html } from 'lit';
import '@malvezzidatr/zev-core';

/**
 * ## zev-badge
 *
 * Componente de badge para indicadores de status.
 *
 * ### Características
 * - 5 variantes: success, warning, info, neutral, match
 * - Suporta conteúdo via slot ou prop `label`
 * - Design compacto para uso em cards e listas
 *
 * ### Uso
 * Ideal para indicar status como "Remoto", "Presencial", "Novo", "Urgente", etc.
 */
export default {
  title: 'Components/Badge',
  component: 'zev-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'info', 'neutral', 'match'],
      description: 'Variante visual do badge',
      table: { defaultValue: { summary: 'neutral' } },
    },
    label: {
      control: 'text',
      description: 'Texto do badge (alternativa ao slot)',
      table: { defaultValue: { summary: '' } },
    },
  },
};

export const Default = {
  args: {
    variant: 'neutral',
    label: 'Badge',
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-badge variant=${args.variant} label=${args.label}></zev-badge>
    </div>
  `,
};

export const Variants = {
  name: 'Variantes',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; flex-wrap: wrap;">
      <zev-badge variant="success" label="Success"></zev-badge>
      <zev-badge variant="warning" label="Warning"></zev-badge>
      <zev-badge variant="info" label="Info"></zev-badge>
      <zev-badge variant="neutral" label="Neutral"></zev-badge>
    </div>
  `,
};

export const MatchBadge = {
  name: 'Match Badge',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <zev-badge variant="match" level="low" label="15% Match"></zev-badge>
      <zev-badge variant="match" level="medium" label="50% Match"></zev-badge>
      <zev-badge variant="match" level="high" label="85% Match"></zev-badge>
    </div>
  `,
};

export const JobStatus = {
  name: 'Status de Vaga',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); display: flex; gap: 1rem; flex-wrap: wrap;">
      <zev-badge variant="success">Remoto</zev-badge>
      <zev-badge variant="warning">Híbrido</zev-badge>
      <zev-badge variant="info">Presencial</zev-badge>
      <zev-badge variant="neutral">CLT</zev-badge>
    </div>
  `,
};

export const InContext = {
  name: 'Em Contexto',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <div style="
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid var(--zev-color-border-tag);
        border-radius: 8px;
      ">
        <div style="flex: 1;">
          <h3 style="margin: 0 0 0.5rem; color: var(--zev-color-text-primary); font-family: var(--zev-font-primary);">
            Senior Frontend Developer
          </h3>
          <p style="margin: 0; color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); font-size: var(--zev-fs-small);">
            Empresa XYZ • São Paulo, SP
          </p>
        </div>
        <zev-badge variant="success">Remoto</zev-badge>
      </div>
    </div>
  `,
};
