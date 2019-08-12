"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QUOTES = [`'`, `"`, '`'];
function trimQuotes(stringLiteral) {
    if (stringLiteral.length === 0) {
        return stringLiteral;
    }
    let resultingString = stringLiteral;
    if (QUOTES.includes(resultingString[0])) {
        resultingString = resultingString.slice(1);
    }
    if (QUOTES.includes(resultingString[resultingString.length - 1])) {
        resultingString = resultingString.slice(0, resultingString.length - 1);
    }
    return resultingString;
}
exports.trimQuotes = trimQuotes;
const COMPONENT_SUFFIX = 'Component';
/**
 * Splits string in words by capital letters. Also removes 'Component' suffix.
 */
function splitClassName(className) {
    const withoutSuffix = className.endsWith(COMPONENT_SUFFIX)
        ? className.replace(COMPONENT_SUFFIX, '')
        : className;
    return withoutSuffix.replace(/([a-z])([A-Z])/g, '$1 $2');
}
exports.splitClassName = splitClassName;
function singleQuotes(json) {
    return json.replace(/\"/gm, `'`);
}
exports.singleQuotes = singleQuotes;
function addTrailingCommas(json) {
    let withCommas = json.replace(/(['}\]])$/gm, '$1,');
    if (withCommas.endsWith(',')) {
        withCommas = withCommas.slice(0, withCommas.length - 1);
    }
    return withCommas;
}
exports.addTrailingCommas = addTrailingCommas;
function removePropsQuotes(json) {
    return json.replace(/^(\s*)['"](\S+)['"]:/gm, '$1$2:');
}
exports.removePropsQuotes = removePropsQuotes;
//# sourceMappingURL=strings.js.map