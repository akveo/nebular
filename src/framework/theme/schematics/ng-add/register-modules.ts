/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Schema } from './schema';
import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { getProject } from '../util';
import { addModuleImportToRootModule } from '@angular/cdk/schematics';

export function registerModules(options: Schema): Rule {
  return chain([
    addNebularThemeModule(options),
    addNebularLayoutModule(options),
    addAngularRouterModule(options),
  ]);
}

function addNebularThemeModule(options: Schema): Rule {
  return (host: Tree) => {
    const project = getProject(host, options.project);
    const nebularThemeModule = `NbThemeModule.forRoot({ name: '${options.theme}' })`;

    addModuleImportToRootModule(host, nebularThemeModule, '@nebular/theme', project);

    return host;
  }
}

function addAngularRouterModule(options: Schema): Rule {
  return (host: Tree) => {
    const project = getProject(host, options.project);

    // TODO create ng module instead
    addModuleImportToRootModule(host, 'RouterModule.forRoot([])', '@angular/router', project);

    return host;
  }
}

function addNebularLayoutModule(options: Schema): Rule {
  return (host: Tree) => {
    const project = getProject(host, options.project);

    addModuleImportToRootModule(host, 'NbLayoutModule', '@nebular/theme', project);

    return host;
  }
}
