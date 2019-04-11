# Bootstrap Integration

Nebular provides an additional module to override bootstrap styles according our themes.

<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](docs/guides/install-based-on-starter-kit) then you already have the bootstrap module in place.
  </div>
</div>

To enable bootstrap support you have to do the following:

- Install nebular bootstrap and bootstrap itself packages: 

```bash
npm i @nebular/bootstrap@3 bootstrap
```

- Add bootstrap in `angular.json`: 

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.css",
]
```

Then if you just want to use predefined themes you have to import prebuilt styles for required theme in `angular.json`:

```json
"styles": [
  "node_modules/@nebular/bootstrap/styles/prebuilt/cosmic.css",
  "node_modules/@nebular/bootstrap/styles/prebuilt/default.css",
  "node_modules/@nebular/bootstrap/styles/prebuilt/corporate.css",
]
```

Another way, if you need to customize themes you have to do the following steps:

- Import nebular bootstrap into `styles.scss`:

```scss
@import '~@nebular/bootstrap/styles/globals';
```

- Include `nb-bootstrap-global` in styles.scss:

```scss
@import '~@nebular/bootstrap/styles/globals';

@include nb-install() {
  @include nb-bootstrap-global();
}
```

And that's it. Bootstrap is installed now.

<hr>
 
## Related Articles

- [Enable Theme System](docs/guides/enable-theme-system)
- [Theme System Concepts](docs/guides/theme-system)
