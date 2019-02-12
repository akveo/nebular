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
import {
  NbCdkCell,
  NbCdkFooterCell,
  NbCellDirective,
  NbFooterCellDirective,
  NbHeaderCellDirective,
  NbCdkHeaderCell,
} from '../cdk/table';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridComponent } from './tree-grid.component';
import { NbTreeGridColumnDefDirective } from './tree-grid-column-def.directive';
import { DEFAULT_ROW_LEVEL } from './data-source/tree-grid.model';

@Directive({
  selector: 'td[nbTreeGridCell]',
  host: {
    'class': 'nb-tree-grid-cell',
    'role': 'gridcell',
  },
  providers: [{ provide: NbCdkCell, useExisting: NbTreeGridCellDirective }],
})
export class NbTreeGridCellDirective extends NbCellDirective implements OnInit {
  private readonly tree: NbTreeGridComponent<any>;
  private readonly columnDef: NbTreeGridColumnDefDirective;
  private initialLeftPadding: string = '';
  private initialRightPadding: string = '';
  elementRef: ElementRef<HTMLElement>;

  @HostBinding('style.width')
  get columnWidth(): string {
    return this.tree.getColumnWidth();
  }

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
    const rowLevel = this.tree.getCellLevel(this, this.columnDef.name);
    if (rowLevel === DEFAULT_ROW_LEVEL) {
      return null;
    }

    const nestingLevel = rowLevel + 1;
    let padding: string = '';
    if (this.tree.levelPadding) {
      padding = `calc(${this.tree.levelPadding} * ${nestingLevel})`;
    } else if (this.initialStartPadding) {
      padding = `calc(${this.initialStartPadding} * ${nestingLevel})`;
    }

    if (!padding) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustStyle(padding);
  }
}

@Directive({
  selector: 'th[nbTreeGridHeaderCell]',
  host: {
    'class': 'nb-tree-grid-header-cell',
    'role': 'columnheader',
  },
  providers: [{ provide: NbCdkHeaderCell, useExisting: NbTreeGridHeaderCellDirective }],
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

@Directive({
  selector: 'td[nbTreeGridFooterCell]',
  host: {
    'class': 'nb-tree-grid-footer-cell',
    'role': 'gridcell',
  },
  providers: [{ provide: NbCdkFooterCell, useExisting: NbTreeGridFooterCellDirective }],
})
export class NbTreeGridFooterCellDirective extends NbFooterCellDirective {
  constructor(columnDef: NbTreeGridColumnDefDirective, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}
