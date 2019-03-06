import { Injectable, IterableDiffer, IterableDiffers } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';


@Injectable()
export class NbColumnsService {
  private allColumns: string[];
  private visibleColumns: string[];
  private changesDiffer: IterableDiffer<any>;
  private columnHide$: Subject<void> = new Subject<void>();
  private columnShow$: Subject<void> = new Subject<void>();

  constructor(private differs: IterableDiffers) {}

  setColumns(columns: Iterable<string>): void {
    if (!this.changesDiffer) {
      this.changesDiffer = this.differs.find(columns || []).create();
    }

    if (this.changesDiffer.diff(columns)) {
      this.allColumns = Array.from(columns);
      this.visibleColumns = Array.from(columns);
    }
  }

  getVisibleColumns(): string[] {
    return this.visibleColumns;
  }

  hideColumn(column: string): void {
    const toRemove = this.visibleColumns.indexOf(column);
    if (toRemove > -1) {
      this.visibleColumns.splice(toRemove, 1);
      this.columnHide$.next();
    }
  }

  showColumn(column: string): void {
    if (this.visibleColumns.includes(column)) {
      return;
    }
    this.visibleColumns.splice(this.findInsertIndex(column), 0, column);
    this.columnShow$.next();
  }

  onColumnsChange(): Observable<void> {
    return merge(this.columnShow$, this.columnHide$);
  }

  private findInsertIndex(column: string): number {
    const initialIndex = this.allColumns.indexOf(column);

    if (initialIndex === 0 || !this.visibleColumns.length) {
      return 0;
    }
    if (initialIndex === this.allColumns.length - 1) {
      return this.visibleColumns.length;
    }

    const leftSiblingIndex = initialIndex - 1;
    for (let i = leftSiblingIndex; i >= 0; i--) {
      const leftSibling = this.allColumns[i];
      const index = this.visibleColumns.indexOf(leftSibling);
      if (index !== -1) {
        return index + 1;
      }
    }

    const rightSiblingIndex = initialIndex + 1;
    for (let i = rightSiblingIndex; i < this.allColumns.length; i++) {
      const rightSibling = this.allColumns[i];
      const index = this.visibleColumns.indexOf(rightSibling);
      if (index !== -1) {
        return index;
      }
    }

    throw new Error(`Can't restore column position.`);
  }
}
