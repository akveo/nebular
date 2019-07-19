import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
  selector: 'nb-accordion-toggle',
  templateUrl: './accordion-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionToggleComponent {

  @ViewChild('item', { static: false }) accordion;

  toggle() {
    this.accordion.toggle();
  }
}
