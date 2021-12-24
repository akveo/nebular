import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-shapes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-shapes.component.html',
})
export class ButtonShapesComponent {
}
