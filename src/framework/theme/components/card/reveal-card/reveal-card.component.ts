import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nb-reveal-card',
  templateUrl: './reveal-card.component.html',
  styleUrls: ['./reveal-card.component.scss'],
})
export class NbRevealCardComponent {

  @Input() revealed = false;
  @Input() size = '';

}
