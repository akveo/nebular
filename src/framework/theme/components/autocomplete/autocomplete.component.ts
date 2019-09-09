/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { fromEvent, merge } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ContentChildren,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { NbOverlayRef, NbPortalDirective, NbScrollStrategy } from '../cdk/overlay/mapping';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbOptionComponent } from '../select/option.component';
import { startWith, switchMap, takeWhile, filter } from 'rxjs/operators';
import { ESCAPE, ENTER } from '../cdk/keycodes/keycodes';
import { FormControl } from '@angular/forms';
import { NbActiveDescendantKeyManager } from '../cdk/a11y/descendant-key-manager';

@Component({
  selector: 'nb-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAutocompleteComponent<T> implements OnDestroy, AfterViewInit {

  @ViewChild(NbPortalDirective, { static: false }) portal: NbPortalDirective;

  protected alive: boolean = true;

  /**
   * Determines is autocomplete overlay list hidden.
   * */
  get isHidden(): boolean {
    return !this.isOpen;
  }

  /**
   * Determines is select opened.
   * */
  get isOpen(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  protected ref: NbOverlayRef;

  protected positionStrategy: NbAdjustableConnectedPositionStrategy;

  protected keyManager: NbActiveDescendantKeyManager<NbOptionComponent<T>>;

  /**
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction and this directive can use only string.
   */
  overlayPosition: NbPosition = '' as NbPosition;

  /**
   * Will be emitted when selected value changes.
   * */
  @Output() selectedChange: EventEmitter<T> = new EventEmitter();

  /**
   * Host input control (if it exists)
   * */
  protected inputControl: FormControl;

  /**
   * Trigger strategy used by overlay.
   * */
  protected triggerStrategy: NbTriggerStrategy;

  /**
   * HTML input reference to which autocomplete connected.
   * */
  protected hostRef: ElementRef;

  /**
    * List of `NbOptionComponent`'s components passed as content.
  * */
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<T>>;

  constructor(
      protected cd: ChangeDetectorRef,
      protected overlay: NbOverlayService,
      protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
      protected positionBuilder: NbPositionBuilderService) {}

  ngAfterViewInit() {

    this.triggerStrategy = this.createTriggerStrategy();
    this.subscribeOnTriggers();
    this.subscribeOnOptionClick();

  }

  protected subscribeOnOptionClick() {
    /**
     * If the user changes provided options list in the runtime we have to handle this
     * and resubscribe on options selection changes event.
     * Otherwise, the user will not be able to select new options.
     * */
    this.options.changes
      .pipe(
        startWith(this.options),
        switchMap((options: QueryList<NbOptionComponent<T>>) => {
          return merge(...options.map(option => option.click));
        }),
        takeWhile(() => this.alive),
      )
      .subscribe((clickedOption: NbOptionComponent<T>) => this.handleOptionClick(clickedOption));
  }

  /**
   * Returns width of the input.
   * */
  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  protected createKeyManager(): void {
    this.keyManager = new NbActiveDescendantKeyManager<NbOptionComponent<T>>(this.options).withWrap();
  }

  /**
   * Autocomplete knows nothing about host html input element.
   * So, attach method attaches autocomplete to the host input element and
   * sets input control to satisfy valueChanges.
   * */
  attach(hostRef: ElementRef, control: FormControl) {

    // If host html input has formControl instance, autocomplete needs it to
    // call setValue(..) to satisfy valueChanges.
    if (control) {
      this.inputControl = control;
    }

    this.hostRef = hostRef;

    fromEvent<Event>(hostRef.nativeElement, 'input')
      .pipe(
        takeWhile(() => this.alive))
      .subscribe(() => {
        this.show();
      });
  }

  /**
   * Propagate selected value.
   * */
  protected emitSelected(selected: T) {
    this.selectedChange.emit(selected);
  }

  /**
   * Select option.
   * */
  protected handleOptionClick(option: NbOptionComponent<T>) {

    option.select();
    this.setHostInputValue(option.value);

    this.hostRef.nativeElement.focus();
    this.emitSelected(option.value);
    this.hide();
  }

  protected getContainer() {
    return this.ref && this.ref.hasAttached() && <ComponentRef<any>> {
      location: {
        nativeElement: this.ref.overlayElement,
      },
    };
  }

  protected subscribeOnTriggers() {

    this.triggerStrategy.show$
      .pipe(filter(() => this.isHidden))
      .subscribe(($event: Event) => {
        this.show();
      });

    this.triggerStrategy.hide$
      .pipe(filter(() => this.isOpen))
      .subscribe(($event: Event) => {
        this.hide();
      });
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();
  }

  show() {
    if (this.isHidden) {
      this.attachToOverlay();
      this.cd.markForCheck();
    }
  }

  hide() {
    if (this.isOpen) {
      this.ref.detach();
      this.cd.markForCheck();
    }
  }

  protected setHostInputValue(value) {

    // If host input has formControl instance, use setValue(.., { emitEvent: true })
    // to emit new change by valueChanges.
    if (this.inputControl) {
      this.inputControl.setValue(value, { emitEvent: true });
    }
    this.hostRef.nativeElement.value = value;

  }

  protected subscribeOnOverlayKeys(): void {
    this.ref.keydownEvents()
      .pipe(
        takeWhile(() => this.alive),
        filter(() => this.isOpen),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ESCAPE) {
          this.hostRef.nativeElement.focus();
          this.hide();

        } else if (event.keyCode === ENTER) {
          const activeItem = this.keyManager.activeItem;
          activeItem.select();

          this.setHostInputValue(activeItem.value);
          this.emitSelected(activeItem.value);
          this.hide();

        } else {
          this.keyManager.onKeydown(event);
          this.cd.markForCheck();
        }
      });

    this.keyManager.tabOut
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.hide();
      });
  }


  protected attachToOverlay() {
    if (!this.ref) {
      this.createOverlay();
      this.subscribeOnPositionChange();
      this.createKeyManager();
      this.subscribeOnOverlayKeys();
    }

    this.ref.attach(this.portal);
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((position: NbPosition) => {
        this.overlayPosition = position;
        this.cd.detectChanges();
      });
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.positionStrategy = this.createPositionStrategy();
    this.ref = this.overlay.create({ positionStrategy: this.positionStrategy, scrollStrategy });
  }

  protected createScrollStrategy(): NbScrollStrategy {
    return this.overlay.scrollStrategies.block();
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(0)
      .adjustment(NbAdjustment.VERTICAL);
  }


  ngOnDestroy() {
    this.alive = false;

    if (this.ref) {
      this.ref.dispose();
    }
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }
}
