/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  Host,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { merge } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { NbAccordionComponent } from './accordion.component';

@Component({
  selector: 'nb-accordion-body',
  styleUrls: ['./accordion-body.component.scss'],
  template: `
    <div class="test-class" [class.collapsed]="isCollapsed" [class.expanded]="isExpanded">
      <div class="ttt">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionBodyComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(
    @Host() private accordion: NbAccordionComponent,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  get isCollapsed(): boolean {
    return !!this.accordion.collapsed;
  }

  get isExpanded(): boolean {
    return !this.accordion.collapsed;
  }

  get contentHeight(): number {
    return this.el.nativeElement.clientHeight;
  }

  ngOnInit() {
    merge(this.accordion.opened, this.accordion.closed, this.accordion.inputChanges)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
