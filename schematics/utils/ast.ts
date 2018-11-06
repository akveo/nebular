/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { findNodes, getSourceNodes } from '@schematics/angular/utility/ast-utils';

export function getAllComponentDeclarations(tree: Tree, path: Path): ts.ClassDeclaration[] {
  return findNodes(getSourceFile(tree, path), ts.SyntaxKind.ClassDeclaration)
    .filter(node => isNodeExported(node as ts.Declaration))
    .filter(node => (node as ts.ClassDeclaration).name != null)
    .filter(node => hasComponentDecorator(node as ts.ClassDeclaration)) as ts.ClassDeclaration[];
}

/**
 * Partially adopted from getDecoratorMetadata from angular ast-utils.
 * https://github.com/angular
 * /angular-cli/blob/e3f56ebc71d57c79528fb4926a267e5ed4f9c74d/packages/schematics/angular/utility/ast-utils.ts#L282
 */
export function hasComponentDecorator(classDeclaration: ts.ClassDeclaration): boolean {
  if (classDeclaration.decorators == null) {
    return false;
  }

  return classDeclaration.decorators
    .filter(d => d.expression.kind === ts.SyntaxKind.CallExpression)
    .map(d => (d.expression as ts.CallExpression).expression)
    .some(decoratorFactoryCallExpression => decoratorFactoryCallExpression.getFullText() === 'Component');
}

/**
 * True if this is visible outside this file, false otherwise
 * github.com/Microsoft/TypeScript-wiki/blob/d6867c43218212eff796dd971f54040234c2233a/Using-the-Compiler-API.md#L757
 * */
export function isNodeExported(node: ts.Declaration): boolean {
  return (
    (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
    (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
  );
}

export function hasPropertyInObject(
  objectLiteral: ts.ObjectLiteralExpression,
  propertyName: string,
  value?: string,
): boolean {
  const skipValueCheck = !value;

  return objectLiteral.properties
    .filter(property => property.kind === ts.SyntaxKind.PropertyAssignment)
    .filter(({ name }: ts.PropertyAssignment) => name.getText() === propertyName)
    .some(({ initializer }: ts.PropertyAssignment) => skipValueCheck || initializer.getText() === value);
}

export function findDeclarationByIdentifier(source: ts.SourceFile, identifier: ts.Identifier): ts.VariableDeclaration {
  return getSourceNodes(source)
    .filter(node => node.kind === ts.SyntaxKind.VariableDeclaration)
    .find((node: ts.VariableDeclaration) => node.name.getText() === identifier.text) as ts.VariableDeclaration;
}
