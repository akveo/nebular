/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';

@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
      <label for="name">Enter your name:</label>
      <input nbInput id="name" type="text" formControlName="name" />

      <button nbButton type="submit" status="success">Submit</button>
    </form>
  `,
})
export class VisitorsFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public windowRef: NbWindowRef,
  ) {
    this.form = fb.group({
      name: null,
    });
  }

  onSubmit() {
    this.windowRef.close(this.form.value.name);
  }

  close() {
    this.windowRef.close();
  }
}
