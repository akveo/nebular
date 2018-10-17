/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: any) {
  return Object.keys(obj).sort().reduce((result: any, key: any) => (result[key] = obj[key]) && result, {});
}

/** Adds a package to the package.json in the given host tree. */
export function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree {

  if (host.exists('package.json')) {
    const json = readFile(host, 'package.json');

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

/** Gets the version of the specified package by looking at the package.json in the given tree. */
export function getPackageVersionFromPackageJson(tree: Tree, name: string): string {
  const packageJson = readFile(tree, 'package.json');

  if (!packageJson.dependencies || !packageJson.dependencies[name]) {
    throw new Error(`Dependency ${name} not found`);
  }

  return packageJson.dependencies[name];
}

function readFile(tree: Tree, file: string): any {
  return JSON.parse((<Buffer> tree.read(file)).toString('utf8'));
}
