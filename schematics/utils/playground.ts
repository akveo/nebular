/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { dirname, fragment, join, normalize, Path, PathFragment, strings } from '@angular-devkit/core';
import { DirEntry, SchematicsException, Tree } from '@angular-devkit/schematics';

export const MODULES_WITH_LAYOUT_DIR = 'layout';
export const MODULES_WITHOUT_LAYOUT_DIR = 'no-layout';
export const INCLUDE_DIRS: string[] = [ MODULES_WITH_LAYOUT_DIR, MODULES_WITHOUT_LAYOUT_DIR ];
export const PLAYGROUND_PATH: Path = normalize('/src/playground/');
export const PREFIX = 'Nb';
export const FEATURE_MODULE_EXT = '.module.ts';
export const ROUTING_MODULE_EXT = '-routing.module.ts';
export const COMPONENT_FILE_POSTFIX = '.component.ts';

export type FileNamePredicate = (fileName: PathFragment) => boolean;

/**
 * Returns root playground directory.
 * Don't use it to iterate through all playground directories,
 * since some directories should be ignored. To get all allowed directories
 * use `getPlaygroundDirs` instead.
 * @param tree
 */
function getPlaygroundRootDir(tree: Tree): DirEntry {
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
 * Returns all playground components paths (deep).
 */
export function getComponentsPaths(tree: Tree): Path[] {
  return findPlaygroundFilesByPredicate(tree, f => f.endsWith(COMPONENT_FILE_POSTFIX));
}

/**
 * Searches in all playground included subdirectories
 * @param tree
 * @param predicate predicate to apply on playground files
 */
function findPlaygroundFilesByPredicate(tree: Tree, predicate: FileNamePredicate): Path[] {
  return getModuleDirs(tree)
    .reduce((paths: Path[], dir: DirEntry) => paths.concat(findInDirAndDown(dir, predicate)), []);
}

/**
 * Applies predicate on all files in a given directory and its sub directories
 * @param dir
 * @param predicate
 */
function findInDirAndDown(dir: DirEntry, predicate: FileNamePredicate): Path[] {
  const paths = dir.subfiles.filter(predicate).map(fileName => join(dir.path, fileName));

  for (const subDir of dir.subdirs) {
    paths.push(...findInDirAndDown(dir.dir(subDir), predicate));
  }

  return paths;
}

/**
 * Returns playground routing module path.
 */
export function getPlaygroundRoutingModule(): Path {
  return join(PLAYGROUND_PATH, 'playground' + ROUTING_MODULE_EXT);
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

export function findComponentFeatureModule(tree: Tree, dirPath: Path): Path {
  const module = findInDirOrParentDir(tree.getDir(dirPath), file => file.endsWith(FEATURE_MODULE_EXT));
  if (module == null) {
    throw new SchematicsException(`Can't find feature module in ${dirPath} and parent dirs.`);
  }

  return module;
}

export function findComponentRoutingModule(tree: Tree, dirPath: Path): Path {
  const module = findInDirOrParentDir(tree.getDir(dirPath), file => file.endsWith(ROUTING_MODULE_EXT));
  if (module == null) {
    throw new SchematicsException(`Can't find routing module in ${dirPath} and parent dirs.`);
  }
  return module;
}

function findInDirOrParentDir(dir: DirEntry, predicate: FileNamePredicate): Path | null {
  if (isPlaygroundRoot(dir)) {
    return null;
  }

  const moduleFile = dir.subfiles.find(predicate);
  return moduleFile
    ? join(dir.path, moduleFile)
    : findInDirOrParentDir(dir.parent as DirEntry, predicate);
}

function isPlaygroundRoot(dir: DirEntry): boolean {
  return dir.path === PLAYGROUND_PATH;
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

export function getRoutingModulesFromDir(dir: DirEntry): Path | null {
  const moduleFileName = dir.subfiles.find(isRoutingModule);
  return moduleFileName ? join(dir.path, moduleFileName) : null;
}

export function hasRoutingModuleInDir(dir: DirEntry): boolean {
  return dir.subfiles.some(f => f.endsWith(ROUTING_MODULE_EXT));
}

export function findRoutingModule(tree: Tree, path: Path): Path | undefined {
  const moduleFile = tree.getDir(path).subfiles
    .find(fileName => fileName.endsWith(ROUTING_MODULE_EXT));
  if (moduleFile) {
    return join(path, moduleFile);
  }

  return path === getPlaygroundRootDir(tree).path
    ? undefined
    : findRoutingModule(tree, dirname(path));
}
