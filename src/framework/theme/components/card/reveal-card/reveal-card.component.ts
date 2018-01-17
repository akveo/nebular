import { Component, Input, HostBinding } from '@angular/core';

/**
 * Reveal card component.
 *
 * @example
 *
 * ```
 * <nb-reveal-card>
 *   <nb-card-front>
 *     <nb-card>Front Card</nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card>Back Card</nb-card>
 *   </nb-card-back>
 * </nb-reveal-card>
 * ```
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
