/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const layoutStart = `<nb-layout>

  <nb-layout-header fixed>
  <!-- Insert header here -->
  </nb-layout-header>

  <nb-layout-column>
`;

const layoutEnd = `  </nb-layout-column>

  <nb-layout-footer fixed>
  <!-- Insert footer here -->
  </nb-layout-footer>

</nb-layout>`;

export function wrapInlineTemplateInLayout(template: string): string {
  return ` \`
${padd(layoutStart, 4)}
${padd(template, 4)}
${padd(layoutEnd, 4)}
`;
}

export function wrapHtmlFileTemplateInLayout(template: string): string {
  return `${layoutStart}
${padd(template, 4)}
${layoutEnd}
`;
}

/**
 * Adds padding to the each line of the multyline string.
 * */
function padd(text: string, paddLen: number): string {
  return text
    .split('\n')
    .map(line => `${' '.repeat(paddLen)}${line}`)
    .join('\n');
}

