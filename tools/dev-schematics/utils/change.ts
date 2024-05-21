/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { Change, InsertChange } from '@schematics/angular/utility/change';

export interface ReplaceChange {
  pos: number;
  oldText: string;
  newText: string;
}

export function applyInsertChange(tree: Tree, path: Path, ...changes: Change[]): Tree {
  const recorder = tree.beginUpdate(path);

  changes
    .filter((change) => change instanceof InsertChange)
    .forEach((change: InsertChange) => recorder.insertLeft(change.pos, change.toAdd));

  tree.commitUpdate(recorder);

  return tree;
}

export function applyReplaceChange(tree: Tree, path: Path, ...changes: ReplaceChange[]): Tree {
  const recorder = tree.beginUpdate(path);
  changes.forEach(({ pos, oldText, newText }) => {
    recorder.remove(pos, oldText.length);
    recorder.insertLeft(pos, newText);
  });
  tree.commitUpdate(recorder);

  return tree;
}
