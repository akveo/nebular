import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
  selector: 'nb-accordion-toggle',
  templateUrl: './accordion-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionToggleComponent {

  @ViewChild('item') accordion;

  toggle() {
    this.accordion.toggle();
  }
}
