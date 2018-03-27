import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-inline-example',
  template: `
    <ngd-one-file-example *ngIf="isOneFile"></ngd-one-file-example>
    <ngd-full-example *ngIf="isFull"></ngd-full-example>
  `,
})
export class NgdInlineExampleComponent {

  @Input() content;
  code: string;

  get isOneFile(): boolean {
    return !!this.content.lang;
  }

  get isFull(): boolean {
    return !this.isOneFile;
  }
}
