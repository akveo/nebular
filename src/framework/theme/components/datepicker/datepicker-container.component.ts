/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ComponentRef, ViewChild } from '@angular/core';

import { NbComponentPortal, NbPortalOutletDirective } from '../cdk';


@Component({
  selector: 'nb-datepicker-container',
  template: '<ng-template nbPortalOutlet></ng-template>',
})
export class NbDatepickerContainerComponent {
  @ViewChild(NbPortalOutletDirective) portalOutlet: NbPortalOutletDirective;

  attach<T>(portal: NbComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }
}
