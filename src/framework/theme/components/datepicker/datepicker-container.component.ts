/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ComponentRef, ViewChild } from '@angular/core';

import { NbComponentPortal, NbPortalOutletDirective, NbPositionedContainer } from '../cdk';


@Component({
  selector: 'nb-datepicker-container',
  styleUrls: ['./datepicker-container.component.scss'],
  template: `
    <span class="arrow"></span>
    <ng-template nbPortalOutlet></ng-template>
  `,
})
export class NbDatepickerContainerComponent extends NbPositionedContainer {
  @ViewChild(NbPortalOutletDirective) portalOutlet: NbPortalOutletDirective;

  attach<T>(portal: NbComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }
}
