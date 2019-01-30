import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NbRowComponent, NbTable } from '../cdk/table';
import { NbTreeGridComponent } from './tree-grid.component';

@Component({
  selector: 'nb-tree-grid-row, tr[nbTreeGridRow]',
  template: `
    <ng-container nbCellOutlet></ng-container>`,
  host: {
    'class': 'nb-row',
    'role': 'row',
  },
  providers: [{ provide: NbRowComponent, useExisting: NbTreeGridRowComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTreeGridRowComponent extends NbRowComponent implements OnDestroy {
  private doubleClick$ = new Subject();
  private readonly tree: NbTreeGridComponent<any>;

  constructor(tree: NbTable<any>) {
    super();
    this.tree = tree as NbTreeGridComponent<any>;
  }

  @HostBinding('attr.level')
  get level(): number {
    return this.tree.getLevel(this);
  }

  @HostListener('click')
  toggleNode(): void {
    timer(200)
      .pipe(
        take(1),
        takeUntil(this.doubleClick$),
      )
      .subscribe(() => this.tree.toggle(this));
  }

  @HostListener('dblclick')
  toggleNodeDeep() {
    this.doubleClick$.next();
    this.tree.toggle(this, { deep: true });
  }

  ngOnDestroy() {
    this.doubleClick$.complete();
  }
}
