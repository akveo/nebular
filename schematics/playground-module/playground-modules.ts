/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { basename, strings } from '@angular-devkit/core';
import { Tree, apply, template, chain, url, mergeWith, Rule, filter } from '@angular-devkit/schematics';
import {
  addRoute, generateLazyModulePath, generateLazyModuleRoute, getModuleDirs, getPlaygroundRoutingModule, PLAYGROUND_PATH,
} from '../utils';

export function generatePlaygroundModules(): Rule {
  return chain([
    generateMissingModules,
    addModuleRoutes,
  ]);
}

function generateMissingModules(tree: Tree): Rule {
  const templateSource = apply(
    url('./files/playground'),
    [
      filter(path => !tree.exists(path)),
      template({ ...strings, path: PLAYGROUND_PATH }),
    ],
  );

  return mergeWith(templateSource);
}

function addModuleRoutes(tree: Tree): Tree {
  const playgroundRoutingModule = getPlaygroundRoutingModule();

  for (const moduleDir of getModuleDirs(tree)) {
    const moduleName = basename(moduleDir.path);
    const routePath = generateLazyModulePath(moduleName);
    const route = generateLazyModuleRoute(moduleName, routePath);

    addRoute(tree, playgroundRoutingModule, route);
  }

  return tree;
}
