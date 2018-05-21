import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import { NgdPaginationService } from '../../../@theme/services';

@Component({
  selector: 'ngd-pager-block',
  styleUrls: ['./pager-block.component.scss'],
  template: `
    <nb-card [class.invisible]="!paginationItem.prev" class="left-block">
      <a *ngIf="paginationItem.prev" [routerLink]="paginationItem.prev.link"
         [attr.title]="paginationItem.prev.title">
        <div class="page-title">
          <i class="icon feather-arrow-left"></i>
          {{paginationItem.prev.title}}
        </div>
        <div>Previous page</div>
      </a>
    </nb-card>
    <nb-card [class.invisible]="!paginationItem.next" class="right-block">
      <a *ngIf="paginationItem.next" [routerLink]="paginationItem.next.link"
         [attr.title]="paginationItem.next.title">
        <div class="page-title">
          {{paginationItem.next.title}}
          <i class="icon feather-arrow-right"></i>
        </div>
        <div>Next page</div>
      </a>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPagerBlockComponent {
  paginationItem;

  @Input('currentItemSlag')
  set setPaginationItem(currentItemSlag: string) {
    this.paginationItem = this.getPaginationItem(currentItemSlag);
  }

  constructor(private paginationService: NgdPaginationService) {
  }

  getPaginationItem(currentItemSlag) {
    return this.paginationService.getPaginationItem(currentItemSlag);
  }
}
