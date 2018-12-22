/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { basename, dirname, normalize, Path } from '@angular-devkit/core';
import { apply, chain, DirEntry, filter, mergeWith, Rule, template, Tree, url } from '@angular-devkit/schematics';
import {
  generateCurrentDirImport,
  generateFeatureModuleClassName,
  generateFeatureModuleFileName,
  generateRoutingModuleClassName,
  generateRoutingModuleFileName,
  getModuleDirs,
  getPlaygroundRootDir,
  hasComponentsInDir,
  hasFeatureModuleInDir,
  hasRoutingModuleInDir,
  isFeatureModule,
} from '../utils';

interface ModuleOptions {
  path: string;
  featureModuleFileName: string;
  featureModuleClassName: string;
  routingModuleFileName: string;
  routingModuleClassName: string;
  routingModuleImportPath: string;
}

export function generateMissingModules(tree: Tree): Rule {
  const moduleDirs = [ getPlaygroundRootDir(tree), ...getModuleDirs(tree) ];
  const moduleRules = moduleDirs.map(moduleDir => dirRule(tree, moduleDir));

  return chain(moduleRules);
}

function dirRule(tree: Tree, moduleDir: DirEntry): Rule {
  return fromTemplate(tree, optionsFromDir(moduleDir));
}

function fromTemplate(tree: Tree, options: Object): Rule {
  const transformedSource = apply(
    url('./files'),
    [
      template(options),
      filter((filePath: Path) => shouldCreateModule(tree, filePath)),
    ],
  );

  return mergeWith(transformedSource);
}

function shouldCreateModule(tree: Tree, filePath: Path): boolean {
  const dir = tree.getDir(normalize(dirname(filePath)));
  const fileName = basename(filePath);
  const isModuleExist = isFeatureModule(fileName)
    ? hasFeatureModuleInDir(dir)
    : hasRoutingModuleInDir(dir);

  if (isModuleExist) {
    return false;
  }

  return isFeatureModule(fileName) || hasComponentsInDir(dir);
}

function optionsFromDir(moduleDir: DirEntry): ModuleOptions {
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
