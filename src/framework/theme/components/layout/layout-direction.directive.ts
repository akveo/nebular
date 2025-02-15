/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectorRef, Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbLayoutDirection, NbLayoutDirectionService } from '../../services/direction.service';

@Directive()
abstract class NbBaseLayoutDirectionDirective implements OnInit, OnDestroy {
  protected destroy$ = new Subject<void>();

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected cd: ChangeDetectorRef,
    protected directionService: NbLayoutDirectionService,
    protected directionToShow: NbLayoutDirection,
  ) {}

  ngOnInit(): void {
    this.directionService
      .onDirectionChange()
      .pipe(
        map((layoutDirection: NbLayoutDirection) => layoutDirection === this.directionToShow),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((shouldShow: boolean) => this.updateView<boolean>(shouldShow));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected updateView<T>(shouldShow: T): void {
    if (shouldShow && !this.viewContainer.length) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.cd.markForCheck();
    } else if (!shouldShow && this.viewContainer.length) {
      this.viewContainer.clear();
    }
  }
}

/**
 * Apply `nbLtr` directive to the element you need to show only when layout direction is `LTR`.
 *
 * ```html
 * <div *nbLtr>This text is visible only when layout direction is LTR</div>
 * ```
 */
@Directive({
    selector: '[nbLtr]',
    standalone: false
})
export class NbLtrDirective extends NbBaseLayoutDirectionDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected cd: ChangeDetectorRef,
    protected directionService: NbLayoutDirectionService,
  ) {
    super(templateRef, viewContainer, cd, directionService, NbLayoutDirection.LTR);
  }
}

/**
 * Apply `nbRtl` directive to the element you need to show only when layout direction is `RTL`.
 *
 * ```html
 * <div *nbRtl>This text is visible only when layout direction is RTL</div>
 * ```
 */
@Directive({
    selector: '[nbRtl]',
    standalone: false
})
export class NbRtlDirective extends NbBaseLayoutDirectionDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected cd: ChangeDetectorRef,
    protected directionService: NbLayoutDirectionService,
  ) {
    super(templateRef, viewContainer, cd, directionService, NbLayoutDirection.RTL);
  }
}
