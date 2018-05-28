import { Component, Input, HostBinding } from '@angular/core';

/**
 * Reveal card component.
 *
 * ![image](assets/images/components/reveal-card.gif)
 *
 * @example
 *
 * ```
 * <nb-reveal-card>
 *   <nb-card-front>
 *     <nb-card><nb-card-body>Front Card</nb-card-body></nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card><nb-card-body>Back Card</nb-card-body></nb-card>
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
    <a *ngIf="showToggleButton" class="reveal-button" (click)="toggle()">
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

  /**
   * Show/hide toggle button to be able to control toggle from your code
   * @type {boolean}
   */
  @Input() showToggleButton = true;

  toggle() {
    this.revealed = !this.revealed;
  }
}
