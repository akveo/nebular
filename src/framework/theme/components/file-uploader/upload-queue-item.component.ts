/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-upload-queue-item',
  template: `
    <span class="file-item-caption">
      <span>{{ item.name }}</span>
      <span class="file-progress">{{ item.progress + '%' }}</span>
    </span>

    <nb-progress-bar [value]="item.progress" [status]="status"></nb-progress-bar>
  `,
  styleUrls: ['./upload-queue-item.component.scss'],
})
export class NbUploadQueueItemComponent {
  @Input()
  item: any;

  get status(): string {
    if (this.item.progress <= 25) {
      return 'danger';
    }
    if (this.item.progress <= 50) {
      return 'warning';
    }
    if (this.item.progress <= 75) {
      return 'info';
    }
    return 'success';
  }
}
