import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-spinner-tabs',
  template: `
    <nb-card size="xsmall">
      <nb-card-body>

        <nb-tabset fullWidth (changeTab)="toggleLoadingAnimation()">
          <nb-tab tabTitle="Tab 1" [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="xxlarge">
            <p>
              A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
              Originally, nebula was a name for any diffuse astronomical object.
            </p>
          </nb-tab>

          <nb-tab tabTitle="Tab 2" [nbSpinner]="loading" nbSpinnerStatus="info" nbSpinnerSize="xxlarge">
            <p>
              Nebular's primary goal is to assemble together and connect the most awesome features and libraries
              creating an efficient ecosystem to speed up and simplify the development.
            </p>
          </nb-tab>

        </nb-tabset>
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class SpinnerTabsComponent {

  loading = false;

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 20000)
  }
}
