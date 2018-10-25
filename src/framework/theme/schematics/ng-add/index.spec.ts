/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { getProjectFromWorkspace, getProjectTargetOptions } from '@angular/cdk/schematics';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

import { getFileContent } from '@schematics/angular/utility/test';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';

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
  style: 'css',
  skipTests: false,
  skipPackageJson: false,
};

function createTestWorkspace(runner: SchematicTestRunner, appOptions: Partial<ApplicationOptions> = {}) {
  const workspace = runner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
  return runner.runExternalSchematic('@schematics/angular', 'application',
    { ...defaultAppOptions, ...appOptions }, workspace);
}

function getPackageDependencies(tree: Tree): any {
  const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
  return packageJson.dependencies;
}

describe('simple-schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  function runNgAddSchematic(options: Partial<NgAddOptions> = {}): Tree {
    return runner.runSchematic('ng-add', options, appTree);
  }

  function runSetupSchematic(options: Partial<NgAddOptions> = {}) {
    return runner.runSchematic('setup', options, appTree);
  }

  beforeEach(() => {
    const collectionPath = require.resolve('../collection.json');
    runner = new SchematicTestRunner('schematics', collectionPath);
    appTree = createTestWorkspace(runner);
  });

  it('should add @angular/cdk in package.json', () => {
    const tree = runNgAddSchematic();
    const dependencies = getPackageDependencies(tree);
    const angularCoreVersion = dependencies['@angular/core'];

    expect(dependencies['@angular/cdk']).toBeDefined();
    expect(dependencies['@angular/cdk']).toBe(angularCoreVersion);
  });

  it('should add @angular/animations in package.json', function () {
    const tree = runNgAddSchematic();
    const dependencies = getPackageDependencies(tree);
    const angularCoreVersion = dependencies['@angular/core'];

    expect(dependencies['@angular/animations']).toBeDefined();
    expect(dependencies['@angular/animations']).toBe(angularCoreVersion);
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
    const tree = runSetupSchematic({ prebuiltStyles: true, theme: 'cosmic' });
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const styles = getProjectTargetOptions(project, 'build').styles;

    expect(styles).toContain('./node_modules/@nebular/theme/styles/prebuilt/cosmic.css')
  });

  it('should create theme.scss and plug it into the project', () => {
    appTree = createTestWorkspace(runner, { style: 'scss' });
    const tree = runSetupSchematic({ theme: 'cosmic', prebuiltStyles: false });
    const styles = tree.readContent('/projects/nebular/src/styles.scss');
    const themes = tree.readContent('/projects/nebular/src/themes.scss');

    expect(styles).toContain(`@import 'themes';

@import '~@nebular/theme/styles/globals';

@include nb-install() {
  @include nb-theme-global();
};
`);

    expect(themes).toContain(`@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/cosmic';

$nb-themes: nb-register-theme((
  // add your variables here like:
  // color-bg: #4ca6ff,
), cosmic, cosmic);
`);

  });
});
