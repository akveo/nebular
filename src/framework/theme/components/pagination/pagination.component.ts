/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NbComponentStatus } from '../component-status';
import { NbSelectComponent } from '../select/select.component';

/**
 * Basic pagination component.
 *
 * The pagination component is a combination of the "button", "icon" and "select" components.
 *
 * @stacked-example(Showcase, pagination/pagination-showcase.component)
 *
 * ### Installation
 *
 * Import `NbPaginationModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbPaginationModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 */
@Component({
  selector: 'nb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbPaginationComponent implements OnInit, AfterViewInit {
  /**
   * Optional. Options to change limit of items on page. Default value: `[10, 15, 20, 50]`
   */
  @Input() pageSizeOptions?: number[] = [10, 15, 20, 50];

  /**
   * Optional. Show or not page size options
   */
  @Input() showPageSizeOptions?: boolean = true;

  /**
   * Required. Total items to be paginated
   */
  @Input() totalCount: number;

  /**
   * Optional. Number of items per page. Default value is `10`
   */
  @Input() itemsPerPage?: number = 10;

  /**
   * Optional. Force current active page
   */
  @Input() currentPage?: number = 1;

  /**
   * Maximum number of "neighboring" items, which will not be hidden by "..." (dots)
   */
  @Input() siblingsCount?: number = 1;

  /**
   * Will be emitted when page value changes.
   * */
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Will be emitted when items per page option value changes. When the value changes, `currentPage` will become 1
   * */
  @Output() itemsPerPageChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Text "show" that will be displayed on page size options. Default value is "Mostrar"
   */
  @Input() textShow: string = 'Mostrar';

  /**
   * Text "of" that will be displayed on page size options. Default value is "de".
   */
  @Input() textOf: string = 'de';

  /**
   * Optional. Text "results" that will be displayed on page size options. Default value is "resultados".
   */
  @Input() textItems: string = 'resultados';

  /**
   * Optional. Set background color on current active page
   */
  @Input() status: NbComponentStatus = 'primary';

  /**
   * Optional. Disable actions (change page and page size) on pagination
   */
  @Input() disabled?: boolean = false;

  paginationRange: any[] = [];
  lastPage: number;
  pageSizeSelected: number;

  @ViewChild('paginationSelect')
  paginationSelect: NbSelectComponent;

  DOTS = '...';

  ngOnInit(): void {
    this.generatePaginationRange();
    this.pageSizeSelected = this.pageSizeOptions[0] || 10;
  }

  ngAfterViewInit(): void {
    if (this.showPageSizeOptions) {
      const nativeElement = this.paginationSelect.button?.nativeElement;
      if (nativeElement) {
        nativeElement.style.minWidth = '5rem';
      }
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
    this.generatePaginationRange();
  }

  onPageSizeOptionChange(perPage: number) {
    this.itemsPerPage = perPage;
    this.currentPage = 1;
    this.itemsPerPageChanged.emit(this.itemsPerPage);
    this.generatePaginationRange();
  }

  range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  }

  generatePaginationRange() {
    const totalPageCount = Math.ceil(this.totalCount / this.itemsPerPage);
    this.lastPage = totalPageCount;
    const totalPageNumbers = this.siblingsCount + 5;

    if (totalPageNumbers >= totalPageCount || totalPageCount === 7) {
      this.paginationRange = this.range(1, totalPageCount);
      return;
    }

    const leftSiblingIndex = Math.max(this.currentPage - this.siblingsCount, 1);
    const rightSiblingIndex = Math.min(this.currentPage + this.siblingsCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * this.siblingsCount;
      const leftRange = this.range(1, leftItemCount);

      this.paginationRange = [...leftRange, this.DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * this.siblingsCount;
      const rightRange = this.range(totalPageCount - rightItemCount + 1, totalPageCount);
      this.paginationRange = [firstPageIndex, this.DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = this.range(leftSiblingIndex, rightSiblingIndex);
      this.paginationRange = [firstPageIndex, this.DOTS, ...middleRange, this.DOTS, lastPageIndex];
    }
  }
}
