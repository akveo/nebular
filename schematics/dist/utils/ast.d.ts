/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import * as ts from 'typescript';
import { Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
/**
 * Returns all exported and named class declarations with a given decorator.
 */
export declare function getClassWithDecorator(tree: Tree, path: Path, decoratorName: string): ts.ClassDeclaration[];
/**
 * Partially adopted from getDecoratorMetadata from angular ast-utils.
 * https://github.com/angular
 * /angular-cli/blob/e3f56ebc71d57c79528fb4926a267e5ed4f9c74d/packages/schematics/angular/utility/ast-utils.ts#L282
 */
export declare function hasDecoratorCall(classDeclaration: ts.ClassDeclaration, decoratorName: string): boolean;
/**
 * True if node is visible outside this file, false otherwise
 * github.com/Microsoft/TypeScript-wiki/blob/d6867c43218212eff796dd971f54040234c2233a/Using-the-Compiler-API.md#L757
 * */
export declare function isNodeExported(node: ts.Declaration): boolean;
export declare function findDeclarationByIdentifier(source: ts.SourceFile, identifierText: string): ts.VariableDeclaration;
export declare function addObjectProperty(tree: Tree, source: ts.SourceFile, node: ts.ObjectLiteralExpression, property: string): void;
export declare function addArrayElement(tree: Tree, source: ts.SourceFile, node: ts.ArrayLiteralExpression, element: string): void;
export declare function addDeclaration(tree: Tree, modulePath: Path, componentClass: string, importPath: string): void;
