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
<hr>

## Related Articles

- [Design System Theme](docs/design-system/eva-design-system-theme)
- [Enable Customizable Theme](docs/design-system/enable-customizable-theme) 
- [Create Custom Theme](docs/design-system/create-custom-theme) 

