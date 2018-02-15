This section describes steps to create a new Angular project with Nebular theme framework.
<hr class="section-end">

## Steps: 

1) For the first to create a new project run the following command in the [Angular CLI](https://github.com/angular/angular-cli). 
```bash
ng new themes-example && cd themes-example
```


2) Now let's install Angular Bootstrap which is the only peer dependency left:

```bash
npm i -S bootstrap
```

Then install Nebular module:

```bash
npm i -S @nebular/theme
```
At this point you have done with the dependencies, let's include prepared styles in the project.
<hr class="section-end">

3) You just need to include a CSS file of a theme you want to use for your `.angular-cli.json` file like this:
   

```json
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
Now you have attached external CSS. More information about style structure in the [Theme System](#/docs/concepts/theme-system), it'll be covered in the tutorial later.

4) Let's configure Nebular in the app module.
   
```typescript

import { BrowserModule } from '@angular/platform-browser';
import { NbThemeModule } from '@nebular/theme';

@NgModule({
 ...
 imports: [
   BrowserModule,
   NbThemeModule.forRoot({name: 'default'}),
   ...
 ],
})

export class AppModule {
}
```

Now angular module has configured with `default` theme and we could move to create the first page.
<hr class="section-end">

5) The simple Nebular page is a base component that includes a header and sidebar. It's required that all stuff in your project based on Nebular should wrap in `<nb-layout>`. More information about the list of essential components is provided in the [UI Kit Consept](https://akveo.github.io/nebular/#/docs/concepts/ui-kit)), we will talk about it later in the scope of next parts of the tutorial.
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
<hr class="section-end">

* Also add new component to your `app.module.ts` and import necessary layout components:

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

As soon as we have added Router to the module let's update `app/app.component.ts` `template` like this:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}

```
Here we use [Angular Router](https://angular.io/tutorial/toh-pt5#routing), that is not covered here, but you can read it in the Angular docs.
<hr class="section-end">

6) We are ready to check the result. Let's run `npm start` with [CLI](https://github.com/angular/angular-cli) and open in your browser `http://localhost:4200/`. Now we use default Nebular theme. How to customize is described in the next step [Custom theme](#/docs/ngxadmin-tutorials/themes-tutorial-custom-theme).
![image](assets/images/articles/smart-house-sample-page.png)

## Next

* [Custom theme](#/docs/ngxadmin-tutorials/themes-tutorial-custom-theme).
* [Themes hot-reload](#/docs/ngxadmin-tutorials/themes-tutorial-hot-reload).
* [Advanced Theme System configuration](#/docs/guides/enabling-theme-system).
* [Deploying to production server](#/docs/guides/server-deployment).
