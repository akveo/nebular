import { Component } from '@angular/core';

/**
 * Component intended to be used within the `<nb-flip-card>` and `<nb-reveal-card>` components.
 *
 * Use it as a container for the front card.
 */
@Component({
  selector: 'nb-card-front',
  templateUrl: './card-front.component.html',
})
export class NbCardFrontComponent { }

/**
 * Component intended to be used within the `<nb-flip-card>` and `<nb-reveal-card>` components.
 *
 * Use it as a container for the back card.
 */
@Component({
  selector: 'nb-card-back',
  templateUrl: './card-back.component.html',
})
export class NbCardBackComponent { }
