import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-block',
  template: `
    <ng-container [ngSwitch]="block.block">
      <ngd-markdown-file *ngSwitchCase="'markdown'" [source]="block.source"></ngd-markdown-file>
      <ngd-component-block *ngSwitchCase="'component'" [source]="block.source"></ngd-component-block>
      <ngd-tabbed-block *ngSwitchCase="'tabbed'" [source]="block.source"></ngd-tabbed-block>
      <ngd-theme-block *ngSwitchCase="'theme'" [block]="block"></ngd-theme-block>
    </ng-container>
  `,
})
export class NgdBlockComponent {

  @Input() block: any;
}
