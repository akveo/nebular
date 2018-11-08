/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { basename, dirname, join, normalize, NormalizedSep, Path } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import {
  addDeclarationToModule, getDecoratorMetadata, insertImport,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  fileNameWithoutExtension,
  findRoutesArray,
  getAllComponentDeclarations,
  getPlaygroundComponents,
  hasPropertyInObject,
  multilineArrayLiteral,
  parentDirName,
} from '../utils';

export function addComponentsToModules(tree: Tree): Tree {
  const paths = getPlaygroundComponents(tree);

  for (const path of paths) {
    const dirPath = dirname(normalize(path));
    const dirName = parentDirName(path);
    const importPath = `.${NormalizedSep}${fileNameWithoutExtension(path)}`;

    for (const declaration of getAllComponentDeclarations(tree, path)) {
      const className = (declaration.name as ts.Identifier).getText();
      const featureModulePath = join(dirPath, `${dirName}.module.ts`);
      const routingModulePath = join(dirPath, `${dirName}-routing.module.ts`);

      addToFeatureModule(tree, featureModulePath, className, importPath);
      multilineDeclarations(tree, featureModulePath);
      addToRoutingModule(tree, routingModulePath, className, importPath);
    }
  }

  return tree;
}

function addToFeatureModule(tree: Tree, modulePath: Path, componentClass: string, importPath: string): void {
  const source = getSourceFile(tree, modulePath);
  const moduleDirPath = dirname(normalize(source.fileName));

  const declarationsChanges = addDeclarationToModule(source, moduleDirPath, componentClass, importPath);
  const recorder = tree.beginUpdate(source.fileName);
  declarationsChanges
    .filter(change => change instanceof InsertChange)
    .forEach((change: InsertChange) => recorder.insertLeft(change.pos, change.toAdd));
  tree.commitUpdate(recorder);
}

function multilineDeclarations(tree: Tree, modulePath: Path): void {
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

function addToRoutingModule(tree: Tree, modulePath: Path, componentClass: string, importPath: string): void {
  const source = getSourceFile(tree, modulePath);
  const routesArray = findRoutesArray(tree, modulePath);

  const alreadyInRoutes = routesArray.elements
    .filter(el => el.kind === ts.SyntaxKind.ObjectLiteralExpression)
    .some((el: ts.ObjectLiteralExpression) => hasPropertyInObject(el, 'component', componentClass));

  if (alreadyInRoutes) {
    return;
  }

  let position: number;
  let toRemove = '';
  if (routesArray.elements.length === 0) {
    position = routesArray.elements.pos;
  } else {
    const lastEl = routesArray.elements[routesArray.elements.length - 1];
    position = lastEl.getEnd();
    toRemove = source.getFullText().slice(position, routesArray.getEnd() - 1);
  }

  const toAdd = `${routesArray.elements.length > 0 ? ',' : ''}
  {
    path: '${basename(normalize(importPath))}',
    component: ${componentClass},
  },\n`;

  const recorder = tree.beginUpdate(source.fileName);
  if (toRemove.length > 0) {
    recorder.remove(position, toRemove.length);
  }
  recorder.insertLeft(position, toAdd);
  const importChange = insertImport(source, source.fileName, componentClass, importPath);
  if (importChange instanceof InsertChange) {
    recorder.insertLeft(importChange.pos, importChange.toAdd);
  }
  tree.commitUpdate(recorder);
}
