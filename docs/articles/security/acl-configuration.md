# ACL

O controle de permissões é uma tarefa geral quando se trata de desenvolvimento de aplicações web mais ou menos complexas. Seu aplicativo pode ter várias funções e recursos que você precisa proteger.
ACL (lista de controle de acesso) fornece uma maneira flexível de configurar "quem pode fazer o quê em relação a qual recurso".

Neste artigo, configuramos um setep comum quando a aplicação tem três papéis (`guest`, `user` e `moderator`), os papéis têm permissões diferentes (`view`, `create`, `remove`)
e a aplicação contém dois tipos de recursos que precisam ser protegidos (`news`, `comments`).

<hr>

## Configuração de ACL

Nebular ACL tem uma maneira simples de configurá-lo. Ao registrar um módulo, você pode especificar um conjunto de regras de ACL simplesmente fornecendo-o como uma configuração.

Vamos supor que nossos usuários convidados podem apenas `view` `news` e `comments`, os usuários podem fazer tudo como convidados, mas também podem acessar `create`, `comments`, e os moderadores também podem `create`, `remove`, `news` e `comments`.
Agora, vamos converter isso em um objeto de configuração ACL que o Beast possa entender. Abra o `app.module.ts` e altere a chamada `NbSecurityModule.forRoot()` da seguinte forma:

```ts
@NgModule({
  imports: [
   // ...
   NbSecurityModule.forRoot({
     accessControl: {
       guest: {
         view: ['news', 'comments'],
       },
       user: {
         parent: 'guest',
         create: 'comments',
       },
       moderator: {
         parent: 'user',
         create: 'news',
         remove: '*',
       },
     },
   }),
 ],

```

Como você pode ver, a configuração é bastante simples, cada função pode ter uma lista de permissões (read, create, remove) e recursos permitidos para essas permissões. Também podemos especificar um recurso `*`,o que significa que temos permissão contra qualquer recurso (como moderadores podem remover notícias e comentários).

<hr>

## Configuração de Papéis (roles)

Até agora, dissemos à Beast Security quais funções-permissões-recursos nossa aplicação possui. Agora precisamos especificar como o Beast pode determinar a função do usuário atualmente autenticado.
Para fazer isso, precisamos criar um `RoleProvider` com um método simples `getRole`, que retorna um `Observable<string>` de uma role.
Na forma mais simples podemos fornecer este serviço diretamente no módulo principal:

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
          return observableOf('guest');
        },
      },
    },
  ],
```

Acabamos de fornecer uma função para que o Beast possa determinar qual usuário está acessando a aplicação no momento.
O bom dessa configuração é que ela não é totalmente acoplada ao restante do fluxo de autenticação, o que oferece flexibilidade.

<hr>

## Role Provider

Mas, em nosso exemplo, a role é "hardcoded", o que, no mundo real, seria dinâmico e dependeria do usuário atual.

Vamos criar um serviço `role.provider.ts` separado para não colocar muita lógica no próprio módulo:

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { AuthService, JWTToken } from 'src/app/auth/services/auth';
import { NbRoleProvider } from '@beast/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {
  constructor(private authService: AuthService) {}

  getRole(): Observable<string> {
    // ...
  }
}
```

Agora, vamos completar o método `getRole` para extrair a role do token:

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { AuthService, JWTToken } from 'src/app/auth/services/auth';
import { NbRoleProvider } from '@beast/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {
  constructor(private authService: AuthService) {}

  getRole(): Observable<string> {
    return this.authService.onTokenChange().pipe(
      map((token: JWTToken) => {
        return token.isValid() ? token.getPayload()['role'] : 'guest';
      }),
    );
  }
}
```

Portanto, assinamos o observável `tokenChange`, que produzirá um novo token cada vez que ocorrer uma alteração de autenticação.
Em seguida, simplesmente obtemos uma função de um token (assumimos que a carga útil do token sempre tem um valor de função) ou retornamos o valor `guest` padrão.

E vamos fornecer o serviço no módulo app:

```typescript
// ...

import { RoleProvider } from './role.provider';
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
    { provide: NbRoleProvider, useClass: RoleProvider }, // provide the class
  ],
```

<hr>

## Uso

Finalmente, podemos passar para a parte em que começamos a colocar as regras de segurança em nossa aplicação. Vamos supor que temos aquele botão `Post Comment`, que deve ser mostrado apenas para usuários autenticados (com um papel `user`).
Portanto, precisamos ocultar o botão para os convidados.

O Beast Security nos fornece uma diretiva condicional `*nbIsGranted` simples, que sob o capô funciona como `*ngIf`, mostrando ou ocultando um bloco de modelo baseado em uma função de usuário:

```typescript
@Component({
  // ...
  template: `
      <button *nbIsGranted="['create', 'comments']">Post Comment</button>
    `,
})
export class CommentFormComponent {
// ...
```

Só precisamos passar uma `permission` e algum `resource` para controlar a visibilidade do botão.

Para casos de uso mais avançados, podemos usar diretamente o serviço `NbAccessChecker`. Ele fornece o método `isGranted`, que retorna um `Observable<boolean>` do resultado da verificação da ACL.
Podemos ajustar nosso exemplo para utilizá-lo. Em seu `comment-form.component.ts`, importe o serviço `NbAccessChecker`.

```typescript
import { Component } from '@angular/core';
import { NbAccessChecker } from '@beast/security';

@Component({
  // ...
})
export class CommentFormComponent {
  constructor(public accessChecker: NbAccessChecker) {}
}
```

E vamos adicionar uma instrução `if` ao botão `Post Comment` para que ele seja mostrada apenas quando permitido:

```typescript
@Component({
  // ...
  template: `
      <button *ngIf="accessChecker.isGranted('create', 'comments') | async">Post Comment</button>
    `,
})
export class CommentFormComponent {
// ...
```

Chamamos o método `isGranted`, que ouve a função fornecida no momento e verifica as permissões especificadas na configuração da ACL.
Além disso, ao ouvir a _role change_, ele oculta o botão se a autenticação for alterada durante o uso da aplicação.

Da mesma forma, podemos chamar o método `isGranted` de qualquer parte da aplicação, incluindo `guards` e serviços de rotas, o que nos dá uma maneira transparente e configurável de forma flexível de gerenciar o acesso do usuário a vários recursos.
