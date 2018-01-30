import { InjectionToken } from '@angular/core';

export interface NbAclAbilities {
  [permission: string]: string[],
}

export interface NbAclRole {
  parent?: string,
  can: NbAclAbilities,
}

export interface NbAclState {
  [role: string]: NbAclRole,
}

export interface NbAclOptions {
  roles?: NbAclState,
}

export const NB_ACL_USER_OPTIONS_TOKEN = new InjectionToken<NbAclOptions>('Nebular Acl Options');
