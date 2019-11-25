# Install Nebular

If you don't have any code yet, please consider checking <a href="https://cli.angular.io" target="_blank">Angular CLI</a> documentation for help creating your app.
In case you want to start based on our ngx-admin starter kit, please check out [Based on Starter Kit (ngx-admin)](docs/guides/install-based-on-starter-kit) article.

<div class="note note-info">
  <div class="note-title">ngx-admin custom components</div>
  <div class="note-body">
    Please note, this tutorial explains how to install Nebular modules into your project. 
    If you want to re-use any of ngx-admin <strong>custom</strong> components (like Temperature Widget, Dashboard charts, etc) without using ngx-admin itself, 
    please follow this guide and afterwards copy any of ngx-admin custom components you need into your project and register them in your modules.
  </div>
</div>
<hr>

## Using Angular CLI

### Installation

We strongly recommend developing Angular applications with `@angular/cli`. To install it use the following command:

```bash
npm install -g @angular/cli
```

### Create a New Project

A new project can be created using Angular CLI like this:

```bash
ng new my-new-project
```

### Install Nebular

Nebular supports init configuration with Angular Schematics. This means you can simply add it to your project, and Angular Schematics will do the rest:

```bash
ng add @nebular/theme
```

That's it. Nebular is ready now.
<hr>

## Manually


### Installing dependencies

At this step, we assume you already have an Angular application created.

### Install Nebular modules

```bash
npm install --save @nebular/theme @angular/cdk @angular/animations
```

Also, you may want to install Eva Icons pack, which is a recommended SVG icons library starting from Nebular 4.0:
```bash
npm install --save @nebular/eva-icons
```
More details on [how to use Nebular Eva Icons are here](docs/components/icon/overview#nbiconcomponent). 

Additionally, you can install Auth and Security `npm install --save @nebular/auth @nebular/security`

### Configure Nebular

At this stage you have everything in place, let's configure Nebular in the app module.

```ts

import { NbThemeModule } from '@nebular/theme';

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
Same way you can enable Auth Module (more details under [Auth Module Concepts](docs/auth/introduction) & [Install](docs/auth/installation) articles).

### Install Styles
Now, let's import Nebular styles

Include default Nebular theme CSS file into your `angular.json` file:

```scss
"styles": [
  "node_modules/@nebular/theme/styles/prebuilt/default.css", // or dark.css
],
```

<div class="note note-info">
  <div class="note-title">Customizable Theme Configuration</div>
  <div class="note-body">
    In this article we describe the basic styles installation. If you need more advanced features, like customizable theme variables, 
    or even multiple themes switching - check out [Enabling Customizable Theme](docs/design-system/enable-customizable-theme) and then [Multiple Runtime Themes](docs/design-system/enable-multiple-runtime-themes) articles.
  </div>
</div>

That's it. Now you can [create a Nebular page](docs/guides/create-nebular-page).
<hr>

## Related Articles

- [Create Nebular Page](docs/guides/create-nebular-page)
- [Nebular UI Components](docs/components/components-overview)
