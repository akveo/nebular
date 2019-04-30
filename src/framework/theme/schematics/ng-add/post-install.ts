/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

/**
 * This utils has to imported directly from the `/util/package`, not from the `/util/`.
 * Other utilities use `@angular/sdk/schematics` and `@schematics/angular` packages.
 * But these packages are not installed in this step.
 * */
import {
  addDependencyToPackageJson,
  getEvaIconsVersion,
} from '../util/package';

/**
 * post-install schematics, install dependant packages
 * */
export default function (): Rule {
  return runPostInstallSchematics();
}

/**
 * Add icons peer dependencies in package.json
 * */
function installDependantPeerDependencies(tree: Tree) {
  const evaIconsVersion = getEvaIconsVersion();

  addDependencyToPackageJson(tree, 'eva-icons', evaIconsVersion);
}

/**
 * Runs `npm install`
 * */
function runPostInstallSchematics() {
  return (tree: Tree, context: SchematicContext) => {
    installDependantPeerDependencies(tree);

    context.addTask(new NodePackageInstallTask());
  };
}
