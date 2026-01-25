import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@zev/core';

/**
 * ## zev-blog-card
 *
 * Card para preview de posts de blog com imagem, título, excerpt e metadados.
 *
 * ### Características
 * - Imagem com aspect ratio 16:9 e efeito de zoom no hover
 * - Placeholder SVG quando sem imagem
 * - Título que muda de cor no hover
 * - Excerpt com line-clamp de 3 linhas
 * - Tags com estilo outline que preenchem no hover
 * - Suporte a autor com avatar
 * - Altura uniforme em grids
 *
 * ### Eventos
 * - `card-click`: Disparado ao clicar, com `{ title, slug }` no detail
 */
export default {
  title: 'Components/BlogCard',
  component: 'zev-blog-card',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do post',
    },
    excerpt: {
      control: 'text',
      description: 'Resumo/excerpt do post',
    },
    date: {
      control: 'text',
      description: 'Data de publicação formatada',
    },
    slug: {
      control: 'text',
      description: 'Slug/URL do post para navegação',
    },
    image: {
      control: 'text',
      description: 'URL da imagem de capa (opcional)',
    },
    tags: {
      control: 'object',
      description: 'Array de tags/categorias (máximo 3 exibidas)',
    },
    readTime: {
      control: 'text',
      description: 'Tempo estimado de leitura (opcional)',
    },
    authorName: {
      control: 'text',
      description: 'Nome do autor (opcional)',
    },
    authorAvatar: {
      control: 'text',
      description: 'URL do avatar do autor (opcional)',
    },
  },
};

export const Default = {
  args: {
    title: 'Building a Design System with Lit',
    excerpt: 'Learn how to create a modern design system using Lit web components, TypeScript, and CSS custom properties for maximum flexibility and reusability.',
    date: 'Jan 24, 2025',
    slug: 'building-design-system-lit',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    tags: ['Web Components', 'TypeScript', 'Design System'],
    readTime: '8 min read',
    authorName: 'Caio Malvessi',
    authorAvatar: '',
  },
  render: (args: any) => html`
    <div style="max-width: 400px;">
      <zev-blog-card
        title=${args.title}
        excerpt=${args.excerpt}
        date=${args.date}
        slug=${args.slug}
        image=${args.image}
        .tags=${args.tags}
        read-time=${args.readTime}
        author-name=${args.authorName}
        author-avatar=${args.authorAvatar}
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-blog-card>
    </div>
  `,
};

export const SemImagem = {
  name: 'Sem Imagem',
  args: {
    title: 'Dark Mode: Implementação com CSS Custom Properties',
    excerpt: 'Como implementar dark mode de forma elegante usando variáveis CSS e media queries, sem JavaScript adicional.',
    date: '20 Jan 2025',
    slug: 'dark-mode-css-custom-properties',
    image: '',
    tags: ['CSS', 'Dark Mode'],
    readTime: '5 min read',
    authorName: '',
    authorAvatar: '',
  },
  render: (args: any) => html`
    <div style="max-width: 400px;">
      <zev-blog-card
        title=${args.title}
        excerpt=${args.excerpt}
        date=${args.date}
        slug=${args.slug}
        .tags=${args.tags}
        read-time=${args.readTime}
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-blog-card>
    </div>
  `,
};

export const ComAutor = {
  name: 'Com Autor e Avatar',
  args: {
    title: 'React 19: O que há de novo',
    excerpt: 'Explorando as novidades do React 19 incluindo Server Components, Actions, e melhorias de performance.',
    date: '15 Jan 2025',
    slug: 'react-19-novidades',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    tags: ['React', 'JavaScript', 'Frontend'],
    readTime: '12 min read',
    authorName: 'Caio Malvessi',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  render: (args: any) => html`
    <div style="max-width: 400px;">
      <zev-blog-card
        title=${args.title}
        excerpt=${args.excerpt}
        date=${args.date}
        slug=${args.slug}
        image=${args.image}
        .tags=${args.tags}
        read-time=${args.readTime}
        author-name=${args.authorName}
        author-avatar=${args.authorAvatar}
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-blog-card>
    </div>
  `,
};

export const GridDePosts = {
  name: 'Grid de Posts',
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; padding: 1rem;">
      <zev-blog-card
        title="Building a Design System"
        excerpt="Learn how to create a modern design system using Lit web components and TypeScript."
        date="Jan 24, 2025"
        slug="design-system"
        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
        .tags=${['Lit', 'TypeScript']}
        read-time="8 min"
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-blog-card>

      <zev-blog-card
        title="CSS Custom Properties para Temas Dinâmicos"
        excerpt="Aprenda a usar variáveis CSS para criar sistemas de temas flexíveis e performáticos."
        date="Jan 20, 2025"
        slug="css-custom-properties"
        image="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop"
        .tags=${['CSS', 'Theming']}
        read-time="6 min"
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-blog-card>

      <zev-blog-card
        title="Micro Frontends na Prática"
        excerpt="Como implementar arquitetura de micro frontends em projetos enterprise com Module Federation."
        date="Jan 15, 2025"
        slug="micro-frontends"
        .tags=${['Architecture', 'React']}
        read-time="15 min"
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-blog-card>
    </div>
  `,
};

export const Minimal = {
  name: 'Minimalista',
  args: {
    title: 'Quick Tip: Usando CSS Grid',
    excerpt: 'Dica rápida sobre como usar CSS Grid para layouts responsivos.',
    date: '10 Jan 2025',
    slug: 'quick-tip-css-grid',
    image: '',
    tags: [],
    readTime: '',
    authorName: '',
    authorAvatar: '',
  },
  render: (args: any) => html`
    <div style="max-width: 400px;">
      <zev-blog-card
        title=${args.title}
        excerpt=${args.excerpt}
        date=${args.date}
        slug=${args.slug}
        @card-click=${(e: CustomEvent) => action('card-click')(e.detail)}
      ></zev-blog-card>
    </div>
  `,
};
