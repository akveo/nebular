/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';
import { NbPositionedContainer } from '../../cdk';


/**
 * Overlay container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-fg
 * popover-bg
 * popover-border
 * popover-shadow
 * */
@Component({
  selector: 'nb-popover',
  styleUrls: ['./popover.component.scss'],
  template: `
    <span class="arrow"></span>
    <nb-overlay-container [content]="content" [context]="context"></nb-overlay-container>
  `,
})
export class NbPopoverComponent extends NbPositionedContainer {
  @Input() content: any;
  @Input() context: Object;
}
