# Angular 22 Docs, Playwright, and Release Validation Design

## Goal

Complete the Angular 22 port by proving the documentation and playground applications build in production, replacing the removed Protractor runner with Playwright while preserving the existing browser scenarios, and making the release validation exercise packages, applications, browser tests, and package-consumer smoke builds end to end.

All work remains uncommitted unless the user later explicitly authorizes commits.

## Scope

### Included

- Production builds for `playground` and `docs`.
- Fixes required by Angular 22, TypeScript 6, current Sass, or current build tooling.
- Migration of every maintained `e2e/*.e2e-spec.ts` scenario from Protractor/Jasmine APIs to Playwright Test.
- Shared Playwright helpers for navigation, waiting, class checks, layout measurements, and reusable component expectations.
- Removal of the obsolete `playground-e2e` Protractor target and root Protractor-only dependencies/configuration.
- Root and `packages-smoke` commands that no longer call `ng e2e`.
- Local Chromium execution and CI-compatible Playwright execution.
- Release validation covering packages, schematics, Sass assets, applications, unit tests, Playwright, package tarballs, and the consumer smoke application.

### Excluded

- Migration of `@nebular/firebase-auth` away from `@angular/fire/compat`.
- Live Firebase authentication tests or any test requiring credentials or an external Firebase project.
- Visual-regression screenshot baselines.
- Unrelated Sass modernization; deprecation warnings may remain when they do not fail builds.
- BrowserStack parity beyond retaining a clear path for CI browser configuration. The required acceptance browser is Playwright-managed Chromium.

## Application Build Strategy

The first gate is the existing production application builds. `playground` is built with both its default production configuration and `production-wp`, because the latter is used by release validation. Documentation generation runs through `docs:build`, including generated API/article inputs and post-build directory tasks, rather than validating only the Angular compilation target.

Build failures are classified before editing:

- application or TypeScript errors receive the smallest source correction;
- asset/base-href problems are corrected in the owning build configuration;
- budget failures are reviewed as regressions and budgets are increased only when the Angular 22 toolchain itself demonstrably changes output size without a functional regression;
- Sass deprecations remain warnings unless they prevent compilation.

## Playwright Architecture

### Runner and server

The repository uses `@playwright/test` with a root `playwright.config.ts`. The config owns:

- `testDir: './e2e'` and an `*.e2e-spec.ts` match;
- the existing 120-second upper bound where genuinely required, with shorter assertion timeouts;
- `baseURL` from `E2E_BASE_URL`, defaulting to the local playground URL;
- Playwright-managed Chromium;
- trace and screenshot collection on failure;
- a `webServer` command that serves the playground in the requested configuration and reuses an already-running local server outside CI.

Production release E2E uses the `production-wp` playground configuration. Local `npm run e2e` uses the same application route surface and can accept an external `E2E_BASE_URL`.

### Test migration

Each Protractor spec keeps its user-visible intent and route. Mechanical mappings are centralized where useful:

- `browser.get()` becomes `page.goto()`;
- `element(by.css())` and `element.all()` become locators;
- `ExpectedConditions` becomes locator auto-waiting and explicit `expect(...).toBeVisible()`;
- promise chains become `async`/`await`;
- direct WebDriver script/size operations become Playwright page and locator APIs.

Tests must use role/text locators when stable semantics exist and CSS selectors where the playground deliberately exposes component structure. Assertions remain behavioral: rendered state, class/style changes, navigation, overlay visibility, and layout relationships. Migration must not replace exact checks with existence-only assertions.

`e2e-helper.ts` is rewritten around Playwright types. Pure data and conversion helpers in `component-shared.ts` remain runner-independent. The obsolete Jasmine/Protractor TypeScript configuration, `.eslintrc`, and `protractor.conf.js` are removed or replaced only after their consumers have migrated.

### CI behavior

CI installs the Playwright Chromium browser explicitly and runs the same root `npm run e2e` command used locally. BrowserStack-specific Protractor setup is removed from the active E2E path. Playwright artifacts are uploaded only on failure where the workflow supports it.

## Release Validation

The release command is decomposed into named scripts so each failure identifies its layer:

1. Build all seven packages, package schematics, and Sass assets.
2. Run all package unit suites and schematic tests.
3. Build playground production/production-wp and the complete docs site.
4. Run Playwright E2E against the production-wp playground.
5. Run `npm pack` for every distributable package and place the tarballs in an ignored staging directory.
6. Install or wire those local artifacts into `packages-smoke`, then build its browser and SSR outputs and run its smoke tests without Protractor.
7. Run lint, formatting checks, version-matrix validation, and `git diff --check`.

The existing `packages-smoke` file dependencies may continue to consume unpacked `dist` directories for CI speed, but release acceptance additionally verifies actual tarball contents and package manifests. Firebase Auth is packed and compiled in compatibility mode; no live authentication is attempted.

## Dependency and Configuration Changes

- Add `@playwright/test` as a development dependency and generate the lockfile update through npm.
- Remove `protractor`, `@types/jasminewd2`, and Protractor-only reporter/fail-fast dependencies when no remaining command imports them.
- Remove the `playground-e2e` Angular project because Angular 22 has no Protractor builder.
- Update root scripts so `e2e` invokes Playwright and release validation uses explicit modern commands.
- Migrate `packages-smoke` away from `ng e2e`; use a small Playwright smoke spec or a build/SSR HTTP smoke command, whichever matches its existing assertions.

## Error Handling and Stability

- Playwright relies on locator auto-waiting; arbitrary sleeps are forbidden.
- Overlay and animation checks wait for the observable DOM state, not elapsed time.
- Tests that depend on viewport dimensions set an explicit viewport in configuration.
- External network calls, Algolia, Firebase, analytics, and credentials are stubbed, disabled, or kept outside acceptance tests.
- Failed E2E runs retain a trace and screenshot for diagnosis.
- A test may be skipped only when the corresponding Protractor scenario was already intentionally disabled and the reason remains valid and documented.

## Acceptance Criteria

- Playground production and production-wp builds succeed.
- `docs:build` succeeds and produces the expected static output.
- No active script, Angular target, TypeScript config, or CI step invokes Protractor.
- Every maintained legacy E2E scenario has an equivalent Playwright test, or a documented reason for removal based on dead playground functionality.
- Playwright Chromium passes locally against the production-wp playground.
- All package unit suites, including the new Eva Icons and Firebase Auth smoke suites, pass.
- All packages build and `npm pack` successfully.
- `packages-smoke` builds from locally produced package artifacts, including SSR.
- Lint, formatting, version-matrix validation, and whitespace checks pass.
- No commit is created.

## Known Constraint

`@angular/fire@20.1.0` declares Angular 20 peer dependencies. The repository override and verified compatibility build allow the Angular 22 workspace to operate, but this is not represented as official AngularFire 22 support. Release notes must identify Firebase Auth as compatibility-mode support until an upstream AngularFire release provides a clean Angular 22 dependency matrix.
