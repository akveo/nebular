/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { NbToastComponent } from './toast.component';
import { NbToast } from './model';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NbGlobalPosition, NbPositionHelper } from '../cdk';


const voidState = style({
  transform: 'translateX({{ direction }}110%)',
  height: 0,
  margin: 0,
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
export class NbToastrContainerComponent implements OnInit {
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
      .subscribe(() => this.onDirectionChange());
  }

  protected onDirectionChange() {
    const direction = this.positionHelper.isRightPosition(this.position) ? '' : '-';
    this.fadeIn = { value: '', params: { direction } };
  }
}
