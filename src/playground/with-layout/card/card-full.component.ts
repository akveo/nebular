/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-card-full',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-full.component.html',
  standalone: false,
})
export class CardFullComponent {}
