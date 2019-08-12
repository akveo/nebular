import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-hero.component.html',
  styles: [`
    [nbButton] {
      margin-right: 0.75rem;
      margin-bottom: 1rem;
    }
  `],
})
export class ButtonHeroComponent {
}
