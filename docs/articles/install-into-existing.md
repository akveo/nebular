If you don't have any code yet, please consider checking <a href="https://cli.angular.io" target="_blank">Angular CLI</a> documentation for help creating your app.
In case you want to start based on our ngx-admin starter kit, please check out [Based on Starter Kit (ngx-admin)](#/docs/installation/based-on-starter-kit-ngxadmin) article.

<div class="note note-info">
  <div class="note-title">ngx-admin custom components</div>
  <div class="note-body">
    Please note, this tutorial explains how to install Nebular modules into your project including Theme System, Auth and UI Kit. 
    If you want to re-use any of ngx-admin <strong>custom</strong> components (like Temperature Widget, Dashboard charts, etc) without using ngx-admin itself, 
    please follow this guide and in the end just copy any of ngx-admin custom components you need into your project, register them in your modules and that's it.
  </div>
</div>
<hr class="section-end">

## Installing dependencies
1) At this step, we assume you already have Angular modules installed. Now let's install Angular Bootstrap which is the only peer dependency left:

```bash
npm i -S bootstrap@4.0.0-alpha.6
```
<hr class="section-end">

2) Then install Nebular modules:

```bash
npm i -S @nebular/theme @nebular/auth
```
You can remove `@nebular/auth` from the command if you don't need authentication part in your project.
<hr class="section-end">

3) At this stage you have everything in place, let's configure Nebular in the app module.

```typescript

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
Same way you can enable Auth Module, in more details this described under [Auth Module Concepts & Install](#/docs/auth/conceptsinstall) article.
<hr class="section-end">

4) Now, let's import Nebular styles:

Include Bootstrap and default Nebular theme CSS files into your `.angular-cli.json` file:

```
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "../node_modules/@nebular/theme/styles/prebuilt/default.css", // or cosmic.css
],
```

<div class="note note-info">
  <div class="note-title">Advanced Theme System configuration</div>
  <div class="note-body">
    In this article we describe the very basic styles installation. If you need more advanced features, like theme variables management, 
    or even multiple themes switching - check out <a href="#/docs/guides/enabling-theme-system">Enabling Theme System</a> article.
  </div>
</div>
<hr class="section-end">


5) Now, let's create a simple Nebular page (header + sidebar) in your project. We assume that you have a separate module per page, let's open your `some-page.module.ts` and import necessary layout components:

```typescript

import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';

...

@NgModule({
  ...
  imports: [
    NbLayoutModule,
    NbSidebarModule,
  ],
  providers: [NbSidebarService], // we need this service for the sidebar
  ...
})
export class SomePageModule {

```

Then let's add layout components with a sticky header into your `page.component.ts`:
```typescript

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

And done! At this step, you should have a page with a simple layout on it.
<hr class="section-end">

<div class="note note-info">
  <div class="note-title">Adding into existing page</div>
  <div class="note-body">
    In case you already have some code on your page and want to mix it with Nebular components you would need to place your page code inside of the Nebular layout. 
    For Nebular to work it is required to have the `<nb-layout></nb-layout>` component at the top.
  </div>
</div>
<hr class="section-end"> 


## Next

- [Advanced Theme System configuration](#/docs/guides/enabling-theme-system).
- [Nebular UI Kit](#/docs/concepts/ui-kit).
- [NbLayout, NbLayoutColumn, NbLayoutHeader, NbLayoutFooter](#/docs/components/layout).
- [Deploying to production server](#/docs/guides/server-deployment).
