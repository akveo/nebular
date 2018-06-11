import { Component, ViewChild } from '@angular/core';
import { NbCollapsableDirective } from '@nebular/theme';

@Component({
  selector: 'nb-collapsable-showcase',
  template: `
    <ng-template
      #collapsable
      [nbCollapsable]="collapsable"
      [nbCollapsableContext]="{ name: fakeNames[index] }"
      nbCollapsableTitle="User"
      let-name="name"
    >
      <nb-user
        size="large"
        name="{{ name }}"
        title="Reservior Dog"
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
      /deep/ nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class NbCollapsableShowcaseComponent {
  @ViewChild(NbCollapsableDirective) userWindow: NbCollapsableDirective;

  fakeNames = [
    'Mr.White',
    'Mr. Orange',
    'Mr. Blonde',
    'Mr. Pink',
    'Mr. Blue',
    'Mr. Brown',
    'Nice Guy',
    'Joe Cabot',
  ];

  index = 0;

  changeIndex() {
    this.index++;
    if (this.index >= this.fakeNames.length) {
      this.index = this.index - this.fakeNames.length;
    }
  }

  onClick() {
    this.changeIndex();
    this.userWindow.show();
  }
}
