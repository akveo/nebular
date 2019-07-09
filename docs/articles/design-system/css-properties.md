# Enable CSS Custom Properties Mode

Custom CSS properties - custom variables that could be declared in CSS, changed and resolved in browser runtime.
This allows dynamically change application themes with no need to reload the page. Moreover, no additional CSS is loaded, resulting in good performance achievements.

Starting with Nebular 4, Nebular can run in custom CSS properties mode in a simple configuration change.  

<div class="note note-info section-end">
  <div class="note-title">Setup Required</div>
  <div class="note-body">
    This guide assumes you already enabled [Theme Customization](docs/design-system/enable-customizable-theme)
    and reviewed [Eva Design System Theme](docs/design-system/eva-design-system-theme) rules.
  </div>
</div>

## Enable Custom CSS Properties

To enable the mode, find your `themes.scss` and set the `$nb-enable-css-custom-properties` to `true`:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';

$nb-enable-css-custom-properties: true; // <-- enable css custom properties

$nb-themes: nb-register-theme((
  
  // your theme

  text-basic-color: color-basic-800,
  text-disabled-color: color-basic-600,
), default, default);
```

As a result, all theme properties will be placed under `body` element as custom css properties:

```css

.nb-theme-default {
  --color-basic-800: #2e384f,
  --text-basic-color: var(--color-basic-800),
}

```

When you change a theme, the theme class will be changed, resulting in a new set of css properties, and changing all the component styles dynamically, in the runtime. 
<hr>  


## Related Articles

- [Use Theme Variables](docs/design-system/use-theme-variables)
- [Create Custom Theme](docs/design-system/create-custom-theme)
- [Multiple Runtime Themes](docs/design-system/enable-multiple-runtime-themes)
