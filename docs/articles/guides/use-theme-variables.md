# Usar variáveis do tema

Caso você precise acessar variáveis de tema do seu componente de aplicação, o Beast fornece uma função sass simples chamada `nb-theme`.

<hr>

## Importar tema

No arquivo `*.component.scss` adicione uma importação de `themes.scss`
(criado em [Temas runtime](docs/guias/temas-runtime--angular)):

```scss
@use '../../../themes' as *;
```

<hr>

## Acessando a variável

Agora podemos simplesmente chamar `nb-theme(variable-name)` para acessar uma variável:

```scss
@use '../../../themes' as *;

:host {
  background: nb-theme(background-basic-color-1);
}
```

A lista completa de variáveis pode ser encontrada na tabela [Tema Padrão](docs/design-system/default-theme).

<hr>

## Acesso com o modo de múltiplos temas

Em um caso em que você tenha múltiplos temas em runtime (default e dark, por exemplo), você precisa adicionar seus estilos de componentes
usando o mixin `nb-install-component` assim:

```scss
@use '../../../themes' as *;

@include nb-install-component {
  background: nb-theme(background-basic-color-1);
}
```
