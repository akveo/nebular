# RTL

All Nebular components support RTL out of the box.

The components that accept a position as a setting now also support logical start and end values, similar to flexbox. The value of start and end depends on the current layout direction. For LTR it's left and for RTL - right.
For instance, if we need the sidebar to be positioned logically depending on a language direction, then instead of setting it to left we can set its position to start:

```html
<nb-sidebar start></nb-sidebar>
```

Document direction could be set through the `NbThemeModule.forRoot` call. Supported values are `ltr` and `rtl`.

```typescript
@NgModule({
  imports: [
    NbThemeModule.forRoot(nbThemeOptions, nbJSThemes, nbMediaBreakpoints, 'rtl')
  ]
})
```
Default value is `ltr`.

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    Components must be placed inside of the `<nb-layout></nb-layout>` component to correctly support language direction.
  </div>
</div>

To help you add RTL support to your custom components, Nebular provides you with two scss mixins: `nb-lrt` and `nb-rtl`. You can use them to alter values of css properties, which don't support logical values, like paddings, margins, etc. You can pass single property and value as arguments, pass multiple statements as the content of mixin or both. For example:
```scss
:host {
  @include nb-ltr(padding-left, 1em);
  @include nb-rtl(padding-right, 1em);
}
```
```scss
:host {
  @include nb-ltr() {
    padding-left: 1em;
  };
  @include nb-rtl() {
    padding-right: 1em;
  };
}
```

Please note, the mixins are only available within component `:host` selector or `nb-install-component()` mixin if used.

If you need to change direction dynamically, get current value or listen to changes of direction, Nebular provides `NbLayoutDirectionService`.
