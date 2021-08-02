import { Component } from '@angular/core';
import { NbButtonAppearance, NbComponentStatus, NbComponentShape, NbComponentSize } from '@nebular/theme';

@Component({
  templateUrl: 'button-interactive.component.html',
  styleUrls: [ './button-interactive.component.scss' ],
})
export class ButtonInteractiveComponent {
  appearances: NbButtonAppearance[] = [ 'filled', 'outline', 'ghost', 'hero' ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  statuses: NbComponentStatus[] = [ 'basic', 'primary', 'success', 'info', 'warning', 'danger', 'control' ];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];

  selectedShape: NbComponentShape = 'rectangle';
  selectedSize: NbComponentSize = 'medium';
  showDisabledRow = true;
}
