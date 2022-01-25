# Habilitar múltiplos temas em runtime

Este modo é útil quando você precisa ter vários temas e quer alterá-los em tempo de execução.

<hr>

# Habilitar múltiplos temas em runtime

Os estilos do Beast vêm em um arquivo css por padrão. Para poder personalizar as variáveis do tema, os arquivos scss devem estar habilitados.

## Importanto um tema

Crie um `themes.scss` em sua pasta `src` e importe um tema de sua escolha:

```scss
// import Nebular Theme System and the default theme
@forward '@beast/theme/styles/theming';
@use '@beast/theme/styles/theming' as *;
@use '@beast/theme/styles/themes/default';
```

## Modificando as variáveis do tema

Para ajustar algumas das variáveis do tema, precisamos registrar nossas alterações usando a função `nb-register-theme`.

```scss
@forward '@beast/theme/styles/theming';
@use '@beast/theme/styles/theming' as *;
@use '@beast/theme/styles/themes/default';

$nb-themes: nb-register-theme(
  (
    // we setting color-basic-800 instead of color-basic-1000
    text-basic-color: color-basic-800,
    // and color-basic-600 as instead of color-basic-500
    text-disabled-color: color-basic-600
  ),
  default,
  default
);
```

## Habilitar Beast Styles

A última coisa, encontre seu `styles.scss` (ou crie um e adicione-o em `angular.json` em `"styles": [..]`) em sua aplicação e cole o seguinte:

```scss
// this is our just created themes.scss file, make sure the path to the file is correct
@use 'themes' as *;

// framework component styles
@use '@beast/theme/styles/globals' as *;

// install the framework styles
@include nb-install() {
  @include nb-theme-global();
}
```

<hr>

## Habilitando um segundo tema

Supondo que você já tenha o arquivo `themes.scss` com o tema `default` habilitado, vamos adicionar um segundo tema:

```scss
@forward '@beast/theme/styles/theming';
@use '@beast/theme/styles/theming' as *;
@use '@beast/theme/styles/themes/default';
@use '@beast/theme/styles/themes/dark';

$nb-themes: nb-register-theme(
  (
    // some styles we changed
    text-basic-color: color-basic-800,
    text-disabled-color: color-basic-600
  ),
  default,
  default
);

$nb-themes: nb-register-theme(
  (
    // some styles we changed
    text-basic-color: color-basic-800,
    text-disabled-color: color-basic-600
  ),
  dark,
  dark
);
```

Agora você tem dois temas registrados.

<hr>

## Artigos relacionados

- [Trocar o tema em runtime](docs/guias/trocar-tema--angular)
