/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { basename } from '@angular-devkit/core';
import { apply, chain, DirEntry, filter, mergeWith, Rule, template, Tree, url } from '@angular-devkit/schematics';
import {
  generateCurrentDirImport,
  generateFeatureModuleClassName,
  generateFeatureModuleFileName,
  generateRoutingModuleClassName,
  generateRoutingModuleFileName,
  getModuleDirs,
} from '../utils';

export function generateMissingModules(tree: Tree): Rule {
  return chain(
    getModuleDirs(tree).map(moduleDir => fromTemplate(tree, moduleDir)),
  );
}

function fromTemplate(tree: Tree, moduleDir: DirEntry): Rule {
  const moduleName = basename(moduleDir.path);
  const routingModuleFileName = generateRoutingModuleFileName(moduleName);
  const options = {
    path: moduleDir.path,
    featureModuleFileName: generateFeatureModuleFileName(moduleName),
    featureModuleClassName: generateFeatureModuleClassName(moduleName),
    routingModuleFileName,
    routingModuleClassName: generateRoutingModuleClassName(moduleName),
    routingModuleImportPath: generateCurrentDirImport(routingModuleFileName),
  };

  const templateSource = apply(
    url('./files/example'),
    [ template(options), filter(filePath => !tree.exists(filePath)) ],
  );

  return mergeWith(templateSource);
}
