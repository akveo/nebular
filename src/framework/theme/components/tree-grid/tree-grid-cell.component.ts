/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, ElementRef, HostBinding, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NB_WINDOW } from '../../theme.options';
import { NbCellDirective, NbColumnDefDirective, NbHeaderCellDirective } from '../cdk/table';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridComponent } from './tree-grid.component';
import { NbTreeGridColumnDefDirective } from './tree-grid-column-def.directive';

@Directive({
  selector: 'nb-tree-grid-cell, td[nbTreeGridCell]',
  host: {
    'class': 'nb-tree-grid-cell',
    'role': 'gridcell',
  },
  providers: [{ provide: NbCellDirective, useExisting: NbTreeGridCellDirective }],
})
export class NbTreeGridCellDirective extends NbCellDirective implements OnInit {
  private readonly tree: NbTreeGridComponent<any>;
  private readonly columnDef: NbColumnDefDirective;
  private initialLeftPadding: string = '';
  private initialRightPadding: string = '';
  elementRef: ElementRef<HTMLElement>;

  @HostBinding('style.padding-left')
  get leftPadding(): string | SafeStyle | null {
    if (this.directionService.isLtr()) {
      return this.getStartPadding();
    }
    return null;
  }

  @HostBinding('style.padding-right')
  get rightPadding(): string | SafeStyle | null {
    if (this.directionService.isRtl()) {
      return this.getStartPadding();
    }
    return null;
  }

  constructor(
    columnDef: NbTreeGridColumnDefDirective,
    elementRef: ElementRef<HTMLElement>,
    @Inject(NB_TREE_GRID) tree,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(NB_WINDOW) private window,
    private sanitizer: DomSanitizer,
    private directionService: NbLayoutDirectionService,
  ) {
    super(columnDef, elementRef);
    this.tree = tree as NbTreeGridComponent<any>;
    this.columnDef = columnDef;
    this.elementRef = elementRef;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const style = this.window.getComputedStyle(this.elementRef.nativeElement);
      this.initialLeftPadding = style.paddingLeft;
      this.initialRightPadding = style.paddingRight;
    }
  }

  toggleRow(): void {
    this.tree.toggleCellRow(this);
  }

  private get initialStartPadding(): string {
    return this.directionService.isLtr()
      ? this.initialLeftPadding
      : this.initialRightPadding;
  }

  private getStartPadding(): string | SafeStyle | null {
    const levelPadding = this.tree.getCellPadding(this, this.columnDef.name);
    if (!levelPadding) {
      return null;
    }

    let startPadding: string | SafeStyle = `${levelPadding}${this.tree.levelPaddingUnit}`;
    if (this.initialStartPadding) {
      startPadding = this.sanitizer.bypassSecurityTrustStyle(`calc(${this.initialStartPadding} + ${startPadding})`);
    }
    return startPadding;
  }
}

@Directive({
  selector: 'nb-tree-grid-header-cell, th[nbTreeGridHeaderCell]',
  host: {
    'class': 'nb-tree-grid-header-cell',
    'role': 'columnheader',
  },
})
export class NbTreeGridHeaderCellDirective extends NbHeaderCellDirective {
  private readonly tree: NbTreeGridComponent<any>;

  @HostBinding('style.width')
  get columnWidth(): string {
    return this.tree.getColumnWidth();
  }

  constructor(
    columnDef: NbTreeGridColumnDefDirective,
    elementRef: ElementRef<HTMLElement>,
    @Inject(NB_TREE_GRID) tree,
  ) {
    super(columnDef, elementRef);
    this.tree = tree as NbTreeGridComponent<any>;
  }
}
