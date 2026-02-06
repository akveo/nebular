/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectTargetOptions,
  getAppModulePath,
  getProjectMainFile,
  parseSourceFile,
} from '@angular/cdk/schematics';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { getWorkspace } from '@schematics/angular/utility/workspace';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';

// Helper function to get file content (removed from @schematics/angular/utility/test in Angular 21)
function getFileContent(tree: Tree, path: string): string {
  const fileEntry = tree.get(path);
  if (!fileEntry) {
    throw new Error(`File ${path} not found`);
  }
  return fileEntry.content.toString();
}

import { Schema as NgAddOptions } from './schema';

const workspaceOptions: WorkspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '7.0.0',
};

const defaultAppOptions: ApplicationOptions = {
  name: 'nebular',
  inlineStyle: false,
  inlineTemplate: false,
  routing: false,
  style: Style.Scss,
  skipTests: false,
  skipPackageJson: false,
};

const EXPECTED_STYLES_SCSS = `@use 'themes' as *;

@use '@nebular/theme/styles/globals' as *;

@include nb-install() {
  @include nb-theme-global();
};
`;

const EXPECTED_THEME_SCSS = `@forward '@nebular/theme/styles/theming';
@use '@nebular/theme/styles/theming' as *;
@use '@nebular/theme/styles/themes/default';

$nb-themes: nb-register-theme((

  // add your variables here like:

  // color-primary-100: #f2f6ff,
  // color-primary-200: #d9e4ff,
  // color-primary-300: #a6c1ff,
  // color-primary-400: #598bff,
  // color-primary-500: #3366ff,
  // color-primary-600: #274bdb,
  // color-primary-700: #1a34b8,
  // color-primary-800: #102694,
  // color-primary-900: #091c7a,

), default, default);
`;

async function createTestWorkspace(runner: SchematicTestRunner, appOptions: Partial<ApplicationOptions> = {}) {
  const workspace: UnitTestTree = await runner.runExternalSchematic(
    '@schematics/angular',
    'workspace',
    workspaceOptions,
  );
  const options = { ...defaultAppOptions, ...appOptions };
  return runner.runExternalSchematic('@schematics/angular', 'application', options, workspace);
}

function getPackageDependencies(tree: Tree): any {
  const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
  return packageJson.dependencies;
}

describe('ng-add', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  function runNgAddSchematic(options: Partial<NgAddOptions> = {}) {
    return runner.runSchematic('ng-add', { project: defaultAppOptions.name, ...options }, appTree);
  }

  function runSetupSchematic(options: Partial<NgAddOptions> = {}) {
    return runner.runSchematic('setup', { project: defaultAppOptions.name, ...options }, appTree);
  }

  function runPostInstallSchematic(options: Partial<NgAddOptions> = {}) {
    return runner.runSchematic('post-install', { project: defaultAppOptions.name, ...options }, appTree);
  }

  beforeEach(async () => {
    const collectionPath = require.resolve('../collection.json');
    runner = new SchematicTestRunner('schematics', collectionPath);

    appTree = await createTestWorkspace(runner);
  });

  describe('ng-add', () => {
    let tree: UnitTestTree;

    beforeEach(async () => {
      tree = await runNgAddSchematic();
    });

    it('should add @angular/cdk in package.json', () => {
      const dependencies = getPackageDependencies(tree);
      const angularCdkVersion = require('../../package.json').peerDependencies['@angular/cdk'];

      expect(dependencies['@angular/cdk']).toBeDefined();
      expect(dependencies['@angular/cdk']).toBe(angularCdkVersion);
    });

    it('should add @angular/animations in package.json', function () {
      const dependencies = getPackageDependencies(tree);
      const angularCoreVersion = dependencies['@angular/core'];

      expect(dependencies['@angular/animations']).toBeDefined();
      expect(dependencies['@angular/animations']).toBe(angularCoreVersion);
    });

    it('should add @nebular/theme in package.json', function () {
      const dependencies = getPackageDependencies(tree);
      const nebularThemeVersion = require('../../package.json').version;

      expect(dependencies['@nebular/theme']).toBeDefined();
      expect(dependencies['@nebular/theme']).toBe(nebularThemeVersion);
    });

    it('should add @nebular/eva-icons in package.json', async function () {
      let dependencies = getPackageDependencies(tree);
      const nebularEvaIconsVersion = require('../../package.json').version;

      expect(dependencies['@nebular/eva-icons']).toBeDefined();
      expect(dependencies['@nebular/eva-icons']).toBe(nebularEvaIconsVersion);

      const updatedTree = await runPostInstallSchematic();
      dependencies = getPackageDependencies(updatedTree);

      const evaIconsVersion = require('../../../eva-icons/package.json').peerDependencies['eva-icons'];
      expect(dependencies['eva-icons']).toBeDefined();
      expect(dependencies['eva-icons']).toBe(evaIconsVersion);
    });
  });

  it('should register NbThemeModule.forRoot()', async () => {
    const tree = await runSetupSchematic();
    const appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');
    expect(appModuleContent).toContain(`NbThemeModule.forRoot({ name: 'default' })`);
  });

  it('should register NbThemeModule with specified theme', async () => {
    const tree = await runSetupSchematic({ theme: 'cosmic' });
    const appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');

    expect(appModuleContent).toContain(`NbThemeModule.forRoot({ name: 'cosmic' })`);
  });

  it('should register NbLayoutModule', async () => {
    const tree = await runSetupSchematic();
    const appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');

    expect(appModuleContent).toContain(`NbLayoutModule`);
  });

  it('should create AppRoutingModule if no Router already registered', async () => {
    const tree = await runSetupSchematic();
    const appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');

    expect(appModuleContent).toContain(`AppRoutingModule`);
    expect(tree.files).toContain('/projects/nebular/src/app/app-routing.module.ts');
  });

  it('should register inline theme if no theme already registered', async () => {
    const tree = await runSetupSchematic({ customization: false });
    const workspace = await getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, defaultAppOptions.name);
    const styles = getProjectTargetOptions(project, 'build').styles;

    expect(styles).toContain('./node_modules/@nebular/theme/styles/prebuilt/default.css');
  });

  it('should create theme.scss and plug it into the project', async () => {
    appTree = await createTestWorkspace(runner, { style: Style.Scss });
    const tree = await runSetupSchematic({ customization: true });
    const styles = tree.readContent('/projects/nebular/src/styles.scss');
    const themes = tree.readContent('/projects/nebular/src/themes.scss');

    expect(styles).toContain(EXPECTED_STYLES_SCSS);
    expect(themes).toContain(EXPECTED_THEME_SCSS);
  });

  it('should throw error if adding scss themes in css project', async () => {
    appTree = await createTestWorkspace(runner, { style: Style.Css });

    try {
      await runSetupSchematic({ customization: true });
      fail('Expected schematic to throw an error');
    } catch (error) {
      // Expected to throw
      expect(error).toBeDefined();
    }
  });

  it('should add the BrowserAnimationsModule to the project module', async () => {
    const tree = await runSetupSchematic({ animations: true });
    const fileContent = getFileContent(tree, '/projects/nebular/src/app/app.module.ts');

    expect(fileContent).toContain(
      'BrowserAnimationsModule',
      'Expected the project app module to import the "BrowserAnimationsModule".',
    );
  });

  it('should add the NoopAnimationsModule to the project module', async () => {
    const tree = await runSetupSchematic({ animations: false });
    const fileContent = getFileContent(tree, '/projects/nebular/src/app/app.module.ts');

    expect(fileContent).toContain(
      'NoopAnimationsModule',
      'Expected the project app module to import the "NoopAnimationsModule".',
    );
  });

  it('should not add NoopAnimationsModule if BrowserAnimationsModule is set up', async () => {
    const workspace = await getWorkspace(appTree);
    const project = getProjectFromWorkspace(workspace, defaultAppOptions.name);

    // Simulate the case where a developer uses `ng-add` on an Angular CLI project which already
    // explicitly uses the `BrowserAnimationsModule`. It would be wrong to forcibly change
    // to noop animations.
    addModuleImportToRootModule(appTree, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);

    const tree = await runSetupSchematic({ animations: false });
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));
    const fileContent = parseSourceFile(tree, appModulePath);

    expect(fileContent).not.toContain(
      'NoopAnimationsModule',
      'Expected the project app module to not import the "NoopAnimationsModule".',
    );
  });
});
