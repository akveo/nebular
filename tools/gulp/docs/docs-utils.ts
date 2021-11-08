/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export function flatten(root, arr) {
  let res: any[] = [];
  arr.forEach((item: any) => {
    const path = `${root}/${item.path}`;
    res.push(path);
    if (item.children) {
      res = res.concat(flatten(path, item.children));
    }
  });

  return res;
}

export function flattenLeafs(root, arr) {
  let res: any[] = [];
  arr.forEach((item: any) => {
    const path = `${root}/${item.path}`;
    if (!item.children || item.children.length === 0) {
      res.push(path);
    }
    if (item.children) {
      res = res.concat(flatten(path, item.children));
    }
  });

  return res;
}

export function routesTree(structure) {
  return structure
    .filter((page: any) => ['section', 'page', 'tabs'].includes(page.type))
    .map((page: any) => {
      if (page.type === 'tabs') {
        page.children = ['overview', 'api', 'theme', 'examples'].map((name) => ({ name, type: 'page' }));
      }
      return page;
    })
    .map((page: any) => {
      return {
        path: prepareSlag(page.name),
        children: page.children ? routesTree(page.children) : [],
      };
    });
}

function prepareSlag(name) {
  return name
    .replace(/[^a-zA-Z0-9\s]+/g, '')
    .replace(/\s/g, '-')
    .toLowerCase();
}
