# Angular 22 Dependency Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the Nebular 18 / Angular 22 dependency and peer-dependency contract across the monorepo without changing framework runtime code.

**Architecture:** Keep build-time versions pinned to the currently verified Angular 22 releases while published package peers accept the full Angular 22 major. Encode the contract in a repository validation script so future package or CI edits cannot silently reintroduce Angular 21 metadata.

**Tech Stack:** Angular 22.2, Angular CLI 22.1, Angular CDK 22.2, TypeScript 6.0, Node.js 22.22, npm workspaces-style root lockfile.

**Spec:** Approved Angular 22 migration scope in the task conversation; no separate spec file exists for this bounded phase.

## Global Constraints

- Do not modify Angular/CDK runtime source in this phase.
- Nebular package version is `18.0.0`.
- Published Angular peer ranges are `^22.0.0`.
- Root build dependencies use Angular `^22.2.0`, CLI `^22.1.8`, CDK `^22.2.0`, and TypeScript `~6.0.3`.
- `@angular/fire` remains a documented unsupported peer-range blocker until the Firebase migration phase.
- The original `master` checkout must remain clean.

## Review Focus

- A framework package left at version 17 must fail validation.
- An internal `@nebular/*` peer left at 17 must fail validation.
- An Angular peer below major 22 must fail validation.
- CI or `.nvmrc` using Node 20 must fail validation.
- The known AngularFire peer mismatch must remain visible rather than being hidden by a global npm configuration.

---

### Task 1: Encode and apply the Angular 22 dependency matrix

**Files:**
- Create: `tools/validate-version-matrix.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.nvmrc`
- Modify: `.github/workflows/pr-check.yml`
- Modify: `.github/workflows/deploy-docs.yml`
- Modify: `packages-smoke/package.json`
- Modify: `packages-smoke/package-lock.json`
- Modify: `src/framework/*/package.json`

**Interfaces:**
- Consumes: the v17 package topology and existing Angular 21 manifests.
- Produces: `npm run test:version-matrix`, a zero-argument validation command that exits non-zero for stale package, Angular, TypeScript, or Node versions.

- [x] **Step 1: Add the version-matrix validator**

  The validator reads root, smoke, workflow, and framework manifests; it reports every mismatch in one run and exits with status 1 when mismatches exist.

- [x] **Step 2: Run the validator and verify RED**

  Run: `node tools/validate-version-matrix.mjs`

  Expected: FAIL listing the current Nebular 17, Angular 21, TypeScript 5.9, and Node 20 values.

- [x] **Step 3: Update root build and toolchain dependencies**

  Update Nebular to `18.0.0`, Angular to `22.2.0`, CLI/devkit to `22.1.8`, CDK to `22.2.0`, TypeScript to `6.0.3`, compatible eslint tooling, Zone.js, and the `test:version-matrix` script.

- [x] **Step 4: Update framework and smoke manifests**

  Set framework package versions and internal Nebular peers to `18.0.0`; set published Angular peers to `^22.0.0`; set the smoke application to Angular 22.

- [x] **Step 5: Update Node CI metadata**

  Set `.nvmrc` and both active GitHub workflows to Node `22.22.3`.

- [x] **Step 6: Regenerate lockfiles and expose the known AngularFire blocker**

  Bootstrap the root lockfile from the Angular 21 graph with npm's one-command `--force` exception, without adding a persistent `.npmrc`. Regenerate the smoke lockfile independently, then prove that a clean `npm ci` succeeds without an exception. Record the unsupported AngularFire peer range in the execution ledger.

- [x] **Step 7: Run the validator and verify GREEN**

  Run: `npm run test:version-matrix`

  Expected: PASS with the Nebular 18 / Angular 22 matrix and an explicit informational AngularFire blocker line.

- [x] **Step 8: Verify JSON integrity and inspect dependency state**

  Run: `node -e "for (const p of ['package.json','packages-smoke/package.json',...require('fs').readdirSync('src/framework').map(n => 'src/framework/'+n+'/package.json').filter(require('fs').existsSync)]) JSON.parse(require('fs').readFileSync(p,'utf8')); console.log('JSON OK')"`

  Expected: `JSON OK`.

  Run: `npm ls @angular/core @angular/cdk typescript --depth=0`

  Expected: Angular core 22.2.0, CDK 22.2.0, and TypeScript 6.0.3. Any failure must be only the separately recorded AngularFire peer mismatch.

- [x] **Step 9: Commit**

  ```bash
  git add .nvmrc .github package.json package-lock.json packages-smoke src/framework tools/validate-version-matrix.mjs docs/superpowers/plans/2026-09-23-angular22-dependency-matrix.md
  git commit -m "build: establish Angular 22 dependency matrix"
  ```
