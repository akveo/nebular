/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { join, normalize, Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';

// TODO packages/angular_devkit/core/src/virtual-fs/path.ts
const PLAYGROUND_PATH = normalize('/src/playground/');

export function getPlaygroundDir(tree: Tree): DirEntry {
  return tree.getDir(PLAYGROUND_PATH);
}

export function getPlaygroundComponents(tree: Tree): Path[] {
  return getPlaygroundFilesByPredicate(tree, f => f.endsWith('.component.ts'));
}

export function getPlaygroundFeatureModules(tree: Tree): Path[] {
  return getPlaygroundFilesByPredicate(tree, f => f.endsWith('.module.ts') && !f.endsWith('routing.module.ts'));
}

export function getPlaygroundFilesByPredicate(tree: Tree, predicate: (p: PathFragment) => boolean): Path[] {
  const playgroundDir = getPlaygroundDir(tree);

  // TODO: read sub dirs?
  return playgroundDir
    .subdirs
    .map((dirName: PathFragment) => join(playgroundDir.path, dirName))
    .reduce((paths: Path[], path: Path) => {
      const matching = tree.getDir(path)
        .subfiles
        .filter(predicate)
        .map(fileName => join(path, fileName));

      return paths.concat(matching);
    }, []);
}
