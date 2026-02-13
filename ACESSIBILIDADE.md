# Auditoria de Acessibilidade — Zev Design System

Avaliacao baseada em WCAG 2.1 Level AA, revisando todos os 23 componentes em `packages/core/src/components/`.

---

## Resumo Geral

O DS tem acessibilidade **moderada**. Alguns componentes bons (pagination, progress-bar, skill-card), mas a maioria tem lacunas significativas. Os problemas mais graves sao: componentes interativos que nao funcionam via teclado e modais sem focus trap.

---

## Problemas Criticos (Prioridade 1)

### 1. Multi-Select — Nao e acessivel via teclado

O trigger do dropdown usa `<div>` em vez de `<button>`. Nao tem `role="combobox"`, nao tem `aria-expanded`, nao navega com Arrow keys, e as opcoes nao tem `role="option"`.

**O que falta:**
- Trocar `<div>` do trigger por `<button>` com `role="combobox"`
- Adicionar `aria-expanded`, `aria-haspopup="listbox"`, `aria-activedescendant`
- Navegacao por Arrow Up/Down nas opcoes
- Escape para fechar
- Focus trap dentro do dropdown aberto

### 2. Modais sem Focus Trap (modal + project-detail)

Ambos os modais tem `role="dialog"` e `aria-modal="true"` (bom), mas:
- **Nao prendem o foco** — Tab sai do modal para elementos atras do overlay
- **Nao movem foco** ao abrir (deveria ir pro primeiro elemento focavel)
- **Nao restauram foco** ao fechar (deveria voltar pro elemento que abriu)

### 3. Cards clicaveis sem suporte a teclado (job-card, project-card)

Ambos disparam evento `card-click` no `@click`, mas:
- Nao tem `tabindex="0"`
- Nao tem `role="button"` ou `role="link"`
- Nao tem handler de `@keydown` para Enter/Space
- Nao tem estilo de `:focus-visible`

### 4. File Upload — Dropzone inacessivel

A `<input type="file">` esta escondida. O dropzone e um `<div>` que so funciona com mouse:
- Nao tem `role="button"` nem `tabindex="0"`
- Drag and drop nao tem equivalente de teclado
- Erros de validacao nao sao anunciados (`aria-live`)

### 5. Loader — Invisivel para screen readers

O loader e um `<div>` puro sem nenhum atributo ARIA:
- Falta `role="status"` e `aria-label="Carregando"`
- Falta `aria-live="polite"` para anunciar mudanca de estado
- Screen reader nao sabe que conteudo esta carregando

### 6. Carousel — Autoplay sem botao de pausa

WCAG 2.2.2 exige que animacao automatica tenha mecanismo de pausa. O carousel tem autoplay mas nenhum botao de pausar. Alem disso:
- Nao tem `role="region"` com `aria-roledescription="carousel"`
- Slides nao tem `role="tabpanel"`
- Arrow keys nao navegam entre slides

---

## Problemas Altos (Prioridade 2)

### 7. Labels de formulario nao associados (input, select, multi-select)

Nenhum dos campos de formulario associa o `<label>` ao input via `for`/`id`:

```html
<!-- Atual -->
<label class="input__label">Nome</label>
<input class="input__field" />

<!-- Deveria ser -->
<label for="input-123" class="input__label">Nome</label>
<input id="input-123" class="input__field" />
```

Sem essa associacao, clicar no label nao foca o campo, e screen readers nao anunciam o label ao focar o input.

### 8. Validacao de formularios sem ARIA

Nenhum campo de formulario suporta:
- `aria-invalid="true"` quando ha erro
- `aria-describedby` apontando para mensagem de erro
- `aria-required="true"` para campos obrigatorios

### 9. Icones decorativos sem aria-hidden

A maioria dos SVGs inline nao tem `aria-hidden="true"`:
- Icone de upload no file-upload
- Chevrons no select e multi-select
- Icones de localizacao/empresa no job-card
- Icone do empty-state

Screen readers leem o SVG como conteudo, gerando ruido.

### 10. Focus indicators ausentes ou insuficientes

Poucos componentes tem estilo `:focus-visible`:
- **Tem:** button (outline 2px), tag (outline), skill-card (outline)
- **Nao tem:** input (so muda border-color), select, multi-select, job-card, project-card, navbar links, modal close, pagination, file-upload

WCAG 2.4.7 exige indicador de foco visivel em todos os elementos interativos.

### 11. Cores hardcoded violando tokens

Varios componentes tem cores literais em vez de tokens semanticos:

| Componente | Onde | Cor |
|---|---|---|
| button (outline-light) | border + color | `#fff` |
| badge (match levels) | background + color | `rgba(...)`, `#ef4444`, `#22c55e` etc. |
| skill-card (badges) | dark mode colors | `#93c5fd`, `#fde68a` etc. |
| tag (ghost) | background + color | `rgba(255,255,255,...)`, `#fff` |
| project-card | varios | `var(--zev-color-white)` |

---

## Problemas Medios (Prioridade 3)

### 12. Navbar — Menu mobile sem gerenciamento de foco

- Menu mobile abre mas foco nao move pra dentro
- Escape nao fecha o menu
- Nao tem focus trap no menu aberto
- Links nao indicam pagina ativa (`aria-current="page"`)
- Botao de idioma diz so "EN" — deveria ser "Mudar idioma para Ingles"

### 13. Pagination — Ellipsis nao acessivel

O `<span>...</span>` do ellipsis nao e anunciado. Deveria ter `aria-label="Mais paginas"` ou texto visualmente escondido.

### 14. Timeline — Sem semantica de lista

- Container deveria ter `role="list"` + `aria-label`
- Items deveriam ter `role="listitem"`
- Ano deveria usar `<time datetime="2024">`

### 15. Section Header — Heading level fixo

Sempre renderiza `<h2>`. Deveria aceitar prop `level` para `h1`-`h6`, pois dependendo do contexto da pagina, `<h2>` pode quebrar a hierarquia de headings.

### 16. Empty State — Sem anuncio dinamico

Quando aparece dinamicamente (ex: resultado de busca vazio), screen reader nao anuncia. Deveria ter `role="status"` ou `aria-live="polite"`.

### 17. Stat Card — Valor e label desconectados

Screen reader le "42" e depois "projetos" como elementos separados. Deveria ter `aria-label="${value} ${label}"` no container para ler como unidade.

### 18. Theme Toggle — Sem aria-pressed

Tem `aria-label` (bom), mas nao indica estado atual. Deveria ter `aria-pressed` ou label dinamico tipo "Tema escuro ativo, clique para mudar para claro".

### 19. Sticky Sidebar — Aside sem label

`<aside>` sem `aria-label` — screen readers anunciam como "complementary" sem contexto. SVG placeholder da imagem falta `aria-hidden="true"`.

### 20. Blog Card — Mesmos problemas do Job Card

Card clicavel sem teclado, icones sem `aria-hidden`, data sem `<time>`.

---

## O Que Ja Esta Bom

| Componente | Acerto |
|---|---|
| **pagination** | `<nav>` com `aria-label`, botoes com `aria-label`, `aria-current="page"` |
| **progress-bar** | `role="progressbar"`, `aria-valuenow/min/max`, `aria-label` |
| **skill-card** | `aria-expanded`, `aria-controls`, `<button>` semantico |
| **modal** | `role="dialog"`, `aria-modal`, `aria-labelledby`, Escape fecha |
| **theme-toggle** | `<button>`, `aria-label`, `aria-hidden` nos icones |
| **tag** | `role="button"` + `tabindex="0"` quando interativa, remove com `aria-label` |
| **button** | `<button>` semantico, `:focus-visible`, disabled nativo |
| **navbar** | `<nav>`, hamburger com `aria-label` + `aria-expanded` |

---

## Plano de Acao Sugerido

### Sprint 1 — Criticos
1. Implementar focus trap nos modais (modal + project-detail)
2. Tornar cards clicaveis acessiveis via teclado (job-card, project-card, blog-card)
3. Refatorar multi-select com roles ARIA corretos
4. Adicionar `role="status"` + `aria-label` ao loader
5. Adicionar `aria-hidden="true"` em todos os icones decorativos

### Sprint 2 — Formularios
6. Associar labels com inputs via `for`/`id` (input, select, multi-select)
7. Adicionar suporte a `aria-invalid` + `aria-describedby` nos campos
8. Tornar file-upload dropzone acessivel via teclado
9. Adicionar `:focus-visible` em todos os elementos interativos

### Sprint 3 — Widgets complexos
10. Implementar navegacao por teclado no multi-select (Arrow keys, Escape)
11. Adicionar botao de pausa no carousel
12. Implementar `role="region"` + `aria-roledescription` no carousel
13. Gerenciamento de foco no menu mobile da navbar

### Sprint 4 — Refinamento
14. Substituir cores hardcoded por tokens semanticos
15. Adicionar `aria-live` para conteudo dinamico (empty-state, loader)
16. Prop `level` no section-header para heading flexivel
17. Semantica de `<time>` na timeline
18. Testes automatizados de acessibilidade (axe-core no vitest)

---

## Checklist por Componente

Para cada componente, verificar:

- [ ] Navegavel por teclado (Tab, Enter, Space, Arrow, Escape)
- [ ] Screen reader anuncia todo conteudo relevante
- [ ] Focus indicator visivel (minimo 3:1 de contraste)
- [ ] Cor nao e o unico indicador de informacao
- [ ] Atributos ARIA corretos e atualizados
- [ ] Labels associados aos campos de formulario
- [ ] Mensagens de erro anunciadas
- [ ] Modais prendem e restauram foco
- [ ] Icones decorativos tem `aria-hidden="true"`
- [ ] Nenhuma cor hardcoded (usar tokens semanticos)

---

## Referencias

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Lit Accessibility Guide](https://lit.dev/docs/accessibility/overview/)
- [Inclusive Components](https://inclusive-components.design/)
