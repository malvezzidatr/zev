import { html } from 'lit';
import '@malvezzidatr/zev-core';

/**
 * ## zev-progress-bar
 *
 * Barra de progresso com múltiplas variantes de cor e estados.
 *
 * ### Características
 * - Variantes: primary, success, warning, error, info
 * - Tamanhos: sm, md, lg
 * - Label e valor percentual opcional
 * - Modo indeterminado para progresso desconhecido
 * - Efeito striped com animação opcional
 *
 * ### Props
 * - `value`: Valor atual (0-max)
 * - `max`: Valor máximo (padrão: 100)
 * - `label`: Texto do label
 * - `show-value`: Exibe porcentagem
 * - `variant`: Cor da barra
 * - `size`: Tamanho da barra
 * - `indeterminate`: Modo indeterminado
 * - `striped`: Efeito listrado
 * - `animated`: Animação do efeito listrado
 */
export default {
  title: 'Components/ProgressBar',
  component: 'zev-progress-bar',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Valor atual do progresso',
      table: { defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: 'Valor máximo',
      table: { defaultValue: { summary: '100' } },
    },
    label: {
      control: 'text',
      description: 'Label do progresso',
    },
    showValue: {
      control: 'boolean',
      description: 'Exibir valor percentual',
      table: { defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
      description: 'Variante de cor',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho da barra',
      table: { defaultValue: { summary: 'md' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Modo indeterminado',
      table: { defaultValue: { summary: 'false' } },
    },
    striped: {
      control: 'boolean',
      description: 'Efeito listrado',
      table: { defaultValue: { summary: 'false' } },
    },
    animated: {
      control: 'boolean',
      description: 'Animação do efeito listrado',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export const Default = {
  args: {
    value: 60,
    max: 100,
    variant: 'primary',
    size: 'md',
  },
  render: (args: any) => html`
    <zev-progress-bar
      .value=${args.value}
      .max=${args.max}
      .label=${args.label}
      .showValue=${args.showValue}
      .variant=${args.variant}
      .size=${args.size}
      ?indeterminate=${args.indeterminate}
      ?striped=${args.striped}
      ?animated=${args.animated}
    ></zev-progress-bar>
  `,
};

export const WithLabelAndValue = {
  name: 'Com Label e Valor',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <zev-progress-bar value="25" label="Upload em progresso" show-value></zev-progress-bar>
      <zev-progress-bar value="50" label="Processando arquivos" show-value></zev-progress-bar>
      <zev-progress-bar value="75" label="Quase lá..." show-value></zev-progress-bar>
      <zev-progress-bar value="100" label="Concluído!" show-value variant="success"></zev-progress-bar>
    </div>
  `,
};

export const Variants = {
  name: 'Variantes',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <zev-progress-bar value="60" label="Primary" variant="primary" show-value></zev-progress-bar>
      <zev-progress-bar value="60" label="Success" variant="success" show-value></zev-progress-bar>
      <zev-progress-bar value="60" label="Warning" variant="warning" show-value></zev-progress-bar>
      <zev-progress-bar value="60" label="Error" variant="error" show-value></zev-progress-bar>
      <zev-progress-bar value="60" label="Info" variant="info" show-value></zev-progress-bar>
    </div>
  `,
};

export const Sizes = {
  name: 'Tamanhos',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <zev-progress-bar value="60" label="Small (4px)" size="sm" show-value></zev-progress-bar>
      <zev-progress-bar value="60" label="Medium (8px)" size="md" show-value></zev-progress-bar>
      <zev-progress-bar value="60" label="Large (12px)" size="lg" show-value></zev-progress-bar>
    </div>
  `,
};

export const Indeterminate = {
  name: 'Indeterminado',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <zev-progress-bar indeterminate label="Carregando..." variant="primary"></zev-progress-bar>
      <zev-progress-bar indeterminate label="Processando..." variant="info"></zev-progress-bar>
      <zev-progress-bar indeterminate label="Aguarde..." variant="warning"></zev-progress-bar>
    </div>
  `,
};

export const Striped = {
  name: 'Listrado',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <zev-progress-bar value="40" label="Striped" striped show-value></zev-progress-bar>
      <zev-progress-bar value="60" label="Striped Animado" striped animated show-value></zev-progress-bar>
      <zev-progress-bar value="80" label="Striped Success" striped animated variant="success" show-value></zev-progress-bar>
    </div>
  `,
};

export const UploadExample = {
  name: 'Exemplo de Upload',
  render: () => html`
    <div style="max-width: 400px; padding: 1.5rem; background: var(--zev-color-bg-secondary); border-radius: 8px;">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--zev-color-accent)" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <div>
          <p style="margin: 0; font-weight: bold; color: var(--zev-color-text-primary);">documento.pdf</p>
          <p style="margin: 0; font-size: 0.875rem; color: var(--zev-color-text-secondary);">2.4 MB</p>
        </div>
      </div>
      <zev-progress-bar value="67" show-value striped animated></zev-progress-bar>
    </div>
  `,
};

export const StepsExample = {
  name: 'Exemplo de Etapas',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <zev-progress-bar value="100" label="1. Informações pessoais" variant="success" show-value></zev-progress-bar>
      <zev-progress-bar value="100" label="2. Endereço" variant="success" show-value></zev-progress-bar>
      <zev-progress-bar value="45" label="3. Documentos" variant="primary" show-value striped animated></zev-progress-bar>
      <zev-progress-bar value="0" label="4. Revisão" show-value></zev-progress-bar>
    </div>
  `,
};
