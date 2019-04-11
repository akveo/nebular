/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { dirname, fragment, join, normalize, Path, PathFragment, strings } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';

export const PREFIX = '';
export const FEATURE_MODULE_EXT = '.module.ts';
export const ROUTING_MODULE_EXT = '-routing.module.ts';
export const PLAYGROUND_PATH: Path = normalize('/src/playground/');
export const PLAYGROUND_ROUTING_MODULE_PATH: Path = join(PLAYGROUND_PATH, `playground${ROUTING_MODULE_EXT}`);

export const LAYOUT_DIR_NAME = 'with-layout';
export const LAYOUT_DIR_PATH = join(PLAYGROUND_PATH, LAYOUT_DIR_NAME);
export const LAYOUT_MODULE_PATH = join(LAYOUT_DIR_PATH, `${LAYOUT_DIR_NAME}${FEATURE_MODULE_EXT}`);
export const LAYOUT_ROUTING_MODULE_PATH = join(LAYOUT_DIR_PATH, `${LAYOUT_DIR_NAME}${ROUTING_MODULE_EXT}`);
export const LAYOUT_MODULE_CLASS = 'WithLayoutModule';
export const LAYOUT_COMPONENT_CLASS = 'PlaygroundLayoutComponent';

export const NO_LAYOUT_DIR_NAME = 'without-layout';
export const NO_LAYOUT_DIR_PATH = join(PLAYGROUND_PATH, NO_LAYOUT_DIR_NAME);
export const NO_LAYOUT_MODULE_PATH = join(NO_LAYOUT_DIR_PATH, `${NO_LAYOUT_DIR_NAME}${FEATURE_MODULE_EXT}`);
export const NO_LAYOUT_ROUTING_MODULE_PATH = join(NO_LAYOUT_DIR_PATH, `${NO_LAYOUT_DIR_NAME}${ROUTING_MODULE_EXT}`);
export const NO_LAYOUT_MODULE_CLASS = 'WithoutLayoutModule';
export const NO_LAYOUT_COMPONENT_CLASS = 'PlaygroundBaseComponent';

export const INCLUDE_DIRS: string[] = [ LAYOUT_DIR_PATH, NO_LAYOUT_DIR_PATH ];

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
export function getPlaygroundDirs(tree: Tree): DirEntry[] {
  const pgDir = getPlaygroundRootDir(tree);

  return pgDir.subdirs
    .filter((dirName: PathFragment) => INCLUDE_DIRS.includes(join(pgDir.path, dirName)))
    .map(path => pgDir.dir(path));
}

/**
 * Returns root modules dirs from all included dirs.
 * @param tree
 */
export function getModuleDirs(tree: Tree): DirEntry[] {
  const baseDirs = getPlaygroundDirs(tree);
  const baseDirectChildren = baseDirs.reduce((dirs: DirEntry[], dir: DirEntry) => {
    return dirs.concat(dir.subdirs.map(subDir => dir.dir(subDir)));
  }, []);
  return baseDirs.concat(baseDirectChildren);
}

export function isRootPlaygroundModule(moduleDir: Path): boolean {
  return moduleDir === PLAYGROUND_PATH;
}

export function isBasePlaygroundModule(moduleDir: Path): boolean {
  return moduleDir === LAYOUT_DIR_PATH || moduleDir === NO_LAYOUT_DIR_PATH;
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
 * Returns pascal cased module class name.
 */
export function generateFeatureModuleClassName(moduleName: string): string {
  return `${PREFIX}${strings.classify(moduleName)}Module`;
}

/**
 * Returns pascal cased module class name.
 */
export function generateRoutingModuleClassName(dashedName: string): string {
  return `${PREFIX}${strings.classify(dashedName)}RoutingModule`;
}

export function isLayoutPath(modulePath: Path): boolean {
  return modulePath.startsWith(LAYOUT_DIR_PATH);
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

export function hasFeatureModuleInDir(dir: DirEntry): boolean {
  return dir.subfiles.some(isFeatureModule);
}

export function hasRoutingModuleInDir(dir: DirEntry): boolean {
  return dir.subfiles.some(isRoutingModule);
}

export function hasComponentsInDir(dir: DirEntry): boolean {
  return dir.subfiles.some(isComponent);
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

export function isInPlaygroundRoot(filePath: Path): boolean {
  return dirname(filePath) === PLAYGROUND_PATH;
}
