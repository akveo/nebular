import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-inline-example',
  template: `
    <ngd-example *ngIf="isOneFile" [content]="content"></ngd-example>
    <ngd-tabbed-example *ngIf="isFull" [content]="content"></ngd-tabbed-example>
  `,
})
export class NgdInlineExampleComponent {

  @Input() content;

  get isOneFile(): boolean {
    return !!this.content.lang;
  }

  get isFull(): boolean {
    return !this.isOneFile;
  }
}
