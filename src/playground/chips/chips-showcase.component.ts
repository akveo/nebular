import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nb-chips-showcase',
  templateUrl: './chips-showcase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChipsShowcaseComponent {
  chips = [{ caption: 'chip #1' }, { caption: 'chip #2' }, { caption: 'chip #3' }];
}
