import { Component, Input } from '@angular/core';
import { BlockHelperService } from '../../utils/block-helper.service';

@Component({
  selector: 'ngd-component-block',
  template: `
    <ngd-description-block *ngIf="blockHelper.hasDescription(source)" [source]="source">
    </ngd-description-block>
    <ngd-examples-block *ngIf="blockHelper.hasExamples(source)" [source]="source">
    </ngd-examples-block>
    <ngd-props-block *ngIf="blockHelper.hasProps(source)" [source]="source">
    </ngd-props-block>
    <ngd-methods-block *ngIf="blockHelper.hasMethods(source)" [source]="source">
    </ngd-methods-block>
    <ngd-styles-block *ngIf="blockHelper.hasTheme(source)" [source]="source">
    </ngd-styles-block>
  `,
})
export class NgdComponentBlockComponent {

  @Input() source: any;

  constructor(public blockHelper: BlockHelperService) {
  }
}
