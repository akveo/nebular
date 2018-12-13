import { Component } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { NbFormComponent } from './components/form.component';

@Component({
  template: `<button (click)="openWindow()" nbButton>Open window</button>`,
  styleUrls: [ './window.scss' ],
})
export class NbWindowShowcaseComponent {

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    this.windowService.open(NbFormComponent, { title: `Window` });
  }
}
