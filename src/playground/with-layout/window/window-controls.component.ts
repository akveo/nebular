import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';

import { FormComponent } from './components/form.component';

@Component({
  templateUrl: 'window-controls.component.html',
  styleUrls: ['./window.scss', './window-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowControlsComponent {

  minimize = true;
  maximize = true;
  expandCollapse = true;

  constructor(private windowService: NbWindowService) { }

  openWindow() {
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: this.minimize,
      maximize: this.maximize,
      expandCollapse: this.expandCollapse,
    };

    this.windowService.open(FormComponent, { title: `Window`, buttons: buttonsConfig });
  }
}
