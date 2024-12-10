/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';

/**
 * Gets project workspace from the specified tree by given project name
 * */
export async function getProject(tree: Tree, projectName: string): Promise<ProjectDefinition> {
  const workspace = await getWorkspace(tree);
  return getProjectFromWorkspace(workspace as any, projectName);
}
