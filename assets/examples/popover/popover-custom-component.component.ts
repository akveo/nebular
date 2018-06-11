import { Component } from '@angular/core';
import { NbDynamicToAddComponent } from '../shared/dynamic.component';


@Component({
  selector: 'nb-popover-custom-component',
  templateUrl: './popover-custom-component.component.html',
})
export class NbPopoverCustomComponentComponent {

  customComponent = NbDynamicToAddComponent;
}


