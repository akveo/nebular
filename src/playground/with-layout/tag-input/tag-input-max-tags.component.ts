import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-tag-input-max-tags',
  template: `
    <nb-card>
      <nb-card-header>Max 5 tags</nb-card-header>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          maxTags="5"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Max 5 tags with custom warning text</nb-card-header>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          maxTags="5"
          maxTagsText="Max 5 tags allowed"
          placeholder="add a new tag"
          fullWidth
          [tags]="['Typescript', 'Python', 'C#', 'Go', 'Kotlin']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
  `,
})
export class TagInputMaxTagsComponent { }
