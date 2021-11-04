/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectorRef, Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NbLayoutDirection, NbLayoutDirectionService } from '../../services/direction.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**
 * There are two structural directives which display the template content depending on layout direction.
 * `*nbLtr` displays the content when layout direction is `ltr`.
 * `*nbRtl` displays the content when layout direction is `rtl`.
 * Use them without any conditions.
 */
@Directive()
export abstract class NbLayoutDirectionDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private hasView = false;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected cd: ChangeDetectorRef,
    protected directionService: NbLayoutDirectionService,
    protected direction: NbLayoutDirection,
  ) {}

  ngOnInit() {
    this.directionService
      .onDirectionChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.updateView(value === this.direction));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateView(val: boolean) {
    if (val && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.cd.markForCheck();
      this.hasView = true;
    } else if (!val && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
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
