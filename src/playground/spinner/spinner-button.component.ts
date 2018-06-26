/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-spinner-button',
  template: `
     <nb-card accent="primary" size="small">
      <nb-card-body>
        <div class="d-flex align-items-start">
          <button class="button-container btn btn-success btn-lg" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="large" nbSpinnerMessage="">
            Download
          </button>

          <button class="button-container btn btn-primary btn-lg" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="primary" nbSpinnerSize="large" nbSpinnerMessage="">
            Download
          </button>

          <button class="button-container btn btn-warning btn-lg" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="warning" nbSpinnerSize="large" nbSpinnerMessage="">
            Download
          </button>

          <button class="button-container btn btn-danger btn-md" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="danger" nbSpinnerMessage="">
            Download
          </button>

          <button class="button-container btn btn-info btn-md" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="info" nbSpinnerSize="small" nbSpinnerMessage="">
            Download
          </button>

          <button class="button-container btn btn-info btn-sm" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="info" nbSpinnerSize="xsmall" nbSpinnerMessage="">
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
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }
}
