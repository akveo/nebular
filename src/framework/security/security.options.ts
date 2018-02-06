import { InjectionToken } from '@angular/core';

export interface NbAclRole {
  parent?: string,
  [permission: string]: string|string[],
}

export interface NbAclState {
  [role: string]: NbAclRole,
}

export interface NbAclOptions {
  accessControl?: NbAclState,
}

export const NB_SECURITY_OPTIONS_TOKEN = new InjectionToken<NbAclOptions>('Nebular Security Options');
