This section describes steps to configure the app to be able to reload theme in the browser without reloading page. We assume that you already did [Basic setup](#/docs/ngxadmin-tutorials/themes-tutorial-basic-setup) and [Custom theme](#/docs/ngxadmin-tutorials/themes-tutorial-custom-theme) and have working app with installed Nebular and one custom them.

<hr class="section-end">

## Steps:

1) At this point, we need to specify the second theme which will replace existence. Let's add it to `src/themes.scss`. A new theme will be based on the cosmic Nebular theme and named dark:

```scss
@import '~@nebular/theme/styles/themes/cosmic';

$nb-themes: nb-register-theme((

  color-bg: #222222,
  shadow: 0 1px 2px 0 #000000,
  color-fg: #303030,
  layout-bg: #ededed,
), dark, cosmic);
```
* Add cosmic theme import below the default theme
* And change the variables you need, or simply leave the map empty to use the default values
* Let's make it dark by specified background color as black and named it `dark`

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

So when you enable your dark theme in the `src/app/app.module.ts`:
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
 
2) To register themes which will be accessible to hot reload add following line to `src/themes.scss`:
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

For a test purpose add two buttons on a page to be able to reload themes at runtime:
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
<hr class="section-end">

## Addition info:
* [Enabling Theme System (Hot reload)](#/docs/guides/enabling-theme-system-hot-reload)

## Previous
* [Basic setup](#/docs/ngxadmin-tutorials/themes-tutorial-basic-setup)
* [Custom theme](#/docs/ngxadmin-tutorials/themes-tutorial-custom-theme).

## Next
- [Advanced Theme System configuration](#/docs/guides/enabling-theme-system).
- [Deploying to production server](#/docs/guides/server-deployment).
