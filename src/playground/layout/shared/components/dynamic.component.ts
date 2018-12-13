import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-dynamic-to-add',
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
