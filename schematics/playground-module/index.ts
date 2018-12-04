/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, Rule } from '@angular-devkit/schematics';
import { generateMissingModules } from './generate-missing-modules';
import { addToModules } from './add-to-modules';

export function playgroundModule(): Rule {
  return () => chain([ generateMissingModules, addToModules ]);
}
