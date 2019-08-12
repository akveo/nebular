"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const generate_missing_modules_1 = require("./generate-missing-modules");
const add_to_modules_1 = require("./add-to-modules");
function playgroundModule() {
    return () => schematics_1.chain([generate_missing_modules_1.generateMissingModules, add_to_modules_1.addToModules]);
}
exports.playgroundModule = playgroundModule;
//# sourceMappingURL=index.js.map