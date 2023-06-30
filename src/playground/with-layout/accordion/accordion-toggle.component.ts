import { Component, ChangeDetectionStrategy, ViewChild, HostBinding } from '@angular/core';

@Component({
  selector: 'npg-accordion-toggle',
  templateUrl: './accordion-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionToggleComponent {
  @HostBinding('class') classes = 'example-height-60';
  @ViewChild('item') accordion;

  toggle() {
    this.accordion.toggle();
  }
}
