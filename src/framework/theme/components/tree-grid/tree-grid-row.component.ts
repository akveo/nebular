import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';
import { NbRowComponent } from '../cdk/table';
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
export class NbTreeGridRowComponent extends NbRowComponent {
  constructor(public tree: NbTreeGridComponent<any>) {
    super();
  }

  @HostBinding('attr.level')
  get level(): number {
    return this.tree.getLevel(this);
  }

  @HostListener('click')
  toggleNode(): void {
    this.tree.toggle(this);
  }
}
