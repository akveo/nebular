import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nb-chips-removable',
  templateUrl: './chips-removable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChipsRemovableComponent {
  chips = [{ caption: 'chip #1' }, { caption: 'chip #2' }, { caption: 'chip #3' }];

  remove(chip) {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }
}
