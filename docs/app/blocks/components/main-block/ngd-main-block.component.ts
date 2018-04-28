/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-main-block',
  template: `
    <ng-container [ngSwitch]="block.block">
      <ngd-md-block *ngSwitchCase="'markdown'" [source]="block.children"></ngd-md-block>
      <!--<ngd-component-block *ngSwitchCase="'component'" [source]="block.source"></ngd-component-block>-->
      <!--<ngd-tabbed-block *ngSwitchCase="'tabbed'" [source]="block.source"></ngd-tabbed-block>-->
      <!--<ngd-theme-block *ngSwitchCase="'theme'" [block]="block"></ngd-theme-block>-->
    </ng-container>
  `,
})
export class NgdMainBlockComponent {

  @Input() block: any;
}
