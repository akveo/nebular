

**When**: You need to have multiple themes and change them in the run-time.

This setup assumes that you have gone through the *Normal Setup* steps.

1) Assuming you already have the `themes.scss` file with `default` theme from the previous step, let's add there a new theme, which will be based on the `cosmic` Nebular theme and named `dark`:

```scss
...

// add cosmic theme import below the default theme;
@import '~@nebular/theme/styles/themes/cosmic';

// and mark both themes as enabled 
$nb-enabled-themes: (default, dark);

...

// and change the variables you need, or simply leave the map empty to use the default values
// let's make it blue-ish instead of the default white color
$nb-themes: nb-register-theme((

  color-bg: #222222,
  shadow: 0 1px 2px 0 #000000,
  color-fg: #303030,
  layout-bg: #ededed,
), dark, cosmic);
```

So that your `themes.scss` file looks like this:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';
@import '~@nebular/theme/styles/themes/cosmic';

$nb-enabled-themes: (default, dark);

// default theme
$nb-themes: nb-register-theme((

  color-bg: #4ca6ff,
  shadow: 0 1px 2px 0 #3780c0,
  layout-bg: #ffffff,
  color-fg: #222222,
), default, default);


// dark theme
$nb-themes: nb-register-theme((

  color-bg: #222222,
  shadow: 0 1px 2px 0 #000000,
  color-fg: #303030,
  layout-bg: #ededed,
), dark, cosmic);

```

At this point when you enable your dark theme in the `src/app/app.module.ts`:
```typescript
@NgModule({
...
  imports: [
    ...
    NbThemeModule.forRoot({name: 'dark'}),
    ...
  ],
})
```
your page should look like this:

![image](assets/images/articles/dark-theme.png)

2) Now, to enable the magic of the `hot reload`, wrap all of your `*.component.scss` styles with the `nb-install-component` mixin like this:

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
<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    The `install-component` mixin 'covers' the `:host` declaration inside of it, meaning that you don't need to specify `:host` manually inside of `@include nb-install-component() {` 
    and styles written right inside of the mixing will be applied to the host.
  </div>
</div>

Done, now you can change a theme in the runtime. Here's how you can do this from a component:

```scss
// include the theme service
constructor(private themeService: NbThemeService) {
}

// change to dark
enableDarkTheme() {
  this.themeService.changeTheme('dark');
}
```
<hr class="section-end">

## Previous

- [Enabling Theme System (Basic setup)](#/docs/guides/enabling-theme-system-basic).
- [Enabling Theme System (Custom theme)](#/docs/guides/enabling-theme-system-custom).

## Next

- [Theme System Concepts](#/docs/concepts/theme-system).
- [Default Theme variables table](#/docs/themes/default).
- [Cosmic Theme variables table](#/docs/themes/cosmic).
