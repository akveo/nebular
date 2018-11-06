/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { parse } from 'path';
import { normalize, PathFragment, split } from '@angular-devkit/core';

export function fileNameWithoutExtension(filePath: string): string {
  return parse(filePath).name;
}

export function parentDirName(path: string): PathFragment {
  const { dir } = parse(path);
  return split(normalize(dir)).pop() as PathFragment;
}
