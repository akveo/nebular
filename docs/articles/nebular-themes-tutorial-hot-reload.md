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
![image](assets/images/articles/smart-house-dark-page.png)
 
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

Looks like now we are ready to use an ability to hot reload to apply dark or bluish theme depends on the period of the day. Let's show our content light-faced from 7.30 till 22.30.
```typescript
import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-page',
  template: `
    <nb-layout>
      <nb-layout-header fixed>List of views for your smart house devices (Dashboard, Lists etc.)</nb-layout-header>
      <nb-sidebar>
        List of devices
      </nb-sidebar>
      <nb-layout-column>Control panel of concrete device</nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['page.component.scss'],
})

export class PageComponent implements OnInit {

  ngOnInit(): void {
    const minute = 60 * 1000;

    const wakeUpTime = new Date();
    wakeUpTime.setHours(7);
    wakeUpTime.setMinutes(30);

    const sleepTime = new Date();
    sleepTime.setHours(22);
    sleepTime.setMinutes(30);

    setInterval(() => {
      console.log('check time')
      const now = new Date();

      if (now.getTime() >= wakeUpTime.getTime() && now.getTime() <= sleepTime.getTime()) {
        this.themeService.changeTheme('default');
      } else {
        this.themeService.changeTheme('dark');
      }
    }, minute);
  }

  constructor(private themeService: NbThemeService) {
  }
}

```
So now your app will check the local time every minute and update style if it necessary.
<hr class="section-end">

## Previous
* [Basic setup](#/docs/ngxadmin-tutorials/themes-tutorial-basic-setup)
* [Custom theme](#/docs/ngxadmin-tutorials/themes-tutorial-custom-theme).

## Next
* [Advanced Theme System configuration](#/docs/guides/enabling-theme-system).
* [Deploying to production server](#/docs/guides/server-deployment).

## Addition info:
* [Enabling Theme System (Hot reload)](#/docs/guides/enabling-theme-system-hot-reload)
