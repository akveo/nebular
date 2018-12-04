/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { dirname, Path, basename } from '@angular-devkit/core';
import { DirEntry, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { addImportToModule, addProviderToModule, getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { findModule } from '@schematics/angular/utility/find-module';
import {
  addRoute,
  generateComponentRoute,
  importPath,
  getClassWithDecorator,
  multilineArrayLiteral,
  withoutExtension,
  getModuleDirs,
  getServicesFromDir,
  applyInsertChange,
  hasRoutingModuleInDir,
  addDeclaration,
  getComponentsFromDir,
  getDirectivesFromDir,
  getFeatureModuleFromDir,
  getRoutingModulesFromDir,
  generateLazyModulePath,
  generateLazyModuleRoute,
  routePredicateFromPath,
  applyReplaceChange,
  findRoutingModule,
} from '../utils';

export function addToModules(tree: Tree, context: SchematicContext): Tree {
  processDirs(tree, context, getModuleDirs(tree));
  return tree;
}

function processDirs(tree: Tree, context: SchematicContext, dirs: DirEntry[]): void {
  for (const dir of dirs) {
    if (dir.subdirs.length > 0) {
      processDirs(tree, context, dir.subdirs.map(d => dir.dir(d)));
    }

    processDir(tree, context, dir);
  }
}

function processDir(tree: Tree, context: SchematicContext, dir: DirEntry, isRoot: boolean = false): void {
  getComponentsFromDir(dir).forEach(path => processComponent(tree, context, path));
  getDirectivesFromDir(dir).forEach(path => processDirectives(tree, path));
  getServicesFromDir(dir).forEach(path => processService(tree, path));

  const modulePath = getFeatureModuleFromDir(dir);
  if (modulePath) {
    processFeatureModule(tree, context, modulePath, isRoot);
  }

  const routingModulePath = getRoutingModulesFromDir(dir);
  if (routingModulePath) {
    processRoutingModule(tree, context, routingModulePath);
  }
}

function processService(tree: Tree, servicePath: Path): void {
  const modulePath = findModule(tree, dirname(servicePath));
  const serviceDeclarations = getClassWithDecorator(tree, servicePath, 'Injectable');

  for (const service of serviceDeclarations) {
    const serviceClassName = (service.name as ts.Identifier).getText();
    const importString = importPath(modulePath, servicePath);
    const source = getSourceFile(tree, servicePath);
    const changes = addProviderToModule(source, modulePath, serviceClassName, importString);

    applyInsertChange(tree, modulePath, ...changes);
  }
}

function processComponent(tree: Tree, context: SchematicContext, componentPath: Path): void {
  const componentDeclarations = getClassWithDecorator(tree, componentPath, 'Component');
  if (componentDeclarations.length === 0) {
    return;
  }

  const dirPath = dirname(componentPath);
  for (const component of componentDeclarations) {
    const modulePath = findModule(tree, dirPath);
    const componentClassName = (component.name as ts.Identifier).getText();
    const moduleImportString = importPath(modulePath, componentPath);
    addDeclaration(tree, modulePath, componentClassName, moduleImportString);
  }

  if (hasRoutingModuleInDir(tree.getDir(dirPath))) {
    if (componentDeclarations.length > 1) {
      context.logger.warn(`Found more than one component declaration in ${componentPath}. ` +
        'Route will be created only for the first one.');
    }

    const routingModulePath = findRoutingModule(tree, dirPath);
    if (routingModulePath) {
      const componentClassName = (componentDeclarations[0].name as ts.Identifier).getText();
      const routingImport = importPath(routingModulePath, componentPath);
      const route = generateComponentRoute(withoutExtension(componentPath), componentClassName);
      addRoute(tree, routingModulePath, route, null, componentClassName, routingImport);
    }
  }
}

function processDirectives(tree: Tree, directivePath: Path): void {
  const directiveDeclarations = getClassWithDecorator(tree, directivePath, 'Directive');

  const dirPath = dirname(directivePath);
  for (const directive of directiveDeclarations) {
    const modulePath = findModule(tree, dirPath);
    const directiveClassName = (directive.name as ts.Identifier).getText();
    const moduleImportString = importPath(modulePath, directivePath);
    addDeclaration(tree, modulePath, directiveClassName, moduleImportString);
  }
}

function processFeatureModule(tree: Tree, context: SchematicContext, modulePath: Path, isRoot: boolean = false): void {
  const parentDir = dirname(dirname(modulePath));
  const moduleDeclarations = getClassWithDecorator(tree, modulePath, 'NgModule');

  if (moduleDeclarations.length === 0) {
    return;
  }
  if (moduleDeclarations.length > 1) {
    context.logger.warn(`Found more than one module declaration in ${modulePath}. ` +
      'Route will be created only for the first one.');
  }

  multilineDeclarationsArray(tree, modulePath);
  if (isRoot) {
    return;
  }

  const routingModulePath = findRoutingModule(tree, parentDir);
  if (routingModulePath == null) {
    return
  }
  const moduleDirName = basename(dirname(modulePath));
  const moduleClassName = (moduleDeclarations[0].name as ts.Identifier).getText();
  const routePath = generateLazyModulePath(routingModulePath, modulePath, moduleClassName);
  const route = generateLazyModuleRoute(moduleDirName, routePath);
  const parentRoutePredicate = routePredicateFromPath(modulePath);
  addRoute(tree, routingModulePath, route, parentRoutePredicate);
}

function processRoutingModule(tree: Tree, context: SchematicContext, modulePath: Path) {
  const moduleDeclarations = getClassWithDecorator(tree, modulePath, 'NgModule');
  if (moduleDeclarations.length === 0) {
    return;
  }
  if (moduleDeclarations.length > 1) {
    context.logger.warn(`Found more than one module declaration in ${modulePath}. ` +
      'Route will be created only for the first one.');
  }

  const className = (moduleDeclarations[0].name as ts.Identifier).getText();
  const featureModulePath = findModule(tree, dirname(modulePath));
  const featureModuleSource = getSourceFile(tree, featureModulePath);
  const importString = importPath(featureModulePath, modulePath);
  const changes = addImportToModule(featureModuleSource, featureModulePath, className, importString);
  applyInsertChange(tree, featureModulePath, ...changes);
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
  applyReplaceChange(tree, modulePath, ...replaces);
}
