"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const change_1 = require("@schematics/angular/utility/change");
function applyInsertChange(tree, path, ...changes) {
    const recorder = tree.beginUpdate(path);
    changes.filter(change => change instanceof change_1.InsertChange)
        .forEach((change) => recorder.insertLeft(change.pos, change.toAdd));
    tree.commitUpdate(recorder);
    return tree;
}
exports.applyInsertChange = applyInsertChange;
function applyReplaceChange(tree, path, ...changes) {
    const recorder = tree.beginUpdate(path);
    changes.forEach(({ pos, oldText, newText }) => {
        recorder.remove(pos, oldText.length);
        recorder.insertLeft(pos, newText);
    });
    tree.commitUpdate(recorder);
    return tree;
}
exports.applyReplaceChange = applyReplaceChange;
//# sourceMappingURL=change.js.map