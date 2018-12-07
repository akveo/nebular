/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { parse } from 'path';
import { NormalizedSep, Path, relative, dirname, join, basename } from '@angular-devkit/core';

export function removeExtension(filePath: Path): string {
  return parse(filePath).name;
}

export function generateCurrentDirImport(filePath: Path): string {
  return `.${NormalizedSep}${removeExtension(filePath)}`;
}

/**
 * Returns import string for the 'to' parameter relative to 'from' parameter. Both paths must be absolute.
 * Removes file extension.
 * @param from path to file which should import 'to' file
 * @param to path to file which should be imported
 */
export function importPath(from: Path, to: Path): string {
  const relativePath = relative(dirname(from), dirname(to));

  return relativePath
    ? join(relativePath, removeExtension(to))
    : generateCurrentDirImport(basename(to));
}
