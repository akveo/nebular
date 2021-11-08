/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const { join } = require('path');
const { readFile, writeFile } = require('fs/promises');

const filesToUpdate = ['theme/components/cdk/overlay/_overlay.theme.scss', 'bootstrap/styles/_globals.scss'].map(
  (path) => join(process.cwd(), 'dist', path),
);

const enum ConvertOptions {
  NativeSass = '--sass',
  SassLoader = '--sass-loader',
}

function determineSearchAndReplaceValues(): { searchValue: RegExp; replaceValue: string } {
  const arg = process.argv[2];

  if (arg === ConvertOptions.NativeSass) {
    return { searchValue: /(^@import ')(~)(.+)/gm, replaceValue: `/*add-tilde*/$1$3` };
  } else if (arg === ConvertOptions.SassLoader) {
    return { searchValue: /(\/\*add-tilde\*\/)(@import ')(.+)/gm, replaceValue: '$2~$3' };
  }

  throw new Error(`Unknown option "${arg}"`);
}

(async function changeSassImports() {
  const { searchValue, replaceValue } = determineSearchAndReplaceValues();
  for (const filePath of filesToUpdate) {
    const source = await readFile(filePath, 'utf8');
    const updatedSource = source.replace(searchValue, replaceValue);
    await writeFile(filePath, updatedSource);
  }
})();
