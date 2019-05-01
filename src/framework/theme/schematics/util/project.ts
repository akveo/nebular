/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';

/**
 * Gets project workspace from the specified tree by given project name
 * */
export function getProject(tree: Tree, projectName: string): WorkspaceProject {
  const workspace = getWorkspace(tree);
  return getProjectFromWorkspace(workspace, projectName);
}
