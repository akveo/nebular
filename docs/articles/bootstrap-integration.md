# Bootstrap Integration

Nebular provides additional module to override bootstrap selectors according our themes.
To enable bootstrap support you have to do the following:

- Install nebular bootstrap and bootstrap itself packages: 
```bash
npm i @nebular/bootstrap bootstrap
```

- Add bootstrap in `angular.json`: 
```json
"projects": {
  "your-project-name": {
    "architect": {
      "build": {
        "options": {
          "styles": [
            "node_modules/bootstrap/dist/css/bootstrap.css",
          ]
        }
      }
    }
  }
}
```

Then if you just want to use predefined themes you have to import prebuilt styles for required theme in `angular.json`:

```json
"projects": {
  "your-project-name": {
    "architect": {
      "build": {
        "options": {
          "styles": [
              "node_modules/@nebular/bootstrap/styles/prebuilt/cosmic.css",
              "node_modules/@nebular/bootstrap/styles/prebuilt/default.css",
              "node_modules/@nebular/bootstrap/styles/prebuilt/corporate.css",
          ]
        }
      }
    }
  }
}
```

Another way, if you need to customize themes you have to do the following steps:

- Import nebular bootstrap into `styles.scss`:
```scss
@import '~@nebular/bootstrap/styles/globals';
```

- Run `nb-bootstrap-global`:
```scss
@include nb-bootstrap-global();
```
 
## Related Articles

- [Enable Theme System](docs/guides/enable-theme-system)
- [Theme System Concepts](docs/guides/theme-system)
