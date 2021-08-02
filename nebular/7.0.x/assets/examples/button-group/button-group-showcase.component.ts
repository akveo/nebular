import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-group-showcase',
  templateUrl: './button-group-showcase.component.html',
  styleUrls: ['./button-group-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupShowcaseComponent {
  isBold = false;
  isItalic = true;
  isUnderline = false;
}
