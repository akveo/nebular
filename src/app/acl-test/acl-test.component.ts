/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbAuthorizationChecker } from '@nebular/security';

@Component({
  selector: 'nb-actions-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <button *ngIf="authorizationChecker.isGranted('create', 'comments') | async" >Post Comment</button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbAclTestComponent {

  /* tslint:disable-next-line:no-unused-variable */
  constructor(private authorizationChecker: NbAuthorizationChecker) {
  }

}
