import { html } from 'lit';
import '@malvezzidatr/zev-core';

/**
 * ## zev-loader
 *
 * Skeleton loader para estados de carregamento.
 *
 * ### Características
 * - Animação de shimmer suave
 * - 3 tamanhos: sm, md, lg
 * - Usa tokens de cor para adaptação ao tema
 *
 * ### Uso
 * Ideal para indicar carregamento de conteúdo em cards, listas e formulários.
 */
export default {
  title: 'Components/Loader',
  component: 'zev-loader',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do skeleton',
      table: { defaultValue: { summary: 'md' } },
    },
    width: {
      control: 'text',
      description: 'Largura customizada (ex: "200px", "100%")',
    },
    height: {
      control: 'text',
      description: 'Altura customizada (ex: "20px", "2rem")',
    },
  },
};

export const Default = {
  args: {
    size: 'md',
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 300px;">
      <zev-loader size=${args.size}></zev-loader>
    </div>
  `,
};

export const Sizes = {
  name: 'Tamanhos',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 300px; display: flex; flex-direction: column; gap: 1rem;">
      <zev-loader size="sm"></zev-loader>
      <zev-loader size="md"></zev-loader>
      <zev-loader size="lg"></zev-loader>
    </div>
  `,
};

export const CardSkeleton = {
  name: 'Card Skeleton',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <div style="
        padding: 1.5rem;
        border: 1px solid var(--zev-color-border-tag);
        border-radius: 8px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      ">
        <zev-loader size="lg"></zev-loader>
        <zev-loader size="md"></zev-loader>
        <div style="display: flex; gap: 0.5rem;">
          <zev-loader size="sm" style="width: 60px;"></zev-loader>
          <zev-loader size="sm" style="width: 80px;"></zev-loader>
        </div>
        <zev-loader size="sm"></zev-loader>
      </div>
    </div>
  `,
};

export const CustomDimensions = {
  name: 'Dimensões Customizadas',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px; display: flex; flex-direction: column; gap: 1rem;">
      <zev-loader width="200px" height="20px"></zev-loader>
      <zev-loader width="60px" height="2rem"></zev-loader>
      <zev-loader width="100%" height="40px"></zev-loader>
      <div style="display: flex; gap: 0.5rem;">
        <zev-loader width="60px" height="1rem"></zev-loader>
        <zev-loader width="80px" height="1rem"></zev-loader>
        <zev-loader width="50px" height="1rem"></zev-loader>
      </div>
    </div>
  `,
};

export const ListSkeleton = {
  name: 'Lista Skeleton',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${[1, 2, 3].map(() => html`
          <div style="
            padding: 1rem;
            border: 1px solid var(--zev-color-border-tag);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          ">
            <zev-loader size="md"></zev-loader>
            <zev-loader size="sm" style="width: 60%;"></zev-loader>
          </div>
        `)}
      </div>
    </div>
  `,
};
