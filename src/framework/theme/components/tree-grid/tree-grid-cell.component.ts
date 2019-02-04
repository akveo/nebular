/** Cell template container that adds the right classes and role. */
import { Directive, ElementRef, HostBinding, Inject } from '@angular/core';
import { NbCellDirective, NbColumnDefDirective, NbHeaderCellDirective } from '../cdk/table';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridComponent } from './tree-grid.component';

@Directive({
  selector: 'nb-tree-grid-cell, td[nbTreeGridCell]',
  host: {
    'class': 'nb-tree-grid-cell',
  },
  providers: [
    { provide: NbCellDirective, useExisting: NbTreeGridCellDirective },
  ],
})
export class NbTreeGridCellDirective extends NbCellDirective {
  private readonly tree: NbTreeGridComponent<any>;
  private readonly columnDef: NbColumnDefDirective;
  elementRef: ElementRef<HTMLElement>;

  @HostBinding('style.padding-left')
  get leftPadding(): string {
    return this.tree.getCellPadding(this, this.columnDef.name);
  }

  constructor(
    columnDef: NbColumnDefDirective,
    elementRef: ElementRef<HTMLElement>,
    @Inject(NB_TREE_GRID) tree,
  ) {
    super(columnDef, elementRef);
    this.tree = tree as NbTreeGridComponent<any>;
    this.columnDef = columnDef;
    this.elementRef = elementRef;
  }
}

@Directive({
  selector: 'nb-tree-grid-header-cell, th[nbTreeGridHeaderCell]',
  host: {
    'class': 'nb-tree-grid-header-cell',
    'role': 'columnheader',
  },
})
export class NbTreeGridHeaderCellDirective extends NbHeaderCellDirective {
  private readonly tree: NbTreeGridComponent<any>;
  private readonly columnDef: NbColumnDefDirective;

  @HostBinding('style.width')
  get columnWidth(): string {
    return this.tree.getColumnWidth();
  }

  constructor(
    columnDef: NbColumnDefDirective,
    elementRef: ElementRef<HTMLElement>,
    @Inject(NB_TREE_GRID) tree,
  ) {
    super(columnDef, elementRef);
    this.tree = tree as NbTreeGridComponent<any>;
    this.columnDef = columnDef;
  }
}
