/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';

export function read(tree: Tree, path: string, encoding: string = 'utf8'): string {
  return (tree.read(path) as Buffer).toString(encoding);
}
