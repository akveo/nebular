import { Component } from '@angular/core';

@Component({
    selector: 'nb-app-tag-input-showcase',
    template: `
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
  `,
})
export class TagInputShowcaseComponent { }
