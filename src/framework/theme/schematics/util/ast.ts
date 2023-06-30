/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';
import { dirname, normalize, Path } from '@angular-devkit/core';
import { getProjectMainFile, hasNgModuleImport } from '@angular/cdk/schematics';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { findBootstrapModulePath } from '@schematics/angular/utility/ng-ast-utils';

export function isImportedInMainModule(tree: Tree, project: ProjectDefinition, moduleName: string): boolean {
  const appModulePath = getAppModulePath(tree, getProjectMainFile(project));

  return hasNgModuleImport(tree, appModulePath, moduleName);
}

export function getAppModulePath(host: Tree, mainPath: string): string {
  const moduleRelativePath = findBootstrapModulePath(host, mainPath);
  const mainDir = dirname(mainPath as Path);

  return normalize(`/${mainDir}/${moduleRelativePath}.ts`);
}
