# Tipografia

A tipografia é a base para o tom, a voz e o conteúdo. Ela maximiza a legibilidade e comunica conceitos com clareza.

<hr>

## Font Family

Nosso design possui duas propriedades de família de fontes:

- **font-family-primary** - utilizado por todos os elementos de texto na página
- **font-family-secondary** - utilizado por elementos de cabeçalho (`<h1>`, `<h2>`, etc)

Atualmente, tanto `font-family-primary` quanto `font-family-secondary` usam a família de fonte **Quicksand**.

<hr>

## Cores das fontes

Existem 5 cores de texto disponíveis no Design System:

- **text-basic-color** - cor do texto principal, deve ser usada em cima de fundos básicos, geralmente cartões, barras laterais, cabeçalhos, disponíveis como classe CSS `.text-basic`
- **text-alternate-color** - cor alternativa usada em cima de fundos alternativos - cabeçalhos coloridos, barras laterais, disponíveis como classe CSS `.text-alternate`
- **text-control-color** - devemos usar como cor de texto para fundos de status (`sucesso`, `primário`, etc) - geralmente botões, seleções, disponíveis como classe CSS `.text-control`
- **text-disabled-color** - indica o estado desabilitado do texto, disponível como classe CSS `.text-disabled`
- **text-hint-color** - usado por textos secundários - legendas, espaços reservados, rótulos, disponíveis como classe CSS `.text-hint`

<hr>

## Estilos de texto

A tipografia consiste em 14 estilos de texto, onde os estilos de texto são uma combinação das propriedades `font-size`, `font-weight`, `line-height` e `font-family`:

- **6 heading** estilos, usados pelos elementos `<h1>`-`<h6>`, também disponíveis como classes CSS `.h1`, `.h2` ... `.h6`
- **2 subtitle** estilos, usado como texto para a maioria dos controles (entradas, menus, etc) com classes `.subtitle`, `.subtitle-2`
- **2 paragraph** estilos para texto regular e elemento `<p>`, com classes `.paragraph`, `.paragraph-2`
- **2 caption** estilos para texto menor, como dicas de ferramentas e legendas de entrada, com classes `.caption`, `.caption-2`
- **label** style, usado pelo elemento `<label>` como disponível como classe CSS `.label`
- **button** estilo de texto, usado pelo elemento `<button>`
<hr>

## Aplicar classes e propriedades de estilos de texto

Todos os estilos de texto podem ser aplicados simplesmente adicionando classes CSS a um elemento:

```html
<input type="email" name="email" /> <span class="caption-2 text-hint">Work email address</span>
```

Aqui nós adicionamos `caption-2` e `text-hint` fazendo com que o `span` seja uma legenda com uma cor de texto padrão.

Cores e fontes também estão disponíveis como propriedades de tema usando a função SCSS `nb-theme()`:

```scss
.my-text {
  font-family: nb-theme(font-family-primary);
  color: nb-theme(text-basic-color);
}
```
