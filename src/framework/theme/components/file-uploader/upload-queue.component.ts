import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-upload-queue',
  templateUrl: './upload-queue.component.html',
  styleUrls: ['./upload-queue.component.scss'],
})
export class NbUploadQueueComponent {
  @Input()
  items: any[];
}
