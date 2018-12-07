/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { basename, dirname, Path } from '@angular-devkit/core';
import { apply, chain, DirEntry, filter, mergeWith, Rule, template, Tree, url } from '@angular-devkit/schematics';
import {
  FEATURE_MODULE_EXT,
  generateCurrentDirImport,
  generateFeatureModuleClassName,
  generateFeatureModuleFileName,
  generateRoutingModuleClassName,
  generateRoutingModuleFileName,
  getModuleDirs,
  getPlaygroundRootDir,
  isFeatureModule,
  ROUTING_MODULE_EXT,
} from '../utils';

export function generateMissingModules(tree: Tree): Rule {
  const moduleDirs = [ getPlaygroundRootDir(tree), ...getModuleDirs(tree) ];

  return chain(moduleDirs.map(moduleDir => fromTemplate(tree, optionsFromDir(moduleDir))));
}

function fromTemplate(tree: Tree, options: Object): Rule {
  const transformedSource = apply(
    url('./files'),
    [
      template(options),
      filter(hasNoModuleInDir.bind(null, tree)),
    ],
  );

  return mergeWith(transformedSource);
}

function hasNoModuleInDir(tree: Tree, filePath: Path): boolean {
  const ext = isFeatureModule(basename(filePath)) ? FEATURE_MODULE_EXT : ROUTING_MODULE_EXT;

  return !tree.getDir(dirname(filePath))
    .subfiles
    .some(file => file.endsWith(ext));
}

function optionsFromDir(moduleDir: DirEntry): Object {
  const moduleName = basename(moduleDir.path);
  const routingModuleFileName = generateRoutingModuleFileName(moduleName);

  return {
    path: moduleDir.path,
    featureModuleFileName: generateFeatureModuleFileName(moduleName),
    featureModuleClassName: generateFeatureModuleClassName(moduleName),
    routingModuleFileName,
    routingModuleClassName: generateRoutingModuleClassName(moduleName),
    routingModuleImportPath: generateCurrentDirImport(routingModuleFileName),
  };
}
