import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-block',
  template: `
    <ng-container [ngSwitch]="block.block">
      <ngd-markdown-block *ngSwitchCase="'markdown'" [source]="block.source"></ngd-markdown-block>
      <ngd-component-block *ngSwitchCase="'component'" [source]="block.source"></ngd-component-block>
      <ngd-theme-block *ngSwitchCase="'theme'" [block]="block"></ngd-theme-block>
    </ng-container>
  `,
})
export class NgdBlockComponent {

  @Input() block: any;
}
