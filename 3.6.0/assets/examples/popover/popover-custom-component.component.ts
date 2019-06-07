import { Component } from '@angular/core';
import { DynamicToAddComponent } from './components/dynamic.components';

@Component({
  selector: 'nb-popover-custom-component',
  templateUrl: './popover-custom-component.component.html',
  styles: [`
    :host {
      display: block;
      margin: 5rem;
    }
  `],
})
export class PopoverCustomComponentComponent {

  customComponent = DynamicToAddComponent;
}


