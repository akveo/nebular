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
import {
  addArrayElement,
  addObjectProperty,
  applyInsertChange,
  findDeclarationByIdentifier,
  importPath,
  isBasePlaygroundModule,
  isLayoutPath,
  isRootPlaygroundModule,
  LAYOUT_COMPONENT_CLASS,
  LAYOUT_MODULE_CLASS,
  LAYOUT_MODULE_PATH,
  LAYOUT_ROUTING_MODULE_PATH,
  NO_LAYOUT_COMPONENT_CLASS,
  NO_LAYOUT_MODULE_CLASS,
  NO_LAYOUT_MODULE_PATH,
  NO_LAYOUT_ROUTING_MODULE_PATH,
  PLAYGROUND_ROUTING_MODULE_PATH,
} from '../utils';

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

  const declaration = findDeclarationByIdentifier(source, (routesArgument as ts.Identifier).getText());
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
export function addMissingChildRoutes(tree: Tree, routingModulePath: Path, targetFile: Path): void {
  if (isRootPlaygroundModule(routingModulePath)) {
    return addRootRoute(tree, targetFile);
  }

  if (isBasePlaygroundModule(routingModulePath)) {
    addBaseRoute(tree, targetFile);
  }

  addMissingPaths(tree, routingModulePath, targetFile);
}

function addMissingPaths(tree: Tree, routingModulePath: Path, targetFile: Path): void {
  const relativePath = targetFile.replace(dirname(routingModulePath), '');
  const existingPathEnd = targetFile.indexOf(relativePath);
  let existingPath = normalize(targetFile.slice(0, existingPathEnd));
  const pathsToCheck = dirsToRoutePaths(relativePath);

  for (let i = 0; i < pathsToCheck.length; i++) {
    const pathToCheck = pathsToCheck[i];
    const pathPredicates = routePredicatesFromPath(routingModulePath, join(existingPath, pathToCheck));
    let routesArray = findRoutesArray(tree, routingModulePath);

    let route = findRouteWithPath(routesArray, pathPredicates);
    if (!route) {
      const parentRoutes = i > 0
        ? getRouteWithPathChildren(routesArray, pathPredicates.slice(0, i - 1))
        : routesArray;
      addRoute(tree, routingModulePath, parentRoutes, generatePathRoute(pathToCheck));
      routesArray = findRoutesArray(tree, routingModulePath);
      route = findRouteWithPath(routesArray, pathPredicates) as ts.ObjectLiteralExpression;
    }

    const allChecked = i === pathsToCheck.length - 1;
    if (allChecked) {
      return;
    }

    existingPath = join(existingPath, pathToCheck);
    if (!getRouteChildren(route)) {
      addObjectProperty(tree, getSourceFile(tree, routingModulePath), route, 'children: []');
    }
  }
}

export function addRootRoute(tree: Tree, targetFile: Path): void {
  const routesArray = findRoutesArray(tree, PLAYGROUND_ROUTING_MODULE_PATH);
  if (findRouteWithPath(routesArray, [rootRoutePredicate(targetFile)])) {
    return;
  }

  const isLayout = isLayoutPath(targetFile);
  const baseModulePath = isLayout ? LAYOUT_MODULE_PATH : NO_LAYOUT_MODULE_PATH ;
  const baseModuleClass = isLayout ? LAYOUT_MODULE_CLASS : NO_LAYOUT_MODULE_CLASS  ;
  const lazyModulePath = generateLazyModulePath(PLAYGROUND_ROUTING_MODULE_PATH, baseModulePath, baseModuleClass);
  const routeString = generatePathRoute('', `loadChildren: '${lazyModulePath}'`);
  addRoute(tree, PLAYGROUND_ROUTING_MODULE_PATH, routesArray, routeString);
}

export function addBaseRoute(tree: Tree, targetFile: Path): void {
  const isLayout = isLayoutPath(targetFile);
  const baseModulePath = isLayout ? LAYOUT_ROUTING_MODULE_PATH : NO_LAYOUT_ROUTING_MODULE_PATH;
  const routesArray = findRoutesArray(tree, baseModulePath);
  if (findRouteWithPath(routesArray, [baseComponentPredicate(targetFile)])) {
    return;
  }

  const baseModuleComponent = isLayout ? LAYOUT_COMPONENT_CLASS : NO_LAYOUT_COMPONENT_CLASS;
  const routeString = generateComponentRoute('', baseModuleComponent);
  addRoute(tree, baseModulePath, routesArray, routeString);
}

function getRouteWithPathChildren(
  routesArray: ts.ArrayLiteralExpression,
  predicates: RoutePredicate[],
): ts.ArrayLiteralExpression {
  const route = findRouteWithPath(routesArray, predicates) as ts.ObjectLiteralExpression;
  return getRouteChildren(route) as ts.ArrayLiteralExpression;
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
  const routes = getRoutesFromArray(routesArray);
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

export function getRoutesFromArray(routesArray: ts.ArrayLiteralExpression): ts.ObjectLiteralExpression[] {
  return routesArray.elements
    .filter(node => node.kind === ts.SyntaxKind.ObjectLiteralExpression) as ts.ObjectLiteralExpression[];
}

export function getRouteChildren(route: ts.ObjectLiteralExpression): ts.ArrayLiteralExpression | undefined {
  const children = findRouteProp(route, 'children');

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

/**
 * Returns array of route paths relative to playground.
 */
export function dirsToRoutePaths(dirPath: string): string[] {
  return dirPath.split(NormalizedSep).filter(dir => dir);
}

/**
 * Returns predicate bound to array of predicates which will check route and it's children to conform routing path
 * for a given file path.
 * @param routingModulePath full path to routing module
 * @param targetDirPath full path to directory containing component or module file for the route
 */
export function routePredicatesFromPath(routingModulePath: Path, targetDirPath: Path): RoutePredicate[] {
  if (dirname(routingModulePath) === targetDirPath) {
    throw new SchematicsException('Directory with routing module can\'t contain child module.' +
      `Routing module path: ${routingModulePath}.\nChild module path: ${targetDirPath}.`);
  }

  const routingModuleDir = dirname(routingModulePath);
  if (isRootPlaygroundModule(routingModuleDir)) {
    return [rootRoutePredicate(targetDirPath)];
  }

  const predicates: RoutePredicate[] = [];
  if (isBasePlaygroundModule(routingModuleDir)) {
    predicates.push(baseComponentPredicate(targetDirPath));
  }
  const relativeToRoutingModule = targetDirPath.replace(dirname(routingModulePath), '');
  const routePaths = dirsToRoutePaths(relativeToRoutingModule);
  for (const path of routePaths) {
    predicates.push((route: ts.ObjectLiteralExpression) => pathRoutePredicate(path, route));
  }

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

export function baseComponentPredicate(modulePath: Path): RoutePredicate {
  const rootComponentClass = isLayoutPath(modulePath) ? LAYOUT_COMPONENT_CLASS : NO_LAYOUT_COMPONENT_CLASS;
  return (route: ts.ObjectLiteralExpression) => componentRoutePredicate(rootComponentClass, route);
}

export function rootRoutePredicate(modulePath: Path): RoutePredicate {
  const isLayout = isLayoutPath(modulePath);
  const baseModulePath = isLayout ? LAYOUT_MODULE_PATH : NO_LAYOUT_MODULE_PATH;
  const baseModuleClass = isLayout ? LAYOUT_MODULE_CLASS : NO_LAYOUT_MODULE_CLASS;
  const lazyModulePath = generateLazyModulePath(PLAYGROUND_ROUTING_MODULE_PATH, baseModulePath, baseModuleClass);

  return (route: ts.ObjectLiteralExpression) => lazyModulePredicate(lazyModulePath, route);
}
