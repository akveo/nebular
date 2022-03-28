import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'npg-pagination-showcase',
  templateUrl: './pagination-showcase.component.html',
  styleUrls: ['./pagination-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationShowcaseComponent {
  totalCount = 5;

  constructor() {}
}
