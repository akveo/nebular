import { Component, ViewChild } from '@angular/core';
import { NbCollapsibleWindowDirective } from '@nebular/theme';

@Component({
  selector: 'nb-collapsible-window-showcase',
  template: `
    <ng-template
      #collapsible
      [nbCollapsibleWindow]="collapsible"
      [nbCollapsibleWindowContext]="{ name: fakeNames[index] }"
      nbCollapsibleWindowTitle="User"
      let-name="name"
    ><nb-user
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
      /deep/ nb-collapsable-component.expanded nb-user {
        width: 500px;
      }
      /deep/ nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class NbCollapsibleWindowShowcaseComponent {
  @ViewChild(NbCollapsibleWindowDirective) userWindow: NbCollapsibleWindowDirective;

  fakeNames = [
    'Mr.White1111111111111111111111111111111111',
    'Mr. Orange11111111111111111',
    'Mr. Blonde1111111111111111',
    'Mr. Pink1111111111111111111111',
    'Mr. Blue11111111111111111',
    'Mr. Brown1111111111111',
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
