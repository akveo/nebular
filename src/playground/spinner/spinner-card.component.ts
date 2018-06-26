import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-spinner-card',
  template: `
    <nb-card accent="danger" size="xsmall" [nbSpinner]="loading" nbSpinnerStatus="danger" nbSpinnerSize="xlarge">
      <nb-card-header>Spinners</nb-card-header>
      <nb-card-body>
        <p>
          A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
          Originally, nebula was a name for any diffuse astronomical object.
        </p>
        <button class="btn btn-info btn-sm" (click)="toggleLoadingAnimation()">Reload</button>

      </nb-card-body>
    </nb-card>
  `,
})
export class NbSpinnerCardComponent {

  loading = false;

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }
}
