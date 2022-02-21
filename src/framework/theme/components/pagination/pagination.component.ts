/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
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

  previousPages: number[];
  nextPages: number[];
  lastPage: number;
  pageSizeSelected: number;

  @ViewChild('paginationSelect')
  paginationSelect: NbSelectComponent;

  ngOnInit(): void {
    this.generatePreviousAndLastAndNextPages();
    this.pageSizeSelected = this.pageSizeOptions[0] || 10;
  }

  ngAfterViewInit(): void {
    console.log(this.totalCount);
    if (this.showPageSizeOptions) {
      const nativeElement = this.paginationSelect.button?.nativeElement;
      if (nativeElement) {
        nativeElement.style.minWidth = '5rem';
      }
    }
  }

  generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => from + index + 1).filter((page) => page > 0);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
    this.generatePreviousAndLastAndNextPages();
  }

  onPageSizeOptionChange(perPage: number) {
    this.itemsPerPage = perPage;
    this.currentPage = 1;
    this.itemsPerPageChanged.emit(this.itemsPerPage);
    this.generatePreviousAndLastAndNextPages();
  }

  generatePreviousAndLastAndNextPages() {
    this.generatePreviousPages();
    this.generateLastPage();
    this.generateNextPages();
  }

  generatePreviousPages() {
    this.previousPages =
      this.currentPage > 1
        ? this.generatePagesArray(this.currentPage - 1 - this.siblingsCount, this.currentPage - 1)
        : [];
  }

  generateNextPages() {
    this.nextPages =
      this.currentPage < this.lastPage
        ? this.generatePagesArray(this.currentPage, Math.min(this.currentPage + this.siblingsCount, this.lastPage))
        : [];
  }

  generateLastPage() {
    this.lastPage = Math.ceil(this.totalCount / this.itemsPerPage);
  }
}
