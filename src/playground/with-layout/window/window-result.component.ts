import {Component} from '@angular/core';
import {NbWindowService} from '../../../framework/theme/components/window/window.service';
import {VisitorsFormComponent} from './components/visitors-form.component';

@Component({
  selector: 'nb-window-result',
  template: `
    <button nbButton status="primary" (click)="openWindow()">Open window</button>
    <br>
    <h3 class="h5">Names:</h3>
    <ul>
      <li *ngFor="let name of names">{{ name }}</li>
    </ul>
  `,
  styleUrls: ['./window.scss'],
})
export class WindowResultComponent {
  names: string[] = [];

  constructor(private windowService: NbWindowService) {
  }

  openWindow() {
    this.windowService.open(VisitorsFormComponent, {title: `Window`})
      .onClose.subscribe((name: string) => name && this.names.push(name));
  }
}
