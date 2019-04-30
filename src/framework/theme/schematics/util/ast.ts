/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { Tree } from '@angular-devkit/schematics';
import { dirname, normalize, Path } from '@angular-devkit/core';
import { getProjectMainFile, getSourceFile } from '@angular/cdk/schematics';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { isImported } from '@schematics/angular/utility/ast-utils';
import { findBootstrapModulePath } from '@schematics/angular/utility/ng-ast-utils';

export function isImportedInMainModule(tree: Tree, project: WorkspaceProject, moduleName: string,
                                       importPath: string): boolean {
  const appModulePath = getAppModulePath(tree, getProjectMainFile(project));
  const appModuleSource = getSourceFile(tree, appModulePath) as ts.SourceFile;

  return isImported(appModuleSource, moduleName, importPath);
}


export function getAppModulePath(host: Tree, mainPath: string): string {
  const moduleRelativePath = findBootstrapModulePath(host, mainPath);
  const mainDir = dirname(mainPath as Path);

  return normalize(`/${mainDir}/${moduleRelativePath}.ts`);
}
