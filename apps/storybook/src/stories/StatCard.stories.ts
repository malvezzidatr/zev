import { html } from 'lit';
import '@malvezzidatr/zev-core';

/**
 * ## zev-stat-card
 *
 * Componente de card para exibir estatísticas numéricas.
 *
 * ### Características
 * - Exibe valor e label
 * - Suporta slot para ícone
 * - Variantes: default e accent
 *
 * ### CSS Custom Properties
 * Herda tokens do design system para cores e tipografia.
 */
export default {
  title: 'Components/StatCard',
  component: 'zev-stat-card',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Valor da estatística',
    },
    label: {
      control: 'text',
      description: 'Label descritiva',
    },
    variant: {
      control: 'select',
      options: ['default', 'accent'],
      description: 'Variante visual',
    },
  },
};

export const Default = {
  args: {
    value: '1.234',
    label: 'Total de Vagas',
    variant: 'default',
  },
  render: (args: any) => html`
    <zev-stat-card
      .value=${args.value}
      .label=${args.label}
      .variant=${args.variant}
    ></zev-stat-card>
  `,
};

export const Accent = {
  args: {
    value: '87%',
    label: 'Compatibilidade',
    variant: 'accent',
  },
  render: (args: any) => html`
    <zev-stat-card
      .value=${args.value}
      .label=${args.label}
      .variant=${args.variant}
    ></zev-stat-card>
  `,
};

export const StatsGrid = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; max-width: 800px;">
      <zev-stat-card value="1.234" label="Total de Vagas"></zev-stat-card>
      <zev-stat-card value="456" label="Remotas"></zev-stat-card>
      <zev-stat-card value="78" label="Novas Hoje" variant="accent"></zev-stat-card>
      <zev-stat-card value="92%" label="Match Médio"></zev-stat-card>
    </div>
  `,
};
