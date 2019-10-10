/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NbToastComponent } from './toast.component';
import { NbToast } from './model';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NbGlobalPosition, NbPositionHelper } from '../cdk/overlay/position-helper';

const voidState = style({
  transform: 'translateX({{ direction }}110%)',
  height: 0,
  marginLeft: '0',
  marginRight: '0',
  marginTop: '0',
  marginBottom: '0',
});

const defaultOptions = { params: { direction: '' } };

@Component({
  selector: 'nb-toastr-container',
  template: `
    <nb-toast [@fadeIn]="fadeIn" *ngFor="let toast of content" [toast]="toast"></nb-toast>`,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [voidState, animate(100)], defaultOptions),
      transition(':leave', [animate(100, voidState)], defaultOptions),
    ]),
  ],
})
export class NbToastrContainerComponent implements OnInit, OnDestroy {

  protected destroy$ = new Subject<void>();

  @Input()
  content: NbToast[] = [];

  @Input()
  context: Object;

  @Input()
  position: NbGlobalPosition;

  @ViewChildren(NbToastComponent)
  toasts: QueryList<NbToastComponent>;

  fadeIn;

  constructor(protected layoutDirection: NbLayoutDirectionService,
              protected positionHelper: NbPositionHelper) {
  }

  ngOnInit() {
    this.layoutDirection.onDirectionChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onDirectionChange());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onDirectionChange() {
    const direction = this.positionHelper.isRightPosition(this.position) ? '' : '-';
    this.fadeIn = { value: '', params: { direction } };
  }
}
