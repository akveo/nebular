- [Before contributing](#things-you-must-follow-before-contributing)
- [New Feature Checklist](#new-feature-checklist)
- [New Package Checklist](#new-package-checklist)
- [New Package Dependency Checklist](#new-package-dependency-checklist)
- [Objectives](#objectives)
- [Framework Structure](#framework-structure)
- [Docs](#docs)
- [Theme](#theme)
- [Documentation](#documentation)
- [Release](#release)
- [create a new component guide](#create-a-new-component-guide)
- [Playground](#playground)
- [TODO](#todo)

# Things you must follow before contributing
- Don’t overcomplicate
- Don’t make things too abstract
- Use tslint, styles-lint to check the code style
- Use lifecycle interfaces
- Use default angular view encapsulation
- Use changeDetection: ChangeDetectionStrategy.OnPush where applicable
- Never forget [document your changes add create some examples](#documentation)
- Write tests
- Create playground page per each new component/feature


# New Feature Checklist
- lint checks are passing
- tests are added/updated and passing
- showcase in the playground updated
- Styles variables added/updated
- tsdocs added/updated
- commit message is properly formatted
- for the override styles - registered in a list of overrides
- component *.theme registered in a list of component themes
- looks great on all default themes
- supports bidirectionality
- requires approval from several core team contributors

# New Package Checklist
- add the package into bump-version.ts which bumps package version and its dependencies
- add the package external dependencies into rollup-config.ts which gives rollup capability build package correctly
- add the package into bundle.ts which build umd modules for our packages
- add the package into `JS_PACKAGES` in `scripts/gulp/tasks/config.ts` which used to add es2015 bundles for our packages
- add the package into packages-smoke application dependencies to verify it works properly in isolation.
- add the package into change-prefix.ts which builds our packages with custom prefix.

# Objectives
The aim of the project is to create a set of useful Angular modules which help to bootstrap the development.

We have to:
  - [x] make it modular
  - [x] publish it as npm package
  - [x] customizable color themes with HOT reload support
  - [x] create a library of custom layout components
  - [x] expanded documentation and guides
  - [x] replace ng2-bootstrap with ng-bootstrap
  - [x] get rid of jQuery
  - [x] follow Angular code style
  - [x] use Angular CLI

# Framework Structure
- docs - Documentation and framework website built on top on the framework
- src
    - app - runner app for components playground
    - playground - independent module with runnable examples for each feature
    - backend - Small backend example
    - framework - Framework itself, divided into npm packages
        - theme - `@nebular/theme` npm package, main framework package
        - auth - `@nebular/auth` npm package, auth package (login, register, etc)       
        - security - `@nebular/security` npm package, security framework package
        

# Docs

Docs is a separate Angular application located right in this project in `docs/` folder.
The pages structure is taken from `structure.ts` file.
The components documentation is take from the component comment sections.
Runnable examples - an iframe to the same Angular application to a different route (/#/examples) where `playground module` is connected.
In the build mode documentation and runnable examples are built in TWO separate apps and placed to `docs/dist` for the docs website
and `docs/dist/run` for the examples. This is done so that we can reference an example in an iframe avoiding "same page iframe policy" which won't allow
us to load the same page in the iframe on that page (and different pages starting only differentiated by `#something` are considered as one page in some
browsers. 

## Docs deploy
Each PR merge to the master branch triggers docs apps rebuild and deploy (deploy_docs mode in Travis).
You can find the script at `scripts/docs/build-docs.ts`. There is also `scripts/docs/config.ts` with configuration options for repository settings.
Script uses `docs/versions.json` file to determine versions to build.
To add new version add an entry with following fields to the array:
```json
{
  "checkoutTarget": "<commit | tag | branch>",
  "name": "<version name>",
  "path": "/path/to/the/version/directory/",
  "isCurrent": "boolean | undefined"
}
```

`checkoutTarget` passed directly to the `git checkout` command, so it could be anything `checkout` command supports.

`name` will be shown in the versions select of the docs app.

`path` used as a base href when building the docs app and as a redirect URL when selecting the version from version select.

`isCurrent` version you see by default when navigating to the Nebular docs. Must be set for the single version only.

      
## Auth // TODO      

## Theme
Theme module is the main framework module, consisting of:
 
  - custom UI Kit components (layout, cards, tabs, etc)
  - css-themes with hot reload support 
  - appearance overrides for 3rd party libraries.

### UI Kit structure 

Located in `theme/components`.
Each component consists of the standard angular component structure + `*.theme.scss` file, 
which is a customizable part (customizable here means dependable on a specific theme variables) of component's styles.

### Services

Located in `theme/services`.
Global theme services.

### Styles structure

Located in `theme/styles`

- core/ - Common mixins and functions
- global/ - Root of the 3rd party components overrides and other global styles
- prebuilt/ - Technical files of which css themes will be compiled
- themes/ - built-in themes
- common/ - Shared components styles
- all.scss -Exports all themes' variables, theming engine and global styles
- components.scss - Exports all themes' variables and theming engine but DOES NOT export global styles (should be used in a component)
- globals.scss - Exports all global styles (overrides, components' `*.theme.scss` themes, fonts, etc)
- themes.scss - All built-in themes
- theming.scss - Theme system engine 

#### CSS Themes

- Problem
  Customizable themes support doesn't work good with angular, as encapsulated in framework components' styles can't access user app variables unless you make them non-encapsulated and export as scss-files).
  Thus, we need to ask a user to include the framework styles separately as global styles, so that it is possible to change SASS variables before the theme styles are processed.
  
- Solution
  The solution is to separate component's styles into configurable (with SASS variables) and non-configurable (hardcoded) styles.
  Then place hardcoded styles into `*.component.scss`, and dynamic styles into `*.theme.scss`.
  The `*.theme` files will be included into one `*theme` file with access to the theme variables. This file has to be included by the user into their project.
  
- Disadvantages
    - We separate styles, thus it's hard to read the styles in the development mode.
    - Theme styles are not encapsulated, basically are global styles.
  
- Possible future solution
    - CSS variables (currently lack of browsers support)
 
  
#### Multi Themes

- Problem
  We cannot change SCSS variables in the runtime as user change the theme (possible with CSS variables but browser support is quite limited). 
  
- Solution
  Thus, we need to build multiple instances of styles in the runtime and encapsulate each theme's bunch of styles under some .theme-name class:
   ```
    .nb-theme-default {
      nb-layout {
        color: black;
      }
    }
    .nb-theme-red {
      nb-layout {
        color: red;
      }
    }
    
   ```
  Then, by changing a css class on the root element (nb-layout) we can change the page appearance in the runtime.
  
  - SCSS MAP
    Moreover, to have an arbitrary amount of themes we need to store the variables as an `SCSS `.
    Then, each component' styles (user components' styles) needs to be wrapped into `nb-install-component` mixing, 
    which will be called in a loop for each theme, setting its own variables.
    Variables then accessible through `nb-theme(var-name)` function.
    Finally, example of such component will look like:
    ```
      @import '@nebular/theme/styles/component';
      
      @include nb-install-component() {
        div {
          color: nb-theme(primary-fg);
        }
      }
    ```
    
- Disadvantages
  - Double (triple, multiple) sizes of generated css file. 

- Possible future solution
  - CSS variables

   
### JS Themes - // TODO

TBD

### Add new Theme

Nebular

- Add new js theme to the `theme/services` with variables for common settings,
 you can inherit them from an existing theme, indicating in property `base` name of the theme
 or create new theme, update test.
- Add new Theme to the `theme/styles/themes` also you can inherit from an existing theme,
 in a `nb-register-theme` specifying the name of the theme as the third parameter.
- Import new theme to the `theme/styles/themes.scss`.
- Add new Theme to the `theme/styles/prebuilt`.
- Register a new Theme in the `playground/styles/themes.scss`.
- For docs in the `docs/structure.ts` add item with new theme in section with name `Themes`.
- Add new theme for `live-example-block`.

ngx-admin

- Register a new Theme in the `app/@theme/styles/themes.scss`
- Add new js theme to the `app/@theme/styles` (variables for charts and etc.) for new Theme.
- Import a new Theme to the `app/@theme/theme.module.ts`.
- In `ThemeSwitcherListComponent` add item with new theme.
 
# Documentation

Documentation is generated by the custom generator built on top of @nebular/theme.
You have to use typedoc everywhere for the documentation purpose.

## How to add page to the documentation

Docs application splitted on the sections which you can find in the apps sidebar.
Each section contains some pages.
If you wanna add new page in the documentation, please, open `structure.ts`
file in the root of docs application and add new page in the required section:

```
{
  type: 'page',
  name: 'Awesom page',
  children: [
    ... blocks
  ],
},
```

If it's completely new feature, maybe it would be better to create a new section:

```
{
  type: 'section',
  name: 'New super section',
  children: [
    ... pages
  ],
},
```

Page can contain multiple blocks of the following types:

- [markdown](#markdown-block)
- [component](#component-block)
- [tabbed component](#tabbed-component-block)

### Markdown block

Renders plain markdown file from the `articles` dir.
For example, if you wanna add getting started article you have to do the following:

- put `getting-started.md` file in the `articles` folder.
- add markdown block to the page children:

```
{
  type: 'block',
  block: 'markdown',
  source: 'getting-started.md',
},
```

### Component block

If you have to render all the information about componend parsed with typedoc
you have to use component blocks:

```
{
  type: 'block',
  block: 'component',
  source: 'MyNewComponentName',
},
```

### Tabbed component block

Tabbed component block will render component description splitted on the following tabs:
- Overview - This is typedoc comment above component
- Theme - Theme variables listed in the typedoc comment above component with `@styles` tag, for example:

```
/**
 * ...
 *
 * @styles
 *
 * var1
 * var2
 *
 * ...
 */
```

- API - parsing result of the typedoc above public methods and props
- Examples - live examples listed in the typedoc comment above component

## Examples

When you're developing new funcitonality, please, always add some examples describing it.
You have the following ways to add examples in your component documentation:
- [Add raw code](#add-raw-code)
- [Display inline examples from playground](#inline-examples)
- [Render live examples from playground](#live-examples)
- [Render stacked examples from palyground(live + inline)](#stacked-examples)

### Add raw code

If you wan't to describe small thing in two lines of code you can just add something similar in your typedoc comment:

````
```html
<my-component></my-component>
```
````

And don't forget specify language above your example.

### Inline examples

Inline example is an example file from our playground.
Let's see how can we add inline example on the page:

- Create example file in the playground folder. All files from playground folder will be coppied to the assets of the docs app.
- Add `@inline-example(my-component/my-component.component.html)` somewhere in your typedoc comment.

Also, if you wanna render all the component, not only one file from it, you can specify it's without file extension:
`@inline-example(my-component/my-component.component)`
in this case all the files with `my-component.component` name will be rendered.

### Live examples

Live example it's just playground page rendered in the iframe. So, to be able to use it
you have to add example component in the playground and specify route for it.
Then you need to pass this route name in `@live-example(my-super-route)` tag.

### Stacked examples

It's combination of the live and inline examples. When you add `@example(my-example)`
in your typedoc comment, docs'll try to find component with name `my-example` and route with the same name and render them with switch.
To give the user capability switch between live and inline representation of the example.

# Release

To start a new release (publish the framework packages on NPM) you need:

0. For major version release:
    - search for `@breaking-change` to make sure all breaking changes are covered.
    - create and push new LTS branch:
        ```
          git checkout master
          git pull upstream master
          git checkout -b <branch-name>
          git push -u upstream <branch-name>
        ```
      `<branch-name>` should be named according to `<major>.<minor>.x` pattern. For example, if 4.6.3 becomes LTS, branch name should be `4.6.x`

    - add LTS tag to packages version which becomes LTS.
        ```
          npm dist-tag add @nebular/theme@<version> <tag>
        ```
      Where `<version>` is version of package becoming LTS and `<tag>` is `v<major-version>-lts`. For example, when 4.6.3 becomes LTS, command would be: `npm dist-tag add @nebular/theme@4.6.3 v4-lts`
1. create a new release branch called `release:v1.0.2`
2. `npm run release:validate` - this will create ready for publishing packages in src/.lib then build prod & AOT builds of the playground app using prepared packages and then run e2e tests again it.
3. MANUALLY update a version in main ./package.json to a new one
4. 
  * `npm run version:bump`
  * update version in `package-lock.json` and `packages-smoke/package-lock.json`
  * when releasing current version (PR to master) also update [docs/versions.json](#docs-deploy):
    - Update current version to version above to release
    - For major update:
      - Update LTS version entry to version became LTS
5. 
  * `npm run version:changelog`
  * fix/expand changelog manually
6. push the branch, create PR, approve - merge
7. pull the upstream (master or other version branch (e.g. 3.6.x))
8. Create and push version git tag (`v<version>`, e.g. `v4.1.2`). When PR was made to the master branch, you need to create it right off, before the docs build script on CI clone the repo.
9. If publishing LTS release add `--tag=v<major-version>-lts` (for example `v3-lts`) to publish command in `scripts/publish.sh:7`
10. In case of beta, rc or any other unstable release add `--tag=next` to publish command in `scripts/publish.sh:7`
11. `npm run release` - run prepare & validate and finally publish the packages to NPM
12. create release on github
13. add release notes to [Nebular Releases](https://github.com/akveo/nebular/issues/1204)
14. For LTS release:
    - create PR to master to update LTS entry in [docs/versions.json](#docs-deploy) to deploy LTS docs.

#ngx-admin development on the latest Nebular sources

1. `rm -rf node_modules/@nebular` to remove the package installed
2. run `npm link` for each Nebular module in *nebular/src/framework* except for *icons*
3. make sure you don't have *node_modules* in Nebular project (this may cause an issue an issue the angular-cli)
4. link Nebular in ngx-admin: `npm link @nebular/{auth,theme}`
5. run ngx-admin with corresponding flag `npm start -- --preserve-symlinks`

#ngx-admin release
1. update version
2. create changelog
3. create PR, approve, pull
4. rebase sandbox on master, push
5. rebase demo on master, push
6. create a tag
7. create github release
8. build demo with npm run build:prod
9. upload demo using `scp -r dist/ server_details`


# create a new component guide
- create directory in `src/framework/theme/components/your-component` with following files:
````
your-component.component.ts (component file)
your-component.module.ts (module file)
your-component.component.html (optional, html file)
your-component.component.scss (optional, common styles for your component)
_your-component.component.theme.scss (optional, styles that depends on theme vars)

````

- register your component in framework
````
src/framework/theme/public_api.ts (add exports of your component and module)
src/framework/theme/styles/global/_components.scss (if you create _your-component.component.theme.scss you have to register mixin) 

````

- tests
````
src/framework/theme/components/your-component/your-component.spec.ts if you want to test basic rendering
e2e/your-component.e2e-spec.ts if you need to test complex actions such as user interaction
````

- register your component in docs
````
add it to docs/structure.ts

create example usage of your component
src/playground/[with-layout|without-layout]/your-component/your-component-showcase.component.ts

run 'npm run gen:playground' to generate boilerplate code, such as modules, routes, etc.

your-component.component.ts  (add line in docs section-  * @stacked-example(Your component, your-component/your-component-showcase.component)
````
- after `npm run docs:serve` you can see your component at `http://localhost:4100/#/docs/components/your-component` 

# Playground

Playground is a set of modules containing all Nebular examples.

## Structure
It has two base directories: `with-layout` and `without-layout`. All components in `with-layout` directory will be nested inside of `nb-layout` component. Components from `without-layout` directory will be direct children of router outlet. Put components into `without-layout` directory, if they don't need to or can't be children of layout component, such as a layout itself.

## Playground schematic
Playground schematic generates all boilerplate code for you. Basically, after adding a new component, directive or service declaration, all needed modules and components routes will be generated or modified.

You can run it via 'npm run gen:playground' command.

### How it works

Schematic goes through all playground directories deeply.
For direct children of [base](#structure) playground directories, it generates feature and routing modules.

Each component, directive or service declaration found, will be declared in the closest module.
Also for each component which has a routing module in directory schematic adds a route. Route path set to file name without extension.
If a component is just a helper and shouldn't has it's own route, you can put in a subdirectory (typically './components').

Each module found will be added as a lazy route for closest parent module. Route path will be set to a module directory name.

Then schematic will collect all component routes and write list into `./src/app/playground-components.ts` (used by docs app).

# TODO
 - steps to start the development
 - describe framework and demo dependencies
 - create a new component guide
 - usage guide
