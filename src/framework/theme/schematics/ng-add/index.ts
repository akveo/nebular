/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { Schema } from './schema';
import { addPackageToPackageJson, getPackageVersionFromPackageJson } from '../util';
import {
  angularAnimationsPackageName,
  angularCDKPackageName,
  angularCorePackageName,
  setupSchematicsTask,
} from './constants';


export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    addPeerDependenciesToPackageJson(host);
    runNgAddSetupSchematics(context, options);
  }
}

function addPeerDependenciesToPackageJson(host: Tree) {
  const ngCoreVersionTag = getPackageVersionFromPackageJson(host, angularCorePackageName);

  addPackageToPackageJson(host, angularCDKPackageName, ngCoreVersionTag);
  addPackageToPackageJson(host, angularAnimationsPackageName, ngCoreVersionTag);
}

function runNgAddSetupSchematics(context: SchematicContext, options: Schema) {
  const installTaskId = context.addTask(new NodePackageInstallTask());
  context.addTask(new RunSchematicTask(setupSchematicsTask, options), [installTaskId]);
}
