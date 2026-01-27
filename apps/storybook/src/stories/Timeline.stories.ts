import { html } from 'lit';
import '@zev/core';

/**
 * ## zev-timeline & zev-timeline-item
 *
 * Componentes para exibir histórico, experiência profissional ou eventos cronológicos.
 *
 * ### Características
 * - Timeline pode receber items via prop `items` ou via slot
 * - Modo `connected` adiciona linha vertical conectando os items
 * - Timeline-item pode ser usado standalone ou dentro do timeline
 * - Suporta slots para título e descrição customizados
 *
 * ### Eventos
 * Nenhum evento emitido.
 */
export default {
  title: 'Components/Timeline',
  component: 'zev-timeline',
  tags: ['autodocs'],
  argTypes: {
    connected: {
      control: 'boolean',
      description: 'Mostra linha conectando os items',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

const sampleItems = [
  { year: '2024 - Present', title: 'Senior Software Engineer', description: 'Leading frontend architecture and design system development.' },
  { year: '2022 - 2024', title: 'Software Engineer', description: 'Built and maintained React applications for enterprise clients.' },
  { year: '2020 - 2022', title: 'Junior Developer', description: 'Started career working on web applications and learning best practices.' },
];

export const Default = {
  args: {
    connected: false,
  },
  render: (args: any) => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-timeline .items=${sampleItems} ?connected=${args.connected}></zev-timeline>
    </div>
  `,
};

export const Connected = {
  name: 'Com Linha Conectora',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-timeline .items=${sampleItems} connected></zev-timeline>
    </div>
  `,
};

export const WithSlottedItems = {
  name: 'Com Items via Slot',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-timeline>
        <zev-timeline-item
          year="2024"
          title="Current Role"
          description="Working on exciting projects."
        ></zev-timeline-item>
        <zev-timeline-item
          year="2022"
          title="Previous Role"
          description="Learned a lot about software development."
        ></zev-timeline-item>
        <zev-timeline-item
          year="2020"
          title="First Job"
          description="Started my career journey."
        ></zev-timeline-item>
      </zev-timeline>
    </div>
  `,
};

export const SingleItem = {
  name: 'Item Individual',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-timeline-item
        year="2024 - Present"
        title="Software Engineer"
        description="Building amazing products with modern technologies."
      ></zev-timeline-item>
    </div>
  `,
};

export const InAboutSection = {
  name: 'Em Seção About',
  render: () => html`
    <div style="padding: 4rem 2rem; background: var(--zev-color-bg-secondary);">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
          <div>
            <zev-section-header tag="[02]" title="About"></zev-section-header>
            <p style="color: var(--zev-color-text-secondary); font-family: var(--zev-font-primary); line-height: 1.8;">
              I'm a passionate software engineer focused on building exceptional digital experiences.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 2rem;">
              <zev-tag label="React" interactive></zev-tag>
              <zev-tag label="TypeScript" interactive></zev-tag>
              <zev-tag label="Node.js" interactive></zev-tag>
            </div>
          </div>
          <div>
            <h3 style="font-family: var(--zev-font-primary); color: var(--zev-color-text-primary); font-size: var(--zev-fs-small); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem;">
              Experience
            </h3>
            <zev-timeline .items=${sampleItems}></zev-timeline>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const EducationTimeline = {
  name: 'Timeline de Educação',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <h3 style="font-family: var(--zev-font-primary); color: var(--zev-color-text-primary); font-size: var(--zev-fs-small); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem;">
        Education
      </h3>
      <zev-timeline connected>
        <zev-timeline-item
          year="2020"
          title="BSc Computer Science"
          description="University of Technology - Graduated with honors."
        ></zev-timeline-item>
        <zev-timeline-item
          year="2018"
          title="Web Development Bootcamp"
          description="Intensive 12-week program covering full-stack development."
        ></zev-timeline-item>
        <zev-timeline-item
          year="2016"
          title="High School Diploma"
          description="Focus on Mathematics and Computer Science."
        ></zev-timeline-item>
      </zev-timeline>
    </div>
  `,
};

export const CustomContent = {
  name: 'Conteúdo Customizado via Slot',
  render: () => html`
    <div style="padding: 2rem; background: var(--zev-color-bg-primary);">
      <zev-timeline>
        <zev-timeline-item year="2024">
          <span slot="title">
            <strong>Tech Lead</strong> @ StartupXYZ
          </span>
          <div>
            <p style="margin: 0 0 0.5rem; color: var(--zev-color-text-secondary); font-size: var(--zev-fs-small);">
              Leading a team of 5 engineers building the next generation platform.
            </p>
            <div style="display: flex; gap: 0.25rem; flex-wrap: wrap;">
              <zev-tag label="React" size="small" variant="accent"></zev-tag>
              <zev-tag label="GraphQL" size="small" variant="accent"></zev-tag>
            </div>
          </div>
        </zev-timeline-item>
      </zev-timeline>
    </div>
  `,
};
