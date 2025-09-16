/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Attribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  IterableDiffers,
  OnDestroy,
  QueryList,
  EmbeddedViewRef,
  ViewContainerRef,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CDK_TABLE } from '@angular/cdk/table';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { NB_DOCUMENT, NB_WINDOW } from '../../theme.options';
import { NbPlatform } from '../cdk/platform/platform-service';
import { NbDirectionality } from '../cdk/bidi/bidi-service';
import { NB_TABLE_TEMPLATE, NbTable, NB_TABLE_PROVIDERS, NB_VIEW_REPEATER_STRATEGY } from '../cdk/table/table.module';
import { NB_STICKY_POSITIONING_LISTENER, NbRowContext } from '../cdk/table/type-mappings';
import { NbViewportRulerAdapter } from '../cdk/adapter/viewport-ruler-adapter';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from './data-source/tree-grid-data-source';
import { NB_DEFAULT_ROW_LEVEL, NbTreeGridPresentationNode } from './data-source/tree-grid.model';
import { NbToggleOptions } from './data-source/tree-grid.service';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridRowComponent } from './tree-grid-row.component';
import { NbTreeGridCellDirective } from './tree-grid-cell.component';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
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
  providers: [
    { provide: NB_TREE_GRID, useExisting: NbTreeGridComponent },
    { provide: CDK_TABLE, useExisting: NbTreeGridComponent },
    NbColumnsService,
    ...NB_TABLE_PROVIDERS,
  ],
  standalone: false,
})
export class NbTreeGridComponent<T> extends NbTable<NbTreeGridPresentationNode<T>> implements AfterViewInit, OnDestroy {
  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<T>,
    differs: IterableDiffers,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef,
    @Attribute('role') role: string,
    dir: NbDirectionality,
    @Inject(NB_DOCUMENT) document,
    platform: NbPlatform,
    @Inject(NB_WINDOW) private window,
    @Inject(NB_VIEW_REPEATER_STRATEGY) protected readonly _viewRepeater,
    _viewportRuler: NbViewportRulerAdapter,
    @Optional()
    @SkipSelf()
    @Inject(NB_STICKY_POSITIONING_LISTENER)
    protected readonly _stickyPositioningListener,
  ) {
    super(
      differs,
      changeDetectorRef,
      elementRef,
      role,
      dir,
      document,
      platform,
      _viewRepeater,
      _viewportRuler,
      _stickyPositioningListener,
    );
    this.platform = platform;
  }

  private destroy$ = new Subject<void>();
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
  static ngAcceptInputType_equalColumnsWidth: NbBooleanInput;

  @HostBinding('class.nb-tree-grid') readonly treeClass = true;

  ngAfterViewInit() {
    this.checkDefsCount();
    const rowsChange$ = merge(
      this._contentRowDefs.changes,
      this._contentHeaderRowDefs.changes,
      this._contentFooterRowDefs.changes,
    );
    rowsChange$.pipe(takeUntil(this.destroy$)).subscribe(() => this.checkDefsCount());

    if (this.platform.isBrowser) {
      this.updateVisibleColumns();

      const windowResize$ = fromEvent(this.window, 'resize').pipe(debounceTime(50));
      merge(rowsChange$, this._contentColumnDefs.changes, windowResize$)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.updateVisibleColumns());
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleRow(row: NbTreeGridRowComponent, options?: NbToggleOptions): void {
    const context = this.getRowContext(row);
    this._source.toggle(context.$implicit.data, options);
  }

  toggleCellRow(cell: NbTreeGridCellDirective): void {
    const context = this.getCellContext(cell);
    this._source.toggle(context.$implicit.data);
  }

  getColumnWidth(): string {
    if (this.equalColumnsWidth) {
      return `${100 / this.getColumnsCount()}%`;
    }
    return '';
  }

  getCellLevel(cell: NbTreeGridCellDirective, columnName: string): number {
    if (this.isFirstColumn(columnName)) {
      return this.getCellContext(cell).$implicit.level;
    }
    return NB_DEFAULT_ROW_LEVEL;
  }

  private getRowContext(row: NbTreeGridRowComponent): NbRowContext<NbTreeGridPresentationNode<T>> {
    return this.getContextByRowEl(row.elementRef.nativeElement);
  }

  private getCellContext(cell: NbTreeGridCellDirective): NbRowContext<NbTreeGridPresentationNode<T>> {
    return this.getContextByCellEl(cell.elementRef.nativeElement);
  }

  private getContextByCellEl(cellEl: HTMLElement): NbRowContext<NbTreeGridPresentationNode<T>> {
    return this.getContextByRowEl(cellEl.parentElement);
  }

  private getContextByRowEl(rowEl: HTMLElement): NbRowContext<NbTreeGridPresentationNode<T>> {
    const rowsContainer: ViewContainerRef = this._rowOutlet.viewContainer;

    for (let i = 0; i < rowsContainer.length; i++) {
      const rowViewRef = rowsContainer.get(i) as EmbeddedViewRef<NbRowContext<NbTreeGridPresentationNode<T>>>;

      if (rowViewRef.rootNodes.includes(rowEl)) {
        return rowViewRef.context;
      }
    }

    return undefined;
  }

  private getColumns(): string[] {
    let rowDef: NbTreeGridHeaderRowDefDirective | NbTreeGridRowDefDirective<any>;

    if (this._contentHeaderRowDefs.length) {
      rowDef = this._contentHeaderRowDefs.first as NbTreeGridHeaderRowDefDirective;
    } else {
      rowDef = this._contentRowDefs.first as NbTreeGridRowDefDirective<any>;
    }

    return Array.from(rowDef.getVisibleColumns() || []);
  }

  private getColumnsCount(): number {
    return this.getColumns().length;
  }

  private isFirstColumn(columnName: string): boolean {
    return this.getColumns()[0] === columnName;
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
    const columnDefs = this._contentColumnDefs as QueryList<NbTreeGridColumnDefDirective>;

    const columnsToHide: string[] = columnDefs
      .filter((col: NbTreeGridColumnDefDirective) => col.shouldHide(width))
      .map((col) => col.name);

    const columnsToShow: string[] = columnDefs
      .filter((col: NbTreeGridColumnDefDirective) => col.shouldShow(width))
      .map((col) => col.name);

    if (!columnsToHide.length && !columnsToShow.length) {
      return;
    }

    const rowDefs = [
      this._contentHeaderRowDefs.first as NbTreeGridHeaderRowDefDirective,
      this._contentRowDefs.first as NbTreeGridRowDefDirective<any>,
      this._contentFooterRowDefs.first as NbTreeGridFooterRowDefDirective,
    ].filter((d) => !!d);

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
