import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-card-colors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert-colors.component.html',
  styleUrls: ['./alert-example.component.scss'],
})
export class AlertColorsComponent {
}
