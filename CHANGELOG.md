<a name="4.0.0-beta.0"></a>
# [4.0.0-beta.0](https://github.com/akveo/nebular/compare/v3.4.2...v4.0.0-beta.0) (2019-04-01)


### Code Refactoring

* **theme:** remove use of scss functions ([#1256](https://github.com/akveo/nebular/issues/1256)) ([164a0c8](https://github.com/akveo/nebular/commit/164a0c8)), closes [#1228](https://github.com/akveo/nebular/issues/1228)


### Features

* **icons:** new `nb-icon` component, icons library, and [@nebular](https://github.com/nebular)/eva-icons package ([#1319](https://github.com/akveo/nebular/issues/1319)) ([435a6ac](https://github.com/akveo/nebular/commit/435a6ac))
* **theme:** css variables support ([#1257](https://github.com/akveo/nebular/issues/1257)) ([d1123e2](https://github.com/akveo/nebular/commit/d1123e2)), closes [#46](https://github.com/akveo/nebular/issues/46)


### BREAKING CHANGES

* **icons:** Starting from version 4.0, Nebular introduces new `nb-icon` component and `NbIconLibraries` service to host SVG and Font icon packs. As a breaking change, Nebular moves from `nebular-icons` package to much more popular [Eva Icons pack](https://akveo.github.io/eva-icons/) consisting of 480+ beautiful SVG icons. We believe this will bring more quality and variety to interfaces based on Nebular.

Now all Nebular components internally use `<nb-icon></nb-icon>` component utilizing Eva Icons SVG icons. More details on [nb-icon](https://akveo.github.io/nebular/docs/components/icon) component.

There are two ways to upgrade:
**Migrate to Eva Icons** (recommended):
1) install Eva Icons Nebular package `npm i @nebular/eva-icons`
2) register `NbEvaIconsModule` in the `app.module.ts`
```
import { NbEvaIconsModule } form '@nebular/eva-icons';

@NgModule({
  imports: [
  	// ...
    NbEvaIconsModule,
  ],
})
```
3) Search for all usages of `<span icon="nb-*"` or ``<i icon="nb-*"``and replace with `<nb-icon icon="icon-name"></nb-icon>`. Full icons list https://akveo.github.io/eva-icons/.

4) Search for `icon: 'nb-*'` references in properties for such components as Menu, Actions, Tabs, etc. Replace those with `icon: 'icon-name'`. Please note, there is no need to specify any icon prefix (such as `eva-` or `nb-`) since prefix is specified when the icon package is registered in Nebular.

4) Update styles if necessary.

5) if you have `nebular-icons` installed, remove the package and all references.

**Continue using nebular-icons**
This option is also possible, but please note, Nebular Component will still use Eva Icons pack for internal component icons, such as `close`, `arrow-down`, `arrow-up`, etc.

1) Register nebular-icons as a pack for Nebular in your `app.component.ts`
```
  import { NbIconLibraries } from '@nebular/theme';

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('nebular', { iconClassPrefix: 'nb' });
    this.iconLibraries.setDefaultPack('nebular');
  }
```

3) Search for all usages of `<span icon="nb-*"` or ``<i icon="nb-*"`` and replace with `<nb-icon icon="icon-name"></nb-icon>` without the `nb-` prefix  since prefix is specified when the icon package is registered in Nebular.

4) Search for `icon: 'nb-*'` references in properties for such components as Menu, Actions, Tabs, etc. Replace those with `icon: 'icon-name'` without `nb-` prefix since it is unnecessary and covered under the hood.

Please open an issue if you have any questions or having difficulties to migrate.


* **theme:** - calendar - use primary button in cosmic theme
- checkbox - `opacity` instead of `lightning`
- context-menu, popover, datepicker - `calc` instead of `round` and scss calculations
- input - `opacity` for placeholder instead of `lightning`
- tabs - remove gradient for tab bottom separator in cosmic theme
- toastr - use `background-color` instead of the gradient in cosmic theme
- text colors are now used from success/primary/warning/etc colors
- add color palette instead of generating colors using scss-functions, an example for `primary`
`color-primary-200`
`color-primary-300`
`color-primary-400`
`color-primary-600`
`color-primary-700`

`create-colors-palette()` scss function that can be used during the theme installation process to generate palette automatically



<a name="3.4.2"></a>
## [3.4.2](https://github.com/akveo/nebular/compare/v3.4.1...v3.4.2) (2019-03-31)

### Highlights
Fixed [regressing in all overlay components failing](https://github.com/akveo/nebular/issues/1289) to open after host component being destroyed and re-created.

### Bug Fixes

* **cdk:**  destroy overlay triggers manually ([#1316](https://github.com/akveo/nebular/pull/1316)) ([77b737](https://github.com/akveo/nebular/commit/77b737)), closes [#1292](https://github.com/akveo/nebular/issues/1292), [#1290](https://github.com/akveo/nebular/issues/1290), [#1273](https://github.com/akveo/nebular/issues/1273), [#1289](https://github.com/akveo/nebular/issues/1289)
* **docs:** keep nb-fs-icon in tree-grid showcase only ([#1330](https://github.com/akveo/nebular/issues/1330)) ([0e1f432](https://github.com/akveo/nebular/commit/0e1f432))
* **menu:** highlight when active anchors ([#1034](https://github.com/akveo/nebular/issues/1034)) ([c14215a](https://github.com/akveo/nebular/commit/c14215a)), closes [#875](https://github.com/akveo/nebular/issues/875)
* **select:** prevent change detection of destroyed option ([#1329](https://github.com/akveo/nebular/issues/1329)) ([9e2245f](https://github.com/akveo/nebular/commit/9e2245f))


<a name="3.4.1"></a>
## [3.4.1](https://github.com/akveo/nebular/compare/v3.4.0...v3.4.1) (2019-03-18)


### Bug Fixes

* **context-menu:** updated context menu arrow left position calculation ([#1268](https://github.com/akveo/nebular/issues/1268)) ([0db8c2c](https://github.com/akveo/nebular/commit/0db8c2c)), closes [#973](https://github.com/akveo/nebular/issues/973)
* **date service:** prevent format calls if date isn't passed ([#1291](https://github.com/akveo/nebular/issues/1291)) ([a3d6035](https://github.com/akveo/nebular/commit/a3d6035))
* **datepicker:**  start from date typed in input ([#1300](https://github.com/akveo/nebular/issues/1300)) ([dfc75f0](https://github.com/akveo/nebular/commit/dfc75f0))
* **docs:** add search container class ([#1270](https://github.com/akveo/nebular/issues/1270)) ([e1a84f4](https://github.com/akveo/nebular/commit/e1a84f4))
* **select:** update selected after cd run is finished ([#1299](https://github.com/akveo/nebular/issues/1299)) ([2a1f113](https://github.com/akveo/nebular/commit/2a1f113))
* **window:** Fixed window.component.ts creating incorrect context ([#1266](https://github.com/akveo/nebular/issues/1266)) ([30f4a5d](https://github.com/akveo/nebular/commit/30f4a5d))


### Features

* **playground:** add without-styles folder for bootstrap like use-cases ([#1271](https://github.com/akveo/nebular/issues/1271)) ([8e852ca](https://github.com/akveo/nebular/commit/8e852ca))
* **smoke:** include packages-smoke update into release ([#1258](https://github.com/akveo/nebular/issues/1258)) ([8db4b29](https://github.com/akveo/nebular/commit/8db4b29))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/akveo/nebular/compare/v3.3.0...v3.4.0) (2019-02-25)


### Bug Fixes

* **datepicker:** make it valid in case of empty input ([#1247](https://github.com/akveo/nebular/issues/1247)) ([799b8b8](https://github.com/akveo/nebular/commit/799b8b8)), closes [#1182](https://github.com/akveo/nebular/issues/1182)
* **docs:** fix password strategy link ([#1245](https://github.com/akveo/nebular/issues/1245)) ([c71d9fd](https://github.com/akveo/nebular/commit/c71d9fd))


### Dev Features

* **route-tabset:** configurable routerLinkActiveOptions ([#1239](https://github.com/akveo/nebular/issues/1239)) ([3cf29d8](https://github.com/akveo/nebular/commit/3cf29d8))
* **tree-grid:** allow specify getters for node properties ([#1254](https://github.com/akveo/nebular/issues/1254)) ([a263a2e](https://github.com/akveo/nebular/commit/a263a2e))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/akveo/nebular/compare/v3.2.1...v3.3.0) (2019-02-18)


### Highlights

New [Tree Grid](https://akveo.github.io/nebular/docs/components/tree-grid/overview) component is here! :palm_tree:

### Bug Fixes

* **auth:** allow empty logout endpoint ([#1211](https://github.com/akveo/nebular/issues/1211)) ([564138d](https://github.com/akveo/nebular/commit/564138d))
* **datepicker:** date fns date format ([#1172](https://github.com/akveo/nebular/issues/1172)) ([257eb9a](https://github.com/akveo/nebular/commit/257eb9a))
* **dialog:** accept partial of component in NbDialogService open context  ([#1175](https://github.com/akveo/nebular/issues/1175)) ([9a5f4d9](https://github.com/akveo/nebular/commit/9a5f4d9)), closes [#1173](https://github.com/akveo/nebular/issues/1173)
* **docs:** footer email link ([#1206](https://github.com/akveo/nebular/issues/1206)) ([2e44bbc](https://github.com/akveo/nebular/commit/2e44bbc))
* **layout:** typo in basic usage example ([#1213](https://github.com/akveo/nebular/issues/1213)) ([6b21fe3](https://github.com/akveo/nebular/commit/6b21fe3)), closes [#1212](https://github.com/akveo/nebular/issues/1212)
* **menu:** correct example property usage ([#1216](https://github.com/akveo/nebular/issues/1216)) ([87ecccf](https://github.com/akveo/nebular/commit/87ecccf))
* **security:** make config work with strict ts mode ([#1215](https://github.com/akveo/nebular/issues/1215)) ([7c78d6c](https://github.com/akveo/nebular/commit/7c78d6c)), closes [#1166](https://github.com/akveo/nebular/issues/1166)
* **toastr:** recreate container if it's not attached to dom ([#1224](https://github.com/akveo/nebular/issues/1224)) ([3343136](https://github.com/akveo/nebular/commit/3343136)), closes [#1099](https://github.com/akveo/nebular/issues/1099)


### Features

* **context-menu:** add dynamic inputs ([#1221](https://github.com/akveo/nebular/issues/1221)) ([9f8d659](https://github.com/akveo/nebular/commit/9f8d659)), closes [#1101](https://github.com/akveo/nebular/issues/1101) [#1073](https://github.com/akveo/nebular/issues/1073)
* **docs:** [@docs-private](https://github.com/docs-private) support ([#1231](https://github.com/akveo/nebular/issues/1231)) ([dc33127](https://github.com/akveo/nebular/commit/dc33127))
* **theme:** multiple values for nb-(except-)for-theme ([#1218](https://github.com/akveo/nebular/issues/1218)) ([6c9e11c](https://github.com/akveo/nebular/commit/6c9e11c))
* **theme:** add new TreeGrid component ([#1226](https://github.com/akveo/nebular/issues/1226)) ([6c9e11c](https://github.com/akveo/nebular/commit/3d64818))


<a name="3.2.1"></a>
## [3.2.1](https://github.com/akveo/nebular/compare/v3.2.0...v3.2.1) (2019-01-31)


### Bug Fixes

* **popover:** get back default 15px offset ([#1201](https://github.com/akveo/nebular/issues/1201)) ([f7433e7](https://github.com/akveo/nebular/commit/f7433e7))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/akveo/nebular/compare/v3.1.0...v3.2.0) (2019-01-31)

Popover and Tooltip components can accept dynamic :rocket: content through bindings or code.

### Bug Fixes

* **docs:** prevent scrolling when user scroll ([#982](https://github.com/akveo/nebular/issues/982)) ([bc2ab1d](https://github.com/akveo/nebular/commit/bc2ab1d)), closes [#810](https://github.com/akveo/nebular/issues/810)
* **layout:** set document dir directly ([#1164](https://github.com/akveo/nebular/issues/1164)) ([37eaea7](https://github.com/akveo/nebular/commit/37eaea7))
* **popover:** fix template context not being passed, update cdk to 7.2.1 ([#1153](https://github.com/akveo/nebular/issues/1153)) ([c83188c](https://github.com/akveo/nebular/commit/c83188c)), closes [#1084](https://github.com/akveo/nebular/issues/1084) [#848](https://github.com/akveo/nebular/issues/848)
* **router-tabset:** navigate using router link ([#1146](https://github.com/akveo/nebular/issues/1146)) ([cb1c21e](https://github.com/akveo/nebular/commit/cb1c21e)), closes [#188](https://github.com/akveo/nebular/issues/188)
* **search:** emit activate and deactivate events ([#1162](https://github.com/akveo/nebular/issues/1162)) ([67c5718](https://github.com/akveo/nebular/commit/67c5718))
* **tooltip:** fix tooltip not being hide + tests ([#1123](https://github.com/akveo/nebular/issues/1123)) ([9360a4b](https://github.com/akveo/nebular/commit/9360a4b))


### Features

* **action:** provide new attributes for link and title ([#1046](https://github.com/akveo/nebular/issues/1046)) ([30bd394](https://github.com/akveo/nebular/commit/30bd394)), closes [#814](https://github.com/akveo/nebular/issues/814)
* **context-menu:** add `nbContextMenuTrigger` parameter ([#1139](https://github.com/akveo/nebular/issues/1139)) ([27b291e](https://github.com/akveo/nebular/commit/27b291e)), closes [#1112](https://github.com/akveo/nebular/issues/1112)
* **overlay:** add noop trigger strategy ([#1133](https://github.com/akveo/nebular/issues/1133)) ([1e43929](https://github.com/akveo/nebular/commit/1e43929))
* **popover:** add ability for dynamic input ([#1149](https://github.com/akveo/nebular/issues/1149)) ([d427e59](https://github.com/akveo/nebular/commit/d427e59)), closes [#953](https://github.com/akveo/nebular/issues/953) [#1142](https://github.com/akveo/nebular/issues/1142)
* **stepper:** add disable step navigation setting ([#1155](https://github.com/akveo/nebular/issues/1155)) ([e1503cc](https://github.com/akveo/nebular/commit/e1503cc)), closes [#902](https://github.com/akveo/nebular/issues/902)
* **stepper:** add linear mode ([#1151](https://github.com/akveo/nebular/issues/1151)) ([db5d214](https://github.com/akveo/nebular/commit/db5d214)), closes [#1040](https://github.com/akveo/nebular/issues/1040)
* **tabs:** add `disabled` property ([#1141](https://github.com/akveo/nebular/issues/1141)) ([ea7b209](https://github.com/akveo/nebular/commit/ea7b209)), closes [#387](https://github.com/akveo/nebular/issues/387)
* **tooltip:** add new `nbTooltipTrigger` parameter ([#1138](https://github.com/akveo/nebular/issues/1138)) ([113d3b0](https://github.com/akveo/nebular/commit/113d3b0))
* **tooltip:** dynamic inputs support ([#1184](https://github.com/akveo/nebular/issues/1184)) ([9ce7019](https://github.com/akveo/nebular/commit/9ce7019)), closes [#1052](https://github.com/akveo/nebular/issues/1052) [#1159](https://github.com/akveo/nebular/issues/1159)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/akveo/nebular/compare/v3.0.1...v3.1.0) (2018-12-31) :christmas_tree:

Happy New Year!

### Bug Fixes

* **datepicker:** fix datepicker format not available error ([#1117](https://github.com/akveo/nebular/issues/1117)) ([83cda23](https://github.com/akveo/nebular/commit/83cda23)), closes [#1088](https://github.com/akveo/nebular/issues/1088)
* **docs:** add missed backtick ([#1069](https://github.com/akveo/nebular/issues/1069)) ([3324fd5](https://github.com/akveo/nebular/commit/3324fd5))
* **docs:** remove rc version mention ([#1068](https://github.com/akveo/nebular/issues/1068)) ([ba1983c](https://github.com/akveo/nebular/commit/ba1983c))
* **layout:** prevent dom api calls on server ([#1107](https://github.com/akveo/nebular/issues/1107)) ([7511bb0](https://github.com/akveo/nebular/commit/7511bb0)), closes [#1060](https://github.com/akveo/nebular/issues/1060)
* **oauth2:** body requests in x-www-form-urlencoded ([#1066](https://github.com/akveo/nebular/issues/1066)) ([3ee11f2](https://github.com/akveo/nebular/commit/3ee11f2))
* **popover:** null check the ref before disposing ([#1086](https://github.com/akveo/nebular/issues/1086)) ([b3f7d39](https://github.com/akveo/nebular/commit/b3f7d39))
* **select:** options text selection disabled ([#1033](https://github.com/akveo/nebular/issues/1033)) ([fef2a9a](https://github.com/akveo/nebular/commit/fef2a9a))
* **theme:** check ref before detaching ([#1116](https://github.com/akveo/nebular/issues/1116)) ([af58d3f](https://github.com/akveo/nebular/commit/af58d3f))
* **theme:** fix normalize import to not include file type extension ([#1114](https://github.com/akveo/nebular/issues/1114)) ([40fa356](https://github.com/akveo/nebular/commit/40fa356))


### Features

* **menu:** add an option to set skipLocationChange ([#1043](https://github.com/akveo/nebular/issues/1043)) ([3d3ee03](https://github.com/akveo/nebular/commit/3d3ee03)), closes [#1028](https://github.com/akveo/nebular/issues/1028)
* **playground:** components list ([#1106](https://github.com/akveo/nebular/issues/1106)) ([4ab7508](https://github.com/akveo/nebular/commit/4ab7508)), closes [#1077](https://github.com/akveo/nebular/issues/1077)
* **toastr:** show method now returns toast reference ([#1058](https://github.com/akveo/nebular/issues/1058)) ([aeeedf1](https://github.com/akveo/nebular/commit/aeeedf1))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/akveo/nebular/compare/v3.0.0...v3.0.1) (2018-12-13)


### Bug Fixes

* **button:** return text color on focus ([#1030](https://github.com/akveo/nebular/issues/1030)) ([230c83e](https://github.com/akveo/nebular/commit/230c83e))
* **popover:** inner triangle size ([#1020](https://github.com/akveo/nebular/issues/1020)) ([fe078c7](https://github.com/akveo/nebular/commit/fe078c7))
* **select:** disable layout scrolling ([#1012](https://github.com/akveo/nebular/issues/1012)) ([1bd8214](https://github.com/akveo/nebular/commit/1bd8214)), closes [#992](https://github.com/akveo/nebular/issues/992)
* **select:** resubscribe on options changes ([#1009](https://github.com/akveo/nebular/issues/1009)) ([949b050](https://github.com/akveo/nebular/commit/949b050))
* **window:** reattach overlay after window expand ([#1022](https://github.com/akveo/nebular/issues/1022)) ([4b9c648](https://github.com/akveo/nebular/commit/4b9c648))


### Features

* **chat:** add `scrollBottom` chat option ([#1001](https://github.com/akveo/nebular/issues/1001)) ([d393f33](https://github.com/akveo/nebular/commit/d393f33)), closes [#921](https://github.com/akveo/nebular/issues/921)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/akveo/nebular/compare/v2.0.2...v3.0.0) (2018-11-15)


### Bug Fixes

* **overlay:** hover trigger stop fire show if container already exists ([#947](https://github.com/akveo/nebular/issues/947)) ([2988a4b](https://github.com/akveo/nebular/commit/2988a4b))
* **select:** add type button, stop form submitting ([#945](https://github.com/akveo/nebular/issues/945)) ([255fca9](https://github.com/akveo/nebular/commit/255fca9))
* **sidebar:** expand if not compacted or collapsed ([#984](https://github.com/akveo/nebular/issues/984)) ([33a0990](https://github.com/akveo/nebular/commit/33a0990))
* **theme:** provide component factory resolver in tooltip ([#981](https://github.com/akveo/nebular/issues/981)) ([57777f8](https://github.com/akveo/nebular/commit/57777f8)), closes [#979](https://github.com/akveo/nebular/issues/979)
* **toastr:** animations in firefox and edge ([#944](https://github.com/akveo/nebular/issues/944)) ([27e4a6a](https://github.com/akveo/nebular/commit/27e4a6a)), closes [#865](https://github.com/akveo/nebular/issues/865)


### Features

* **datepicker:** throw error when setting format for native date ([#986](https://github.com/akveo/nebular/issues/986)) ([3e9df5d](https://github.com/akveo/nebular/commit/3e9df5d))
* **docs:** add eva icons link in the footer ([#963](https://github.com/akveo/nebular/issues/963)) ([c230986](https://github.com/akveo/nebular/commit/c230986))
* **theme:** ng-add schematic ([#942](https://github.com/akveo/nebular/issues/942)) ([5d5a874](https://github.com/akveo/nebular/commit/5d5a874))


### BREAKING CHANGES

* Angular 7+ now required.



<a name="2.0.2"></a>
## [2.0.2](https://github.com/akveo/nebular/compare/v2.0.1...v2.0.2) (2018-10-23)


### Bug Fixes

* **auth:** don't import child routes as it will rewrite the app routes ([#920](https://github.com/akveo/nebular/issues/920)) ([d054a73](https://github.com/akveo/nebular/commit/d054a73))
* **auth:** don't import http module ([#919](https://github.com/akveo/nebular/issues/919)) ([995de58](https://github.com/akveo/nebular/commit/995de58)), closes [#631](https://github.com/akveo/nebular/issues/631)
* **calendar:** show day in today's date ([#899](https://github.com/akveo/nebular/issues/899)) ([e023aa3](https://github.com/akveo/nebular/commit/e023aa3))
* **checkbox:** hide check mark when unchecked and disabled ([#863](https://github.com/akveo/nebular/issues/863)) ([c7205d4](https://github.com/akveo/nebular/commit/c7205d4)), closes [#862](https://github.com/akveo/nebular/issues/862)
* **docs:** fix dead links and code examples ([#905](https://github.com/akveo/nebular/issues/905)) ([d8307c9](https://github.com/akveo/nebular/commit/d8307c9))
* **form controls:** mark as touched ([#864](https://github.com/akveo/nebular/issues/864)) ([e06d3a7](https://github.com/akveo/nebular/commit/e06d3a7))
* **nbButton:** set disabled DOM property ([#871](https://github.com/akveo/nebular/issues/871)) ([23a709d](https://github.com/akveo/nebular/commit/23a709d))
* **oauth2:**  grant_type now sends credentials in x-www-form-urlencoded form ([#832](https://github.com/akveo/nebular/issues/832)) ([57fda28](https://github.com/akveo/nebular/commit/57fda28)), closes [#716](https://github.com/akveo/nebular/issues/716)
* **overlay:** fix click trigger ([#912](https://github.com/akveo/nebular/issues/912)) ([08c2eb6](https://github.com/akveo/nebular/commit/08c2eb6)), closes [#907](https://github.com/akveo/nebular/issues/907)
* **select:** run change detection after setting initial value ([#898](https://github.com/akveo/nebular/issues/898)) ([5cf94f2](https://github.com/akveo/nebular/commit/5cf94f2))
* **theme:** fix sidebar shadow styles for Safari ([#909](https://github.com/akveo/nebular/issues/909)) ([031b1e6](https://github.com/akveo/nebular/commit/031b1e6)), closes [#562](https://github.com/akveo/nebular/issues/562)
* **theme:** remove a fixed content height ([#882](https://github.com/akveo/nebular/issues/882)) ([a85eaf2](https://github.com/akveo/nebular/commit/a85eaf2)), closes [#836](https://github.com/akveo/nebular/issues/836)
* **tabset:** add style incapsulation for tabset components ([#911](https://github.com/akveo/nebular/issues/911)) ([33162af](https://github.com/akveo/nebular/commit/33162af)), closes [#561](https://github.com/akveo/nebular/issues/561)



<a name="2.0.1"></a>
## [2.0.1](https://github.com/akveo/nebular/compare/v2.0.0...v2.0.1) (2018-10-03)


### Bug Fixes

* **datepicker:** fix datepicker spec ([#850](https://github.com/akveo/nebular/issues/850)) ([a69e681](https://github.com/akveo/nebular/commit/a69e681))
* **playground:** use nebular buttons in examples ([#849](https://github.com/akveo/nebular/issues/849)) ([b8c3148](https://github.com/akveo/nebular/commit/b8c3148))
* **theme:** fix overlay components providers import ([#858](https://github.com/akveo/nebular/issues/858)) ([843a6c6](https://github.com/akveo/nebular/commit/843a6c6))
* **theme:** inline cdk styles ([#857](https://github.com/akveo/nebular/issues/857)) ([e218df4](https://github.com/akveo/nebular/commit/e218df4)), closes [#856](https://github.com/akveo/nebular/issues/856)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/akveo/nebular/compare/2.0.0-rc.10...2.0.0) (2018-10-02)

### Highlights

Nebular 2.0 is stable now! After 10 release candidates and a year of work we finally made it with a great help of Nebular community and we cannot be more grateful for all of your contributions! :tada: 


### Bug Fixes

* **auth:**  fix OAuth2 strategy grant_type password to send username, not email ([#659](https://github.com/akveo/nebular/issues/659)) ([3a708dd](https://github.com/akveo/nebular/commit/3a708dd)), closes [#653](https://github.com/akveo/nebular/issues/653)
* **auth:** fix `isAuthenticatedOrRefresh` to not refresh token with no value ([#708](https://github.com/akveo/nebular/issues/708)) ([b29418f](https://github.com/akveo/nebular/commit/b29418f))
* **button:** fix outline button ([0bcad95](https://github.com/akveo/nebular/commit/0bcad95))
* **calendar:** use nbButton in calendar navigation ([#837](https://github.com/akveo/nebular/issues/837)) ([f460f85](https://github.com/akveo/nebular/commit/f460f85)), closes [#827](https://github.com/akveo/nebular/issues/827)
* **checkbox, radio:** check mark positioning in IE ([#830](https://github.com/akveo/nebular/issues/830)) ([ac52315](https://github.com/akveo/nebular/commit/ac52315)), closes [#743](https://github.com/akveo/nebular/issues/743)
* **docs:**  fix warning `Invalid value for $grid-breakpoints..` ([#736](https://github.com/akveo/nebular/issues/736)) ([23e7804](https://github.com/akveo/nebular/commit/23e7804))
* **docs:** add radio icon ([#748](https://github.com/akveo/nebular/issues/748)) ([9110266](https://github.com/akveo/nebular/commit/9110266))
* **docs:** fix mention of angular-cli.json file to `angular.json` ([#701](https://github.com/akveo/nebular/issues/701)) ([3211c54](https://github.com/akveo/nebular/commit/3211c54))
* **e2e:** add redundance note in protractor.conf.ci.js ([#839](https://github.com/akveo/nebular/issues/839)) ([a7ed638](https://github.com/akveo/nebular/commit/a7ed638))
* **infinite-list:** fix example file path ([60d0d1e](https://github.com/akveo/nebular/commit/60d0d1e))
* **login:** take into account remember me setting ([#644](https://github.com/akveo/nebular/issues/644)) ([d35b65b](https://github.com/akveo/nebular/commit/d35b65b)), closes [#330](https://github.com/akveo/nebular/issues/330)
* **menu:** height calculation ([#621](https://github.com/akveo/nebular/issues/621)) ([7542d5e](https://github.com/akveo/nebular/commit/7542d5e)), closes [#620](https://github.com/akveo/nebular/issues/620) [#369](https://github.com/akveo/nebular/issues/369) [#532](https://github.com/akveo/nebular/issues/532) [#307](https://github.com/akveo/nebular/issues/307) [#444](https://github.com/akveo/nebular/issues/444) [#392](https://github.com/akveo/nebular/issues/392) [akveo/ngx-admin#1703](https://github.com/akveo/ngx-admin/issues/1703) [akveo/ngx-admin#1819](https://github.com/akveo/ngx-admin/issues/1819)
* **modal:** rtl modal header ([#632](https://github.com/akveo/nebular/issues/632)) ([0370abe](https://github.com/akveo/nebular/commit/0370abe)), closes [#419](https://github.com/akveo/nebular/issues/419)
* **overlay:** z-index ([#735](https://github.com/akveo/nebular/issues/735)) ([9c22a52](https://github.com/akveo/nebular/commit/9c22a52))
* **popover:** fix popover component example ([#711](https://github.com/akveo/nebular/issues/711)) ([9980664](https://github.com/akveo/nebular/commit/9980664)), closes [#618](https://github.com/akveo/nebular/issues/618) [#619](https://github.com/akveo/nebular/issues/619)
* **radio:** radio group ngModel doesn't setup initial value ([#842](https://github.com/akveo/nebular/issues/842)) ([92b6f6b](https://github.com/akveo/nebular/commit/92b6f6b))
* **radio:** radio group now has bigger priority when setting value and disabled ([#841](https://github.com/akveo/nebular/issues/841)) ([99acd25](https://github.com/akveo/nebular/commit/99acd25))
* **scripts:** add moment and date-fns bundles ([#818](https://github.com/akveo/nebular/issues/818)) ([c78ae5f](https://github.com/akveo/nebular/commit/c78ae5f))
* **tabset:** removes bold emphasize for hovered tab ([#651](https://github.com/akveo/nebular/issues/651)) ([22e39eb](https://github.com/akveo/nebular/commit/22e39eb)), closes [#540](https://github.com/akveo/nebular/issues/540)
* **theme:** add nebular-icons as peer dependency ([#749](https://github.com/akveo/nebular/issues/749)) ([3e3fe1d](https://github.com/akveo/nebular/commit/3e3fe1d)), closes [#195](https://github.com/akveo/nebular/issues/195)
* **theme:** use existing variable for bootstrap ([#807](https://github.com/akveo/nebular/issues/807)) ([e91f557](https://github.com/akveo/nebular/commit/e91f557)), closes [#739](https://github.com/akveo/nebular/issues/739)


### Code Refactoring

* **auth:** rejects malformed tokens ([#597](https://github.com/akveo/nebular/issues/597)) ([127b5d2](https://github.com/akveo/nebular/commit/127b5d2)), closes [#517](https://github.com/akveo/nebular/issues/517)
* **menu:** emit itemClick event after clicking on item with link ([#728](https://github.com/akveo/nebular/issues/728)) ([94342e0](https://github.com/akveo/nebular/commit/94342e0)), closes [#423](https://github.com/akveo/nebular/issues/423)
* **menu:** replace item click ReplaySubject with plain Subject ([#724](https://github.com/akveo/nebular/issues/724)) ([eb6e74b](https://github.com/akveo/nebular/commit/eb6e74b)), closes [#695](https://github.com/akveo/nebular/issues/695)
* **theme:** refactor popover, context-menu and search components to use overlays ([#684](https://github.com/akveo/nebular/issues/684)) ([d3ba6ab](https://github.com/akveo/nebular/commit/d3ba6ab)), closes [#683](https://github.com/akveo/nebular/issues/683) [#664](https://github.com/akveo/nebular/issues/664) [#668](https://github.com/akveo/nebular/issues/668)
* **theme:** remove angular2-toaster styling ([#721](https://github.com/akveo/nebular/issues/721)) ([026974e](https://github.com/akveo/nebular/commit/026974e))
* **theme:** separate bootstrap styles into [@nebular](https://github.com/nebular)/bootstrap ([#707](https://github.com/akveo/nebular/issues/707)) ([a25f615](https://github.com/akveo/nebular/commit/a25f615)), closes [#230](https://github.com/akveo/nebular/issues/230)


### Features

* **auth:** add new `isAuthenticatedOrRefresh` method, update `NbAuthJWTInterceptor` to refresh the token ([#649](https://github.com/akveo/nebular/issues/649)) ([c8e8964](https://github.com/akveo/nebular/commit/c8e8964))
* **auth:** remove bootstrap, use custom styles ([#738](https://github.com/akveo/nebular/issues/738)) ([b585490](https://github.com/akveo/nebular/commit/b585490))
* **calendar:** add capability to hide header ([#838](https://github.com/akveo/nebular/issues/838)) ([df9b21c](https://github.com/akveo/nebular/commit/df9b21c)), closes [#828](https://github.com/akveo/nebular/issues/828)
* **checkbox:** add outline on focus ([#731](https://github.com/akveo/nebular/issues/731)) ([cc892d5](https://github.com/akveo/nebular/commit/cc892d5))
* **docs:** add groups to components list ([#646](https://github.com/akveo/nebular/issues/646)) ([73cf1b4](https://github.com/akveo/nebular/commit/73cf1b4))
* **docs:** add installation guides ([#740](https://github.com/akveo/nebular/issues/740)) ([d08c4d5](https://github.com/akveo/nebular/commit/d08c4d5))
* **docs:** add star & download badges into the hero section ([#813](https://github.com/akveo/nebular/issues/813)) ([c3c755a](https://github.com/akveo/nebular/commit/c3c755a))
* **docs:** fix typo in security docs ([#717](https://github.com/akveo/nebular/issues/717)) ([fc3b2d4](https://github.com/akveo/nebular/commit/fc3b2d4))
* **docs:** update akveo logo ([#674](https://github.com/akveo/nebular/issues/674)) ([5d79c2a](https://github.com/akveo/nebular/commit/5d79c2a))
* **icons:** add new icons ([#722](https://github.com/akveo/nebular/issues/722)) ([be06906](https://github.com/akveo/nebular/commit/be06906))
* **playground:** automatic refresh token ([#658](https://github.com/akveo/nebular/issues/658)) ([b4fc624](https://github.com/akveo/nebular/commit/b4fc624))
* **sidebar:** add ability fix sidebar container ([#642](https://github.com/akveo/nebular/issues/642)) ([7939344](https://github.com/akveo/nebular/commit/7939344))
* **sidebar:** add ability fix sidebar container on low resolutions ([#645](https://github.com/akveo/nebular/issues/645)) ([efa16ef](https://github.com/akveo/nebular/commit/efa16ef))
* **tabset:** update background fot tabset selected ([#643](https://github.com/akveo/nebular/issues/643)) ([ff8e9b6](https://github.com/akveo/nebular/commit/ff8e9b6))
* **theme:** add cdk ([#679](https://github.com/akveo/nebular/issues/679)) ([b9283d3](https://github.com/akveo/nebular/commit/b9283d3)), closes [#661](https://github.com/akveo/nebular/issues/661) [#660](https://github.com/akveo/nebular/issues/660)
* **theme:** add new DatePicker component ([#732](https://github.com/akveo/nebular/issues/732)) ([c00cc23](https://github.com/akveo/nebular/commit/c00cc23))
* **theme:** add new Dialog component ([#688](https://github.com/akveo/nebular/issues/688)) ([2edd9b3](https://github.com/akveo/nebular/commit/2edd9b3)), closes [#666](https://github.com/akveo/nebular/issues/666) [#665](https://github.com/akveo/nebular/issues/665)
* **theme:** add new Radio component ([#746](https://github.com/akveo/nebular/issues/746)) ([9e04681](https://github.com/akveo/nebular/commit/9e04681))
* **theme:** add new Select component ([#698](https://github.com/akveo/nebular/issues/698)) ([d6a211f](https://github.com/akveo/nebular/commit/d6a211f)), closes [#671](https://github.com/akveo/nebular/issues/671)
* **theme:** add new Toastr component ([#692](https://github.com/akveo/nebular/issues/692)) ([29e4fef](https://github.com/akveo/nebular/commit/29e4fef)), closes [#667](https://github.com/akveo/nebular/issues/667)
* **theme:** add new Tooltip component ([#703](https://github.com/akveo/nebular/issues/703)) ([0e05034](https://github.com/akveo/nebular/commit/0e05034)), closes [#663](https://github.com/akveo/nebular/issues/663)
* **theme:** add new Window component ([#713](https://github.com/akveo/nebular/issues/713)) ([60a65cb](https://github.com/akveo/nebular/commit/60a65cb)), closes [#669](https://github.com/akveo/nebular/issues/669)


### HOW TO UPGRADE/BREAKING CHANGES

#### Steps

This release has introduced a number of changes which may required some manual update steps, depending on your setup:

1. In case if you use Nebular overrides of bootstrap styles - you need to manually install new `@nebular/bootstrap` package. To do that:
  - install Nebular Bootstrap `npm i @nebular/bootstrap`
  - then add it into your `styles.scss`
  ```
  @import '~@nebular/bootstrap/styles/globals';
  // ...
  
  @include nb-install() {
    // ...
    @include nb-bootstrap-global();
  }
  ```
  - if you import `~@nebular/theme/styles/global/bootstrap/breakpoints` in your code, replace it with `~@nebular/theme/styles/global/breakpoints`
  - if you import `~@nebular/theme/styles/global/bootstrap/*.scss` somewhere in your code, replace it with `~@nebular/bootstrap/styles/*.scss`

2. Nebular 2.0 introduced a new peer dependency - @angular/cdk. A lot of out of the box functionality provided by @angular team gives our components a solid foundation. To do that:
- install @angular/cdk
`npm i @angular/cdk`

#### Breaking Changes
Here's a list of other possibly breaking changes that you may need to take into account:

* **menu:** `NbMenuComponent` and `NbContextMenuDirective` now fire itemClick even if item with `routerLink` was clicked.
* **menu:** The `NbMenuService` not reply the last click event. To update: if you use the knowledge that the last click event is replied you can wrap `onItemClick` stream in the custom stream based on `ReplaySubject`.
* **theme:** angular2-toaster styles were removed from Nebular.
Instead, we suggest using our new `NbToastrService`. To update:  add `NbToastrModule` into imports of your `app.module`.
Inject `NbToastrService` into the required component.
call `NbToastrService.show(...)` to render toasts.
For more information check [toastr documentation](https://akveo.github.io/nebular/docs/components/toastr).
* **theme:** All bootstrap override styles were moved from the @nebular/theme package to the new @nebular/bootstrap package. If you don't need bootstrap support you can simply no use this package.
@nebular/theme package introduced a dependency of normalize.css. To update:
  - install Nebular Bootstrap `npm i @nebular/bootstrap`
  - then add it into your `styles.scss`
   ```scss
   @import '~@nebular/bootstrap/styles/globals';
   // ...
   
   @include nb-install() {
     // ...
     @include nb-bootstrap-global();
   }
   ```
* **theme:** `appendToLayoutTop` and `clearLayoutTop` methods was removed from `NbThemeService`. Instead of this methods, you have to use `NbOverlayService`. It's the extension of @angular/cdk overlays, so, check [documentation](https://material.angular.io/cdk/overlay/overview) first of all.  Basic usage of overlays may look like this:
  ```ts
  constructor(protected overlay: NbOverlayService) {
  }
  
  const overlayRef = overlay.create();
  const overlayComponentPortal = new ComponentPortal(MyOverlayComponent);
  overlayRef.attach(overlayComponentPortal);
  ```
* **tabset:** Possibly a breaking change since tabs won't be bold in hover state.
* **auth:** According to RFC6749 section 4.3.2, the OAuth2 token request body with grant-type='password' must provide `username` to the auth server and not `email`.
* **auth:** `NbAuthJWTInterceptor` now always tries to refresh the token.
Urls for token sending can be filtered using a filter function:
```
{ provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: (req) => filter(req)},
```
* **auth:** `failWhenNoToken` has been removed from password strategy as it was still not released and becoming redundant



<a name="2.0.0-rc.10"></a>
# [2.0.0-rc.10](https://github.com/akveo/nebular/compare/2.0.0-rc.9...2.0.0-rc.10) (2018-08-08)

### Highlights
* Bunch of new components: Button, Input, Calendar, Chat UI, List, Infinite List, Spinner, Stepper
* New Auth `NbAuthOAuth2JWTToken`
* Icons in tabs, `subheader` header option, and other cool stuff!

### Bug Fixes

* **accordion:** fix accordion border-radius and shadow ([#584](https://github.com/akveo/nebular/issues/584)) ([22ba6ef](https://github.com/akveo/nebular/commit/22ba6ef))
* **auth:** fix token parceler suppressing `getClassByName` errors ([#548](https://github.com/akveo/nebular/issues/548)) ([ac41765](https://github.com/akveo/nebular/commit/ac41765)), closes [#528](https://github.com/akveo/nebular/issues/528)
* **checkbox:** fix disable state with reactive forms ([#599](https://github.com/akveo/nebular/issues/599)) ([7d8beea](https://github.com/akveo/nebular/commit/7d8beea)), closes [#296](https://github.com/akveo/nebular/issues/296)
* **docs:** add a note about new theme ([#504](https://github.com/akveo/nebular/issues/504)) ([872645c](https://github.com/akveo/nebular/commit/872645c))
* **docs:** delay first calculation of examples' height ([#586](https://github.com/akveo/nebular/issues/586)) ([9a74fc1](https://github.com/akveo/nebular/commit/9a74fc1))
* **docs:** fix auth md article formatting ([ac0f668](https://github.com/akveo/nebular/commit/ac0f668))
* **docs:** fix popover examples ([#503](https://github.com/akveo/nebular/issues/503)) ([83061ef](https://github.com/akveo/nebular/commit/83061ef))
* fix peer dependency rxjs version ([#546](https://github.com/akveo/nebular/issues/546)) ([402bca2](https://github.com/akveo/nebular/commit/402bca2)), closes [#514](https://github.com/akveo/nebular/issues/514)
* **docs:** fix widget margin ([ba5def0](https://github.com/akveo/nebular/commit/ba5def0))
* **docs:** live example height on theme change ([57aae1a](https://github.com/akveo/nebular/commit/57aae1a))
* **docs:** update analytics tracking to exclude duplicated events ([#502](https://github.com/akveo/nebular/issues/502)) ([36e2611](https://github.com/akveo/nebular/commit/36e2611))
* **docs:** update articles copy ([f76ce1f](https://github.com/akveo/nebular/commit/f76ce1f))
* **docs:** update concept-theme-system.md ([#602](https://github.com/akveo/nebular/issues/602)) ([95fbe74](https://github.com/akveo/nebular/commit/95fbe74))
* **docs:** update copy ([#587](https://github.com/akveo/nebular/issues/587)) ([d8e8881](https://github.com/akveo/nebular/commit/d8e8881))
* **flipcard:** fix flip card back view in Safari and IE ([0ccb4ab](https://github.com/akveo/nebular/commit/0ccb4ab))
* **menu:** update url-matching helper to include `;` ([#475](https://github.com/akveo/nebular/issues/475)) ([c67ec11](https://github.com/akveo/nebular/commit/c67ec11))
* **tabset:** fix exception, when renders conditionally with *ngIf directive ([#501](https://github.com/akveo/nebular/issues/501)) ([946e68c](https://github.com/akveo/nebular/commit/946e68c))


### Code Refactoring

* **auth:** make components CD=OnPush, use `nbInput`, `nbButton` ([#595](https://github.com/akveo/nebular/issues/595)) ([e1863ec](https://github.com/akveo/nebular/commit/e1863ec))


### Features

* **alert:** add outline alerts ([#590](https://github.com/akveo/nebular/issues/590)) ([a7b8ff4](https://github.com/akveo/nebular/commit/a7b8ff4))
* **auth:** add a back link to the strategy name in the token ([#571](https://github.com/akveo/nebular/issues/571)) ([1c89636](https://github.com/akveo/nebular/commit/1c89636))
* **auth:** add a new grant type `password` to OAuth2 Strategy ([d8a66a8](https://github.com/akveo/nebular/commit/d8a66a8))
* **auth:** add back button ([#556](https://github.com/akveo/nebular/issues/556)) ([36fc953](https://github.com/akveo/nebular/commit/36fc953))
* **auth:** add new NbAuthOAuth2JWTToken ([#583](https://github.com/akveo/nebular/issues/583)) ([aed2099](https://github.com/akveo/nebular/commit/aed2099))
* **auth:** NbOAuth2AuthStrategy add basic authentication scheme against token endpoints ([#582](https://github.com/akveo/nebular/issues/582)) ([4360a18](https://github.com/akveo/nebular/commit/4360a18)), closes [/tools.ietf.org/html/rfc6749#section-2](https://github.com//tools.ietf.org/html/rfc6749/issues/section-2) [#581](https://github.com/akveo/nebular/issues/581)
* **auth:** use existing refreshToken if it is not repeated by the backend refresh endpoint ([#593](https://github.com/akveo/nebular/issues/593)) ([dffbd59](https://github.com/akveo/nebular/commit/dffbd59))
* **button:** add `fullWidth` mode ([#591](https://github.com/akveo/nebular/issues/591)) ([13014d4](https://github.com/akveo/nebular/commit/13014d4))
* **docs:** add example change animation ([#531](https://github.com/akveo/nebular/issues/531)) ([e7bb266](https://github.com/akveo/nebular/commit/e7bb266))
* **docs:** enable analytics for documentation ([37f2fe0](https://github.com/akveo/nebular/commit/37f2fe0))
* **docs:** set title per tab ([09d71c9](https://github.com/akveo/nebular/commit/09d71c9))
* **header:** add `subheader` mode when header is placed on a side of sidebar ([#555](https://github.com/akveo/nebular/issues/555)) ([4715b04](https://github.com/akveo/nebular/commit/4715b04)), closes [#554](https://github.com/akveo/nebular/issues/554)
* **icons:** add e-commerce icon ([#609](https://github.com/akveo/nebular/issues/609)) ([2ca41cf](https://github.com/akveo/nebular/commit/2ca41cf))
* **icons:** add expand, collapse icons, fix angle double right ([#542](https://github.com/akveo/nebular/issues/542)) ([82a5c93](https://github.com/akveo/nebular/commit/82a5c93))
* **layout:** add scroll & ruler services ([043050a](https://github.com/akveo/nebular/commit/043050a))
* **playground:** update examples to use the new `nbButton` ([#559](https://github.com/akveo/nebular/issues/559)) ([657147b](https://github.com/akveo/nebular/commit/657147b))
* **security:** add ability to assign multiple roles to a user ([#549](https://github.com/akveo/nebular/issues/549)) ([c3402a6](https://github.com/akveo/nebular/commit/c3402a6)), closes [#222](https://github.com/akveo/nebular/issues/222)
* **tabs:** ability to assign an icon ([#607](https://github.com/akveo/nebular/issues/607)) ([b78b8d3](https://github.com/akveo/nebular/commit/b78b8d3)), closes [#288](https://github.com/akveo/nebular/issues/288)
* **theme:** add Accordion component ([3a94f9c](https://github.com/akveo/nebular/commit/3a94f9c))
* **theme:** add new Button component ([#341](https://github.com/akveo/nebular/issues/341)) ([89d429d](https://github.com/akveo/nebular/commit/89d429d))
* **theme:** add new Calendar component & Calendar Kit module ([#598](https://github.com/akveo/nebular/issues/598)) ([8547527](https://github.com/akveo/nebular/commit/8547527))
* **theme:** add new Chat UI components set ([ebfcd0e](https://github.com/akveo/nebular/commit/ebfcd0e))
* **theme:** add new Input directive ([#569](https://github.com/akveo/nebular/issues/569)) ([42c588e](https://github.com/akveo/nebular/commit/42c588e))
* **theme:** add new List and Infinite List components ([#530](https://github.com/akveo/nebular/issues/530)) ([a07c78c](https://github.com/akveo/nebular/commit/a07c78c))
* **theme:** add Spinner component ([8ef7412](https://github.com/akveo/nebular/commit/8ef7412))
* **theme:** add Stepper component ([d474598](https://github.com/akveo/nebular/commit/d474598))
* **theme:** override default bootstrap style for row css class for small screens ([#608](https://github.com/akveo/nebular/issues/608)) ([9be2fcb](https://github.com/akveo/nebular/commit/9be2fcb))
* **theme:** update card border color for corporate theme ([#594](https://github.com/akveo/nebular/issues/594)) ([ff0985e](https://github.com/akveo/nebular/commit/ff0985e))


### BREAKING CHANGES

* **auth:** possibly a breaking change since we don't use bootstrap inputs and buttons anymore
and use Nebular components instead
also OnPush added to the components
* **auth:** `nbAuthCreateToken` (token.ts) function now takes a third parameter, which is the `ownerStrategyName`.
Since `nbAuthCreateToken` is a part of public API this could *potentially* introduce a breaking change.
* **theme:** bootstrap button class `.btn-tn` renamed to `btn-xs`



<a name="2.0.0-rc.9"></a>
# [2.0.0-rc.9](https://github.com/akveo/nebular/compare/2.0.0-rc.8...2.0.0-rc.9) (2018-06-19) :rocket:

### Highlights

* New design theme **Corporate** 
* New components: Progress Bar, Alert
* OAuth2 Strategy with Google Auth example
* New documentation website with live examples
* Auth module refactoring

### Bug Fixes

* **context-menu:** hide on menu item click ([#431](https://github.com/akveo/nebular/issues/431)) ([a5bcd3c](https://github.com/akveo/nebular/commit/a5bcd3c))
* **docs:** add missing operator ([#455](https://github.com/akveo/nebular/issues/455)) ([1cb4993](https://github.com/akveo/nebular/commit/1cb4993))
* **docs:** add progress-bar icon ([#476](https://github.com/akveo/nebular/issues/476)) ([98562f5](https://github.com/akveo/nebular/commit/98562f5))
* **docs:** fix auth install article Closes [#273](https://github.com/akveo/nebular/issues/273) ([180d8f1](https://github.com/akveo/nebular/commit/180d8f1))
* **docs:** update mobile styles ([#487](https://github.com/akveo/nebular/issues/487)) ([6af2694](https://github.com/akveo/nebular/commit/6af2694))
* **docs:** update styles ([#486](https://github.com/akveo/nebular/issues/486)) ([9e44fb8](https://github.com/akveo/nebular/commit/9e44fb8))
* **footer:** use correct footer color variable ([#454](https://github.com/akveo/nebular/issues/454)) ([c2e310d](https://github.com/akveo/nebular/commit/c2e310d))
* **layout:** fix layout height when header is not fixed ([#437](https://github.com/akveo/nebular/issues/437)) ([084391b](https://github.com/akveo/nebular/commit/084391b))
* **popover:** hide when host was removed ([#430](https://github.com/akveo/nebular/issues/430)) ([a07496d](https://github.com/akveo/nebular/commit/a07496d))
* **reveal-card:** fix second card being visible on small screens ([#438](https://github.com/akveo/nebular/issues/438)) ([cad2246](https://github.com/akveo/nebular/commit/cad2246))
* **rtl:** reset bootstrap default styles ([#414](https://github.com/akveo/nebular/issues/414)) ([7634df5](https://github.com/akveo/nebular/commit/7634df5))
* **search:** resolve search field component factory ([#439](https://github.com/akveo/nebular/issues/439)) ([15cf18d](https://github.com/akveo/nebular/commit/15cf18d))
* **theme:** add new variable(btn-outline-focus-fg) for focused outline buttons ([#471](https://github.com/akveo/nebular/issues/471)) ([df31a4c](https://github.com/akveo/nebular/commit/df31a4c))
* **theme:** remove layout-padding for corporate theme, remove unnecessary color from icon ([#496](https://github.com/akveo/nebular/issues/496)) ([49abbb9](https://github.com/akveo/nebular/commit/49abbb9))


### Code Refactoring

* **auth:** provider -> strategy, `setup` method, multiple tokens ([3428ec3](https://github.com/akveo/nebular/commit/3428ec3))


### Features

* **auth:** add OAuth2 example with google auth ([fd95095](https://github.com/akveo/nebular/commit/fd95095))
* **auth:** add OAuth2 strategy ([2f28cbc](https://github.com/akveo/nebular/commit/2f28cbc))
* **card:** option to hide toggle button in reveal/flip cards ([#448](https://github.com/akveo/nebular/issues/448)) ([ef5ebbb](https://github.com/akveo/nebular/commit/ef5ebbb))
* **docs:** update docs design, add playground examples ([f40e78f](https://github.com/akveo/nebular/commit/f40e78f))
* **docs:** update urls to include baseUrl ([#489](https://github.com/akveo/nebular/issues/489)) ([f7fb11a](https://github.com/akveo/nebular/commit/f7fb11a))
* **docs:** use path-location instead of hash ([61d4139](https://github.com/akveo/nebular/commit/61d4139))
* **menu:** add collapseAll function ([#478](https://github.com/akveo/nebular/issues/478)) ([2942bfd](https://github.com/akveo/nebular/commit/2942bfd))
* **sidebar:** breakpoints configuration for compacted states  ([#457](https://github.com/akveo/nebular/issues/457)) ([56411db](https://github.com/akveo/nebular/commit/56411db))
* **theme:** add alert component ([ee27fda](https://github.com/akveo/nebular/commit/ee27fda))
* **theme:** add progress-bar component ([#459](https://github.com/akveo/nebular/issues/459)) ([3693494](https://github.com/akveo/nebular/commit/3693494))
* **theme:** corporate - new theme ([#479](https://github.com/akveo/nebular/issues/479)) ([c75eaf7](https://github.com/akveo/nebular/commit/c75eaf7))

### HOW TO UPGRADE/BREAKING CHANGES
Multiple breaking changes introduced to auth module to improve code readability, 
follow better naming conventions and for better extensibility in future releases.
More details and update steps: https://github.com/akveo/nebular/blob/master/src/framework/auth/UPGRADE.md#200-rc8-200-rc9

<a name="2.0.0-rc.8"></a>
# [2.0.0-rc.8](https://github.com/akveo/nebular/compare/2.0.0-rc.7...2.0.0-rc.8) (2018-05-10)


### Features

* **auth:** add support for refresh tokens ([#390](https://github.com/akveo/nebular/issues/390)) ([dc57c85](https://github.com/akveo/nebular/commit/dc57c85))
* **theme:** add RTL support ([#343](https://github.com/akveo/nebular/issues/343)) ([0326c1c](https://github.com/akveo/nebular/commit/0326c1c))
* update to angular 6 ([#408](https://github.com/akveo/nebular/issues/408)) ([16314e8](https://github.com/akveo/nebular/commit/16314e8))



<a name="2.0.0-rc.7"></a>
# [2.0.0-rc.7](https://github.com/akveo/nebular/compare/2.0.0-rc.6...2.0.0-rc.7) (2018-04-21)


### Bug Fixes

* **auth:** fix full-name validation error showing password validation text ([d12397b](https://github.com/akveo/nebular/commit/d12397b))
* **auth:** fix jwt interceptor to set Authorization header only if token is valid ([#294](https://github.com/akveo/nebular/issues/294)) ([1e99ff3](https://github.com/akveo/nebular/commit/1e99ff3))
* **buttons:** indicate focus state of outline button just with border-color ([e68a1ea](https://github.com/akveo/nebular/commit/e68a1ea)), closes [#295](https://github.com/akveo/nebular/issues/295)
* **docs:** add context-menu item click handler example ([#371](https://github.com/akveo/nebular/issues/371)) ([96ec81b](https://github.com/akveo/nebular/commit/96ec81b))
* **docs:** fix incorrect component mention ([#375](https://github.com/akveo/nebular/issues/375)) ([3fcbb61](https://github.com/akveo/nebular/commit/3fcbb61)), closes [#286](https://github.com/akveo/nebular/issues/286)
* **docs:** fix typo in auth-guard docs ([#277](https://github.com/akveo/nebular/issues/277)) ([682314d](https://github.com/akveo/nebular/commit/682314d))
* **docs:** return missed section anchors ([#370](https://github.com/akveo/nebular/issues/370)) ([3895c81](https://github.com/akveo/nebular/commit/3895c81))
* **layout:** fix flexbug, same as in bcbfcc0 but works in IE11 too ([#148](https://github.com/akveo/nebular/issues/148)) ([#355](https://github.com/akveo/nebular/issues/355)) ([a432e82](https://github.com/akveo/nebular/commit/a432e82))
* **menu:** apply default values for menuItems ([#344](https://github.com/akveo/nebular/issues/344)) ([674eef5](https://github.com/akveo/nebular/commit/674eef5))
* add polyfills for IE (es7 array & object) ([#361](https://github.com/akveo/nebular/issues/361)) ([3f91898](https://github.com/akveo/nebular/commit/3f91898)), closes [#272](https://github.com/akveo/nebular/issues/272)
* provide browser globals with injection tokens ([#358](https://github.com/akveo/nebular/issues/358)) ([63f4bb8](https://github.com/akveo/nebular/commit/63f4bb8))
* **menu:** avoid DOM elements creation for hidden menu items ([#312](https://github.com/akveo/nebular/issues/312)) ([0c10917](https://github.com/akveo/nebular/commit/0c10917)), closes [#270](https://github.com/akveo/nebular/issues/270)
* **menu:** trigger change detection after setting max-height ([#349](https://github.com/akveo/nebular/issues/349)) ([8c10372](https://github.com/akveo/nebular/commit/8c10372)), closes [#263](https://github.com/akveo/nebular/issues/263)
* **outline-btn-group:** reduce specificity of transparent background ([#313](https://github.com/akveo/nebular/issues/313)) ([eb18ebe](https://github.com/akveo/nebular/commit/eb18ebe)), closes [#295](https://github.com/akveo/nebular/issues/295)
* **popover:** run markForCheck to detect changes if nb-layout has onPush ([#267](https://github.com/akveo/nebular/issues/267)) ([7af0f62](https://github.com/akveo/nebular/commit/7af0f62)), closes [#266](https://github.com/akveo/nebular/issues/266)
* **search:** prevent search from crashing when no layout ([#332](https://github.com/akveo/nebular/issues/332)) ([36dc9dd](https://github.com/akveo/nebular/commit/36dc9dd))
* **styles:** get rid of nested mixins as sass doesn't support this for the time being ([#331](https://github.com/akveo/nebular/issues/331)) ([157b69d](https://github.com/akveo/nebular/commit/157b69d)), closes [#316](https://github.com/akveo/nebular/issues/316)
* **theme:** fix window and document providers to work in AOT ([#345](https://github.com/akveo/nebular/issues/345)) ([0aa898b](https://github.com/akveo/nebular/commit/0aa898b))


### Features

* **docs:** add capability to use playground module in the docs application ([#310](https://github.com/akveo/nebular/issues/310)) ([7676095](https://github.com/akveo/nebular/commit/7676095))
* **docs:** add tabs to docs ([12b18c4](https://github.com/akveo/nebular/commit/12b18c4))
* **menu:** add support for query parameters ([#283](https://github.com/akveo/nebular/issues/283)) ([#324](https://github.com/akveo/nebular/issues/324)) ([bbd86aa](https://github.com/akveo/nebular/commit/bbd86aa))


### BREAKING CHANGES

* **menu:** URL fragment no longer affects menu items selection.
Now we only find matches between path part of the URL and `link` property of menu-item.



<a name="2.0.0-rc.6"></a>
# [2.0.0-rc.6](https://github.com/akveo/nebular/compare/2.0.0-rc.5...2.0.0-rc.6) (2018-02-22)


### Bug Fixes

* **DEV_DOCS:** add missed line in development on the latest Nebular sources ([#182](https://github.com/akveo/nebular/issues/182)) ([3b84981](https://github.com/akveo/nebular/commit/3b84981))
* **docs:** update font spacing ([#193](https://github.com/akveo/nebular/issues/193)) ([7e2a41a](https://github.com/akveo/nebular/commit/7e2a41a))
* **docs:** update menu component to react to expand (add a relevant class) ([#206](https://github.com/akveo/nebular/issues/206)) ([18ccdf6](https://github.com/akveo/nebular/commit/18ccdf6)), closes [#180](https://github.com/akveo/nebular/issues/180)
* **docs:** use correct tag in usage example ([#186](https://github.com/akveo/nebular/issues/186)) ([b2333a9](https://github.com/akveo/nebular/commit/b2333a9))
* **menu:** don't collapse menu which has a selected item ([#225](https://github.com/akveo/nebular/issues/225)) ([5c489f3](https://github.com/akveo/nebular/commit/5c489f3))
* **menu:** fix items not being prepared when passed through input ([#181](https://github.com/akveo/nebular/issues/181)) ([2e9d14a](https://github.com/akveo/nebular/commit/2e9d14a))
* **search:** fix search not un-subscribing from events ([#185](https://github.com/akveo/nebular/issues/185)) ([691e100](https://github.com/akveo/nebular/commit/691e100))


### Code Refactoring

* **auth:** move token storage out of token service ([c8273da](https://github.com/akveo/nebular/commit/c8273da))
* **theme:** remove user context menu ([#231](https://github.com/akveo/nebular/issues/231)) ([959bd4a](https://github.com/akveo/nebular/commit/959bd4a))


### Features

* **security:** add new security module with acl implementation ([#187](https://github.com/akveo/nebular/issues/187)) ([86b2784](https://github.com/akveo/nebular/commit/a4da28938)), closes [#164](https://github.com/akveo/nebular/issues/164)
* **auth:** ability to configure social link ([#205](https://github.com/akveo/nebular/issues/205)) ([86b2784](https://github.com/akveo/nebular/commit/86b2784)), closes [#171](https://github.com/akveo/nebular/issues/171)
* **bootstrap:** update  bootstrap to 4.0.0 release (including ng-bootstrap, angular) ([#226](https://github.com/akveo/nebular/issues/226)) ([f047f14](https://github.com/akveo/nebular/commit/f047f14)), closes [#160](https://github.com/akveo/nebular/issues/160) [#223](https://github.com/akveo/nebular/issues/223) [#224](https://github.com/akveo/nebular/issues/224)
* **checkbox:** expand checkbox variables for easier customization ([6b93924](https://github.com/akveo/nebular/commit/6b93924)), closes [#143](https://github.com/akveo/nebular/issues/143)
* **context-menu:** add context menu component ([13799a5](https://github.com/akveo/nebular/commit/13799a5))
* **popover:** add new awesome `popover` component  ([7dbefd6](https://github.com/akveo/nebular/commit/7dbefd6))
* **popover:** add popover-border-radius theme var ([#254](https://github.com/akveo/nebular/issues/254)) ([baf1a61](https://github.com/akveo/nebular/commit/baf1a61))
* **ssr:** add server-side rendering support  ([c826187](https://github.com/akveo/nebular/commit/c826187))
* **tabset:** add `lazyLoad` property to `nb-tab` so that it loads content before it is actually shown ([#227](https://github.com/akveo/nebular/issues/227)) ([270995d](https://github.com/akveo/nebular/commit/270995d)), closes [#144](https://github.com/akveo/nebular/issues/144)
* **theme:** add capability append component to the layout top by its factory ([#253](https://github.com/akveo/nebular/issues/253)) ([515636c](https://github.com/akveo/nebular/commit/515636c))
* **user:** allow use base64 images for user picture ([#238](https://github.com/akveo/nebular/issues/238)) ([28338a7](https://github.com/akveo/nebular/commit/28338a7))


### BREAKING CHANGES

* **theme:** NbUserComponent no longer has context menu. We've
completely moved context menu in the separate component. So, to
migrate from the previous version you have to remove user menu items
```
<nb-user [menu]="items"></nb-user>
```
and use NbContextMenuDirective:
```
<nb-user [nbContextMenu]="items"></nb-user>
```
* **auth:** 
1) `NB_AUTH_TOKEN_WRAPPER_CLASS` renamed to `NB_AUTH_TOKEN_CLASS` and you should use `useValue` instead of `useClass` when providing a token:
`{ provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },` to `{ provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },`

2) `setValue` method removed from `NbAuthSimpleToken`, `NbAuthJWTToken`, tokens only accept read-only value when created through constructor now.

3) Token Storage moved out from `NbTokenService` into a separate `NbTokenStorage`.
If you need to change the storage behavior or provide your own - just extend your class from basic `NbTokenStorage`
or `NbTokenLocalStorage` and provide in your `app.module`:
```
  { provide: NbTokenStorage, useClass: NbTokenCustomStorage },
```
* **checkbox:** Checkbox check mark color variable (radio-fg) is expanded.
There are three variables instead to set a color depending a the checkbox state:
- checkbox-checkmark - base color
- checkbox-checked-checkmark - color when checkbox checked
- checkbox-disabled-checkmark - color when checkbox is disabled



<a name="2.0.0-rc.5"></a>
# [2.0.0-rc.5](https://github.com/akveo/nebular/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2018-01-31)


### Bug Fixes

* **docs:** remove comma between shorthand properties in themes table ([#130](https://github.com/akveo/nebular/issues/130)) ([#133](https://github.com/akveo/nebular/issues/133)) ([b36a409](https://github.com/akveo/nebular/commit/b36a409))
* **docs:** update marked version ([#124](https://github.com/akveo/nebular/issues/124)) ([f4c970e](https://github.com/akveo/nebular/commit/f4c970e))
* **header:** fix layout header test ([#153](https://github.com/akveo/nebular/issues/153)) ([b97ee8f](https://github.com/akveo/nebular/commit/b97ee8f))
* **menu:** remove hardcoded max-height ([#122](https://github.com/akveo/nebular/issues/122)) ([a753bee](https://github.com/akveo/nebular/commit/a753bee)), closes [#65](https://github.com/akveo/nebular/issues/65)
* **menu:** stop sidebar adding display: none to collapsed item span t… ([#155](https://github.com/akveo/nebular/issues/155)) ([4c10d2a](https://github.com/akveo/nebular/commit/4c10d2a))
* **search:** fix tests some time not passing on search ([#176](https://github.com/akveo/nebular/issues/176)) ([254ddd3](https://github.com/akveo/nebular/commit/254ddd3))
* **sidebar:** only expand sidebar when item has children elements ([#158](https://github.com/akveo/nebular/issues/158)) ([3a47dbf](https://github.com/akveo/nebular/commit/3a47dbf)), closes [#23](https://github.com/akveo/nebular/issues/23)
* **travis:** fix karma config for browserstack ([#156](https://github.com/akveo/nebular/issues/156)) ([d5a4873](https://github.com/akveo/nebular/commit/d5a4873))
* **travis:** remove git depth to allow commits comparison ([#150](https://github.com/akveo/nebular/issues/150)) ([4704d9e](https://github.com/akveo/nebular/commit/4704d9e))
* **travis:** stop randomly failing builds ([#126](https://github.com/akveo/nebular/issues/126)) ([3740e08](https://github.com/akveo/nebular/commit/3740e08))


### Features

* **auth:** warn about empty token, return falsy result ([ad8afb0](https://github.com/akveo/nebular/commit/ad8afb0))
* **badge:** add new badge component ([#111](https://github.com/akveo/nebular/issues/111)) ([a9324b4](https://github.com/akveo/nebular/commit/a9324b4))
* **cards:** new card types ([f15470a](https://github.com/akveo/nebular/commit/f15470a)), closes [#139](https://github.com/akveo/nebular/issues/139)
* **search:** add input to be able to customize info label ([#147](https://github.com/akveo/nebular/issues/147)) ([12a55dc](https://github.com/akveo/nebular/commit/12a55dc)), closes [#21](https://github.com/akveo/nebular/issues/21)


### BREAKING CHANGES

* **auth:** now if login/register returns no value for token, unsuccessful NbAuthResult is returned



<a name="2.0.0-rc.4"></a>
# [2.0.0-rc.4](https://github.com/akveo/nebular/compare/2.0.0-rc.3...2.0.0-rc.4) (2017-12-31) :christmas_tree:

This release features an update to angular 5+, rxjs 5.5+. Make sure to update these dependencies in your project.
 
### Bug Fixes

* **auth:** fix scrollbar cutoff issue with auth ([#87](https://github.com/akveo/nebular/issues/87)) ([893d56a](https://github.com/akveo/nebular/commit/893d56a))
* **auth:** fix typo in request password sub-title ([#105](https://github.com/akveo/nebular/issues/105)) ([336b05e](https://github.com/akveo/nebular/commit/336b05e))
* **theme:** fix an issue when scrollbar didn't reset after a route change ([#91](https://github.com/akveo/nebular/issues/91)) ([9c77dad](https://github.com/akveo/nebular/commit/9c77dad))
* **theme:** remove stock bootstrap box-shadow ([#72](https://github.com/akveo/nebular/issues/72)) ([7d7b3ab](https://github.com/akveo/nebular/commit/7d7b3ab))
* **theme:** scrollbars color in IE ([#66](https://github.com/akveo/nebular/issues/66)) ([b5b500c](https://github.com/akveo/nebular/commit/b5b500c))


### Features
* **logout:** let logout.component use form configs ([#78](https://github.com/akveo/nebular/issues/78)) ([41d0f78](https://github.com/akveo/nebular/commit/41d0f78))
* **dependencies:** update dependencies (angular 5+, rxjs, bootstrap, smart-table) ([#108](https://github.com/akveo/nebular/issues/108))

### BREAKING CHANGES

* **dependencies:** since angular and rxjs are updated please make sure to look through the corresponding changelogs for the details


<a name="2.0.0-rc.3"></a>
# [2.0.0-rc.3](https://github.com/akveo/nebular/compare/2.0.0-RC.2...2.0.0-rc.3) (2017-10-26)


### Bug Fixes

* **auth:** fix auth service isAuthenticated, onAuthenticationChange not returning a boolean, fix [#15](https://github.com/akveo/nebular/issues/15) ([30a1d47](https://github.com/akveo/nebular/commit/30a1d47))
* **buttons:** remove transition from buttons ([7e3f56d](https://github.com/akveo/nebular/commit/7e3f56d))
* **js-theme:** fix defaut font, fix e2e & unit tests ([cff8561](https://github.com/akveo/nebular/commit/cff8561))
* **layout:** prevent layout expansion when some child with overflow:hidden has an element with width larger than layout width ([82e4dfc](https://github.com/akveo/nebular/commit/82e4dfc))
* **user:** fix user component context menu showing an icon not correctly, fix [#25](https://github.com/akveo/nebular/issues/25) ([f723e54](https://github.com/akveo/nebular/commit/f723e54))


### Features

* **dependencies:** update bootstrap & angular, accompanying fixes (angular cli kept as previous due to build issues) ([3660f9a](https://github.com/akveo/nebular/commit/3660f9a)), closes [#42](https://github.com/akveo/nebular/issues/42)
* **font:** update default font value ([5b93759](https://github.com/akveo/nebular/commit/5b93759))
* **theme:** support hidden property ([#31](https://github.com/akveo/nebular/issues/31)) ([f26922a](https://github.com/akveo/nebular/commit/f26922a))


### BREAKING CHANGES

* **dependencies:** since bootstrap is updated please look through the bootstrap release notes (https://github.com/twbs/bootstrap/releases) for proper steps to update your styles
