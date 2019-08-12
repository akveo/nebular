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
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const utils_1 = require("../utils");
function findRoutesArray(tree, modulePath) {
    const source = schematics_2.getSourceFile(tree, modulePath);
    const decoratorNode = ast_utils_1.getDecoratorMetadata(source, 'NgModule', '@angular/core')[0];
    if (decoratorNode == null) {
        throw new schematics_1.SchematicsException(`Error in ${modulePath}. Can't find NgModule decorator.`);
    }
    try {
        const imports = getImports(decoratorNode);
        const routerModuleCall = getRouterModuleCall(imports);
        const routesArgument = routerModuleCall.arguments[0];
        if (routesArgument.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            return routesArgument;
        }
        if (routesArgument.kind === ts.SyntaxKind.Identifier) {
            const declaration = getRoutesVariableDeclaration(source, routesArgument);
            return declaration.initializer;
        }
        throw new schematics_1.SchematicsException(`Expecting RouterModule.forChild parameter to be an array or variable identifier.`);
    }
    catch (e) {
        throw new schematics_1.SchematicsException(`Error in ${modulePath}. ${e.message}`);
    }
}
exports.findRoutesArray = findRoutesArray;
function getImports(moduleDecorator) {
    const imports = moduleDecorator.properties
        .filter(p => p.kind === ts.SyntaxKind.PropertyAssignment)
        .find((p) => p.name.getText() === 'imports');
    if (imports == null) {
        throw new schematics_1.SchematicsException(`Can't find imports in module.`);
    }
    if (imports.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
        throw new schematics_1.SchematicsException(`'imports' property should be initialized with array.`);
    }
    return imports;
}
function getRouterModuleCall(importsNode) {
    const routerModuleCall = importsNode.initializer
        .elements
        .filter(el => el.kind === ts.SyntaxKind.CallExpression)
        .find((el) => el.expression.getText() === 'RouterModule.forChild');
    if (routerModuleCall == null) {
        throw new schematics_1.SchematicsException(`Can't find RouterModule.forChild call in module imports.`);
    }
    if (routerModuleCall.arguments.length === 0) {
        throw new schematics_1.SchematicsException(`RouterModule.forChild should be called with arguments.`);
    }
    return routerModuleCall;
}
function getRoutesVariableDeclaration(source, identifier) {
    const declaration = utils_1.findDeclarationByIdentifier(source, identifier.getText());
    if (declaration == null) {
        throw new schematics_1.SchematicsException(`Can't find declaration of '${identifier.getText()}'.`);
    }
    if (declaration.initializer == null) {
        throw new schematics_1.SchematicsException(`Routes variable should be initialized during declaration.`);
    }
    if (declaration.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
        throw new schematics_1.SchematicsException(`Routes variable should be initialized with array.`);
    }
    return declaration;
}
function generateComponentRoute(path, component, ...routeFields) {
    return generatePathRoute(path, `component: ${component}`, ...routeFields);
}
exports.generateComponentRoute = generateComponentRoute;
function generatePathRoute(path, ...routeFields) {
    return generateRoute(`path: '${path}'`, ...routeFields);
}
exports.generatePathRoute = generatePathRoute;
function generateRoute(...routeFields) {
    return `{
  ${routeFields.join(',\n  ')},
}`;
}
exports.generateRoute = generateRoute;
function generateLazyModulePath(from, to, moduleClassName) {
    const path = core_1.normalize(utils_1.importPath(from, to));
    return `./${core_1.dirname(path)}/${core_1.basename(path)}#${moduleClassName}`;
}
exports.generateLazyModulePath = generateLazyModulePath;
/**
 * @param routingModulePath full path to routing module
 * @param targetFile full path to file containing component or module for the route
 */
function addMissingChildRoutes(tree, routingModulePath, targetFile) {
    const routingModuleDir = core_1.dirname(routingModulePath);
    if (utils_1.isRootPlaygroundModule(routingModuleDir)) {
        return addRootRoute(tree, targetFile);
    }
    if (utils_1.isBasePlaygroundModule(routingModuleDir)) {
        addBaseRoute(tree, targetFile);
    }
    addMissingPaths(tree, routingModulePath, targetFile);
}
exports.addMissingChildRoutes = addMissingChildRoutes;
function addMissingPaths(tree, routingModulePath, targetFile) {
    const targetDir = core_1.dirname(targetFile);
    const relativePath = targetDir.replace(core_1.dirname(routingModulePath), '');
    const existingPathEnd = targetDir.indexOf(relativePath);
    let existingPath = core_1.normalize(targetDir.slice(0, existingPathEnd));
    const pathsToCheck = dirsToRoutePaths(relativePath);
    for (let i = 0; i < pathsToCheck.length; i++) {
        const routePathToCheck = pathsToCheck[i];
        const fullPathToCheck = core_1.join(existingPath, routePathToCheck);
        const pathPredicates = routePredicatesFromPath(routingModulePath, fullPathToCheck);
        let routesArray = findRoutesArray(tree, routingModulePath);
        let route = findRouteWithPath(routesArray, pathPredicates);
        if (!route) {
            const routesArrayToAddTo = getParentRouteChildren(routesArray, routingModulePath, fullPathToCheck);
            addRoute(tree, routingModulePath, routesArrayToAddTo, generatePathRoute(routePathToCheck));
            routesArray = findRoutesArray(tree, routingModulePath);
            route = findRouteWithPath(routesArray, pathPredicates);
        }
        const allChecked = i === pathsToCheck.length - 1;
        if (allChecked) {
            return;
        }
        existingPath = fullPathToCheck;
        if (!getRouteChildren(route)) {
            utils_1.addObjectProperty(tree, schematics_2.getSourceFile(tree, routingModulePath), route, 'children: []');
        }
    }
}
function getParentRouteChildren(routesArray, routingModulePath, targetDir) {
    const predicates = routePredicatesFromPath(routingModulePath, core_1.dirname(targetDir));
    const route = findRouteWithPath(routesArray, predicates);
    return getRouteChildren(route);
}
function addRootRoute(tree, targetFile) {
    const routesArray = findRoutesArray(tree, utils_1.PLAYGROUND_ROUTING_MODULE_PATH);
    if (findRouteWithPath(routesArray, [rootRoutePredicate(targetFile)])) {
        return;
    }
    const isLayout = utils_1.isLayoutPath(targetFile);
    const baseModulePath = isLayout ? utils_1.LAYOUT_MODULE_PATH : utils_1.NO_LAYOUT_MODULE_PATH;
    const baseModuleClass = isLayout ? utils_1.LAYOUT_MODULE_CLASS : utils_1.NO_LAYOUT_MODULE_CLASS;
    const lazyModulePath = generateLazyModulePath(utils_1.PLAYGROUND_ROUTING_MODULE_PATH, baseModulePath, baseModuleClass);
    const routeString = generatePathRoute('', `loadChildren: '${lazyModulePath}'`);
    addRoute(tree, utils_1.PLAYGROUND_ROUTING_MODULE_PATH, routesArray, routeString);
}
exports.addRootRoute = addRootRoute;
function addBaseRoute(tree, targetFile) {
    const isLayout = utils_1.isLayoutPath(targetFile);
    const baseModulePath = isLayout ? utils_1.LAYOUT_ROUTING_MODULE_PATH : utils_1.NO_LAYOUT_ROUTING_MODULE_PATH;
    const routesArray = findRoutesArray(tree, baseModulePath);
    const baseRoute = findRouteWithPath(routesArray, [baseComponentPredicate(targetFile)]);
    if (baseRoute) {
        if (!getRouteChildren(baseRoute)) {
            utils_1.addObjectProperty(tree, schematics_2.getSourceFile(tree, baseModulePath), baseRoute, 'children: []');
        }
        return;
    }
    const baseModuleComponent = isLayout ? utils_1.LAYOUT_COMPONENT_CLASS : utils_1.NO_LAYOUT_COMPONENT_CLASS;
    const routeString = generateComponentRoute('', baseModuleComponent, `children: []`);
    addRoute(tree, baseModulePath, routesArray, routeString);
}
exports.addBaseRoute = addBaseRoute;
function addRoute(tree, routingModulePath, routes, route, componentClass, fileImportPath) {
    const source = schematics_2.getSourceFile(tree, routingModulePath);
    const alreadyInRoutes = routes.getFullText().includes(route);
    if (alreadyInRoutes) {
        return;
    }
    utils_1.addArrayElement(tree, source, routes, route);
    if (componentClass && fileImportPath) {
        const importChange = ast_utils_1.insertImport(source, source.fileName, componentClass, fileImportPath);
        utils_1.applyInsertChange(tree, core_1.normalize(source.fileName), importChange);
    }
}
exports.addRoute = addRoute;
function findRoute(routesArray, predicate) {
    const queue = getRoutesFromArray(routesArray);
    while (queue.length > 0) {
        const route = queue.shift();
        if (predicate(route)) {
            return route;
        }
        const routeChildren = getRouteChildren(route);
        if (routeChildren) {
            queue.push(...getRoutesFromArray(routeChildren));
        }
    }
    return undefined;
}
exports.findRoute = findRoute;
/**
 * @param routesArray array to search in
 * @param predicates predicate for each level
 */
function findRouteWithPath(routesArray, predicates) {
    const routes = getRoutesFromArray(routesArray);
    for (const route of routes) {
        const isMatch = predicates[0](route);
        const isLastMatch = isMatch && predicates.length === 1;
        if (!isMatch) {
            continue;
        }
        if (isLastMatch) {
            return route;
        }
        const children = getRouteChildren(route);
        const foundRoute = children && findRouteWithPath(children, predicates.slice(1));
        if (foundRoute) {
            return foundRoute;
        }
    }
    return undefined;
}
exports.findRouteWithPath = findRouteWithPath;
function getRoutesFromArray(routesArray) {
    return routesArray.elements
        .filter(node => node.kind === ts.SyntaxKind.ObjectLiteralExpression);
}
exports.getRoutesFromArray = getRoutesFromArray;
function getRouteChildren(route) {
    const children = findRouteProp(route, 'children');
    if (children == null) {
        return undefined;
    }
    if (children.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
        throw new schematics_1.SchematicsException(`Expecting children to be an array.`);
    }
    return children.initializer;
}
exports.getRouteChildren = getRouteChildren;
function getRouteProps(route) {
    return route.properties
        .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment);
}
exports.getRouteProps = getRouteProps;
function findRouteProp(route, propName) {
    return getRouteProps(route).find(prop => prop.name.getText() === propName);
}
exports.findRouteProp = findRouteProp;
function getRouteLazyModule(route) {
    return findRouteProp(route, 'loadChildren');
}
exports.getRouteLazyModule = getRouteLazyModule;
function getRouteComponent(route) {
    return findRouteProp(route, 'component');
}
exports.getRouteComponent = getRouteComponent;
function getRoutePath(route) {
    return findRouteProp(route, 'path');
}
exports.getRoutePath = getRoutePath;
/**
 * Returns array of route paths relative to playground.
 */
function dirsToRoutePaths(dirPath) {
    return dirPath.split(core_1.NormalizedSep).filter(dir => dir);
}
exports.dirsToRoutePaths = dirsToRoutePaths;
/**
 * Returns predicate bound to array of predicates which will check route and it's children to conform routing path
 * for a given file path.
 * @param routingModulePath full path to routing module
 * @param targetDirPath full path to directory containing component or module file for the route
 */
function routePredicatesFromPath(routingModulePath, targetDirPath) {
    const routingModuleDir = core_1.dirname(routingModulePath);
    if (utils_1.isRootPlaygroundModule(routingModuleDir)) {
        return [rootRoutePredicate(targetDirPath)];
    }
    const predicates = [];
    if (utils_1.isBasePlaygroundModule(routingModuleDir)) {
        predicates.push(baseComponentPredicate(targetDirPath));
    }
    const relativeToRoutingModule = targetDirPath.replace(core_1.dirname(routingModulePath), '');
    const routePaths = dirsToRoutePaths(relativeToRoutingModule);
    for (const path of routePaths) {
        predicates.push((route) => pathRoutePredicate(path, route));
    }
    return predicates;
}
exports.routePredicatesFromPath = routePredicatesFromPath;
function pathRoutePredicate(routePath, route) {
    const path = getRoutePath(route);
    return !!path && path.initializer.getText() === `'${routePath}'`;
}
exports.pathRoutePredicate = pathRoutePredicate;
function componentRoutePredicate(componentClass, route) {
    const component = getRouteComponent(route);
    return !!component && component.initializer.getText() === componentClass;
}
exports.componentRoutePredicate = componentRoutePredicate;
function lazyModulePredicate(lazyModulePath, route) {
    const loadChildren = getRouteLazyModule(route);
    return !!loadChildren && loadChildren.initializer.getText() === `'${lazyModulePath}'`;
}
exports.lazyModulePredicate = lazyModulePredicate;
function baseComponentPredicate(modulePath) {
    const rootComponentClass = utils_1.isLayoutPath(modulePath) ? utils_1.LAYOUT_COMPONENT_CLASS : utils_1.NO_LAYOUT_COMPONENT_CLASS;
    return (route) => componentRoutePredicate(rootComponentClass, route);
}
exports.baseComponentPredicate = baseComponentPredicate;
function rootRoutePredicate(modulePath) {
    const isLayout = utils_1.isLayoutPath(modulePath);
    const baseModulePath = isLayout ? utils_1.LAYOUT_MODULE_PATH : utils_1.NO_LAYOUT_MODULE_PATH;
    const baseModuleClass = isLayout ? utils_1.LAYOUT_MODULE_CLASS : utils_1.NO_LAYOUT_MODULE_CLASS;
    const lazyModulePath = generateLazyModulePath(utils_1.PLAYGROUND_ROUTING_MODULE_PATH, baseModulePath, baseModuleClass);
    return (route) => lazyModulePredicate(lazyModulePath, route);
}
exports.rootRoutePredicate = rootRoutePredicate;
function isLazyRoute(route) {
    return !!getRouteLazyModule(route);
}
exports.isLazyRoute = isLazyRoute;
function isComponentRoute(route) {
    return !!getRouteComponent(route);
}
exports.isComponentRoute = isComponentRoute;
//# sourceMappingURL=routing.js.map