import { Component } from '@angular/core';

@Component({
  selector: 'nb-progress-bar-value',
  templateUrl: './progress-bar-value.component.html',
  styles: [`
    nb-progress-bar ~ nb-progress-bar {
      margin-top: 1rem;
    }
  `],
})

export class ProgressBarValueComponent {
}
