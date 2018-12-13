/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { dirname, Path } from '@angular-devkit/core';
import { DirEntry, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import { addImportToModule, addProviderToModule, getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import {
  addRoute,
  generateComponentRoute,
  importPath,
  getClassWithDecorator,
  multilineArrayLiteral,
  removeExtension,
  getServicesFromDir,
  applyInsertChange,
  hasRoutingModuleInDir,
  addDeclaration,
  getComponentsFromDir,
  getDirectivesFromDir,
  getFeatureModuleFromDir,
  getRoutingModuleFromDir,
  generateLazyModulePath,
  routePredicatesFromPath,
  applyReplaceChange,
  findRoutingModule,
  findFeatureModule,
  getPlaygroundRootDir,
  findRoutesArray,
  addMissingChildRoutes,
  isInPlaygroundRoot,
  getRouteLazyModule,
  addObjectProperty,
  findRouteWithPath,
  LAYOUT_DIR_PATH,
  NO_LAYOUT_DIR_PATH,
  generatePathRoute,
  findRoute,
  componentRoutePredicate,
} from '../utils';

export function addToModules(tree: Tree, context: SchematicContext): Tree {
  processDirs(tree, context, [getPlaygroundRootDir(tree)]);
  return tree;
}

function processDirs(tree: Tree, context: SchematicContext, dirs: DirEntry[]): void {
  for (const dir of dirs) {
    processDir(tree, context, dir);

    if (dir.subdirs.length > 0) {
      processDirs(tree, context, dir.subdirs.map(d => dir.dir(d)));
    }
  }
}

function processDir(tree: Tree, context: SchematicContext, dir: DirEntry): void {
  getComponentsFromDir(dir).forEach(path => processComponent(tree, context, path));
  getDirectivesFromDir(dir).forEach(path => processDirectives(tree, path));
  getServicesFromDir(dir).forEach(path => processService(tree, path));

  const modulePath = getFeatureModuleFromDir(dir);
  if (modulePath) {
    processFeatureModule(tree, context, modulePath);
  }

  const routingModulePath = getRoutingModuleFromDir(dir);
  if (routingModulePath) {
    processRoutingModule(tree, context, routingModulePath);
  }
}

function processService(tree: Tree, servicePath: Path): void {
  const modulePath = findFeatureModule(tree, dirname(servicePath));
  if (modulePath == null) {
    throw new SchematicsException(`Can't find module for service ${servicePath}.`);
  }
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
  const dirPath = dirname(componentPath);
  const modulePath = findFeatureModule(tree, dirPath);
  if (modulePath == null) {
    throw new SchematicsException(`Can't find module for component ${componentPath}.`);
  }

  const componentDeclarations = getClassWithDecorator(tree, componentPath, 'Component');
  if (componentDeclarations.length === 0) {
    return;
  }
  for (const component of componentDeclarations) {
    const className = (component.name as ts.Identifier).getText();
    const moduleImportString = importPath(modulePath, componentPath);
    addDeclaration(tree, modulePath, className, moduleImportString);
  }

  if (!hasRoutingModuleInDir(tree.getDir(dirPath))) {
    return;
  }

  const routingModulePath = findRoutingModule(tree, dirPath);
  if (!routingModulePath) {
    throw new SchematicsException(`Can't find routing module for module ${modulePath}.`);
  }

  if (componentDeclarations.length > 1) {
    context.logger.warn(`Found more than one component declaration in ${componentPath}. ` +
      'Route will be created only for the first one.\n' +
      'Move all helper components which don\'t need own routes to sub directory without routing module in it.');
  }

  const componentClassName = (componentDeclarations[0].name as ts.Identifier).getText();
  const routes = findRoutesArray(tree, routingModulePath);

  if (findRoute(routes, componentRoutePredicate.bind(null, componentClassName))) {
    return;
  }

  const routingImport = importPath(routingModulePath, componentPath);
  const routePath = isInPlaygroundRoot(componentPath)
    ? ''
    : removeExtension(componentPath);
  const route = generateComponentRoute(routePath, componentClassName);
  addRoute(tree, routingModulePath, routes, route, componentClassName, routingImport);
}

function processDirectives(tree: Tree, directivePath: Path): void {
  const dirPath = dirname(directivePath);
  const modulePath = findFeatureModule(tree, dirPath);
  if (modulePath == null) {
    throw new SchematicsException(`Can't find module for directive ${directivePath}.`);
  }

  const directiveDeclarations = getClassWithDecorator(tree, directivePath, 'Directive');
  for (const directive of directiveDeclarations) {
    const directiveClassName = (directive.name as ts.Identifier).getText();
    const moduleImportString = importPath(modulePath, directivePath);
    addDeclaration(tree, modulePath, directiveClassName, moduleImportString);
  }
}

function processFeatureModule(tree: Tree, context: SchematicContext, modulePath: Path): void {
  const moduleDir = dirname(modulePath);
  const parentDir = dirname(moduleDir);
  const moduleDeclarations = getClassWithDecorator(tree, modulePath, 'NgModule');

  if (moduleDeclarations.length === 0) {
    return;
  }

  multilineDeclarationsArray(tree, modulePath);

  const routingModulePath = findRoutingModule(tree, parentDir);
  if (routingModulePath == null) {
    return;
  }
  if (moduleDeclarations.length > 1) {
    context.logger.warn(`Found more than one module declaration in ${modulePath}. ` +
      'Route will be created only for the first one.');
  }

  const moduleClassName = (moduleDeclarations[0].name as ts.Identifier).getText();
  const lazyModulePath = generateLazyModulePath(routingModulePath, modulePath, moduleClassName);

  const isBaseModule = moduleDir === LAYOUT_DIR_PATH || moduleDir === NO_LAYOUT_DIR_PATH;
  if (isBaseModule) {
    const routes = findRoutesArray(tree, routingModulePath);
    addRoute(tree, routingModulePath, routes, generatePathRoute('', `loadChildren: '${lazyModulePath}'`));
    return;
  }

  const routePredicates = routePredicatesFromPath(routingModulePath, moduleDir);
  let route = findRouteWithPath(findRoutesArray(tree, routingModulePath), routePredicates);
  if (route == null) {
    addMissingChildRoutes(tree, routingModulePath, modulePath);
    route = findRouteWithPath(findRoutesArray(tree, routingModulePath), routePredicates) as ts.ObjectLiteralExpression;
  }

  const alreadyHasLazyModule = !!getRouteLazyModule(route);
  if (alreadyHasLazyModule) {
    return;
  }

  addObjectProperty(tree, getSourceFile(tree, routingModulePath), route, `loadChildren: '${lazyModulePath}'`);
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

  const featureModulePath = findFeatureModule(tree, dirname(modulePath));
  if (featureModulePath  == null) {
    throw new SchematicsException(`Can't find module for service ${featureModulePath }.`);
  }
  const featureModuleSource = getSourceFile(tree, featureModulePath);
  const importString = importPath(featureModulePath, modulePath);
  const className = (moduleDeclarations[0].name as ts.Identifier).getText();
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

  const replaces = multilineArrayLiteral(source.getFullText(), declarationsArray);
  applyReplaceChange(tree, modulePath, ...replaces);
}
