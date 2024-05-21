/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';

function throwFileNotFoundError(fileName: string) {
  throw new Error(`${fileName} file not found in the tree.`);
}

/**
 * Reads specified file from the given tree
 * Throws the exception if file not found
 * */
export function readText(tree: Tree, fileName: string, encoding: BufferEncoding = 'utf8'): string {
  const file: Buffer | null = tree.read(fileName);

  if (!file) {
    throwFileNotFoundError(fileName);
  }

  return (file as Buffer).toString(encoding);
}

/**
 * Reads specified file as JSON from the given tree
 * */
export function readJSON(tree: Tree, fileName: string, encoding: BufferEncoding = 'utf8'): any {
  return JSON.parse(readText(tree, fileName, encoding));
}

/**
 * Writes specified files to the given tree
 * */
export function writeText(tree: Tree, fileName: string, content: string) {
  tree.overwrite(fileName, content);
}

/**
 * Writes specified JSON to the given tree
 * */
export function writeJSON(tree: Tree, fileName: string, content: any) {
  writeText(tree, fileName, JSON.stringify(content, null, 2));
}
