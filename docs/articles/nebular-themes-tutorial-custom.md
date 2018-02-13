This section describes steps to create new Angular project with Nebular theme framework.
Please take a look 
[Theme System](https://akveo.github.io/nebular/#/docs/concepts/theme-system) in a first to be familiar with concept.

By the end of the tutorial you will be able to do the following:
* Use you own styles based on Nebular (cosmic or default theme)
<hr class="section-end">

## Steps:

1) In the `src` of you project create `themes.scss` and paste following:

```scss
// import Nebular Theme System and the default theme
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';

// and change the variables you need, or simply leave the map empty to use the default values
// let's make it blue-ish instead of the default white color
$nb-themes: nb-register-theme((
  color-bg: #4ca6ff,
  shadow: 0 1px 2px 0 #3780c0,
  layout-bg: #ffffff,
  color-fg: #222222
), default, default); // let's leave it as default
```
 <hr class="section-end">
 
2) Now, find your styles.scss (or create one in the `src`) and paste the following:

```typescript
// this is your created themes.scss file
@import 'themes';

// framework component styles which will use your new theme
@import '~@nebular/theme/styles/globals';

// install the framework
@include nb-install() {
  @include nb-theme-global();
};
```
<hr class="section-end">

3) In the `.angular-cli.json` let's replace
```json
{
...
  "apps": [
    {
     ...
      "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.css",
        "../node_modules/@nebular/theme/styles/prebuilt/default.css"
      ],
```
to 
```json
{
  ...
  },
  "apps": [
    {
     ...
      "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.css",
        "styles.scss"
      ],
```

That's it, now app could be reloaded to see changes. Also you can override default value of variables in the `src/themes.scss`.

![image](assets/images/articles/blue-theme.png)
<hr class="section-end">

## Addition info:
* [Enabling Theme System (Custom theme)](#/docs/guides/enabling-theme-system-custom-theme)

## Previous
- [Themes Tutorial. Basic setup](#/docs/ngxadmin-tutorials/themes-tutorial-basic-setup).

## Next
- [Themes Tutorial. Hot reload](#/docs/ngxadmin-tutorials/themes-tutorial-hot-reload).
- [Advanced Theme System configuration](#/docs/guides/enabling-theme-system).
- [Deploying to production server](#/docs/guides/server-deployment).
