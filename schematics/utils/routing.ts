/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { basename, dirname, join, normalize, NormalizedSep, Path } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { getDecoratorMetadata, insertImport } from '@schematics/angular/utility/ast-utils';
import { buildRelativePath } from '@schematics/angular/utility/find-module';
import {
  addArrayElement,
  addObjectProperty,
  applyInsertChange,
  findDeclarationByIdentifier,
  importPath,
  isBasePlaygroundModule,
  isLayoutPath,
  removeBasePath,
} from '../utils';

const LAYOUT_COMPONENT_CLASS = 'PlaygroundLayoutComponent';
const NO_LAYOUT_COMPONENT_CLASS = 'PlaygroundBaseComponent';

export function findRoutesArray(tree: Tree, modulePath: Path): ts.ArrayLiteralExpression {
  const source = getSourceFile(tree, modulePath);

  const decoratorNode = getDecoratorMetadata(source, 'NgModule', '@angular/core')[0] as ts.ObjectLiteralExpression;
  if (decoratorNode == null) {
    throw new SchematicsException(`Error in ${modulePath}. Can't find NgModule decorator.`);
  }

  const imports = decoratorNode.properties
    .filter(p => p.kind === ts.SyntaxKind.PropertyAssignment)
    .find((p: ts.PropertyAssignment) => p.name.getText() === 'imports') as ts.PropertyAssignment;
  if (imports == null) {
    throw new SchematicsException(`Error in ${modulePath}. Can't find imports in module.`);
  }
  if (imports.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
    throw new SchematicsException(`Error in ${modulePath}. 'imports' property should be initialized with array.`);
  }

  const routerModuleCall = (imports.initializer as ts.ArrayLiteralExpression)
    .elements
    .filter(el => el.kind === ts.SyntaxKind.CallExpression)
    .find((el: ts.CallExpression) => el.expression.getText() === 'RouterModule.forChild') as ts.CallExpression;
  if (routerModuleCall == null) {
    throw new SchematicsException(`Can't find RouterModule.forChild call in module imports. ${modulePath}`);
  }
  if (routerModuleCall.arguments.length === 0) {
    throw new SchematicsException(`RouterModule.forChild should be called with arguments. ${modulePath}`);
  }

  const routesArgument = routerModuleCall.arguments[0];
  if (routesArgument.kind === ts.SyntaxKind.ArrayLiteralExpression) {
    return routesArgument as ts.ArrayLiteralExpression;
  }
  if (routesArgument.kind !== ts.SyntaxKind.Identifier) {
    throw new SchematicsException(`Expecting RouterModule.forChild to be provided with array or variable identifier.`);
  }

  const declaration = findDeclarationByIdentifier(source, routesArgument as ts.Identifier);
  if (declaration == null) {
    throw new SchematicsException(`Can't find declaration of '${routesArgument.getText()}' in ${modulePath}.`);
  }
  if (declaration.initializer == null) {
    throw new SchematicsException(`Routes variable should be initialized during declaration.`);
  }
  if (declaration.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
    throw new SchematicsException(`Routes variable should be initialized with array.`);
  }

  return declaration.initializer as ts.ArrayLiteralExpression;
}

export function generateComponentRoute(path: string, component: string, ...routeFields: string[]): string {
  return generatePathRoute(path, `component: ${component}`, ...routeFields);
}

export function generatePathRoute(path: string, ...routeFields: string[]): string {
  return generateRoute(`path: '${path}'`, ...routeFields);
}

export function generateRoute(...routeFields: string[]) {
  return `{
  ${routeFields.join(',\n  ')},
}`;
}

export type RoutePredicate = (route: ts.ObjectLiteralExpression) => boolean;

export function generateLazyModulePath(from: Path, to: Path, moduleClassName: string): string {
  const path = normalize(importPath(from, to));
  return `./${dirname(path)}/${basename(path)}#${moduleClassName}`;
}

/**
 * @param routingModulePath full path to routing module
 * @param targetFile full path to file containing component or module for the route
 */
export function addMissingChildRoutes(
  tree: Tree,
  routingModulePath: Path,
  targetFile: Path,
): void {
  let routesArray = findRoutesArray(tree, routingModulePath);

  if (isBasePlaygroundModule(routingModulePath)) {
    const rootRoute = findRoute(routesArray, rootComponentPredicate(targetFile)) as ts.ObjectLiteralExpression;
    if (rootRoute == null) {
      addRoute(tree, routingModulePath, routesArray, generatePathRoute(''));
      routesArray = findRoutesArray(tree, routingModulePath);
    }
  }

  const targetDir = dirname(targetFile);
  const routesToAdd = routePathsFromPath(targetDir);
  if (routesToAdd.length === 0) {
    return;
  }

  const basePathEnd = targetFile.indexOf(removeBasePath(targetDir));
  let existingPath = normalize(targetFile.slice(0, basePathEnd));

  for (let i = 0; i < routesToAdd.length; i++) {
    const path = routesToAdd[i];
    let currentRoute = findRoute(routesArray, pathRoutePredicate.bind(null, path));
    if (currentRoute == null) {
      addRoute(tree, routingModulePath, routesArray, generatePathRoute(path));
    }
    existingPath = join(existingPath, path);
    currentRoute = currentRoute || findRouteWithPath(
      findRoutesArray(tree, routingModulePath),
      routePredicatesFromPath(routingModulePath, existingPath),
    ) as ts.ObjectLiteralExpression;

    if (i === routesToAdd.length - 1) {
      return;
    }

    let children = getRouteChildren(currentRoute);
    if (children == null) {
      addRouteChildrenProp(tree, getSourceFile(tree, routingModulePath), currentRoute);
      currentRoute = findRouteWithPath(
        findRoutesArray(tree, routingModulePath),
        routePredicatesFromPath(routingModulePath, existingPath),
      ) as ts.ObjectLiteralExpression;
      children = getRouteChildren(currentRoute) as ts.ArrayLiteralExpression;
    }
    routesArray = children;
  }
}

export function addRoute(
  tree: Tree,
  routingModulePath: Path,
  routes: ts.ArrayLiteralExpression,
  route: string,
  componentClass?: string,
  fileImportPath?: string,
): void {
  const source = getSourceFile(tree, routingModulePath);
  const alreadyInRoutes = routes.getFullText().includes(route);
  if (alreadyInRoutes) {
    return;
  }

  addArrayElement(tree, source, routes, route);

  if (componentClass && fileImportPath) {
    const importChange = insertImport(source, source.fileName, componentClass, fileImportPath);
    applyInsertChange(tree, normalize(source.fileName), importChange);
  }
}

export function findRoute(
  routesArray: ts.ArrayLiteralExpression,
  predicate: RoutePredicate,
): ts.ObjectLiteralExpression | undefined {
  const queue: ts.ObjectLiteralExpression[] = getRoutesFromArray(routesArray);

  while (queue.length > 0) {
    const route = queue.shift() as ts.ObjectLiteralExpression;
    if (predicate(route)) {
      return route;
    }

    const routeChildren = getRouteChildren(route);
    if (routeChildren) {
      queue.push(...getRoutesFromArray(routeChildren));
    }
  }

  return undefined;
}

/**
 * @param routesArray array to search in
 * @param predicates predicate for each level
 */
export function findRouteWithPath(
  routesArray: ts.ArrayLiteralExpression,
  predicates: RoutePredicate[],
): ts.ObjectLiteralExpression | undefined {
  const routes = routesArray.elements
    .filter(e => e.kind === ts.SyntaxKind.ObjectLiteralExpression) as ts.ObjectLiteralExpression[];

  for (const route of routes) {
    const isMatch = predicates[0](route);
    const isLastMatch = isMatch && predicates.length === 1;
    if (!isMatch) {
      continue;
    }
    if (isLastMatch) {
      return route;
    }

    const children = getRouteChildren(route);
    const foundRoute = children && findRouteWithPath(children, predicates.slice(1));
    if (foundRoute) {
      return foundRoute;
    }
  }

  return undefined;
}

function getRoutesFromArray(routesArray: ts.ArrayLiteralExpression): ts.ObjectLiteralExpression[] {
  return routesArray.elements
    .filter(node => node.kind === ts.SyntaxKind.ObjectLiteralExpression) as ts.ObjectLiteralExpression[];
}

export function getRouteChildren(route: ts.ObjectLiteralExpression): ts.ArrayLiteralExpression | undefined {
  const children = route.properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    .find((prop: ts.PropertyAssignment) => prop.name.getText() === 'children') as ts.PropertyAssignment;

  if (children == null) {
    return undefined;
  }
  if (children.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
    throw new SchematicsException(`Expecting children to be an array.`);
  }

  return children.initializer as ts.ArrayLiteralExpression;
}

export function getRouteProps(route: ts.ObjectLiteralExpression): ts.PropertyAssignment[] {
  return route.properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment) as ts.PropertyAssignment[];
}

export function findRouteProp(route: ts.ObjectLiteralExpression, propName: string): ts.PropertyAssignment | undefined {
  return getRouteProps(route).find(prop => prop.name.getText() === propName);
}

export function getRouteLazyModule(route: ts.ObjectLiteralExpression): ts.PropertyAssignment | undefined {
  return findRouteProp(route, 'loadChildren');
}

export function getRouteComponent(route: ts.ObjectLiteralExpression): ts.PropertyAssignment | undefined {
  return findRouteProp(route, 'component');
}

export function getRoutePath(route: ts.ObjectLiteralExpression): ts.PropertyAssignment | undefined {
  return findRouteProp(route, 'path');
}

export function addRouteChildrenProp(tree: Tree, source: ts.SourceFile, route: ts.ObjectLiteralExpression): void {
  if (getRouteChildren(route) == null) {
    addObjectProperty(tree, source, route, 'children: []');
  }
}

/**
 * Returns array of route paths relative to playground.
 */
export function routePathsFromPath(dirPath: Path): string[] {
  return removeBasePath(dirPath).split(NormalizedSep).filter(dir => dir);
}

/**
 * Returns predicate bound to array of predicates which will check route and it's children to conform routing path
 * for a given file path.
 * @param routingModulePath full path to routing module
 * @param targetDirPath full path to directory containing component or module file for the route
 */
export function routePredicatesFromPath(routingModulePath: Path, targetDirPath: Path): RoutePredicate[] {
  const predicates = [];
  const isRootRouting = isBasePlaygroundModule(dirname(routingModulePath));
  if (isRootRouting) {
    predicates.push(rootComponentPredicate(targetDirPath));
  }

  const path = isRootRouting
    ? targetDirPath
    : normalize(buildRelativePath(routingModulePath, targetDirPath));
  predicates.push(...routePathsFromPath(path).map(p => pathRoutePredicate.bind(null, p)));

  return predicates;
}

export function pathRoutePredicate(routePath: string, route: ts.ObjectLiteralExpression): boolean {
  const path = getRoutePath(route);
  return !!path && path.initializer.getText() === `'${routePath}'`;
}

export function componentRoutePredicate(componentClass: string, route: ts.ObjectLiteralExpression): boolean {
  const component = getRouteComponent(route);
  return !!component && component.initializer.getText() === componentClass;
}

export function lazyModulePredicate(lazyModulePath: string, route: ts.ObjectLiteralExpression): boolean {
  const loadChildren = getRouteLazyModule(route);
  return !!loadChildren && loadChildren.initializer.getText() === `'${lazyModulePath}'`;
}

export function rootComponentPredicate(modulePath: Path): RoutePredicate {
  const rootComponentClass = isLayoutPath(modulePath) ? LAYOUT_COMPONENT_CLASS : NO_LAYOUT_COMPONENT_CLASS;
  return componentRoutePredicate.bind(null, rootComponentClass);
}
