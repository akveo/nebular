/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';
import { getWorkspace } from '@schematics/angular/utility/config';

import { Schema } from './schema';
import { addModuleImportToRootModule, getProjectFromWorkspace, getProjectTargetOptions } from '../util';

const nebularThemePackageName = '@nebular/theme';
const angularRouterPackageName = '@angular/router';

const angularRouterModule = 'RouterModule.forRoot([])';

export default function (options: Schema) {
  return chain([
    addNebularThemeModule(options),
    addNebularStyles(options),
  ]);
}

function addNebularThemeModule(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const nebularThemeModule = createNebularThemeModule(options.theme);

    addModuleImportToRootModule(host, nebularThemeModule, nebularThemePackageName, project);
    addModuleImportToRootModule(host, angularRouterModule, angularRouterPackageName, project);

    return host;
  }
}

function addNebularStyles(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    insertPrebuiltTheme(project, host, options.theme, workspace);
    return host;
  }
}

function insertPrebuiltTheme(project: WorkspaceProject, host: Tree, theme: string,
                             workspace: WorkspaceSchema) {

  // Path needs to be always relative to the `package.json` or workspace root.
  const themePath = createNebularThemeStylesPrebuiltPath(theme);

  addStyleToTarget(project, 'build', host, themePath, workspace);
}

/** Adds a style entry to the given project target. */
function addStyleToTarget(project: WorkspaceProject, targetName: string, host: Tree,
                          assetPath: string, workspace: WorkspaceSchema) {
  const targetOptions = getProjectTargetOptions(project, targetName);

  if (!targetOptions.styles) {
    targetOptions.styles = [assetPath];
  } else {
    const existingStyles = targetOptions.styles.map((s: any) => typeof s === 'string' ? s : s.input);
    const hasGivenTheme = existingStyles.find((s: any) => s.includes(assetPath));
    const hasOtherTheme = existingStyles.find((s: any) => s.includes('@nebular/theme/styles/prebuilt'));

    if (!hasGivenTheme && !hasOtherTheme) {
      targetOptions.styles.unshift(assetPath);
    }
  }

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

function createNebularThemeModule(themeName: string): string {
  return `NbThemeModule.forRoot({ name: ${themeName} })`;
}

function createNebularThemeStylesPrebuiltPath(themeName: string): string {
  return `./node_modules/@nebular/theme/styles/prebuilt/${themeName}.css`;
}
