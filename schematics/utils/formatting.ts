/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';
import { ReplaceChange } from './change';

export function multilineArrayLiteral(
  fullText: string,
  arrayLiteralNode: ts.ArrayLiteralExpression,
  elementIndentation: number,
): ReplaceChange[] {
  const replaces: ReplaceChange[] = [];

  arrayLiteralNode.elements.forEach(el => {
    const start = el.getFullStart();
    const end = el.getStart();
    const oldText = fullText.slice(start, end);
    replaces.push({ pos: start, oldText, newText: `\n${' '.repeat(elementIndentation)}` });
  });

  const lastElement = arrayLiteralNode.elements[arrayLiteralNode.elements.length - 1];
  const lastElementEnd = lastElement.getFullStart() + lastElement.getFullWidth();
  const closingBracketPos = arrayLiteralNode.getFullStart() + arrayLiteralNode.getFullWidth();
  replaces.push({
    pos: lastElementEnd,
    oldText: fullText.slice(lastElementEnd, closingBracketPos),
    newText: `,\n${' '.repeat(elementIndentation / 2)}]`,
  });

  return replaces.reverse();
}

/**
 * Returns count of the characters between new line and node start.
 * If node has no indentation, function searches for the first indented parent node.
 * @param source Source file full text.
 * @param node Node indentation to find.
 */
export function getNodeIndentation(source: string, node: ts.Node): number {
  if (node == null) {
    return 0;
  }

  const textBeforeNode = source.slice(node.getFullStart(), node.getStart());
  const lastNewLineIndex = textBeforeNode.lastIndexOf('\n');

  return lastNewLineIndex === -1
    ? getNodeIndentation(source, node.parent)
    : textBeforeNode.slice(lastNewLineIndex + 1).length;
}
