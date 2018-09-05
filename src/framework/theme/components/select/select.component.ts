/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Component,
  ComponentRef,
  ContentChildren,
  ElementRef,
  Inject,
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
  NbPositionStrategy,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilder,
} from '../cdk';
import { defer, merge, Observable } from 'rxjs';
import { NbOptionComponent } from './option.component';
import { NB_DOCUMENT } from '../../theme.options';
import { convertToBoolProperty } from '../helpers';


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
  multi: boolean = false;
  @Input() placeholder: string = '';
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent>;
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;
  selected: any;
  select: Observable<any> = defer(() => merge(...this.options.map(it => it.select)));
  ref: NbOverlayRef;

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected overlay: NbOverlayService,
              protected hostRef: ElementRef,
              protected positionBuilder: NbPositionBuilderService) {
  }

  @Input('multi')
  set _multi(multi: boolean) {
    this.multi = convertToBoolProperty(multi);
  }

  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  ngAfterViewInit() {
    this.subscribeOnTriggers();
    this.select.subscribe(val => {
      if (this.multi) {
        this.selected += `, ${val}`;
      } else {
        this.selected = val;
        this.hide();
      }
    });
  }

  ngOnDestroy() {
    this.ref.dispose();
  }

  show() {
    if (!this.ref) {
      this.createOverlay();
    }

    if (this.ref.hasAttached()) {
      return;
    }

    this.ref.attach(this.portal);
  }

  hide() {
    this.ref.detach();
  }

  protected createOverlay() {
    const positionStrategy = this.createPositionStrategy();
    const scrollStrategy = this.createScrollStrategy();

    this.ref = this.overlay.create({ positionStrategy, scrollStrategy });
  }

  protected createPositionStrategy(): NbPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(0)
      .adjustment(NbAdjustment.NOOP);
  }

  protected createScrollStrategy() {
    return this.overlay.scrollStrategies.block();
  }

  protected subscribeOnTriggers() {
    const triggerStrategy: NbTriggerStrategy = new NbTriggerStrategyBuilder()
      .document(this.document)
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();

    triggerStrategy.show$.subscribe(() => this.show());
    triggerStrategy.hide$.subscribe(() => this.hide());
  }

  protected getContainer() {
    return this.ref && this.ref.hasAttached() && <ComponentRef<any>> {
      location: {
        nativeElement: this.ref.overlayElement,
      },
    };
  }
}
