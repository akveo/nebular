# Register Icon pack

Nebular comes with an `<nb-icon></nb-icon>` component that accepts an `icon="icon-name"` and `pack="icon-pack"` parameters.

By default, Nebular includes only a small and limited pack called `nebular-essentials`. This pack consists of essential icons, such as `close-outline`, `checkmark-outline`, etc that are required by the Nebular components (modals, accordions, etc).

## Eva Icons

In case you need to have more icons available, Nebular provides a `@nebular/eva-icons` pack with 480+ SVG icons.

Install the pack:

 ```sh
 npm i eva-icons @nebular/eva-icons
 ```

This command will install Eva Icons pack. Then register `NbEvaIconsModule` into your app module:
```ts
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  imports: [
    // ...
    NbEvaIconsModule,
  ],
})
export class AppModule { }  
```
Import `NbIconModule` into your feature module where you need to show the icon:
```ts
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [
    // ...
    NbIconModule,
  ],
})
export class PageModule { }
```

Importing `NbEvaIconsModule` also sets the Eva pack as the default pack, which means you can render a Eva icon without specifying the pack implicitly:

```html
<nb-icon icon="star"></nb-icon>
```

## 3rd-party/Custom CSS Pack

In case you need to use any other 3rd party CSS Icon pack, you can easily register it using `NbIconLibraries` service.

First, import css pack files the preferred way (usually in your `angular.json` file).
Then simply register the pack using `NbIconLibraries` service in you `app.component`:

```ts
  import { NbIconLibraries } from '@nebular/theme';

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
  }
```

`fa` is an icon prefix we can specify here, so that we don't need to repeat it during the icon usage:

```html
<nb-icon icon="star" pack="font-awesome"></nb-icon>
```


Lastly, we can set this pack as the default and not specify it implicitly while using `<nb-icon>`:
```ts
  import { NbIconLibraries } from '@nebular/theme';

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome'); // <---- set as default
  }
```

Now we can use `font-awesome` icons without specifying the pack:

```html
<nb-icon icon="star"></nb-icon>
```

## 3rd-party/Custom SVG Pack

If the icons are provided as SVG elements, you can register the pack as follows:

```ts
  import { NbIconLibraries } from '@nebular/theme';

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconsLibrary.registerSvgPack('social-networks', {
          'facebook': '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"> ... </svg>',
          'twitter': '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"> ... </svg>',
          // ...
    });
  }
```

Where you can provide a map of icons, specifying the name and SVG icon string.
And then use it as any other icon:

```html
<nb-icon icon="facebook" pack="social-networks"></nb-icon>
``` 

## Related Articles

- [NbIconComponent](docs/components/icon/overview)
