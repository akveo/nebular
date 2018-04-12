/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDynamicToAddComponent } from '../../app/dynamic.component';

@Component({
  selector: 'nb-popover-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './popover-example.component.html',
})
export class NbPopoverExampleComponent {

  customPopoverComponent = NbDynamicToAddComponent;

  items = [{ title: 'Profile', link: '/card' }, { title: 'Log out', link: '/auth' }];
}
