import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-tag-input-sizes',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          fieldSize="tiny"
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
          fieldSize="small"
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
          fieldSize="medium"
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
          fieldSize="large"
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
          fieldSize="giant"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
  `,
})
export class TagInputSizesComponent { }
