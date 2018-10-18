/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export const nebularThemePackage = '@nebular/theme';
export const nebularStylesPrebuiltPrefix = '@nebular/theme/styles/prebuilt';
export const nebularThemesFile = 'themes.scss';
export const nebularLayoutModule = 'NbLayoutModule';

export const angularRouterPackage = '@angular/router';
export const angularCorePackageName = '@angular/core';
export const angularCDKPackageName = '@angular/cdk';
export const angularAnimationsPackageName = '@angular/animations';
export const angularRouterModule = 'RouterModule.forRoot([])';

export const setupSchematicsTask = 'setup';
export const angularJson = 'angular.json';

export const createThemeModule = (themeName: string) =>
  `NbThemeModule.forRoot({ name: ${themeName} })`;

export const createStylesPrebuiltPath = (themeName: string) =>
  `./node_modules/${nebularStylesPrebuiltPrefix}/${themeName}.css`;
