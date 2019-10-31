/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export function convertToBoolProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();

    return (val === 'true' || val === '');
  }

  return !!val;
}

export function getElementHeight(el) {
  /**
   *
   * TODO: Move helpers in separate common module.
   * TODO: Provide window through di token.
   * */
  const style = window.getComputedStyle(el);
  const marginTop = parseInt(style.getPropertyValue('margin-top'), 10);
  const marginBottom = parseInt(style.getPropertyValue('margin-bottom'), 10);
  return el.offsetHeight + marginTop + marginBottom;
}

export function firstChildNotComment(node: Node) {
  const children = Array
    .from(node.childNodes)
    .filter((child: Node) => child.nodeType !== Node.COMMENT_NODE);
  return children[0];
}

export function lastChildNotComment(node: Node) {
  const children = Array
    .from(node.childNodes)
    .filter((child: Node) => child.nodeType !== Node.COMMENT_NODE);
  return children[children.length - 1];
}

/*
 * @breaking-change Remove @5.0.0
 */
export function emptyStatusWarning(source: string) {
  console.warn(`${source}: Using empty string as a status is deprecated. Use \`basic\` instead.`);
}
