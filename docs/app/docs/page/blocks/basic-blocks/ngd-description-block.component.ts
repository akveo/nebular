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
        <a [routerLink]="" fragment="{{source.name}}" ngdFragment></a>
        {{source?.name}}
      </h2>
      <p *ngIf="isShortDescription" class="short-description">
        {{ source?.shortDescription }}
      </p>
      <p *ngIf="isDescription" ngdDescription class="description">
        {{source?.description}}
      </p>
    </div>
  `,
})
export class NgdDescriptionBlockComponent {

  source: any;
  isDescription: boolean = false;
  isShortDescription: boolean = false;

  @Input('source')
  set setSource(source: any) {
    if (source) {
      this.isShortDescription = !!source.shortDescription &&
        source.shortDescription !== source.name;

      this.isDescription = !!source.description &&
        source.description !== source.shortDescription;
      this.source = source;
    }
  };
}
