/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { dirname, fragment, join, normalize, Path, PathFragment, strings } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';

export const MODULES_WITH_LAYOUT_DIR = 'layout';
export const MODULES_WITHOUT_LAYOUT_DIR = 'no-layout';
export const INCLUDE_DIRS: string[] = [ MODULES_WITH_LAYOUT_DIR, MODULES_WITHOUT_LAYOUT_DIR ];
export const PLAYGROUND_PATH: Path = normalize('/src/playground/');
export const PREFIX = 'Nb';
export const FEATURE_MODULE_EXT = '.module.ts';
export const ROUTING_MODULE_EXT = '-routing.module.ts';

/**
 * Returns root playground directory.
 * Don't use it to iterate through all playground directories,
 * since some directories should be ignored. To get all allowed directories
 * use `getPlaygroundDirs` instead.
 * @param tree
 */
export function getPlaygroundRootDir(tree: Tree): DirEntry {
  return tree.getDir(PLAYGROUND_PATH);
}

/**
 * Returns DirEntries of root playground directories excluding ignored.
 * @param tree
 */
function getPlaygroundDirs(tree: Tree): DirEntry[] {
  const pgDir = getPlaygroundRootDir(tree);

  return pgDir.subdirs
    .filter((dirName: PathFragment) => INCLUDE_DIRS.includes(dirName))
    .map(path => pgDir.dir(path));
}

/**
 * Returns root modules dirs from all included dirs.
 * @param tree
 */
export function getModuleDirs(tree: Tree): DirEntry[] {
  return getPlaygroundDirs(tree)
    .reduce((dirs: DirEntry[], dir: DirEntry) => {
      return dirs.concat(dir.subdirs.map(subDir => dir.dir(subDir)));
    }, []);
}

/**
 * Returns dashed module file name.
 */
export function generateFeatureModuleFileName(moduleName: string): PathFragment {
  return fragment(strings.dasherize(moduleName) + FEATURE_MODULE_EXT);
}

/**
 * Returns dashed module file name.
 */
export function generateRoutingModuleFileName(moduleName: string): PathFragment {
  return fragment(strings.dasherize(moduleName) + ROUTING_MODULE_EXT);
}

/**
 * Returns pascal cased and prefixed module class name.
 */
export function generateFeatureModuleClassName(moduleName: string): string {
  return `${PREFIX}${strings.classify(moduleName)}Module`;
}

/**
 * Returns pascal cased and prefixed module class name.
 */
export function generateRoutingModuleClassName(dashedName: string): string {
  return `${PREFIX}${strings.classify(dashedName)}RoutingModule`;
}

export function isLayoutPath(modulePath: Path): boolean {
  return modulePath.startsWith(join(PLAYGROUND_PATH, MODULES_WITH_LAYOUT_DIR))
}

export function isService(fileName: PathFragment): boolean {
  return fileName.endsWith('.service.ts');
}

export function isDirective(fileName: PathFragment): boolean {
  return fileName.endsWith('.directive.ts');
}

export function isComponent(fileName: PathFragment): boolean {
  return fileName.endsWith('.component.ts');
}

export function isFeatureModule(fileName: PathFragment): boolean {
  return fileName.endsWith(FEATURE_MODULE_EXT) && !isRoutingModule(fileName);
}

export function isRoutingModule(fileName: PathFragment): boolean {
  return fileName.endsWith(ROUTING_MODULE_EXT);
}

export function getServicesFromDir(dir: DirEntry): Path[] {
  return dir.subfiles.filter(isService).map(fileName => join(dir.path, fileName));
}

export function getComponentsFromDir(dir: DirEntry): Path[] {
  return dir.subfiles.filter(isComponent).map(fileName => join(dir.path, fileName));
}

export function getDirectivesFromDir(dir: DirEntry): Path[] {
  return dir.subfiles.filter(isDirective).map(fileName => join(dir.path, fileName));
}

export function getFeatureModuleFromDir(dir: DirEntry): Path | null {
  const moduleFileName = dir.subfiles.find(isFeatureModule);
  return moduleFileName ? join(dir.path, moduleFileName) : null;
}

export function getRoutingModuleFromDir(dir: DirEntry): Path | null {
  const moduleFileName = dir.subfiles.find(isRoutingModule);
  return moduleFileName ? join(dir.path, moduleFileName) : null;
}

export function hasRoutingModuleInDir(dir: DirEntry): boolean {
  return dir.subfiles.some(f => f.endsWith(ROUTING_MODULE_EXT));
}

function isOutsidePlayground(path: Path): boolean {
  return !path.startsWith(PLAYGROUND_PATH);
}

export function findFeatureModule(tree: Tree, path: Path): Path | undefined {
  if (isOutsidePlayground(path)) {
    return;
  }

  const moduleFile = tree.getDir(path).subfiles.find(isFeatureModule);
  return moduleFile ? join(path, moduleFile) : findFeatureModule(tree, dirname(path));
}

export function findRoutingModule(tree: Tree, path: Path): Path | undefined {
  if (isOutsidePlayground(path)) {
    return;
  }

  const moduleFile = tree.getDir(path).subfiles.find(isRoutingModule);
  return moduleFile ? join(path, moduleFile) : findRoutingModule(tree, dirname(path));
}
