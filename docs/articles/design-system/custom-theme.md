# Create Custom Theme

Custom theme creation is a very similar process to [Theme Customization](docs/design-system/enable-customizable-theme).
Only in this case, we suggest following simple but very important rules so that we can minimize the number of necessary changes 
and avoid repeated code.

<div class="note note-info section-end">
  <div class="note-title">Setup Required</div>
  <div class="note-body">
    This guide assumes you already enabled [Theme Customization](docs/design-system/enable-customizable-theme)
    and reviewed [Eva Design System Theme](docs/design-system/eva-design-system-theme) rules.
  </div>
</div>

Before we start, let's pretend we want to create an `aquamarine` theme with a violet primary color. 
<hr>

## Select parent Theme

In order to minify the amount of work, parent theme selection is a very important step.
Though it is very simple - for colored and dark themes - use `dark` base theme, otherwise - `default` theme.
In our case `aquamarine` theme is a colored one, let's use `dark` as a parent.
<hr>

## Register new Theme

Now, let's register the new theme in `themes.scss`:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/dark';


$nb-themes: nb-register-theme((
  
  
), aquamarine, dark); // <- theme name and a parent theme

```

Next, find your `NbThemeModule.forRoot` declaration and change the value of the `name` setting:

```ts
  @NgModule({
    imports: [
      // ...
      NbThemeModule.forRoot({ name: 'aquamarine' }),
    ],
  }
```

Now the new theme is enabled, let's modify it.
<hr>

## Start with Basic
Basic shades are one of the most important as they are the source for backgrounds, borders and text colors.
In the dark theme, text colors utilize the upper part of the shades (whitish colors)
and backgrounds the lower part.

Let's modify them and put our aquamarine colors, starting with white for `color-basic-100` and finishing with almost black
for `color-basic-1100`:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/dark';

$nb-themes: nb-register-theme((
  color-basic-100: white,
  color-basic-200: #eefafc,
  color-basic-300: #e8f5fa,
  color-basic-400: #d6e6f2,
  color-basic-500: #c7dbeb,
  color-basic-600: #a9c0db,
  color-basic-700: #4f969e,
  color-basic-800: #336a77,
  color-basic-900: #295c66,
  color-basic-1000: #244555,
  color-basic-1100: #121a2b,
), aquamarine, dark);
```
<hr>

## Tweak backgrounds

In a case we need to tweak the color more accurately, we can change how basic colors are used.
For example, we can make the theme backgrounds and borders lighter, by using basic color lighter for one grade up:  

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/dark';

$nb-themes: nb-register-theme((
  color-basic-100: white,
  color-basic-200: #eefafc,
  color-basic-300: #e8f5fa,
  color-basic-400: #d6e6f2,
  color-basic-500: #c7dbeb,
  color-basic-600: #a9c0db,
  color-basic-700: #4f969e,
  color-basic-800: #336a77,
  color-basic-900: #295c66,
  color-basic-1000: #244555,
  color-basic-1100: #121a2b,
  
  background-basic-color-1: color-basic-700, // <- 800 by default
  background-basic-color-2: color-basic-800, // <- 900 by default
  background-basic-color-3: color-basic-900, // <- etc
  background-basic-color-4: color-basic-100,

  border-basic-color-1: color-basic-700,
  border-basic-color-2: color-basic-800,
  border-basic-color-3: color-basic-900,
  border-basic-color-4: color-basic-1000,
  border-basic-color-5: color-basic-1100,
), aquamarine, dark);
```
<hr>

## Adjust shadows

Since we changed backgrounds to a lighter ones, we might need to change elements shadow, making it lighter as well:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/dark';

$nb-themes: nb-register-theme((
  color-basic-100: white,
  color-basic-200: #eefafc,
  color-basic-300: #e8f5fa,
  color-basic-400: #d6e6f2,
  color-basic-500: #c7dbeb,
  color-basic-600: #a9c0db,
  color-basic-700: #4f969e,
  color-basic-800: #336a77,
  color-basic-900: #295c66,
  color-basic-1000: #244555,
  color-basic-1100: #121a2b,
  
  background-basic-color-1: color-basic-700,
  background-basic-color-2: color-basic-800,
  background-basic-color-3: color-basic-900,
  background-basic-color-4: color-basic-100,

  border-basic-color-1: color-basic-700,
  border-basic-color-2: color-basic-800,
  border-basic-color-3: color-basic-900,
  border-basic-color-4: color-basic-1000,
  border-basic-color-5: color-basic-1100,
  
  shadow: 0 0.5rem 1rem 0 rgba(25, 30, 51, 0.24), // <- lighter shadow
), aquamarine, dark);
```
<hr>

## Text Colors

Texts color may also be affected by the backgrounds change. In our case, `disabled` text is now the same
color as a background. Let's make it one shade lighter: 

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/dark';

$nb-themes: nb-register-theme((
  color-basic-100: white,
  color-basic-200: #eefafc,
  color-basic-300: #e8f5fa,
  color-basic-400: #d6e6f2,
  color-basic-500: #c7dbeb,
  color-basic-600: #a9c0db,
  color-basic-700: #4f969e,
  color-basic-800: #336a77,
  color-basic-900: #295c66,
  color-basic-1000: #244555,
  color-basic-1100: #121a2b,
  
  background-basic-color-1: color-basic-700,
  background-basic-color-2: color-basic-800,
  background-basic-color-3: color-basic-900,
  background-basic-color-4: color-basic-100,

  border-basic-color-1: color-basic-700,
  border-basic-color-2: color-basic-800,
  border-basic-color-3: color-basic-900,
  border-basic-color-4: color-basic-1000,
  border-basic-color-5: color-basic-1100,
  
  shadow: 0 0.5rem 1rem 0 rgba(25, 30, 51, 0.24),
  
  text-disabled-color: color-basic-600,  // <- 700 is default
), aquamarine, dark);
```
<hr>

## Primary Color

Lastly, let's make the final change and replace the primary blue color with desired violet one:
[Eva Colors](https://colors.eva.design) is a great tool to generate colors pallet from a given brand color.

```scss
$nb-themes: nb-register-theme((

  color-primary-100: #faf7ff, // <- primary violet shades
  color-primary-200: #ece3ff,
  color-primary-300: #d5bfff,
  color-primary-400: #b18aff,
  color-primary-500: #a16eff,
  color-primary-600: #7b51db,
  color-primary-700: #5a37b8,
  color-primary-800: #3e2494,
  color-primary-900: #29157a,

  color-basic-100: white,
  color-basic-200: #eefafc,
  color-basic-300: #e8f5fa,
  color-basic-400: #d6e6f2,
  color-basic-500: #c7dbeb,
  color-basic-600: #a9c0db,
  color-basic-700: #497d8e,
  color-basic-800: #336a77,
  color-basic-900: #295c66,
  color-basic-1000: #244555,
  color-basic-1100: #121a2b,

  background-basic-color-1: color-basic-700,
  background-basic-color-2: color-basic-800,
  background-basic-color-3: color-basic-900,
  background-basic-color-4: color-basic-100,

  border-basic-color-1: color-basic-700,
  border-basic-color-2: color-basic-800,
  border-basic-color-3: color-basic-900,
  border-basic-color-4: color-basic-1000,
  border-basic-color-5: color-basic-1100,

  shadow: 0 0.5rem 1rem 0 rgba(25, 30, 51, 0.24),

  text-disabled-color: color-basic-600,
), aquamarine, dark);
```
Simple as that, here's our result:

![image](assets/images/articles/design-system/aquamarine-theme.png)

That's it. In a similar way, the rest of the available theme variables could be changed to achieve the desired result.
Complete list of variables could be found under [Default Theme Variables](docs/design-system/default-theme) table.
<hr>

## Related Articles

- [Use Theme Variables](docs/design-system/use-theme-variables)
- [Enable Theme Customization](docs/design-system/enable-customizable-theme)
- [Enable CSS Properties Mode](docs/design-system/enable-css-properties-mode)
