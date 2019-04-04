import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <nb-user shape="rectangle" name="John Doe" title="Engineer"></nb-user>
      </nb-card-body>
    </nb-card>

    <nb-card>
      <nb-card-body>
        <nb-user shape="semi-round" name="John Doe" title="Engineer"></nb-user>
      </nb-card-body>
    </nb-card>

    <nb-card>
      <nb-card-body>
        <nb-user shape="round" name="John Doe" title="Engineer"></nb-user>
      </nb-card-body>
    </nb-card>
  `,
})
export class NbUserShapeComponent {}
