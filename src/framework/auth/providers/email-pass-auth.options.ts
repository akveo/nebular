/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// TODO postfix to options
export interface NbEmailPassModuleConfig {
  alwaysFail?: boolean;
  rememberMe?: boolean;
  endpoint?: string;
  method?: string;
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
  defaultErrors?: string[];
  defaultMessages?: string[];
}

// TODO postfix to options
export interface NbEmailPassResetModuleConfig extends NbEmailPassModuleConfig {
  resetPasswordTokenKey?: string;
}

// TODO postfix to options
export interface NgEmailPassAuthProviderConfig {
  baseEndpoint?: string;
  login?: boolean | NbEmailPassModuleConfig;
  register?: boolean | NbEmailPassModuleConfig;
  requestPass?: boolean | NbEmailPassModuleConfig;
  resetPass?: boolean | NbEmailPassResetModuleConfig;
  logout?: boolean | NbEmailPassResetModuleConfig;
  token?: {
    key?: string;
    getter?: Function;
  };
  errors?: {
    key?: string;
    getter?: Function;
  };
  messages?: {
    key?: string;
    getter?: Function;
  };
  validation?: {
    password?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
    email?: {
      required?: boolean;
      regexp?: string | null;
    };
    fullName?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
  };
}
