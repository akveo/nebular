import { Component, Input, HostBinding } from '@angular/core';
import { NbCardComponent } from '../card.component'

@Component({
  selector: 'nb-card-front',
  template: '<ng-content select="nb-card"></ng-content>',
})
export class NbFrontComponent { }

@Component({
  selector: 'nb-card-back',
  template: '<ng-content select="nb-card"></ng-content>',
})
export class NbBackComponent { }

@Component({
  selector: 'nb-flip-card',
  styleUrls: ['./flip-card.component.scss'],
  template: `
    <div class="flipcard-body">
      <ng-content select="nb-card-front"></ng-content>
      <ng-content select="nb-card-back"></ng-content>
    </div>
    <a class="flip-button" (click)="toggleFlip()">
      <i class="nb-arrow-dropleft" aria-hidden="true"></i>
    </a>
  `,
})
export class NbFlipCardComponent {
  @Input()
  @HostBinding('class.flipped')
  flipped: boolean = false;

  @Input()
  size: string = NbCardComponent.SIZE_MEDIUM;

  toggleFlip() {
    this.flipped = !this.flipped;
  }
}
