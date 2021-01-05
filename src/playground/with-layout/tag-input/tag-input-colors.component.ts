import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-tag-input-colors',
  template: `
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="basic"
        tagStatus="basic"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="basic"
        tagStatus="primary"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="basic"
        tagStatus="success"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="basic"
        tagStatus="info"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="basic"
        tagStatus="warning"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="basic"
        tagStatus="danger"
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
        tagStatus="basic"
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
        tagStatus="success"
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
        tagStatus="info"
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
        tagStatus="warning"
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
        tagStatus="danger"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="success"
        tagStatus="basic"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="success"
        tagStatus="primary"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="success"
        tagStatus="success"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="success"
        tagStatus="info"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="success"
        tagStatus="warning"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="success"
        tagStatus="danger"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="info"
        tagStatus="basic"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="info"
        tagStatus="primary"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="info"
        tagStatus="success"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="info"
        tagStatus="info"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="info"
        tagStatus="warning"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="info"
        tagStatus="danger"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="warning"
        tagStatus="basic"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="warning"
        tagStatus="primary"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="warning"
        tagStatus="success"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="warning"
        tagStatus="info"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="warning"
        tagStatus="warning"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="warning"
        tagStatus="danger"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="danger"
        tagStatus="basic"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="danger"
        tagStatus="primary"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="danger"
        tagStatus="success"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="danger"
        tagStatus="info"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="danger"
        tagStatus="warning"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  <nb-card>
    <nb-card-body>
      <nb-tag-input
        status="danger"
        tagStatus="danger"
        placeholder="add a new tag"
        fullWidth
        [tags]="['Typescript', 'Python', 'C#']">
      </nb-tag-input>
    </nb-card-body>
  </nb-card>
  `,
})
export class TagInputColorsComponent { }
