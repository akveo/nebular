/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addModuleImportToRootModule, getProjectMainFile, hasNgModuleImport } from '@angular/cdk/schematics';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { normalize } from '@angular-devkit/core';
import { bold, red } from '@angular-devkit/core/src/terminal';

import { Schema } from '../schema';
import { getAppModulePath, getProject, isImportedInMainModule } from '../../util';
import { appRoutingModuleContent } from './app-routing-module-content';


export function registerModules(options: Schema): Rule {
  if (!options.theme) {
    options.theme = 'default';
  }

  return chain([
    registerAnimationsModule(options),
    registerNebularModules(options),
    registerRouterIfNeeded(options),
  ]);
}

function registerAnimationsModule(options: Schema) {
  return (tree: Tree, context: SchematicContext) => {
    const project = getProject(tree, options.project);
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));
    const browserAnimationsModuleName = 'BrowserAnimationsModule';
    const noopAnimationsModuleName = 'NoopAnimationsModule';
    const animationsPackage = '@angular/platform-browser/animations';

    if (options.animations) {
      // In case the project explicitly uses the NoopAnimationsModule, we should print a warning
      // message that makes the user aware of the fact that we won't automatically set up
      // animations. If we would add the BrowserAnimationsModule while the NoopAnimationsModule
      // is already configured, we would cause unexpected behavior and runtime exceptions.
      if (hasNgModuleImport(tree, appModulePath, noopAnimationsModuleName)) {
        return context.logger.warn(red(`Could not set up "${bold(browserAnimationsModuleName)}" ` +
          `because "${bold(noopAnimationsModuleName)}" is already imported. Please manually ` +
          `set up browser animations.`));
      }

      addModuleImportToRootModule(tree, browserAnimationsModuleName, animationsPackage, project);
    } else if (!hasNgModuleImport(tree, appModulePath, browserAnimationsModuleName)) {
      // Do not add the NoopAnimationsModule module if the project already explicitly uses
      // the BrowserAnimationsModule.
      addModuleImportToRootModule(tree, noopAnimationsModuleName, animationsPackage, project);
    }
  }
}

function registerNebularModules(options: Schema): Rule {
  return (tree: Tree) => {
    const project = getProject(tree, options.project);
    const nebularThemeModule = `NbThemeModule.forRoot({ name: '${options.theme}' })`;

    addModuleImportToRootModule(tree, nebularThemeModule, '@nebular/theme', project);
    addModuleImportToRootModule(tree, 'NbLayoutModule', '@nebular/theme', project);
    addModuleImportToRootModule(tree, 'NbEvaIconsModule', '@nebular/eva-icons', project);
  }
}

/**
 * Creates `AppRoutingModule` if no either `RouterModule` or `AppRoutingModule` already imported
 * in the `AppModule`.
 * */
function registerRouterIfNeeded(options: Schema): Rule {
  return (tree: Tree) => {
    const project = getProject(tree, options.project);

    if (shouldRegisterRouter(tree, project)) {
      registerRoutingModule(tree, options.project);
    }

    return tree;
  }
}

/**
 * Checks if `RouterModule` or `AppRoutingModule` already imported in the `AppModule`.
 * */
function shouldRegisterRouter(tree: Tree, project: WorkspaceProject): boolean {
  const appRoutingModuleAlreadyImported = isImportedInMainModule(tree, project,
    'AppRoutingModule', './app-routing.module');
  const routerModuleAlreadyImported = isImportedInMainModule(tree, project,
    'RouterModule', '@angular/router');

  return !(appRoutingModuleAlreadyImported || routerModuleAlreadyImported);
}

function registerRoutingModule(tree: Tree, projectName: string) {
  registerAppRoutingModule(tree, projectName);
  createAppRoutingModule(tree, projectName);
}

/**
 * We're just adding app-routing.module without any interpolations
 * and customization. So, I don't think we have to use schematics
 * template files.
 * */
function createAppRoutingModule(tree: Tree, projectName: string) {
  const project = getProject(tree, projectName);
  const appRoutingModulePath = normalize(`${project.sourceRoot}/app/app-routing.module.ts`);

  tree.create(appRoutingModulePath, appRoutingModuleContent);
}

function registerAppRoutingModule(tree: Tree, projectName: string) {
  const project = getProject(tree, projectName);
  addModuleImportToRootModule(tree, 'AppRoutingModule', './app-routing.module', project);
}
