import { html } from 'lit';
import '@malvezzidatr/zev-core';

/**
 * ## zev-about
 *
 * Seção "About" com bio, skills e timeline.
 *
 * ### Características
 * - Background cinza (`--zev-color-gray`)
 * - Grid 2 colunas: bio+skills | timeline
 * - Skills como tags com hover azul
 * - Timeline com dots azuis (10x10px)
 * - Colapsa para 1 coluna em mobile (< 768px)
 *
 * ### Dados
 * - `bio`: Texto com `\n` para separar parágrafos
 * - `skills`: Array de strings
 * - `timeline`: Array de `{ year, title, description }`
 */
export default {
  title: 'Components/About',
  component: 'zev-about',
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
      description: 'Tag numerada da seção',
      table: { defaultValue: { summary: '[02]' } },
    },
    title: {
      control: 'text',
      description: 'Título da seção',
    },
    bio: {
      control: 'text',
      description: 'Texto bio. Use \\n para separar parágrafos.',
    },
    skills: {
      control: 'object',
      description: 'Array de strings com nomes de skills',
    },
    timeline: {
      control: 'object',
      description: 'Array de `{ year, title, description }`',
    },
  },
};

export const Default = {
  args: {
    tag: '[02]',
    title: 'About',
    bio: 'I\'m a frontend developer passionate about creating beautiful and functional web experiences.\nWith 5+ years of experience, I specialize in React, TypeScript, and modern CSS.',
    skills: ['React', 'TypeScript', 'CSS', 'Node.js', 'Figma', 'Git', 'Lit', 'Web Components'],
    timeline: [
      { year: '2024', title: 'Senior Frontend Developer', description: 'Leading UI architecture at Company X' },
      { year: '2022', title: 'Frontend Developer', description: 'Building design systems and component libraries' },
      { year: '2020', title: 'Junior Developer', description: 'Started career with React and Vue projects' },
    ],
  },
  render: (args: any) => html`
    <zev-about
      tag=${args.tag}
      title=${args.title}
      .bio=${args.bio}
      .skills=${args.skills}
      .timeline=${args.timeline}
    ></zev-about>
  `,
};

export const ManySkills = {
  name: 'Muitas Skills',
  args: {
    tag: '[02]',
    title: 'About',
    bio: 'Full-stack developer with a broad range of expertise.',
    skills: ['React', 'Vue', 'Angular', 'Svelte', 'TypeScript', 'Node.js', 'Python', 'Go', 'Rust', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    timeline: [
      { year: '2024', title: 'Staff Engineer', description: 'Architecture decisions across teams' },
      { year: '2021', title: 'Senior Developer', description: 'Led frontend platform team' },
    ],
  },
  render: (args: any) => html`
    <zev-about
      tag=${args.tag}
      title=${args.title}
      .bio=${args.bio}
      .skills=${args.skills}
      .timeline=${args.timeline}
    ></zev-about>
  `,
};
