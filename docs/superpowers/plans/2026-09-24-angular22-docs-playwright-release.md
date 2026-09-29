# Angular 22 Docs, Playwright, and Release Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the Angular 22 port by validating production applications, replacing Protractor with Playwright for all maintained E2E scenarios, and proving the release artifacts in the consumer smoke application.

**Architecture:** Keep docs/playground corrections independent from the runner migration, then introduce one Playwright fixture/config boundary used by all migrated specs. Release validation composes existing package commands, the new E2E command, tarball inspection, and the existing `packages-smoke` application without live external services.

**Tech Stack:** Angular 22.2, TypeScript 6.0, Playwright Test, Chromium, npm, ng-packagr, GitHub Actions, Angular SSR.

**Spec:** `docs/superpowers/specs/2026-09-24-angular22-docs-playwright-release-design.md`

## Global Constraints

- Do not create commits; the user explicitly requested an uncommitted implementation.
- Preserve all public Nebular APIs and all meaningful assertions from the Protractor suite.
- Do not use arbitrary sleeps; wait on locator, navigation, response, or DOM state.
- Use Playwright-managed Chromium as the required acceptance browser.
- Do not add live Firebase, Algolia, analytics, or credential-dependent tests.
- Leave `@nebular/firebase-auth` on `@angular/fire/compat` and document its AngularFire 20 peer limitation.
- Sass deprecation warnings are non-blocking unless compilation fails.

## Review Focus

- A caller-provided `E2E_BASE_URL` must suppress the local web server and run the same tests against that URL; Task 2 pins configuration behavior.
- Overlay tests must wait for visible/hidden DOM state after animation rather than elapsed time; Task 4 owns this.
- Layout tests must use a fixed viewport and compare stable geometry relationships rather than host-specific pixels; Task 4 owns this.
- A production-wp build must be served with routing fallback so direct component URLs load; Tasks 1 and 2 own this.
- Release validation must fail if a tarball is missing, empty, or cannot be consumed by `packages-smoke`; Task 6 owns this.

---

### Task 1: Establish Production Application Baselines

**Files:**

- Modify only when a build proves it necessary: `angular.json`, `src/**/*.ts`, `src/**/*.scss`, `docs/**/*.ts`, `docs/**/*.scss`
- Record output in ignored SDD workspace logs

**Interfaces:**

- Consumes: Angular projects `playground` and `docs`, configurations `production` and `production-wp`.
- Produces: buildable `dist/playground` and `dist/docs` consumed by Playwright and release validation.

- [ ] **Step 1: Run the playground production build as the RED baseline**

Run: `npm run build -- playground --configuration production`

Expected: PASS, or a concrete Angular/TypeScript/Sass diagnostic recorded before any edit.

- [ ] **Step 2: Run the production-wp build**

Run: `npm run build:wp`

Expected: PASS and `dist/playground/browser/index.html` exists.

- [ ] **Step 3: Run the complete docs pipeline**

Run: `npm run docs:build`

Expected: PASS through `docs:prepare`, Angular production build, index copy, and sitemap generation.

- [ ] **Step 4: Correct only demonstrated build failures**

For each error, keep the failing command as the regression test. Apply the smallest owning-file correction and rerun that command to GREEN. Do not increase budgets unless the emitted bundle exceeds the current budget solely because of Angular 22 output and the new value is set to the measured size plus no more than 10% headroom.

- [ ] **Step 5: Verify both output roots**

Run:

```powershell
Test-Path dist/playground/browser/index.html
Test-Path dist/docs/browser/index.html
```

Expected: both return `True`.

### Task 2: Introduce the Playwright Runner Boundary

**Files:**

- Modify: `package.json`, `package-lock.json`
- Create: `playwright.config.ts`
- Modify: `e2e/e2e-helper.ts`, `e2e/tsconfig.e2e.json`
- Create: `e2e/runner-smoke.e2e-spec.ts`

**Interfaces:**

- Consumes: production-wp playground server and `E2E_BASE_URL`.
- Produces: Playwright fixture `test`, assertion API `expect`, `baseURL`, fixed viewport, failure artifacts, and helper `openExample(page, path)` used by Tasks 3–4.

- [ ] **Step 1: Add the runner dependency**

Run: `npm install --save-dev @playwright/test`

Expected: package and lockfile include the same resolved Playwright version.

- [ ] **Step 2: Write the failing runner smoke test**

Create `e2e/runner-smoke.e2e-spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('loads the playground shell through a direct route', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('npg-root')).toBeAttached();
});
```

Run: `npx playwright test e2e/runner-smoke.e2e-spec.ts`

Expected: FAIL because no Playwright config/web server exists yet.

- [ ] **Step 3: Create the config**

Create `playwright.config.ts` with:

```ts
import { defineConfig, devices } from '@playwright/test';

const externalBaseURL = process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e-spec.ts',
  timeout: 120_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: externalBaseURL || 'http://127.0.0.1:4200',
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: externalBaseURL
    ? undefined
    : {
        command: 'npm run start:wp -- --host 127.0.0.1 --port 4200',
        url: 'http://127.0.0.1:4200',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
```

- [ ] **Step 4: Replace Protractor helper imports**

Rewrite `e2e-helper.ts` to export pure `hasClass(locator: Locator, cls: string): Promise<boolean>`, existing `hexToRgbA`, and:

```ts
export async function openExample(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await expect(page.locator('npg-root')).toBeAttached();
}
```

Update `e2e/tsconfig.e2e.json` types to `node` and `@playwright/test`.

- [ ] **Step 5: Run smoke locally and with an external URL**

Run:

```powershell
npx playwright install chromium
npx playwright test e2e/runner-smoke.e2e-spec.ts
$env:E2E_BASE_URL='http://127.0.0.1:4200'; npx playwright test e2e/runner-smoke.e2e-spec.ts; Remove-Item Env:E2E_BASE_URL
```

Expected: first command-managed run passes; external mode passes when the same server is already running and does not try to launch a second server.

### Task 3: Migrate Static Component E2E Specs

**Files:**

- Modify: `e2e/accordion.e2e-spec.ts`, `actions.e2e-spec.ts`, `alert.e2e-spec.ts`, `badge.e2e-spec.ts`, `card.e2e-spec.ts`, `chat.e2e-spec.ts`, `checkbox.e2e-spec.ts`, `flip-card.e2e-spec.ts`, `reveal-card.e2e-spec.ts`, `route-tabset.e2e-spec.ts`, `tabset.e2e-spec.ts`, `toggle.e2e-spec.ts`, `user.e2e-spec.ts`
- Modify: `e2e/component-shared.ts`

**Interfaces:**

- Consumes: Task 2 Playwright config and helpers.
- Produces: Playwright coverage for static rendering, sizes, colors, states, and tab/card transitions.

- [ ] **Step 1: Convert the first representative spec and observe RED**

Convert `badge.e2e-spec.ts` to:

```ts
import { expect, test } from '@playwright/test';
import { colors } from './component-shared';

test.describe('Badge', () => {
  test.beforeEach(async ({ page }) => page.goto('/badge'));

  for (const { colorKey, color } of colors) {
    test(`renders ${colorKey}`, async ({ page }) => {
      const badge = page.locator(`nb-badge.status-${colorKey}`).first();
      await expect(badge).toBeVisible();
      await expect(badge).toHaveCSS('background-color', color);
    });
  }
});
```

Run: `npx playwright test e2e/badge.e2e-spec.ts`

Expected: initial selector/route differences fail visibly; correct them against the actual playground DOM without weakening CSS/state assertions.

- [ ] **Step 2: Migrate the remaining listed specs mechanically**

Use `test.describe`, `test.beforeEach`, Playwright locators, and awaited assertions. Preserve every legacy `it` title as a Playwright `test` title and every loop case as an independently reported test.

- [ ] **Step 3: Replace pixel checks with stable CSS or bounded measurements**

For an exact component contract, use `toHaveCSS`. For layout-dependent height, use:

```ts
const box = await locator.boundingBox();
expect(box).not.toBeNull();
expect(Math.round(box!.height)).toBe(expectedHeight);
```

- [ ] **Step 4: Run the static group twice**

Run: `npx playwright test e2e/{accordion,actions,alert,badge,card,chat,checkbox,flip-card,reveal-card,route-tabset,tabset,toggle,user}.e2e-spec.ts --repeat-each=2`

Expected: all migrated tests pass twice with no retry-only successes.

### Task 4: Migrate Interactive, Overlay, and Layout E2E Specs

**Files:**

- Modify: `e2e/context-menu.e2e-spec.ts`, `layout-footer.e2e-spec.ts`, `layout-header.e2e-spec.ts`, `layout-theme.e2e-spec.ts`, `layout.e2e-spec.ts`, `menu.e2e-spec.ts`, `popover.e2e-spec.ts`, `search.e2e-spec.ts`, `select.e2e-spec.ts`, `sidebar-one.e2e-spec.ts`, `sidebar-two.e2e-spec.ts`, `sidebar-three.e2e-spec.ts`, `sidebar.e2e-spec.ts`

**Interfaces:**

- Consumes: Task 2 fixed viewport and helper API.
- Produces: Playwright coverage for overlays, keyboard/click interaction, themes, navigation, sidebars, and layout geometry.

- [ ] **Step 1: Convert popover as the overlay RED case**

Use trigger interaction followed by observable state:

```ts
await trigger.click();
await expect(page.locator('nb-popover')).toBeVisible();
await page.keyboard.press('Escape');
await expect(page.locator('nb-popover')).toBeHidden();
```

Run: `npx playwright test e2e/popover.e2e-spec.ts`

Expected: FAIL until selectors and actual dismissal behavior match the playground.

- [ ] **Step 2: Convert context menu, search, select, and menu**

Use `click({ button: 'right' })` for context menus, keyboard presses for select/search contracts, and `expect(locator).toHaveClass()`/`toBeVisible()` for state. Never use `waitForTimeout`.

- [ ] **Step 3: Convert layout and sidebar families**

Keep the fixed 1280×800 viewport. Compare header/footer/sidebar/content rectangles relationally (`header.bottom <= content.top`, sidebar width changes after toggle) and preserve exact CSS checks only where they are component tokens rather than browser layout artifacts.

- [ ] **Step 4: Verify direct-route fallback**

Run one spec with `page.goto()` directly to its deepest playground route and assert `npg-root` plus the target showcase are attached.

- [ ] **Step 5: Run the interactive group twice**

Run: `npx playwright test e2e/{context-menu,layout-footer,layout-header,layout-theme,layout,menu,popover,search,select,sidebar-one,sidebar-two,sidebar-three,sidebar}.e2e-spec.ts --repeat-each=2`

Expected: all tests pass twice without arbitrary sleeps or order dependence.

### Task 5: Remove Protractor and Update Commands and CI

**Files:**

- Delete: `protractor.conf.js`, `e2e/.eslintrc.json`
- Modify: `angular.json`, `package.json`, `package-lock.json`, `eslint.config.mjs`, `.github/workflows/pr-check.yml`
- Modify: `packages-smoke/package.json`, `packages-smoke/package-lock.json`, `packages-smoke/angular.json`

**Interfaces:**

- Consumes: complete Playwright suite from Tasks 3–4.
- Produces: `npm run e2e` as the single E2E entry point and no active Protractor references.

- [ ] **Step 1: Make `npm run e2e` invoke Playwright**

Set root scripts:

```json
"e2e": "playwright test",
"e2e:install": "playwright install chromium"
```

Run: `npm run e2e`.

Expected: the complete migrated suite passes.

- [ ] **Step 2: Remove the Angular Protractor project and dependencies**

Delete `projects.playground-e2e` from `angular.json`. Run:

```powershell
npm uninstall --save-dev protractor @types/jasminewd2 jasmine-fail-fast jasmine-spec-reporter
```

Remove Protractor-only files after `rg` proves no Playwright code imports them.

- [ ] **Step 3: Extend native ESLint to E2E**

Add an `e2e/**/*.ts` flat-config block using the TypeScript parser and Playwright globals/types, then run `npx eslint e2e` and correct diagnostics without disabling behavioral rules globally.

- [ ] **Step 4: Update CI**

Before `npm run e2e`, add `npx playwright install --with-deps chromium`. Remove BrowserStack tunnel requirements from the active E2E job; retain unrelated BrowserStack unit-test infrastructure only where still used.

- [ ] **Step 5: Remove the smoke app's dead `ng e2e` command**

Replace `packages-smoke`'s `e2e` script with a Playwright or HTTP smoke command owned by Task 6, and remove its Protractor dependency/Angular e2e target if present.

- [ ] **Step 6: Prove removal**

Run: `rg -n "protractor|jasminewd2|ng e2e|build-angular:protractor" --glob '!CHANGELOG.md' --glob '!docs/articles/**' .`

Expected: no active configuration, dependency, or command reference remains.

### Task 6: Integrate Tarball and Consumer Release Validation

**Files:**

- Create: `tools/validate-package-tarballs.mjs`
- Modify: `package.json`, `.gitignore`
- Modify: `packages-smoke/package.json`, `packages-smoke/package-lock.json`
- Create or modify: `packages-smoke/e2e/smoke.spec.ts`, `packages-smoke/playwright.config.ts`
- Modify if required: `.github/workflows/pr-check.yml`

**Interfaces:**

- Consumes: `dist/{theme,auth,security,moment,date-fns,firebase-auth,eva-icons}` and package names/versions.
- Produces: `.tmp/package-tarballs/*.tgz`, verified manifests, browser/SSR consumer build, and `release:validate`.

- [ ] **Step 1: Write the failing tarball validator test-by-execution**

Create `tools/validate-package-tarballs.mjs` with package list:

```js
const packages = ['theme', 'auth', 'security', 'moment', 'date-fns', 'firebase-auth', 'eva-icons'];
```

The script must fail when any `dist/<name>/package.json` is missing, run `npm pack --json --pack-destination .tmp/package-tarballs` in each dist directory, parse the returned filename, assert the tarball size is greater than zero, and print one summary row per package.

Run before building packages: `node tools/validate-package-tarballs.mjs`.

Expected: FAIL if dist is absent or stale, proving the validator gates its input.

- [ ] **Step 2: Add package scripts**

Add:

```json
"pack:validate": "node tools/validate-package-tarballs.mjs",
"smoke:packages": "npm run build --prefix packages-smoke -- --configuration=production",
"release:validate": "npm-run-all build:packages test:packages build:wp docs:build e2e pack:validate smoke:packages lint test:version-matrix"
```

Keep sequential ordering where a consumer requires `dist` or tarballs.

- [ ] **Step 3: Point smoke dependencies at produced artifacts**

Use a deterministic prepare script to replace the seven Nebular `file:.lib/<name>` dependencies with the corresponding `.tmp/package-tarballs/*.tgz`, run `npm install --package-lock-only` in `packages-smoke`, then `npm ci`. Do not hand-edit integrity hashes.

- [ ] **Step 4: Build browser and SSR consumer outputs**

Run:

```powershell
npm run build --prefix packages-smoke -- --configuration=production
npm run build:ssr --prefix packages-smoke
```

Expected: both browser and server bundles succeed using packed Angular 22 libraries.

- [ ] **Step 5: Add and run the smoke browser test**

Create a Playwright test that loads the smoke app, asserts its root component and at least one Nebular component render, then navigates to a second route if present. Run it through `npm run e2e --prefix packages-smoke` with no Protractor target.

- [ ] **Step 6: Run complete acceptance validation**

Run:

```powershell
npm run release:validate
npm run lint
npx prettier --check playwright.config.ts "e2e/**/*.ts" "tools/**/*.mjs" "docs/superpowers/**/*.md"
npm run test:version-matrix
git diff --check
rg -n "\b(fit|fdescribe|xit|xdescribe)\s*\(" src e2e packages-smoke
```

Expected: every command exits 0; package tests include theme 824, security 100, auth 195, moment 47, date-fns 6, eva-icons 2, and firebase-auth 2; no focused/disabled tests are introduced.

- [ ] **Step 7: Leave the completed work uncommitted**

Run `git status --short` and report every changed/untracked file. Do not run `git add`, `git commit`, `git push`, or publish commands.
