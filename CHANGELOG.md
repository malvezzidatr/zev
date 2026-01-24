# Changelog

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2025-01-24

Versão inicial do design system Zev.

### Added

#### Infraestrutura
- Monorepo com Turborepo + npm workspaces
- TypeScript com `experimentalDecorators` para Lit
- Build pipeline via `tsc` (sem bundler)
- Storybook 8 com `@storybook/web-components-vite`
- Addon de acessibilidade (`@storybook/addon-a11y`)

#### @zev/tokens
- Design tokens como CSS custom properties com prefixo `--zev-`
- Cores: white, black, blue, gray, gray-dark + derivadas (translúcidas)
- Tipografia: font-family (Inter), sizes (display a nav), weights (400/700/900)
- Letter-spacing: tight, tighter, wide, wider
- Line-height: display, heading, body, body-relaxed
- Espaçamento: section, container, gaps
- Transição base: `0.3s ease`
- Z-index: navbar (1000), modal (2000)
- Breakpoint mobile: 768px
- Exports TypeScript com tipos para cada categoria de token

#### @zev/core
- Base class `ZevBase` com helper `emitEvent()` (bubbles + composed)
- Shared styles: box-sizing reset, font-family inheritance
- Section styles: padding, container, header com tag + título

##### Componentes
- **zev-navbar**: Fixa com blur, logo, lang toggle, links com underline animado, hamburger menu (mobile slide-in)
- **zev-hero**: Full-height, nome display (clamp 3rem-12rem), CTA com arrow animado, scroll indicator bounce
- **zev-about**: Background cinza, grid 2col (bio+skills | timeline), skill tags com hover azul, timeline com dots
- **zev-project-card**: Card translúcido para fundo azul, hover translateY(-4px), role badge, tech tags
- **zev-project-detail**: Modal com overlay fadeIn, content slideUp, fecha via ESC/click-outside/botão-X, body lock, highlights com bullets quadrados, mobile alinhado ao fundo
- **zev-call-to-action**: Section header com tag, heading, descrição, botão preto→azul no hover
- **zev-footer**: Background preto, grid 2col (links | info), links com hover azul, nome decorativo opacity 0.05, borda sutil

#### @zev/react
- Wrappers React via `@lit/react` `createComponent` para todos os 7 componentes
- Eventos tipados com `EventName<CustomEvent<T>>`
- Compatível com React 18 e 19
- Re-export de todos os tipos do core (NavLink, TimelineItem, ProjectData, FooterLink, FooterInfo)

#### Storybook
- Stories para todos os 7 componentes
- Documentação via JSDoc (autodocs)
- Controls com argTypes tipados para cada propriedade
- Actions logando todos os custom events
- Variantes: Default, traduções (PT/EN), edge cases (muitas tags, sem CTA, modal fechado)
- Decorators contextuais (fundo azul para ProjectCard)
