This section describes steps to create new Angular project with Nebular theme framework.
Please take a look 
[Theme System](https://akveo.github.io/nebular/#/docs/concepts/theme-system) in a first to be familiar with concept.

By the end of the tutorial you will be able to do the following:
* Use magic of multiple themes with hot-reload
<hr class="section-end">

## Steps:

1) Let's add to `src/themes.scss` a new theme, which will be based on the cosmic Nebular theme and named dark:

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
 
2) To register themes which will be accessible to hot reload to `src/themes.scss` add following line:
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

## Next

- [Advanced Theme System configuration](#/docs/guides/enabling-theme-system).
- [Deploying to production server](#/docs/guides/server-deployment).
