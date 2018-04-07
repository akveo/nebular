import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-inline-example',
  template: `
    <ngd-example *ngIf="isOneFile" [content]="content"></ngd-example>
    <ngd-tabbed-example *ngIf="isTabbed" [content]="content"></ngd-tabbed-example>
  `,
})
export class NgdInlineExampleComponent {

  @Input() content;

  get isOneFile(): boolean {
    return !this.isTabbed;
  }

  get isTabbed(): boolean {
    return !this.content.path;
  }
}
