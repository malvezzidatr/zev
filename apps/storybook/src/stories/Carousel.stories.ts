import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import '@malvezzidatr/zev-core';

/**
 * ## zev-carousel
 *
 * Componente de carousel/slider para exibir conteúdo em slides navegáveis.
 *
 * ### Características
 * - Navegação com botões (anterior/próximo)
 * - Indicadores (dots) clicáveis
 * - Suporte a múltiplos slides por view
 * - Loop infinito opcional
 * - Autoplay com pause on hover
 * - Drag/swipe para navegação
 * - Gap configurável entre slides
 * - Responsivo
 *
 * ### Props
 * - `slides-per-view`: Número de slides visíveis (1-5)
 * - `gap`: Espaçamento entre slides (none, sm, md, lg)
 * - `loop`: Habilita navegação infinita
 * - `autoplay`: Reprodução automática
 * - `autoplay-interval`: Intervalo em ms (padrão: 5000)
 * - `hide-nav`: Esconde botões de navegação
 * - `hide-indicators`: Esconde indicadores
 * - `pause-on-hover`: Pausa autoplay no hover
 *
 * ### Eventos
 * - `carousel-change`: Emitido ao mudar de slide
 *   - detail: `{ index: number, previousIndex: number }`
 */
export default {
  title: 'Components/Carousel',
  component: 'zev-carousel',
  tags: ['autodocs'],
  argTypes: {
    slidesPerView: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Número de slides visíveis',
      table: { defaultValue: { summary: '1' } },
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Espaçamento entre slides',
      table: { defaultValue: { summary: 'none' } },
    },
    loop: {
      control: 'boolean',
      description: 'Navegação infinita',
      table: { defaultValue: { summary: 'false' } },
    },
    autoplay: {
      control: 'boolean',
      description: 'Reprodução automática',
      table: { defaultValue: { summary: 'false' } },
    },
    autoplayInterval: {
      control: 'number',
      description: 'Intervalo do autoplay (ms)',
      table: { defaultValue: { summary: '5000' } },
    },
    hideNav: {
      control: 'boolean',
      description: 'Esconder navegação',
      table: { defaultValue: { summary: 'false' } },
    },
    hideIndicators: {
      control: 'boolean',
      description: 'Esconder indicadores',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

const imageUrls = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=500&fit=crop',
];

export const Default = {
  args: {
    slidesPerView: 1,
    gap: 'none',
    loop: false,
    autoplay: false,
    hideNav: false,
    hideIndicators: false,
  },
  render: (args: any) => html`
    <zev-carousel
      .slidesPerView=${args.slidesPerView}
      .gap=${args.gap}
      ?loop=${args.loop}
      ?autoplay=${args.autoplay}
      .autoplayInterval=${args.autoplayInterval}
      ?hide-nav=${args.hideNav}
      ?hide-indicators=${args.hideIndicators}
      @carousel-change=${action('carousel-change')}
    >
      ${imageUrls.map(
        (url, i) => html`
          <zev-carousel-item>
            <img src=${url} alt="Slide ${i + 1}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px;" />
          </zev-carousel-item>
        `
      )}
    </zev-carousel>
  `,
};

export const ImageCarousel = {
  name: 'Carousel de Imagens',
  render: () => html`
    <zev-carousel loop @carousel-change=${action('carousel-change')}>
      ${imageUrls.map(
        (url, i) => html`
          <zev-carousel-item>
            <img src=${url} alt="Paisagem ${i + 1}" style="width: 100%; height: 450px; object-fit: cover; border-radius: 12px;" />
          </zev-carousel-item>
        `
      )}
    </zev-carousel>
  `,
};

export const CardCarousel = {
  name: 'Carousel de Cards',
  render: () => html`
    <zev-carousel slides-per-view="3" gap="md" loop @carousel-change=${action('carousel-change')}>
      ${[1, 2, 3, 4, 5, 6].map(
        (i) => html`
          <zev-carousel-item>
            <div style="background: var(--zev-color-card-default); border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div style="width: 100%; height: 150px; background: var(--zev-color-bg-secondary); border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--zev-color-text-secondary)" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <h4 style="margin: 0 0 0.5rem 0; color: var(--zev-color-text-primary);">Card ${i}</h4>
              <p style="margin: 0; color: var(--zev-color-text-secondary); font-size: 0.875rem;">
                Descrição do card com algum texto de exemplo.
              </p>
            </div>
          </zev-carousel-item>
        `
      )}
    </zev-carousel>
  `,
};

export const ProductCarousel = {
  name: 'Carousel de Produtos',
  render: () => html`
    <div style="max-width: 1200px;">
      <h3 style="margin-bottom: 1rem; color: var(--zev-color-text-primary);">Produtos em Destaque</h3>
      <zev-carousel slides-per-view="4" gap="md" loop @carousel-change=${action('carousel-change')}>
        ${[
          { name: 'Produto A', price: 'R$ 99,90', img: imageUrls[0] },
          { name: 'Produto B', price: 'R$ 149,90', img: imageUrls[1] },
          { name: 'Produto C', price: 'R$ 79,90', img: imageUrls[2] },
          { name: 'Produto D', price: 'R$ 199,90', img: imageUrls[3] },
          { name: 'Produto E', price: 'R$ 129,90', img: imageUrls[4] },
          { name: 'Produto F', price: 'R$ 89,90', img: imageUrls[0] },
        ].map(
          (product) => html`
            <zev-carousel-item>
              <div style="background: var(--zev-color-card-default); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <img src=${product.img} alt=${product.name} style="width: 100%; height: 180px; object-fit: cover;" />
                <div style="padding: 1rem;">
                  <h5 style="margin: 0 0 0.25rem 0; color: var(--zev-color-text-primary);">${product.name}</h5>
                  <p style="margin: 0; color: var(--zev-color-accent); font-weight: bold;">${product.price}</p>
                </div>
              </div>
            </zev-carousel-item>
          `
        )}
      </zev-carousel>
    </div>
  `,
};

export const Autoplay = {
  name: 'Com Autoplay',
  render: () => html`
    <zev-carousel autoplay autoplay-interval="3000" loop @carousel-change=${action('carousel-change')}>
      ${imageUrls.map(
        (url, i) => html`
          <zev-carousel-item>
            <div style="position: relative;">
              <img src=${url} alt="Slide ${i + 1}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px;" />
              <div style="position: absolute; bottom: 2rem; left: 2rem; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                <h3 style="margin: 0 0 0.5rem 0;">Banner ${i + 1}</h3>
                <p style="margin: 0;">Descrição do slide com autoplay de 3 segundos</p>
              </div>
            </div>
          </zev-carousel-item>
        `
      )}
    </zev-carousel>
    <p style="margin-top: 1rem; color: var(--zev-color-text-secondary); font-size: 0.875rem;">
      * O autoplay pausa automaticamente quando o mouse está sobre o carousel
    </p>
  `,
};

export const WithoutNavigation = {
  name: 'Sem Navegação',
  render: () => html`
    <zev-carousel hide-nav loop @carousel-change=${action('carousel-change')}>
      ${imageUrls.slice(0, 3).map(
        (url, i) => html`
          <zev-carousel-item>
            <img src=${url} alt="Slide ${i + 1}" style="width: 100%; height: 350px; object-fit: cover; border-radius: 12px;" />
          </zev-carousel-item>
        `
      )}
    </zev-carousel>
    <p style="margin-top: 1rem; color: var(--zev-color-text-secondary); font-size: 0.875rem;">
      * Navegue usando os indicadores ou arraste/swipe
    </p>
  `,
};

export const MinimalIndicators = {
  name: 'Apenas Indicadores',
  render: () => html`
    <zev-carousel hide-nav @carousel-change=${action('carousel-change')}>
      ${['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'].map(
        (color, i) => html`
          <zev-carousel-item>
            <div style="width: 100%; height: 300px; background: ${color}; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <h2 style="color: white; margin: 0;">Slide ${i + 1}</h2>
            </div>
          </zev-carousel-item>
        `
      )}
    </zev-carousel>
  `,
};

export const TestimonialCarousel = {
  name: 'Carousel de Depoimentos',
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto;">
      <zev-carousel loop @carousel-change=${action('carousel-change')}>
        ${[
          { name: 'João Silva', role: 'CEO, TechCorp', text: 'Excelente produto! Superou todas as expectativas e melhorou nossa produtividade.' },
          { name: 'Maria Santos', role: 'Designer, Criativa', text: 'A interface é intuitiva e os recursos são exatamente o que precisávamos.' },
          { name: 'Pedro Costa', role: 'Desenvolvedor, StartupX', text: 'A integração foi simples e o suporte técnico é excepcional.' },
        ].map(
          (testimonial) => html`
            <zev-carousel-item>
              <div style="text-align: center; padding: 3rem 2rem;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--zev-color-accent)" style="opacity: 0.3; margin-bottom: 1.5rem;">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p style="font-size: 1.25rem; color: var(--zev-color-text-primary); margin: 0 0 2rem 0; line-height: 1.6;">
                  "${testimonial.text}"
                </p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                  <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--zev-color-accent);"></div>
                  <div style="text-align: left;">
                    <p style="margin: 0; font-weight: bold; color: var(--zev-color-text-primary);">${testimonial.name}</p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--zev-color-text-secondary);">${testimonial.role}</p>
                  </div>
                </div>
              </div>
            </zev-carousel-item>
          `
        )}
      </zev-carousel>
    </div>
  `,
};
