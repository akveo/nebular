import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-spinner-button',
  template: `
     <nb-card accent="primary" size="xsmall">
      <nb-card-header>Inline Spinners</nb-card-header>
      <nb-card-body>
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
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    :host .button-container {
      margin: 1rem;
    }
  `],
})
export class NbSpinnerButtonComponent {

  loading = false;

  toggleLoadingAnimation() {
    this.loading = !this.loading
  }
}
