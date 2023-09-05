import { Component } from '@angular/core';

@Component({
  selector: 'npg-progress-bar-size',
  templateUrl: './progress-bar-size.component.html',
  styles: [
    `
      nb-progress-bar ~ nb-progress-bar {
        margin-top: 1rem;
      }
    `,
  ],
})
export class ProgressBarSizeComponent {}
