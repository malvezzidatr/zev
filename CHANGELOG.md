# Changelog

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.7.0] - 2025-01-30

### Added

#### @malvezzidatr/zev-core

- **zev-carousel**: Carousel/slider para conteúdo em slides navegáveis
  - Props: `slides-per-view` (1-5), `gap` (none/sm/md/lg), `loop`, `autoplay`, `autoplay-interval`, `hide-nav`, `hide-indicators`, `pause-on-hover`
  - Evento: `carousel-change` com `{ index, previousIndex }`
  - Navegação via botões anterior/próximo
  - Indicadores (dots) clicáveis
  - Suporte a múltiplos slides por view
  - Loop infinito opcional
  - Autoplay com pause on hover
  - Drag/swipe para navegação
  - Responsivo (mobile mostra 1 slide)

- **zev-carousel-item**: Item wrapper para slides do carousel

#### @malvezzidatr/zev-react

- `ZevCarousel` wrapper com evento `onCarouselChange`
- `ZevCarouselItem` wrapper
- Export do tipo: `CarouselGap`

#### Storybook

- Story `Carousel` com 8 variantes (Default, Carousel de Imagens, Carousel de Cards, Carousel de Produtos, Com Autoplay, Sem Navegação, Apenas Indicadores, Carousel de Depoimentos)

### Tests

- 17 testes unitários para `zev-carousel` e `zev-carousel-item`
- Total: 348 testes passando

---

## [0.6.0] - 2025-01-29

### Added

#### @malvezzidatr/zev-core

- **zev-modal**: Modal genérico com overlay e animações
  - Tamanhos: `sm`, `md`, `lg`, `xl`, `full`
  - Props: `open`, `title`, `size`, `hideClose`, `closeOnOverlay`, `closeOnEscape`
  - Eventos: `modal-open`, `modal-close`
  - Fecha via ESC, click no overlay ou botão X
  - Bloqueia scroll do body quando aberto
  - Slots para content e footer

- **zev-file-upload**: Upload de arquivos com drag & drop
  - Props: `label`, `accept`, `maxSize`, `maxFiles`, `multiple`, `disabled`, `hint`, `error`
  - Eventos: `file-select`, `file-remove`, `file-error`
  - Validação de tipo e tamanho de arquivo
  - Lista de arquivos selecionados com remoção
  - Estados visuais para drag, error e disabled

- **zev-progress-bar**: Barra de progresso com múltiplas variantes
  - Variantes: `primary`, `success`, `warning`, `error`, `info`
  - Tamanhos: `sm`, `md`, `lg`
  - Props: `value`, `max`, `label`, `showValue`, `indeterminate`, `striped`, `animated`
  - Modo indeterminado para progresso desconhecido
  - Efeito listrado com animação opcional

#### @malvezzidatr/zev-react

- `ZevModal` wrapper com eventos `onModalOpen` e `onModalClose`
- `ZevFileUpload` wrapper com eventos `onFileSelect`, `onFileRemove` e `onFileError`
- `ZevProgressBar` wrapper
- Export dos tipos: `ModalSize`, `UploadedFile`, `ProgressBarVariant`, `ProgressBarSize`

#### Storybook

- Story `Modal` com 6 variantes (Default, Com Footer, Tamanhos, Sem Botão Fechar, Sem Fechar no Overlay, Exemplo com Formulário)
- Story `FileUpload` com 8 variantes (Default, Upload de Imagens, Upload de Documentos, Múltiplos Arquivos, Com Erro, Desabilitado, Tamanho Máximo Pequeno, Exemplo em Formulário)
- Story `ProgressBar` com 8 variantes (Default, Com Label e Valor, Variantes, Tamanhos, Indeterminado, Listrado, Exemplo de Upload, Exemplo de Etapas)

### Tests

- 14 testes unitários para `zev-modal`
- 18 testes unitários para `zev-file-upload`
- 15 testes unitários para `zev-progress-bar`
- Total: 331 testes passando

---

## [0.5.0] - 2025-01-29

### Added

#### @malvezzidatr/zev-core

- **zev-multi-select**: Novo componente de select com seleção múltipla
  - Usa `zev-tag` para exibir itens selecionados
  - Campo de busca opcional para filtrar opções
  - Limite configurável de tags visíveis (`maxDisplayTags`) com indicador "+N"
  - Props: `label`, `placeholder`, `searchPlaceholder`, `options`, `value`, `disabled`, `searchable`, `maxDisplayTags`
  - Eventos: `multi-select-change`, `multi-select-search`
  - Suporte completo a dark mode

- **zev-input**: Novas funcionalidades
  - Prop `label` para exibir label acima do input
  - Botão de limpar (X) aparece automaticamente quando há texto
  - Evento `input-clear` emitido ao limpar

- **zev-select**: Novas funcionalidades
  - Prop `label` para exibir label acima do select

- **zev-navbar**: Novas funcionalidades
  - Prop `showLangToggle` (padrão: `true`) para controlar visibilidade do botão de idioma
  - Atributo HTML: `show-lang-toggle`

#### @malvezzidatr/zev-react

- `ZevMultiSelect` wrapper com eventos `onMultiSelectChange` e `onMultiSelectSearch`
- Export do tipo `MultiSelectOption`

#### Storybook

- Story `MultiSelect` com 7 variantes (Default, Com Valores Selecionados, Com Muitos Selecionados, Sem Busca, Desabilitado, Tecnologias, Filtros de Vagas)
- Stories atualizadas para `Input` com label e botão de limpar
- Stories atualizadas para `Select` com label
- Story `Navbar` com variante "Sem Toggle de Idioma"

### Fixed

#### @malvezzidatr/zev-core

- **zev-job-card**: Cards agora mantêm altura uniforme em grids
  - `:host` com `height: 100%` para preencher célula do grid
  - `.job-card` com `height: 100%` e `min-height: 220px`
  - `.job-card__tags` com `flex: 1` para ocupar espaço disponível
  - Seção de tags sempre renderizada para layout consistente

### Tests

- 19 testes unitários para `zev-multi-select`
- 2 novos testes para `zev-navbar` (showLangToggle)
- Testes atualizados para `zev-input` e `zev-select`
- Total: 284 testes passando

---

## [0.4.0] - 2025-01-28

### Added

#### @malvezzidatr/zev-core

- **zev-badge**: Componente de badge para status e labels
  - Variantes: `default`, `success`, `warning`, `info`, `neutral`
  - Suporte a dark mode

- **zev-loader**: Componente de loading spinner
  - Tamanhos: `small`, `medium`, `large`
  - Animação de rotação suave

- **zev-button**: Componente de botão reutilizável
  - Variantes: `primary`, `secondary`, `outline`, `ghost`
  - Tamanhos: `small`, `medium`, `large`
  - Estados: `disabled`, `loading`
  - Evento `button-click`

- **zev-input**: Componente de input de texto
  - Ícones opcionais (left/right)
  - Placeholder customizável
  - Estado disabled
  - Evento `input-change`

- **zev-select**: Componente de select dropdown
  - Recebe array de opções via prop
  - Placeholder customizável
  - Estado disabled
  - Evento `select-change`

- **zev-empty-state**: Componente para estados vazios
  - Ícone, título e descrição customizáveis
  - Slot para ações

- **zev-pagination**: Componente de paginação
  - Props: `currentPage`, `totalPages`, `visiblePages`
  - Navegação por página, anterior/próximo
  - Evento `page-change`

- **zev-job-card**: Card para listagem de vagas
  - Props: `title`, `company`, `location`, `tags`, `salary`, `remote`, `postedAt`, `url`, `source`
  - Badge de remoto
  - Tags de tecnologia
  - Evento `card-click`

- **zev-sticky-sidebar**: Sidebar com posição sticky
  - Props: `image`, `title`, `description`, `variant`, `sticky`
  - Variantes de cor: `primary`, `success`, `warning`, `info`, `neutral`
  - Placeholder de imagem quando não fornecida

#### @malvezzidatr/zev-react

- Wrappers React para todos os novos componentes
- Export dos tipos: `BadgeVariant`, `LoaderSize`, `ButtonVariant`, `ButtonSize`, `InputIcon`, `SelectOption`, `SidebarVariant`

#### Storybook

- Stories para todos os 8 novos componentes
- Documentação completa com JSDoc

---

## [0.3.0] - 2025-01-27

### Added

#### @zev/core

- **zev-tag**: Componente de tag reutilizável para labels, skills, categorias e tech stacks
  - Variantes: `default`, `accent`, `outline`, `ghost`
  - Tamanhos: `small`, `medium`, `large`
  - Modo interativo com hover effects e evento `tag-click`
  - Botão de remoção opcional com evento `tag-remove`
  - Suporta conteúdo via slot ou prop `label`

- **zev-section-header**: Header de seção reutilizável com tag numerada e título
  - Tag opcional no formato `[0X]`
  - Variantes de layout: `inline`, `stacked`, `centered`
  - Tamanhos: `small`, `medium`, `large`
  - Suporta título via slot ou prop `title`

- **zev-timeline**: Container para exibir histórico, experiência ou eventos cronológicos
  - Recebe items via prop `items` ou via slot
  - Modo `connected` adiciona linha vertical conectando os items
  - Propaga `connected` automaticamente para filhos slotted

- **zev-timeline-item**: Item individual de timeline
  - Props: `year`, `title`, `description`
  - Modo `connected` para linha conectora
  - Slots para título e descrição customizados

#### @zev/react

- `ZevTag` wrapper com eventos `onTagClick` e `onTagRemove`
- `ZevSectionHeader` wrapper
- `ZevTimeline` wrapper
- `ZevTimelineItem` wrapper
- Export dos tipos `TagVariant`, `TagSize`, `SectionHeaderVariant`, `SectionHeaderSize`, `TimelineItemData`

#### Storybook

- Story `Tag` com 8 variantes (Default, Variantes, Tamanhos, Interativa, Removível, Lista de Skills, Tech Stack em Card, Tags Accent)
- Story `SectionHeader` com 6 variantes (Default, Variantes de Layout, Tamanhos, Sem Tag, Em Contexto, Em Fundo Escuro)
- Story `Timeline` com 7 variantes (Default, Connected, Slotted Items, Item Individual, Em Seção About, Timeline de Educação, Conteúdo Customizado)

### Tests

- 21 testes unitários para `zev-tag`
- 13 testes unitários para `zev-section-header`
- 12 testes unitários para `zev-timeline-item`
- 10 testes unitários para `zev-timeline`

---

## [0.2.1] - 2025-01-24

### Fixed

#### @zev/core
- **zev-project-card**: Cards agora mantêm altura uniforme independente do tamanho do conteúdo
  - `:host` com `height: 100%` para preencher a célula do grid
  - `.card` com `display: flex; flex-direction: column; height: 100%`
  - `.card__description` com `flex: 1` empurra tags para o rodapé
  - Todos os cards na mesma row de grid ficam alinhados

---

## [0.2.0] - 2025-01-24

### Added

#### @zev/tokens
- Tokens semânticos de cor para suporte a dark mode:
  - `--zev-color-bg-primary`, `--zev-color-bg-secondary`, `--zev-color-bg-inverse`
  - `--zev-color-text-primary`, `--zev-color-text-secondary`, `--zev-color-text-inverse`
  - `--zev-color-accent`
- Tokens derivados com variantes light/dark:
  - `--zev-color-card-default`, `--zev-color-card-hover`
  - `--zev-color-navbar-bg`, `--zev-color-modal-overlay`
  - `--zev-color-border-tag`
  - `--zev-color-text-modal-content`, `--zev-color-text-modal-secondary`
- Dark mode automático via `@media (prefers-color-scheme: dark)`
- Override manual via atributo `[data-theme="dark"]` e `[data-theme="light"]`
- Exports TypeScript: `colorsSemantic`, `colorsDerived`, tipos `ColorSemanticToken`, `ColorDerivedToken`, `ColorScheme`

#### @zev/core
- **zev-theme-toggle**: Novo componente botão de alternância light/dark
  - Ícone de lua (light) e sol (dark)
  - Altera `data-theme` no `<html>` automaticamente
  - Detecta tema inicial via `prefers-color-scheme` ou `data-theme` existente
  - Emite evento `theme-change` com `{ theme: 'light' | 'dark' }`
  - Botão circular com hover accent

#### @zev/react
- `ZevThemeToggle` wrapper com evento `onThemeChange`
- Export do tipo `ThemeMode`

#### Storybook
- Toggle de tema no toolbar (Light / Dark / System)
- Decorator global para aplicar `data-theme` no preview
- Story `ThemeToggle` com variantes Default, Dark Mode e Dentro da Navbar

### Changed

#### @zev/core
- Todos os componentes migrados de tokens literais para tokens semânticos:
  - `--zev-color-black` → `--zev-color-text-primary`
  - `--zev-color-white` → `--zev-color-bg-primary` / `--zev-color-text-inverse`
  - `--zev-color-blue` → `--zev-color-accent`
  - `--zev-color-gray` → `--zev-color-bg-secondary`
  - `--zev-color-gray-dark` → `--zev-color-text-secondary`
- **zev-navbar**: Fundo e textos adaptam ao tema
- **zev-hero**: Background, nome, labels e CTA adaptam ao tema
- **zev-about**: Background, bio, skills e timeline adaptam ao tema
- **zev-project-detail**: Modal content, close button, tags adaptam ao tema
- **zev-call-to-action**: Background, heading, botão adaptam ao tema
- **zev-footer**: Cores de fundo e links adaptam ao tema
- **shared-styles**: `.section__tag` usa `--zev-color-accent` em vez de `--zev-color-blue`

---

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
