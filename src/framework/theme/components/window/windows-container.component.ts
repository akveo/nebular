import { Component, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'nb-windows-container',
  template: `<ng-container #viewContainerRef></ng-container>`,
  styleUrls: ['./windows-container.component.scss'],
})
export class NbWindowsContainerComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
}
