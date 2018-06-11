import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-spinner-test',
  template: `
    <nb-card accent="danger" size="xsmall">
      <nb-spinner success="success" [visible]="loading" size='large' [text]="'Loading...'"></nb-spinner>
      <nb-card-header>Nebula</nb-card-header>
      <nb-card-body>
        A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
        Originally, nebula was a name for any diffuse astronomical object,
        including galaxies beyond the Milky Way.
      </nb-card-body>
    </nb-card>

    <div class="d-flex align-items-start">
      <button class="button-container btn btn-success btn-lg" (click)="toggleLoadingAnimation()">
        <nb-spinner [visible]="loading" size='large' [inline]=true></nb-spinner>
        Download
      </button>

      <button class="button-container btn btn-primary btn-lg" (click)="toggleLoadingAnimation()">
        <nb-spinner [visible]="loading" size='medium' [inline]=true></nb-spinner>
        Download
      </button>

      <button class="button-container btn btn-warning btn-lg" (click)="toggleLoadingAnimation()">
        <nb-spinner [visible]="loading" size='small' [inline]=true></nb-spinner>
        Download
      </button>

      <button class="button-container btn btn-danger btn-md" (click)="toggleLoadingAnimation()">
        <nb-spinner [visible]="loading" size='medium' [inline]=true></nb-spinner>
        Download
      </button>

      <button class="button-container btn btn-info btn-md" (click)="toggleLoadingAnimation()">
        <nb-spinner [visible]="loading" size='small' [inline]=true></nb-spinner>
        Download
      </button>

      <button class="button-container btn btn-info btn-sm" (click)="toggleLoadingAnimation()">
        <nb-spinner [visible]="loading" size='small' [inline]=true></nb-spinner>
        Download
      </button>
    </div>
  `,
  styles: [`
    :host .button-container {
      margin: 1rem;
    }
  `],
})
export class NbSpinnerTestComponent {

  loading = false;

  toggleLoadingAnimation() {
    this.loading = !this.loading
  }
}
