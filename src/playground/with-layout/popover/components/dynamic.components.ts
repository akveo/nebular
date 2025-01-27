import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-dynamic-to-add',
  template: `
    <div>
      <strong>Hello from custom component: {{ text }}</strong>
    </div>
  `,
  standalone: false,
})
export class DynamicToAddComponent {
  @Input()
  text: string = '';
}

@Component({
  selector: 'nb-popover-list',
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
  standalone: false,
})
export class PopoverListComponent {}

@Component({
  selector: 'nb-popover-tabs',
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
  standalone: false,
})
export class PopoverTabsComponent {}
