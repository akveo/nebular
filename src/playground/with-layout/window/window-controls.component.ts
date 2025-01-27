import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';

import { FormComponent } from './components/form.component';

@Component({
  templateUrl: 'window-controls.component.html',
  styleUrls: ['./window.scss', './window-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class WindowControlsComponent {
  minimize = true;
  maximize = true;
  fullScreen = true;
  close = true;

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: this.minimize,
      maximize: this.maximize,
      fullScreen: this.fullScreen,
      close: this.close,
    };

    this.windowService.open(FormComponent, { title: `Window`, buttons: buttonsConfig });
  }
}
