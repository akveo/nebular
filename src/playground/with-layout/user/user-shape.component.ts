import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <p>Rectangle</p>
        <nb-user shape="rectangle" name="John Doe" title="Engineer"></nb-user>
      </nb-card-body>
    </nb-card>

    <nb-card>
      <nb-card-body>
        <p>Semi-round</p>
        <nb-user shape="semi-round" name="John Doe" title="Engineer"></nb-user>
      </nb-card-body>
    </nb-card>

    <nb-card>
      <nb-card-body>
        <p>Round</p>
        <nb-user shape="round" name="John Doe" title="Engineer"></nb-user>
      </nb-card-body>
    </nb-card>
  `,
})
export class NbUserShapeComponent {}
