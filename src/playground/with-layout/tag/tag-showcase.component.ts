/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbTagComponent } from '@nebular/theme';

import { trees } from './trees-list';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <nb-tag-list (tagRemove)="onTagRemove($event)">
          <nb-tag *ngFor="let tree of trees" [text]="tree" [removable]="trees.length > 1"></nb-tag>
        </nb-tag-list>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagShowcaseComponent {
  trees = trees;

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.trees = this.trees.filter((t) => t !== tagToRemove.text);
  }
}
