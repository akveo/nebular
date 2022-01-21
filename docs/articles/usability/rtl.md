# RTL

Todos os componentes Beast suportam RTL por padrão.

Os componentes que aceitam uma posição como configuração, também suportam valores iniciais e finais lógicos, semelhantes ao flexbox. O valor de início e fim depende da direção do layout atual. Para LTR é esquerda e para RTL, direita. Por exemplo, se precisarmos que a barra lateral seja posicionada logicamente dependendo da direção do idioma, em vez de defini-la para a esquerda, podemos definir sua posição para iniciar:

```html
<nb-sidebar start></nb-sidebar>
```

A direção do documento pode ser definida através do `NbThemeModule.forRoot`. Os valores suportados são `ltr` e `rtl`.

```typescript
@NgModule({
  imports: [
    NbThemeModule.forRoot(nbThemeOptions, nbJSThemes, nbMediaBreakpoints, 'rtl')
  ]
})
```

O valor padrão é `ltr`.

<div class="note note-info">
  <div class="note-title">Nota</div>
  <div class="note-body">
    Os componentes devem ser colocados dentro do componente `nb-layout` para suportar corretamente a direção do idioma.
  </div>
</div>

Para ajudá-lo a adicionar suporte RTL aos seus componentes personalizados, o Beast fornece dois mixins scss: `nb-lrt` e `nb-rtl`. Você pode usá-los para alterar valores de propriedades CSS que não suportam valores lógicos, como preenchimentos, margens, etc. Você pode passar uma única propriedade e valor como argumentos, passar várias instruções como conteúdo de mixin ou ambos. Por exemplo:

```scss
:host {
  @include nb-ltr(padding-left, 1em);
  @include nb-rtl(padding-right, 1em);
}
```

```scss
:host {
  @include nb-ltr() {
    padding-left: 1em;
  }
  @include nb-rtl() {
    padding-right: 1em;
  }
}
```

Observe que os mixins estão disponíveis apenas no seletor do componente `:host` ou no mixin `nb-install-component()`, se usado.

Se você precisar mudar a direção dinamicamente, obter o valor atual ou ouvir as mudanças de direção, o Beast fornece `NbLayoutDirectionService`.

# Diretivas de direção de layout

O Beast também fornece diretivas `nbLtr` e `nbRlt` para mostrar o conteúdo baseado na direção atual.
Por exemplo, você pode aplicar a diretiva `nbRtl` ao elemento que você precisa mostrar apenas quando a direção do layout for da direita para a esquerda:

```html
<div *nbRtl>Este texto é visível apenas quando a direção do layout é RTL</div>
```
