import { Component, Input } from '@angular/core';
import { NbSortDirection } from '@nebular/theme';

@Component({
  selector: 'nb-sort-icon',
  template: `
    <ng-container *ngIf="isDirectionSet()">
      <i [class.nb-arrow-down]="isAscending()"
         [class.nb-arrow-up]="isDescending()"
         aria-hidden="true">
      </i>
    </ng-container>
  `,
})
export class SortIconComponent {
  @Input() direction: NbSortDirection = NbSortDirection.NONE;

  isAscending(): boolean {
    return this.direction === NbSortDirection.ASCENDING;
  }

  isDescending(): boolean {
    return this.direction === NbSortDirection.DESCENDING;
  }

  isDirectionSet(): boolean {
    return this.isAscending() || this.isDescending();
  }
}
