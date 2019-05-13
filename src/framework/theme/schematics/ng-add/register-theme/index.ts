/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { getProjectFromWorkspace, getProjectStyleFile, getProjectTargetOptions } from '@angular/cdk/schematics';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { join, normalize, Path } from '@angular-devkit/core';

import { createThemeContent, stylesContent } from './theme-content';
import { Schema } from '../schema';
import { getProject, writeJSON } from '../../util';


/**
 * Registers customizable scss theme in the specified project.
 * It creates `theme.scss` file which manages theme content and it's customization.
 * Also as importing `theme.scss` in the styles.scss file and installing the theme globally.
 * If the project uses *.css files it'll throw the error. Because we can't use scss themes
 * in the css Angular project.
 * */
export function registerCustomizableTheme(options: Schema) {
  return (tree: Tree) => {
    const project = getProject(tree, options.project);
    const stylesPath: string = getProjectStyleFile(project, 'scss') as string;

    if (!tree.exists(stylesPath)) {
      throwSCSSRequiredForCustomizableThemes();
    }

    createThemeSCSS(tree, options.theme, project.sourceRoot as string);
    insertThemeImportInStyles(tree, stylesPath);


    return tree;
  }
}

/**
 * Registers prebuilt css themes by inserting them in the angular.json styles.
 * */
export function registerPrebuiltTheme(options: Schema) {
  return (tree: Tree) => {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);

    const themePath = `./node_modules/@nebular/theme/styles/prebuilt/${options.theme}.css`;

    addStyleToTarget(project, 'build', tree, themePath, workspace);

    return tree;
  }
}

/**
 * Creates theme.scss with Nebular theme setup.
 * */
function createThemeSCSS(tree: Tree, theme: string, sourceRoot: string) {
  const themeContent: string = createThemeContent(theme);

  const customThemePath: Path = normalize(join((sourceRoot as Path), 'themes.scss'));
  tree.create(customThemePath, themeContent);
}

/**
 * Updates styles.scss and insert theme.scss import.
 * */
function insertThemeImportInStyles(tree: Tree, stylesPath: string) {
  const recorder = tree.beginUpdate(stylesPath)
    .insertLeft(0, stylesContent);

  tree.commitUpdate(recorder);
}

/**
 * Adds a style entry to the given project target.
 * */
function addStyleToTarget(project: WorkspaceProject, targetName: string, tree: Tree,
                          stylesPath: string, workspace: WorkspaceSchema) {
  const targetOptions = getProjectTargetOptions(project, targetName);

  if (!targetOptions.styles) {
    targetOptions.styles = [stylesPath];
  } else if (noNebularThemeIncluded(targetOptions, stylesPath)) {
    targetOptions.styles.unshift(stylesPath);
  }

  writeJSON(tree, 'angular.json', workspace);
}

/**
 * Validates no Nebular styles already included into the specified project.
 * */
function noNebularThemeIncluded(targetOptions: any, stylesPath: string): boolean {
  const existingStyles = targetOptions.styles.map((s: any) => typeof s === 'string' ? s : s.input);
  const hasGivenTheme = existingStyles.find((s: any) => s.includes(stylesPath));
  const hasOtherTheme = existingStyles.find((s: any) => s.includes('@nebular/theme/styles/prebuilt'));

  return !hasGivenTheme && !hasOtherTheme;
}

function throwSCSSRequiredForCustomizableThemes() {
  throw new SchematicsException('No scss root found. Customizable theme requires scss to be enabled in the project.');
}
