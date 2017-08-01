import { Component } from '@angular/core';

@Component({
  selector: 'nb-forms-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <label class="form-control-label" for="default-form-control">Default Form Control</label>
            <input class="form-control" id="default-form-control" placeholder="Default Form Control">
            <span class="form-control-feedback">Help text</span>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-body>
            <div class="has-success">
              <label class="form-control-label" for="success-form-control">Success Form Control</label>
              <input class="form-control form-control-success" id="success-form-control"
                     placeholder="Success Form Control">
              <span class="form-control-feedback">Help text</span>
            </div>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-body>
            <div class="has-danger">
              <label class="form-control-label" for="danger-form-control">Danger Form Control</label>
              <input class="form-control form-control-danger" id="danger-form-control"
                     placeholder="Danger Form Control">
              <span class="form-control-feedback">Help text</span>
            </div>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})

export class NbFormsTestComponent {
}
