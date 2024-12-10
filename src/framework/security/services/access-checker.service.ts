/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { NbRoleProvider } from './role.provider';
import { NbAclService } from './acl.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Access checker service.
 *
 * Injects `NbRoleProvider` to determine current user role, and checks access permissions using `NbAclService`
 */
@Injectable()
export class NbAccessChecker {
  constructor(protected roleProvider: NbRoleProvider, protected acl: NbAclService) {}

  /**
   * Checks whether access is granted or not
   *
   * @param {string} permission
   * @param {string} resource
   * @returns {Observable<boolean>}
   */
  isGranted(permission: string, resource: string): Observable<boolean> {
    return this.roleProvider.getRole().pipe(
      map((role: string | string[]) => (Array.isArray(role) ? role : [role])),
      map((roles: string[]) => {
        return roles.some((role) => this.acl.can(role, permission, resource));
      }),
    );
  }
}
