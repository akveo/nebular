import { InjectionToken } from '@angular/core';

export interface NbAuthOptions {
  providers?: any;
}

export interface NbAuthProviders {
  [key: string]: any;
}

export const nbAuthOptionsToken = new InjectionToken<NbAuthOptions>('NB_AUTH_OPTIONS');
export const nbAuthProvidersToken = new InjectionToken<NbAuthProviders>('NB_AUTH_OPTIONS');
