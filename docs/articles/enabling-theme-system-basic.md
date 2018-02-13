<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](#/docs/installation/based-on-starter-kit) then you already have the Advanced setup in place.
  </div>
</div>

**When**: You just need the default styles provided by Nebular (cosmic or default theme) and don't plan to use variables or hot-reload support.

1) Then you just need to include a CSS file of a theme you want to use into your `.angular-cli.json` file like this:

```

"styles": [
        "../node_modules/@nebular/theme/styles/prebuilt/cosmic.css", // or default.css
      ],

```

And that's it. In the future, if you need any of the advanced features - you can easily start using them by going through the Custom theme/Hot reload setup steps.
<hr class="section-end">

## Next

- [Enabling Theme System (Custom theme)](#/docs/guides/enabling-theme-system-custom-theme).
- [Enabling Theme System (Hot reload)](#/docs/guides/enabling-theme-system-hot-reload).
- [Theme System Concepts](#/docs/concepts/theme-system).
- [Default Theme variables table](#/docs/themes/default).
- [Cosmic Theme variables table](#/docs/themes/cosmic).
