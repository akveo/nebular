# Create Nebular Page

Let's create a simple Nebular page (header + sidebar) in your project. 
We suppose that you have a separate module per page, let's open your `some-page.module.ts` and import necessary layout components:

```ts
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';

...

@NgModule({
  ...
  imports: [
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
  ],
  ...
})
export class SomePageModule {

```

Then let's add layout components with a sticky header into your `some-page.component.ts`:
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

As a result, you should have a page with a simple layout on it looking similar to this:

![image](assets/images/articles/sample-page.png)

<div class="note note-info">
  <div class="note-title">Adding into existing page</div>
  <div class="note-body">
    In case you already have some code on your page and want to mix it with Nebular components you would need to place your page code inside of the Nebular layout. 
    `<nb-layout></nb-layout>` is a required root component for Nebular to work.
  </div>
</div>
<hr> 


## Related Articles

- [NbLayout, NbLayoutColumn, NbLayoutHeader, NbLayoutFooter](docs/components/layout)
- [Design System Intro](/docs/design-system/eva-design-system-intro)
- [Design System Rules](docs/design-system/design-system-theme)
- [Enabling Customizable Themes](docs/design-system/enable-customizable-theme)
- [Deploying to production server](docs/guides/server-deployment)
