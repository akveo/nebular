# Trocar tema

O Beast tem dois temas: `default` e `dark`, `corporate` and `cosmic`. É possível alterar o tema estaticamente e dinamicamente em runtime.

<hr>

## Trocar o tema padrão estaticamente

É extremamente simples substituir um tema de um para outro.
Tudo o que você precisa fazer é alterar o valor da configuração `name` em `NbThemeModule.forRoot`:

```ts
  @NgModule({
    imports: [
      // ...
      NbThemeModule.forRoot({ name: 'dark' }),
    ],
  }
```

<hr>

## Trocar tema em runtime

Caso você queira ter um melhor controle quando um tema é alterado ou, por exemplo, precisa alterá-lo com base em uma ação do usuário,
é possível dizer dinamicamente ao Beast qual tema deve ser habilitado:

```ts

  // ...
  constructor(private themeService: NbThemeService) {
    this.themeService.changeTheme('default');
  }

```

<hr>

## "Escutando" a alteração do tema

E é claro que é possível usar `subscribe` no evento quando o tema atual for alterado, para que você possa ajustar algo em seu código de acordo:

```ts

  // ...
  constructor(private themeService: NbThemeService) {

    this.themeService.onThemeChange()
          .subscribe((theme: any) => {
            console.log(`Theme changed to ${theme.name}`);
          });
  }

```
