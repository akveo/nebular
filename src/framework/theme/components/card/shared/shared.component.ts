import { Component, Input, HostBinding } from '@angular/core';
import { NbCardComponent } from '../card.component'

/**
 * Component intended to be used within the `<nb-flip-card>` and `<nb-reveal-card>` component.
 *
 * Use it as a container for the front card.
 */
@Component({
  selector: 'nb-card-front',
  template: '<ng-content select="nb-card"></ng-content>',
})
export class NbFrontComponent { }

/**
 * Component intended to be used within the `<nb-flip-card>` and `<nb-reveal-card>` component.
 *
 * Use it as a container for the back card.
 */
@Component({
  selector: 'nb-card-back',
  template: '<ng-content select="nb-card"></ng-content>',
})
export class NbBackComponent { }
