/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import {
  NbAdjustment,
  NbOverlayRef,
  NbOverlayService,
  NbPortalDirective,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk';
import { defer, merge, Observable } from 'rxjs';
import { NbOptionComponent } from './option.component';


@Component({
  selector: 'nb-select',
  template: `
    <button nbButton status="primary">{{ selected || placeholder }}</button>

    <nb-card @select *nbPortal [style.width.px]="hostWidth">
      <nb-card-body>
        <ng-content select="nb-option, nb-option-group"></ng-content>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('select', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate(100),
      ]),
      transition(':leave', [
        animate(100, style({ opacity: 0, transform: 'translateY(-10%)' })),
      ]),
    ]),
  ],
})

export class NbSelectComponent implements AfterViewInit, OnDestroy {
  @Input() multi: boolean = false;
  @Input() placeholder: string = '';
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent>;
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;

  selected: any;
  select: Observable<any> = defer(() => merge(...this.options.map(it => it.select)));
  ref: NbOverlayRef;

  constructor(protected overlay: NbOverlayService,
              protected hostRef: ElementRef,
              protected positionBuilder: NbPositionBuilderService) {
  }

  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  ngAfterViewInit() {
    this.select.subscribe(val => {
      this.selected = val;
      this.ref.detach();
    });
  }

  ngOnDestroy() {
    this.ref.dispose();
  }

  @HostListener('click')
  onClick() {
    if (!this.ref) {
      const positionStrategy = this.positionBuilder
        .connectedTo(this.hostRef)
        .position(NbPosition.BOTTOM)
        .offset(0)
        .adjustment(NbAdjustment.NOOP);

      this.ref = this.overlay.create({
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
      });
    }

    this.ref.attach(this.portal);
  }
}
