/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import * as ts from 'typescript';
import { Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
export declare function findRoutesArray(tree: Tree, modulePath: Path): ts.ArrayLiteralExpression;
export declare function generateComponentRoute(path: string, component: string, ...routeFields: string[]): string;
export declare function generatePathRoute(path: string, ...routeFields: string[]): string;
export declare function generateRoute(...routeFields: string[]): string;
export declare type RoutePredicate = (route: ts.ObjectLiteralExpression) => boolean;
export declare function generateLazyModulePath(from: Path, to: Path, moduleClassName: string): string;
/**
 * @param routingModulePath full path to routing module
 * @param targetFile full path to file containing component or module for the route
 */
export declare function addMissingChildRoutes(tree: Tree, routingModulePath: Path, targetFile: Path): void;
export declare function addRootRoute(tree: Tree, targetFile: Path): void;
export declare function addBaseRoute(tree: Tree, targetFile: Path): void;
export declare function addRoute(tree: Tree, routingModulePath: Path, routes: ts.ArrayLiteralExpression, route: string, componentClass?: string, fileImportPath?: string): void;
export declare function findRoute(routesArray: ts.ArrayLiteralExpression, predicate: RoutePredicate): ts.ObjectLiteralExpression | undefined;
/**
 * @param routesArray array to search in
 * @param predicates predicate for each level
 */
export declare function findRouteWithPath(routesArray: ts.ArrayLiteralExpression, predicates: RoutePredicate[]): ts.ObjectLiteralExpression | undefined;
export declare function getRoutesFromArray(routesArray: ts.ArrayLiteralExpression): ts.ObjectLiteralExpression[];
export declare function getRouteChildren(route: ts.ObjectLiteralExpression): ts.ArrayLiteralExpression | undefined;
export declare function getRouteProps(route: ts.ObjectLiteralExpression): ts.PropertyAssignment[];
export declare function findRouteProp(route: ts.ObjectLiteralExpression, propName: string): ts.PropertyAssignment | undefined;
export declare function getRouteLazyModule(route: ts.ObjectLiteralExpression): ts.PropertyAssignment | undefined;
export declare function getRouteComponent(route: ts.ObjectLiteralExpression): ts.PropertyAssignment | undefined;
export declare function getRoutePath(route: ts.ObjectLiteralExpression): ts.PropertyAssignment | undefined;
/**
 * Returns array of route paths relative to playground.
 */
export declare function dirsToRoutePaths(dirPath: string): string[];
/**
 * Returns predicate bound to array of predicates which will check route and it's children to conform routing path
 * for a given file path.
 * @param routingModulePath full path to routing module
 * @param targetDirPath full path to directory containing component or module file for the route
 */
export declare function routePredicatesFromPath(routingModulePath: Path, targetDirPath: Path): RoutePredicate[];
export declare function pathRoutePredicate(routePath: string, route: ts.ObjectLiteralExpression): boolean;
export declare function componentRoutePredicate(componentClass: string, route: ts.ObjectLiteralExpression): boolean;
export declare function lazyModulePredicate(lazyModulePath: string, route: ts.ObjectLiteralExpression): boolean;
export declare function baseComponentPredicate(modulePath: Path): RoutePredicate;
export declare function rootRoutePredicate(modulePath: Path): RoutePredicate;
export declare function isLazyRoute(route: ts.ObjectLiteralExpression): boolean;
export declare function isComponentRoute(route: ts.ObjectLiteralExpression): boolean;
