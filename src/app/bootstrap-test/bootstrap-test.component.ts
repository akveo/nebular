/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-bootstrap-test',
  styles: [
    ``,
  ],
  template: `
    <nb-layout>
      <nb-layout-column>
        <h2>Buttons</h2>
        <div>
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-info">Info</button>
          <button class="btn btn-danger">Danger</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-warning">Warning</button>
        </div>
        <h2>Tables</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>email</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>some</td>
              <td>John Doe</td>
              <td>test@test.com</td>
            </tr>
            <tr>
              <td>some</td>
              <td>John Doe</td>
              <td>test@test.com</td>
            </tr>
            <tr>
              <td>some</td>
              <td>John Doe</td>
              <td>test@test.com</td>
            </tr>
            <tr>
              <td>some</td>
              <td>John Doe</td>
              <td>test@test.com</td>
            </tr>
          </tbody>
        </table>
        <h2>Checkbox & Radio</h2>
        <div class="row demo-checkboxes-radio">
          <div class="demo-checkboxes col-sm-3">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="b-checkbox">
              <label class="custom-control-label" for="b-checkbox">Checkbox 1</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="b-checkbox-2" checked="true">
              <label class="custom-control-label" for="b-checkbox-2">Checkbox 2</label>
            </div>
          </div>
          <div class="demo-radio col-sm-3">
            <div class="custom-control custom-radio">
              <input id="radio-1" name="radio" type="radio" class="custom-control-input" required="">
              <label class="custom-control-label" for="radio-1">Radio 1</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="radio-2" name="radio" type="radio" class="custom-control-input" checked="" required="">
              <label class="custom-control-label" for="radio-2">Radio 2</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="radio-3" name="radio" type="radio" class="custom-control-input" required="">
              <label class="custom-control-label" for="radio-3">Radio 3</label>
            </div>
          </div>
          <div class="demo-disabled-checkbox-radio col-sm-3">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="b-checkbox-3" disabled="true">
              <label class="custom-control-label" for="b-checkbox-3">Disabled Checkbox 1</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="b-checkbox-4" disabled checked>
              <label class="custom-control-label" for="b-checkbox-4">Disabled Checkbox 2</label>
            </div>
          </div>
          <div class="demo-disabled-checkbox-radio col-sm-3">
            <div class="custom-control custom-radio">
              <input id="d-radio-1" name="d-radio" type="radio" class="custom-control-input" disabled required="">
              <label class="custom-control-label" for="d-radio-1">Disabled Radio 1</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="d-radio-2" name="d-radio" type="radio" class="custom-control-input" checked="" disabled>
              <label class="custom-control-label" for="d-radio-2">Disabled Radio 2</label>
            </div>
          </div>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbBootstrapTestComponent {

}
