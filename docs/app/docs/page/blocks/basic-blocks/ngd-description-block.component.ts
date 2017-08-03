/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'ngd-description-block',
  template: `
    <div class="block-container">
    <h5 class="class-name">
    <a [routerLink]="" fragment="{{blockData.name}}" ngdFragment> <i class="ion-link"></i></a> {{blockData.name}} </h5>
      <p *ngIf="isShortDescription" class="short-description">
        {{ blockData?.shortDescription }}
      </p>
      <p *ngIf="isDescription" ngdDescription class="description">
        {{blockData?.description}}
      </p>
    </div>
  `,
})
export class NgdDescriptionBlockComponent implements OnChanges {

  @Input() blockData: any;
  isDescription: boolean;
  isShortDescription: boolean;

  ngOnChanges() {
    this.isShortDescription = !!this.blockData.shortDescription && this.blockData.shortDescription != this.blockData.name;
    this.isDescription = !!this.blockData.description && this.blockData.description != this.blockData.shortDescription;
  }
}
