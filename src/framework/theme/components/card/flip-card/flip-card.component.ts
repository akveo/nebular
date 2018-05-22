import { Component, Input, HostBinding } from '@angular/core';

/**
 *
 * Flip card example:
 * @example(flip-card/flip-card-showcase.component)
 *
 * As a content Flip card accepts two instances of `nb-card` - for front and back sides.
 *
 * Basic flip card configuration:
 *
 * ```html
 * <nb-flip-card>
 *   <nb-card-front>
 *     <nb-card>
 *       <nb-card-body>
 *         Front
 *       </nb-card-body>
 *     </nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card>
 *       <nb-card-body>
 *         Back
 *       </nb-card-body>
 *     </nb-card>
 *   </nb-card-back>
 * </nb-flip-card>
 * ```
 *
 * Flip Card with header and footer:
 * @example(flip-card/flip-card-full.component)
 *
 * Colored flip-cards could be simply configured by providing a `status` property:
 * @example(flip-card/flip-card-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight card highlight
 * as well as combine it with `status`:
 * @example(flip-card/flip-card-accents.component)
 *
 * @more-live-examples
 *
 * flip-card/flip-card-sizes.component
 *
 */
@Component({
  selector: 'nb-flip-card',
  styleUrls: ['./flip-card.component.scss'],
  template: `
    <div class="flipcard-body">
      <div class="front-container">
        <ng-content select="nb-card-front"></ng-content>
        <a class="flip-button" (click)="toggleFlip()">
          <i class="nb-arrow-dropleft" aria-hidden="true"></i>
        </a>
      </div>
      <div class="back-container">
        <ng-content select="nb-card-back"></ng-content>
        <a class="flip-button" (click)="toggleFlip()">
          <i class="nb-arrow-dropleft" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  `,
})
export class NbFlipCardComponent {
  /**
   * Flip state
   * @type boolean
   */
  @Input()
  @HostBinding('class.flipped')
  flipped: boolean = false;

  toggleFlip() {
    this.flipped = !this.flipped;
  }
}
