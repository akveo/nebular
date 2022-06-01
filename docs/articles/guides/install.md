# Instalar a biblioteca para o Angular

Esse tutorial explica como instalar os módulos do Beast nos projetos Angular.

<hr>

## Instalando as dependências

Nesta etapa, presumimos que você já tenha uma aplicação Angular criada.

### Pré-requisitos

Para seguir com esse guia, você precisa ter os seguintes pré-requisitos resolvidos:

1. Conta ativa na AWS, com permissões para AWS CLI e CodeArtifacts.
2. AWS CLI [baixada](https://aws.amazon.com/pt/cli/) e [configurada](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-chap-configure.html)

### Instalando módulos do Beast

```bash
npm install --save https://github.com/dadosfera/beast/releases/download/9.0.3/beast-theme-9.0.3.tgz @angular/cdk @angular/animations eva-icons https://github.com/dadosfera/beast/releases/download/9.0.3/beast-eva-icons-9.0.3.tgz
```

<hr>

## Configurar o Beast

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

<hr>

## Configurar fonte

Para habilitar a fonte `Quicksand`, você deve adicionar as seguintes linhas no seu `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

<hr>

## Configurar tema

Para seguir com a customização do tema, cheque o guia [aqui](docs/guias/temas-runtime--angular).
