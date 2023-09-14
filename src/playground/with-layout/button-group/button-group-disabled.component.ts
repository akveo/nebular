/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <nb-button-group disabled>
          <button nbButtonToggle>A</button>
          <button nbButtonToggle>B</button>
          <button nbButtonToggle>C</button>
        </nb-button-group>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupDisabledComponent {}
