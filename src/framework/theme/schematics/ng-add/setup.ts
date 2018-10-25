/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { chain, noop } from '@angular-devkit/schematics';

import { Schema } from './schema';
import { registerModules } from './register-modules';
import { registerCustomizableTheme, registerPrebuiltTheme } from './register-theme';
import { wrapRootComponentInLayout } from './wrap-in-layout';


/**
 * Setting up Nebular for the specified project by registering required modules,
 * adding Nebular themes and wrapping root component in the Nebular Layout.
 * */
export default function (options: Schema) {
  return chain([
    registerModules(options),
    options.customization ? registerCustomizableTheme(options) : registerPrebuiltTheme(options),
    options.layout ? wrapRootComponentInLayout(options) : noop(),
  ]);
}
