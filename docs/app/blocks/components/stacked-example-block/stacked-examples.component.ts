import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-stacked-example-block',
  template: `
    <div>
      <nb-checkbox [(ngModel)]="isLive">Toggle view</nb-checkbox>
      <ngd-live-example-block [hidden]="!isLive" [id]="content.id" [title]="'example'"></ngd-live-example-block>
      <ngd-inline-example-block [hidden]="isLive" [content]="content.tabs"></ngd-inline-example-block>
    </div>
  `,
})
export class NgdStackedExampleComponent {

  @Input() content: any;
  isLive = true;
}
