import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-upload-queue-item',
  templateUrl: 'upload-queue-item.component.html',
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
