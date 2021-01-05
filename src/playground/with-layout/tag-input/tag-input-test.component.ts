import { Component, ViewChild } from '@angular/core';
import { NbTagInputComponent } from '@nebular/theme';

@Component({
  selector: 'nb-app-tag-input-test',
  template: `
    <nb-card>
      <nb-card-header>Disabled</nb-card-header>
      <nb-card-body class="example-items-col">
        <nb-tag-input
          #tagInputStatus
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          fullWidth
          disabled
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
        <div>
          <button nbButton status="primary" (click)="toggleStatus()">
            {{ tagInputStatus.disabled ? 'enable' : 'disable' }}
          </button>
        </div>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Removable = false</nb-card-header>
      <nb-card-body class="example-items-col">
        <nb-tag-input
          #tagInputRemovable
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          fullWidth
          removable="false"
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
        <div>
          <button nbButton status="primary" (click)="toggleRemovable()">
            {{ tagInputRemovable.removable ? 'not removable' : 'removable' }}
          </button>
        </div>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Editable = false</nb-card-header>
      <nb-card-body class="example-items-col">
        <nb-tag-input
          #tagInputEditable
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          fullWidth
          editable="false"
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
        <div>
          <button nbButton status="primary" (click)="toggleEditable()">
            {{ tagInputEditable.editable ? 'not editable' : 'editable' }}
          </button>
        </div>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Allow duplicate</nb-card-header>
      <nb-card-body class="example-items-col">
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          fullWidth
          allowDuplicate
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./tag-input.component.scss'],
})
export class TagInputTestComponent {
  @ViewChild('tagInputStatus') tagInputStatus: NbTagInputComponent;
  @ViewChild('tagInputRemovable') tagInputRemovable: NbTagInputComponent;
  @ViewChild('tagInputEditable') tagInputEditable: NbTagInputComponent;

  toggleStatus() {
    this.tagInputStatus.disabled = !this.tagInputStatus.disabled;
  }

  toggleRemovable() {
    this.tagInputRemovable.removable = !this.tagInputRemovable.removable;
  }

  toggleEditable() {
    this.tagInputEditable.editable = !this.tagInputEditable.editable;
  }
}
