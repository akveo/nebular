import { Component } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { FormComponent } from './components/form.component';

@Component({
  template: `
  <button (click)="openWindow()" nbButton>Open window</button>

    <div class="nb-controls-wrapper">
      <div class="nb-button-control">
        <input [(ngModel)]="disableMinimize" type="checkbox" id="disableMinimize">
        <label class="nb-checkbox-label" for="disableMinimize">Disable minimize:</label>
        <span>{{disableMinimize}}</span>
      </div>

      <div class="nb-button-control">
        <input [(ngModel)]="disableMaximize" type="checkbox" id="disableMaximize">
        <label class="nb-checkbox-label" for="disableMaximize">Disable maximize:</label>
        <span>{{disableMaximize}}</span>
      </div>

      <div class="nb-button-control">
        <input [(ngModel)]="disableExpandCollapse" type="checkbox" id="disableExpandCollapse">
        <label class="nb-checkbox-label" for="disableExpandCollapse">Disable expand collapse:</label>
        <span>{{disableExpandCollapse}}</span>
      </div>

    </div>
  `,
  styleUrls: ['./window.scss'],
})
export class WindowControlsComponent {

  disableMinimize = false;
  disableMaximize = false;
  disableExpandCollapse = false;

  constructor(private windowService: NbWindowService) { }

  openWindow() {
    this.windowService.open(FormComponent, {
      title: `Window`,
      buttonConfig: {
        disableExpandCollapse: this.disableExpandCollapse,
        disableMaximize: this.disableMaximize,
        disableMinimize: this.disableMinimize,
      },
    });
  }


}
