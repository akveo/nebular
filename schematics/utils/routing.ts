/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { Path, strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { getDecoratorMetadata, insertImport } from '@schematics/angular/utility/ast-utils';
import { findDeclarationByIdentifier, generateFeatureModuleClassName, generateFeatureModuleFileName } from '../utils';
import { InsertChange } from '@schematics/angular/utility/change';

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
  return `
  {
    ${routeFields.join(',\n    ')},
  }`;
}

export function generateLazyModulePath(moduleName: string): string {
  const dashedName = strings.dasherize(moduleName);
  const fileName = generateFeatureModuleFileName(moduleName);
  const className = generateFeatureModuleClassName(moduleName);
  return `./${dashedName}/${fileName}#${className}`;
}

export function addRoute(
  tree: Tree,
  modulePath: Path,
  route: string,
  componentClass?: string,
  importPath?: string,
): void {
  const source = getSourceFile(tree, modulePath);
  const routesArray = findRoutesArray(tree, modulePath);

  const alreadyInRoutes = routesArray.getFullText().includes(route);
  if (alreadyInRoutes) {
    return;
  }

  const hasElements = routesArray.elements.length > 0;
  let lastElementPosition: number;
  let toRemove = '';
  if (hasElements) {
    const lastEl = routesArray.elements[routesArray.elements.length - 1];
    lastElementPosition = lastEl.getEnd();
    toRemove = source.getFullText().slice(lastElementPosition, routesArray.getEnd() - 1);
  } else {
    lastElementPosition = routesArray.elements.pos;
  }

  const toAdd = `${hasElements ? ',' : ''}${route},\n`;

  const recorder = tree.beginUpdate(source.fileName);
  if (toRemove.length > 0) {
    recorder.remove(lastElementPosition, toRemove.length);
  }
  recorder.insertLeft(lastElementPosition, toAdd);

  if (componentClass && importPath) {
    const importChange = insertImport(source, source.fileName, componentClass, importPath);
    if (importChange instanceof InsertChange) {
      recorder.insertLeft(importChange.pos, importChange.toAdd);
    }
  }

  tree.commitUpdate(recorder);
}
