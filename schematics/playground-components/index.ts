/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { dirname, join, normalize, Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, SchematicsException, Tree, Rule } from '@angular-devkit/schematics';
import { getSourceFile } from '@angular/cdk/schematics';
import {
  addTrailingCommas,
  applyReplaceChange,
  findDeclarationByIdentifier,
  findRoutesArray,
  getPlaygroundRootDir,
  getRouteChildren,
  getRouteComponent,
  getRouteLazyModule,
  getRoutePath,
  getRoutesFromArray,
  isComponentRoute,
  isLazyRoute,
  isRoutingModule,
  lazyModuleImportToFilePath,
  removePropsQuotes,
  singleQuotes,
  splitClassName,
  trimQuotes,
} from '../utils';

const COMPONENTS_LIST_FILE_PATH = normalize('/src/app/playground-components.ts');
const COMPONENTS_VARIABLE_NAME = 'PLAYGROUND_COMPONENTS';

interface ComponentLink {
  path: string;
  name?: string;
  component?: string;
  link?: any[] | string;
  children?: ComponentLink[];
}

export function playgroundComponents(): Rule {
  return generateComponentsList;
}

function generateComponentsList(tree: Tree): void {
  const componentsListFile = getSourceFile(tree, COMPONENTS_LIST_FILE_PATH);
  const componentsListArray = getComponentsListArray(componentsListFile);
  const routes = removeRoutesWithoutPath(findRoutesInDir(tree, getPlaygroundRootDir(tree)));
  updateComponentsFile(tree, componentsListFile, componentsListArray, routes);
}

function getComponentsListArray(fileSource: ts.SourceFile): ts.ArrayLiteralExpression {
  const listDeclaration = findDeclarationByIdentifier(fileSource, COMPONENTS_VARIABLE_NAME);
  if (!listDeclaration) {
    throw new SchematicsException(`Error in ${COMPONENTS_LIST_FILE_PATH}. Can't find components list variable.`);
  }
  const initializer = (listDeclaration as ts.VariableDeclaration).initializer;
  if (!initializer || initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
    throw new SchematicsException(`Error in ${COMPONENTS_LIST_FILE_PATH}. List should be initialized with array.`);
  }

  return initializer as ts.ArrayLiteralExpression;
}

function findRoutesInDir(tree: Tree, dir: DirEntry): ComponentLink[] {
  const routingModuleFile = dir.subfiles.find(isRoutingModule);
  if (routingModuleFile) {
    const routingModulePath = join(dir.path, routingModuleFile);
    const routes = getRoutesFromArray(findRoutesArray(tree, routingModulePath));
    return parseRoutes(tree, dir, routes);
  }
  return [];
}

function parseRoutes(tree: Tree, dir: DirEntry, routeEntries: ts.ObjectLiteralExpression[]): ComponentLink[] {
  const foundRoutes: ComponentLink[] = [];
  const routesWithPath = routeEntries
    .filter(r => r.properties.length > 0)
    .filter(r => !!getRoutePath(r))
    .filter(r => isLazyRoute(r) || isComponentRoute(r));

  for (const route of routesWithPath) {
    const component = getComponentRoute(route);
    const routeChildren = getChildRoutes(tree, dir, route);
    const lazyChildren = getLazyModuleRoutes(tree, dir, route);
    const children = routeChildren.concat(lazyChildren);
    const routePath = trimQuotes((getRoutePath(route) as ts.PropertyAssignment).initializer.getText());
    foundRoutes.push({ path: routePath, component, children });
  }

  return foundRoutes;
}

function getComponentRoute(route: ts.ObjectLiteralExpression): string | undefined {
  const componentProp = getRouteComponent(route);
  if (componentProp) {
    return componentProp.initializer.getText();
  }
}

function getChildRoutes(
  tree: Tree,
  routingModuleDir: DirEntry,
  route: ts.ObjectLiteralExpression,
): ComponentLink[] {
  const childrenProp = getRouteChildren(route);
  if (childrenProp) {
    return parseRoutes(tree, routingModuleDir, getRoutesFromArray(childrenProp));
  }
  return [];
}

function getLazyModuleRoutes(
  tree: Tree,
  routingModuleDir: DirEntry,
  route: ts.ObjectLiteralExpression,
): ComponentLink[] {
  const lazyModule = getRouteLazyModule(route);
  if (lazyModule) {
    const lazyModuleImport = lazyModule.initializer.getText();
    const moduleDirPath = dirname(lazyModuleImportToFilePath(lazyModuleImport) as Path) as PathFragment;
    return findRoutesInDir(tree, routingModuleDir.dir(moduleDirPath));
  }
  return [];
}

function removeRoutesWithoutPath(routes: ComponentLink[], startPath: string = ''): ComponentLink[] {
  const routesWithPath: ComponentLink[] = [];

  for (const { path, component, children } of routes) {
    const fullPath = path ? startPath + '/' + path : startPath;
    let routeChildren;
    if (children) {
      routeChildren = removeRoutesWithoutPath(children, fullPath);
    }

    const toAdd: ComponentLink[] = [];
    if (path) {
      const link = component ? fullPath : undefined;
      const name = component ? splitClassName(component) : undefined;
      const childRoutes = routeChildren && routeChildren.length ? routeChildren : undefined;
      toAdd.push({ path, link, component, name, children: childRoutes });
    } else if (routeChildren) {
      toAdd.push(...routeChildren);
    }

    routesWithPath.push(...toAdd);
  }

  return routesWithPath;
}

function updateComponentsFile(
  tree: Tree,
  componentsListFile: ts.SourceFile,
  list: ts.ArrayLiteralExpression,
  routes: ComponentLink[],
) {
  const pos = list.getFullStart();
  const endPos = pos + list.getFullText().length;
  const oldText = componentsListFile.getFullText().slice(pos, endPos);
  const newText = generateRoutesString(routes);

  applyReplaceChange(tree, COMPONENTS_LIST_FILE_PATH, { pos, oldText, newText });
}

function generateRoutesString(routes: ComponentLink[]): string {
  const jsonRoutes = JSON.stringify(routes, null, 2);

  return ` ${addTrailingCommas(removePropsQuotes(singleQuotes(jsonRoutes)))}`;
}
