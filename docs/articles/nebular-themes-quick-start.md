This section describes steps to create new Angular project with Nebular theme framework.
Please take a look 
[Theme System](https://akveo.github.io/nebular/#/docs/concepts/theme-system) in a first to be familiar with concept.

By the end of the tutorial you will be able to do the following:
* Use default styles provided by Nebular (cosmic or default theme)
* Use you own styles based on Nebular (cosmic or default theme)
* Use magic of multiple themes with hot-reload

## Steps:

1) In a first to create new project run `ng new themes-example | cd themes-example` in the [CLI](https://github.com/angular/angular-cli)
or use existence.

2) At this step, we assume you already have Angular modules installed. Now let's install Angular Bootstrap which is the only peer dependency left:

```bash
npm i -S bootstrap
```

Then install Nebular module:

```bash
npm i -S @nebular/theme
```
<hr class="section-end">

3) Then you just need to include a CSS file of a theme you want to use into your `.angular-cli.json` file like this:
   

```typescript
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  ...
  "apps": [
    {
      ...
      "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.css",
        "../node_modules/@nebular/theme/styles/prebuilt/default.css"
      ],
```

4) Let's configure Nebular in the app module.
   
```typescript

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule } from '@nebular/theme';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
 {
   path: '**',
   component: PageComponent,
 },
];

@NgModule({
 declarations: [
   AppComponent,
   PageComponent
 ],
 imports: [
   BrowserModule,
   NbThemeModule.forRoot({name: 'default'}),
   RouterModule.forRoot(routes, {useHash: true}),
   NbLayoutModule,
   NbSidebarModule,
 ],
 providers: [NbSidebarService],
 bootstrap: [AppComponent]
})

export class AppModule {
}
```

_// You may take a quick look at [UI Kit Consept](https://akveo.github.io/nebular/#/docs/concepts/ui-kit) to understand Nebular base components._
<hr class="section-end">

5) Now, let's create a simple Nebular page (header + sidebar) in your project. 
* Create new component `ng g component page` and add [NbLayoutComponent](https://akveo.github.io/nebular/#/docs/components/layout) to page template: 

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  template: `

    <nb-layout>
      <nb-layout-header fixed>Company Name</nb-layout-header>

      <nb-sidebar>Sidebar Content</nb-sidebar>

      <nb-layout-column>Page Content</nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['page.component.scss'],
})
export class PageComponent {
}
```

<div class="note note-info">
  <div class="note-title">Adding into existing page</div>
  <div class="note-body">
    In case you already have some code on your page and want to mix it with Nebular components you would need to place your page code inside of the Nebular layout. 
    For Nebular to work it is required to have the `<nb-layout></nb-layout>` component at the top.
  </div>
</div>
<hr class="section-end">

* Open your `app.module.ts` and import necessary layout components:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule } from '@nebular/theme';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
 {
   path: '**',
   component: PageComponent,
 },
];

@NgModule({
 declarations: [
   AppComponent,
   PageComponent
 ],
 imports: [
   BrowserModule,
   NbThemeModule.forRoot({name: 'default'}),
   RouterModule.forRoot(routes, {useHash: true}),
   NbLayoutModule,
   NbSidebarModule,
 ],
 providers: [NbSidebarService],
 bootstrap: [AppComponent]
})

export class AppModule {
}
```
<hr class="section-end">

6) We are ready to check a result. Let's run `npm start` by [CLI](https://github.com/angular/angular-cli) and open in your browser `http://localhost:4200/`. Now we use default Nebular theme, lets customize it in next step.
![image](assets/images/articles/sample-page.png)

7) In the `src` of you project create `themes.scss` and paste following:

```scss
// import Nebular Theme System and the default theme
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';

// and change the variables you need, or simply leave the map empty to use the default values
// let's make it blue-ish instead of the default white color
$nb-themes: nb-register-theme((
  color-bg: #4ca6ff,
  shadow: 0 1px 2px 0 #3780c0,
  layout-bg: #ffffff,
  color-fg: #222222
), default, default); // let's leave it as default
```
 <hr class="section-end">
 
8) Now, find your styles.scss (or create one in the `src`) and paste the following:

```typescript
// this is your created themes.scss file, make sure the path to the file is correct
@import 'themes';

// framework component styles which will use your new theme
@import '~@nebular/theme/styles/globals';

// install the framework
@include nb-install() {
  @include nb-theme-global();
};
```
<hr class="section-end">

9) In the `.angular-cli.json` let's replace
```json
{
...
  "apps": [
    {
     ...
      "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.css",
        "../node_modules/@nebular/theme/styles/prebuilt/default.css"
      ],
```
to 
```json
{
  ...
  },
  "apps": [
    {
     ...
      "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.css",
        "styles.scss"
      ],
```

That's it, now app could be reloaded to see changes and in the `src/themes` you can override default value of variables.

![image](assets/images/articles/blue-theme.png)
_Details in the [Enabling Theme System: Normal setup](https://akveo.github.io/nebular/#/docs/guides/enabling-theme-system)_
<hr class="section-end">

10) Let's add to `src/themes.scss` a new theme, which will be based on the cosmic Nebular theme and named dark:

```scss

// add cosmic theme import below the default theme;
@import '~@nebular/theme/styles/themes/cosmic';

// and change the variables you need, or simply leave the map empty to use the default values
// let's make it blue-ish instead of the default white color
$nb-themes: nb-register-theme((

  color-bg: #222222,
  shadow: 0 1px 2px 0 #000000,
  color-fg: #303030,
  layout-bg: #ededed,
), dark, cosmic);
```

So that your `src/themes.scss` file looks like this:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';
@import '~@nebular/theme/styles/themes/cosmic';

// default theme
$nb-themes: nb-register-theme((

  color-bg: #4ca6ff,
  shadow: 0 1px 2px 0 #3780c0,
  layout-bg: #ffffff,
  color-fg: #222222,
), default, default);

// dark theme
$nb-themes: nb-register-theme((

  color-bg: #222222,
  shadow: 0 1px 2px 0 #000000,
  color-fg: #303030,
  layout-bg: #ededed,
), dark, cosmic);
```

At this point when you enable your dark theme in the `src/app/app.module.ts`:
```typescript
@NgModule({
...
  imports: [
    ...
    NbThemeModule.forRoot({name: 'dark'}),
    ...
  ],
})
```
your page should look like this:
![image](assets/images/articles/dark-theme.png)
 
11) To register themes with will be accessable to hot reload to `src/themes.scss` add following line:
```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';
@import '~@nebular/theme/styles/themes/cosmic';

$nb-enabled-themes: (default, dark);

...
```

Now, to enable the magic of the hot reload, wrap all of your *.component.scss (`app/page/page.component.scss`) styles with the nb-install-component mixin like this:

```scss
@import '../../themes.scss';

@include nb-install-component() {
  background: nb-theme(card-bg);

  .container {
    background: nb-theme(color-bg);
    font-weight: nb-theme(font-weight-bold);
  }
}
```

To test purpose add two buttons to page to be able to reload themes:
```typescript
import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-page',
  template: `
    <nb-layout>
      <nb-layout-header fixed>Company Name</nb-layout-header>
      <nb-sidebar>
        <button (click)="this.enableDarkTheme()">Enable Dark Theme</button>
        <button (click)="this.enableDefaultTheme()">Enable Default Theme</button>
      </nb-sidebar>
      <nb-layout-column>Page Content</nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['page.component.scss'],
})
export class PageComponent {

  constructor(private themeService: NbThemeService) {
  }

  enableDarkTheme() {
    this.themeService.changeTheme('dark');
  }

  enableDefaultTheme() {
    this.themeService.changeTheme('default');
  }
}
```
Done, now you can change a theme in the runtime. See [Enabling Theme System: Advanced setup](https://akveo.github.io/nebular/#/docs/guides/enabling-theme-system) for details.
<hr class="section-end">

## Addition info:
* [Angular CLI Config Schema](https://github.com/angular/angular-cli/wiki/angular-cli)

## Next

- [Advanced Theme System configuration](#/docs/guides/enabling-theme-system).
- [Deploying to production server](#/docs/guides/server-deployment).
