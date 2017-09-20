The main goal of the Nebular Theme System is to provide developers with a way to customize the look and feel of the application without changing CSS.

In simple words, Nebular theme - is a SCSS map with a list of keys (variables) and their values.

Theme System supports **hot reload** - so multiple themes at the same time and ability to switch themes *in runtime*.
Note, in a simplest setup you may just include prebuilt CSS file of the theme of your choice and that's  it. More details on the installation under [Enabling Theme System](#/docs/guides/enabling-theme-system) page.

## Vocabulary
- *Theme System* - Nebular's feature allowing developers to manage application look and feel.
- *Theme Variables* - key-value `SCSS map` of theme variables accessible with `nb-theme(variable-name)` function.
- *Hot Reload* - ability to dynamically change look and feel of the app in runtime with no need to reload/rebuilt the app.

## Example
Here's a default theme from the [Admin Starter Kit](http://akveo.com/ng2-admin) demo application.

```scss
$nb-themes: nb-register-theme((
  sidebar-header-gap: 2rem,
  sidebar-header-height: initial,
  layout-content-width: 1400px,

  font-main: Roboto,
  font-secondary: Exo,
), default, default);
```

## Variables & Inheritance concepts

The idea of the variables isn't new, moreover, each grownup application or library uses SCSS/LESS variables to allow the developer to customize the behavior.
We also took this concept and put it inside of the Nebular UI Kit, so that the components heavily utilize the variables.
Currently, the default theme has 300+ variables describing the components.
To simplify the usage, we also put the *inheritance* concept inside, thus a variable may inherit its value from the parent variable. 
Thus, if you change the `color-bg` variable once, all the child variables will change accordingly.

*Note*: Nebular uses SCSS map as a storage of the variables and `nb-theme(variable-name)` function as a getter. 

## Multiple themes & hot reload

Multiple themes setup can be useful when you need to switch between different themes dynamically in the runtime. For example, you may need a different theme for Premium users of your application.
Under the hood this is achieved by generating different style sets per theme, which means that this feature should be used with caution, as it increases the build size. 
