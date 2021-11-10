/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectorRef, Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbLayoutDirection, NbLayoutDirectionService } from '../../services/direction.service';

/**
 * There are two structural directives which display the template content depending on layout direction.
 * `*nbLtr` displays the content when layout direction is `ltr`.
 * `*nbRtl` displays the content when layout direction is `rtl`.
 * Use them without any conditions.
 */
@Directive()
export abstract class NbLayoutDirectionDirective implements OnInit, OnDestroy {
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
        distinctUntilChanged(),
        map((layoutDirection: NbLayoutDirection) => layoutDirection === this.directionToShow),
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

@Directive({
  selector: '[nbLtr]',
})
export class NbLtrLayoutDirectionDirective extends NbLayoutDirectionDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected cd: ChangeDetectorRef,
    protected directionService: NbLayoutDirectionService,
  ) {
    super(templateRef, viewContainer, cd, directionService, NbLayoutDirection.LTR);
  }
}

@Directive({
  selector: '[nbRtl]',
})
export class NbRtlLayoutDirectionDirective extends NbLayoutDirectionDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected cd: ChangeDetectorRef,
    protected directionService: NbLayoutDirectionService,
  ) {
    super(templateRef, viewContainer, cd, directionService, NbLayoutDirection.RTL);
  }
}
