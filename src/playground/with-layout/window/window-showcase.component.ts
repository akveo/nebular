import { Component } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { FormComponent } from './components/form.component';

@Component({
    template: `<button (click)="openWindow()" nbButton>Open window</button>`,
    styleUrls: ['./window.scss'],
    standalone: false
})
export class WindowShowcaseComponent {

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    this.windowService.open(FormComponent, { title: `Window` });
  }
}
