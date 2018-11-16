/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, Rule } from '@angular-devkit/schematics';
import { generateMissingModules } from './generate-missing-modules';
import { addComponentsDeclarations } from './import-components';
import { generatePlaygroundModules } from './playground-modules';

export function playgroundModule(): Rule {
  return () => {
    return chain([
      generateMissingModules,
      addComponentsDeclarations,
      generatePlaygroundModules,
    ]);
  };
}
