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
        <router-outlet></router-outlet>
      </nb-card>
    </div>
  `,
})
export class NbAuthBlockComponent {
}
