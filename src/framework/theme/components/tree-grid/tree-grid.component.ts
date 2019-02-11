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
 * Tree grid component that can be used to display nested rows of data.
 * Supports filtering and sorting.
 * @stacked-example(Showcase, tree-grid/tree-grid-showcase.component)
 *
 * Data provided to source should match [NbTreeGridNode](docs/components/treegrid/api#nbtreegridnode) interface.
 * As the most basic usage you need to define [nbTreeGridRowDef](docs/components/treegrid/api#nbtreegridrowdefdirective)
 * where you should pass columns to display in rows and
 * [nbTreeGridColumnDef](docs/components/treegrid/api#nbtreegridcolumndefdirective) - a column definition for each
 * column passed to row definition.
 * @stacked-example(Basic, tree-grid/tree-grid-basic.component)
 *
 * To use sorting you can add `nbSort` directive to table and subscribe to `sort` method. When user click on header,
 * sort event will be emitted. Event object contain clicked column name and desired sort direction.
 * @stacked-example(Sortable, tree-grid/tree-grid-sortable.component)
 *
 * You can use `NbTreeGridDataSourceBuilder` to create `NbTreeGridDataSource` which would have toggle, sort and
 * filter methods. Then you can call this methods to change sort or toggle rows programmatically. Also `nbSort` and
 * `nbFilterInput` directives both support `NbTreeGridDataSource`, so you can pass it directly as an input and
 * directives will trigger sort, toggle themselves.
 * @stacked-example(NbTreeGridDataSource, tree-grid/tree-grid-showcase.component)
 *
 * @styles
 *
 * tree-grid-cell-border-width
 * tree-grid-cell-border-style
 * tree-grid-cell-border-color
 * tree-grid-row-min-height
 * tree-grid-cell-padding
 * tree-grid-sort-header-button-background
 * tree-grid-sort-header-button-border
 * tree-grid-sort-header-button-padding
 * tree-grid-sort-header-button-font-weight
 * tree-grid-header-bg
 * tree-grid-footer-bg
 * tree-grid-row-bg
 * tree-grid-row-bg-even
 * tree-grid-row-hover-bg
 * tree-grid-sort-header-button-color
 */
@Component({
  selector: 'table[nbTreeGrid]',
  template: NB_TABLE_TEMPLATE,
  styleUrls: ['./tree-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NB_TREE_GRID, useExisting: NbTreeGridComponent }],
})
export class NbTreeGridComponent<T> extends NbTable<NbTreeGridPresentationNode<T>>
                                    implements AfterViewInit, OnDestroy {

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<T>,
              differs: IterableDiffers,
              changeDetectorRef: ChangeDetectorRef,
              elementRef: ElementRef,
              @Attribute('role') role: string,
              dir: NbDirectionality,
              @Inject(NB_DOCUMENT) document: any,
              platform: NbPlatform | undefined,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
  }

  private alive: boolean = true;
  private _source: NbTreeGridDataSource<T>;

  /**
   * The table's data
   * @param data
   * @type {NbTreeGridNode<T>[] | NbTreeGridDataSource}
   */
  @Input('nbTreeGrid') set source(data: NbTreeGridNode<T>[]) {
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

  ngAfterViewInit() {
    this.checkDefsCount();
    merge(this._contentRowDefs.changes, this._contentHeaderRowDefs.changes)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.checkDefsCount());
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.alive = false;
  }

  toggleRow(row: NbTreeGridRowComponent, options?: NbToggleOptions): void {
    this._source.toggleByIndex(this.getDataIndex(row), options);
  }

  toggleCellRow(cell: NbTreeGridCellDirective): void {
    this.toggleRow(this.findCellRow(cell));
  }

  getColumnWidth(): string {
    return `${100 / this.getColumnsCount()}%`;
  }

  getCellPadding(cell: NbTreeGridCellDirective, columnName: string): number {
    const isFirstColumn = this.isFirstColumn(columnName);
    const row = isFirstColumn && this.findCellRow(cell);
    if (isFirstColumn && row) {
      return this.getRowLevel(row) * this.levelPadding;
    }

    return 0;
  }

  private getDataIndex(row: NbTreeGridRowComponent): number {
    const rowEl = row.elementRef.nativeElement;
    const parent = rowEl.parentElement;
    if (parent) {
      return Array.from(parent.children)
        .filter((child: Element) => child.hasAttribute('nbtreegridrow'))
        .indexOf(rowEl);
    }

    return -1;
  }

  private getRowLevel(row: NbTreeGridRowComponent): number {
    return this._source.getLevel(this.getDataIndex(row));
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

    return this.rows.toArray()
      .find((row: NbTreeGridRowComponent) => {
        return row.elementRef.nativeElement === cellRowElement;
      });
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
