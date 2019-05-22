# Eva Design System Theme

Nebular Theme is a set of rules we put into how sass files and variables are organized to achieve the following goals:

- create various visual themes easily;
- flexibly change looks & feel of the application by managing variables, without changing component styles;
- switch between visual themes in app runtime without reloading the page;
- support of CSS properties.

## A Theme

In Eva Design System **theme** is a set of variables that represents application look & feel.
In Nebular terms - **theme** is simply a sass map, structured in a particular way, here's a gist of what it looks like:

```scss
$theme: (
  color-danger-100: #fff2f2,
  color-danger-200: #ffd6d9,
  color-danger-300: #ffa8b4,
  color-danger-400: #ff708d,
  color-danger-500: #ff3d71,
  color-danger-600: #db2c66,
  color-danger-700: #b81d5b,
  color-danger-800: #94124e,
  color-danger-900: #700940,

  /* Basic colors - for backgrounds and borders and texts */

  color-basic-100: white,
  color-basic-200: #f7f8fa,
  color-basic-300: #edf0f4,
  color-basic-400: #dde1eb,
  color-basic-500: #c8cedb,
  color-basic-600: #a7b0c1,
  color-basic-700: #657084,
  color-basic-800: #2e384f,
  color-basic-900: #232a40,
  color-basic-1000: #1a1f33,
  color-basic-1100: #131729,

  /* Status colors states - focus, hover, default, active, disabled  */

  color-primary-focus: color-primary-700,
  color-primary-hover: color-primary-400,
  color-primary-default: color-primary-500,
  color-primary-active: color-primary-600,
  color-primary-disabled: color-primary-300,
  // ...
);
```

Each theme is divided in the following semantic groups:

- **Colors** 

- **Backgrounds & Borders** - each theme has 3 backgrounds (`basic`, `alternative`, `primary`) each of 4 shades and also 3 borders, each of 5 shades (backgrounds count + 1).
`basic` and `alternative` backgrounds and borders utilizes `basic` color shades a source. `primary` backgrounds and borders uses `primary` color.

- **Text Colors** - 


Below you can find a list of concepts a theme consist of, and how these variables affect the look & feel.

## Colors

All available color within the theme. Five semantic colors (`primary`, `success`, `info`, `warning`, `danger`) and `basic` color (backgrounds and texts).
Each color has a pallet of 9 shades, except for `basic`, which has 11 shades. These colors mostly used by `status` variants of the components.

## Backgrounds & Borders

## Text Colors

## Fonts & Text Styles

Eva is a customizable Design System based on Atomic Design Principles. All components are built based on basic elements with shared styles, connected with a single Visual Language.
Most importantly, Eva is built to be customizable, meaning architectural support of multiple themes across all components and supporting platforms.  

## General Theme Variables

## Implementations

Eva Design System is implemented for two platforms:

- Web - Nebular
- Mobile - [React Kitten](https://github.com/akveo/react-native-ui-kitten/)

Both implementations have single source of truth for styles, and unified theming system.

## Enterprise ready

Being a part of Eva ecosystem, Nebular is a great choice for Enterprise grade products, sharing ideas, process and implementation among multiple platforms. 


## Related Articles

- [Design System Rules](docs/auth/design-system-rules)
