/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, Rule, SchematicContext, Tree, UpdateRecorder } from '@angular-devkit/schematics';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';
import { join, normalize, Path } from '@angular-devkit/core';
import { InsertChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/config';

import { Schema } from './schema';
import {
  addModuleImportToRootModule,
  getProject,
  getProjectFromWorkspace,
  getProjectStyleFile,
  getProjectTargetOptions,
  read,
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
import { Component } from '@angular/core';


export default function (options: Schema) {
  return chain([
    addNebularThemeModule(options),
    addNebularLayoutModule(options),
    addAngularRouterModule(options),
    addNebularStyles(options),
    wrapRootComponentInLayout(options),
  ]);
}

function addNebularThemeModule(options: Schema): Rule {
  return (host: Tree) => {
    const project = getProject(host, options.project);
    const nebularThemeModule = createThemeModule(options.theme);

    addModuleImportToRootModule(host, nebularThemeModule, nebularThemePackage, project);

    return host;
  }
}

function addAngularRouterModule(options: Schema): Rule {
  return (host: Tree) => {
    const project = getProject(host, options.project);

    addModuleImportToRootModule(host, angularRouterModule, angularRouterPackage, project);

    return host;
  }
}

function addNebularLayoutModule(options: Schema): Rule {
  return (host: Tree) => {
    const project = getProject(host, options.project);

    addModuleImportToRootModule(host, nebularLayoutModule, nebularThemePackage, project);

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
  const stylesPath: string = getProjectStyleFile(project, 'scss') as string;
  const themeContent: string = createThemeContent(theme);

  const customThemePath: Path = normalize(join((project.sourceRoot as Path), nebularThemesFile));
  host.create(customThemePath, themeContent);

  const insertion = new InsertChange(stylesPath, 0, stylesContent);
  const recorder: UpdateRecorder = host.beginUpdate(stylesPath);

  recorder.insertLeft(insertion.pos, insertion.toAdd);
  host.commitUpdate(recorder);
}

/** Adds a style entry to the given project target. */
// TODO raises the exception if no styles.scss found
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

function wrapRootComponentInLayout(_options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
      // const project: WorkspaceProject = getProject(host, options.project);
      const appComponentPath: string = './src/app/app.component.ts';
      const appComponent: string = read(host, appComponentPath).replace(/(?:\r\n|\r|\n)/g, ' ');
      // const mainPath: string = getProjectMainFilePath(project);
      // const mainFile: string = read(host, mainPath);
      // const rootModule: string = mainFile.match(/bootstrapModule\((.*)\)/)[1];
      // const rootModulePath: string = mainFile.match(/import.*AppModule.*from.*'(.*)'/)[1];
      const match = appComponent.match(/@Component\((.*)\)/);
      const componentDescriptorStr = match && match[1];
      if (componentDescriptorStr) {
        context.logger.info(componentDescriptorStr);
        const componentDescriptor: Component = JSON.parse(componentDescriptorStr);
        let startOffset: number;
        let endOffset: number;
        let path: string;

        if (componentDescriptor.template) {
          path = appComponentPath;
          startOffset = appComponent.indexOf('template') + 11;
          endOffset = startOffset + componentDescriptor.template.length;
        } else {
          path = componentDescriptor.templateUrl as string;
          startOffset = 0;
          endOffset = read(host, path).length;
        }

        const recordedChange = host
          .beginUpdate(path)
          .insertLeft(startOffset, `
<nb-layout>
  <nb-layout-header fixed>
  <!-- insert your header here -->
  </nb-layout-header>

  <nb-layout-column>

      `)
          .insertRight(endOffset, `

  </nb-layout-column>
  <nb-layout-footer fixed>
  <!-- insert your footer here -->
  </nb-layout-footer>
</nb-layout>
      `);

        host.commitUpdate(recordedChange);

      }
    } catch (e) {
      context.logger.error(e.stack);
    }
    return host;
  }
}
