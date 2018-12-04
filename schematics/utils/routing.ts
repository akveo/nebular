/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { dirname, normalize, NormalizedSep, Path, join } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { getDecoratorMetadata, insertImport } from '@schematics/angular/utility/ast-utils';
import {
  addArrayElement,
  addObjectProperty,
  applyInsertChange,
  findDeclarationByIdentifier,
  importPath as routeImportPath,
  isLayoutPath,
  MODULES_WITH_LAYOUT_DIR, MODULES_WITHOUT_LAYOUT_DIR,
  PLAYGROUND_PATH,
  withoutExtension,
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
  return generateRoute(`path: '${path}'`, `component: ${component}`, ...routeFields);
}

export function generateLazyModuleRoute(path: string, modulePath: string, ...routeFields: string[]): string {
  return generateRoute(`path: '${path}'`, `loadChildren: '${modulePath}'`, ...routeFields);
}

function generateRoute(...routeFields: string[]) {
  return `{
  ${routeFields.join(',\n  ')},
}`;
}

export type RoutePredicate = (route: ts.ObjectLiteralExpression) => boolean;

export function generateLazyModulePath(from: Path, to: Path, moduleClassName: string): string {
  const path = routeImportPath(from, to);
  return `./${dirname(normalize(path))}/${withoutExtension(path)}#${moduleClassName}`;
}

export function addRoute(
  tree: Tree,
  routingModulePath: Path,
  route: string,
  parentPredicate?: RoutePredicate | null,
  componentClass?: string,
  importPath?: string,
): void {
  let source = getSourceFile(tree, routingModulePath);

  let routesArray;

  if (parentPredicate) {
    let parentRoute = findRoute(findRoutesArray(tree, routingModulePath), parentPredicate);
    if (parentRoute == null) {
      throw new SchematicsException(`Error in ${routingModulePath}. Can't find parent route for ${route}.`);
    }
    try {
      routesArray = getRouteChildren(parentRoute) as ts.ArrayLiteralExpression;
    } catch (e) {
      throw new SchematicsException(`Error in ${routingModulePath}. ${e.message}`);
    }
    if (routesArray == null) {
      addRouteChildrenProp(tree, source, parentRoute);
      source = getSourceFile(tree, routingModulePath);
      parentRoute = findRoute(findRoutesArray(tree, routingModulePath), parentPredicate) as ts.ObjectLiteralExpression;
      routesArray = getRouteChildren(parentRoute) as ts.ArrayLiteralExpression;
    }
  } else {
    routesArray = findRoutesArray(tree, routingModulePath);
  }

  const alreadyInRoutes = routesArray.getFullText().includes(route);
  if (alreadyInRoutes) {
    return;
  }

  addArrayElement(tree, source, routesArray, route);

  if (componentClass && importPath) {
    const importChange = insertImport(source, source.fileName, componentClass, importPath);
    applyInsertChange(tree, normalize(source.fileName), importChange);
  }
}

function findRoute(
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

function getRoutesFromArray(routesArray: ts.ArrayLiteralExpression): ts.ObjectLiteralExpression[] {
  return routesArray.elements
    .filter(node => node.kind === ts.SyntaxKind.ObjectLiteralExpression) as ts.ObjectLiteralExpression[];
}

function getRouteChildren(route: ts.ObjectLiteralExpression): ts.ArrayLiteralExpression | undefined {
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

function addRouteChildrenProp(tree: Tree, source: ts.SourceFile, route: ts.ObjectLiteralExpression): void {
  if (getRouteChildren(route) == null) {
    addObjectProperty(tree, source, route, 'children: []');
  }
}

/**
 * @param filePath file path!!
 */
export function routePredicateFromPath(filePath: Path): RoutePredicate {
  const isLayout = isLayoutPath(filePath);
  const rootPath = join(PLAYGROUND_PATH, isLayout ? MODULES_WITH_LAYOUT_DIR : MODULES_WITHOUT_LAYOUT_DIR);
  const routePaths = dirname(filePath).replace(rootPath, '').split(NormalizedSep).filter(dir => dir);
  const predicates = [
    componentRoutePredicate.bind(null, isLayout ? 'NbPlaygroundLayoutComponent' : 'NbPlaygroundBaseComponent'),
    ...routePaths.map(path => pathRoutePredicate.bind(null, path)),
  ];

  return deepRoutePredicate.bind(null, predicates);
}

function pathRoutePredicate(routePath: string, route: ts.ObjectLiteralExpression): boolean {
  const path = route.properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    .find((prop: ts.PropertyAssignment) => prop.initializer.getText() === 'path');

  return !!path && (path as ts.PropertyAssignment).initializer.getText() === routePath;
}

function componentRoutePredicate(componentClass: string, route: ts.ObjectLiteralExpression): boolean {
  const component = route.properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    .find((prop: ts.PropertyAssignment) => prop.name.getText() === 'component');

  return !!component && (component as ts.PropertyAssignment).initializer.getText() === componentClass;
}

function deepRoutePredicate(predicates: RoutePredicate[], node: ts.Node): boolean {
  if (predicates.length === 0) {
    return true;
  }
  if (node == null) {
    return false;
  }
  if (node.kind !== ts.SyntaxKind.ObjectLiteralExpression) {
    return deepRoutePredicate(predicates, node.parent);
  }

  const predicate = predicates[0];
  const remaining = predicates.slice(1);
  return predicate(node as ts.ObjectLiteralExpression) && deepRoutePredicate(remaining, node.parent);
}
