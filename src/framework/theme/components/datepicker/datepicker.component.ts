/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-datepicker',
  template: `
    <nb-overlay-container [content]="content" [context]="context"></nb-overlay-container>
  `,
})
export class NbDatepickerComponent {
}
