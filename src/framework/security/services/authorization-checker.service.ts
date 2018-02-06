/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { NbRoleProvider } from './role.provider';
import { NbAclService } from './acl.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class NbAuthorizationChecker {

  constructor(protected roleProvider: NbRoleProvider, protected acl: NbAclService) {
  }

  isGranted(permissoin: string, resource: string): Observable<boolean> {
    return this.roleProvider.getRole()
      .pipe(
        map((role: string) => {
          return this.acl.can(role, permissoin, resource);
        }),
      );
  }
}
