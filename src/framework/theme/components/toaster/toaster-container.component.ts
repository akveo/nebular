import { Component, Input } from '@angular/core';

import { NbContainer } from '../overlay/overlay-renderer';
import { NbToast } from './toaster.service';


@Component({
  selector: 'nb-toaster-container',
  template: `<nb-toast *ngFor="let toast of content" [toast]="toast"></nb-toast>`,
})
export class NbToasterContainerComponent implements NbContainer {
  @Input()
  content: NbToast[] = [];

  @Input()
  context: Object;
}
