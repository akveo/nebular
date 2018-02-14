This section describes steps to customize default theme provided by Nebular. We assume that you already did [Basic setup](#/docs/ngxadmin-tutorials/themes-tutorial-basic-setup) and have working app with installed Nebular and default them. 
<hr class="section-end">

## Steps:

1) In the `src` of you project create `themes.scss` and paste following:

```scss
@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';

$nb-themes: nb-register-theme((
  color-bg: #4ca6ff,
  shadow: 0 1px 2px 0 #3780c0,
  layout-bg: #ffffff,
  color-fg: #222222
), default, default); // let's leave it as default
```
- Import Nebular Theme System and the default theme
- Change the variables you need, or simply leave the map empty to use the default values. To be able to detect changes let's make it blue-ish instead of the default white color
- For now, we leave theme name as default but you could specify it according to your point of view.

 <hr class="section-end">
 
2) Now, find your styles.scss (or create one in the `src`) and paste the following:

```typescript
@import 'themes';
@import '~@nebular/theme/styles/globals';

@include nb-install() {
  @include nb-theme-global();
};
```
* Import `themes.scss` file created in first step
* Import framework component styles which will use your new theme
* Install the framework with usage of [mixin](http://sass-lang.com/guide#topic-6) provided by Nebular


<hr class="section-end">

3) Now we are ready to spesify new theme to app config. In the `.angular-cli.json` let's replace
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
* this is [SCSS](http://sass-lang.com/guide) which you have create recently.

That's it, now app could be reloaded to see changes or run it by `npm start` with [CLI](https://github.com/angular/angular-cli) and open in your browser `http://localhost:4200/`. At this point, you can override the default value of variables in the `src/themes.scss` and make app appearance according to your vision.

![image](assets/images/articles/smart-house-blue-theme.png)
<hr class="section-end">

## Previous
* [Basic setup](#/docs/ngxadmin-tutorials/themes-tutorial-basic-setup).

## Next
* [Themes hot-reload](#/docs/ngxadmin-tutorials/themes-tutorial-hot-reload).
* [Advanced Theme System configuration](#/docs/guides/enabling-theme-system).
* [Deploying to production server](#/docs/guides/server-deployment).

## Addition info:
* [Enabling Theme System (Custom theme)](#/docs/guides/enabling-theme-system-custom-theme)
