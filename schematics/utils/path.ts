/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { parse } from 'path';
import { NormalizedSep, Path, relative, dirname, join, normalize, basename, PathFragment } from '@angular-devkit/core';

export function removeExtension(filePath: Path): string {
  return parse(filePath).name;
}

/**
 * @param filePath part of the path relative to current directory
 */
export function generateCurrentDirImport(filePath: Path): string {
  const path = normalize(join(dirname(filePath), removeExtension(filePath)));

  return `.${NormalizedSep}${path}`;
}

/**
 * Returns import string for the 'to' parameter relative to 'from' parameter. Both paths must be absolute.
 * Removes file extension.
 * @param from path to file which should import 'to' file
 * @param to path to file which should be imported
 */
export function importPath(from: Path, to: Path): string {
  const relativePath = relative(dirname(from), dirname(to));

  if (relativePath.startsWith('.')) {
    return relativePath;
  }

  if (!relativePath) {
    return generateCurrentDirImport(basename(to));
  }

  return generateCurrentDirImport(join(relativePath, basename(to)));
}

export function lazyRoutePathToFilePath(lazyRoutePath: string): string {
  const path = lazyRoutePath.slice(0, lazyRoutePath.indexOf('#'));

  return path + '.ts' as PathFragment;
}
