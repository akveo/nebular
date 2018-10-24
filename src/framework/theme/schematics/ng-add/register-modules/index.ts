/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { addModuleImportToRootModule } from '@angular/cdk/schematics';
import { WorkspaceProject } from '@angular-devkit/core/src/workspace';

import { Schema } from '../schema';
import { getProject, isImportedInMainModule } from '../../util';
import { appRoutingModuleContent } from './app-routing-module-content';


export function registerModules(options: Schema): Rule {
  return chain([
    registerNebularModules(options),
    registerRouterIfNeeded(options),
  ]);
}

function registerNebularModules(options: Schema): Rule {
  return (tree: Tree) => {
    const project = getProject(tree, options.project);
    const nebularThemeModule = `NbThemeModule.forRoot({ name: '${options.theme}' })`;

    addModuleImportToRootModule(tree, nebularThemeModule, '@nebular/theme', project);
    addModuleImportToRootModule(tree, 'NbLayoutModule', '@nebular/theme', project);
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
    'AppRoutingModule', './app-routing-module.ts');
  const routerModuleAlreadyImported = isImportedInMainModule(tree, project,
    'RouterModule', '@angular/router');

  return !(appRoutingModuleAlreadyImported || routerModuleAlreadyImported);
}

function registerRoutingModule(tree: Tree, projectName: string) {
  registerAppRoutingModule(tree, projectName);
  createAppRoutingModule(tree);
}

/**
 * We're just adding app-routing.module without any interpolations
 * and customization. So, I don't think we have to use schematics
 * template files.
 * */
function createAppRoutingModule(tree: Tree) {
  tree.create('./src/app/app-routing.module.ts', appRoutingModuleContent);
}

function registerAppRoutingModule(tree: Tree, projectName: string) {
  const project = getProject(tree, projectName);
  addModuleImportToRootModule(tree, 'AppRoutingModule', './app-routing.module', project);
}
