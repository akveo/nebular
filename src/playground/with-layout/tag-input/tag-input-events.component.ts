import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-app-tag-input-events',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          fullWidth
          (tagAdded)="onTagAdded($event)"
          (tagUpdated)="onTagUpdated($event)"
          (tagRemoved)="onTagRemoved($event)"
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
  `,
})
export class TagInputEventsComponent {

  constructor(private toastrService: NbToastrService) { }

  onTagAdded(tag: string) {
    this.toastrService.show('Success', `Tag '${tag}' added`, { status: 'success' });
  }

  onTagUpdated(tag: { index: number, tag: string }) {
    this.toastrService.show('Success', `Tag ${tag.index} updated to '${tag.tag}'`, { status: 'success' });
  }

  onTagRemoved(tag: { index: number, tag: string }) {
    this.toastrService.show('Success', `Tag ${tag.index} - '${tag.tag}' removed`, { status: 'success' });
  }
}
