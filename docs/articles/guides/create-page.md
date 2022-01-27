# Criar página

Vamos criar uma página simples (cabeçalho + barra lateral) em seu projeto.
Supondo que você tenha um módulo separado por página, vamos abrir seu `some-page.module.ts` e importar os componentes de layout necessários:

```ts
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@beast/theme';

...

@NgModule({
  ...
  imports: [
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), // if this is your app.module
    NbButtonModule,
  ],
  ...
})
export class SomePageModule {

```

Então vamos adicionar componentes de layout com um header fixo em seu `some-page.component.ts`:
Toda página precisa ter um `<nb-layout></nb-layout>` por volta.

```ts
@Component({
  ...
  template: `

    <nb-layout>
      <nb-layout-header fixed>Company Name</nb-layout-header>

      <nb-sidebar>Sidebar Content</nb-sidebar>

      <nb-layout-column>
        Page Content <button nbButton>Hello World</button>
      </nb-layout-column>
    </nb-layout>
  `
})
export class SomePageComponent {

```

Como resultado, você deve ter uma página com um layout simples semelhante a este:

![image](assets/images/articles/sample-page.png)

<div class="note note-info">
  <div class="note-title">Adicionando em páginas existentes</div>
  <div class="note-body">
    Caso você já tenha algum código em sua página e queira misturá-lo com componentes do Beast, você precisaria colocar o código da sua página dentro do layout do Beast.
    Como já dito, `nb-layout` é um componente necessário para o funcionamento do Beast.
  </div>
</div>
