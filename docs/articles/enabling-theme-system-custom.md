<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](#/docs/installation/based-on-starter-kit) then you already have the Advanced setup in place.
  </div>
</div>

**When**: You need to be able to change theme-variables and want to use them in your code.

*Note*: the setup might look a bit verbose, but unfortunately angular-cli support on custom configurations is quite limited, hopefully with the future releases and plugins support this will be reduced significantly.

1) Create a `themes.scss` file with a Nebular theme declaration. We assume that our theme will be based on the `default` theme and we'll keep it named as `default`.

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

2) Now, find your `styles.scss` (or create one and add it into `.angular-cli.json` under `"styles": [..]`) and paste the following:

```scss
// this is your created themes.scss file, make sure the path to the file is correct
@import 'themes';

// framework component styles which will use your new theme
@import '~@nebular/theme/styles/globals';

// install the framework
@include nb-install() {
  @include nb-theme-global();
};

```

3) At this step you already can customize the variables to change components look and behavior. To be able to use these (or new) variables into your custom components, just add an import line into any `*.component.scss` file:

```scss
@import '../../../@theme/styles/themes';

:host {

  background: nb-theme(card-bg); // and use it
}
``` 

<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    Variables are accessible simply using a call of nb-theme(variable-name) function.
  </div>
</div>

At this step you will have something similar to the image below:

![image](assets/images/articles/blue-theme.png)

## Previous

- [Enabling Theme System (Basic setup)](#/docs/guides/enabling-theme-system-basic).

## Next
- [Enabling Theme System (Hot reload)](#/docs/guides/enabling-theme-system-hot-reload).
- [Theme System Concepts](#/docs/concepts/theme-system).
- [Default Theme variables table](#/docs/themes/default).
- [Cosmic Theme variables table](#/docs/themes/cosmic).
