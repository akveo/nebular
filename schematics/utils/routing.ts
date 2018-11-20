/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { parse as parsePath } from 'path';
import * as ts from 'typescript';
import { Path, strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { getDecoratorMetadata, insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  addArrayElement,
  addObjectProperty,
  findDeclarationByIdentifier,
  generateFeatureModuleClassName,
  generateFeatureModuleFileName,
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

export function generateLazyModulePath(moduleName: string): string {
  const dashedName = strings.dasherize(moduleName);
  const baseFileName = parsePath(generateFeatureModuleFileName(moduleName)).name;
  const className = generateFeatureModuleClassName(moduleName);
  return `./${dashedName}/${baseFileName}#${className}`;
}

export function addRoute(
  tree: Tree,
  modulePath: Path,
  route: string,
  parentPredicate?: RoutePredicate | null,
  componentClass?: string,
  importPath?: string,
): void {
  let source = getSourceFile(tree, modulePath);

  let routesArray;
  if (parentPredicate) {
    let parentRoute = findRoute(findRoutesArray(tree, modulePath), parentPredicate);
    if (parentRoute == null) {
      throw new SchematicsException(`Error in ${modulePath}. Can't find parent route for ${route}.`);
    }
    try {
      routesArray = getRouteChildren(parentRoute) as ts.ArrayLiteralExpression;
    } catch (e) {
      throw new SchematicsException(`Error in ${modulePath}. ${e.message}`);
    }
    if (routesArray == null) {
      addRouteChildrenProp(tree, source, parentRoute);
      source = getSourceFile(tree, modulePath);
      parentRoute = findRoute(findRoutesArray(tree, modulePath), parentPredicate) as ts.ObjectLiteralExpression;
      routesArray = getRouteChildren(parentRoute) as ts.ArrayLiteralExpression;
    }
  } else {
    routesArray = findRoutesArray(tree, modulePath);
  }

  const alreadyInRoutes = routesArray.getFullText().includes(route);
  if (alreadyInRoutes) {
    return;
  }

  addArrayElement(tree, source, routesArray, route);

  if (componentClass && importPath) {
    const importChange = insertImport(source, source.fileName, componentClass, importPath);
    const recorder = tree.beginUpdate(source.fileName);
    if (importChange instanceof InsertChange) {
      recorder.insertLeft(importChange.pos, importChange.toAdd);
    }
    tree.commitUpdate(recorder);
  }
}

function findRoute(
  routesArray: ts.ArrayLiteralExpression | null,
  predicate: RoutePredicate,
): ts.ObjectLiteralExpression | null {
  if (routesArray == null) {
    return null;
  }

  let route = null;
  routesArray.elements
    .filter(el => el.kind === ts.SyntaxKind.ObjectLiteralExpression)
    .some((el: ts.ObjectLiteralExpression) => {
      if (predicate(el)) {
        route = el;
      } else {
        route = findRoute(getRouteChildren(el), predicate);
      }
      return route != null;
    });
  return route;
}

function getRouteChildren(route: ts.ObjectLiteralExpression): ts.ArrayLiteralExpression | null {
  const children = route.properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    .find((prop: ts.PropertyAssignment) => prop.name.getText() === 'children') as ts.PropertyAssignment;

  if (children == null) {
    return null;
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
