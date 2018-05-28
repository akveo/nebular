import { Component, Input, HostBinding } from '@angular/core';

/**
 * Flip card component.
 *
 * ![image](assets/images/components/flip-card.gif)
 *
 * @example
 *
 * ```
 * <nb-flip-card>
 *   <nb-card-front>
 *     <nb-card><nb-card-body>Front Card</nb-card-body></nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card><nb-card-body>Back Card</nb-card-body></nb-card>
 *   </nb-card-back>
 * </nb-flip-card>
 * ```
 */
@Component({
  selector: 'nb-flip-card',
  styleUrls: ['./flip-card.component.scss'],
  template: `
    <div class="flipcard-body">
      <div class="front-container">
        <ng-content select="nb-card-front"></ng-content>
        <a *ngIf="showToggleButton" class="flip-button" (click)="toggle()">
          <i class="nb-arrow-dropleft" aria-hidden="true"></i>
        </a>
      </div>
      <div class="back-container">
        <ng-content select="nb-card-back"></ng-content>
        <a *ngIf="showToggleButton" class="flip-button" (click)="toggle()">
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

  /**
   * Show/hide toggle button to be able to control toggle from your code
   * @type {boolean}
   */
  @Input() showToggleButton = true;

  toggle() {
    this.flipped = !this.flipped;
  }
}
