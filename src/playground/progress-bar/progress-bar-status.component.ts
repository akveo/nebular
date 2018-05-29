import { Component } from '@angular/core';

@Component({
  selector: 'nb-progress-bar-status',
  templateUrl: './progress-bar-status.component.html',
  styles: [`
    nb-progress-bar ~ nb-progress-bar {
      margin-top: 1rem;
    }
  `],
})

export class NbProgressBarStatusComponent {
}
