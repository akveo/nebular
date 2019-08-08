/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { Change } from '@schematics/angular/utility/change';
export interface ReplaceChange {
    pos: number;
    oldText: string;
    newText: string;
}
export declare function applyInsertChange(tree: Tree, path: Path, ...changes: Change[]): Tree;
export declare function applyReplaceChange(tree: Tree, path: Path, ...changes: ReplaceChange[]): Tree;
