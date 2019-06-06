import { Component } from '@angular/core';

@Component({
  selector: 'nb-checkbox-showcase',
  templateUrl: './checkbox-showcase.component.html',
})

export class CheckboxShowcaseComponent {

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }
}
