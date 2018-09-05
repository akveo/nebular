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
import { NB_SELECT, NbOptionComponent } from './option.component';
import { NB_DOCUMENT } from '../../theme.options';
import { convertToBoolProperty } from '../helpers';

const voidState = style({ opacity: 0, height: 0 });

const selectAnimations = [
  trigger('select', [
    transition(':enter', [voidState, animate(100)]),
    transition(':leave', [animate(100, voidState)]),
  ]),
];


@Component({
  selector: 'nb-select',
  template: `
    <button nbButton status="primary" [class.opened]="isOpened">{{ selectionView }}</button>

    <nb-card @select *nbPortal [style.width.px]="hostWidth">
      <nb-card-body>
        <ng-content select="nb-option, nb-option-group"></ng-content>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./select.component.scss'],
  animations: selectAnimations,
  providers: [
    { provide: NB_SELECT, useExisting: NbSelectComponent },
  ],
})

export class NbSelectComponent<T> implements AfterViewInit, OnDestroy {
  multi: boolean = false;
  @Input() placeholder: string = '';
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<T>>;
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;

  selectionModel: NbOptionComponent<T>[] = [];

  selectionChange: Observable<NbOptionComponent<T>> = defer(() => {
    return merge(...this.options.map(it => it.selectionChange));
  });

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

  get isOpened(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  get selectionView() {
    if (!this.selectionModel.length) {
      return this.placeholder;
    }

    if (this.selectionModel.length > 1) {
      return this.selectionModel.map((option: NbOptionComponent) => option.content).join(', ');
    }

    return this.selectionModel[0].content;
  }

  ngAfterViewInit() {
    this.subscribeOnTriggers();

    this.selectionChange.subscribe((option: NbOptionComponent) => this.handleSelect(option));
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

  protected handleSelect(option: NbOptionComponent) {
    if (this.multi) {
      this.handleMultipleSelect(option);
    } else {
      this.handleSingleSelect(option);
    }
  }

  protected handleSingleSelect(option: NbOptionComponent) {
    const selected = this.selectionModel.pop();

    if (selected && selected !== option) {
      selected.deselect();
    }

    this.selectionModel = [option];
    option.select();
    this.hide();
  }

  protected handleMultipleSelect(option: NbOptionComponent) {
    if (option.selected) {
      this.selectionModel = this.selectionModel.filter(s => s.value !== option.value);
      option.deselect();
    } else {
      this.selectionModel.push(option);
      option.select();
    }
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
