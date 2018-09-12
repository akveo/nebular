import { Component } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

@Component({
  template: 'My component inside a window',
})
export class NbMyWindowComponent {}

@Component({
  template: `<button (click)="openWindow()" nbButton>Open window</button>`,
  styleUrls: [ './window.scss' ],
})
export class NbWindowShowcaseComponent {

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    this.windowService.open(NbMyWindowComponent, { title: `Window` });
  }
}
