/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';
import { getProjectMainFile, hasNgModuleImport } from '@angular/cdk/schematics';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

export function isImportedInMainModule(tree: Tree, project: ProjectDefinition, moduleName: string): boolean {
  const appModulePath = getAppModulePath(tree, getProjectMainFile(project));

  return hasNgModuleImport(tree, appModulePath, moduleName);
}
