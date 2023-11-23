import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { join, normalize, Path } from '@angular-devkit/core';

import { createThemeContent, stylesContent } from './theme-content';
import { Schema } from '../schema';
import { getProject } from '../../util';
import { getProjectFromWorkspace, getProjectStyleFile, getProjectTargetOptions } from '@angular/cdk/schematics';
import { updateWorkspace, WorkspaceDefinition } from '@schematics/angular/utility';

/**
 * Registers customizable scss theme in the specified project.
 * It creates `theme.scss` file which manages theme content and it's customization.
 * Also as importing `theme.scss` in the styles.scss file and installing the theme globally.
 * If the project uses *.css files it'll throw the error. Because we can't use scss themes
 * in the css Angular project.
 * */
export function registerCustomizableTheme(options: Schema) {
  return async (tree: Tree) => {
    const project = await getProject(tree, options.project);
    const stylesPath: string = getProjectStyleFile(project, 'scss') as string;

    if (!tree.exists(stylesPath)) {
      throwSCSSRequiredForCustomizableThemes();
    }

    createThemeSCSS(tree, options.theme, project.sourceRoot as string);
    insertThemeImportInStyles(tree, stylesPath);
  };
}

/**
 * Registers prebuilt css themes by inserting them in the angular.json styles.
 * */
export function registerPrebuiltTheme(options: Schema) {
  return updateWorkspace(async (workspace: WorkspaceDefinition) => {
    const project = getProjectFromWorkspace(workspace, options.project);

    const themePath = `./node_modules/@nebular/theme/styles/prebuilt/${options.theme}.css`;

    addStyleToTarget(project, 'build', themePath);
  });
}

/**
 * Creates theme.scss with Nebular theme setup.
 * */
function createThemeSCSS(tree: Tree, theme: string, sourceRoot: string) {
  const themeContent: string = createThemeContent(theme);

  const customThemePath: Path = normalize(join(sourceRoot as Path, 'themes.scss'));
  tree.create(customThemePath, themeContent);
}

/**
 * Updates styles.scss and insert theme.scss import.
 * */
function insertThemeImportInStyles(tree: Tree, stylesPath: string) {
  const recorder = tree.beginUpdate(stylesPath).insertLeft(0, stylesContent);

  tree.commitUpdate(recorder);
}

/**
 * Adds a style entry to the given project target.
 * */
function addStyleToTarget(project: ProjectDefinition, targetName: string, stylesPath: string) {
  const targetOptions = getProjectTargetOptions(project, targetName);

  if (!targetOptions.styles) {
    targetOptions.styles = [stylesPath];
  } else if (noNebularThemeIncluded(targetOptions, stylesPath)) {
    (targetOptions.styles as (string | { input: string })[]).unshift(stylesPath);
  }
}

/**
 * Validates no Nebular styles already included into the specified project.
 * */
function noNebularThemeIncluded(targetOptions: any, stylesPath: string): boolean {
  const existingStyles = targetOptions.styles.map((s: any) => (typeof s === 'string' ? s : s.input));
  const hasGivenTheme = existingStyles.find((s: any) => s.includes(stylesPath));
  const hasOtherTheme = existingStyles.find((s: any) => s.includes('@nebular/theme/styles/prebuilt'));

  return !hasGivenTheme && !hasOtherTheme;
}

function throwSCSSRequiredForCustomizableThemes() {
  throw new SchematicsException('No scss root found. Customizable theme requires scss to be enabled in the project.');
}
