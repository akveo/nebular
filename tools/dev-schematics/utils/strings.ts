const QUOTES = [`'`, `"`, '`'];

export function trimQuotes(stringLiteral: string): string {
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

const COMPONENT_SUFFIX = 'Component';

/**
 * Splits string in words by capital letters. Also removes 'Component' suffix.
 */
export function splitClassName(className: string): string {
  const withoutSuffix = className.endsWith(COMPONENT_SUFFIX) ? className.replace(COMPONENT_SUFFIX, '') : className;

  return withoutSuffix.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function singleQuotes(json: string) {
  return json.replace(/\"/gm, `'`);
}

export function addTrailingCommas(json: string): string {
  let withCommas = json.replace(/(['}\]])$/gm, '$1,');

  if (withCommas.endsWith(',')) {
    withCommas = withCommas.slice(0, withCommas.length - 1);
  }

  return withCommas;
}

export function removePropsQuotes(json: string): string {
  return json.replace(/^(\s*)['"](\S+)['"]:/gm, '$1$2:');
}
