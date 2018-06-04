/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  Host,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { merge } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';

import { NbExpansionPanelComponent } from './expansion-panel.component';

const expansionPanelBodyTrigger = trigger('expansionPanelBody', [
  state(
    'collapsed',
    style({
      overflow: 'hidden',
      visibility: 'hidden',
      height: 0,
    }),
  ),
  state(
    'expanded',
    style({
      overflow: 'hidden',
      visibility: 'visible',
      height: '{{ contentHeight }}',
    }),
    { params: { contentHeight: '1rem' } },
  ),
  transition('collapsed => expanded', animate('100ms ease-in')),
  transition('expanded => collapsed', animate('100ms ease-out')),
]);

@Component({
  selector: 'nb-expansion-panel-body',
  styleUrls: ['./expansion-panel-body.component.scss'],
  template: `
    <div [@expansionPanelBody]="{ value: state, params: { contentHeight: contentHeight } }">
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [expansionPanelBodyTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbExpansionPanelBodyComponent implements OnInit, OnDestroy {
  contentHeight: string;

  private alive: boolean = true;

  constructor(
    @Host() private panel: NbExpansionPanelComponent,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  get isCollapsed(): boolean {
    return !!this.panel.collapsed;
  }

  get isExpanded(): boolean {
    return !this.panel.collapsed;
  }

  get state(): string {
    if (this.isCollapsed) {
      return 'collapsed';
    }
    if (this.isExpanded) {
      return 'expanded';
    }
  }

  ngOnInit() {
    this.contentHeight = `${this.el.nativeElement.clientHeight}px`;

    merge(
      this.panel.opened,
      this.panel.closed,
      this.panel.panelInputChanges.pipe(filter(changes => !!(changes['disabled'] || changes['hideToggle']))),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
