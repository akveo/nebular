# 3rd Party Components

Currently Nebular Theme system is integrated with the following 3rd party modules:

- Bootstrap 4;
- ng2-smart-table;
- angular2-toaster.

It means that we've created style overriding for these modules, so that you can change component's look & feel using Nebular theme variables.
For example, if you change the `color-primary` variable, bootstrap components using this color will be changed accordingly.


Or that's how we described variables for the `angular2-toaster` module:

```scss
  ...
  toaster-bg: color-primary,
  toaster-fg-default: color-inverse,
  toaster-btn-close-bg: transparent,
  toaster-btn-close-fg: toaster-fg-default,
  toaster-shadow: shadow,

  toaster-fg: color-white,
  toaster-success: color-success,
  toaster-info: color-info,
  toaster-warning: color-warning,
  toaster-wait: color-primary,
  toaster-error: color-danger,
  ...

```
 <hr>
 
## Related Articles

- [Enable Theme System](docs/guides/enable-theme-system)
- [Theme System Concepts](docs/guides/theme-system)
