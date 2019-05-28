/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NbPopoverDirective, NbPosition, NbTrigger } from '@nebular/theme';

import { PopoverListComponent, PopoverTabsComponent } from './components/dynamic.components';


@Component({
  selector: 'nb-popover-dynamic',
  templateUrl: './popover-dynamic.component.html',
  styleUrls: ['./popover-dynamic.scss'],
})
export class PopoverDynamicComponent implements OnDestroy, AfterViewInit {

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild('tabs', { read: TemplateRef, static: false }) templateTabs: TemplateRef<any>;
  @ViewChild('list', { read: TemplateRef, static: false }) templateList: TemplateRef<any>;

  componentList = PopoverListComponent;
  componentTabs = PopoverTabsComponent;
  textContent = 'Hello World';
  component: any = this.componentList;
  trigger = NbTrigger.CLICK;
  position = NbPosition.BOTTOM;
  items = [];
  interval: any;

  stopRuntimeChange() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  changeComponent(component) {
    this.component = component;
  }

  changeTrigger(trigger) {
    this.trigger = trigger;
  }

  changePlacement(placement) {
    this.position = placement;
  }

  startRuntimeChange() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        const random = this.items[Math.floor(Math.random() * this.items.length)];
        this.changeComponent(random);
      }, 2000);
    }
  }

  ngAfterViewInit() {
    this.items = [
      this.componentList,
      this.componentTabs,
      this.templateList,
      this.templateTabs,
      this.textContent,
    ];
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
