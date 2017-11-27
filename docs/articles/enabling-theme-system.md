<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](#/docs/installation/based-on-starter-kit) then you already have the Advanced setup in place.
  </div>
</div>


## Very basic setup
**When**: You just need the default styles provided by Nebular (cosmic or default theme) and don't plan to use variables or hot-reload support.

1) Then you just need to include the CSS file of the theme into your `.angular-cli.json` file like this:

```

"styles": [
        "../node_modules/@nebular/theme/styles/prebuilt/cosmic.css", // or default.css
      ],

```

And that's it. In the future, if you need any of the advanced features - you can easily start using them by going through the Normal/Advanced setup steps.
<hr class="section-end">

## Normal setup
**When**: You need to be able to change theme-variables and want to use them in your code.

*Note*: the setup might look a bit verbose, but unfortunately angular-cli support on custom configurations is quite limited, hopefully with the future releases and plugins support this will be reduced significantly.

1) Create a `themes.scss` file with a Nebular theme declaration. We assume that the theme will be based on the `default` theme and we'll keep it as `default`.

```scss
// import Nebular Theme System and the default theme
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';

// and change some variables inside of the map
$nb-themes: nb-register-theme((

  color-bg: gray,
  color-fg: white,
), default, default); // let's leave it as default 

```


2) Now, find your `styles.scss` (or create one and add it into `.angular-cli.json` under `"styles": [..]`) and paste the following:

```scss
// this is your created themes.scss file, make sure the path to the file is correct
@import 'themes';

// framework component styles which will use your new theme
@import '~@nebular/theme/styles/globals';

// install the framework
@include nb-install() {
  @include nb-theme-global();
};

```


3) At this step you already can customize the variables to change components look and behavior. To be able to use these (or new) variables into your custom components, just add an import line into any `\*.component.scss` file:

```scss
@import '../../../@theme/styles/themes';

:host {

  background: nb-theme(card-bg); // and use it
}
``` 

<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    Variables are accessible simply using a call of nb-theme(variable-name) function.
  </div>
</div>

## Advanced setup
**When**: You need to have multiple themes and change them in the run-time.

This setup assumes that you have gone through the *Normal Setup* steps.

1) Assuming you already have the `themes.scss` file, let's add there a new theme, which will be based on the `cosmic` Nebular theme and named `dark`:

```scss
...

// add cosmic theme import below the default theme

@import '~@nebular/theme/styles/themes/default';
@import '~@nebular/theme/styles/themes/cosmic';

// and mark both themes as enabled 
$nb-enabled-themes: (default, cosmic);

...

// and change the variables you need, or simply leave the map empty to use the default values
$nb-themes: nb-register-theme((

  color-bg: black,
  color-fg: gray,
), dark, cosmic); 
```

So that your `themes.scss` file looks like this:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';
@import '~@nebular/theme/styles/themes/cosmic';

$nb-enabled-themes: (default, cosmic);

// default theme
$nb-themes: nb-register-theme((

  color-bg: gray,
  color-fg: white,
), default, default); 


// dark theme
$nb-themes: nb-register-theme((

  color-bg: black,
  color-fg: gray,
), dark, cosmic); 

```

2) Now, to enable the magic of the hot reload, wrap all of your `*.component.scss` styles with the `nb-install-component` mixin like this:

```scss

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

## Next

- [Theme System Concepts](#/docs/concepts/theme-system).
- [Default Theme variables table](#/docs/themes/default).
- [Cosmic Theme variables table](#/docs/themes/cosmic).
