"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function generatePlayground() {
    return schematics_1.chain([
        schematics_1.schematic('playground-module', {}),
        schematics_1.schematic('playground-components', {}),
    ]);
}
exports.generatePlayground = generatePlayground;
//# sourceMappingURL=index.js.map