/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { strings } from '@angular-devkit/core';
import { Tree, apply, template, chain, url, mergeWith, Rule, filter } from '@angular-devkit/schematics';
import { PLAYGROUND_PATH } from '../utils';

export function generatePlaygroundModules(): Rule {
  return chain([
    generateMissingModules,
  ]);
}

function generateMissingModules(tree: Tree): Rule {
  const templateSource = apply(
    url('./files/playground'),
    [
      template({ ...strings, path: PLAYGROUND_PATH }),
      filter(path => !tree.exists(path)),
    ],
  );

  return mergeWith(templateSource);
}
