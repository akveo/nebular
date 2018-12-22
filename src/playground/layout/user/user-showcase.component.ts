/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-user-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-showcase.component.html',
})
export class NbUserShowcaseComponent {
}
