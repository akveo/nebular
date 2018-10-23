/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-upload-queue',
  template: `
    <nb-upload-queue-item *ngFor="let queueItem of items" [item]="queueItem"></nb-upload-queue-item>
  `,
  styleUrls: ['./upload-queue.component.scss'],
})
export class NbUploadQueueComponent {
  @Input()
  items: any[];
}
