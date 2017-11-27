Nebular Theme System - is a set of rules we put into how SCSS files and variables are organized to achieve the following goals:

- ability to flexibly change looks & feel of the application by managing variables, without changing SCSS itself;
- ability to switch between visual themes in a runtime without reloading the page;
- support of CSS-variables (implemented partially).
<hr class="section-end">

### Theme Map

Each theme is represented as an SCSS map with a list of key-value pairs:

```scss
$theme: (
  font-main: unquote('"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'),
  font-secondary: font-main,

  font-weight-thin: 200,
  font-weight-light: 300,
  font-weight-normal: 400,
  font-weight-bolder: 500,
  font-weight-bold: 600,
  font-weight-ultra-bold: 800,

  base-font-size: 16px,

  font-size-xlg: 1.25rem,
  font-size-lg: 1.125rem,
  font-size: 1rem,
  font-size-sm: 0.875rem,
  font-size-xs: 0.75rem,

  radius: 0.375rem,
  padding: 1.25rem,
  margin: 1.5rem,
  line-height: 1.25,
  
  ...
```
Where _key_ - is a variable name, and _value_ - is a raw SCSS value (color, string, etc) or **parent variable name**, so that you can inherit values from different variables:

```scss
$theme: (
  font-main: unquote('"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'),
  font-secondary: font-main,
```
Here `font-secondary` inherits its value from `font-main`.

<hr class="section-end">

### Component Variables

Then, for each component of the Nebular UI Kit, there is a list of variables you can change.
For example - header component variables:

```scss
  ...
  
  header-font-family: font-secondary,
  header-font-size: font-size,
  header-line-height: line-height,
  header-fg: color-fg-heading,
  header-bg: color-bg,
  header-height: 4.75rem,
  header-padding: 1.25rem,
  header-shadow: shadow,
  
  ...
```
As you can see, you have 8 variables for a pretty simple component and from the other side, 6 of them are inherited from the default values.
That means that if you want to create a new theme with a united look & feel of the components - in most cased you would need to change around 10 generic variables, such as `color-bg`, `shadow`, etc 
to change the UI completely.

List of component style variables is specified in the component documentation, for example [styles for header component](#/docs/components/layout#NbLayoutHeaderComponentStyles).
<hr class="section-end">

### Variables Usage

Now, if you want to use the variables in your custom style files, all you need to do (of course, after the [successful setup of the Theme System](#/docs/guides/enabling-theme-system) is call `nb-theme(var-name)` function:

```scss
@import '../../../@theme/styles/themes';

:host {

  background: nb-theme(card-bg); // and use it
}
```
Depending of the currently enabled theme and the way `card-bg` inherited in your theme - you will get the right color.
<hr class="section-end">

### Built-in themes

Currently, there are 2 built-in themes: 
- `default` - clean white business theme.
- `cosmic` - dark theme.

Themes can also be inherited from each other, `cosmic`, for instance, is inherited from the `default` theme.
<hr class="section-end">

### Magic of multiple themes with hot-reload

As you can see from the [ngx-admin demo](http://akveo.com/ngx-admin?utm_source=nebular_documentation&utm_medium=doc_page), you can switch themes in the runtime without reloading the page.
That is useful when you have multiple visual themes per user role or want to provide your user with such configuration so that the user can decide which theme works best for him.
The only requirement for the feature to work is to wrap all of your component styles into special mixin `nb-install-component` and use `nb-theme` to get the right value:

```scss
@import '../../../@theme/styles/themes';

@include nb-install-component() {
  background: nb-theme(card-bg); // now, for each theme registered the corresponding value will be inserted
  
  .container {
    background: nb-theme(color-bg);
    font-weight: nb-theme(font-weight-bold);
  }
}
```

## Next

- [Enable Theme System](#/docs/guides/enabling-theme-system).
- [Default Theme variables table](#/docs/themes/default).
- [Cosmic Theme variables table](#/docs/themes/cosmic).
