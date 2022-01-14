# Enable Multiple Runtime Themes

This mode comes in handy when you need to have multiple themes and be able to change them in the run-time.

<div class="note note-info section-end">
  <div class="note-title">Setup Required</div>
  <div class="note-body">
    This guide assumes you already enabled <a href="docs/design-system/enable-customizable-theme">Theme Customization</a> 
    and reviewed <a href="docs/design-system/design-system-theme">Eva Design System Theme</a> rules.
  </div>
</div>
<hr>

## Enable Second Theme

Assuming you already have the `themes.scss` file with the `default` theme enabled, let's add a second theme:

```scss
@forward '@nebular/theme/styles/theming';
@use '@nebular/theme/styles/theming' as *;
@use '@nebular/theme/styles/themes/default';
@use '@nebular/theme/styles/themes/dark';

$nb-themes: nb-register-theme(
  (
    // some styles we changed
    text-basic-color: color-basic-800,
    text-disabled-color: color-basic-600
  ),
  default,
  default
);

$nb-themes: nb-register-theme(
  (
    // some styles we changed
    text-basic-color: color-basic-800,
    text-disabled-color: color-basic-600
  ),
  dark,
  dark
);
```

Basically, that's it. Now you have two themes registered.

<hr>

## Related Articles

- [Change Theme in Runtime](docs/design-system/changing-theme)
- [Enable CSS Properties Mode](docs/design-system/enable-css-properties-mode)
- [Create Custom Theme](docs/design-system/create-custom-theme)
