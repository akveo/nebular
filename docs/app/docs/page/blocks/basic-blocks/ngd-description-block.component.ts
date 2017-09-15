/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-description-block',
  template: `
    <div class="block-container">
      <h2 class="class-name">
        <a [routerLink]="" fragment="{{blockData.name}}" ngdFragment></a>
        {{blockData?.name}}
      </h2>
      <p *ngIf="isShortDescription" class="short-description">
        {{ blockData?.shortDescription }}
      </p>
      <p *ngIf="isDescription" ngdDescription class="description">
        {{blockData?.description}}
      </p>
    </div>
  `,
})
export class NgdDescriptionBlockComponent {

  @Input('blockData') set setBlockData(blockData: any) {
    if (blockData) {
      this.isShortDescription = !!blockData.shortDescription &&
        blockData.shortDescription !== blockData.name;

      this.isDescription = !!blockData.description &&
        blockData.description !== blockData.shortDescription;
      this.blockData = blockData;
    }
  };

  blockData: any;
  isDescription: boolean = false;
  isShortDescription: boolean = false;

}
