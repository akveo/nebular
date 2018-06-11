import { Component, ViewChild } from '@angular/core';
import { NbCollapsableDirective } from '@nebular/theme/components/collapsable/collapsable.directive';

@Component({
  selector: 'nb-collapsable-showcase',
  template: `
    <ng-template
      #collapsable
      [nbCollapsable]="collapsable"
      nbCollapsableTitle="User Window"
    >
      <nb-user
        size="large"
        name="Jonh Doe"
        title="Engineer"
        badgeText="99+"
        badgeStatus="success"
        badgePosition="bottom right">
      </nb-user>
    </ng-template>
    <button class="btn btn-primary" (click)="onClick()">Show Window</button>
  `,
  styles: [
    `
      /deep/ nb-collapsable.expanded nb-user {
        width: 500px;
      }
    `
  ]
})

export class NbCollapsableShowcaseComponent {
  @ViewChild(NbCollapsableDirective) userWindow: NbCollapsableDirective;

  onClick() {
    this.userWindow.show();
  }
}
