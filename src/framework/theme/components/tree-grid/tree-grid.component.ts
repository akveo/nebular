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
  HostBinding,
  Inject,
  Input,
  IterableDiffers,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, takeWhile } from 'rxjs/operators';

import { NB_DOCUMENT, NB_WINDOW } from '../../theme.options';
import { NbPlatform } from '../cdk/platform/platform-service';
import { NbDirectionality } from '../cdk/bidi/bidi-service';
import { NB_TABLE_TEMPLATE, NbTable } from '../cdk/table/table.module';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from './data-source/tree-grid-data-source';
import { NB_DEFAULT_ROW_LEVEL, NbTreeGridPresentationNode } from './data-source/tree-grid.model';
import { NbToggleOptions } from './data-source/tree-grid.service';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridRowComponent } from './tree-grid-row.component';
import { NbTreeGridCellDirective } from './tree-grid-cell.component';
import { convertToBoolProperty } from '../helpers';
import { NbTreeGridColumnDefDirective } from './tree-grid-column-def.directive';
import {
  NbTreeGridFooterRowDefDirective,
  NbTreeGridHeaderRowDefDirective,
  NbTreeGridRowDefDirective,
} from './tree-grid-def.component';
import { NbColumnsService } from './tree-grid-columns.service';

/**
 * Tree grid component that can be used to display nested rows of data.
 * Supports filtering and sorting.
 * @stacked-example(Showcase, tree-grid/tree-grid-showcase.component)
 *
 * ### Installation
 *
 * Import `NbTreeGridModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTreeGridModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * As the most basic usage you need to define [nbTreeGridRowDef](docs/components/treegrid/api#nbtreegridrowdefdirective)
 * where you should pass columns to display in rows and
 * [nbTreeGridColumnDef](docs/components/treegrid/api#nbtreegridcolumndefdirective) - component containing cell
 * definitions for each column passed to row definition.
 * @stacked-example(Basic, tree-grid/tree-grid-basic.component)
 *
 * `NbTreeGridComponent`'s source input and `NbTreeGridDataSourceBuilder.create` expecting data to be an array of
 * objects with `data`, `children` and `expanded` properties. If your data doesn't match this interface, you can pass
 * getter functions for each property as arguments to `NbTreeGridDataSourceBuilder.create` method.
 * @stacked-example(Custom node structure, tree-grid/tree-grid-custom-node-structure.component)
 *
 * To use sorting you can add `nbSort` directive to table and subscribe to `sort` method. When user click on header,
 * sort event will be emitted. Event object contain clicked column name and desired sort direction.
 * @stacked-example(Sortable, tree-grid/tree-grid-sortable.component)
 *
 * You can use `Data Source Builder` to create `NbTreeGridDataSource` which would have toggle, sort and
 * filter methods. Then you can call this methods to change sort or toggle rows programmatically. Also `nbSort` and
 * `nbFilterInput` directives both support `NbTreeGridDataSource`, so you can pass it directly as an input and
 * directives will trigger sort, toggle themselves.
 * @stacked-example(Data Source Builder, tree-grid/tree-grid-showcase.component)
 *
 * You can create responsive grid by setting `hideOn` and `showOn` inputs of
 * [nbTreeGridColumnDef](docs/components/tree-grid/api#nbtreegridcolumndefdirective) directive.
 * When viewport reaches specified width grid hides or shows columns.
 * @stacked-example(Responsive columns, tree-grid/tree-grid-responsive.component)
 *
 * To customize sort or row toggle icons you can use `nbSortHeaderIcon` and `nbTreeGridRowToggle` directives
 * respectively. `nbSortHeaderIcon` is a structural directive and it's implicit context set to current direction.
 * Also context has three properties: `isAscending`, `isDescending` and `isNone`.
 * @stacked-example(Custom icons, tree-grid/tree-grid-custom-icons.component)
 *
 * By default, row to toggle happens when user clicks anywhere in the row. Also double click expands row deeply.
 * To disable this you can set `[clickToToggle]="false"` input of `nbTreeGridRow`.
 * @stacked-example(Disable click toggle, tree-grid/tree-grid-disable-click-toggle.component)
 *
 * @styles
 *
 * tree-grid-cell-border-width:
 * tree-grid-cell-border-style:
 * tree-grid-cell-border-color:
 * tree-grid-row-min-height:
 * tree-grid-cell-padding:
 * tree-grid-header-background-color:
 * tree-grid-header-text-color:
 * tree-grid-header-text-font-family:
 * tree-grid-header-text-font-size:
 * tree-grid-header-text-font-weight:
 * tree-grid-header-text-line-height:
 * tree-grid-footer-background-color:
 * tree-grid-footer-text-color:
 * tree-grid-footer-text-font-family:
 * tree-grid-footer-text-font-size:
 * tree-grid-footer-text-font-weight:
 * tree-grid-footer-text-line-height:
 * tree-grid-row-background-color:
 * tree-grid-row-even-background-color:
 * tree-grid-row-hover-background-color:
 * tree-grid-row-text-color:
 * tree-grid-row-text-font-family:
 * tree-grid-row-text-font-size:
 * tree-grid-row-text-font-weight:
 * tree-grid-row-text-line-height:
 * tree-grid-sort-header-button-background-color:
 * tree-grid-sort-header-button-border:
 * tree-grid-sort-header-button-padding:
 */
@Component({
  selector: 'table[nbTreeGrid]',
  template: NB_TABLE_TEMPLATE,
  styleUrls: ['./tree-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NB_TREE_GRID, useExisting: NbTreeGridComponent },
    NbColumnsService,
  ],
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
              @Inject(NB_WINDOW) private window,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
    this.platform = platform;
  }

  private alive: boolean = true;
  private _source: NbTreeGridDataSource<T>;
  private platform: NbPlatform;

  /**
   * The table's data
   * @param data
   * @type {<T>[] | NbTreeGridDataSource}
   */
  @Input('nbTreeGrid') set source(data: T[] | NbTreeGridDataSource<T>) {
    if (!data) {
      return;
    }

    if (data instanceof NbTreeGridDataSource) {
      this._source = data;
    } else {
      this._source = this.dataSourceBuilder.create(data);
    }
    this.dataSource = this._source;
  }

  @Input() levelPadding: string = '';

  /**
   * Make all columns equal width. False by default.
   */
  @Input()
  set equalColumnsWidth(value: boolean) {
    this.equalColumnsWidthValue = convertToBoolProperty(value);
  }
  get equalColumnsWidth(): boolean {
    return this.equalColumnsWidthValue;
  }
  private equalColumnsWidthValue: boolean = false;

  @ContentChildren(NbTreeGridRowComponent) private rows: QueryList<NbTreeGridRowComponent>;

  @HostBinding('class.nb-tree-grid') readonly treeClass = true;

  ngAfterViewInit() {
    this.checkDefsCount();
    const rowsChange$ = merge(
      this._contentRowDefs.changes,
      this._contentHeaderRowDefs.changes,
      this._contentFooterRowDefs.changes,
    );
    rowsChange$.pipe(takeWhile(() => this.alive))
      .subscribe(() => this.checkDefsCount());

    if (this.platform.isBrowser) {
      this.updateVisibleColumns();

      const windowResize$ = fromEvent(this.window, 'resize').pipe(debounceTime(50));
      merge(rowsChange$, this._contentColumnDefs.changes, windowResize$)
        .pipe(takeWhile(() => this.alive))
        .subscribe(() => this.updateVisibleColumns());
    }
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
    if (this.equalColumnsWidth) {
      return `${100 / this.getColumnsCount()}%`;
    }
    return '';
  }

  getCellLevel(cell: NbTreeGridCellDirective, columnName: string): number {
    const isFirstColumn = this.isFirstColumn(columnName);
    const row = isFirstColumn && this.findCellRow(cell);
    const level = row && this.getRowLevel(row);
    if (level || level === 0) {
      return level;
    }
    return NB_DEFAULT_ROW_LEVEL;
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
      throw new Error(`Found multiple header row definitions`);
    }
    if (this._contentFooterRowDefs.length > 1) {
      throw new Error(`Found multiple footer row definitions`);
    }
  }

  private updateVisibleColumns(): void {
    const width = this.window.innerWidth;
    const columnDefs = (this._contentColumnDefs as QueryList<NbTreeGridColumnDefDirective>);

    const columnsToHide: string[] = columnDefs
      .filter((col: NbTreeGridColumnDefDirective) => col.shouldHide(width))
      .map(col => col.name);

    const columnsToShow: string[] = columnDefs
      .filter((col: NbTreeGridColumnDefDirective) => col.shouldShow(width))
      .map(col => col.name);

    if (!columnsToHide.length && !columnsToShow.length) {
      return;
    }

    const rowDefs = [
      this._contentHeaderRowDefs.first as NbTreeGridHeaderRowDefDirective,
      this._contentRowDefs.first as NbTreeGridRowDefDirective<any>,
      this._contentFooterRowDefs.first as NbTreeGridFooterRowDefDirective,
    ].filter(d => !!d);

    for (const rowDef of rowDefs) {
      for (const column of columnsToHide) {
        rowDef.hideColumn(column);
      }

      for (const column of columnsToShow) {
        rowDef.showColumn(column);
      }
    }
  }
}
