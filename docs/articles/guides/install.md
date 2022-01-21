# Instalar a biblioteca para o Angular

Esse tutorial explica como instalar os módulos do Beast nos projetos Angular.

## Manualmente

### Instalando as dependências

Nesta etapa, presumimos que você já tenha uma aplicação Angular criada.

### Instalando módulos do Beast

```bash
npm install --save @beast/theme @angular/cdk @angular/animations eva-icons @beast/eva-icons
```

Além disso, você pode instalar o módulo de segurança: `npm install --save @beast/security`

### Configurar o Beast

Vamos configurar o Beast no módulo do app:

```ts

import { NbThemeModule } from '@beast/theme';

...

@NgModule({
  imports: [
    ...
    // this will enable the default theme, you can change this by passing `{ name: 'dark' }` to enable the dark theme
    NbThemeModule.forRoot(),
  ]
})
export class AppModule {

```

### Configurar tema

Para seguir com a customização do tema, cheque o guia [aqui](docs/guias/temas-runtime--angular).

<hr>

## Usando a CLI do Angular

### Instalação

Para instalar a CLI do Angular use o seguinte comando:

```bash
npm install -g @angular/cli
```

### Instalando o Beast

Basta usar o seguinte comando dentro da sua aplicação Angular:

```bash
ng add @beast/theme
```
