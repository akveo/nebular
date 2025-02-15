import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
    selector: 'nb-accordion-toggle',
    templateUrl: './accordion-toggle.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'example-height-60' },
    standalone: false
})
export class AccordionToggleComponent {

  @ViewChild('item') accordion;

  toggle() {
    this.accordion.toggle();
  }
}
