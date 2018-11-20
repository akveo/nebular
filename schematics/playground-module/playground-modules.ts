/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { basename, strings } from '@angular-devkit/core';
import { Tree, apply, template, chain, url, mergeWith, Rule, filter } from '@angular-devkit/schematics';
import { findNode } from '@schematics/angular/utility/ast-utils';
import {
  addRoute,
  generateLazyModulePath,
  generateLazyModuleRoute,
  getModuleDirs,
  getPlaygroundRoutingModule,
  PLAYGROUND_PATH,
  isNoLayoutModule,
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
      template({ ...strings, path: PLAYGROUND_PATH }),
      filter(path => !tree.exists(path)),
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
    const parentPredicate = isNoLayoutModule(moduleDir.path) ? noLayoutRoutePredicate : layoutRoutePredicate;
    addRoute(tree, playgroundRoutingModule, route, parentPredicate);
  }

  return tree;
}

function noLayoutRoutePredicate(routeNode: ts.ObjectLiteralExpression): boolean {
  return findNode(routeNode, ts.SyntaxKind.Identifier, 'NbPlaygroundBaseComponent') != null;
}

function layoutRoutePredicate(routeNode: ts.ObjectLiteralExpression): boolean {
  return findNode(routeNode, ts.SyntaxKind.Identifier, 'NbPlaygroundLayoutComponent') != null;
}
