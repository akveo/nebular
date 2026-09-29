# Angular 22 Theme Unit Tests and ESLint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore a trustworthy Angular 22 baseline in which all 824 `@nebular/theme` unit tests, repository ESLint, and the theme package build pass.

**Architecture:** Treat the current 107 failures as clusters of shared causes rather than 107 independent defects. Establish a reproducible inventory, repair browser geometry and Angular input/change-detection test patterns at their owning boundaries, make production changes only for demonstrated consumer-visible regressions, then migrate ESLint to native Angular ESLint 22 flat configuration.

**Tech Stack:** Angular 22.2, Angular CDK 22.2, TypeScript 6.0, Jasmine 3.10, Karma 6.4, ChromeHeadless, ESLint 9, angular-eslint 22.5, typescript-eslint 8.70, RxJS 6/7.

**Spec:** `docs/superpowers/specs/2026-09-23-theme-unit-eslint-angular22-design.md`

## Global Constraints

- Angular and CDK remain on 22.2.x and TypeScript remains on 6.0.x.
- Preserve all public Nebular component inputs, outputs, selectors, services, and package exports unless a verified Angular 22 incompatibility makes that impossible.
- Do not disable or skip tests, weaken assertions to existence-only checks, or introduce order dependence.
- Prefer host bindings or `ComponentRef.setInput()` over direct mutation of Angular inputs.
- Use production changes only when an Angular 22 consumer can observe incorrect behavior.
- Keep mocks at browser, timer, or external-service boundaries and exclude unrelated formatting or refactoring.
- Preserve the Angular/CDK stage-3 behavior committed in `f69058a`.

## Review Focus

- A component input changed after first render must update the DOM and directive state on the next Angular change-detection pass; Tasks 3 and 4 pin this with host-bound and `setInput()` tests.
- An overlay whose content, context, trigger, position, or class changes must reopen/update with the new public values; Task 5 exercises each content kind and configuration path.
- Viewport and scroll services must report layout-container coordinates when it exists and browser viewport coordinates when it does not; Task 2 covers both branches and post-scroll emissions.
- Projected content, `QueryList` children, and dynamically created views must settle before assertions without relying on suite order; Tasks 3 and 6 add explicit lifecycle/stability boundaries.
- Lint must process TypeScript, inline templates, and HTML templates with the intended Angular, TypeScript, RxJS, and Prettier rules while retaining repository ignores; Task 7 validates representative files and the complete `src` tree.

---

### Task 1: Capture and Classify the Angular 22 Failure Baseline

**Files:**

- Create: `docs/superpowers/evidence/theme-angular22-failure-inventory.md`
- Read: `karma.conf.js`
- Read: `angular.json`

**Interfaces:**

- Consumes: Karma project `theme`, launcher `ChromeHeadlessLocal`, and the 824-test suite.
- Produces: a checked-in inventory table with columns `spec`, `test`, `symptom`, `root-cause group`, and `owning task`; later tasks use it as their completion ledger.

- [ ] **Step 1: Record the current deterministic baseline**

Run:

```powershell
npm run test -- theme --watch=false
```

Expected: all 824 tests execute in non-random order; the current baseline is `107 FAILED, 717 SUCCESS`. If the count changes, record the observed count and full failing-test names rather than forcing the old number.

- [ ] **Step 2: Create the failure ledger from the observed output**

Create `docs/superpowers/evidence/theme-angular22-failure-inventory.md` with this exact structure and one row per failing Jasmine test:

```markdown
# Angular 22 Theme Failure Inventory

Baseline: `npm run test -- theme --watch=false`

| Spec                                 | Test                                                          | Symptom                       | Root-cause group       | Owning task |
| ------------------------------------ | ------------------------------------------------------------- | ----------------------------- | ---------------------- | ----------- |
| `services/ruler.service.spec.ts`     | `should get dimensions from scrollable`                       | layout coordinates differ     | geometry/scroll        | Task 2      |
| `services/scroll.service.spec.ts`    | `should get updated scroll position on scrollable`            | stale position                | geometry/scroll        | Task 2      |
| `components/actions/actions.spec.ts` | `link with icon should contain router link if link input set` | conditional view not rendered | input/change detection | Task 3      |
```

Add every remaining failure under one of: `geometry/scroll`, `input/change detection`, `overlay/async`, `query/projection/dynamic view`, or `production regression`. Do not classify from the exception text alone: inspect the test setup and component path first.

- [ ] **Step 3: Prove the ledger is complete**

Count failure rows and compare them with the Karma total. Expected: the number of ledger rows equals the observed `FAILED` count, and every row has an owning task.

- [ ] **Step 4: Commit the baseline evidence**

```powershell
git add docs/superpowers/evidence/theme-angular22-failure-inventory.md
git commit -m "test: inventory Angular 22 theme failures"
```

### Task 2: Stabilize Viewport, Layout, and Scroll Contracts

**Files:**

- Modify: `src/framework/theme/services/ruler.service.spec.ts`
- Modify: `src/framework/theme/services/scroll.service.spec.ts`
- Modify if a consumer-visible defect is proven: `src/framework/theme/services/ruler.service.ts`
- Modify if a consumer-visible defect is proven: `src/framework/theme/services/scroll.service.ts`
- Modify if adapter coverage exposes a regression: `src/framework/theme/components/cdk/adapter/viewport-ruler-adapter.ts`
- Modify: `docs/superpowers/evidence/theme-angular22-failure-inventory.md`

**Interfaces:**

- Consumes: `NbViewportRulerAdapter.getViewportSize()`, `getViewportScrollPosition()`, layout scrollable registration, and RxJS position/dimension streams.
- Produces: deterministic geometry tests for layout-present and layout-absent branches without hard-coding host Chrome decoration sizes.

- [ ] **Step 1: Isolate the current geometry failures**

Temporarily focus only the failing `NbLayoutRulerService` and `NbScrollService` examples with Jasmine `fit`, run `npm run test -- theme --watch=false`, capture the actual values and call path, then immediately restore `it`. Never commit focused tests.

Expected: failures reproduce without other specs and reveal whether the service reads the layout scrollable or the browser viewport.

- [ ] **Step 2: Add controlled layout geometry to the specs**

Replace browser-dependent assumptions with spies on the public geometry boundary, preserving the semantic assertions:

```ts
spyOn(scrollable, 'getBoundingClientRect').and.returnValue({
  top: 0,
  left: 0,
  right: 977,
  bottom: 617,
  width: 977,
  height: 617,
  x: 0,
  y: 0,
  toJSON: () => ({}),
});
```

For scroll position, set `scrollable.scrollTop` and `scrollable.scrollLeft`, dispatch a `scroll` event, and assert the emitted `{ top, left }` after the service's documented throttle boundary.

- [ ] **Step 3: Add the no-layout fallback regression test**

Cover the stage-3 adapter branch explicitly:

```ts
layoutService.scrollable.next(null);
expect(adapter.getViewportSize()).toEqual(cdkViewportSize);
expect(adapter.getViewportScrollPosition()).toEqual(cdkScrollPosition);
```

This test must fail if the adapter returns zeros or retains stale layout values.

- [ ] **Step 4: Make the smallest production correction only if Step 2 still fails**

If controlled geometry reaches the wrong branch, adjust only the service/adapter selection logic. Do not add test-environment checks or Chrome-specific constants. Keep synchronous one-shot subscriptions closed after reading the current layout scrollable.

- [ ] **Step 5: Run the geometry group and update the ledger**

Run `npm run test -- theme --watch=false` with only the two geometry spec files included via a temporary local `angular.json` include, then restore `angular.json`. Expected: every Task 2 ledger row passes. Mark those rows `resolved` with `test-only` or `production` in the symptom column.

- [ ] **Step 6: Commit the geometry cluster**

```powershell
git add src/framework/theme/services/ruler.service.spec.ts src/framework/theme/services/scroll.service.spec.ts src/framework/theme/components/cdk/adapter/viewport-ruler-adapter.ts docs/superpowers/evidence/theme-angular22-failure-inventory.md
git commit -m "test(theme): stabilize layout geometry on Angular 22"
```

### Task 3: Migrate Conditional and Projected Component Tests to Angular Input Semantics

**Files:**

- Modify: `src/framework/theme/components/actions/actions.spec.ts`
- Modify: `src/framework/theme/components/badge/badge.component.spec.ts`
- Modify: `src/framework/theme/components/button/button.spec.ts`
- Modify: `src/framework/theme/components/button-group/button-group.spec.ts`
- Modify: `src/framework/theme/components/checkbox/checkbox.spec.ts`
- Modify: `src/framework/theme/components/radio/radio.spec.ts`
- Modify: `src/framework/theme/components/tag/tag.spec.ts`
- Modify: `src/framework/theme/components/toggle/toggle.spec.ts`
- Modify: `docs/superpowers/evidence/theme-angular22-failure-inventory.md`

**Interfaces:**

- Consumes: Angular host bindings, `ComponentFixture.componentRef.setInput(name, value)`, and existing public component inputs/outputs.
- Produces: tests whose setup follows the same binding and lifecycle path as an Angular 22 application.

- [ ] **Step 1: Pin the representative action-component failure**

Run only `actions.spec.ts` and confirm that `link with icon should contain router link if link input set` fails because the conditional anchor view was not updated after legacy setup.

- [ ] **Step 2: Replace direct input assignment with Angular-managed updates**

For a direct component fixture, use this pattern before `detectChanges()`:

```ts
fixture.componentRef.setInput('link', '/home');
fixture.componentRef.setInput('icon', 'home');
fixture.detectChanges();
```

For projected content or multiple interacting inputs, bind host properties in the test template and mutate the host:

```ts
hostFixture.componentInstance.link = '/home';
hostFixture.componentInstance.disabled = true;
hostFixture.detectChanges();
```

Keep the original assertions for anchors, router links, icons, badges, disabled classes, titles, and emitted events.

- [ ] **Step 3: Apply the same lifecycle correction to the listed simple controls**

Change only setup that bypasses Angular input processing. Do not rewrite existing assertions, component templates, or output contracts. Add an update-after-first-render example for at least one boolean input and one string/enum input.

- [ ] **Step 4: Verify the cluster and guard against skipped tests**

Run the listed spec files as one temporary include set, restore `angular.json`, and run:

```powershell
rg -n "\b(fit|fdescribe|xit|xdescribe)\b" src/framework/theme
```

Expected: all cluster tests pass and the search finds no focused/skipped test introduced by this task.

- [ ] **Step 5: Update the ledger and commit**

```powershell
git add src/framework/theme/components/actions/actions.spec.ts src/framework/theme/components/badge/badge.component.spec.ts src/framework/theme/components/button/button.spec.ts src/framework/theme/components/button-group/button-group.spec.ts src/framework/theme/components/checkbox/checkbox.spec.ts src/framework/theme/components/radio/radio.spec.ts src/framework/theme/components/tag/tag.spec.ts src/framework/theme/components/toggle/toggle.spec.ts docs/superpowers/evidence/theme-angular22-failure-inventory.md
git commit -m "test(theme): use Angular-managed inputs for controls"
```

### Task 4: Migrate Stateful Collection and Navigation Tests

**Files:**

- Modify: `src/framework/theme/components/menu/menu.spec.ts`
- Modify: `src/framework/theme/components/select/select.spec.ts`
- Modify: `src/framework/theme/components/select-with-autocomplete/select-with-autocomplete.spec.ts`
- Modify: `src/framework/theme/components/sidebar/sidebar.spec.ts`
- Modify: `src/framework/theme/components/stepper/stepper.spec.ts`
- Modify: `src/framework/theme/components/tabset/tabset.component.spec.ts`
- Modify: `src/framework/theme/components/tree-grid/tree-grid.component.spec.ts`
- Modify only if a public behavior regression is proven: the matching `.component.ts` or service file beside a failing spec
- Modify: `docs/superpowers/evidence/theme-angular22-failure-inventory.md`

**Interfaces:**

- Consumes: public collection inputs, `QueryList`-backed children, router/location test doubles, selection models, and Angular change detection.
- Produces: deterministic collection, selection, disabled-state, navigation, and row/column rendering behavior after initial render and subsequent input updates.

- [ ] **Step 1: Reproduce one failure from each collection family in isolation**

Run one failing example each for menu/navigation, select, sidebar/stepper/tabset, and tree-grid. Trace whether the stale value originates in host setup, a `QueryList` lifecycle boundary, or production state synchronization.

- [ ] **Step 2: Convert input setup without bypassing `ngOnChanges`**

Use `setInput()` for direct fixtures and host properties for projected options/items. For example:

```ts
fixture.componentRef.setInput('selected', 'Option 1');
fixture.detectChanges();
expect(getSelectedText()).toContain('Option 1');
```

After changing projected children, call `detectChanges()` and `await fixture.whenStable()` before inspecting the resulting collection.

- [ ] **Step 3: Add update-path assertions for the Review Focus cases**

Cover at minimum: menu items replaced after initial render, selected option changed, disabled state toggled, tab/step changed, tree-grid columns/data replaced. Each test must assert rendered or emitted public behavior, not an internal field.

- [ ] **Step 4: Correct production synchronization only when host-bound tests expose it**

If a host-bound update still leaves stale consumer-visible state, implement the smallest lifecycle/state-model correction beside that component and retain the failing host-bound test as regression coverage. Do not call private CDK methods.

- [ ] **Step 5: Verify, update the ledger, and commit**

Run the seven listed specs together, restore temporary configuration, mark every owned ledger row resolved, then commit:

```powershell
git add src/framework/theme/components/menu src/framework/theme/components/select src/framework/theme/components/select-with-autocomplete src/framework/theme/components/sidebar src/framework/theme/components/stepper src/framework/theme/components/tabset src/framework/theme/components/tree-grid docs/superpowers/evidence/theme-angular22-failure-inventory.md
git commit -m "test(theme): migrate stateful component fixtures"
```

### Task 5: Repair Overlay, Dynamic Content, and Timer Tests

**Files:**

- Modify: `src/framework/theme/components/popover/popover.spec.ts`
- Modify: `src/framework/theme/components/tooltip/tooltip.spec.ts`
- Modify: `src/framework/theme/components/context-menu/context-menu.spec.ts`
- Modify: `src/framework/theme/components/cdk/overlay/overlay-trigger.spec.ts`
- Modify: `src/framework/theme/components/cdk/overlay/overlay-position.spec.ts`
- Modify: `src/framework/theme/components/cdk/overlay/dynamic/dynamic-overlay.spec.ts`
- Modify: `src/framework/theme/components/cdk/overlay/dynamic/dynamic-overlay-handler.spec.ts`
- Modify only when a consumer-visible failure remains: corresponding production overlay/directive files beside these specs
- Modify: `docs/superpowers/evidence/theme-angular22-failure-inventory.md`

**Interfaces:**

- Consumes: string/component/template overlay content, context, trigger, position, adjustment, CSS class, overlay container, and timer-driven show/hide behavior.
- Produces: deterministic tests that update public bindings and flush the exact asynchronous boundary before inspecting the overlay DOM.

- [ ] **Step 1: Isolate one content update and one delayed show/hide failure**

Run representative popover/tooltip/context-menu tests. Confirm whether the failure precedes overlay creation, occurs during input update, or is only an unflushed timer/stability boundary.

- [ ] **Step 2: Route overlay configuration through Angular bindings**

Replace direct assignments such as `fixture.componentInstance.content = ...` with host-bound changes or `setInput()`. Preserve coverage for all three content forms:

```ts
fixture.componentRef.setInput('content', 'new string');
fixture.detectChanges();
```

Repeat with the component type and `TemplateRef`, and retain assertions for rendered text/component/context.

- [ ] **Step 3: Make timer boundaries explicit**

Use `fakeAsync` only for genuinely timer-driven behavior:

```ts
triggerOverlay();
tick(showDelay);
fixture.detectChanges();
expect(overlayContainerElement.querySelector('.expected-class')).not.toBeNull();
flush();
```

Use `await fixture.whenStable()` for promise/change-detection settling. Do not combine arbitrary `tick()` durations with `whenStable()` to make a flaky test pass.

- [ ] **Step 4: Cover configuration changes after first attachment**

For popover, tooltip, and context menu, update content/items plus trigger, position, adjustment, context/tag, status/icon, and class through public bindings, then assert the next attachment reflects the new values.

- [ ] **Step 5: Verify, update the ledger, and commit**

Run the seven overlay specs together twice to detect order/timer leakage. Restore temporary include changes, mark owned ledger rows resolved, and commit:

```powershell
git add src/framework/theme/components/popover src/framework/theme/components/tooltip src/framework/theme/components/context-menu src/framework/theme/components/cdk/overlay docs/superpowers/evidence/theme-angular22-failure-inventory.md
git commit -m "test(theme): stabilize overlay behavior on Angular 22"
```

### Task 6: Resolve Remaining Query, Projection, Calendar, and Dynamic-View Failures

**Files:**

- Modify: failing specs still marked unresolved in `docs/superpowers/evidence/theme-angular22-failure-inventory.md`
- Modify only after a host-level regression is proven: matching production files beside those specs
- Modify: `docs/superpowers/evidence/theme-angular22-failure-inventory.md`

**Interfaces:**

- Consumes: the exhaustive ledger from Task 1 after Tasks 2–5, Angular `QueryList`/projection lifecycle, calendar inputs, and dynamic component rendering.
- Produces: zero unresolved ledger rows and a full theme suite with no failures hidden by earlier cascades.

- [ ] **Step 1: Run the full suite and reconcile the residual list**

Run `npm run test -- theme --watch=false`. For every residual failure, verify it already exists in the ledger; add no new category without recording its symptom and owning it in Task 6.

- [ ] **Step 2: Isolate each residual root cause, not each assertion**

For the first residual in a component family, focus that example temporarily and trace setup → binding → lifecycle → rendered/event result. Apply the resulting fix only to sibling tests with the same demonstrated cause, restoring `it` before each verification run.

- [ ] **Step 3: Preserve meaningful calendar and dynamic-view contracts**

Use host bindings or `setInput()` for calendar range/single-date values and wait for projected/dynamic views to settle. Assert selected/range cells, navigation output, rendered dynamic content, and cleanup on destroy. Never reintroduce duplicate input aliases or private CDK injection tokens removed in stage 3.

- [ ] **Step 4: Add regression coverage for every production edit**

Before changing production code, keep one host-level test red that demonstrates the consumer-visible defect. Make the minimal production edit, rerun that test to green, then run all specs for the affected component family.

- [ ] **Step 5: Close the ledger and verify the complete suite**

Run:

```powershell
npm run test -- theme --watch=false
rg -n "\|.*\|.*\|.*\|.*\| Task [2-6] \|$" docs/superpowers/evidence/theme-angular22-failure-inventory.md
rg -n "\b(fit|fdescribe|xit|xdescribe)\b" src/framework/theme
```

Expected: `824 SUCCESS`, zero failed/skipped/focused tests, and every inventory row explicitly marked `resolved` rather than left as an unresolved Task 2–6 assignment.

- [ ] **Step 6: Commit residual fixes**

Stage only files named by the remaining ledger rows plus the ledger itself, inspect `git diff --cached --name-only`, then commit:

```powershell
git commit -m "test(theme): complete Angular 22 unit migration"
```

### Task 7: Migrate ESLint to Angular ESLint 22 Flat Config

**Files:**

- Modify: `eslint.config.mjs`
- Modify only for diagnostics from retained rules: lint-reported files under `src/`

**Interfaces:**

- Consumes: `angular-eslint` flat presets, `typescript-eslint` flat presets/parser, `eslint-plugin-rxjs-x`, `eslint-config-prettier`, root `tsconfig.json`, and `e2e/tsconfig.json`.
- Produces: `npm run lint` that processes TypeScript, inline templates, and HTML templates without `FlatCompat` or removed eslintrc preset names.

- [ ] **Step 1: Preserve the current failure as the red configuration test**

Run `npm run lint`. Expected before migration: configuration resolution fails on removed `plugin:@angular-eslint/recommended` legacy config, before source diagnostics are evaluated.

- [ ] **Step 2: Replace legacy compatibility presets with native flat presets**

Refactor the imports and exported array around this shape, merging the repository's existing rules into the TypeScript block:

```js
import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier';
import rxjs from 'eslint-plugin-rxjs-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['src/framework/**/*'] },
  {
    files: ['**/*.ts'],
    extends: [...angular.configs.tsRecommended, ...angular.configs.templateProcessInlineTemplates, prettier],
    // Preserve project parser options, rxjs plugin, and repository rules here.
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, prettier],
  },
  {
    files: ['./*.js'],
    languageOptions: { globals: globals.node, ecmaVersion: 2020, sourceType: 'commonjs' },
  },
);
```

Verify actual exported preset names from the installed `angular-eslint` package before editing; use its public flat exports and do not recreate removed legacy preset strings.

- [ ] **Step 3: Run configuration inspection on representative files**

Run:

```powershell
npx eslint --print-config src/app/app.component.ts
npx eslint --print-config src/app/app.component.html
```

Expected: TypeScript output contains Angular, TypeScript, RxJS, and repository rules; HTML output contains Angular template rules; neither command reports a missing config or parser.

- [ ] **Step 4: Run the complete lint command and resolve retained-rule diagnostics**

Run `npm run lint`. Fix only diagnostics produced by rules intentionally retained from the old configuration. If an obsolete rule has no Angular 22 equivalent, remove it explicitly from `eslint.config.mjs` and document the reason in an adjacent comment rather than broadly disabling its plugin.

- [ ] **Step 5: Verify ignores do not silently erase the intended target**

Run `npx eslint src/app/app.component.ts src/app/app.component.html` and one intentionally ignored `src/framework/theme/**/*.ts` file with `--debug`. Expected: app TS/HTML files are linted; the framework path remains ignored exactly as the existing configuration intended. Record framework linting as out of scope rather than changing ignore scope in this migration.

- [ ] **Step 6: Commit lint migration separately**

```powershell
git add eslint.config.mjs src
git diff --cached --name-only
git commit -m "build: migrate to angular-eslint 22 flat config"
```

### Task 8: Final Integrated Verification and Handoff

**Files:**

- Modify only if verification exposes a regression: files owned by the failing earlier task
- Read: `docs/superpowers/evidence/theme-angular22-failure-inventory.md`

**Interfaces:**

- Consumes: all preceding task commits.
- Produces: evidence that unit tests, lint, formatting, whitespace, and package compilation pass together from the final tree.

- [ ] **Step 1: Run the complete acceptance sequence from a fresh shell**

```powershell
npm run test -- theme --watch=false
npm run lint
npm run build -- theme
npx prettier --check eslint.config.mjs "src/framework/theme/**/*.ts" "docs/superpowers/**/*.md"
git diff --check
```

Expected: theme reports `824 SUCCESS` with zero failures, lint exits 0, theme builds, Prettier exits 0, and `git diff --check` prints nothing.

- [ ] **Step 2: Verify the anti-regression constraints**

```powershell
rg -n "\b(fit|fdescribe|xit|xdescribe)\b" src/framework/theme
git diff 268912d..HEAD -- src/framework/theme | rg "private Angular|_VIEW_REPEATER_STRATEGY"
```

Expected: no focused/skipped tests were added and no removed private CDK token was reintroduced. Manually inspect all changed assertions to confirm none became existence-only substitutes for behavioral assertions.

- [ ] **Step 3: Review the branch diff by responsibility**

Run `git diff --stat 268912d..HEAD` and `git log --oneline 268912d..HEAD`. Confirm separate commits exist for baseline evidence, geometry, simple inputs, stateful collections, overlays, residuals, and ESLint; ensure no Firebase, docs/playground, or e2e implementation entered the diff.

- [ ] **Step 4: Commit verification-only corrections, if any**

If final verification required code changes, rerun the entire Step 1 sequence and commit only those corrections:

```powershell
git add src/framework/theme eslint.config.mjs docs/superpowers/evidence/theme-angular22-failure-inventory.md
git diff --cached --name-only
git commit -m "fix: address Angular 22 verification regressions"
```

If no corrections were needed, do not create an empty commit.

- [ ] **Step 5: Prepare the implementation report**

Report the final test count, lint/build/format commands, failure groups fixed, production behavior changes versus test-only migrations, commit list, and any non-blocking Angular/Karma deprecation warnings. Do not claim completion without the fresh Step 1 output.
