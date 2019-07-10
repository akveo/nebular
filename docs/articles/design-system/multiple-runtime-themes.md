# Enable Multiple Runtime Themes

This mode comes in handy when you need to have multiple themes and be able to change them in the run-time.


<div class="note note-info section-end">
  <div class="note-title">Setup Required</div>
  <div class="note-body">
    This guide assumes you already enabled [Theme Customization](docs/design-system/enable-customizable-theme)
    and reviewed [Eva Design System Theme](docs/design-system/eva-design-system-theme) rules.
  </div>
</div>
<hr>

## Enable Second Theme
Assuming you already have the `themes.scss` file with the `default` theme enabled, let's add a second theme:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';
@import '~@nebular/theme/styles/themes/dark';

$nb-themes: nb-register-theme((
  text-basic-color: color-basic-800, // some styles we changed
  text-disabled-color: color-basic-600,
), default, default);

$nb-themes: nb-register-theme((
  text-basic-color: color-basic-800, // some styles we changed
  text-disabled-color: color-basic-600,
), dark, dark);

```

Basically, that's it. Now you have two themes registered.
<hr>

## Related Articles

- [Change Theme in Runtime](docs/design-system/change-curren-theme)
- [Enable CSS Properties Mode](docs/design-system/enable-css-properties-mode)
- [Create Custom Theme](docs/design-system/create-custom-theme)
