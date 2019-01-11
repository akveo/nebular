/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'nb-popover-showcase',
  templateUrl: './popover-showcase.component.html',
  styles: [`
    :host {
      display: block;
      margin: 10rem;
    }
  `],
})
export class PopoverShowcaseComponent {
  placement = 'left';
  trigger = 'click';
  text = 'Hello from Popover: ';

  changePlacement(placement) {
    this.placement = placement;
  }
  changeTrigger(trigger) {
    this.trigger = trigger;
  }

  // ngOnInit() {
  //   setInterval(() => {
  //     this.text = `${this.text}1`;
  //   }, 3000);
  // }
}
