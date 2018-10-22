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
    addPeerDependenciesToPackageJson(host);
    runNgAddSetupSchematics(context, options);
  }
}

function addPeerDependenciesToPackageJson(host: Tree) {
  const angularCoreVersion = getPackageVersionFromPackageJson(host, '@angular/core');

  addPackageToPackageJson(host, '@angular/cdk', angularCoreVersion);
  addPackageToPackageJson(host, '@angular/animations', angularCoreVersion);
}

function runNgAddSetupSchematics(context: SchematicContext, options: Schema) {
  const installTaskId = context.addTask(new NodePackageInstallTask());
  context.addTask(new RunSchematicTask('setup', options), [installTaskId]);
}
