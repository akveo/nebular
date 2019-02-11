import { Directive, Injectable, Input, IterableDiffer, IterableDiffers, TemplateRef } from '@angular/core';
import {
  NbCdkCellDef,
  NbCdkFooterCellDef,
  NbCdkFooterRowDef,
  NbCdkHeaderCellDef,
  NbCdkHeaderRowDef,
  NbCdkRowDef,
  NbCellDefDirective,
  NbFooterCellDefDirective,
  NbFooterRowDefDirective,
  NbHeaderCellDefDirective,
  NbHeaderRowDefDirective,
  NbRowDefDirective,
} from '../cdk/table';

@Injectable()
export class NbColumnsService {
  private allColumns: string[];
  private visibleColumns: string[];
  private _changesDiffer: IterableDiffer<any>;

  constructor(private differs: IterableDiffers) {}

  setColumns(columns: Iterable<string>): void {
    if (!this._changesDiffer) {
      this._changesDiffer = this.differs.find(columns || []).create();
    }

    if (this._changesDiffer.diff(columns)) {
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
    }
  }

  showColumn(column: string): void {
    if (this.visibleColumns.includes(column)) {
      return;
    }
    this.visibleColumns.splice(this.findInsertIndex(column), 0, column);
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

export interface NbTreeGridResponsiveRowDef {
  hideColumn(column: string);
  showColumn(column: string);
}

/**
 * Data row definition for the tree-grid.
 * Captures the header row's template and columns to display.
 */
@Directive({
  selector: '[nbTreeGridRowDef]',
  providers: [
    { provide: NbCdkRowDef, useExisting: NbTreeGridRowDefDirective },
    NbColumnsService,
  ],
})
export class NbTreeGridRowDefDirective<T> extends NbRowDefDirective<T> implements NbTreeGridResponsiveRowDef {
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridRowDefColumns')
  set columns(value: Iterable<string>) {
    this.columnsService.setColumns(value)
  }
  get columns(): Iterable<string> {
    return this.columnsService.getVisibleColumns();
  }

  constructor(
    template: TemplateRef<any>,
    differs: IterableDiffers,
    private columnsService: NbColumnsService,
  ) {
    super(template, differs);
  }

  /** @docs-private */
  hideColumn(column: string): void {
    this.columnsService.hideColumn(column);
  }

  /** @docs-private */
  showColumn(column: string): void {
    this.columnsService.showColumn(column);
  }
}

@Directive({
  selector: '[nbTreeGridHeaderRowDef]',
  providers: [
    { provide: NbCdkHeaderRowDef, useExisting: NbTreeGridHeaderRowDefDirective },
    NbColumnsService,
  ],
})
export class NbTreeGridHeaderRowDefDirective extends NbHeaderRowDefDirective implements NbTreeGridResponsiveRowDef {
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridHeaderRowDef')
  set columns(value: Iterable<string>) {
    this.columnsService.setColumns(value)
  }
  get columns(): Iterable<string> {
    return this.columnsService.getVisibleColumns();
  }

  constructor(
    template: TemplateRef<any>,
    differs: IterableDiffers,
    private columnsService: NbColumnsService,
  ) {
    super(template, differs);
  }

  /** @docs-private */
  hideColumn(column: string): void {
    this.columnsService.hideColumn(column);
  }

  /** @docs-private */
  showColumn(column: string): void {
    this.columnsService.showColumn(column);
  }
}

@Directive({
  selector: '[nbTreeGridFooterRowDef]',
  providers: [
    { provide: NbCdkFooterRowDef, useExisting: NbTreeGridFooterRowDefDirective },
    NbColumnsService,
  ],
})
export class NbTreeGridFooterRowDefDirective extends NbFooterRowDefDirective implements NbTreeGridResponsiveRowDef {
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridFooterRowDef')
  set columns(value: Iterable<string>) {
    this.columnsService.setColumns(value)
  }
  get columns(): Iterable<string> {
    return this.columnsService.getVisibleColumns();
  }

  constructor(
    template: TemplateRef<any>,
    differs: IterableDiffers,
    private columnsService: NbColumnsService,
  ) {
    super(template, differs);
  }

  /** @docs-private */
  hideColumn(column: string): void {
    this.columnsService.hideColumn(column);
  }

  /** @docs-private */
  showColumn(column: string): void {
    this.columnsService.showColumn(column);
  }
}

/**
 * Cell definition for a nb-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridCellDef]',
  providers: [{ provide: NbCdkCellDef, useExisting: NbTreeGridCellDefDirective }],
})
export class NbTreeGridCellDefDirective extends NbCellDefDirective {}

/**
 * Header cell definition for the nb-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridHeaderCellDef]',
  providers: [{ provide: NbCdkHeaderCellDef, useExisting: NbTreeGridHeaderCellDefDirective }],
})
export class NbTreeGridHeaderCellDefDirective extends NbHeaderCellDefDirective {}

/**
 * Footer cell definition for the nb-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridFooterCellDef]',
  providers: [{ provide: NbCdkFooterCellDef, useExisting: NbTreeGridFooterCellDefDirective }],
})
export class NbTreeGridFooterCellDefDirective extends NbFooterCellDefDirective {}
