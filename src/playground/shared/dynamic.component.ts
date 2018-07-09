import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-dynamic-to-add',
  template: `
    <div>
      <strong>hello from dynamically inserted component: {{text}}</strong>
    </div>
  `,
})
export class NbDynamicToAddComponent {

  @Input()
  text: string = '';
}
