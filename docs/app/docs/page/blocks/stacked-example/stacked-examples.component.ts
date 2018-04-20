import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-stacked-example',
  template: `
    <div>
      <nb-checkbox [(ngModel)]="isLive">Toggle view</nb-checkbox>
      <ngd-live-example [hidden]="!isLive" [id]="content.id"></ngd-live-example>
      <ngd-inline-example [hidden]="isLive" [content]="content.tabs"></ngd-inline-example>
    </div>
  `,
})

export class NgdStackedExampleComponent {
  @Input() content: any;
  isLive = true;
}
