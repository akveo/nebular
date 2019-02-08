import { ChangeDetectionStrategy, Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NbHeaderRowComponent, NbRowComponent } from '../cdk/table';
import { NbTreeGridComponent } from './tree-grid.component';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';

export const NB_ROW_DOUBLE_CLICK_DELAY: number = 200;

@Component({
  selector: 'tr[nbTreeGridRow]',
  template: `<ng-container nbCellOutlet></ng-container>`,
  host: {
    'class': 'nb-tree-grid-row',
    'role': 'row',
  },
  providers: [{ provide: NbRowComponent, useExisting: NbTreeGridRowComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTreeGridRowComponent extends NbRowComponent implements OnDestroy {
  private readonly doubleClick$ = new Subject();
  private readonly tree: NbTreeGridComponent<any>;

  @HostListener('click')
  toggleNode(): void {
    timer(NB_ROW_DOUBLE_CLICK_DELAY)
      .pipe(
        take(1),
        takeUntil(this.doubleClick$),
      )
      .subscribe(() => this.tree.toggleRow(this));
  }

  @HostListener('dblclick')
  toggleNodeDeep() {
    this.doubleClick$.next();
    this.tree.toggleRow(this, { deep: true });
  }

  constructor(@Inject(NB_TREE_GRID) tree) {
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
  providers: [{ provide: NbHeaderRowComponent, useExisting: NbTreeGridHeaderRowComponent }],
})
export class NbTreeGridHeaderRowComponent extends NbHeaderRowComponent {}

