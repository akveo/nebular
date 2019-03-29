/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { of as observableOf } from 'rxjs';
import { filter, delay, takeWhile } from 'rxjs/operators';

import { NbSearchService } from './search.service';
import { NbThemeService } from '../../services/theme.service';
import { NbOverlayService, NbOverlayRef, NbPortalDirective  } from '../cdk';

/**
 * search-field-component is used under the hood by nb-search component
 * can't be used itself
 */
@Component({
  selector: 'nb-search-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    'styles/search.component.modal-zoomin.scss',
    'styles/search.component.layout-rotate.scss',
    'styles/search.component.modal-move.scss',
    'styles/search.component.curtain.scss',
    'styles/search.component.column-curtain.scss',
    'styles/search.component.modal-drop.scss',
    'styles/search.component.modal-half.scss',
  ],
  template: `
    <div class="search" (keyup.esc)="emitClose()">
      <button (click)="emitClose()">
        <nb-icon icon="close-outline" pack="nebular-essentials"></nb-icon>
      </button>
      <div class="form-wrapper">
        <form class="form" (keyup.enter)="submitSearch(searchInput.value)">
          <div class="form-content">
            <input class="search-input"
                   #searchInput
                   autocomplete="off"
                   [attr.placeholder]="placeholder"
                   tabindex="-1"
                   (blur)="focusInput()"/>
          </div>
          <span class="info">{{ hint }}</span>
        </form>
      </div>
    </div>
  `,
})
export class NbSearchFieldComponent implements OnChanges, AfterViewInit {

  static readonly TYPE_MODAL_ZOOMIN = 'modal-zoomin';
  static readonly TYPE_ROTATE_LAYOUT = 'rotate-layout';
  static readonly TYPE_MODAL_MOVE = 'modal-move';
  static readonly TYPE_CURTAIN = 'curtain';
  static readonly TYPE_COLUMN_CURTAIN = 'column-curtain';
  static readonly TYPE_MODAL_DROP = 'modal-drop';
  static readonly TYPE_MODAL_HALF = 'modal-half';

  @Input() type: string;
  @Input() placeholder: string;
  @Input() hint: string;
  @Input() show = false;

  @Output() close = new EventEmitter();
  @Output() search = new EventEmitter();

  @ViewChild('searchInput') inputElement: ElementRef<HTMLInputElement>;

  @HostBinding('class.show')
  get showClass() {
    return this.show;
  }

  @HostBinding('class.modal-zoomin')
  get modalZoomin() {
    return this.type === NbSearchFieldComponent.TYPE_MODAL_ZOOMIN;
  }

  @HostBinding('class.rotate-layout')
  get rotateLayout() {
    return this.type === NbSearchFieldComponent.TYPE_ROTATE_LAYOUT;
  }

  @HostBinding('class.modal-move')
  get modalMove() {
    return this.type === NbSearchFieldComponent.TYPE_MODAL_MOVE;
  }

  @HostBinding('class.curtain')
  get curtain() {
    return this.type === NbSearchFieldComponent.TYPE_CURTAIN;
  }

  @HostBinding('class.column-curtain')
  get columnCurtain() {
    return this.type === NbSearchFieldComponent.TYPE_COLUMN_CURTAIN;
  }

  @HostBinding('class.modal-drop')
  get modalDrop() {
    return this.type === NbSearchFieldComponent.TYPE_MODAL_DROP;
  }

  @HostBinding('class.modal-half')
  get modalHalf() {
    return this.type === NbSearchFieldComponent.TYPE_MODAL_HALF;
  }

  ngOnChanges({ show }: SimpleChanges) {
    const becameHidden = !show.isFirstChange() && show.currentValue === false;
    if (becameHidden && this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }

    this.focusInput();
  }

  ngAfterViewInit() {
    this.focusInput();
  }

  emitClose() {
    this.close.emit();
  }

  submitSearch(term) {
    if (term) {
      this.search.emit(term);
    }
  }

  focusInput() {
    if (this.show && this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }
}

/**
 * Beautiful full-page search control.
 *
 * @stacked-example(Showcase, search/search-showcase.component)
 *
 * Basic setup:
 *
 * ```ts
 *  <nb-search type="rotate-layout"></nb-search>
 * ```
 * ### Installation
 *
 * Import `NbSearchModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbSearchModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Several animation types are available:
 * modal-zoomin, rotate-layout, modal-move, curtain, column-curtain, modal-drop, modal-half
 *
 * It is also possible to handle search event using `NbSearchService`:
 *
 * @stacked-example(Search Event, search/search-event.component)
 *
 * @styles
 *
 * search-btn-open-fg:
 * search-btn-close-fg:
 * search-bg:
 * search-bg-secondary:
 * search-text:
 * search-info:
 * search-dash:
 * search-placeholder:
 */
@Component({
  selector: 'nb-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['styles/search.component.scss'],
  template: `
    <button #searchButton class="start-search" (click)="emitActivate()">
      <nb-icon icon="search-outline" pack="nebular-essentials"></nb-icon>
    </button>
    <nb-search-field
      *nbPortal
      [show]="showSearchField"
      [type]="type"
      [placeholder]="placeholder"
      [hint]="hint"
      (search)="search($event)"
      (close)="emitDeactivate()">
    </nb-search-field>
  `,
})
export class NbSearchComponent implements OnInit, OnDestroy {

  private alive = true;
  private overlayRef: NbOverlayRef;
  showSearchField = false;

  /**
   * Tags a search with some ID, can be later used in the search service
   * to determine which search component triggered the action, if multiple searches exist on the page.
   *
   * @type {string}
   */
  @Input() tag: string;

  /**
   * Search input placeholder
   * @type {string}
   */
  @Input() placeholder: string = 'Search...';

  /**
   * Hint showing under the input field to improve user experience
   *
   * @type {string}
   */
  @Input() hint: string = 'Hit enter to search';

  /**
   * Search design type, available types are
   * modal-zoomin, rotate-layout, modal-move, curtain, column-curtain, modal-drop, modal-half
   * @type {string}
   */
  @Input() type: string;

  @ViewChild(NbPortalDirective) searchFieldPortal: NbPortalDirective;
  @ViewChild('searchButton') searchButton: ElementRef<HTMLElement>;

  constructor(
    private searchService: NbSearchService,
    private themeService: NbThemeService,
    private router: Router,
    private overlayService: NbOverlayService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => this.hideSearch());

    this.searchService.onSearchActivate()
      .pipe(
        takeWhile(() => this.alive),
        filter(data => !this.tag || data.tag === this.tag),
      )
      .subscribe(() => this.openSearch());

    this.searchService.onSearchDeactivate()
      .pipe(
        takeWhile(() => this.alive),
        filter(data => !this.tag || data.tag === this.tag),
      )
      .subscribe(() => this.hideSearch());
  }

  ngOnDestroy() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.removeLayoutClasses();
      this.overlayRef.detach();
    }

    this.alive = false;
  }

  openSearch() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlayService.create();
      this.overlayRef.attach(this.searchFieldPortal);
    }

    this.themeService.appendLayoutClass(this.type);
    observableOf(null).pipe(delay(0)).subscribe(() => {
      this.themeService.appendLayoutClass('with-search');
      this.showSearchField = true;
      this.changeDetector.detectChanges();
    });
  }

  hideSearch() {
    this.removeLayoutClasses();
    this.showSearchField = false;
    this.changeDetector.detectChanges();
    this.searchButton.nativeElement.focus();
  }

  search(term) {
    this.searchService.submitSearch(term, this.tag);
    this.hideSearch();
  }

  emitActivate() {
    this.searchService.activateSearch(this.type, this.tag);
  }

  emitDeactivate() {
    this.searchService.deactivateSearch(this.type, this.tag);
  }

  private removeLayoutClasses() {
    this.themeService.removeLayoutClass('with-search');
    observableOf(null).pipe(delay(500)).subscribe(() => {
      this.themeService.removeLayoutClass(this.type);
    });
  }
}
