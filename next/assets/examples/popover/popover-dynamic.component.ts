import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NbPopoverDirective, NbPosition, NbTrigger } from '@nebular/theme';

import { PopoverListComponent, PopoverTabsComponent } from './components/dynamic.components';


@Component({
  selector: 'nb-popover-dynamic',
  templateUrl: './popover-dynamic.component.html',
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
    .margin-bottom-0 {
      margin-bottom: 0;
    }
    .section {
      margin-bottom: 2rem;
    }
    .popover-container {
      display: flex;
      justify-content: center;
      padding: 12rem;
    }
    button {
      margin-right: 1rem;
      margin-top: 1rem;
    }
  `],
})
export class PopoverDynamicComponent implements OnDestroy, AfterViewInit {

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  @ViewChild('tabs', { read: TemplateRef }) templateTabs: TemplateRef<any>;
  @ViewChild('list', { read: TemplateRef }) templateList: TemplateRef<any>;

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
