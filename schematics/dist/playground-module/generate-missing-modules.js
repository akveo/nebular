"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../utils");
function generateMissingModules(tree) {
    const moduleDirs = [utils_1.getPlaygroundRootDir(tree), ...utils_1.getModuleDirs(tree)];
    const moduleRules = moduleDirs.map(moduleDir => dirRule(tree, moduleDir));
    return schematics_1.chain(moduleRules);
}
exports.generateMissingModules = generateMissingModules;
function dirRule(tree, moduleDir) {
    return fromTemplate(tree, optionsFromDir(moduleDir));
}
function fromTemplate(tree, options) {
    const transformedSource = schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.template(options),
        schematics_1.filter((filePath) => shouldCreateModule(tree, filePath)),
    ]);
    return schematics_1.mergeWith(transformedSource);
}
function shouldCreateModule(tree, filePath) {
    const dir = tree.getDir(core_1.normalize(core_1.dirname(filePath)));
    const fileName = core_1.basename(filePath);
    const isModuleExist = utils_1.isFeatureModule(fileName)
        ? utils_1.hasFeatureModuleInDir(dir)
        : utils_1.hasRoutingModuleInDir(dir);
    if (isModuleExist) {
        return false;
    }
    return utils_1.isFeatureModule(fileName) || utils_1.hasComponentsInDir(dir);
}
function optionsFromDir(moduleDir) {
    const moduleName = core_1.basename(moduleDir.path);
    const routingModuleFileName = utils_1.generateRoutingModuleFileName(moduleName);
    return {
        path: moduleDir.path,
        featureModuleFileName: utils_1.generateFeatureModuleFileName(moduleName),
        featureModuleClassName: utils_1.generateFeatureModuleClassName(moduleName),
        routingModuleFileName,
        routingModuleClassName: utils_1.generateRoutingModuleClassName(moduleName),
        routingModuleImportPath: utils_1.generateCurrentDirImport(routingModuleFileName),
    };
}
//# sourceMappingURL=generate-missing-modules.js.map