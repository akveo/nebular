"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function newComponent(options) {
    return (tree, context) => {
        options.path = '/src/framework/theme/components/';
        options.prefix = 'nb';
        options.selector = options.selector || buildSelector(options);
        const parsedPath = parseName(options.path, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        options.className = buildClassName(options);
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.template(Object.assign({}, core_1.strings, options)),
        ]);
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                schematics_1.mergeWith(templateSource),
            ])),
        ])(tree, context);
    };
}
exports.newComponent = newComponent;
function parseName(path, name) {
    const nameWithoutPath = core_1.basename(name);
    const namePath = core_1.dirname((path + '/' + name));
    return {
        name: nameWithoutPath,
        path: core_1.normalize('/' + namePath),
    };
}
exports.parseName = parseName;
function buildSelector(options) {
    let selector = core_1.strings.dasherize(options.name);
    if (options.prefix) {
        selector = `${options.prefix}-${selector}`;
    }
    return selector;
}
function buildClassName(options) {
    return capitalize(options.prefix) + options.name;
}
function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
//# sourceMappingURL=index.js.map