"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const utils_1 = require("../utils");
const COMPONENTS_LIST_FILE_PATH = core_1.normalize('/src/app/playground-components.ts');
const COMPONENTS_VARIABLE_NAME = 'PLAYGROUND_COMPONENTS';
function playgroundComponents() {
    return generateComponentsList;
}
exports.playgroundComponents = playgroundComponents;
function generateComponentsList(tree) {
    const componentsListFile = schematics_2.getSourceFile(tree, COMPONENTS_LIST_FILE_PATH);
    const componentsListArray = getComponentsListArray(componentsListFile);
    const routes = removeRoutesWithoutPath(findRoutesInDir(tree, utils_1.getPlaygroundRootDir(tree)));
    updateComponentsFile(tree, componentsListFile, componentsListArray, routes);
}
function getComponentsListArray(fileSource) {
    const listDeclaration = utils_1.findDeclarationByIdentifier(fileSource, COMPONENTS_VARIABLE_NAME);
    if (!listDeclaration) {
        throw new schematics_1.SchematicsException(`Error in ${COMPONENTS_LIST_FILE_PATH}. Can't find components list variable.`);
    }
    const initializer = listDeclaration.initializer;
    if (!initializer || initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
        throw new schematics_1.SchematicsException(`Error in ${COMPONENTS_LIST_FILE_PATH}. List should be initialized with array.`);
    }
    return initializer;
}
function findRoutesInDir(tree, dir) {
    const routingModuleFile = dir.subfiles.find(utils_1.isRoutingModule);
    if (routingModuleFile) {
        const routingModulePath = core_1.join(dir.path, routingModuleFile);
        const routes = utils_1.getRoutesFromArray(utils_1.findRoutesArray(tree, routingModulePath));
        return parseRoutes(tree, dir, routes);
    }
    return [];
}
function parseRoutes(tree, dir, routeEntries) {
    const foundRoutes = [];
    const routesWithPath = routeEntries
        .filter(r => r.properties.length > 0)
        .filter(r => !!utils_1.getRoutePath(r))
        .filter(r => utils_1.isLazyRoute(r) || utils_1.isComponentRoute(r));
    for (const route of routesWithPath) {
        const component = getComponentRoute(route);
        const routeChildren = getChildRoutes(tree, dir, route);
        const lazyChildren = getLazyModuleRoutes(tree, dir, route);
        const children = routeChildren.concat(lazyChildren);
        const routePath = utils_1.trimQuotes(utils_1.getRoutePath(route).initializer.getText());
        foundRoutes.push({ path: routePath, component, children });
    }
    return foundRoutes;
}
function getComponentRoute(route) {
    const componentProp = utils_1.getRouteComponent(route);
    if (componentProp) {
        return componentProp.initializer.getText();
    }
}
function getChildRoutes(tree, routingModuleDir, route) {
    const childrenProp = utils_1.getRouteChildren(route);
    if (childrenProp) {
        return parseRoutes(tree, routingModuleDir, utils_1.getRoutesFromArray(childrenProp));
    }
    return [];
}
function getLazyModuleRoutes(tree, routingModuleDir, route) {
    const lazyModule = utils_1.getRouteLazyModule(route);
    if (lazyModule) {
        const lazyModulePath = lazyModule && utils_1.trimQuotes(lazyModule.initializer.getText());
        const moduleDirPath = core_1.dirname(utils_1.lazyRoutePathToFilePath(lazyModulePath));
        return findRoutesInDir(tree, routingModuleDir.dir(moduleDirPath));
    }
    return [];
}
function removeRoutesWithoutPath(routes, startPath = '') {
    const routesWithPath = [];
    for (const { path, component, children } of routes) {
        const fullPath = path ? startPath + '/' + path : startPath;
        let routeChildren;
        if (children) {
            routeChildren = removeRoutesWithoutPath(children, fullPath);
        }
        const toAdd = [];
        if (path) {
            const link = component ? fullPath : undefined;
            const name = component ? utils_1.splitClassName(component) : undefined;
            const childRoutes = routeChildren && routeChildren.length ? routeChildren : undefined;
            toAdd.push({ path, link, component, name, children: childRoutes });
        }
        else if (routeChildren) {
            toAdd.push(...routeChildren);
        }
        routesWithPath.push(...toAdd);
    }
    return routesWithPath;
}
function updateComponentsFile(tree, componentsListFile, list, routes) {
    const pos = list.getFullStart();
    const endPos = pos + list.getFullText().length;
    const oldText = componentsListFile.getFullText().slice(pos, endPos);
    const newText = generateRoutesString(routes);
    utils_1.applyReplaceChange(tree, COMPONENTS_LIST_FILE_PATH, { pos, oldText, newText });
}
function generateRoutesString(routes) {
    const jsonRoutes = JSON.stringify(routes, null, 2);
    return ` ${utils_1.addTrailingCommas(utils_1.removePropsQuotes(utils_1.singleQuotes(jsonRoutes)))}`;
}
//# sourceMappingURL=index.js.map