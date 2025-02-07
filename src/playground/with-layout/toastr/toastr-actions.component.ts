import { Component, HostBinding } from '@angular/core';
import { NbToastrService, NbToastRef } from '@nebular/theme';

@Component({
  selector: 'npg-toastr-actions',
  template: `
    <button nbButton (click)="show1Action()">With 1 action</button>
    <button nbButton (click)="showMultipleActions()">Without multiple actions</button>
  `,
  styles: [
    `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrActionsComponent {
  private index: number = 0;

  @HostBinding('class')
  className = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {}
  currentToast: NbToastRef | undefined;

  show1Action() {
    this.currentToast = this.toastrService.show('Message', `Toast: ${++this.index}`, [
      { text: 'Close', color: 'basic', callback: () => this.currentToast?.close() },
    ]);
  }

  showMultipleActions() {
    this.currentToast = this.toastrService.show(
      'Message',
      `Toast: ${++this.index}`,
      [
        { text: 'Close', color: 'basic', callback: () => this.currentToast?.close() },
        { text: 'Red Close', color: 'danger', callback: () => this.currentToast?.close() },
      ],
      {
        duration: 0,
      },
    );
  }
}
