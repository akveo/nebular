# Nebular - Components, Auth, Security.
[![npm](https://img.shields.io/npm/l/@nebular/theme.svg)]()
[![Build Status](https://travis-ci.org/akveo/nebular.svg?branch=master)](https://travis-ci.org/akveo/nebular)
[![npm](https://img.shields.io/npm/dt/@nebular/theme.svg)](https://www.npmjs.com/package/@nebular/theme)
[![Dependency Status](https://david-dm.org/akveo/ngx-admin/status.svg)](https://david-dm.org/akveo/ng2-admin)

<img src="https://i.imgur.com/v7F8IZS.png">


Nebular is a great toolkit if you build Rich UI web-application based on Angular, and want to bootstrap your development using essential features out of the box. 
It provides you with a set of native Angular components, themeable components, authentication and security layers easily configurable for your API. 
At the same time, Nebular allows you to use it together with any other UI library you choose.

### Getting started
[Documentation](https://akveo.github.io/nebular/docs/getting-started/what-is-nebular?utm_source=github&utm_medium=nebular_readme) | [ngx-admin demo](http://github.com/akveo/ngx-admin)

### Basic Install

- install Nebular modules

```bash
npm i -S @nebular/theme @nebular/auth @nebular/security
```
You can skip auth/security in case you don't need it.

- add Nebular theme module into `app.module`:

```ts
import { NbThemeModule } from '@nebular/theme';

// ...

@NgModule({
  imports: [
    // ...
    NbThemeModule.forRoot({ name: 'default' }), // enable Default theme
  ]
})
export class AppModule {
```

- add theme styles

```scss
"styles": [
  "../node_modules/@nebular/theme/styles/prebuilt/default.css", // or `THEME_NAME`.css
],
```

- create a page with Nebular components


```ts
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';

// ...

@NgModule({
  // ...
  imports: [
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
  ],
})
export class SomePageModule { }
```

```ts
@Component({
  // ...
  template: `
    <nb-layout>
      <nb-layout-header fixed>Awesome Nebular</nb-layout-header>
      
      <nb-layout-column>
        <button nbButton>Hello World!</button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SomePageComponent {
```


### Starter Kits

- [ngx-admin](http://github.com/akveo/ngx-admin) - application based on Nebular modules with beautiful IOT components. [Live Demo](http://akveo.com/ngx-admin?utm_source=github&utm_medium=nebular_readme).
- [ngx-admin-starter](https://github.com/akveo/ngx-admin/tree/starter-kit) - clean application based on Nebular modules with a limited number of additional dependencies.

### VSCode Extension
- [Nebular Code Snippets](https://marketplace.visualstudio.com/items?itemName=shalinjames.vscode-nebular-snippets) - a Visual Studio Code snippets extension for Nebular components and directives.

### License
[MIT](LICENSE.txt) license.

### BrowserStack
This project runs its tests on multiple desktop and mobile browsers using [BrowserStack](http://www.browserstack.com).

<img src="https://cloud.githubusercontent.com/assets/131406/22254249/534d889e-e254-11e6-8427-a759fb23b7bd.png" height="40" />

### How can I support the developers?
- Star our GitHub repo :star:
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:
- Follow us on [Twitter](https://twitter.com/akveo_inc) :feet:
- Like our page on [Facebook](https://www.facebook.com/akveo/) :thumbsup:

### From Akveo
Made with :heart: by [Akveo team](http://akveo.com?utm_source=github&utm_medium=nebular_readme). Follow us on [Twitter](https://twitter.com/akveo_inc) to get the latest news first!
We're always happy to receive your feedback!
