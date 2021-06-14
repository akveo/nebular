import { Component } from '@angular/core';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { FormComponent } from './components/form.component';

@Component({
  template: `
    <div class="nb-controls-content">
      <div class="nb-controls-wrapper">
        <div>
          Buttons config:
        </div>
        <br>
        <div class="nb-button-control">
          <input [(ngModel)]="buttonsConfig.minimize" type="checkbox" id="disableMinimize">
          <label class="nb-checkbox-label" for="disableMinimize">Minimize</label>
        </div>

        <div class="nb-button-control">
          <input [(ngModel)]="buttonsConfig.maximize" type="checkbox" id="disableMaximize">
          <label class="nb-checkbox-label" for="disableMaximize">Maximize</label>
        </div>

        <div class="nb-button-control">
          <input [(ngModel)]="buttonsConfig.expandCollapse" type="checkbox" id="disableExpandCollapse">
          <label class="nb-checkbox-label" for="disableExpandCollapse">Expand-collapse</label>
        </div>
      </div>
      <div class="nb-controls-open">
        <button (click)="openWindow()" nbButton>Open window</button>
      </div>
    </div>
  `,
  styleUrls: ['./window.scss'],
})
export class WindowControlsComponent {

  buttonsConfig: NbWindowControlButtonsConfig = {
    minimize: true,
    maximize: true,
    expandCollapse: true,
  }

  constructor(private windowService: NbWindowService) { }

  openWindow() {
    this.windowService.open(FormComponent, { title: `Window`, buttons: this.buttonsConfig });
  }
}
