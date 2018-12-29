import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nb-accordion-test',
  template: `
    <nb-accordion>
      <nb-accordion-item>
        <nb-accordion-item-header>
          Accordion #1
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
          Originally, nebula was a name for any diffuse astronomical object,
          including galaxies beyond the Milky Way.
        </nb-accordion-item-body>
      </nb-accordion-item>

      <nb-accordion-item>
        <nb-accordion-item-header>
          Accordion #2
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
          Originally, nebula was a name for any diffuse astronomical object,
          including galaxies beyond the Milky Way.
        </nb-accordion-item-body>
      </nb-accordion-item>

      <nb-accordion-item expanded>
        <nb-accordion-item-header>
          Accordion #3
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
          Originally, nebula was a name for any diffuse astronomical object,
          including galaxies beyond the Milky Way.
        </nb-accordion-item-body>
      </nb-accordion-item>

      <nb-accordion-item disabled>
        <nb-accordion-item-header>
          Accordion #4
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
          Originally, nebula was a name for any diffuse astronomical object,
          including galaxies beyond the Milky Way.
        </nb-accordion-item-body>
      </nb-accordion-item>
    </nb-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTestComponent {
}
