import { InjectionToken } from '@angular/core';

export interface NbAclRules {
  [permission: string]: string[],
}

export interface NbAclRole {
  parent?: string,
  can: NbAclRules,
}

export interface NbAclState {
  [role: string]: NbAclRole,
}

export interface NbAclOptions {
  accessControl?: NbAclState,
}

export const NB_SECURITY_OPTIONS_TOKEN = new InjectionToken<NbAclOptions>('Nebular Security Options');
