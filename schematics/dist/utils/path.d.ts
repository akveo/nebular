/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Path } from '@angular-devkit/core';
export declare function removeExtension(filePath: Path): string;
/**
 * @param filePath part of the path relative to current directory
 */
export declare function generateCurrentDirImport(filePath: Path): string;
/**
 * Returns import string for the 'to' parameter relative to 'from' parameter. Both paths must be absolute.
 * Removes file extension.
 * @param from path to file which should import 'to' file
 * @param to path to file which should be imported
 */
export declare function importPath(from: Path, to: Path): string;
export declare function lazyRoutePathToFilePath(lazyRoutePath: string): string;
