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
          <button nbButton status="success" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="large" nbSpinnerMessage="">
            Download
          </button>

          <button nbButton status="primary" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="primary" nbSpinnerSize="large" nbSpinnerMessage="">
            Download
          </button>

          <button nbButton status="warning" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="warning" nbSpinnerSize="large" nbSpinnerMessage="">
            Download
          </button>

          <button nbButton status="danger" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="danger" nbSpinnerSize="large" nbSpinnerMessage="">
            Download
          </button>

          <button nbButton status="info" (click)="toggleLoadingAnimation()"
                  [nbSpinner]="loading" nbSpinnerStatus="info" nbSpinnerSize="large" nbSpinnerMessage="">
            Download
          </button>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    button {
      margin: 1rem;
    }
  `],
})
export class SpinnerButtonComponent {

  loading = false;

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }
}
