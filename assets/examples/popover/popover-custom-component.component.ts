import { Component } from '@angular/core';
import { NbDynamicToAddComponent } from '../shared/dynamic.component';

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
export class NbPopoverCustomComponentComponent {

  customComponent = NbDynamicToAddComponent;
}


