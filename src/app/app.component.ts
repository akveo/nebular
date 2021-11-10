/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NB_DOCUMENT } from '@nebular/theme';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ComponentsListSearchService } from './components-list.service';
import { ComponentLink } from './playground-components';

@Component({
  selector: 'npg-app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="options-bar" dir="ltr">
      <button (click)="toggleOptions()" [class.fixed]="!optionsVisible" class="options-show">
        <ng-container *ngIf="optionsVisible">hide</ng-container>
        <ng-container *ngIf="!optionsVisible">show</ng-container>
      </button>
      <ng-container *ngIf="optionsVisible">
        <npg-layout-direction-toggle></npg-layout-direction-toggle>
        <npg-layout-theme-toggle></npg-layout-theme-toggle>

        <input
          #componentSearch
          type="text"
          (focus)="onFocus()"
          placeholder="Component name /"
          (input)="onSearchChange($event)"
          (keyup.enter)="onEnterClick()"
        />
      </ng-container>
    </div>
    <div class="component-list-wrapper" *ngIf="isComponentListVisible">
      <npg-components-list [components]="components$ | async"></npg-components-list>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isComponentListVisible: boolean = false;
  document: Document;
  optionsVisible: boolean = true;
  components$: Observable<ComponentLink[]>;

  @ViewChild('componentSearch') componentSearch: ElementRef;

  constructor(
    @Inject(NB_DOCUMENT) document,
    private router: Router,
    private componentsListSearchService: ComponentsListSearchService,
  ) {
    this.document = document;
  }

  ngOnInit(): void {
    this.components$ = this.componentsListSearchService.componentsList$;
  }

  ngAfterViewInit() {
    if (!this.document) {
      return;
    }

    fromEvent<KeyboardEvent>(this.document, 'keyup')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          this.handleArrowDown();
        }

        if (e.key === 'ArrowUp') {
          this.handleArrowUp();
        }

        if (e.key === 'Escape') {
          this.isComponentListVisible = false;
          this.componentSearch.nativeElement.blur();
        }

        if (e.key === '/') {
          this.componentSearch.nativeElement.focus();
        }
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.isComponentListVisible = false;
      });

    this.componentSearch.nativeElement.value = this.componentsListSearchService.inputSearch$.value;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEnterClick(): void {
    this.router.navigate([this.componentsListSearchService.selectedElement$.value]);
    this.componentSearch.nativeElement.blur();
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }

  onFocus(): void {
    this.isComponentListVisible = true;
  }

  onSearchChange(event): void {
    this.componentsListSearchService.activeElementIndex$.next(0);
    this.componentsListSearchService.inputSearch$.next(event.target.value);
  }

  private handleArrowDown(): void {
    const nextElementIndex = this.componentsListSearchService.activeElementIndex$.value + 1;
    const filteredElementLength = this.componentsListSearchService.flatFilteredComponentLinkList$.value.length - 1;

    this.componentsListSearchService.activeElementIndex$.next(
      nextElementIndex > filteredElementLength ? 0 : nextElementIndex,
    );
  }

  private handleArrowUp(): void {
    const prevElementIndex = this.componentsListSearchService.activeElementIndex$.value - 1;
    const filteredElementLength = this.componentsListSearchService.flatFilteredComponentLinkList$.value.length - 1;

    this.componentsListSearchService.activeElementIndex$.next(
      prevElementIndex < 0 ? filteredElementLength : prevElementIndex,
    );
  }
}
