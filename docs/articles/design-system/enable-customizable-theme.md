# Enable Customizable Themes

Nebular styles come as a css file by default.
In order to be able to customize theme variables, scss files should be enabled.

<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    You may already have this setup in place, if you used `ng add @nebular/theme` and selected customizable themes during the installation process.
  </div>
</div>
<hr>

## Import a theme

Create a `themes.scss` in your `src` folder and import a theme of your choice:

```scss
// import Nebular Theme System and the default theme
@forward '@nebular/theme/styles/theming';
@use '@nebular/theme/styles/theming' as *;
@use '@nebular/theme/styles/themes/default';
```

<hr>

## Modify theme variables

To adjust some of the theme variables, we need to register our changes using `nb-register-theme` function.
Let's make text color lighter and disabled text - darker:

```scss
@forward '@nebular/theme/styles/theming';
@use '@nebular/theme/styles/theming' as *;
@use '@nebular/theme/styles/themes/default';

$nb-themes: nb-register-theme(
  (
    // we setting color-basic-800 instead of color-basic-1000
    text-basic-color: color-basic-800,
    // and color-basic-600 as instead of color-basic-500
    text-disabled-color: color-basic-600
  ),
  default,
  default
);
```

We can also modify a primary color, for example make it violet.
[Eva Colors](https://colors.eva.design?utm_campaign=eva_design%20-%20eva%20colors%20-%20nebular%20docs%20link&utm_source=nebular&utm_medium=referral&utm_content=enable_customizable_theme_primary_color) is a great tool to generate colors pallet from a given brand color.

```scss
@forward '@nebular/theme/styles/theming';
@use '@nebular/theme/styles/theming' as *;
@use '@nebular/theme/styles/themes/default';

$nb-themes: nb-register-theme(
  (
    // new primary color
    color-primary-100: #faf7ff,
    color-primary-200: #ece3ff,
    color-primary-300: #d5bfff,
    color-primary-400: #b18aff,
    color-primary-500: #a16eff,
    color-primary-600: #7b51db,
    color-primary-700: #5a37b8,
    color-primary-800: #3e2494,
    color-primary-900: #29157a,
    text-basic-color: color-basic-800,
    text-disabled-color: color-basic-600
  ),
  default,
  default
);
```

<hr>

## Enable Nebular Styles

The last thing, find your `styles.scss` (or create one and add it into `angular.json` under `"styles": [..]`) or your app and paste the following:

```scss
// this is our just created themes.scss file, make sure the path to the file is correct
@use 'themes' as *;

// framework component styles
@use '@nebular/theme/styles/globals' as *;

// install the framework styles
@include nb-install() {
  @include nb-theme-global();
}
```

<hr>

## Related Articles

- [Use Theme Variables](docs/design-system/use-theme-variables)
- [Create Custom Theme](docs/design-system/create-custom-theme)
- [Multiple Runtime Themes](docs/design-system/enable-multiple-runtime-themes)
