import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NbCdkFooterRow, NbCdkHeaderRow, NbCdkRow } from '../cdk/table/type-mappings';
import { NbFooterRowComponent, NbHeaderRowComponent, NbRowComponent } from '../cdk/table/row';
import { NbTreeGridComponent } from './tree-grid.component';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';

export const NB_ROW_DOUBLE_CLICK_DELAY: number = 200;

/**
 * Cells container. Adds the right class and role.
 */
@Component({
  selector: 'tr[nbTreeGridRow]',
  template: `<ng-container nbCellOutlet></ng-container>`,
  host: {
    'class': 'nb-tree-grid-row',
    'role': 'row',
  },
  providers: [{ provide: NbCdkRow, useExisting: NbTreeGridRowComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTreeGridRowComponent extends NbRowComponent implements OnDestroy {
  private readonly doubleClick$ = new Subject();
  private readonly tree: NbTreeGridComponent<any>;

  /**
   * Time to wait for second click to expand row deeply.
   * 200ms by default.
   */
  @Input() doubleClickDelay: number = NB_ROW_DOUBLE_CLICK_DELAY;

  /**
   * Toggle row on click. Enabled by default.
   */
  @Input() clickToToggle: boolean = true;

  @HostListener('click')
  toggleIfEnabledNode(): void {
    if (!this.clickToToggle) {
      return;
    }

    timer(NB_ROW_DOUBLE_CLICK_DELAY)
      .pipe(
        take(1),
        takeUntil(this.doubleClick$),
      )
      .subscribe(() => this.tree.toggleRow(this));
  }

  @HostListener('dblclick')
  toggleIfEnabledNodeDeep() {
    if (!this.clickToToggle) {
      return;
    }

    this.doubleClick$.next();
    this.tree.toggleRow(this, { deep: true });
  }

  constructor(
    @Inject(NB_TREE_GRID) tree,
    public elementRef: ElementRef<HTMLElement>,
  ) {
    super();
    this.tree = tree as NbTreeGridComponent<any>;
  }

  ngOnDestroy() {
    this.doubleClick$.complete();
  }
}

@Component({
  selector: 'tr[nbTreeGridHeaderRow]',
  template: `
    <ng-container nbCellOutlet></ng-container>`,
  host: {
    'class': 'nb-tree-grid-header-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NbCdkHeaderRow, useExisting: NbTreeGridHeaderRowComponent }],
})
export class NbTreeGridHeaderRowComponent extends NbHeaderRowComponent {}

@Component({
  selector: 'tr[nbTreeGridFooterRow]',
  template: `
    <ng-container nbCellOutlet></ng-container>`,
  host: {
    'class': 'nb-tree-grid-footer-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NbCdkFooterRow, useExisting: NbTreeGridFooterRowComponent }],
})
export class NbTreeGridFooterRowComponent extends NbFooterRowComponent {}
