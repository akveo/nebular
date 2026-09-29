# Angular 22 Theme Unit Tests and ESLint Design

## Goal

Restore a trustworthy Angular 22 validation baseline for `@nebular/theme`: all theme unit tests pass, ESLint runs with Angular ESLint 22, and fixes preserve Nebular's public behavior rather than weakening tests.

## Scope

This migration has two independently verifiable deliverables:

1. Migrate the `@nebular/theme` unit suite from its current 716 passing and 108 failing tests to a completely passing suite.
2. Replace removed Angular ESLint legacy presets with supported flat configuration and make the repository lint command executable again.

The work preserves the uncommitted Angular/CDK stage-3 changes already present in the working tree. Other packages, Firebase, documentation, playground, Playwright migration, and release validation remain later stages.

## Constraints

- Angular and CDK remain on 22.2.x and TypeScript remains on 6.0.x.
- Public Nebular component inputs, outputs, selectors, services, and package exports remain compatible unless a verified Angular 22 incompatibility makes that impossible.
- A failing legacy test is not automatically an obsolete test. Production behavior is investigated before changing its expectation.
- Tests must not be disabled, skipped, weakened to existence-only assertions, or made order-dependent.
- New test code uses public behavior and real components. Mocks are limited to slow or external boundaries.
- Unrelated formatting and refactoring are excluded.

## Failure Triage Architecture

Failures will be grouped by root cause rather than fixed file by file. Each group gets a representative isolated reproduction and a red-green verification cycle.

Expected groups based on the current suite output are:

- Angular 22 input update semantics where tests mutate component instances directly instead of using `ComponentRef.setInput()` or a host binding.
- Change-detection timing around `QueryList`, structural directives, projected content, overlays, and dynamic components.
- Browser layout and scroll assumptions in headless Chrome, including viewport dimensions and element scroll positions.
- Timer and asynchronous overlay behavior that requires `fakeAsync`, `tick`, or stability boundaries.
- Genuine production regressions revealed by Angular/CDK 22 behavior changes.

For each group, the first failing test is run in isolation. The implementation traces the value from test setup through Angular binding and rendering. A minimal hypothesis is tested before applying the pattern to sibling failures. Production code changes require a regression test that fails for the original behavior; test-only migrations must retain the original consumer-visible assertion.

## Test Migration Rules

- Prefer host components with template bindings when testing public inputs and outputs.
- Use `fixture.componentRef.setInput()` when a test intentionally exercises a component input without a host.
- Use `fixture.detectChanges()` and explicit stability or timer control at the lifecycle boundary that Angular applications use.
- Do not call private Angular or CDK APIs merely to preserve an old test arrangement.
- DOM assertions target semantic roles, public classes, rendered text, and observable events rather than generated Angular attributes.
- Layout tests use controlled dimensions where browser geometry is not deterministic.
- Every migrated failure remains capable of detecting the behavior it originally protected.

## Production Fix Policy

Production code changes are appropriate when an Angular 22 application would observe incorrect behavior, an exception, missing rendering, broken event emission, incorrect focus or scroll handling, or a public contract violation. They are not appropriate solely to make a legacy test's internal setup continue working.

Any production fix must be minimal, covered by a failing regression test, and verified against related components. If three attempted fixes in one failure group expose unrelated coupling, implementation stops and the group is redesigned before further changes.

## ESLint 22 Migration

`eslint.config.mjs` will consume the supported flat configurations exported by `angular-eslint` instead of resolving removed `plugin:@angular-eslint/*` legacy presets through `FlatCompat`.

The migration will:

- keep TypeScript, template, RxJS, Prettier, project-aware parser, and repository-specific rules;
- preserve the current ignore intent unless it prevents linting the files the command claims to validate;
- remove compatibility-layer imports that are no longer needed;
- keep configuration changes separate from source lint fixes so failures can be attributed correctly.

The lint command must exit successfully from a clean invocation. Newly surfaced diagnostics are fixed only where the rule is still intentional; obsolete rules are replaced or removed explicitly in the configuration.

## Verification

The deliverable is complete only when fresh commands demonstrate:

- `npm run test -- theme --watch=false`: every discovered theme test passes with zero skipped or failed tests.
- `npm run lint`: exits successfully using Angular ESLint 22 flat configuration.
- `npm run build -- theme`: builds the package successfully.
- Targeted tests for each migrated failure group pass independently.
- `npx prettier --check` passes for changed files.
- `git diff --check` reports no whitespace errors.

The final report lists the failure groups fixed, production behavior changes, test-only migrations, commands and counts, and any remaining warnings that do not affect correctness.

## Out of Scope

- Other Nebular package suites and builds.
- Firebase and AngularFire dependency decisions.
- Documentation and playground builds.
- Protractor-to-Playwright migration.
- Node/RxJS release matrix and tarball smoke applications.
