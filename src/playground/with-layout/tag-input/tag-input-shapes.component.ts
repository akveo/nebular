import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { NbTagInputComponent } from '@nebular/theme';

@Component({
  selector: 'nb-app-tag-input-shapes',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="rectangle"
          shape="rectangle"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="semi-round"
          shape="rectangle"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="round"
          shape="rectangle"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="rectangle"
          shape="semi-round"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="semi-round"
          shape="semi-round"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="round"
          shape="semi-round"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="rectangle"
          shape="round"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="semi-round"
          shape="round"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          tagShape="round"
          shape="round"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
  `,
})
export class TagInputShapesComponent { }
