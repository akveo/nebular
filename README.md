# Nebular [![npm](https://img.shields.io/npm/l/@nebular/theme.svg)]() [![Build Status](https://travis-ci.org/akveo/nebular.svg?branch=master)](https://travis-ci.org/akveo/nebular) [![npm](https://img.shields.io/npm/dt/@nebular/theme.svg)](https://www.npmjs.com/package/@nebular/theme) [![Dependency Status](https://david-dm.org/akveo/ngx-admin/status.svg)](https://david-dm.org/akveo/ng2-admin)

<a href="https://akveo.github.io/nebular/"><img src="https://i.imgur.com/ScNTkCX.png"></a>

Nebular is a great toolkit if you build Rich UI web-application based on Angular, and want to bootstrap your development using essential features out of the box. 
It provides you with a set of native Angular components, themeable components, authentication and security layers easily configurable for your API. 
At the same time, Nebular allows you to use it together with any other UI library you choose.

### A Second of your time

[Help us to make Nebular better!](https://goo.gl/forms/3vRrw7hdp6v9Gjmo1)

## Getting started
[Documentation](https://akveo.github.io/nebular/docs/getting-started/what-is-nebular?utm_source=github&utm_medium=nebular_readme) | [ngx-admin demo](http://github.com/akveo/ngx-admin) | [StackBlitz Seed Project](https://stackblitz.com/github/akveo/nebular-seed)

## Installation

### Angular CLI

Install Nebular with Angular CLI

```bash
ng add @nebular/theme@3
```

And that's it. Configuration will be done automatically.

If you want to have more control over setup process you may use manual setup guide.

### Manual

1. Install Nebular modules

```bash
npm install --save @nebular/theme@3 @angular/cdk @angular/animations
```
Additionally you can install Auth and Security `npm install --save @nebular/auth@3 @nebular/security@3`

2. Register Nebular theme module into `app.module`:

```ts
import { RouterModule } from '@angular/router';
import { NbThemeModule } from '@nebular/theme';

@NgModule({
  imports: [
    RouterModule.forRoot([ ... ]), // Router is required by Nebular
    NbThemeModule.forRoot(),
  ]
})
export class AppModule { }
```

3. Register theme styles

```scss
"styles": [
  "node_modules/@nebular/theme/styles/prebuilt/default.css",
],
```

4. Create a page with Nebular components

```ts
import { NbLayoutModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  imports: [
    NbLayoutModule,
    NbButtonModule,
  ],
})
export class SomePageModule { }
```

```ts
@Component({
  template: `
    <nb-layout>
      <nb-layout-header fixed>Awesome Nebular</nb-layout-header>
      
      <nb-layout-column>
        <button nbButton>Hello World!</button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SomePageComponent { }
```
That's it. Check [Documentation](https://akveo.github.io/nebular/docs/getting-started/what-is-nebular?utm_source=github&utm_medium=nebular_readme) for more details.

## Starter Kits

- [ngx-admin](http://github.com/akveo/ngx-admin) - application based on Nebular modules with beautiful IOT components. [Live Demo](http://akveo.com/ngx-admin?utm_source=github&utm_medium=nebular_readme).
- [ngx-admin-starter](https://github.com/akveo/ngx-admin/tree/starter-kit) - clean application based on Nebular modules with a limited number of additional dependencies.

## Developer Utils
- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=shalinjames.vscode-nebular-snippets) - a Visual Studio Code snippets extension for Nebular components and directives.
- [Intellij Plugin](https://plugins.jetbrains.com/plugin/11065-nebular-code-snippets) - a Intellij (WebStorm, IDEA, etc) Live template plugin for Nebular components and directives.

## License
[MIT](LICENSE.txt) license.

## BrowserStack
This project runs its tests on multiple desktop and mobile browsers using [BrowserStack](http://www.browserstack.com).

<img src="https://cloud.githubusercontent.com/assets/131406/22254249/534d889e-e254-11e6-8427-a759fb23b7bd.png" height="40" />

## More from Akveo

- [Eva Icons](https://github.com/akveo/eva-icons) - 480+ beautiful Open Source icons
- [ngx-admin](https://github.com/akveo/ngx-admin) - the best Angular admin template

## How can I support the developers?
- Star our GitHub repo :star:
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:
- Follow us on [Twitter](https://twitter.com/akveo_inc) :feet:
- Like our page on [Facebook](https://www.facebook.com/akveo/) :thumbsup:

## From Developers
Made with :heart: by [Akveo team](http://akveo.com?utm_source=github&utm_medium=nebular_readme). Follow us on [Twitter](https://twitter.com/akveo_inc) to get the latest news first!
We're always happy to receive your feedback!
