import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-file-upload
 *
 * Componente de upload de arquivos com drag & drop e validação.
 *
 * ### Características
 * - Drag & drop de arquivos
 * - Click para selecionar
 * - Validação de tipo (accept)
 * - Validação de tamanho (maxSize)
 * - Suporte a múltiplos arquivos
 * - Lista de arquivos selecionados com remoção
 * - Estados de erro e desabilitado
 *
 * ### Eventos
 * - `file-select`: Emitido quando arquivos são selecionados (detail: { files: File[] })
 * - `file-remove`: Emitido quando um arquivo é removido (detail: { file: File, files: File[] })
 * - `file-error`: Emitido quando há erro de validação (detail: { errors: string[] })
 */
export default {
  title: 'Components/FileUpload',
  component: 'zev-file-upload',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label do campo',
    },
    accept: {
      control: 'text',
      description: 'Tipos de arquivo aceitos (ex: ".pdf,.doc,image/*")',
    },
    maxSize: {
      control: 'number',
      description: 'Tamanho máximo em bytes (padrão: 10MB)',
      table: { defaultValue: { summary: '10485760' } },
    },
    maxFiles: {
      control: 'number',
      description: 'Número máximo de arquivos',
      table: { defaultValue: { summary: '1' } },
    },
    multiple: {
      control: 'boolean',
      description: 'Permitir múltiplos arquivos',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
      table: { defaultValue: { summary: 'false' } },
    },
    hint: {
      control: 'text',
      description: 'Texto de dica personalizado',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro',
    },
  },
};

export const Default = {
  args: {
    label: 'Anexar arquivo',
  },
  render: (args: any) => html`
    <zev-file-upload
      .label=${args.label}
      .accept=${args.accept}
      .maxSize=${args.maxSize}
      .maxFiles=${args.maxFiles}
      ?multiple=${args.multiple}
      ?disabled=${args.disabled}
      .hint=${args.hint}
      .error=${args.error}
      @file-select=${action('file-select')}
      @file-remove=${action('file-remove')}
      @file-error=${action('file-error')}
    ></zev-file-upload>
  `,
};

export const ImageUpload = {
  name: 'Upload de Imagens',
  render: () => html`
    <zev-file-upload
      label="Foto de perfil"
      accept="image/*"
      hint="PNG, JPG ou GIF até 5MB"
      .maxSize=${5 * 1024 * 1024}
      @file-select=${action('file-select')}
      @file-remove=${action('file-remove')}
      @file-error=${action('file-error')}
    ></zev-file-upload>
  `,
};

export const DocumentUpload = {
  name: 'Upload de Documentos',
  render: () => html`
    <zev-file-upload
      label="Currículo"
      accept=".pdf,.doc,.docx"
      hint="PDF ou Word até 10MB"
      @file-select=${action('file-select')}
      @file-remove=${action('file-remove')}
      @file-error=${action('file-error')}
    ></zev-file-upload>
  `,
};

export const MultipleFiles = {
  name: 'Múltiplos Arquivos',
  render: () => html`
    <zev-file-upload
      label="Anexos"
      multiple
      .maxFiles=${5}
      hint="Até 5 arquivos, máximo 10MB cada"
      @file-select=${action('file-select')}
      @file-remove=${action('file-remove')}
      @file-error=${action('file-error')}
    ></zev-file-upload>
  `,
};

export const WithError = {
  name: 'Com Erro',
  render: () => html`
    <zev-file-upload
      label="Upload com erro"
      error="O arquivo excede o tamanho máximo permitido"
      @file-select=${action('file-select')}
      @file-remove=${action('file-remove')}
      @file-error=${action('file-error')}
    ></zev-file-upload>
  `,
};

export const Disabled = {
  name: 'Desabilitado',
  render: () => html`
    <zev-file-upload
      label="Upload desabilitado"
      disabled
    ></zev-file-upload>
  `,
};

export const SmallMaxSize = {
  name: 'Tamanho Máximo Pequeno',
  render: () => html`
    <zev-file-upload
      label="Arquivo pequeno"
      .maxSize=${100 * 1024}
      hint="Máximo 100KB - ideal para testar validação"
      @file-select=${action('file-select')}
      @file-remove=${action('file-remove')}
      @file-error=${action('file-error')}
    ></zev-file-upload>
  `,
};

export const FormExample = {
  name: 'Exemplo em Formulário',
  render: () => html`
    <div style="max-width: 500px; display: flex; flex-direction: column; gap: 1.5rem; padding: 1.5rem; background: var(--zev-color-bg-secondary); border-radius: 8px;">
      <h3 style="margin: 0; color: var(--zev-color-text-primary);">Enviar Candidatura</h3>

      <zev-input label="Nome completo" placeholder="Seu nome"></zev-input>
      <zev-input label="E-mail" placeholder="seu@email.com"></zev-input>

      <zev-file-upload
        label="Currículo (obrigatório)"
        accept=".pdf"
        hint="Apenas PDF"
        @file-select=${action('file-select')}
        @file-remove=${action('file-remove')}
        @file-error=${action('file-error')}
      ></zev-file-upload>

      <zev-file-upload
        label="Portfólio (opcional)"
        accept=".pdf,image/*"
        multiple
        .maxFiles=${3}
        hint="PDF ou imagens, até 3 arquivos"
        @file-select=${action('file-select')}
        @file-remove=${action('file-remove')}
        @file-error=${action('file-error')}
      ></zev-file-upload>

      <zev-button variant="primary">Enviar candidatura</zev-button>
    </div>
  `,
};
