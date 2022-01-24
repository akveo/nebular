# Atribuir várias roles a um usuário

Em um caso em que você tem requisitos um pouco mais complicados, quando um usuário tem mais de uma função, você pode configurar o serviço `NbRoleProvider` para retornar um array de funções de usuário.

<hr>

## Configurações de Roles

Na forma mais simples, você só precisa modificar o método `getRole` para retornar um array de roles:

```ts
// ...

import { of as observableOf } from 'rxjs/observable/of';
import { NbSecurityModule, NbRoleProvider } from '@beast/security';


@NgModule({
  imports: [
   // ...

   NbSecurityModule.forRoot({
    // ...
   }),

 ],
  providers: [
    // ...
    {
      provide: NbRoleProvider,
      useValue: {
        getRole: () => {
          // here we simply return a list of roles for current user
          return observableOf(['guest', 'user', 'editor']);
        },
      },
    },
  ],
```

Assim, uma vez que um usuário está acessando algum recurso, o método `isGranted` retorna `true` se pelo menos uma das roles pode acessar o recurso.
