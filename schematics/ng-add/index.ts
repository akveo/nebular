/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, Rule, Tree } from '@angular-devkit/schematics';

import { getWorkspace } from '@schematics/angular/utility/config';

import { Schema } from './schema';
import { getProjectFromWorkspace } from '../util/get-project';
import { addModuleImportToRootModule } from '../util/ast';
import { getProjectTargetOptions } from '../util/project-targets';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';

const nebularThemeModuleName = 'NbThemeModule.forRoot()';
const nebularThemePackageName = '@nebular/theme';
const nebularThemeStylesPrebuilt = (themeName: string) => {
  return `./node_modules/@nebular/theme/styles/prebuilt/${themeName}.css`;
};

export default function (options: Schema): Rule {
  return chain([
    addNebularThemeModule(options),
    addNebularStyles(options),
  ]);
}

function addNebularThemeModule(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(host, nebularThemeModuleName, nebularThemePackageName, project);

    return host;
  }
}

function addNebularStyles(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    insertPrebuiltTheme(project, host, 'default', workspace);
    return host;
  }
}

function insertPrebuiltTheme(project: WorkspaceProject, host: Tree, theme: string,
                             workspace: WorkspaceSchema) {

  // Path needs to be always relative to the `package.json` or workspace root.
  const themePath = nebularThemeStylesPrebuilt(theme);

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

