import { Component } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { NbMyWindowComponent } from './window-showcase.component';

@Component({
  template: `
    <button (click)="openWindowWithBackdrop()" nbButton>Open window with backdrop</button>
    <button (click)="openWindowWithoutBackdrop()" nbButton>Open window without backdrop</button>
  `,
  styleUrls: [ './window.scss' ],
})
export class NbWindowsBackdropComponent {

  constructor(private windowService: NbWindowService) {}

  openWindowWithBackdrop() {
    this.windowService.open(NbMyWindowComponent, { title: 'Window with backdrop' });
  }

  openWindowWithoutBackdrop() {
    this.windowService.open(NbMyWindowComponent, { title: 'Window without backdrop', hasBackdrop: false });
  }
}
