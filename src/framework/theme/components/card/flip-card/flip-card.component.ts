import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
})
export class NbFlipCardComponent {

  @Input() flipped = false;
  @Input() size = 'medium';

}
