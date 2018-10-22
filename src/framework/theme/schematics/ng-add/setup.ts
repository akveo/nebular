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


/**
 * Setting up Nebular for the project by registering required modules, adding Nebular themes and wrapping
 * root component in the Nebular Layout.
 * */
export default function (options: Schema) {
  return chain([
    registerModules(options),
    addNebularStyles(options),
    wrapRootComponentInLayout(options),
  ]);
}
