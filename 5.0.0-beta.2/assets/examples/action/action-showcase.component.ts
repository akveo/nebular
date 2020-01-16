import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';

@Component({
  selector: 'nb-action-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-showcase.component.html',
})
export class ActionShowcaseComponent {
  disabledIconConfig: NbIconConfig = { icon: 'settings-2-outline', pack: 'eva' };
}
