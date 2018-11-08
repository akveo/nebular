/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NormalizedSep, strings } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { fileNameWithoutExtension, getPlaygroundFeatureModules, parentDirName } from '../utils';

export function addRoutingModuleImport(tree: Tree) {
  for (const path of getPlaygroundFeatureModules(tree)) {
    const moduleName = `${strings.classify(parentDirName(path))}RoutingModule`;
    const importPath = `.${NormalizedSep}${fileNameWithoutExtension(path).replace('.module', '-routing.module')}`;
    addModuleImportToModule(tree, path, moduleName, importPath);
  }
}
