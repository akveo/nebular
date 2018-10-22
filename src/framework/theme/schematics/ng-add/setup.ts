/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain } from '@angular-devkit/schematics';

import { Schema } from './schema';
import { registerModules } from './register-modules';
import { addNebularStyles } from './register-theme';
import { wrapRootComponentInLayout } from './wrap-in-layout';


export default function (options: Schema) {
  return chain([
    registerModules(options),
    addNebularStyles(options),
    wrapRootComponentInLayout(options),
  ]);
}
