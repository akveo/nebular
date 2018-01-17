import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'nb-reveal-card',
  styleUrls: ['./reveal-card.component.scss'],
  template: `
    <ng-content select="nb-card-front"></ng-content>
    <div class="hidden-card-container">
      <ng-content select="nb-card-back"></ng-content>
    </div>
    <a class="reveal-button" (click)="toggleReveal()">
      <i class="nb-arrow-dropdown" aria-hidden="true"></i>
    </a>
  `,
})
export class NbRevealCardComponent {
  @Input()
  @HostBinding('class.revealed')
  revealed: boolean = false;

  toggleReveal() {
    this.revealed = !this.revealed;
  }
}
