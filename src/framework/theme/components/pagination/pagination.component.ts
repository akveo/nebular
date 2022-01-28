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
import { NbSelectComponent } from '../select/select.component';

@Component({
  selector: 'nb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbPaginationComponent implements OnInit, AfterViewInit {
  /**
   * Options to change limit of items on page. Default value: [10, 15, 20, 50]
   */
  @Input() pageSizeOptions: number[] = [10, 15, 20, 50];

  /**
   * Show or not page size options
   */
  @Input() showPageSizeOptions: boolean = true;

  /**
   * Total items to be paginated
   */
  @Input() totalCount: number;

  /**
   * Number of items per page
   */
  @Input() itemsPerPage?: number = 10;

  /**
   * Current active page
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
    if (this.showPageSizeOptions) {
      this.paginationSelect.button.nativeElement.style.minWidth = '5rem';
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
