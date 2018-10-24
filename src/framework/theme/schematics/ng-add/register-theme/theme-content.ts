/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export function createThemeContent(themeName: string): string {
  return `@import '~@nebular/theme/styles/theming';
@import '~@nebular/theme/styles/themes/${themeName}';

$nb-themes: nb-register-theme((
  // add your variables here like:
  // color-bg: #4ca6ff,
), ${themeName}, ${themeName});
`;
}

export const stylesContent =  `@import 'themes';

@import '~@nebular/theme/styles/globals';

@include nb-install() {
  @include nb-theme-global();
};
`;

