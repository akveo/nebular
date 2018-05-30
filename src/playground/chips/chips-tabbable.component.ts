import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nb-chips-tabbable',
  templateUrl: './chips-tabbable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChipsTabbableComponent {
  chips = [{ caption: 'chip #1' }, { caption: 'chip #2' }, { caption: 'chip #3' }];
}
