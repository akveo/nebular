import { Component }                 from '@angular/core';
import { NbWindowService }           from '@nebular/theme';
import { FormComponent }             from './components/form.component';
import { WindowNamePromptComponent } from './components/name-prompt-window.component';

@Component({
             template: `
               <button nbButton
                       status="primary"
                       (click)="openWindow()">Enter Name
               </button>
               <br>
               <h3 class="h5">Names:</h3>
               <ul>
                 <li *ngFor="let name of names">{{ name }}</li>
               </ul>
             `,
             styleUrls: [ './window.scss' ],
           })
export class WindowResultComponent {
  names: string[] = [];

  constructor(private windowService: NbWindowService) {
  }

  openWindow() {
    this.windowService
        .open(WindowNamePromptComponent, { title: `Window` })
        .onClose
        .subscribe(
          (name: string) => {
            name && this.names.push(name);
          },
        );
  }
}
