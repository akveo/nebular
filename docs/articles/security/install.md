# Instalação

Primeiro, vamos instalar o módulo. O módulo de segurança não depende do módulo `Theme`, mas é recomendável usá-los em conjunto.

```bash
npm i @beast/security
```

<hr>

## Importar o módulo:

```ts
import { NbSecurityModule } from '@beast/security';
```

<hr>

## Registrar o módulo

Agora, vamos registrar o módulo:

```ts
@NgModule({
  imports: [
   // ...

   NbSecurityModule.forRoot(),
```
