/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ViewChild } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'nb-popover-noop',
  templateUrl: './popover-noop.component.html',
  styles: [`
    button {
      margin-right: 1rem;
      margin-top: 1rem;
    }
  `],
})
export class PopoverNoopComponent {

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;

  open() {
    this.popover.show();
  }

  close() {
    this.popover.hide();
  }
}
