/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';
export declare const PREFIX = "";
export declare const FEATURE_MODULE_EXT = ".module.ts";
export declare const ROUTING_MODULE_EXT = "-routing.module.ts";
export declare const PLAYGROUND_PATH: Path;
export declare const PLAYGROUND_ROUTING_MODULE_PATH: Path;
export declare const LAYOUT_DIR_NAME = "with-layout";
export declare const LAYOUT_DIR_PATH: Path;
export declare const LAYOUT_MODULE_PATH: Path;
export declare const LAYOUT_ROUTING_MODULE_PATH: Path;
export declare const LAYOUT_MODULE_CLASS = "WithLayoutModule";
export declare const LAYOUT_COMPONENT_CLASS = "PlaygroundLayoutComponent";
export declare const NO_LAYOUT_DIR_NAME = "without-layout";
export declare const NO_LAYOUT_DIR_PATH: Path;
export declare const NO_LAYOUT_MODULE_PATH: Path;
export declare const NO_LAYOUT_ROUTING_MODULE_PATH: Path;
export declare const NO_LAYOUT_MODULE_CLASS = "WithoutLayoutModule";
export declare const NO_LAYOUT_COMPONENT_CLASS = "PlaygroundBaseComponent";
export declare const INCLUDE_DIRS: string[];
/**
 * Returns root playground directory.
 * Don't use it to iterate through all playground directories,
 * since some directories should be ignored. To get all allowed directories
 * use `getPlaygroundDirs` instead.
 * @param tree
 */
export declare function getPlaygroundRootDir(tree: Tree): DirEntry;
/**
 * Returns DirEntries of root playground directories excluding ignored.
 * @param tree
 */
export declare function getPlaygroundDirs(tree: Tree): DirEntry[];
/**
 * Returns root modules dirs from all included dirs.
 * @param tree
 */
export declare function getModuleDirs(tree: Tree): DirEntry[];
export declare function isRootPlaygroundModule(moduleDir: Path): boolean;
export declare function isBasePlaygroundModule(moduleDir: Path): boolean;
/**
 * Returns dashed module file name.
 */
export declare function generateFeatureModuleFileName(moduleName: string): PathFragment;
/**
 * Returns dashed module file name.
 */
export declare function generateRoutingModuleFileName(moduleName: string): PathFragment;
/**
 * Returns pascal cased module class name.
 */
export declare function generateFeatureModuleClassName(moduleName: string): string;
/**
 * Returns pascal cased module class name.
 */
export declare function generateRoutingModuleClassName(dashedName: string): string;
export declare function isLayoutPath(modulePath: Path): boolean;
export declare function isService(fileName: PathFragment): boolean;
export declare function isDirective(fileName: PathFragment): boolean;
export declare function isComponent(fileName: PathFragment): boolean;
export declare function isFeatureModule(fileName: PathFragment): boolean;
export declare function isRoutingModule(fileName: PathFragment): boolean;
export declare function getServicesFromDir(dir: DirEntry): Path[];
export declare function getComponentsFromDir(dir: DirEntry): Path[];
export declare function getDirectivesFromDir(dir: DirEntry): Path[];
export declare function getFeatureModuleFromDir(dir: DirEntry): Path | null;
export declare function getRoutingModuleFromDir(dir: DirEntry): Path | null;
export declare function hasFeatureModuleInDir(dir: DirEntry): boolean;
export declare function hasRoutingModuleInDir(dir: DirEntry): boolean;
export declare function hasComponentsInDir(dir: DirEntry): boolean;
export declare function findFeatureModule(tree: Tree, path: Path): Path | undefined;
export declare function findRoutingModule(tree: Tree, path: Path): Path | undefined;
export declare function isInPlaygroundRoot(filePath: Path): boolean;
