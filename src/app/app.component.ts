/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NB_DOCUMENT } from '@nebular/theme';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ComponentsListService } from './components-list.service';
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
          placeholder="Component name /"
          (focus)="showComponentList()"
          (input)="onSearchChange($event)"
          (keyup.enter)="navigateToComponent()"
        />
      </ng-container>
    </div>
    <div class="component-list-wrapper" *ngIf="isComponentListVisible">
      <npg-components-list [components]="components$ | async"></npg-components-list>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isComponentListVisible: boolean = false;
  document: Document;
  optionsVisible: boolean = true;
  components$: Observable<ComponentLink[]> = this.componentsListService.componentsList$;

  @ViewChild('componentSearch') componentSearch: ElementRef;

  constructor(
    @Inject(NB_DOCUMENT) document,
    private router: Router,
    private componentsListService: ComponentsListService,
  ) {
    this.document = document;
  }

  ngAfterViewInit() {
    if (!this.document) {
      return;
    }

    fromEvent<KeyboardEvent>(this.document, 'keyup')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: KeyboardEvent) => {
        this.handleButtonPressUp(e);
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.isComponentListVisible = false;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToComponent(): void {
    this.componentSearch.nativeElement.blur(); // move focus from search input
    this.componentsListService.selected$.pipe(take(1)).subscribe((value) => {
      this.router.navigate([value]);
    });
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }

  showComponentList(): void {
    this.isComponentListVisible = true;
  }

  onSearchChange(event): void {
    this.componentsListService.updateSearch(event.target.value);
  }

  private handleButtonPressUp(e: KeyboardEvent): void {
    let prevFocusedElement = this.document.body;
    if (e.key === 'ArrowDown') {
      this.componentsListService.selectNextComponent();
    }

    if (e.key === 'ArrowUp') {
      this.componentsListService.selectPreviousComponent();
    }

    if (e.key === 'Escape') {
      this.isComponentListVisible = false;
      prevFocusedElement.focus();
    }

    if (e.key === '/') {
      prevFocusedElement = this.document.activeElement as HTMLElement;
      this.componentSearch.nativeElement.focus();
    }
  }
}
