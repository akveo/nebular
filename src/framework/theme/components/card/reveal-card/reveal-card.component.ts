import { Component, Input, HostBinding } from '@angular/core';

/**
 *
 * Reveal card example:
 * @example(reveal-card/reveal-card-showcase.component)
 *
 * As a content Reveal card accepts two instances of `nb-card` - for front and back sides.
 *
 * Basic reveal card configuration:
 *
 * ```html
 * <nb-reveal-card>
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
 * </nb-reveal-card>
 * ```
 *
 * Reveal Card with header and footer:
 * @example(reveal-card/reveal-card-full.component)
 *
 * Colored reveal-cards could be simply configured by providing a `status` property:
 * @example(reveal-card/reveal-card-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight card highlight
 * as well as combine it with `status`:
 * @example(reveal-card/reveal-card-accents.component)
 *
 * @more-live-examples
 *
 * reveal-card/reveal-card-sizes.component
 *
 */
@Component({
  selector: 'nb-reveal-card',
  styleUrls: ['./reveal-card.component.scss'],
  template: `
    <ng-content select="nb-card-front"></ng-content>
    <div class="second-card-container">
      <ng-content select="nb-card-back"></ng-content>
    </div>
    <a class="reveal-button" (click)="toggleReveal()">
      <i class="nb-arrow-dropdown" aria-hidden="true"></i>
    </a>
  `,
})
export class NbRevealCardComponent {
  /**
   * Reveal state
   * @type boolean
   */
  @Input()
  @HostBinding('class.revealed')
  revealed: boolean = false;

  toggleReveal() {
    this.revealed = !this.revealed;
  }
}
