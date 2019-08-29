/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Tree } from '@angular-devkit/schematics';
import { readJSON, writeJSON } from './file';

const packageJsonName = 'package.json';

interface PackageJson {
  version: string;
  dependencies: { [key: string]: string },
  devDependencies: { [key: string]: string },
  peerDependencies: { [key: string]: string },
}

export function getNebularVersion(): string {
  return getNebularPackageJson().version;
}

/**
 * Gets the version of the specified Nebular peerDependency
 * */
export function getNebularPeerDependencyVersionFromPackageJson(packageName: string): string {
  const packageJson: PackageJson = getNebularPackageJson();

  if (noInfoAboutPeerDependency(packageJson, packageName)) {
    throwNoPackageInfoInPackageJson(packageName);
  }

  return packageJson.peerDependencies[packageName];
}

/**
 * Eva Icons version
 * */
export function getEvaIconsVersion(): string {
  const packageJson: PackageJson = getNebularEvaIconsPackageJson();
  const packageName = 'eva-icons';

  if (noInfoAboutPeerDependency(packageJson, packageName)) {
    throwNoPackageInfoInPackageJson(packageName);
  }

  return packageJson.peerDependencies[packageName];
}

/**
 * Gets the version of the specified dependency by looking at the package.json in the specified tree
 * */
export function getDependencyVersionFromPackageJson(tree: Tree, packageName: string): string {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (noInfoAboutDependency(packageJson, packageName)) {
    throwNoPackageInfoInPackageJson(packageName);
  }

  return packageJson.dependencies[packageName];
}

export function addDependencyToPackageJson(tree: Tree, packageName: string, packageVersion: string, force = false) {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }

  if (!packageJson.dependencies[packageName] || force) {
    packageJson.dependencies[packageName] = packageVersion;
    packageJson.dependencies = sortObjectByKeys(packageJson.dependencies);
  }

  writeJSON(tree, packageJsonName, packageJson);
}

/**
 * Gets the version of the specified dev dependency by looking at the package.json in the specified tree
 * */
export function getDevDependencyVersionFromPackageJson(tree: Tree, packageName: string): string {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (noInfoAboutDevDependency(packageJson, packageName)) {
    throwNoPackageInfoInPackageJson(packageName);
  }

  return packageJson.devDependencies[packageName];
}

export function addDevDependencyToPackageJson(tree: Tree, packageName: string, packageVersion: string) {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }

  if (!packageJson.devDependencies[packageName]) {
    packageJson.devDependencies[packageName] = packageVersion;
    packageJson.devDependencies = sortObjectByKeys(packageJson.devDependencies);
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
 * Validates packageJson has dependencies, also as specified dependency not exists.
 * */
function noInfoAboutDependency(packageJson: PackageJson, packageName: string): boolean {
  return !dependencyAlreadyExists(packageJson, packageName);
}

/**
 * Validates packageJson has devDependencies, also as specified devDependency not exists.
 * */
function noInfoAboutDevDependency(packageJson: PackageJson, packageName: string): boolean {
  return !devDependencyAlreadyExists(packageJson, packageName);
}

/**
 * Validates packageJson has peerDependencies, also as specified peerDependency not exists.
 * */
function noInfoAboutPeerDependency(packageJson: PackageJson, packageName: string): boolean {
  return !peerDependencyAlreadyExists(packageJson, packageName);
}

/**
 * Validates packageJson has dependencies, also as specified dependency exists.
 * */
function dependencyAlreadyExists(packageJson: PackageJson, packageName: string): boolean {
  return !!(packageJson.dependencies && packageJson.dependencies[packageName]);
}

/**
 * Validates packageJson has devDependencies, also as specified devDependency exists.
 * */
function devDependencyAlreadyExists(packageJson: PackageJson, packageName: string): boolean {
  return !!(packageJson.devDependencies && packageJson.devDependencies[packageName]);
}

/**
 * Validates packageJson has peerDependencies, also as specified peerDependency exists.
 * */
function peerDependencyAlreadyExists(packageJson: PackageJson, packageName: string): boolean {
  return !!(packageJson.peerDependencies && packageJson.peerDependencies[packageName]);
}

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: object) {
  return Object.keys(obj).sort().reduce((result, key) => (result[key] = obj[key]) && result, {});
}

function getNebularPackageJson(): PackageJson {
  return require('../../package.json');
}

function getNebularEvaIconsPackageJson(): PackageJson {
  return require('../../../eva-icons/package.json');
}


