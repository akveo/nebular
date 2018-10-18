/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { WorkspaceProject } from '@angular-devkit/core/src/workspace';
import { SchematicsException } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from './project-targets';

/** Looks for the main TypeScript file in the given project and returns its path. */
export function getProjectMainFilePath(project: WorkspaceProject): string {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (!buildOptions.main) {
    throw new SchematicsException(`Could not find the project main file inside of the ` +
      `workspace config (${project.sourceRoot})`);
  }

  return buildOptions.main;
}
