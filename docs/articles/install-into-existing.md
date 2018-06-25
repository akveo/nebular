# Add Into Existing Project

If you don't have any code yet, please consider checking <a href="https://cli.angular.io" target="_blank">Angular CLI</a> documentation for help creating your app.
In case you want to start based on our ngx-admin starter kit, please check out [Based on Starter Kit (ngx-admin)](docs/guides/install-based-on-starter-kit) article.

<div class="note note-info">
  <div class="note-title">ngx-admin custom components</div>
  <div class="note-body">
    Please note, this tutorial explains how to install Nebular modules into your project including Theme System, Auth and UI Kit. 
    If you want to re-use any of ngx-admin <strong>custom</strong> components (like Temperature Widget, Dashboard charts, etc) without using ngx-admin itself, 
    please follow this guide and in the end just copy any of ngx-admin custom components you need into your project, register them in your modules and that's it.
  </div>
</div>
<hr>

## Installing dependencies
At this step, we assume you already have Angular modules installed. Now let's install Angular Bootstrap which is the only peer dependency left:

```bash
npm i -S bootstrap
```
<hr>

## Install Nebular modules

```bash
npm i -S @nebular/theme @nebular/auth @nebular/security
```
You can remove `@nebular/auth` and `@nebular/security` from the command if you don't need authentication/security parts in your project.
<hr>

## Configure Nebular

At this stage you have everything in place, let's configure Nebular in the app module.

```ts

import { NbThemeModule } from '@nebular/theme';

...

@NgModule({
  imports: [
    ...
    NbThemeModule.forRoot({ name: 'default' }), // this will enable the default theme, you can change this to `cosmic` to enable the dark theme
  ]
})
export class AppModule {

```
Same way you can enable Auth Module (more details under [Auth Module Concepts & Install](docs/auth/conceptsinstall) article).
<hr>

## Install Styles
Now, let's import Nebular styles

Include Bootstrap and default Nebular theme CSS files into your `.angular-cli.json` file:

```scss
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "../node_modules/@nebular/theme/styles/prebuilt/default.css", // or cosmic.css
],
```

<div class="note note-info">
  <div class="note-title">Advanced Theme System configuration</div>
  <div class="note-body">
    In this article we describe the very basic styles installation. If you need more advanced features, like theme variables management, 
    or even multiple themes switching - check out [Enabling Theme System](docs/guides/enable-theme-system) article.
  </div>
</div>
<hr>

## Create a page

Now, let's create a simple Nebular page (header + sidebar) in your project. We suppose that you have a separate module per page, let's open your `some-page.module.ts` and import necessary layout components:

```ts
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';

...

@NgModule({
  ...
  imports: [
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule,
  ],
  providers: [NbSidebarService], // we need this service for the sidebar
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
      
      <nb-layout-column>Page Content</nb-layout-column>
    </nb-layout>
  `
})
export class SomePageComponent {

```

And done! At this step, you should have a page with a simple layout on it looking like this:

![image](assets/images/articles/sample-page.png)

<hr>

<div class="note note-info">
  <div class="note-title">Adding into existing page</div>
  <div class="note-body">
    In case you already have some code on your page and want to mix it with Nebular components you would need to place your page code inside of the Nebular layout. 
    `<nb-layout></nb-layout>` is a required root component for Nebular to work.
  </div>
</div>
<hr> 


## Related Articles

- [Advanced Theme System configuration](docs/guides/enable-theme-system)
- [Nebular UI Kit](docs/guides/components-overview#advanced-setup)
- [NbLayout, NbLayoutColumn, NbLayoutHeader, NbLayoutFooter](docs/components/layout)
- [Deploying to production server](docs/guides/server-deployment)
