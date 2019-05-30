/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { addModuleImportToRootModule, getProjectFromWorkspace, getProjectTargetOptions } from '@angular/cdk/schematics';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { getFileContent } from '@schematics/angular/utility/test';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions, Style } from '@schematics/angular/application/schema';

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

const EXPECTED_STYLES_SCSS = `@import 'themes';

@import '~@nebular/theme/styles/globals';

@include nb-install() {
  @include nb-theme-global();
};
`;

const EXPECTED_THEME_SCSS = `@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/default';

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

function createTestWorkspace(runner: SchematicTestRunner, appOptions: Partial<ApplicationOptions> = {}) {
  const workspace = runner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
  return runner.runExternalSchematicAsync('@schematics/angular', 'application',
    { ...defaultAppOptions, ...appOptions }, workspace);
}

function getPackageDependencies(tree: Tree): any {
  const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
  return packageJson.dependencies;
}

describe('ng-add', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  function runNgAddSchematic(options: Partial<NgAddOptions> = {}) {
    return runner.runSchematicAsync('ng-add', options, appTree);
  }

  function runSetupSchematic(options: Partial<NgAddOptions> = {}) {
    return runner.runSchematic('setup', options, appTree);
  }

  function runPostInstallSchematic(options: Partial<NgAddOptions> = {}) {
    return runner.runSchematic('post-install', options, appTree);
  }

  beforeEach((done) => {
    const collectionPath = require.resolve('../collection.json');
    runner = new SchematicTestRunner('schematics', collectionPath);

    createTestWorkspace(runner).subscribe(tree => {
      appTree = tree;
      done();
    });
  });

  describe('ng-add', () => {
    let tree: UnitTestTree;

    beforeEach((done) => {
      runNgAddSchematic().subscribe((applicationTree: UnitTestTree) => {
        tree = applicationTree;
        done();
      });
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

    it('should add @nebular/eva-icons in package.json', function () {
      let dependencies = getPackageDependencies(tree);
      const nebularEvaIconsVersion = require('../../package.json').version;

      expect(dependencies['@nebular/eva-icons']).toBeDefined();
      expect(dependencies['@nebular/eva-icons']).toBe(nebularEvaIconsVersion);

      tree = runPostInstallSchematic();
      dependencies = getPackageDependencies(tree);

      const evaIconsVersion = require('../../../eva-icons/package.json').peerDependencies['eva-icons'];
      expect(dependencies['eva-icons']).toBeDefined();
      expect(dependencies['eva-icons']).toBe(evaIconsVersion);
    });
  });

  it('should register NbThemeModule.forRoot()', () => {
    const tree = runSetupSchematic();
    const appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');

    expect(appModuleContent).toContain(`NbThemeModule.forRoot({ name: 'default' })`);
  });

  it('should register NbThemeModule with specified theme', () => {
    const tree = runSetupSchematic({ theme: 'cosmic' });
    const appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');

    expect(appModuleContent).toContain(`NbThemeModule.forRoot({ name: 'cosmic' })`);
  });

  it('should register NbLayoutModule', () => {
    const tree = runSetupSchematic();
    const appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');

    expect(appModuleContent).toContain(`NbLayoutModule`);
  });

  it('should create AppRoutingModule if no Router already registered', () => {
    const tree = runSetupSchematic();
    const appModuleContent = tree.readContent('/projects/nebular/src/app/app.module.ts');

    expect(appModuleContent).toContain(`AppRoutingModule`);
    expect(tree.files).toContain('/projects/nebular/src/app/app-routing.module.ts');
  });

  it('should register inline theme if no theme already registered', () => {
    const tree = runSetupSchematic({ customization: false });
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const styles = getProjectTargetOptions(project, 'build').styles;

    expect(styles).toContain('./node_modules/@nebular/theme/styles/prebuilt/default.css')
  });

  it('should create theme.scss and plug it into the project', (done) => {
    createTestWorkspace(runner, { style: Style.Scss }).subscribe(applicationTree => {
      appTree = applicationTree;
      const tree = runSetupSchematic({ customization: true });
      const styles = tree.readContent('/projects/nebular/src/styles.scss');
      const themes = tree.readContent('/projects/nebular/src/themes.scss');

      expect(styles).toContain(EXPECTED_STYLES_SCSS);
      expect(themes).toContain(EXPECTED_THEME_SCSS);

      done();
    });
  });

  it('should throw error if adding scss themes in css project', (done) => {
    createTestWorkspace(runner, { style: Style.Css }).subscribe(tree => {
      appTree = tree;

      expect(() => runSetupSchematic({ customization: true })).toThrow();
      done();
    });
  });

  it('should add the BrowserAnimationsModule to the project module', () => {
    const tree = runSetupSchematic({ animations: true });
    const fileContent = getFileContent(tree, '/projects/nebular/src/app/app.module.ts');

    expect(fileContent).toContain('BrowserAnimationsModule',
      'Expected the project app module to import the "BrowserAnimationsModule".');
  });

  it('should add the NoopAnimationsModule to the project module', () => {
    const tree = runSetupSchematic({ animations: false });
    const fileContent = getFileContent(tree, '/projects/nebular/src/app/app.module.ts');

    expect(fileContent).toContain('NoopAnimationsModule',
      'Expected the project app module to import the "NoopAnimationsModule".');
  });

  it('should not add NoopAnimationsModule if BrowserAnimationsModule is set up', () => {
    const workspace = getWorkspace(appTree);
    const project = getProjectFromWorkspace(workspace);

    // Simulate the case where a developer uses `ng-add` on an Angular CLI project which already
    // explicitly uses the `BrowserAnimationsModule`. It would be wrong to forcibly change
    // to noop animations.
    const fileContent = addModuleImportToRootModule(appTree, 'BrowserAnimationsModule',
      '@angular/platform-browser/animations', project);
    runSetupSchematic({ animations: false });

    expect(fileContent).not.toContain('NoopAnimationsModule',
      'Expected the project app module to not import the "NoopAnimationsModule".');
  });
});
