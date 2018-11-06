/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { Path } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { findDeclarationByIdentifier } from '../utils';

export function findRoutesArray(tree: Tree, modulePath: Path): ts.ArrayLiteralExpression {
  const source = getSourceFile(tree, modulePath);

  const decoratorNode = getDecoratorMetadata(source, 'NgModule', '@angular/core')[0] as ts.ObjectLiteralExpression;
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
    .find((el: ts.CallExpression) => el.expression.getFullText() === 'RouterModule.forChild') as ts.CallExpression;
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
