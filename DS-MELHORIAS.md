# Melhorias para o Design System (zev)

Levantamento completo de bugs, workarounds e melhorias necessarias no `@malvezzidatr/zev-core` e `@malvezzidatr/zev-react`, identificados no projeto Hunt Jobs.

---

## Bugs

### 1. ZevFileUpload: nao substitui arquivo em modo single

**Severidade:** Alta
**Arquivo:** `zev-core/components/file-upload/zev-file-upload.js`

Quando `multiple=false` (padrao) e ja existe um arquivo selecionado, selecionar outro nao faz nada. O guard na linha do `_handleFiles` impede:

```js
// PROBLEMA: this._files.length ja e 1, entao 1 + 0 >= 1 = true → break
if (!this.multiple && this._files.length + validFiles.length >= 1) {
  break;
}
```

**Correcao:** Mudar o guard para verificar apenas `validFiles.length`:

```js
if (!this.multiple && validFiles.length >= 1) {
  break;
}
```

O trecho que substitui (linhas 84-89) ja esta correto — faz `this._files = validFiles` em modo single. O problema e so o guard que impede chegar ate la.

**Workaround atual no app:** Monkey-patch via callback ref que limpa `_files` antes de processar.

---

### 2. ZevThemeToggle: nao emite evento tipado no React wrapper

**Severidade:** Media
**Arquivo:** `zev-react/components/ZevThemeToggle.d.ts`

O componente emite `theme-change` com `{ theme: string }`, mas o wrapper React (`createComponent`) nao mapeia esse evento como prop tipada (`onThemeChange`). Resultado: o consumidor precisa adicionar listener manual no `document`:

```tsx
// Workaround atual
document.addEventListener('theme-change', handler)
```

**Correcao:** Adicionar o evento no `createComponent`:

```ts
export const ZevThemeToggle = createComponent({
  tagName: 'zev-theme-toggle',
  elementClass: ZevThemeToggleElement,
  react: React,
  events: {
    onThemeChange: 'theme-change', // ADICIONAR
  },
});
```

---

## Melhorias de API

### 3. ZevNavbar: prop para esconder lang toggle nao funciona via CSS part

**Severidade:** Baixa
**Arquivo:** `zev-core/components/navbar/zev-navbar.js`

Mesmo passando `showLangToggle={false}`, o botao de idioma ainda renderiza no DOM. O app precisa de CSS hack para esconder:

```css
zev-navbar::part(lang-toggle),
zev-navbar .navbar__lang-toggle {
  display: none !important;
}
```

**Correcao:** Respeitar a prop `showLangToggle` no `render()` e nao renderizar o botao quando `false`:

```js
${this.showLangToggle ? html`<button class="navbar__lang-toggle" ...>` : nothing}
```

---

### 4. ZevJobCard: hover transform nao pode ser desabilitado

**Severidade:** Baixa
**Arquivo:** `zev-core/components/job-card/zev-job-card.js`

Quando o card e envolvido em um wrapper com hover proprio (ex: para badge de favorito/novo), o hover do card interno duplica o efeito de elevacao. O app precisa forcar via CSS variable:

```css
.job-card-wrapper zev-job-card::part(card),
.job-card-wrapper zev-job-card {
  --zev-job-card-hover-transform: none;
}
```

**Sugestao:** Expor prop `disableHover` ou usar CSS custom property documentada.

---

### 5. ZevFileUpload: sem prop para controlar arquivos externamente

**Severidade:** Media
**Arquivo:** `zev-core/components/file-upload/zev-file-upload.js`

`_files` e `@state()` interno — nao ha como resetar o componente externamente (ex: limpar ao fechar modal, pre-popular). Isso impede cenarios como:

- Resetar quando modal fecha e reabre
- Mostrar arquivo ja selecionado anteriormente

**Sugestao:** Adicionar metodo publico `clearFiles()` ou prop reativa `files` que sincronize o estado.

---

### 6. ZevModal: conflito de body overflow com multiplos modais

**Severidade:** Baixa
**Arquivo:** `zev-core/components/modal/zev-modal.js`

Cada modal gerencia `document.body.style.overflow` independentemente. Se dois modais estiverem abertos, fechar um remove o overflow hidden do body mesmo com outro ainda aberto.

**Sugestao:** Usar contador global de modais abertos, ou apenas adicionar/remover classe CSS no body.

---

### 7. ZevLoader: sem modo skeleton nativo

**Severidade:** Baixa
**Arquivo:** `zev-core/components/loader/zev-loader.js`

O app usa `ZevLoader` extensivamente como skeleton loader, mas precisa de CSS externo para definir largura/altura de cada skeleton:

```css
.results-info-skeleton zev-loader { width: 200px; height: 20px; }
.skeleton-tags zev-loader { width: 60px; }
.stat-value-skeleton zev-loader { width: 60px; height: 2rem; }
```

**Sugestao:** Adicionar props `width` e `height` (ou variante `skeleton` com dimensoes customizaveis).

---

### 8. ZevSectionHeader: sem CSS variable documentada para tamanho

**Severidade:** Baixa
**Arquivo:** `zev-core/components/section-header/zev-section-header.js`

O app precisa sobrescrever o tamanho do titulo via CSS variable nao documentada:

```css
.header-container zev-section-header {
  --zev-section-header-title-size: 2rem;
}
```

**Sugestao:** Documentar as CSS variables disponiveis ou expor prop `titleSize`.

---

### 9. ZevSelect/ZevMultiSelect/ZevInput: sem width 100% por padrao

**Severidade:** Baixa

Os componentes nao ocupam largura total do container por padrao. O app precisa de fix global:

```css
.filters zev-multi-select,
.filters zev-select,
.filters zev-input {
  width: 100%;
  min-width: 0;
}
```

**Sugestao:** Adicionar `:host { display: block; width: 100%; }` nos estilos base desses componentes.

---

## Componentes que poderiam ser adicionados

### 10. ZevStatCard

O app constroi cards de estatistica manualmente com HTML+CSS:

```html
<div class="stat-item">
  <div class="stat-value">1.234</div>
  <div class="stat-label">Total de Vagas</div>
</div>
```

**Sugestao:** Componente `ZevStatCard` com props `value`, `label`, `variant`, `icon`.

### 11. ZevMatchBadge

O app constroi badges de compatibilidade manualmente:

```html
<span class="match-badge match-badge--high">85% Match</span>
```

**Sugestao:** Poderia ser um variante do `ZevBadge` existente ou componente novo.

---

## Resumo por prioridade

| # | Tipo | Componente | Prioridade |
|---|------|-----------|------------|
| 1 | Bug | ZevFileUpload (substituicao arquivo) | Alta |
| 2 | Bug | ZevThemeToggle (evento React) | Media |
| 5 | Melhoria | ZevFileUpload (controle externo) | Media |
| 3 | Melhoria | ZevNavbar (showLangToggle) | Baixa |
| 4 | Melhoria | ZevJobCard (hover disable) | Baixa |
| 6 | Melhoria | ZevModal (body overflow) | Baixa |
| 7 | Melhoria | ZevLoader (skeleton mode) | Baixa |
| 8 | Melhoria | ZevSectionHeader (CSS vars) | Baixa |
| 9 | Melhoria | Inputs (width 100%) | Baixa |
| 10 | Novo | ZevStatCard | Baixa |
| 11 | Novo | ZevMatchBadge | Baixa |
