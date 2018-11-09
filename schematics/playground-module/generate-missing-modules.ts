/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { join, Path, PathFragment, strings } from '@angular-devkit/core';
import { apply, chain, filter, mergeWith, Rule, template, Tree, url } from '@angular-devkit/schematics';
import { getPlaygroundDir } from '../utils';

export function generateMissingModules(tree: Tree): Rule {
  const playgroundDir = getPlaygroundDir(tree);

  const rules = playgroundDir.subdirs.map(dirName => {
    const dirPath = join(playgroundDir.path, dirName);
    return fromTemplate(tree, dirPath, dirName);
  });

  return chain(rules);
}

function fromTemplate(tree: Tree, path: Path, moduleName: PathFragment): Rule {
  const templateSource = apply(
    url('./files/example'),
    [
      template({ ...strings, path, moduleName }),
      filter(filePath => !tree.exists(filePath)),
    ],
  );

  return mergeWith(templateSource);
}
