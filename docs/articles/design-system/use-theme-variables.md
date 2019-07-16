# Use Theme Variable

In case when you need to access theme variables from your application component, 
Nebular provides you with simple sass function called `nb-theme`.
<hr>

## Import Theme

In you `*.component.scss` add an import of `themes.scss`
(created in [Enable Customizable Theme](docs/design-system/enable-customizable-theme) step):

```scss
@import '../../../themes';
```
<hr>

## Access Variable

Now we can simply call `nb-theme(variable-name)` to access a variable:

```scss
@import '../../../themes';

:host {

  background: nb-theme(background-basic-color-1);
}
```
Complete list of variables could be found under [Default Theme Variables](docs/design-system/default-theme) table.
<hr>

## Access with Multiples Theme Mode

In a case when you have [Multiple Runtime Themes](docs/design-system/enable-multiple-runtime-themes), you also need to cover your component styles
using `nb-install-component` mixin like this:

```scss

@import '../../../themes';

@include nb-install-component {

  background: nb-theme(background-basic-color-1);
}

```

The mixin will multiple the component styles per each enabled theme, giving the ability to use run-time themes. 
Note, in case when [Custom CSS Properties](docs/design-system/enable-css-properties-mode) mode enables, 
the mixin **is not needed**, since there is no need to multiple the styles.

## Related Articles

- [Design System Theme](docs/design-system/design-system-theme)
- [Enable Customizable Theme](docs/design-system/enable-customizable-theme) 
- [Create Custom Theme](docs/design-system/create-custom-theme) 

