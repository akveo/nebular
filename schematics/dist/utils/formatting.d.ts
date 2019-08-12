/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import * as ts from 'typescript';
import { ReplaceChange } from './change';
export declare function multilineArrayLiteral(fullText: string, arrayLiteralNode: ts.ArrayLiteralExpression): ReplaceChange[];
/**
 * Returns count of the characters between new line and node start.
 * If node has no indentation, function searches for the first indented parent node.
 * @param source Source file full text.
 * @param node Node indentation to find.
 */
export declare function getNodeIndentation(source: string, node: ts.Node): number;
