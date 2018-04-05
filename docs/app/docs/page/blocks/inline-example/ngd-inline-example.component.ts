import { Component, Input } from '@angular/core';
import { ExampleHelperService } from '../../../utils/example-helper.service';

@Component({
  selector: 'ngd-inline-example',
  template: `
    <ngd-example *ngIf="isOneFile" [content]="content"></ngd-example>
    <ngd-tabbed-example *ngIf="isFull" [content]="content"></ngd-tabbed-example>
  `,
})
export class NgdInlineExampleComponent {

  @Input() content;

  constructor(private exampleHelper: ExampleHelperService) {
  }

  get isOneFile(): boolean {
    return !this.isFull;
  }

  get isFull(): boolean {
    return this.exampleHelper.isFull(this.content.path);
  }
}
