/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  IterableDiffers,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { merge } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { NB_DOCUMENT } from '../../theme.options';
import { NbPlatform } from '../cdk/platform';
import { NbDirectionality } from '../cdk/bidi';
import { NB_TABLE_TEMPLATE, NbTable } from '../cdk/table';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from './data-source/tree-grid-data-source';
import { NbTreeGridNode, NbTreeGridPresentationNode } from './data-source/tree-grid.model';
import { NbToggleOptions } from './data-source/tree-grid.service';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridRowComponent } from './tree-grid-row.component';
import { NbTreeGridCellDirective } from './tree-grid-cell.component';

/**
 * NbTreeGridComponent
 * @stacked-example(Showcase, tree-grid/tree-grid-showcase.component)
 */
@Component({
  selector: 'nb-tree-grid, table[nbTreeGrid]',
  template: NB_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NbTable, useExisting: NbTreeGridComponent },
    { provide: NB_TREE_GRID, useExisting: NbTreeGridComponent },
  ],
})
export class NbTreeGridComponent<T> extends NbTable<NbTreeGridPresentationNode<T>> implements AfterViewInit, OnDestroy {

  // TODO get rid of this
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<T>,
              differs: IterableDiffers,
              changeDetectorRef: ChangeDetectorRef,
              elementRef: ElementRef,
              @Attribute('role') role: string,
              dir: NbDirectionality,
              @Inject(NB_DOCUMENT) document: any,
              platform: NbPlatform  | undefined,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
  }

  private alive: boolean = true;
  private _source: NbTreeGridDataSource<T>;

  @Input() set source(data: NbTreeGridNode<T>[]) {
    if (data instanceof NbTreeGridDataSource) {
      this._source = data;
    } else {
      this._source = this.dataSourceBuilder.create(data);
    }
    this.dataSource = this._source;
  }

  @Input() levelPadding: number = 1;
  @Input() levelPaddingUnit: string = 'rem';

  @ContentChildren(NbTreeGridRowComponent) private rows: QueryList<NbTreeGridRowComponent>;
  @ContentChildren(NbTreeGridRowComponent, { read: ElementRef }) private rowElements: QueryList<ElementRef<Element>>;
  @ContentChildren(NbTreeGridCellDirective, { descendants: true }) private cells: QueryList<NbTreeGridCellDirective>;

  ngAfterViewInit() {
    this._changeDetectorRef.detectChanges();

    this.checkDefsCount();
    merge(this._contentRowDefs.changes, this._contentHeaderRowDefs.changes)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.checkDefsCount());
  }

  ngOnDestroy() {
    this.alive = false;
  }

  toggleRow(row: NbTreeGridRowComponent, options?: NbToggleOptions): void {
    return this._source.toggleByIndex(this.getRowIndex(row), options);
  }

  getColumnWidth(): string {
    return `${100 / this.getColumnsCount()}%`;
  }

  getCellPadding(cell: NbTreeGridCellDirective, columnName: string): string {
    const isFirstColumn = this.isFirstColumn(columnName);
    const row = isFirstColumn && this.findCellRow(cell);
    if (isFirstColumn && row) {
      const nestingLevel = this.getRowLevel(row);
      return `${nestingLevel * this.levelPadding}${this.levelPaddingUnit}`;
    }

    return '0';
  }

  private getRowIndex(row: NbTreeGridRowComponent): number {
    return this.rows.toArray().indexOf(row);
  }

  private getRowLevel(row: NbTreeGridRowComponent): number {
    return this._source.getLevel(this.getRowIndex(row));
  }

  private getColumns(): string[] {
    const { columns } = this._contentHeaderRowDefs.length
      ? this._contentHeaderRowDefs.first
      : this._contentRowDefs.first;

    return Array.from(columns || []);
  }

  private getColumnsCount(): number {
    return this.getColumns().length;
  }

  private isFirstColumn(columnName: string): boolean {
    return this.getColumns()[0] === columnName;
  }

  private findCellRow(cell: NbTreeGridCellDirective): NbTreeGridRowComponent | undefined {
    const cellRowElement = cell.elementRef.nativeElement.parentElement;
    const rowIndex = this.rowElements.toArray()
      .findIndex((rowElement: ElementRef) => rowElement.nativeElement === cellRowElement);

    return this.rows.toArray()[rowIndex];
  }

  private checkDefsCount(): void {
    if (this._contentRowDefs.length > 1) {
      throw new Error(`Found multiple row definitions`);
    }
    if (this._contentHeaderRowDefs.length > 1) {
      throw new Error(`Found multiple cell definitions`);
    }
  }
}
