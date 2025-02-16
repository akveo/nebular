/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { filter, finalize, map, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NbLayoutDirection, NbLayoutDirectionService } from '../../services/direction.service';
import { NbStatusService } from '../../services/status.service';
import { NbFocusMonitor } from '../cdk/a11y/a11y.module';
import {
  NbActiveDescendantKeyManager,
  NbActiveDescendantKeyManagerFactoryService,
} from '../cdk/a11y/descendant-key-manager';
import { BACKSPACE, DELETE, SPACE } from '../cdk/keycodes/keycodes';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbComponentSize } from '../component-size';
import { NbAutocompleteDirective } from '../autocomplete/autocomplete.directive';
import { NbTagComponent } from './tag.component';
import { NbTagInputDirective } from './tag-input.directive';

/**
 *
 * `nb-tag-list` component displays a list of `nb-tag` components.
 *
 * @stacked-example(Tag List Showcase, tag/tag-showcase.component)
 *
 * @styles
 *
 * tag-list-tiny-tag-offset:
 * tag-list-small-tag-offset:
 * tag-list-medium-tag-offset:
 * tag-list-large-tag-offset:
 * tag-list-giant-tag-offset:
 * tag-list-with-input-tiny-padding:
 * tag-list-with-input-small-padding:
 * tag-list-with-input-medium-padding:
 * tag-list-with-input-large-padding:
 * tag-list-with-input-giant-padding:
 * tag-list-with-input-rectangle-border-radius:
 * tag-list-with-input-semi-round-border-radius:
 * tag-list-with-input-round-border-radius:
 */
@Component({
    selector: 'nb-tag-list',
    template: `
    <div class="nb-tag-list-tags-wrapper">
      <ng-content select="nb-tag, input[nbTagInput]"></ng-content>
    </div>
  `,
    exportAs: 'nbTagList',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NbTagListComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  protected readonly destroy$: Subject<void> = new Subject<void>();
  protected readonly keyDown$: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();
  protected readonly tagClick$: Subject<NbTagComponent> = new Subject<NbTagComponent>();
  protected focused: boolean = false;
  protected keyManager: NbActiveDescendantKeyManager<NbTagComponent>;

  @ContentChildren(NbTagComponent) tags: QueryList<NbTagComponent>;
  @ContentChild(NbTagInputDirective) tagInput: NbTagInputDirective;
  @ContentChild(NbAutocompleteDirective) autocompleteDirective: NbAutocompleteDirective<any>;

  /**
   * Controls tags offset.
   */
  @Input()
  size: NbComponentSize = 'medium';

  @Input()
  @HostBinding('attr.tabindex')
  tabIndex: number = 0;

  @Input()
  @HostBinding('attr.role')
  role: string = 'listbox';

  @Input()
  @HostBinding('attr.aria-multiselectable')
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = convertToBoolProperty(value);
  }
  protected _multiple: boolean = false;
  static ngAcceptInputType_multiple: NbBooleanInput;

  @HostBinding('attr.aria-activedescendant')
  activeTagId: string | null = null;

  /**
   * Emits when tag need to be removed (whether because of click on the remove button
   * or when `delete` or `backspace` key pressed).
   */
  @Output() readonly tagRemove: EventEmitter<NbTagComponent> = new EventEmitter<NbTagComponent>();

  @HostBinding('class.nb-tag-list-with-input')
  get _hasInput(): boolean {
    return !!this.tagInput;
  }

  @HostBinding('class.focus')
  get _isFocused(): boolean {
    return this.focused;
  }

  @HostBinding('class.input-full-width')
  get _isFullWidth(): boolean {
    return !!this.tagInput?.fullWidth;
  }

  @HostBinding('class')
  get _inputClasses(): string[] {
    if (this._hasInput) {
      return [
        `shape-${this.tagInput.shape}`,
        `size-${this.tagInput.fieldSize}`,
        this.statusService.getStatusClass(this.tagInput.status),
      ];
    }

    return [`size-${this.size}`];
  }

  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent): void {
    this.keyDown$.next(event);
  }

  @HostListener('click', ['$event'])
  _onClick({ target }: MouseEvent): void {
    const clickedTag = this.tags.find((tag: NbTagComponent) => tag._hostElement.nativeElement === target);
    if (clickedTag) {
      this.tagClick$.next(clickedTag);
    }
  }

  constructor(
    protected hostElement: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef,
    protected renderer: Renderer2,
    protected zone: NgZone,
    protected focusMonitor: NbFocusMonitor,
    protected activeDescendantKeyManagerFactory: NbActiveDescendantKeyManagerFactoryService<NbTagComponent>,
    protected directionService: NbLayoutDirectionService,
    protected statusService: NbStatusService,
  ) {}

  ngOnInit() {
    this.focusMonitor
      .monitor(this.hostElement, true)
      .pipe(
        map((origin) => !!origin),
        finalize(() => this.focusMonitor.stopMonitoring(this.hostElement)),
        takeUntil(this.destroy$),
      )
      .subscribe((isFocused: boolean) => this.onFocusChange(isFocused));
  }

  ngAfterContentInit() {
    this.initKeyManager();
    this.setAutocompleteCustomHost();
  }

  ngAfterViewInit() {
    this.listenToLayoutDirectionChange();
    this.listenListKeyDown();
    this.listenInputKeyDown();
    this.listenTagClick();
    this.listenTagRemove();
    this.listenTagDestroy();
    this.listenActiveTagChange();
    this.listenNoTags();

    // TODO: #2254
    this.zone.runOutsideAngular(() =>
      setTimeout(() => {
        this.renderer.addClass(this.hostElement.nativeElement, 'nb-transition');
      }),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  protected initKeyManager(): void {
    this.keyManager = this.activeDescendantKeyManagerFactory
      .create(this.tags)
      .withHorizontalOrientation(this.directionService.getDirection())
      .withWrap();
  }

  protected listenToLayoutDirectionChange(): void {
    this.directionService
      .onDirectionChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((direction: NbLayoutDirection) => this.keyManager.withHorizontalOrientation(direction));
  }

  protected listenListKeyDown(): void {
    const tagListKeyDown$ = this.keyDown$.pipe(
      filter(({ target }: KeyboardEvent) => target === this.hostElement.nativeElement),
    );
    const activeTagKeyDown$ = tagListKeyDown$.pipe(filter(() => !!this.keyManager.activeItem));

    tagListKeyDown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: KeyboardEvent) => this.keyManager.onKeydown(event));

    activeTagKeyDown$
      .pipe(
        filter(({ keyCode }: KeyboardEvent) => keyCode === SPACE),
        takeUntil(this.destroy$),
      )
      .subscribe((event: KeyboardEvent) => {
        this.toggleTag(this.keyManager.activeItem);
        // Prevents page scroll.
        event.preventDefault();
      });

    activeTagKeyDown$
      .pipe(
        filter(({ keyCode }: KeyboardEvent) => this.isBackspaceOrDelete(keyCode)),
        map(() => this.keyManager.activeItem),
        takeUntil(this.destroy$),
      )
      .subscribe((tagToRemove: NbTagComponent) => tagToRemove._remove());
  }

  protected listenInputKeyDown(): void {
    const inputKeyDown$ = this.keyDown$.pipe(
      filter(({ target }: KeyboardEvent) => target === this.tagInput?._hostElement.nativeElement),
    );

    inputKeyDown$
      .pipe(
        filter(({ keyCode }: KeyboardEvent) => {
          return this.tagInput._value === '' && this.isBackspaceOrDelete(keyCode) && this.tags.length > 0;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.hostElement.nativeElement.focus();
        this.keyManager.setLastItemActive();
        this.cd.markForCheck();
      });
  }

  protected listenTagClick(): void {
    this.tagClick$.pipe(takeUntil(this.destroy$)).subscribe((clickedTag: NbTagComponent) => {
      this.toggleTag(clickedTag);
      this.keyManager.setActiveItem(clickedTag);
    });
  }

  protected listenTagRemove(): void {
    this.tags.changes
      .pipe(
        startWith(this.tags),
        switchMap((tags: QueryList<NbTagComponent>) => merge(...tags.map((tag: NbTagComponent) => tag.remove))),
        takeUntil(this.destroy$),
      )
      .subscribe((tagToRemove: NbTagComponent) => this.tagRemove.emit(tagToRemove));
  }

  protected listenTagDestroy(): void {
    this.tags.changes
      .pipe(
        startWith(this.tags),
        switchMap((tags: QueryList<NbTagComponent>) => merge(...tags.map((tag: NbTagComponent) => tag.destroy$))),
        filter((destroyedTag: NbTagComponent) => destroyedTag === this.keyManager.activeItem),
        map((destroyedTag: NbTagComponent) => destroyedTag === this.tags.last),
        takeUntil(this.destroy$),
      )
      .subscribe((isLastTagDestroyed: boolean) => {
        if (isLastTagDestroyed) {
          this.keyManager.setPreviousItemActive();
        } else {
          this.keyManager.setNextItemActive();
        }
      });
  }

  protected listenNoTags(): void {
    this.tags.changes
      .pipe(
        startWith(this.tags),
        filter((tags: QueryList<NbTagComponent>) => tags.length === 0),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.focusInputIfActive());
  }

  protected listenActiveTagChange(): void {
    this.keyManager.change
      .pipe(
        map(() => this.keyManager.activeItem?._id),
        takeUntil(this.destroy$),
      )
      .subscribe((activeTagId: string | null) => {
        this.activeTagId = activeTagId;
        this.cd.markForCheck();
      });
  }

  protected onFocusChange(isFocused: boolean): void {
    this.focused = isFocused;
    this.cd.markForCheck();

    if (!isFocused || this.tagInput?.focused$.value) {
      this.keyManager?.setActiveItem(-1);
      return;
    }

    // Focus input when focusing tag list without tags. Otherwise select first tag.
    if (this.tags.length === 0 && this._hasInput) {
      this.focusInput();
    } else {
      this.keyManager.setFirstItemActive();
    }
  }

  protected isBackspaceOrDelete(keyCode: number): boolean {
    return keyCode === BACKSPACE || keyCode === DELETE;
  }

  protected setAutocompleteCustomHost(): void {
    if (this.autocompleteDirective) {
      this.autocompleteDirective.customOverlayHost = this.hostElement;
    }
  }

  protected toggleTag(tagToToggle: NbTagComponent): void {
    tagToToggle._toggleSelection();

    if (tagToToggle.selected && !this.multiple) {
      this.tags.forEach((tag: NbTagComponent) => {
        if (tag !== tagToToggle) {
          tag.selected = false;
        }
      });
    }
  }

  protected focusInput(): void {
    if (this._hasInput) {
      this.tagInput._hostElement.nativeElement.focus();
    }
  }

  protected focusInputIfActive(): void {
    if (this._isFocused) {
      this.focusInput();
    }
  }
}
