import { Component, HostBinding, Input } from '@angular/core';
import { NbSortDirection } from '@nebular/theme';

@Component({
  selector: 'nb-sort-icon',
  template: `
    <i [class.nb-arrow-down]="isAscending()"
       [class.nb-arrow-up]="isDescending()">
    </i>
  `,
})
export class SortIconComponent {
  @HostBinding('attr.aria-hidden') readonly ariaHidden = true;
  @Input() direction: NbSortDirection = NbSortDirection.NONE;

  isAscending(): boolean {
    return this.direction === NbSortDirection.ASCENDING;
  }

  isDescending(): boolean {
    return this.direction === NbSortDirection.DESCENDING;
  }
}
