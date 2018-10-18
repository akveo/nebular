/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';
import { join, normalize, Path } from '@angular-devkit/core';
import { InsertChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/config';

import { Schema } from './schema';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectStyleFile,
  getProjectTargetOptions,
} from '../util';
import { createThemeContent, stylesContent } from './theme-content';
import {
  angularJson,
  angularRouterModule,
  angularRouterPackage,
  createStylesPrebuiltPath,
  createThemeModule,
  nebularLayoutModule,
  nebularStylesPrebuiltPrefix,
  nebularThemePackage,
  nebularThemesFile,
} from './constants';


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
    const nebularThemeModule = createThemeModule(options.theme);

    addModuleImportToRootModule(host, nebularThemeModule, nebularThemePackage, project);
    addModuleImportToRootModule(host, nebularLayoutModule, nebularThemePackage, project);
    addModuleImportToRootModule(host, angularRouterModule, angularRouterPackage, project);

    return host;
  }
}

function addNebularStyles(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    if (options.prebuiltStyles) {
      insertPrebuiltTheme(project, host, options.theme, workspace);
    } else {
      importCustomizableTheme(project, host, options.theme);
    }

    return host;
  }
}

function insertPrebuiltTheme(project: WorkspaceProject, host: Tree, theme: string,
                             workspace: WorkspaceSchema) {

  // Path needs to be always relative to the `package.json` or workspace root.
  const themePath = createStylesPrebuiltPath(theme);

  addStyleToTarget(project, 'build', host, themePath, workspace);
}

function importCustomizableTheme(project: WorkspaceProject, host: Tree, theme: string) {
  const stylesPath = getProjectStyleFile(project, 'scss') as string;
  const themeContent = createThemeContent(theme);

  const customThemePath = normalize(join((project.sourceRoot as Path), nebularThemesFile));
  host.create(customThemePath, themeContent);

  const insertion = new InsertChange(stylesPath, 0, stylesContent);
  const recorder = host.beginUpdate(stylesPath);

  recorder.insertLeft(insertion.pos, insertion.toAdd);
  host.commitUpdate(recorder);
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
    const hasOtherTheme = existingStyles.find((s: any) => s.includes(nebularStylesPrebuiltPrefix));

    if (!hasGivenTheme && !hasOtherTheme) {
      targetOptions.styles.unshift(assetPath);
    }
  }

  host.overwrite(angularJson, JSON.stringify(workspace, null, 2));
}
