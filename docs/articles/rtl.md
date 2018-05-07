All Nebular components were updated to support RTL out of the box.

Now every component, that previously could be positioned via some setting, besides old `left` and `right` options, also support logical `start` and `end` properties, similar to flexbox. Value of `start` and `end` depends on current layout direction. For LTR it's left, for RTL - right.

You can set document direction via last parameter `forRoot` method of `NbThemeModule`. Supported values are 'ltr' and 'rtl'.
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
    1. Works only in layout component
  </div>
</div>

If you need to change direction dynamically, get current value or listen to changes of direction, Nebular provides `NbLayoutDirectionService`. 
<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    1. Listen only to changes made through service itself
    2. Works only in layout component.
  </div>
</div>

To help you add RTL support to your custom components, Nebular provides you with two scss mixins: `nb-lrt` and `nb-rtl`. You can use them to alter values of css properties, which don't support logical values, like paddings, margins, etc. You can pass single property and value as arguments, pass multiple statements as a content of mixin or both. For example:
```scss
:host {
  nb-ltr(padding-left, 1em);
  nb-rtl(padding-right, 1em);
}
```
```scss
:host {
  nb-ltr() {
    padding-left: 1em;
  };
  nb-rtl() {
    padding-right: 1em;
  };
}
```

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    One thing to note, mixins should be called only inside of `:host` mixin or `nb-install-component`.
  </div>
</div>
