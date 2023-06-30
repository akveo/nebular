import { Component, Input } from '@angular/core';

@Component({
  selector: 'npg-dynamic-to-add',
  template: `
    <div>
      <strong>Hello from custom component: {{ text }}</strong>
    </div>
  `,
})
export class DynamicToAddComponent {
  @Input()
  text: string = '';
}

@Component({
  selector: 'npg-popover-list',
  styles: [
    `
      nb-card {
        border: 0;
        margin-bottom: 0;
      }
    `,
  ],
  template: `
    <nb-card>
      <nb-card-header>Component Shopping list</nb-card-header>
      <nb-list>
        <nb-list-item>Apple</nb-list-item>
        <nb-list-item>Orange</nb-list-item>
      </nb-list>
    </nb-card>
  `,
})
export class PopoverListComponent {}

@Component({
  selector: 'npg-popover-tabs',
  styles: [
    `
      nb-card {
        border: 0;
        margin-bottom: 0;
      }
    `,
  ],
  template: `
    <nb-card>
      <nb-card-header>Component Shopping list</nb-card-header>
      <nb-tabset>
        <nb-tab tabTitle="Fruits">
          <nb-card>
            <nb-card-body>Fruits list</nb-card-body>
          </nb-card>
        </nb-tab>
        <nb-tab tabTitle="Vegetables">
          <nb-card>
            <nb-card-body>Vegetables list</nb-card-body>
          </nb-card>
        </nb-tab>
      </nb-tabset>
    </nb-card>
  `,
})
export class PopoverTabsComponent {}
