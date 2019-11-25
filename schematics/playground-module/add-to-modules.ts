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
  generateLazyModuleImport,
  routePredicatesFromPath,
  applyReplaceChange,
  findRoutingModule,
  findFeatureModule,
  getPlaygroundDirs,
  findRoutesArray,
  addMissingChildRoutes,
  isInPlaygroundRoot,
  getRouteLazyModule,
  addObjectProperty,
  findRouteWithPath,
  findRoute,
  componentRoutePredicate,
  isRootPlaygroundModule,
} from '../utils';

export function addToModules(tree: Tree, context: SchematicContext): Tree {
  processDirs(tree, context, getPlaygroundDirs(tree));
  return tree;
}

function processDirs(tree: Tree, context: SchematicContext, dirs: DirEntry[]): void {
  for (const dir of dirs) {
    processDir(tree, context, dir);

    if (dir.subdirs.length) {
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
    processRoutingModule(tree, routingModulePath);
  }
}

function processService(tree: Tree, servicePath: Path): void {
  const modulePath = findFeatureModule(tree, dirname(servicePath));
  if (!modulePath) {
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
  const componentDir = tree.getDir(dirname(componentPath));
  const modulePath = findFeatureModule(tree, componentDir.path);
  if (!modulePath) {
    throw new SchematicsException(`Can't find module for component ${componentPath}.`);
  }

  const componentDeclarations = getClassWithDecorator(tree, componentPath, 'Component');
  if (!componentDeclarations.length) {
    return;
  }
  addComponentToModule(tree, componentDeclarations, componentPath, modulePath);

  if (hasRoutingModuleInDir(componentDir)) {
    addComponentRoute(tree, componentDeclarations, modulePath, context, componentPath);
  }
}

function addComponentToModule(
  tree: Tree,
  declarations: ts.ClassDeclaration[],
  componentPath: Path,
  modulePath: Path,
): void {
  for (const component of declarations) {
    const className = (component.name as ts.Identifier).getText();
    const moduleImportString = importPath(modulePath, componentPath);
    addDeclaration(tree, modulePath, className, moduleImportString);
  }
}

function addComponentRoute(
  tree: Tree,
  componentDeclarations: ts.ClassDeclaration[],
  modulePath: Path,
  context: SchematicContext,
  componentPath: Path,
): void {
  const routingModulePath = findRoutingModule(tree, dirname(componentPath));
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
  const routePath = isInPlaygroundRoot(componentPath) ? '' : removeExtension(componentPath);
  const route = generateComponentRoute(routePath, componentClassName);
  addRoute(tree, routingModulePath, routes, route, componentClassName, routingImport);
}

function processDirectives(tree: Tree, directivePath: Path): void {
  const dirPath = dirname(directivePath);
  const modulePath = findFeatureModule(tree, dirPath);
  if (!modulePath) {
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
  const moduleDeclarations = getClassWithDecorator(tree, modulePath, 'NgModule');
  if (!moduleDeclarations.length) {
    return;
  }

  multilineDeclarationsArray(tree, modulePath);

  const parentDir = dirname(dirname(modulePath));
  const routingModulePath = findRoutingModule(tree, parentDir);
  if (!routingModulePath) {
    return;
  }

  if (moduleDeclarations.length > 1) {
    context.logger.warn(`Found more than one module declaration in ${modulePath}. ` +
      'Route will be created only for the first one.');
  }
  addModuleRoute(tree, moduleDeclarations[0], modulePath, routingModulePath);
}

function addModuleRoute(
  tree: Tree,
  moduleDeclaration: ts.ClassDeclaration,
  modulePath: Path,
  routingModulePath: Path,
): void {
  const moduleDir = dirname(modulePath);
  if (isRootPlaygroundModule(moduleDir)) {
    return;
  }

  const routePredicates = routePredicatesFromPath(routingModulePath, moduleDir);
  let route = findRouteWithPath(findRoutesArray(tree, routingModulePath), routePredicates);
  if (!route) {
    addMissingChildRoutes(tree, routingModulePath, modulePath);
    route = findRouteWithPath(findRoutesArray(tree, routingModulePath), routePredicates) as ts.ObjectLiteralExpression;
  }

  if (getRouteLazyModule(route)) {
    return;
  }

  const moduleClassName = (moduleDeclaration.name as ts.Identifier).getText();
  const lazyModuleImport = generateLazyModuleImport(routingModulePath, modulePath, moduleClassName);
  const loadChildren = `loadChildren: ${lazyModuleImport}`;
  addObjectProperty(tree, getSourceFile(tree, routingModulePath), route, loadChildren);
}

function multilineDeclarationsArray(tree: Tree, modulePath: Path): void {
  const source = getSourceFile(tree, modulePath);
  const decoratorNode = getDecoratorMetadata(source, 'NgModule', '@angular/core')[0] as ts.ObjectLiteralExpression;

  if (!decoratorNode) {
    throw new SchematicsException(`Can't find NgModule decorator in ${modulePath}`);
  }

  const declarationsNode = decoratorNode.properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    .find((prop: ts.PropertyAssignment) => prop.name.getText() === 'declarations') as ts.PropertyAssignment;

  if (!declarationsNode) {
    return;
  }
  if (declarationsNode.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
    throw new SchematicsException(`Error in ${modulePath}. Expecting declarations to be an array.`);
  }

  const declarationsArray = declarationsNode.initializer as ts.ArrayLiteralExpression;
  const replaces = multilineArrayLiteral(source.getFullText(), declarationsArray);
  applyReplaceChange(tree, modulePath, ...replaces);
}

function processRoutingModule(tree: Tree, modulePath: Path) {
  const moduleDeclarations = getClassWithDecorator(tree, modulePath, 'NgModule');
  if (!moduleDeclarations.length) {
    return;
  }

  const featureModulePath = findFeatureModule(tree, dirname(modulePath));
  if (!featureModulePath) {
    throw new SchematicsException(`Can't find module for routing module ${featureModulePath }.`);
  }

  const featureModuleSource = getSourceFile(tree, featureModulePath);
  const importString = importPath(featureModulePath, modulePath);
  for (const moduleDeclaration of moduleDeclarations) {
    const className = (moduleDeclaration.name as ts.Identifier).getText();
    const changes = addImportToModule(featureModuleSource, featureModulePath, className, importString);
    applyInsertChange(tree, featureModulePath, ...changes);
  }
}
