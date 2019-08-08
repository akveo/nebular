"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular/cdk/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("./change");
const formatting_1 = require("./formatting");
/**
 * Returns all exported and named class declarations with a given decorator.
 */
function getClassWithDecorator(tree, path, decoratorName) {
    return ast_utils_1.findNodes(schematics_1.getSourceFile(tree, path), ts.SyntaxKind.ClassDeclaration)
        .filter(node => isNodeExported(node))
        .filter(node => node.name != null)
        .filter((node) => hasDecoratorCall(node, decoratorName));
}
exports.getClassWithDecorator = getClassWithDecorator;
/**
 * Partially adopted from getDecoratorMetadata from angular ast-utils.
 * https://github.com/angular
 * /angular-cli/blob/e3f56ebc71d57c79528fb4926a267e5ed4f9c74d/packages/schematics/angular/utility/ast-utils.ts#L282
 */
function hasDecoratorCall(classDeclaration, decoratorName) {
    if (classDeclaration.decorators == null) {
        return false;
    }
    return classDeclaration.decorators
        .filter(d => d.expression.kind === ts.SyntaxKind.CallExpression)
        .map(d => d.expression.expression)
        .some(decoratorFactoryCall => decoratorFactoryCall.getText() === decoratorName);
}
exports.hasDecoratorCall = hasDecoratorCall;
/**
 * True if node is visible outside this file, false otherwise
 * github.com/Microsoft/TypeScript-wiki/blob/d6867c43218212eff796dd971f54040234c2233a/Using-the-Compiler-API.md#L757
 * */
function isNodeExported(node) {
    return ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
        (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile));
}
exports.isNodeExported = isNodeExported;
function findDeclarationByIdentifier(source, identifierText) {
    return ast_utils_1.getSourceNodes(source)
        .filter(node => node.kind === ts.SyntaxKind.VariableDeclaration)
        .find((node) => node.name.getText() === identifierText);
}
exports.findDeclarationByIdentifier = findDeclarationByIdentifier;
function addObjectProperty(tree, source, node, property) {
    addNodeArrayElement(tree, source, node, property);
}
exports.addObjectProperty = addObjectProperty;
function addArrayElement(tree, source, node, element) {
    addNodeArrayElement(tree, source, node, element);
}
exports.addArrayElement = addArrayElement;
function addNodeArrayElement(tree, source, node, element) {
    const elements = node.properties || node.elements;
    const hasElements = elements.length > 0;
    let insertPosition;
    let toRemove = '';
    if (hasElements) {
        const lastEl = elements[elements.length - 1];
        insertPosition = lastEl.getFullStart() + lastEl.getFullText().length;
        toRemove = source.getFullText().slice(insertPosition, node.getEnd() - 1);
    }
    else {
        insertPosition = elements.pos;
    }
    const prevElementTrailingComma = hasElements ? ',' : '';
    const nodeIndentation = ' '.repeat(formatting_1.getNodeIndentation(source.getFullText(), node));
    const elementIndentation = nodeIndentation + '  ';
    const indentedElement = elementIndentation + element.replace(/\n/gm, `\n${elementIndentation}`);
    const closingBracketIndentation = nodeIndentation;
    const toAdd = prevElementTrailingComma + '\n' +
        indentedElement + ',\n' +
        closingBracketIndentation;
    const recorder = tree.beginUpdate(source.fileName);
    if (toRemove.length) {
        recorder.remove(insertPosition, toRemove.length);
    }
    recorder.insertLeft(insertPosition, toAdd);
    tree.commitUpdate(recorder);
}
function addDeclaration(tree, modulePath, componentClass, importPath) {
    const source = schematics_1.getSourceFile(tree, modulePath);
    const declarationsChanges = ast_utils_1.addDeclarationToModule(source, modulePath, componentClass, importPath);
    change_1.applyInsertChange(tree, core_1.normalize(source.fileName), ...declarationsChanges);
}
exports.addDeclaration = addDeclaration;
//# sourceMappingURL=ast.js.map