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
