import { InjectionToken } from '@angular/core';

export interface NbAuthOptions {
  providers?: any;
}

export interface NbAuthProviders {
  [key: string]: any;
}

export const NB_AUTH_OPTIONS_TOKEN = new InjectionToken<NbAuthOptions>('Nebular Auth Options');
export const NB_AUTH_PROVIDERS_TOKEN = new InjectionToken<NbAuthProviders>('Nebular Auth Providers');
export const NB_AUTH_TOKEN_WRAPPER_TOKEN = new InjectionToken<NbAuthProviders>('Nebular Auth Token');
