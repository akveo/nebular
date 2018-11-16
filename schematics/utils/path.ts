/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { parse } from 'path';
import { NormalizedSep, Path, relative, basename, dirname } from '@angular-devkit/core';

export function withoutExtension(filePath: string): string {
  return parse(filePath).name;
}

export function generateCurrentDirImport(fileName: string): string {
  return `.${NormalizedSep}${withoutExtension(fileName)}`;
}

/**
 * Returns import string for the 'to' parameter relative to 'from' parameter. Both paths must be absolute.
 * @param from path to file which should import 'to' file
 * @param to path to file which should be imported
 */
export function generateImportPath(from: Path, to: Path): string {
  return relative(dirname(from), dirname(to)) || generateCurrentDirImport(basename(to));
}
