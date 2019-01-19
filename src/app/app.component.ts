/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NB_DOCUMENT } from '@nebular/theme';
import { fromEvent } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';
import { ComponentLink, PLAYGROUND_COMPONENTS } from './playground-components';

@Component({
  selector: 'nb-app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="options-bar" dir="ltr">
      <ng-container *ngIf="optionsVisible">
        <nb-layout-direction-toggle></nb-layout-direction-toggle>
        <nb-layout-theme-toggle></nb-layout-theme-toggle>
        <button (click)="showComponentsOverlay()">Components (c)</button>
        <nb-components-overlay *ngIf="optionsVisible && componentsListVisible" (closeClicked)="hideComponentsOverlay()">
          <nb-components-list [components]="components"></nb-components-list>
        </nb-components-overlay>
      </ng-container>
      <button (click)="toggleOptions()" [class.fixed]="!optionsVisible" class="options-show">
        <ng-container *ngIf="optionsVisible">hide</ng-container>
        <ng-container *ngIf="!optionsVisible">show</ng-container>
      </button>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {

  alive: boolean = true;
  document: Document;
  optionsVisible: boolean = true;
  componentsListVisible: boolean = false;
  components: ComponentLink[] = PLAYGROUND_COMPONENTS;

  constructor(
    @Inject(NB_DOCUMENT) document,
    private router: Router,
  ) {
    this.document = document;
  }

  ngAfterViewInit() {
    if (!this.document) {
      return;
    }

    fromEvent(this.document, 'keypress')
      .pipe(
        takeWhile(() => this.alive),
        filter((e: KeyboardEvent) => e.key === 'c'),
      )
      .subscribe(this.toggleComponentsOverlay.bind(this));

    fromEvent(this.document, 'keyup')
      .pipe(
        takeWhile(() => this.alive),
        filter((e: KeyboardEvent) => e.key === 'Escape' || e.key === 'Esc'),
      )
      .subscribe(() => this.hideComponentsOverlay());

    this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationStart),
      )
      .subscribe(() => this.hideComponentsOverlay())
  }

  ngOnDestroy() {
    this.alive = false;
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }

  toggleComponentsOverlay() {
    this.componentsListVisible = !this.componentsListVisible;
  }

  hideComponentsOverlay() {
    this.componentsListVisible = false;
  }

  showComponentsOverlay() {
    this.componentsListVisible = true;
  }
}
