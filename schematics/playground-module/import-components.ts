/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { dirname, normalize, Path } from '@angular-devkit/core';
import { SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { addDeclarationToModule, getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  addRoute,
  generateComponentRoute,
  generateImportPath,
  getAllComponentDeclarations,
  getComponentsPaths,
  findComponentFeatureModule,
  findComponentRoutingModule,
  multilineArrayLiteral,
  withoutExtension,
} from '../utils';

export function addComponentsDeclarations(tree: Tree, context: SchematicContext): Tree {
  for (const componentPath of getComponentsPaths(tree)) {
    const declarations = getAllComponentDeclarations(tree, componentPath);
    if (declarations.length === 0) {
      continue;
    }

    const className = (declarations[0].name as ts.Identifier).getText();
    if (declarations.length > 1) {
      context.logger.warn(
        `Found more than one component declaration in file ${componentPath}. Using only first(${className}).`,
      );
    }

    const dirPath = dirname(normalize(componentPath));
    const featureModulePath = findComponentFeatureModule(tree, dirPath);
    const routingModulePath = findComponentRoutingModule(tree, dirPath);
    const importPathFeatureModule = generateImportPath(featureModulePath, componentPath);
    const importPathRoutingModule = generateImportPath(routingModulePath, componentPath);
    const baseFileName = withoutExtension(componentPath);
    const route = generateComponentRoute(baseFileName, className);

    addDeclaration(tree, featureModulePath, className, importPathFeatureModule);
    multilineDeclarationsArray(tree, featureModulePath);
    addRoute(tree, routingModulePath, route, null, className, importPathRoutingModule);
  }

  return tree;
}

function addDeclaration(tree: Tree, modulePath: Path, componentClass: string, importPath: string): void {
  const source = getSourceFile(tree, modulePath);
  const moduleDirPath = dirname(normalize(source.fileName));

  const declarationsChanges = addDeclarationToModule(source, moduleDirPath, componentClass, importPath);
  const recorder = tree.beginUpdate(source.fileName);
  declarationsChanges
    .filter(change => change instanceof InsertChange)
    .forEach((change: InsertChange) => recorder.insertLeft(change.pos, change.toAdd));
  tree.commitUpdate(recorder);
}

function multilineDeclarationsArray(tree: Tree, modulePath: Path): void {
  const source = getSourceFile(tree, modulePath);
  const decoratorNode = getDecoratorMetadata(source, 'NgModule', '@angular/core')[0] as ts.ObjectLiteralExpression;

  if (decoratorNode == null) {
    throw new SchematicsException(`Can't find NgModule decorator in ${modulePath}`);
  }

  const declarationsNode = decoratorNode.properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    .find((prop: ts.PropertyAssignment) => prop.name.getText() === 'declarations') as ts.PropertyAssignment;

  if (declarationsNode == null) {
    return;
  }
  if (declarationsNode.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
    throw new SchematicsException(`Error in ${modulePath}. Expecting declarations to be an array.`);
  }

  const declarationsArray = declarationsNode.initializer as ts.ArrayLiteralExpression;
  if (declarationsArray.elements.length <= 1) {
    return;
  }

  const replaces = multilineArrayLiteral(source.getFullText(), declarationsArray, 4);
  const recorder = tree.beginUpdate(modulePath);
  replaces.forEach(({ pos, oldText, newText }) => {
    recorder.remove(pos, oldText.length);
    recorder.insertLeft(pos, newText);
  });
  tree.commitUpdate(recorder);
}
