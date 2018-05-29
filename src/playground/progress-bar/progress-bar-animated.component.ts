import {Component} from '@angular/core';

@Component({
  selector: 'nb-progress-bar-animated',
  templateUrl: './progress-bar-animated.component.html',
  styles: [`
    .container {
      display: flex;
      align-items: center;
    }

    nb-progress-bar {
      flex: 1;
    }
  `],
})

export class NbProgressBarAnimatedComponent {

  value = 25;

  setValue(newValue) {
    this.value = Math.min(Math.max(newValue, 0), 100)
  }

  get type(){
    if (this.value <= 25) {
      return 'danger';
    } else if (this.value <= 50) {
      return 'warning';
    } else if (this.value <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }

}
