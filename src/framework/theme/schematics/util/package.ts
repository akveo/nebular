/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';
import { readJSON, writeJSON } from './file';

const packageJsonName = 'package.json';

interface PackageJson {
  dependencies: { [key: string]: string },
}

export function getNebularVersion(): string {
  return require('../../package.json').version;
}

/**
 * Gets the version of the specified package by looking at the package.json in the specified tree
 * */
export function getPackageVersionFromPackageJson(tree: Tree, packageName: string): string {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (noInfoAboutDependency(packageJson, packageName)) {
    throwNoPackageInfoInPackageJson(packageName);
  }

  return packageJson.dependencies[packageName];
}

export function addPackageToPackageJson(tree: Tree, packageName: string, packageVersion: string) {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }

  if (!packageJson.dependencies[packageName]) {
    packageJson.dependencies[packageName] = packageVersion;
    packageJson.dependencies = sortObjectByKeys(packageJson.dependencies);
  }

  writeJSON(tree, packageJsonName, packageJson);
}

function throwNoPackageJsonError() {
  throw new Error('No package.json found in the tree.');
}

function throwNoPackageInfoInPackageJson(packageName: string) {
  throw new Error(`No info found in package.json for ${packageName}`);
}

/**
 * Validates packageJson has dependencies, also specified dependency exists.
 * */
function noInfoAboutDependency(packageJson: PackageJson, packageName: string): boolean {
  return !dependencyAlreadyExists(packageJson, packageName);
}

/**
 * Validates packageJson has dependencies, also specified dependency exists.
 * */
function dependencyAlreadyExists(packageJson: PackageJson, packageName: string): boolean {
  return !!(packageJson.dependencies && packageJson.dependencies[packageName]);
}

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: object) {
  return Object.keys(obj).sort().reduce((result, key) => (result[key] = obj[key]) && result, {});
}
