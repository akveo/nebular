/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as ts from 'typescript';

export interface TextReplace {
  pos: number;
  oldText: string;
  newText: string;
}

export function multilineArrayLiteral(
  fullText: string,
  arrayLiteralNode: ts.ArrayLiteralExpression,
  elementIndentation: number,
): TextReplace[] {
  const replaces: TextReplace[] = [];

  arrayLiteralNode.elements.forEach(el => {
    const start = el.getFullStart();
    const end = el.getStart();
    const oldText = fullText.slice(start, end);
    replaces.push({ pos: start, oldText, newText: `\n${' '.repeat(elementIndentation)}` });
  });

  const lastElement = arrayLiteralNode.elements[arrayLiteralNode.elements.length - 1];
  const lastElementEnd = lastElement.getFullStart() + lastElement.getFullWidth();
  const closingBracketEnd = arrayLiteralNode.getFullStart() + arrayLiteralNode.getFullWidth();
  replaces.push({
    pos: lastElementEnd,
    oldText: fullText.slice(lastElementEnd, closingBracketEnd),
    newText: `,\n${' '.repeat(elementIndentation / 2)}]`,
  });

  return replaces.reverse();
}
