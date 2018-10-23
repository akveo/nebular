/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { Schema } from './schema';
import { addPackageToPackageJson, getPackageVersionFromPackageJson } from '../util';


/**
 * ng-add schematics, installs peer dependencies and runs project setup schematics.
 * */
export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    registerPeerDependencies(host);
    runSetupSchematics(context, options);
  }
}

/**
 * Add required peer dependencies in package.json if needed.
 * */
function registerPeerDependencies(host: Tree) {
  const angularCoreVersion = getPackageVersionFromPackageJson(host, '@angular/core');

  addPackageToPackageJson(host, '@angular/cdk', angularCoreVersion);
  addPackageToPackageJson(host, '@angular/animations', angularCoreVersion);
}

/**
 * Runs `npm install` and after complete runs `setup` schematics.
 * The rest part of the ng-add schematics uses `@angular/cdk/schematics` utilities.
 * That's why we have to install `@angular/cdk` package before running Nebular setup in the project.
 *
 * The only possibility to run `setup` schematics after `@angular/cdk` installed
 * is to use context tasks and add `npm install` task as the dependency to `setup` schematics task.
 * */
function runSetupSchematics(context: SchematicContext, options: Schema) {
  const installTaskId = context.addTask(new NodePackageInstallTask());
  context.addTask(new RunSchematicTask('setup', options), [installTaskId]);
}
