/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// TODO postfix to options
export interface NbEmailPassModuleConfig {
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
}

// TODO postfix to options
export interface NgEmailPassAuthProviderConfig {
  login?: boolean | NbEmailPassModuleConfig;
  register?: boolean | NbEmailPassModuleConfig;
  requestPass?: boolean | NbEmailPassModuleConfig;
  resetPass?: boolean | NbEmailPassModuleConfig;
  logout?: boolean | NbEmailPassModuleConfig;
}
