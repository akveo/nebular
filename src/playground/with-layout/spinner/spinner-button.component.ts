/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-spinner-button',
  template: `
     <nb-card>
      <nb-card-body class="example-items-rows">
          <button [nbSpinner]="loading" nbSpinnerStatus="success" nbButton (click)="toggleLoadingAnimation()">
            Download
          </button>

          <button [nbSpinner]="loading" nbSpinnerStatus="warning" nbButton (click)="toggleLoadingAnimation()">
            Download
          </button>

          <button [nbSpinner]="loading" nbSpinnerStatus="danger" nbButton (click)="toggleLoadingAnimation()">
            Download
          </button>

          <button [nbSpinner]="loading" nbSpinnerStatus="info" nbButton (click)="toggleLoadingAnimation()">
            Download
          </button>
      </nb-card-body>
    </nb-card>
  `,
})
export class SpinnerButtonComponent {

  loading = false;

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }
}
