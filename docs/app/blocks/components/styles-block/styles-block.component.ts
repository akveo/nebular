/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgdStylesService } from '../../../@theme/services';

@Component({
  selector: 'ngd-styles-block',
  template: `
    <div class="block-container" *ngFor="let style of classStyles">
      <div class="table-container">
        <table class="table table-striped">
          <thead>
          <tr>
            <td>Name</td>
            <td *ngFor="let themedValue of style.styles[0].themedValues">{{ themedValue.theme }}</td>
            <td>Description</td>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let item of style.styles">
            <td>{{ item.name }}</td>
            <td *ngFor="let themedValue of item.themedValues" ngdColorSwatch>{{ themedValue.value }}</td>
            <td>
              <p *ngIf="item.shortDescription" ngdDescription>{{ item.shortDescription}}</p>
              <p *ngIf="item.description" ngdDescription>{{ item.description }}</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdStylesBlockComponent {

  classStyles: any;
  className: string;

  @Input('source')
  set setSource(source: any) {
    this.classStyles = this.stylesService.mapThemedValues(source.styles);
    this.className = source.name;
  };

  constructor(private stylesService: NgdStylesService) {
  }

}
