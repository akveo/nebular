import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ScrollDialogComponent } from './components/scroll-dialog.component';

@Component({
  selector: 'nb-dialog-scroll',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithScroll()">Open with scroll</button>
      <button nbButton hero (click)="openWithoutScroll()">Open without scroll</button>
    </div>
  `,
  styles: [`
    ::ng-deep nb-layout-column {
      height: 80vw;
    }

    button {
      margin: 1rem;
    }
  `],
})
export class DialogScrollComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithScroll() {
    this.open(true);
  }

  openWithoutScroll() {
    this.open(false);
  }

  protected open(hasScroll: boolean) {
    this.dialogService.open(ScrollDialogComponent, { hasScroll });
  }
}
