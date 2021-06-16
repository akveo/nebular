import { Component } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
             selector: 'nb-name-prompt',
             template: `
               <input #name
                      nbInput
                      placeholder="Name">
               <br/>
               <button nbButton
                       status="danger"
                       (click)="cancel()">
                 Cancel
               </button>
               <button nbButton
                       status="success"
                       (click)="submit(name.value)">
                 Submit
               </button>
             `,
           })
export class WindowNamePromptComponent {
  constructor(protected nbWindowRef: NbWindowRef) {
  }

  cancel() {
    this.nbWindowRef.close();
  }

  submit(name) {
    this.nbWindowRef.close(name);
  }
}
