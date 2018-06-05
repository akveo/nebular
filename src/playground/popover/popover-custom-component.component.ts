/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbDynamicToAddComponent } from '../shared/dynamic.component';


@Component({
  selector: 'nb-popover-custom-component',
  templateUrl: './popover-custom-component.component.html',
})
export class NbPopoverCustomComponentComponent {

  customComponent = NbDynamicToAddComponent;
}


