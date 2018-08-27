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
