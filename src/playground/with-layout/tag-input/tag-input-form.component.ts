import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'nb-app-tag-input-form',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <form [formGroup]="form">
          <nb-tag-input
            status="primary"
            tagStatus="primary"
            placeholder="add a new tag"
            formControlName="tags"
            fullWidth>
          </nb-tag-input>
        </form>
        <div>
          <button nbButton status="primary" (click)="getControlValues()">get values</button>
        </div>
        <div>{{ controlValues }}</div>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./tag-input.component.scss'],
})
export class TagInputFormComponent implements OnInit {
  form: FormGroup;
  controlValues;

  ngOnInit() {
    this.form = new FormGroup({
      tags: new FormControl(['Java', 'C#', 'Python']),
    });
  }

  getControlValues() {
    this.controlValues = [...this.form.controls.tags.value];
  }
}
