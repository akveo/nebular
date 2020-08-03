import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-hero.component.html',
})
export class ButtonHeroComponent {
}
