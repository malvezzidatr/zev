import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-job-card
 *
 * Card para exibir vagas de emprego.
 *
 * ### Características
 * - Título, empresa e localização
 * - Badge "Remoto" quando aplicável
 * - Tags de tecnologia (limitado a 5)
 * - Salário opcional
 * - Data de publicação e fonte
 *
 * ### Eventos
 * - `card-click`: Disparado ao clicar, com `{ title, company, url }` no detail
 */
export default {
  title: 'Components/JobCard',
  component: 'zev-job-card',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título da vaga',
    },
    company: {
      control: 'text',
      description: 'Nome da empresa',
    },
    location: {
      control: 'text',
      description: 'Localização',
    },
    tags: {
      control: 'object',
      description: 'Tags de tecnologia',
    },
    salary: {
      control: 'text',
      description: 'Informação de salário',
    },
    remote: {
      control: 'boolean',
      description: 'Se a vaga é remota',
    },
    postedAt: {
      control: 'text',
      description: 'Quando foi publicada',
    },
    url: {
      control: 'text',
      description: 'URL da vaga',
    },
    source: {
      control: 'text',
      description: 'Fonte da vaga',
    },
    disableHover: {
      control: 'boolean',
      description: 'Desabilita efeito de hover',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export const Default = {
  args: {
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    location: 'São Paulo, SP',
    tags: ['React', 'TypeScript', 'Node.js'],
    salary: 'R$ 15.000 - R$ 20.000',
    remote: true,
    postedAt: 'Há 2 dias',
    url: 'https://example.com/job',
    source: 'LinkedIn',
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 500px;">
      <zev-job-card
        title=${args.title}
        company=${args.company}
        location=${args.location}
        .tags=${args.tags}
        salary=${args.salary}
        ?remote=${args.remote}
        posted-at=${args.postedAt}
        url=${args.url}
        source=${args.source}
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-job-card>
    </div>
  `,
};

export const RemoteJob = {
  name: 'Vaga Remota',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 500px;">
      <zev-job-card
        title="Full Stack Developer"
        company="Startup XYZ"
        location="Brasil"
        .tags=${['React', 'Node.js', 'PostgreSQL', 'Docker']}
        salary="R$ 12.000 - R$ 18.000"
        remote
        posted-at="Há 1 dia"
        url="https://example.com/job"
        source="GitHub Jobs"
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-job-card>
    </div>
  `,
};

export const OnsiteJob = {
  name: 'Vaga Presencial',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 500px;">
      <zev-job-card
        title="Backend Engineer"
        company="Banco Digital"
        location="São Paulo, SP"
        .tags=${['Java', 'Spring Boot', 'Kafka', 'AWS']}
        salary="R$ 18.000 - R$ 25.000"
        posted-at="Há 5 dias"
        url="https://example.com/job"
        source="Gupy"
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-job-card>
    </div>
  `,
};

export const MinimalInfo = {
  name: 'Informações Mínimas',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 500px;">
      <zev-job-card
        title="Software Developer"
        company="Empresa ABC"
        posted-at="Há 1 semana"
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-job-card>
    </div>
  `,
};

export const ManyTags = {
  name: 'Muitas Tags (Limite 5)',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 500px;">
      <zev-job-card
        title="DevOps Engineer"
        company="Cloud Corp"
        location="Remoto"
        .tags=${['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP', 'Azure', 'Ansible', 'Jenkins']}
        remote
        posted-at="Há 3 dias"
        source="LinkedIn"
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-job-card>
    </div>
  `,
};

export const DisabledHover = {
  name: 'Sem Hover',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary); max-width: 500px;">
      <zev-job-card
        title="Senior Frontend Developer"
        company="Tech Company"
        location="São Paulo, SP"
        .tags=${['React', 'TypeScript']}
        remote
        posted-at="Há 2 dias"
        source="LinkedIn"
        disable-hover
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-job-card>
    </div>
  `,
};

export const JobList = {
  name: 'Lista de Vagas',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <div style="display: grid; gap: 1rem; max-width: 800px;">
        <zev-job-card
          title="Senior Frontend Developer"
          company="Tech Company"
          location="São Paulo, SP"
          .tags=${['React', 'TypeScript', 'GraphQL']}
          salary="R$ 15.000 - R$ 20.000"
          remote
          posted-at="Há 2 dias"
          source="LinkedIn"
          @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
        ></zev-job-card>

        <zev-job-card
          title="Backend Developer"
          company="Fintech ABC"
          location="Rio de Janeiro, RJ"
          .tags=${['Node.js', 'Python', 'PostgreSQL']}
          salary="R$ 12.000 - R$ 16.000"
          posted-at="Há 3 dias"
          source="Gupy"
          @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
        ></zev-job-card>

        <zev-job-card
          title="Full Stack Engineer"
          company="Startup XYZ"
          location="Brasil"
          .tags=${['React', 'Node.js', 'MongoDB', 'Docker']}
          remote
          posted-at="Há 1 semana"
          source="GitHub Jobs"
          @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
        ></zev-job-card>
      </div>
    </div>
  `,
};
