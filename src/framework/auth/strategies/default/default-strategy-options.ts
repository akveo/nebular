/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// TODO postfix to options
export interface NbDefaultStrategyModule {
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
export interface NbDefaultStrategyReset extends NbDefaultStrategyModule {
  resetPasswordTokenKey?: string;
}

// TODO postfix to options
export interface NbDefaultAuthStrategyOptions {
  baseEndpoint?: string;
  login?: boolean | NbDefaultStrategyModule;
  register?: boolean | NbDefaultStrategyModule;
  requestPass?: boolean | NbDefaultStrategyModule;
  resetPass?: boolean | NbDefaultStrategyReset;
  logout?: boolean | NbDefaultStrategyReset;
  refreshToken?: boolean | NbDefaultStrategyModule;
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
