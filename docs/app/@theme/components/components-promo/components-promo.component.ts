import { Component } from '@angular/core';

@Component({
  selector: 'ngd-components-promo',
  template: `
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  `,
  styleUrls: ['./components-promo.component.scss'],
  standalone: false,
})
export class NgdComponentsPromoComponent {
  title = 'Angular UI components';
  description = `Choose from 40+ ready-to-use Angular UI components with no 3rd party dependencies.
                  Benefit from an easier and faster way of building a visually appealing and responsive UI for apps.`;
}
