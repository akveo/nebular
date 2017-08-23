/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'nb-auth-block',
  styleUrls: ['./auth-block.component.scss'],
  template: `
    <div class="auth-block">
      <nb-card size="xxlarge">
        <nb-card-body>
          <div class="col-xl-4 col-lg-6 col-md-8 col-sm-12">
            <router-outlet></router-outlet>
          </div>
        </nb-card-body>
      </nb-card>
    </div>
  `,
})
export class NbAuthBlockComponent {
}
