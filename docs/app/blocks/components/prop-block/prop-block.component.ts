
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-prop-block',
  template: `
    <nb-card>
      <a [name]="slag"></a>
      <nb-card-body>
        <h2>{{ name }}</h2>
        <table>
          <thead>
          <tr>
            <td width="25%">Name</td>
            <td width="20%">Type</td>
            <td>Description</td>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let prop of properties">
            <td>{{ prop.name }}</td>
            <td><code *ngIf="prop.type">{{ prop.type }}</code></td>
            <td>
              <div *ngIf="prop.shortDescription" ngdDescription>{{ prop.shortDescription }}</div>
              <div *ngIf="prop.description" ngdDescription>{{ prop.description }}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPropBlockComponent {

  @Input() properties = [];
  @Input() name;
  @Input() slag;
}
