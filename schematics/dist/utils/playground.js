"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
exports.PREFIX = '';
exports.FEATURE_MODULE_EXT = '.module.ts';
exports.ROUTING_MODULE_EXT = '-routing.module.ts';
exports.PLAYGROUND_PATH = core_1.normalize('/src/playground/');
exports.PLAYGROUND_ROUTING_MODULE_PATH = core_1.join(exports.PLAYGROUND_PATH, `playground${exports.ROUTING_MODULE_EXT}`);
exports.LAYOUT_DIR_NAME = 'with-layout';
exports.LAYOUT_DIR_PATH = core_1.join(exports.PLAYGROUND_PATH, exports.LAYOUT_DIR_NAME);
exports.LAYOUT_MODULE_PATH = core_1.join(exports.LAYOUT_DIR_PATH, `${exports.LAYOUT_DIR_NAME}${exports.FEATURE_MODULE_EXT}`);
exports.LAYOUT_ROUTING_MODULE_PATH = core_1.join(exports.LAYOUT_DIR_PATH, `${exports.LAYOUT_DIR_NAME}${exports.ROUTING_MODULE_EXT}`);
exports.LAYOUT_MODULE_CLASS = 'WithLayoutModule';
exports.LAYOUT_COMPONENT_CLASS = 'PlaygroundLayoutComponent';
exports.NO_LAYOUT_DIR_NAME = 'without-layout';
exports.NO_LAYOUT_DIR_PATH = core_1.join(exports.PLAYGROUND_PATH, exports.NO_LAYOUT_DIR_NAME);
exports.NO_LAYOUT_MODULE_PATH = core_1.join(exports.NO_LAYOUT_DIR_PATH, `${exports.NO_LAYOUT_DIR_NAME}${exports.FEATURE_MODULE_EXT}`);
exports.NO_LAYOUT_ROUTING_MODULE_PATH = core_1.join(exports.NO_LAYOUT_DIR_PATH, `${exports.NO_LAYOUT_DIR_NAME}${exports.ROUTING_MODULE_EXT}`);
exports.NO_LAYOUT_MODULE_CLASS = 'WithoutLayoutModule';
exports.NO_LAYOUT_COMPONENT_CLASS = 'PlaygroundBaseComponent';
exports.INCLUDE_DIRS = [exports.LAYOUT_DIR_PATH, exports.NO_LAYOUT_DIR_PATH];
/**
 * Returns root playground directory.
 * Don't use it to iterate through all playground directories,
 * since some directories should be ignored. To get all allowed directories
 * use `getPlaygroundDirs` instead.
 * @param tree
 */
function getPlaygroundRootDir(tree) {
    return tree.getDir(exports.PLAYGROUND_PATH);
}
exports.getPlaygroundRootDir = getPlaygroundRootDir;
/**
 * Returns DirEntries of root playground directories excluding ignored.
 * @param tree
 */
function getPlaygroundDirs(tree) {
    const pgDir = getPlaygroundRootDir(tree);
    return pgDir.subdirs
        .filter((dirName) => exports.INCLUDE_DIRS.includes(core_1.join(pgDir.path, dirName)))
        .map(path => pgDir.dir(path));
}
exports.getPlaygroundDirs = getPlaygroundDirs;
/**
 * Returns root modules dirs from all included dirs.
 * @param tree
 */
function getModuleDirs(tree) {
    const baseDirs = getPlaygroundDirs(tree);
    const baseDirectChildren = baseDirs.reduce((dirs, dir) => {
        return dirs.concat(dir.subdirs.map(subDir => dir.dir(subDir)));
    }, []);
    return baseDirs.concat(baseDirectChildren);
}
exports.getModuleDirs = getModuleDirs;
function isRootPlaygroundModule(moduleDir) {
    return moduleDir === exports.PLAYGROUND_PATH;
}
exports.isRootPlaygroundModule = isRootPlaygroundModule;
function isBasePlaygroundModule(moduleDir) {
    return moduleDir === exports.LAYOUT_DIR_PATH || moduleDir === exports.NO_LAYOUT_DIR_PATH;
}
exports.isBasePlaygroundModule = isBasePlaygroundModule;
/**
 * Returns dashed module file name.
 */
function generateFeatureModuleFileName(moduleName) {
    return core_1.fragment(core_1.strings.dasherize(moduleName) + exports.FEATURE_MODULE_EXT);
}
exports.generateFeatureModuleFileName = generateFeatureModuleFileName;
/**
 * Returns dashed module file name.
 */
function generateRoutingModuleFileName(moduleName) {
    return core_1.fragment(core_1.strings.dasherize(moduleName) + exports.ROUTING_MODULE_EXT);
}
exports.generateRoutingModuleFileName = generateRoutingModuleFileName;
/**
 * Returns pascal cased module class name.
 */
function generateFeatureModuleClassName(moduleName) {
    return `${exports.PREFIX}${core_1.strings.classify(moduleName)}Module`;
}
exports.generateFeatureModuleClassName = generateFeatureModuleClassName;
/**
 * Returns pascal cased module class name.
 */
function generateRoutingModuleClassName(dashedName) {
    return `${exports.PREFIX}${core_1.strings.classify(dashedName)}RoutingModule`;
}
exports.generateRoutingModuleClassName = generateRoutingModuleClassName;
function isLayoutPath(modulePath) {
    return modulePath.startsWith(exports.LAYOUT_DIR_PATH);
}
exports.isLayoutPath = isLayoutPath;
function isService(fileName) {
    return fileName.endsWith('.service.ts');
}
exports.isService = isService;
function isDirective(fileName) {
    return fileName.endsWith('.directive.ts');
}
exports.isDirective = isDirective;
function isComponent(fileName) {
    return fileName.endsWith('.component.ts');
}
exports.isComponent = isComponent;
function isFeatureModule(fileName) {
    return fileName.endsWith(exports.FEATURE_MODULE_EXT) && !isRoutingModule(fileName);
}
exports.isFeatureModule = isFeatureModule;
function isRoutingModule(fileName) {
    return fileName.endsWith(exports.ROUTING_MODULE_EXT);
}
exports.isRoutingModule = isRoutingModule;
function getServicesFromDir(dir) {
    return dir.subfiles.filter(isService).map(fileName => core_1.join(dir.path, fileName));
}
exports.getServicesFromDir = getServicesFromDir;
function getComponentsFromDir(dir) {
    return dir.subfiles.filter(isComponent).map(fileName => core_1.join(dir.path, fileName));
}
exports.getComponentsFromDir = getComponentsFromDir;
function getDirectivesFromDir(dir) {
    return dir.subfiles.filter(isDirective).map(fileName => core_1.join(dir.path, fileName));
}
exports.getDirectivesFromDir = getDirectivesFromDir;
function getFeatureModuleFromDir(dir) {
    const moduleFileName = dir.subfiles.find(isFeatureModule);
    return moduleFileName ? core_1.join(dir.path, moduleFileName) : null;
}
exports.getFeatureModuleFromDir = getFeatureModuleFromDir;
function getRoutingModuleFromDir(dir) {
    const moduleFileName = dir.subfiles.find(isRoutingModule);
    return moduleFileName ? core_1.join(dir.path, moduleFileName) : null;
}
exports.getRoutingModuleFromDir = getRoutingModuleFromDir;
function hasFeatureModuleInDir(dir) {
    return dir.subfiles.some(isFeatureModule);
}
exports.hasFeatureModuleInDir = hasFeatureModuleInDir;
function hasRoutingModuleInDir(dir) {
    return dir.subfiles.some(isRoutingModule);
}
exports.hasRoutingModuleInDir = hasRoutingModuleInDir;
function hasComponentsInDir(dir) {
    return dir.subfiles.some(isComponent);
}
exports.hasComponentsInDir = hasComponentsInDir;
function isOutsidePlayground(path) {
    return !path.startsWith(exports.PLAYGROUND_PATH);
}
function findFeatureModule(tree, path) {
    if (isOutsidePlayground(path)) {
        return;
    }
    const moduleFile = tree.getDir(path).subfiles.find(isFeatureModule);
    return moduleFile ? core_1.join(path, moduleFile) : findFeatureModule(tree, core_1.dirname(path));
}
exports.findFeatureModule = findFeatureModule;
function findRoutingModule(tree, path) {
    if (isOutsidePlayground(path)) {
        return;
    }
    const moduleFile = tree.getDir(path).subfiles.find(isRoutingModule);
    return moduleFile ? core_1.join(path, moduleFile) : findRoutingModule(tree, core_1.dirname(path));
}
exports.findRoutingModule = findRoutingModule;
function isInPlaygroundRoot(filePath) {
    return core_1.dirname(filePath) === exports.PLAYGROUND_PATH;
}
exports.isInPlaygroundRoot = isInPlaygroundRoot;
//# sourceMappingURL=playground.js.map