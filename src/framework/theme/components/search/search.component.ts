/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject, of as observableOf, combineLatest } from 'rxjs';
import { filter, delay, takeWhile } from 'rxjs/operators';

import { NbSearchService } from './search.service';
import { NbThemeService } from '../../services/theme.service';

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
    <div class="search" (keyup.esc)="closeSearch()">
      <button (click)="closeSearch()">
        <i class="nb-close-circled"></i>
      </button>
      <div class="form-wrapper">
        <form class="form" (keyup.enter)="submitSearch(searchInput.value)">
          <div class="form-content">
            <input class="search-input"
                   #searchInput
                   autocomplete="off"
                   [attr.placeholder]="placeholder"
                   tabindex="-1"
                   (blur)="tabOut.next($event)"/>
          </div>
          <span class="info">{{ hint }}</span>
        </form>
      </div>
    </div>
  `,
})
export class NbSearchFieldComponent {

  static readonly TYPE_MODAL_ZOOMIN = 'modal-zoomin';
  static readonly TYPE_ROTATE_LAYOUT = 'rotate-layout';
  static readonly TYPE_MODAL_MOVE = 'modal-move';
  static readonly TYPE_CURTAIN = 'curtain';
  static readonly TYPE_COLUMN_CURTAIN = 'column-curtain';
  static readonly TYPE_MODAL_DROP = 'modal-drop';
  static readonly TYPE_MODAL_HALF = 'modal-half';

  @Input() searchType: string;
  @Input() placeholder: string;
  @Input() hint: string;

  @Output() searchClose = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() tabOut = new EventEmitter();


  @ViewChild('searchInput') inputElement: ElementRef;

  @Input() @HostBinding('class.show') showSearch: boolean = false;

  @HostBinding('class.modal-zoomin')
  get modalZoomin() {
    return this.searchType === NbSearchFieldComponent.TYPE_MODAL_ZOOMIN;
  }

  @HostBinding('class.rotate-layout')
  get rotateLayout() {
    return this.searchType === NbSearchFieldComponent.TYPE_ROTATE_LAYOUT;
  }

  @HostBinding('class.modal-move')
  get modalMove() {
    return this.searchType === NbSearchFieldComponent.TYPE_MODAL_MOVE;
  }

  @HostBinding('class.curtain')
  get curtain() {
    return this.searchType === NbSearchFieldComponent.TYPE_CURTAIN;
  }

  @HostBinding('class.column-curtain')
  get columnCurtain() {
    return this.searchType === NbSearchFieldComponent.TYPE_COLUMN_CURTAIN;
  }

  @HostBinding('class.modal-drop')
  get modalDrop() {
    return this.searchType === NbSearchFieldComponent.TYPE_MODAL_DROP;
  }

  @HostBinding('class.modal-half')
  get modalHalf() {
    return this.searchType === NbSearchFieldComponent.TYPE_MODAL_HALF;
  }

  @Input()
  set type(val: any) {
    this.searchType = val;
  }

  closeSearch() {
    this.searchClose.emit(true);
  }

  submitSearch(term) {
    if (term) {
      this.search.emit(term);
    }
  }
}

/**
 * Beautiful full-page search control.
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
    <button class="start-search" (click)="openSearch()">
      <i class="nb-search"></i>
    </button>
    <ng-template #attachedSearchContainer></ng-template>
  `,
})
export class NbSearchComponent implements OnInit, AfterViewInit, OnDestroy {

  private alive = true;

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

  @HostBinding('class.show') showSearch: boolean = false;

  @ViewChild('attachedSearchContainer', {read: ViewContainerRef}) attachedSearchContainer: ViewContainerRef;

  private searchFieldComponentRef$ = new BehaviorSubject<ComponentRef<any>>(null);
  private searchType: string = 'rotate-layout';

  constructor(private searchService: NbSearchService,
              private themeService: NbThemeService,
              private router: Router) {
  }

  /**
   * Search design type, available types are
   * modal-zoomin, rotate-layout, modal-move, curtain, column-curtain, modal-drop, modal-half
   * @type {string}
   */
  @Input()
  set type(val: any) {
    this.searchType = val;
  }

  ngOnInit() {
    this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(event => this.searchService.deactivateSearch(this.searchType, this.tag));

    combineLatest([
      this.searchFieldComponentRef$,
      this.searchService.onSearchActivate(),
    ])
      .pipe(
        takeWhile(() => this.alive),
        filter(([componentRef, data]: [ComponentRef<any>, any]) => componentRef != null),
        filter(([componentRef, data]: [ComponentRef<any>, any]) => !this.tag || data.tag === this.tag),
      )
      .subscribe(([componentRef, data]: [ComponentRef<any>, any]) => {
        this.showSearch = true;

        this.themeService.appendLayoutClass(this.searchType);
        observableOf(null).pipe(delay(0)).subscribe(() => {
          this.themeService.appendLayoutClass('with-search');
        });
        componentRef.instance.showSearch = true;
        componentRef.instance.inputElement.nativeElement.focus();
        componentRef.changeDetectorRef.detectChanges();
      });

    combineLatest([
      this.searchFieldComponentRef$,
      this.searchService.onSearchDeactivate(),
    ])
      .pipe(
        takeWhile(() => this.alive),
        filter(([componentRef, data]: [ComponentRef<any>, any]) => componentRef != null),
        filter(([componentRef, data]: [ComponentRef<any>, any]) => !this.tag || data.tag === this.tag),
      )
      .subscribe(([componentRef, data]: [ComponentRef<any>, any]) => {
        this.showSearch = false;

        componentRef.instance.showSearch = false;
        componentRef.instance.inputElement.nativeElement.value = '';
        componentRef.instance.inputElement.nativeElement.blur();
        componentRef.changeDetectorRef.detectChanges();

        this.themeService.removeLayoutClass('with-search');
        observableOf(null).pipe(delay(500)).subscribe(() => {
          this.themeService.removeLayoutClass(this.searchType);
        });
      });
  }

  ngAfterViewInit() {
    this.themeService.appendToLayoutTop(NbSearchFieldComponent)
      .subscribe((componentRef: ComponentRef<any>) => {
        this.connectToSearchField(componentRef);
      });
  }

  openSearch() {
    this.searchService.activateSearch(this.searchType, this.tag);
  }

  connectToSearchField(componentRef) {
    componentRef.instance.searchType = this.searchType;
    componentRef.instance.placeholder = this.placeholder;
    componentRef.instance.hint = this.hint;
    componentRef.instance.searchClose.subscribe(() => {
      this.searchService.deactivateSearch(this.searchType, this.tag);
    });
    componentRef.instance.search.subscribe(term => {
      this.searchService.submitSearch(term, this.tag);
      this.searchService.deactivateSearch(this.searchType, this.tag);
    });
    componentRef.instance.tabOut
      .subscribe(() => this.showSearch && componentRef.instance.inputElement.nativeElement.focus());

    componentRef.changeDetectorRef.detectChanges();

    this.searchFieldComponentRef$.next(componentRef)
  }

  ngOnDestroy() {
    this.alive = false;

    const componentRef = this.searchFieldComponentRef$.getValue();
    if (componentRef) {
      componentRef.destroy();
    }
  }
}
