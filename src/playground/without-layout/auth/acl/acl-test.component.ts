/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'nb-actions-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>Service usage</nb-card-header>
          <nb-card-body>
            <button *ngIf="accessChecker.isGranted('create', 'comments') | async" >Post Comment</button>
          </nb-card-body>
        </nb-card>
        <nb-card>
          <nb-card-header>Directive usage</nb-card-header>
          <nb-card-body>
            <button *nbIsGranted="['create', 'comments']" >Post Comment</button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AclTestComponent {

  constructor(public accessChecker: NbAccessChecker) {
  }

}
