# Instalar a biblioteca para o Angular

Esse tutorial explica como instalar os módulos do Beast nos projetos Angular.

<hr>

## Instalando as dependências

Nesta etapa, presumimos que você já tenha uma aplicação Angular criada.

### Pré-requisitos

Para seguir com esse guia, você precisa ter os seguintes pré-requisitos resolvidos:

1. Conta ativa na AWS, com permissões para AWS CLI e CodeArtifacts.
2. AWS CLI [baixada](https://aws.amazon.com/pt/cli/) e [configurada](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-chap-configure.html)

### Login na AWS CLI

Adicione o seguinte script em seu `package.json`:

```json
{
  "scripts": {
    "co:login": "aws codeartifact login --tool npm --repository beast --domain dadosfera"
  }
}
```

Com o AWS CLI configurado e script adicionado, execute o seguinte comando:

```bash
npm run co:login
```

### Instalando módulos do Beast

```bash
npm install --save @beast/theme @angular/cdk @angular/animations eva-icons @beast/eva-icons
```

Além disso, você pode instalar o módulo de segurança/ACL: `npm install --save @beast/security`

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

Para configurar a fonte, você deve adicionar a seguinte linha no seu `index.html`:

```html
<link rel="stylesheet" href="https://use.typekit.net/qks0jns.css" />
```

<hr>

## Configurar tema

Para seguir com a customização do tema, cheque o guia [aqui](docs/guias/temas-runtime--angular).
